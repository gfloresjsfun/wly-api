import { RouteHandlerMethod } from "fastify";
import { MultipartFile } from "@fastify/multipart";
import { uploadToS3, deleteFromS3 } from "@libs/s3";
import Album from "@models/Album";
import { ObjectCannedACL } from "@aws-sdk/client-s3";

const createAlbum: RouteHandlerMethod = async (request, reply) => {
  let {
    title: { value: title },
    cover,
    shows,
  } = request.body as {
    title: { value: { title: string } };
    cover: MultipartFile;
    shows: [{ value: string }];
  };

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

const getAlbums: RouteHandlerMethod = async (request, reply) => {
  return await Album.find({}).populate("shows");
};

const deleteAlbum: RouteHandlerMethod = async (request, reply) => {
  const { id } = request.params as { id: string };

  const album = await Album.findByIdAndDelete(id);
  if (!album) {
    reply.notFound(`Album #${id} was not found!`);
    return;
  }
  await deleteFromS3(album.coverS3Key);

  return album;
};

export { createAlbum, getAlbums, deleteAlbum };
