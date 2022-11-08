import {
  FastifyPluginAsync,
  preHandlerAsyncHookHandler,
} from "fastify";
import fp from "fastify-plugin";

const authorization: FastifyPluginAsync = async (fastify, opts) => {
  const authorize: preHandlerAsyncHookHandler = async (request, reply) => {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.send(err);
    }
  };

  fastify.decorate("authorize", authorize);
};

export default fp(authorization, { name: "authorization" });
