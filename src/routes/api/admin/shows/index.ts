import { FastifyPluginAsync } from "fastify";
import { createShow, updateShow, deleteShow } from "@handlers/shows";
import {
  createShowSchema,
  updateShowSchema,
  deleteShowSchema,
} from "@schemas/shows";

const shows: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.post("/", { schema: createShowSchema }, createShow);
  fastify.patch("/:id", { schema: updateShowSchema }, updateShow);
  fastify.delete("/:id", { schema: deleteShowSchema }, deleteShow);
};

export default shows;
