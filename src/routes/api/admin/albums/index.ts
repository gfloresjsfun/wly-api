import { FastifyPluginAsync } from "fastify";
import { createAlbum, updateAlbum, deleteAlbum } from "@handlers/albums";
import {
  createAlbumSchema,
  updateAlbumSchema,
  deleteAlbumSchema,
} from "@schemas/albums";

const albums: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.post("/", { schema: createAlbumSchema }, createAlbum);
  fastify.patch("/:id", { schema: updateAlbumSchema }, updateAlbum);
  fastify.delete("/:id", { schema: deleteAlbumSchema }, deleteAlbum);
};

export default albums;
