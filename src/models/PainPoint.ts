import mongoose from "mongoose";

const painPointSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    group: {
      type: String,
      required: true,
    },
    suggestions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Suggestion",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

const PainPoint = mongoose.model("PainPoint", painPointSchema);

export default PainPoint;
