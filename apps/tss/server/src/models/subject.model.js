import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema({
  code: {
    type: String, // Ex: "CO2001"
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  credit: {
    type: Number,
    required: true,
  },
  faculty: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Faculty",
    required: true,
  },
});

export const Subject = mongoose.model("Subject", subjectSchema);
