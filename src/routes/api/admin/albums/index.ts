import { FastifyPluginAsync } from "fastify";
import { createAlbum, getAlbums, deleteAlbum } from "@handlers/albums";
import {
  createAlbumSchema,
  getAlbumsSchema,
  deleteAlbumSchema,
} from "@schemas/albums";

const albums: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get("/", { schema: getAlbumsSchema }, getAlbums);
  fastify.post("/", { schema: createAlbumSchema }, createAlbum);
  fastify.delete("/:id", { schema: deleteAlbumSchema }, deleteAlbum);
};

export default albums;
