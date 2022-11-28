import { RouteHandlerMethod } from "fastify";
import { Types } from "mongoose";
import Collection from "@models/Collection";
import { IPlayable } from "@wly/types";

interface CreateCollectionRequest {
  title: string;
  playables: IPlayable[];
}

interface UpdateCollectionRequest {
  title: string;
  playables: IPlayable[];
}

const getCollections: RouteHandlerMethod = async (request, reply) => {
  const collections = await Collection.find({}).populate("playables.playable");
  return collections;
};

const createCollection: RouteHandlerMethod = async (request, reply) => {
  const { title, playables } = request.body as CreateCollectionRequest;

  const collection = new Collection({ title, playables });
  await collection.save();

  return await collection.populate("playables.playable");
};

const updateCollection: RouteHandlerMethod = async (request, reply) => {
  const { id } = request.params as { id: string };
  let { title, playables } = request.body as UpdateCollectionRequest;

  const collection = await Collection.findById(id);
  if (!collection) {
    reply.notFound(`Collection #${id} was not found!`);
    return;
  }

  collection.title = title;
  collection.playables = playables as Types.DocumentArray<IPlayable>;

  await collection.save();

  return await collection.populate("playables.playable");
};

const deleteCollection: RouteHandlerMethod = async (request, reply) => {
  const { id } = request.params as { id: string };

  const collection = await Collection.findByIdAndDelete(id);
  if (!collection) {
    reply.notFound(`Collection #${id} was not found!`);
    return;
  }

  return collection;
};

export { getCollections, createCollection, updateCollection, deleteCollection };
