import mongoose from "mongoose";

const progressSchema = new mongoose.Schema(
  {
    session: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Session",
      required: true,
    },

    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },

    tutor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tutor",
      required: true,
    },

    understandingLevel: {
      type: Number,
      required: true,
    },

    notes: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export const Progress = mongoose.model("Progress", progressSchema);
