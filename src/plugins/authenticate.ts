import { FastifyPluginAsync, preHandlerAsyncHookHandler } from "fastify";
import fp from "fastify-plugin";

declare module "fastify" {
  interface FastifyInstance {
    authenticate: preHandlerAsyncHookHandler;
  }
}

const authenticate: FastifyPluginAsync = async (fastify, opts) => {
  const hookHandler: preHandlerAsyncHookHandler = async (request, reply) => {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.send(err);
    }
  };

  fastify.decorate("authenticate", hookHandler);
};

export default fp(authenticate, { name: "authenticate" });
