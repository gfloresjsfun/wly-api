import { FastifyPluginAsync } from "fastify";
import { getMe as getMeHandler } from "@handlers/auth";
import { getMeSchema } from "@schemas/auth";

const auth: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get(
    "/me",
    {
      schema: getMeSchema,
      preHandler: [fastify.authenticate],
    },
    getMeHandler
  );
};

export default auth;
