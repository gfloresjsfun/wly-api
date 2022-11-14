import { FastifyPluginAsync } from "fastify";
import { getSuggestions } from "@wly/handlers/suggestions";
import { getSuggestionsSchema } from "@schemas/suggestions";

const suggestions: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get("/", { schema: getSuggestionsSchema }, getSuggestions);
};

export default suggestions;
