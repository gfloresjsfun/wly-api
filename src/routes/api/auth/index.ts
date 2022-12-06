import { FastifyPluginAsync } from "fastify";
import {
  loginWithGoogle as loginWithGoogleHandler,
  registerWithGoogle as registerWithGoogleHandler,
  getMe as getMeHandler,
} from "@handlers/auth";
import { loginWithGoogleSchema, registerWithGoogleSchema, getMeSchema } from "@schemas/auth";

const auth: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.post(
    "/login-with-google",
    { schema: loginWithGoogleSchema },
    loginWithGoogleHandler
  );
  fastify.post(
    "/register-with-google",
    { schema: registerWithGoogleSchema },
    registerWithGoogleHandler
  );
  fastify.get(
    "/me",
    {
      schema: getMeSchema,
      preHandler: [fastify.authenticate],
    },
    getMeHandler
  );
};

export default auth;
