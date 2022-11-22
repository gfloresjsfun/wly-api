import { RouteHandlerMethod } from "fastify";
import { Types } from "mongoose";
import Suggestion from "@models/Suggestion";
import { PlayableType } from "@wly/types";

interface ITip {
  summary: string;
  details: string;
}

interface IPlayable {
  playable: Types.ObjectId;
  playableType: PlayableType;
}

interface CreateSuggestionRequest {
  title: string;
  description: string;
  playables: IPlayable[];
  tips?: ITip[];
}

interface UpdateSuggestionRequest {
  title: string;
  description: string;
  playables: IPlayable[];
  tips?: ITip[];
}

const getSuggestions: RouteHandlerMethod = async (request, reply) => {
  const suggestions = await Suggestion.find({}).populate("playables.playable");
  return suggestions;
};

const createSuggestion: RouteHandlerMethod = async (request, reply) => {
  const { title, description, playables, tips } =
    request.body as CreateSuggestionRequest;

  const suggestion = new Suggestion({ title, description, playables, tips });
  await suggestion.save();

  return await suggestion.populate("playables.playable");
};

const updateSuggestion: RouteHandlerMethod = async (request, reply) => {
  const { id } = request.params as { id: string };
  let { title, description, playables, tips } =
    request.body as UpdateSuggestionRequest;

  const suggestion = await Suggestion.findById(id);
  if (!suggestion) {
    reply.notFound(`Suggestion #${id} was not found!`);
    return;
  }

  suggestion.title = title;
  suggestion.description = description;
  suggestion.playables = playables;

  if (tips && Array.isArray(tips)) {
    suggestion.tips = tips;
  }

  await suggestion.save();

  return await suggestion.populate("playables.playable");
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
