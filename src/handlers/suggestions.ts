import { RouteHandlerMethod } from "fastify";
import { Types } from "mongoose";
import Suggestion from "@models/Suggestion";
import { PlayableType } from "@wly/types";

interface CreateSuggestionRequest {
  title: string;
  description: string;
  series: Array<{ playable: Types.ObjectId; playableType: PlayableType }>;
  tips?: Array<{ title: string; description?: string }>;
}

interface UpdateSuggestionRequest {
  title: string;
  description: string;
  series: Array<{ playable: Types.ObjectId; playableType: PlayableType }>;
  tips?: Array<{ title: string; description?: string }>;
}

const getSuggestions: RouteHandlerMethod = async (request, reply) => {
  const suggestions = await Suggestion.find({}).populate("series.playable");
  console.log(suggestions[0].series)
  return suggestions
};

const createSuggestion: RouteHandlerMethod = async (request, reply) => {
  let { title, description, series, tips } =
    request.body as CreateSuggestionRequest;

  const suggestion = new Suggestion({ title, description, series, tips });
  await suggestion.save();

  return await suggestion.populate("series");
};

const updateSuggestion: RouteHandlerMethod = async (request, reply) => {
  const { id } = request.params as { id: string };
  let { title, description, series, tips } =
    request.body as UpdateSuggestionRequest;

  const suggestion = await Suggestion.findById(id);
  if (!suggestion) {
    reply.notFound(`Suggestion #${id} was not found!`);
    return;
  }

  suggestion.title = title;
  suggestion.description = description;
  suggestion.series = series;

  if (tips && Array.isArray(tips)) {
    suggestion.tips = tips;
  }

  await suggestion.save();

  return await suggestion.populate("series");
};

const deleteSuggestion: RouteHandlerMethod = async (request, reply) => {
  const { id } = request.params as { id: string };

  const suggestion = await Suggestion.findByIdAndDelete(id);
  if (!suggestion) {
    reply.notFound(`Suggestion #${id} was not found!`);
    return;
  }

  return suggestion;
};

export { getSuggestions, createSuggestion, updateSuggestion, deleteSuggestion };
