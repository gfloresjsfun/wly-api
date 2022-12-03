import { FastifyPluginAsync } from "fastify";
import {
  createPainPoint,
  updatePainPoint,
  deletePainPoint,
} from "@handlers/painPoints";
import {
  createPainPointSchema,
  updatePainPointSchema,
  deletePainPointSchema,
} from "@schemas/painPoints";

const painPoints: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.post("/", { schema: createPainPointSchema }, createPainPoint);
  fastify.put("/:id", { schema: updatePainPointSchema }, updatePainPoint);
  fastify.delete("/:id", { schema: deletePainPointSchema }, deletePainPoint);
};

export default painPoints;
