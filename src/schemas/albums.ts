import { errorSchemas } from "@schemas/common";
import { coverSchema, showSchema } from "@schemas/shows";

const albumSchema = {
  type: "object",
  properties: {
    id: { type: "string" },
    title: { type: "string" },
    coverS3Url: { type: "string" },
    shows: { type: "array", items: showSchema },
  },
};

const getAlbumsRequestSchema = {
  tags: ["Get albums"],
  summary: "Get albums",
  description: `<h3>This API retrievs albums.</h3>`,
};

const getAlbumsResponseSchema = { type: "array", items: albumSchema };

export const getAlbumsSchema = {
  ...getAlbumsRequestSchema,
  response: {
    200: getAlbumsResponseSchema,
    ...errorSchemas,
  },
};

const createAlbumRequestSchema = {
  tags: ["Create album"],
  summary: "Create album",
  description: `<h3>This API creates a album.</h3>`,
  body: {
    type: "object",
    required: ["title", "cover"],
    properties: {
      title: {
        type: "object",
        properties: {
          value: {
            type: "string",
          },
        },
      },
      cover: coverSchema,
      shows: {
        type: "array",
        items: {
          type: "object",
          properties: {
            value: {
              type: "string",
            },
          },
        },
      },
    },
  },
};

const createAlbumResponseSchema = albumSchema;

export const createAlbumSchema = {
  ...createAlbumRequestSchema,
  response: {
    200: createAlbumResponseSchema,
    ...errorSchemas,
  },
};

const deleteAlbumRequestSchema = {
  tags: ["Delete a album"],
  summary: "Delete a album",
  description: `<h3>This API deletes album.</h3>`,
  params: {
    type: "object",
    required: ["id"],
    properties: {
      id: { type: "string" },
    },
  },
};

const deleteAlbumResponseSchema = albumSchema;

export const deleteAlbumSchema = {
  ...deleteAlbumRequestSchema,
  response: {
    200: deleteAlbumResponseSchema,
    ...errorSchemas,
  },
};
