import { errorSchemas, idSchema } from "@schemas/common";
import { showSchema } from "@schemas/shows";

const tipSchema = {
  type: "object",
  properties: {
    brief: { type: "string" },
    description: { type: "string" },
  },
};

const articleSchema = {
  type: "object",
  properties: {
    id: { type: "string" },
    title: { type: "string" },
    shows: { type: "array", items: showSchema },
    tips: { type: "array", items: tipSchema },
  },
};

const getArticlesRequestSchema = {
  tags: ["Get articles"],
  summary: "Get articles",
  description: `<h3>This API retrievs articles.</h3>`,
};

const getArticlesResponseSchema = { type: "array", items: articleSchema };

export const getArticlesSchema = {
  ...getArticlesRequestSchema,
  response: {
    200: getArticlesResponseSchema,
    ...errorSchemas,
  },
};

const createArticleRequestSchema = {
  tags: ["Create article"],
  summary: "Create article",
  description: `<h3>This API creates a article.</h3>`,
  body: {
    type: "object",
    required: ["title", "content", "shows"],
    properties: {
      title: { type: "string" },
      content: { type: "string" },
      shows: {
        type: "array",
        items: idSchema,
      },
      tips: {
        type: "array",
        items: tipSchema,
      },
    },
  },
};

const createArticleResponseSchema = articleSchema;

export const createArticleSchema = {
  ...createArticleRequestSchema,
  response: {
    200: createArticleResponseSchema,
    ...errorSchemas,
  },
};

const updateArticleRequestSchema = {
  tags: ["Update article"],
  summary: "Update article",
  description: `<h3>This API updates a article.</h3>`,
  body: {
    type: "object",
    required: ["title", "content", "shows"],
    properties: {
      title: { type: "string" },
      content: { type: "string" },
      shows: {
        type: "array",
        items: idSchema,
      },
      tips: {
        type: "array",
        items: tipSchema,
      },
    },
  },
};

const updateArticleResponseSchema = articleSchema;

export const updateArticleSchema = {
  ...updateArticleRequestSchema,
  response: {
    200: updateArticleResponseSchema,
    ...errorSchemas,
  },
};

const deleteArticleRequestSchema = {
  tags: ["Delete a article"],
  summary: "Delete a article",
  description: `<h3>This API deletes article.</h3>`,
  params: {
    type: "object",
    required: ["id"],
    properties: {
      id: { type: "string" },
    },
  },
};

const deleteArticleResponseSchema = articleSchema;

export const deleteArticleSchema = {
  ...deleteArticleRequestSchema,
  response: {
    200: deleteArticleResponseSchema,
    ...errorSchemas,
  },
};
