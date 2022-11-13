import { FastifyPluginAsync } from "fastify";
import { createArticle, getArticles, deleteArticle } from "@handlers/articles";
import {
  createArticleSchema,
  getArticlesSchema,
  deleteArticleSchema,
} from "@schemas/articles";

const articles: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get("/", { schema: getArticlesSchema }, getArticles);
  fastify.post("/", { schema: createArticleSchema }, createArticle);
  fastify.delete("/:id", { schema: deleteArticleSchema }, deleteArticle);
};

export default articles;
