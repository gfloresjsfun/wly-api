import { errorSchemas } from "@schemas/common";

const mediaSchema = {
  type: "object",
  properties: {
    encoding: { type: "string" },
    filename: { type: "string" },
    limit: { type: "boolean" },
    mimetype: {
      type: "string",
      enum: ["video/mp4", "audio/mp4", "audio/mpeg"],
    },
  },
};

export const coverSchema = {
  type: "object",
  properties: {
    encoding: { type: "string" },
    filename: { type: "string" },
    limit: { type: "boolean" },
    mimetype: {
      type: "string",
      enum: ["image/jpeg", "image/png"],
    },
  },
};

export const showSchema = {
  type: "object",
  properties: {
    id: { type: "string" },
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
  tags: ["Get shows"],
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
  tags: ["Create show"],
  summary: "Create show",
  description: `<h3>This API creates a show.</h3>`,
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
  tags: ["Delete a show"],
  summary: "Delete a show",
  description: `<h3>This API deletes show.</h3>`,
  params: {
    type: "object",
    required: ["id"],
    properties: {
      id: { type: "string" },
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
  tags: ["Update a show"],
  summary: "Update a show",
  description: `<h3>This API updates show.</h3>`,
  params: {
    type: "object",
    required: ["id"],
    properties: {
      id: { type: "string" },
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
