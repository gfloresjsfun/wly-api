import {
  coverSchema,
  mediaSchema,
  errorSchemas,
  idSchema,
} from "@schemas/common";

export const showSchema = {
  type: "object",
  properties: {
    id: idSchema,
    title: { type: "string" },
    coverS3Url: { type: "string" },
    mediaS3Key: { type: "string" },
    mimetype: {
      type: "string",
      enum: ["video/mp4", "audio/mp4", "audio/mpeg"],
    },
    duration: { type: "number" },
  },
};

const getShowsRequestSchema = {
  tags: ["Shows"],
  summary: "Get shows",
  description: `<h3>This API retrievs shows.</h3>`,
};

const getShowsResponseSchema = { type: "array", items: showSchema };

export const getShowsSchema = {
  ...getShowsRequestSchema,
  response: {
    200: getShowsResponseSchema,
    ...errorSchemas,
  },
};

const createShowRequestSchema = {
  tags: ["Admin/Shows"],
  summary: "Create show",
  description: `<h3>This API creates a show.</h3>`,
  consumes: ["multipart/form-data"],
  body: {
    type: "object",
    required: ["title", "cover", "media"],
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
      media: mediaSchema,
    },
  },
};

const createShowResponseSchema = showSchema;

export const createShowSchema = {
  ...createShowRequestSchema,
  response: {
    200: createShowResponseSchema,
    ...errorSchemas,
  },
};

const deleteShowRequestSchema = {
  tags: ["Admin/Shows"],
  summary: "Delete a show",
  description: `<h3>This API deletes show.</h3>`,
  params: {
    type: "object",
    required: ["id"],
    properties: {
      id: idSchema,
    },
  },
};

const deleteShowResponseSchema = showSchema;

export const deleteShowSchema = {
  ...deleteShowRequestSchema,
  response: {
    200: deleteShowResponseSchema,
    ...errorSchemas,
  },
};

const updateShowRequestSchema = {
  tags: ["Admin/Shows"],
  summary: "Update a show",
  description: `<h3>This API updates show.</h3>`,
  consumes: ["multipart/form-data"],
  params: {
    type: "object",
    required: ["id"],
    properties: {
      id: idSchema,
    },
  },
  body: {
    type: "object",
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
      media: mediaSchema,
    },
  },
};

const updateShowResponseSchema = showSchema;

export const updateShowSchema = {
  ...updateShowRequestSchema,
  response: {
    200: updateShowResponseSchema,
    ...errorSchemas,
  },
};
