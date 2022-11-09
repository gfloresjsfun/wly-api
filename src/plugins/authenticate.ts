import { FastifyPluginAsync, onRequestAsyncHookHandler } from "fastify";
import fp from "fastify-plugin";

const authenticate: FastifyPluginAsync = async (fastify, opts) => {
  const hookHandler: onRequestAsyncHookHandler = async (request, reply) => {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.send(err);
    }
  };

  fastify.decorate("authenticate", hookHandler);
};

export default fp(authenticate, { name: "authenticate" });
