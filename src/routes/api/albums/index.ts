import { FastifyPluginAsync } from "fastify";
import { getAlbums } from "@handlers/albums";
import { getAlbumsSchema } from "@schemas/albums";

const albums: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get("/", { schema: getAlbumsSchema }, getAlbums);
};

export default albums;
