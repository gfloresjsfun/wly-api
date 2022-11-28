import mongoose from "mongoose";
import { playableSchema } from "./Suggestion";

const collectionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    playables: [playableSchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

const Collection = mongoose.model("Collection", collectionSchema);

export default Collection;
