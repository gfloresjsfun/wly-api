import mongoose from "mongoose";

const tipSchema = new mongoose.Schema({
  brief: {
    type: String,
    required: true,
  },
  description: String,
});

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
    shows: {
      type: [mongoose.Types.ObjectId],
      ref: "Show",
    },
    tips: [tipSchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

const Article = mongoose.model("Article", articleSchema);

export default Article;
