import User from "@models/User";
import { FastifyPluginAsync, preHandlerAsyncHookHandler } from "fastify";
import fp from "fastify-plugin";

declare module "fastify" {
  interface FastifyInstance {
    checkIfAdmin: preHandlerAsyncHookHandler;
  }
}

const checkIfAdmin: FastifyPluginAsync = async (fastify, opts) => {
  const hookHandler: preHandlerAsyncHookHandler = async (request, reply) => {
    const user = await User.findById(request.user.id);

    if (!user) {
      reply.unauthorized("Unauthenticated.");
      return;
    }

    if (user.role !== "admin") {
      reply.forbidden("This user is not an admin.");
      return;
    }
  };

  fastify.decorate("checkIfAdmin", hookHandler);
};

export default fp(checkIfAdmin, { name: "checkIfAdmin" });
