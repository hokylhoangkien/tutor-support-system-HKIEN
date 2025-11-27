import mongoose from "mongoose";

const enrollmentSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subject",
    required: true,
  },
  semester: {
    type: String, // "251, 252,..."
    required: true,
  },
  status: {
    type: String,
    enum: ["in-progress", "dropped", "completed"],
    default: "in-progress",
  },
});

export const CurrentEnrollment = mongoose.model("Enrollment", enrollmentSchema);
