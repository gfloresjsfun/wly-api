import { FastifyPluginAsync } from "fastify";
import { getArticles } from "@handlers/articles";
import { getArticlesSchema } from "@schemas/articles";

const articles: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get("/", { schema: getArticlesSchema }, getArticles);
};

export default articles;
