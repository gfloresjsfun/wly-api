import { RouteHandlerMethod } from "fastify";
import { MultipartFile } from "@fastify/multipart";
import { getVideoDurationInSeconds } from "get-video-duration";
import { getAudioDurationInSeconds } from "get-audio-duration";
import { Readable } from "stream";
import {
  uploadToS3,
  deleteFromS3,
  generateCoverS3Key,
  generateMediaS3Key,
} from "@libs/s3";
import Course from "@models/Course";
import { DeleteObjectCommandOutput } from "@aws-sdk/client-s3";

const createCourse: RouteHandlerMethod = async (request, reply) => {
  let {
    title: { value: title },
    covers,
    medias,
  } = request.body as {
    title: { value: { title: string } };
    covers: [MultipartFile] | MultipartFile;
    medias: [MultipartFile] | MultipartFile;
  };

  if (!Array.isArray(covers)) covers = [covers];
  if (!Array.isArray(medias)) medias = [medias];

  const course = new Course({ title });

  for (const [index, cover] of covers.entries()) {
    const media = medias[index];

    // upload cover to s3
    const coverS3Key = generateCoverS3Key(cover.filename);
    const coverBuffer = await cover.toBuffer();
    await uploadToS3(coverBuffer, coverS3Key);

    // upload media to s3
    const mediaS3Key = generateMediaS3Key(media.filename);
    const mediaBuffer = await media.toBuffer();
    await uploadToS3(mediaBuffer, mediaS3Key);

    // get media duration
    const { mimetype } = media;
    const [mediaType] = mimetype.split("/");
    const stream = Readable.from(mediaBuffer);
    const duration =
      mediaType === "video"
        ? await getVideoDurationInSeconds(stream)
        : mediaType === "audio"
        ? getAudioDurationInSeconds(stream)
        : 0;

    course.sessions.push({
      coverS3Key,
      mimetype,
      mediaS3Key,
      duration,
    });
  }

  return await course.save();
};

const getCourses: RouteHandlerMethod = async (request, reply) => {
  return await Course.find({});
};

const deleteCourse: RouteHandlerMethod = async (request, reply) => {
  const { id } = request.params as { id: string };

  const course = await Course.findByIdAndDelete(id);
  if (!course) {
    reply.notFound(`Course #${id} was not found!`);
    return;
  }

  const deletePromises: Promise<DeleteObjectCommandOutput>[] = [];
  for (const session of course.sessions) {
    deletePromises.concat([
      deleteFromS3(session.coverS3Key),
      deleteFromS3(session.mediaS3Key),
    ]);
  }
  await Promise.all(deletePromises);

  return course;
};

const deleteSession: RouteHandlerMethod = async (request, reply) => {
  const { id, sessionId } = request.params as { id: string; sessionId: string };

  const course = await Course.findById(id);
  if (!course) {
    reply.notFound(`Course #${id} was not found!`);
    return;
  }

  const session = course.sessions.id(sessionId);
  if (!session) {
    reply.notFound(`Session #${sessionId} was not found!`);
    return;
  }

  session.remove();
  await course.save();
  await Promise.all([
    deleteFromS3(session.coverS3Key),
    deleteFromS3(session.mediaS3Key),
  ]);

  return session;
};

export { createCourse, getCourses, deleteCourse, deleteSession };
