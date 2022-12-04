import { errorSchemas, idSchema } from "@schemas/common";
import { suggestionSchema } from "./suggestions";

export const painPointSchema = {
  type: "object",
  properties: {
    id: idSchema,
    name: { type: "string" },
    description: { type: "string" },
    group: { type: "string" },
    suggestions: { type: "array", items: suggestionSchema },
  },
};

const getPainPointsRequestSchema = {
  tags: ["Pain Points"],
  summary: "Get pain points",
  description: `<h3>This API retrievs pain points.</h3>`,
};

const getPainPointsResponseSchema = { type: "array", items: painPointSchema };

export const getPainPointsSchema = {
  ...getPainPointsRequestSchema,
  response: {
    200: getPainPointsResponseSchema,
    ...errorSchemas,
  },
};

const getPainPointGroupsRequestSchema = {
  tags: ["Pain Points"],
  summary: "Get pain point groups",
  description: `<h3>This API retrievs pain point groups.</h3>`,
};

const getPainPointGroupsResponseSchema = {
  type: "array",
  items: { type: "string" },
};

export const getPainPointGroupsSchema = {
  ...getPainPointGroupsRequestSchema,
  response: {
    200: getPainPointGroupsResponseSchema,
    ...errorSchemas,
  },
};

const createPainPointRequestSchema = {
  tags: ["Admin/PainPoints"],
  summary: "Create pain point",
  description: `<h3>This API creates a pain point.</h3>`,
  body: {
    type: "object",
    required: ["name", "description", "suggestions"],
    properties: {
      name: { type: "string" },
      description: { type: "string" },
      group: { type: "string" },
      suggestions: {
        type: "array",
        minItems: 1,
        items: idSchema,
      },
    },
  },
};

const createPainPointResponseSchema = painPointSchema;

export const createPainPointSchema = {
  ...createPainPointRequestSchema,
  response: {
    200: createPainPointResponseSchema,
    ...errorSchemas,
  },
};

const updatePainPointRequestSchema = {
  tags: ["Admin/PainPoints"],
  summary: "Update a pain point",
  description: `<h3>This API updates pain point.</h3>`,
  params: {
    type: "object",
    required: ["id"],
    properties: {
      id: idSchema,
    },
  },
  body: {
    type: "object",
    required: ["name", "description", "suggestions"],
    properties: {
      name: { type: "string" },
      description: { type: "string" },
      group: { type: "string" },
      suggestions: {
        type: "array",
        minItems: 1,
        items: idSchema,
      },
    },
  },
};

const updatePainPointResponseSchema = painPointSchema;

export const updatePainPointSchema = {
  ...updatePainPointRequestSchema,
  response: {
    200: updatePainPointResponseSchema,
    ...errorSchemas,
  },
};

const deletePainPointRequestSchema = {
  tags: ["Admin/PainPoints"],
  summary: "Delete a pain point",
  description: `<h3>This API deletes pain point.</h3>`,
  params: {
    type: "object",
    required: ["id"],
    properties: {
      id: idSchema,
    },
  },
};

const deletePainPointResponseSchema = painPointSchema;

export const deletePainPointSchema = {
  ...deletePainPointRequestSchema,
  response: {
    200: deletePainPointResponseSchema,
    ...errorSchemas,
  },
};
