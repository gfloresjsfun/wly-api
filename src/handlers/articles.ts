import { RouteHandlerMethod } from "fastify";
import Article from "@models/Article";

interface CreateArticleRequest {
  title: string;
  content: string;
  shows: Array<string>;
  tips: Array<{ brief: string; description: string }>;
}

const createArticle: RouteHandlerMethod = async (request, reply) => {
  let { title, content, shows, tips } = request.body as CreateArticleRequest;

  const article = new Article({ title, content, shows, tips });
  await article.save();

  return await article.populate("shows");
};

const getArticles: RouteHandlerMethod = async (request, reply) => {
  return await Article.find({}).populate("shows");
};

const deleteArticle: RouteHandlerMethod = async (request, reply) => {
  const { id } = request.params as { id: string };

  const article = await Article.findByIdAndDelete(id);
  if (!article) {
    reply.notFound(`Article #${id} was not found!`);
    return;
  }

  return article;
};

export { createArticle, getArticles, deleteArticle };
