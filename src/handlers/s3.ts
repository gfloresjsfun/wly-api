import { RouteHandlerMethod } from "fastify";
import { getS3SignedUrl } from "@libs/s3";

const signedUrl: RouteHandlerMethod = async (request, reply) => {
  const { s3Key } = request.params as { s3Key: string };

  return await getS3SignedUrl(s3Key);
};

export { signedUrl };
