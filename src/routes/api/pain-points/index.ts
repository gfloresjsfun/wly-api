import { FastifyPluginAsync } from "fastify";
import { getPainPoints } from "@handlers/painPoints";
import { getPainPointsSchema } from "@schemas/painPoints";

const painPoints: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get("/", { schema: getPainPointsSchema }, getPainPoints);
};

export default painPoints;
