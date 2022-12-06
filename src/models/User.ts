import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  provider: {
    type: String,
    enum: ["apple", "facebook", "google", "linkedIn", "twitter"],
  },
  providerId: {
    type: String,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
});

const User = mongoose.model("User", userSchema);

export default User;
