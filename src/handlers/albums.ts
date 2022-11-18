import { RouteHandlerMethod } from "fastify";
import { MultipartFile } from "@fastify/multipart";
import { ObjectCannedACL } from "@aws-sdk/client-s3";
import { Types } from "mongoose";
import Album from "@models/Album";
import { uploadToS3, deleteFromS3 } from "@libs/s3";

interface CreateAlbumRequest {
  title: { value: string };
  description: { value: string };
  cover: MultipartFile;
  shows: Array<{ value: string }>;
}

interface UpdateAlbumRequest {
  title: { value: string };
  description: { value: string };
  cover?: MultipartFile;
  shows: Array<{ value: Types.ObjectId }>;
}

const getAlbums: RouteHandlerMethod = async (request, reply) => {
  return await Album.find({}).populate("shows");
};

const createAlbum: RouteHandlerMethod = async (request, reply) => {
  let {
    title: { value: title },
    cover,
    shows,
  } = request.body as CreateAlbumRequest;

  // upload cover to s3
  const coverS3Key = Album.generateCoverS3Key(cover.filename);
  const coverBuffer = await cover.toBuffer();
  await uploadToS3(coverBuffer, coverS3Key, ObjectCannedACL.public_read);

  const album = new Album({
    title,
    coverS3Key,
    shows: shows.map((show) => show.value),
  });

  await album.save();

  return await album.populate("shows");
};

const updateAlbum: RouteHandlerMethod = async (request, reply) => {
  const { id } = request.params as { id: string };
  let {
    title: { value: title },
    cover,
    shows,
  } = request.body as UpdateAlbumRequest;

  const album = await Album.findById(id);
  if (!album) {
    reply.notFound(`Album #${id} was not found!`);
    return;
  }

  album.title = title;
  album.shows = shows.map((show) => show.value);

  if (cover) {
    // upload cover to s3
    const coverS3Key = Album.generateCoverS3Key(cover.filename);
    const coverBuffer = await cover.toBuffer();
    await uploadToS3(coverBuffer, coverS3Key, ObjectCannedACL.public_read);
    album.coverS3Key = coverS3Key;
  }

  await album.save();

  return await album.populate("shows");
};

const deleteAlbum: RouteHandlerMethod = async (request, reply) => {
  const { id } = request.params as { id: string };

  const album = await Album.findByIdAndDelete(id);
  if (!album) {
    reply.notFound(`Album #${id} was not found!`);
    return;
  }

  // delete cover from s3
  await deleteFromS3(album.coverS3Key);

  return album;
};

export { getAlbums, createAlbum, updateAlbum, deleteAlbum };
