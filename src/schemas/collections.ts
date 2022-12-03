import { errorSchemas, idSchema } from "@schemas/common";
import { showSchema } from "@schemas/shows";
import { albumSchema } from "@schemas/albums";

const playableSchema = {
  type: "object",
  required: ["playable", "playableType"],
  properties: {
    playable: showSchema || albumSchema,
    playableType: {
      type: "string",
      enum: ["Show", "Album"],
    },
  },
};

const collectionSchema = {
  type: "object",
  properties: {
    id: idSchema,
    title: { type: "string" },
    playables: { type: "array", items: playableSchema },
  },
};

const getCollectionsRequestSchema = {
  tags: ["Collections"],
  summary: "Get collections",
  description: `<h3>This API retrievs collections.</h3>`,
};

const getCollectionsResponseSchema = { type: "array", items: collectionSchema };

export const getCollectionsSchema = {
  ...getCollectionsRequestSchema,
  response: {
    200: getCollectionsResponseSchema,
    ...errorSchemas,
  },
};

const createCollectionRequestSchema = {
  tags: ["Admin/Collections"],
  summary: "Create collection",
  description: `<h3>This API creates a collection.</h3>`,
  body: {
    type: "object",
    required: ["title", "playables"],
    properties: {
      title: { type: "string" },
      playables: {
        type: "array",
        items: {
          type: "object",
          required: ["playable", "playableType"],
          properties: {
            playable: idSchema,
            playableType: {
              type: "string",
              enum: ["Show", "Album"],
            },
          },
        },
      },
    },
  },
};

const createCollectionResponseSchema = collectionSchema;

export const createCollectionSchema = {
  ...createCollectionRequestSchema,
  response: {
    200: createCollectionResponseSchema,
    ...errorSchemas,
  },
};

const updateCollectionRequestSchema = {
  tags: ["Admin/Collections"],
  summary: "Update collection",
  description: `<h3>This API updates a collection.</h3>`,
  body: {
    type: "object",
    required: ["title", "playables"],
    properties: {
      title: { type: "string" },
      playables: {
        type: "array",
        items: {
          type: "object",
          required: ["playable", "playableType"],
          properties: {
            playable: idSchema,
            playableType: {
              type: "string",
              enum: ["Show", "Album"],
            },
          },
        },
      },
    },
  },
};

const updateCollectionResponseSchema = collectionSchema;

export const updateCollectionSchema = {
  ...updateCollectionRequestSchema,
  response: {
    200: updateCollectionResponseSchema,
    ...errorSchemas,
  },
};

const deleteCollectionRequestSchema = {
  tags: ["Admin/Collections"],
  summary: "Delete a collection",
  description: `<h3>This API deletes collection.</h3>`,
  params: {
    type: "object",
    required: ["id"],
    properties: {
      id: idSchema,
    },
  },
};

const deleteCollectionResponseSchema = collectionSchema;

export const deleteCollectionSchema = {
  ...deleteCollectionRequestSchema,
  response: {
    200: deleteCollectionResponseSchema,
    ...errorSchemas,
  },
};
