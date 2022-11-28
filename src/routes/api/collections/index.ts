import { FastifyPluginAsync } from "fastify";
import { getCollections } from "@wly/handlers/collections";
import { getCollectionsSchema } from "@schemas/collections";

const collections: FastifyPluginAsync = async (
  fastify,
  opts
): Promise<void> => {
  fastify.get("/", { schema: getCollectionsSchema }, getCollections);
};

export default collections;
