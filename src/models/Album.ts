import { generateS3Key, generateS3Url } from "@libs/s3";
import mongoose from "mongoose";

const coverS3KeyPrefix = "albums/covers";

const albumSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    coverS3Key: {
      type: String,
      required: true,
    },
    shows: {
      type: [mongoose.Types.ObjectId],
      ref: "Show",
    },
  },
  {
    virtuals: {
      coverS3Url: {
        get() {
          return generateS3Url(this.coverS3Key);
        },
      },
    },
    statics: {
      generateCoverS3Key(filename: string) {
        return generateS3Key(coverS3KeyPrefix, filename);
      },
    },
    toJSON: {
      virtuals: true,
    },
  }
);

const Album = mongoose.model("Album", albumSchema);

export default Album;
