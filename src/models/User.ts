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
  birthdate: {
    type: String,
  },
  activityLevel: {
    type: String,
    enum: ["sedentary", "low", "high"],
  },
  interest: {
    type: String,
    enum: ["painPoint", "meditation", "yoga"],
  },
  painPoints: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PainPoint",
    },
  ],
  termsAccepted: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
});

const User = mongoose.model("User", userSchema);

export default User;
