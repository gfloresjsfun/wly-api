import {
  FastifyInstance,
  FastifyPluginAsync,
  onRequestAsyncHookHandler,
} from "fastify";
import User from "../../../models/User";

const admin: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  const { authorize } = fastify as FastifyInstance & {
    authorize: onRequestAsyncHookHandler;
  };

  fastify.addHook("onRequest", authorize);
  fastify.addHook("onRequest", async (request, reply) => {
    console.log("Checking if admin...")
    const { userId } = <{ userId: string }>request.user;

    const user = await User.findById(userId);

    if (!user) {
      reply.unauthorized("Unauthenticated.");
    } else if (user.role !== "admin") {
      reply.unauthorized("This user is not an admin.");
    }
  });

  fastify.get("/", async function (request, reply) {
    return "Welcome";
  });
};

export default admin;
