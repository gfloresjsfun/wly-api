import { FastifyPluginAsync } from "fastify";
import { login as loginHandler } from "@handlers/auth";
import { loginSchema } from "@schemas/login";

const auth: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.post("/login", { schema: loginSchema }, loginHandler);
};

export default auth;
