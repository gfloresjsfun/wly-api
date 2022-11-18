import { FastifyPluginAsync } from "fastify";
import {
  createSuggestion,
  updateSuggestion,
  deleteSuggestion,
} from "@handlers/suggestions";
import {
  createSuggestionSchema,
  updateSuggestionSchema,
  deleteSuggestionSchema,
} from "@schemas/suggestions";

const suggestions: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.post("/", { schema: createSuggestionSchema }, createSuggestion);
  fastify.patch("/:id", { schema: updateSuggestionSchema }, updateSuggestion);
  fastify.delete("/:id", { schema: deleteSuggestionSchema }, deleteSuggestion);
};

export default suggestions;
