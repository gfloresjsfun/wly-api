import { errorSchemas } from "@schemas/common";

const userSchema = {
  type: "object",
  properties: {
    token: { type: "string" },
    email: { type: "string" },
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
    required: ["email", "password"],
    properties: {
      email: { type: "string" },
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

const loginWithGoogleRequestSchema = {
  tags: ["Auth"],
  summary: "Authenticate user with google",
  description: `<h3>This API allows users to authenticate with google.</h3>`,
  body: {
    title: "Login with google",
    type: "object",
    required: ["providerId"],
    properties: {
      providerId: { type: "string" },
    },
  },
};

const loginWithGoogleResponseSchema = userSchema;

export const loginWithGoogleSchema = {
  ...loginWithGoogleRequestSchema,
  response: {
    200: loginWithGoogleResponseSchema,
    ...errorSchemas,
  },
};

const registerWithGoogleRequestSchema = {
  tags: ["Auth"],
  summary: "Register user with google",
  description: `<h3>This API allows users to authenticate with google.</h3>`,
  body: {
    title: "Register with google",
    type: "object",
    required: ["providerId", "email", "name"],
    properties: {
      providerId: { type: "string" },
      email: { type: "string" },
      name: { type: "string" },
    },
  },
};

const registerWithGoogleResponseSchema = userSchema;

export const registerWithGoogleSchema = {
  ...registerWithGoogleRequestSchema,
  response: {
    200: registerWithGoogleResponseSchema,
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
