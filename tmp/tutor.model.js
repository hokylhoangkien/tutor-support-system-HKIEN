import mongoose from "mongoose";

const tutorSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true },
  yearsOfExperience: Number,
  teachStatus: { type: String, enum: ["active", "inactive"], default: "active" },
});

export const Tutor = mongoose.model("Tutor", tutorSchema);
