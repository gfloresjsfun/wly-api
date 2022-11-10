import {
  FastifyPluginAsync,
} from "fastify";

const admin: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get("/", { preHandler: [fastify.authenticate, fastify.checkIfAdmin] }, async function (request, reply) {
    return "Welcome";
  });
};

export default admin;
