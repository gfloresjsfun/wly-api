import mongoose from "mongoose";

const suggestionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    playables: [
      {
        playable: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          refPath: "playables.playableType",
        },
        playableType: {
          type: String,
          required: true,
          enum: ["Album", "Show"],
        },
      },
    ],
    tips: [
      {
        summary: {
          type: String,
          required: true,
        },
        details: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

const Suggestion = mongoose.model("Suggestion", suggestionSchema);

export default Suggestion;
