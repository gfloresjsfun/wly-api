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
        title: {
          type: String,
          required: true,
        },
        description: String,
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
