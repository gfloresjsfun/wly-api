import { FastifyPluginAsync } from "fastify";
import { createAlbum, deleteAlbum } from "@handlers/albums";
import { createAlbumSchema, deleteAlbumSchema } from "@schemas/albums";

const albums: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.post("/", { schema: createAlbumSchema }, createAlbum);
  fastify.delete("/:id", { schema: deleteAlbumSchema }, deleteAlbum);
};

export default albums;
