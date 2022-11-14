import { join } from "path";
import AutoLoad, { AutoloadPluginOptions } from "@fastify/autoload";
import { FastifyPluginAsync } from "fastify";
import fastifyEnv from "@fastify/env";
import fastifyJwt from "@fastify/jwt";
import fastifyMultipart from "@fastify/multipart";
import fastifyFormBody from "@fastify/formbody";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import fastifyBcrypt from "fastify-bcrypt";
import mongoose from "mongoose";
import { errorHandler } from "@handlers/error";

const MONGO_URL = process.env["MONGO_URL"] || "mongodb://localhost:27017/wly";

export type AppOptions = {
  // Place your custom options for app below here.
} & Partial<AutoloadPluginOptions>;

// Pass --options via CLI arguments in command to enable these options.
const options: AppOptions = {};

const app: FastifyPluginAsync<AppOptions> = async (
  fastify,
  opts
): Promise<void> => {
  mongoose
    .connect(MONGO_URL)
    .then(() => console.log("MongoDB connected..."))
    .catch((err) => console.log(err));

  void fastify.register(fastifyFormBody);

  void fastify.register(fastifyMultipart, {
    attachFieldsToBody: true,
  });

  void fastify.register(AutoLoad, {
    dir: join(__dirname, "plugins"),
    options: opts,
  });

  void fastify.register(fastifySwagger);

  void fastify.register(fastifySwaggerUi, {
    routePrefix: "/documentation",
    uiConfig: {
      docExpansion: "full",
      deepLinking: false,
    },
    staticCSP: true,
    transformSpecificationClone: true,
  });

  void fastify.register(AutoLoad, {
    dir: join(__dirname, "routes"),
    options: opts,
  });

  void fastify.register(fastifyJwt, {
    secret: process.env.SECRET || "secret",
  });

  void fastify.register(fastifyEnv, {
    dotenv: true,
    schema: {
      type: "object",
    },
  });

  void fastify.register(fastifyBcrypt, {
    saltWorkFactor: parseInt(process.env.SALT || "12"),
  });

  fastify.setErrorHandler(errorHandler);
};

export default app;
export { app, options };
