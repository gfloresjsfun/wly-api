import { FastifyPluginAsync } from "fastify";
import {
  createArticle,
  updateArticle,
  deleteArticle,
} from "@handlers/articles";
import {
  createArticleSchema,
  updateArticleSchema,
  deleteArticleSchema,
} from "@schemas/articles";

const articles: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.post("/", { schema: createArticleSchema }, createArticle);
  fastify.patch("/:id", { schema: updateArticleSchema }, updateArticle);
  fastify.delete("/:id", { schema: deleteArticleSchema }, deleteArticle);
};

export default articles;
