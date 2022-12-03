import { RouteHandlerMethod } from "fastify";
import { Types } from "mongoose";
import PainPoint from "@models/PainPoint";

interface CreatePainPointRequest {
  name: string;
  description: string;
  group?: string;
  suggestions: Types.ObjectId[];
}

interface UpdatePainPointRequest {
  name: string;
  description: string;
  group?: string;
  suggestions: Types.ObjectId[];
}

const getPainPoints: RouteHandlerMethod = async (request, reply) => {
  return await PainPoint.find({}).populate("suggestions");
};

const createPainPoint: RouteHandlerMethod = async (request, reply) => {
  let { name, description, group, suggestions } =
    request.body as CreatePainPointRequest;

  if (!Array.isArray(suggestions)) suggestions = [suggestions];
  if (!group) group = name;

  const painPoint = new PainPoint({
    name,
    description,
    group,
    suggestions,
  });

  console.log(painPoint);

  await painPoint.save();

  return await painPoint.populate("suggestions");
};

const updatePainPoint: RouteHandlerMethod = async (request, reply) => {
  const { id } = request.params as { id: string };
  let { name, description, group, suggestions } =
    request.body as UpdatePainPointRequest;

  const painPoint = await PainPoint.findById(id);
  if (!painPoint) {
    reply.notFound(`PainPoint #${id} was not found!`);
    return;
  }

  if (!Array.isArray(suggestions)) suggestions = [suggestions];
  if (!group) group = name;

  painPoint.name = name;
  painPoint.description = description;
  painPoint.group = group;
  painPoint.suggestions = suggestions;

  await painPoint.save();

  return await painPoint.populate("suggestions");
};

const deletePainPoint: RouteHandlerMethod = async (request, reply) => {
  const { id } = request.params as { id: string };

  const painPoint = await PainPoint.findByIdAndDelete(id);
  if (!painPoint) {
    reply.notFound(`PainPoint #${id} was not found!`);
    return;
  }

  return painPoint;
};

export { getPainPoints, createPainPoint, updatePainPoint, deletePainPoint };
