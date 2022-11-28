import { FastifyPluginAsync } from "fastify";
import {
  createCollection,
  updateCollection,
  deleteCollection,
} from "@handlers/collections";
import {
  createCollectionSchema,
  updateCollectionSchema,
  deleteCollectionSchema,
} from "@schemas/collections";

const collections: FastifyPluginAsync = async (
  fastify,
  opts
): Promise<void> => {
  fastify.post("/", { schema: createCollectionSchema }, createCollection);
  fastify.put("/:id", { schema: updateCollectionSchema }, updateCollection);
  fastify.delete("/:id", { schema: deleteCollectionSchema }, deleteCollection);
};

export default collections;
