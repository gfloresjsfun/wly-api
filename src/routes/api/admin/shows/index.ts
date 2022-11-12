import { FastifyPluginAsync } from "fastify";
import { getShows, createShow, updateShow, deleteShow } from "@handlers/shows";
import {
  getShowsSchema,
  createShowSchema,
  updateShowSchema,
  deleteShowSchema,
} from "@schemas/shows";

const shows: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get("/", { schema: getShowsSchema }, getShows);
  fastify.post("/", { schema: createShowSchema }, createShow);
  fastify.patch("/:id", { schema: updateShowSchema }, updateShow);
  fastify.delete("/:id", { schema: deleteShowSchema }, deleteShow);
};

export default shows;
