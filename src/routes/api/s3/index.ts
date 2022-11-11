import { FastifyPluginAsync } from "fastify";
import { signedUrl as signedUrlHandler } from "@handlers/s3";

const signedUrl: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get(
    "signed-url/:s3Key",
    {
      schema: {
        params: {
          type: "object",
          required: ["s3Key"],
          properties: {
            s3Key: {
              type: "string",
            },
          },
        },
      },
    },
    signedUrlHandler
  );
};

export default signedUrl;
