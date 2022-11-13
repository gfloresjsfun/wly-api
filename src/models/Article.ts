import mongoose from "mongoose";

const articleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    shows: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Show",
      },
    ],
    tips: [
      {
        brief: {
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

const Article = mongoose.model("Article", articleSchema);

export default Article;
