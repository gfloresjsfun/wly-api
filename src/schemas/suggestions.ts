import { errorSchemas, idSchema } from "@schemas/common";
import { showSchema } from "@schemas/shows";
import { albumSchema } from "@schemas/albums";

const tipSchema = {
  type: "object",
  properties: {
    title: { type: "string" },
    description: { type: "string" },
  },
};

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

const suggestionSchema = {
  type: "object",
  properties: {
    id: { type: "string" },
    title: { type: "string" },
    description: { type: "string" },
    series: { type: "array", items: playableSchema },
    tips: { type: "array", items: tipSchema },
  },
};

const getSuggestionsRequestSchema = {
  tags: ["Suggestions"],
  summary: "Get suggestions",
  description: `<h3>This API retrievs suggestions.</h3>`,
};

const getSuggestionsResponseSchema = { type: "array", items: suggestionSchema };

export const getSuggestionsSchema = {
  ...getSuggestionsRequestSchema,
  response: {
    200: getSuggestionsResponseSchema,
    ...errorSchemas,
  },
};

const createSuggestionRequestSchema = {
  tags: ["Admin/Suggestions"],
  summary: "Create suggestion",
  description: `<h3>This API creates a suggestion.</h3>`,
  body: {
    type: "object",
    required: ["title", "description", "series"],
    properties: {
      title: { type: "string" },
      description: { type: "string" },
      series: {
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
      tips: {
        type: "array",
        items: tipSchema,
      },
    },
  },
};

const createSuggestionResponseSchema = suggestionSchema;

export const createSuggestionSchema = {
  ...createSuggestionRequestSchema,
  response: {
    200: createSuggestionResponseSchema,
    ...errorSchemas,
  },
};

const updateSuggestionRequestSchema = {
  tags: ["Admin/Suggestions"],
  summary: "Update suggestion",
  description: `<h3>This API updates a suggestion.</h3>`,
  body: {
    type: "object",
    required: ["title", "description", "series"],
    properties: {
      title: { type: "string" },
      description: { type: "string" },
      series: {
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
      tips: {
        type: "array",
        items: tipSchema,
      },
    },
  },
};

const updateSuggestionResponseSchema = suggestionSchema;

export const updateSuggestionSchema = {
  ...updateSuggestionRequestSchema,
  response: {
    200: updateSuggestionResponseSchema,
    ...errorSchemas,
  },
};

const deleteSuggestionRequestSchema = {
  tags: ["Admin/Suggestions"],
  summary: "Delete a suggestion",
  description: `<h3>This API deletes suggestion.</h3>`,
  params: {
    type: "object",
    required: ["id"],
    properties: {
      id: { type: "string" },
    },
  },
};

const deleteSuggestionResponseSchema = suggestionSchema;

export const deleteSuggestionSchema = {
  ...deleteSuggestionRequestSchema,
  response: {
    200: deleteSuggestionResponseSchema,
    ...errorSchemas,
  },
};
