import { FastifyPluginAsync } from "fastify";
import { createArticle, deleteArticle } from "@handlers/articles";
import { createArticleSchema, deleteArticleSchema } from "@schemas/articles";

const articles: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.post("/", { schema: createArticleSchema }, createArticle);
  fastify.delete("/:id", { schema: deleteArticleSchema }, deleteArticle);
};

export default articles;
