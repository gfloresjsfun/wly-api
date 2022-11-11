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

const coverSchema = {
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

const createCourseRequestSchema = {
  tags: ["Create course"],
  summary: "Create course",
  description: `<h3>This API creates a course.</h3>`,
  body: {
    type: "object",
    required: ["title", "covers", "medias"],
    properties: {
      title: {
        type: "object",
        properties: {
          value: {
            type: "string",
          },
        },
      },
      covers: {
        oneOf: [
          {
            type: "array",
            minItems: 1,
            items: coverSchema,
          },
          coverSchema,
        ],
      },
      medias: {
        oneOf: [
          {
            type: "array",
            minItems: 1,
            items: mediaSchema,
          },
          mediaSchema,
        ],
      },
    },
  },
};

const sessionSchema = {
  type: "object",
  properties: {
    coverS3Key: { type: "string" },
    mediaS3Key: { type: "string" },
    mimetype: {
      type: "string",
      enum: ["video/mp4", "audio/mp4", "audio/mpeg"],
    },
    duration: { type: "number" },
  },
};

const courseSchema = {
  type: "object",
  properties: {
    id: { type: "string" },
    title: { type: "string" },
    sessions: { type: "array", items: sessionSchema },
  },
};

const createCourseResponseSchema = courseSchema;

export const createCourseSchema = {
  ...createCourseRequestSchema,
  response: {
    200: createCourseResponseSchema,
    ...errorSchemas,
  },
};

const getCoursesRequestSchema = {
  tags: ["Get courses"],
  summary: "Get courses",
  description: `<h3>This API retrievs courses.</h3>`,
};

const getCoursesResponseSchema = { type: "array", items: courseSchema };

export const getCoursesSchema = {
  ...getCoursesRequestSchema,
  response: {
    200: getCoursesResponseSchema,
    ...errorSchemas,
  },
};
