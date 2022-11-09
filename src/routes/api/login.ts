import { FastifyPluginAsync } from "fastify";
import { login } from "../../controllers/auth";

const root: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
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
    login
  );
};

export default root;
