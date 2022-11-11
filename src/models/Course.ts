import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema(
  {
    coverS3Key: {
      type: String,
      required: true,
    },
    mimetype: {
      type: String,
      enum: ["audio/mpeg", "video/mp4"],
      required: true,
    },
    mediaS3Key: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    sessions: {
      type: [sessionSchema],
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

const Course = mongoose.model("Course", courseSchema);

export default Course;
