import mongoose from "mongoose";

const majorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  faculty: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Faculty",
    required: true,
  },
});

export const Major = mongoose.model("Major", majorSchema);
