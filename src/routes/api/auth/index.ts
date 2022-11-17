import { FastifyPluginAsync } from "fastify";
import { login as loginHandler, getMe as getMeHandler } from "@handlers/auth";
import { loginSchema, getMeSchema } from "@schemas/auth";

const auth: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.post("/login", { schema: loginSchema }, loginHandler);
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
