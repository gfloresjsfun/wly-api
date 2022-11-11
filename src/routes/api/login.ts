import { FastifyPluginAsync } from "fastify";
import { login as loginHandler } from "@handlers/auth";

const login: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.post(
    "/",
    {
      schema: {
        body: {
          type: "object",
          required: ["username", "password"],
          properties: {
            username: {
              type: "string",
            },
            password: {
              type: "string",
            },
          },
        },
      },
    },
    loginHandler
  );
};

export default login;
