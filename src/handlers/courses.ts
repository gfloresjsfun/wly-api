import { RouteHandlerMethod } from "fastify";
import { MultipartFile } from "@fastify/multipart";
import { getVideoDurationInSeconds } from "get-video-duration";
import { getAudioDurationInSeconds } from "get-audio-duration";
import { Readable } from "stream";
import { uploadToS3, generateCoverS3Key, generateMediaS3Key } from "@libs/s3";
import Course from "@models/Course";

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

export { createCourse };
