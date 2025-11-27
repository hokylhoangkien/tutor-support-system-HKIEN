import { User } from "./user.model.js";
import mongoose from "mongoose";

const tutorSchema = new mongoose.Schema({
  teachingStatus: {
    type: String,
    enum: ["active", "inactive", "suspended"],
    default: "active",
  },
  description: {
    type: String,
    trim: true,
    default: "",
  },
  teachables: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
    },
  ],
  rating: {
    average: {
      type: Number,
      default: 0,
    },
    count: {
      type: Number,
      default: 0,
    },
  },
  vector: {
    type: [Number],
    default: [],
  },
});

export const Tutor = User.discriminator("tutor", tutorSchema);
