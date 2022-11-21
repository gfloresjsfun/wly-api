import { RouteHandlerMethod } from "fastify";
import { MultipartFile } from "@fastify/multipart";
import { Readable } from "stream";
import { uploadToS3, deleteFromS3 } from "@libs/s3";
import Show from "@models/Show";
import {
  DeleteObjectCommandOutput,
  ObjectCannedACL,
  PutObjectCommandOutput,
} from "@aws-sdk/client-s3";
import { getMediaDurationFromReadable } from "@libs/media";
import { MediaType } from "@wly/types";

interface CreateShowRequest {
  title: { value: string };
  cover: MultipartFile;
  media: MultipartFile;
}

interface UpdateShowRequest {
  title: { value: string };
  cover?: MultipartFile;
  media?: MultipartFile;
}

const getShows: RouteHandlerMethod = async (request, reply) => {
  return await Show.find({});
};

const createShow: RouteHandlerMethod = async (request, reply) => {
  const {
    title: { value: title },
    cover,
    media,
  } = request.body as CreateShowRequest;

  // upload cover to s3
  const coverS3Key = Show.generateCoverS3Key(cover.filename);
  const coverBuffer = await cover.toBuffer();
  await uploadToS3(coverBuffer, coverS3Key, ObjectCannedACL.public_read);

  // upload media to s3
  const mediaS3Key = Show.generateMediaS3Key(media.filename);
  const mediaBuffer = await media.toBuffer();
  await uploadToS3(mediaBuffer, mediaS3Key);

  // get media duration
  const { mimetype } = media;
  const [mediaType] = mimetype.split("/");
  const duration = await getMediaDurationFromReadable(
    mediaType as MediaType,
    Readable.from(mediaBuffer)
  );

  const show = new Show({ title, coverS3Key, mediaS3Key, mimetype, duration });

  return await show.save();
};

const deleteShow: RouteHandlerMethod = async (request, reply) => {
  const { id } = request.params as { id: string };

  const show = await Show.findByIdAndDelete(id);
  if (!show) {
    reply.notFound(`Show #${id} was not found!`);
    return;
  }

  // delete cover & media from s3
  await Promise.all([
    deleteFromS3(show.coverS3Key),
    deleteFromS3(show.mediaS3Key),
  ]);

  return show;
};

const updateShow: RouteHandlerMethod = async (request, reply) => {
  const { id } = request.params as { id: string };
  const {
    title: { value: title },
    cover,
    media,
  } = request.body as UpdateShowRequest;

  const show = await Show.findById(id);
  if (!show) {
    reply.notFound(`Show #${id} was not found!`);
    return;
  }

  if (title) show.title = title;

  const s3CommandPromises: Promise<
    PutObjectCommandOutput | DeleteObjectCommandOutput
  >[] = [];

  if (cover) {
    // upload new cover to s3 & delete old one
    const coverS3Key = Show.generateCoverS3Key(cover.filename);
    const coverBuffer = await cover.toBuffer();
    s3CommandPromises.push(
      uploadToS3(coverBuffer, coverS3Key, ObjectCannedACL.public_read)
    );
    s3CommandPromises.push(deleteFromS3(show.coverS3Key));
    show.coverS3Key = coverS3Key;
  }

  if (media) {
    // upload new media to s3 & delete old one
    const mediaS3Key = Show.generateMediaS3Key(media.filename);
    const mediaBuffer = await media.toBuffer();
    s3CommandPromises.push(uploadToS3(mediaBuffer, mediaS3Key));
    s3CommandPromises.push(deleteFromS3(show.mediaS3Key));
    show.mediaS3Key = mediaS3Key;

    // get media duration
    const { mimetype } = media;
    const [mediaType] = mimetype.split("/");
    show.duration = await getMediaDurationFromReadable(
      mediaType as MediaType,
      Readable.from(mediaBuffer)
    );
  }

  await show.save();
  await Promise.all(s3CommandPromises);

  return show;
};

export { getShows, createShow, updateShow, deleteShow };
