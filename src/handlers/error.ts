import {
  FastifyError,
  FastifyReply,
  FastifyRequest,
  ValidationResult,
} from "fastify";

function validationErrorMessage(error: ValidationResult) {
  const { message, params } = error;
  const allowedValues =
    params && Array.isArray(params.allowedValues)
      ? `: ${params.allowedValues.map((v) => `'${v}'`).join(", ")}`
      : "";
  return `${message}${allowedValues}`;
}

export const errorHandler = (
  error: FastifyError,
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { validation } = error;

  if (Array.isArray(validation)) {
    const body = {
      errors: validation.map((err) => ({
        code: "REQUEST_VALIDATION_ERROR",
        message: validationErrorMessage(err),
      })),
    };
    reply.code(400);
    reply.type("application/json");
    reply.send(body);
    return;
  }

  if (error.statusCode) reply.status(error.statusCode).send(error.message);
};
