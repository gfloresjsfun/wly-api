import {
  FastifyInstance,
  FastifyPluginAsync,
  onRequestAsyncHookHandler,
} from "fastify";
import User from "../../../models/User";

const admin: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  const { authenticate } = fastify as FastifyInstance & {
    authenticate: onRequestAsyncHookHandler;
  };

  fastify.addHook("onRequest", authenticate);
  fastify.addHook("onRequest", async (request, reply) => {
    console.log("Checking if admin...");
    const user = await User.findById(request.user.id);

    if (!user) {
      reply.unauthorized("Unauthenticated.");
      return;
    }

    if (user.role !== "admin") {
      reply.forbidden("This user is not an admin.");
      return;
    }
  });

  fastify.get("/", async function (request, reply) {
    return "Welcome";
  });
};

export default admin;
