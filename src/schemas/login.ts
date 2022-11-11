import { errorSchemas } from "@schemas/common";

const loginRequestSchema = {
  tags: ["Login"],
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

const loginResponseSchema = {
  type: "object",
  properties: {
    token: { type: "string" },
    username: { type: "string" },
    role: { type: "string", enum: ["admin", "user"] },
  },
};

export const loginSchema = {
  ...loginRequestSchema,
  response: {
    200: loginResponseSchema,
    ...errorSchemas,
  },
};
