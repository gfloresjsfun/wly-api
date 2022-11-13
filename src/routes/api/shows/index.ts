import { FastifyPluginAsync } from "fastify";
import { getShows } from "@handlers/shows";
import { getShowsSchema } from "@schemas/shows";

const shows: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get("/", { schema: getShowsSchema }, getShows);
};

export default shows;
