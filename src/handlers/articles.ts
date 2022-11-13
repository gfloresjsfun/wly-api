import { RouteHandlerMethod } from "fastify";
import { Types } from "mongoose";
import Article from "@models/Article";

interface CreateArticleRequest {
  title: string;
  content: string;
  shows: Array<Types.ObjectId>;
  tips?: Array<{ brief: string; description?: string }>;
}

interface UpdateArticleRequest {
  title: string;
  content: string;
  shows: Array<Types.ObjectId>;
  tips?: Array<{ brief: string; description?: string }>;
}

const getArticles: RouteHandlerMethod = async (request, reply) => {
  return await Article.find({}).populate("shows");
};

const createArticle: RouteHandlerMethod = async (request, reply) => {
  let { title, content, shows, tips } = request.body as CreateArticleRequest;

  const article = new Article({ title, content, shows, tips });
  await article.save();

  return await article.populate("shows");
};

const updateArticle: RouteHandlerMethod = async (request, reply) => {
  const { id } = request.params as { id: string };
  let { title, content, shows, tips } = request.body as UpdateArticleRequest;

  const article = await Article.findById(id);
  if (!article) {
    reply.notFound(`Article #${id} was not found!`);
    return;
  }

  article.title = title;
  article.content = content;
  article.shows = shows;

  if (tips && Array.isArray(tips)) {
    article.tips = tips;
  }

  await article.save();

  return await article.populate("shows");
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

export { getArticles, createArticle, updateArticle, deleteArticle };
