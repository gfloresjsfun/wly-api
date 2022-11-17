import { errorSchemas } from "@schemas/common";

const userSchema = {
  type: "object",
  properties: {
    token: { type: "string" },
    username: { type: "string" },
    role: { type: "string", enum: ["admin", "user"] },
  },
};

const loginRequestSchema = {
  tags: ["Auth"],
  summary: "Authenticate user",
  description: `<h3>This API allows users to authenticate.</h3>`,
  body: {
    title: "Login",
    type: "object",
    required: ["username", "password"],
    properties: {
      username: { type: "string" },
      password: { type: "string" },
    },
  },
};

const loginResponseSchema = userSchema;

export const loginSchema = {
  ...loginRequestSchema,
  response: {
    200: loginResponseSchema,
    ...errorSchemas,
  },
};

const getMeRequestSchema = {
  tags: ["Auth"],
  summary: "Retrieve currently logged in user",
  description: `<h3>This API Retrieve currently logged in user.</h3>`,
};

const getMeResponseSchema = userSchema;

export const getMeSchema = {
  ...getMeRequestSchema,
  response: {
    200: getMeResponseSchema,
    ...errorSchemas,
  },
};
