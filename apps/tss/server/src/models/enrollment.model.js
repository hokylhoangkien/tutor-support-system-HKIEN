import mongoose from "mongoose";

const enrollmentSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  subjects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      required: true,
    },
  ],
  semester: {
    type: String, // "251, 252,..."
    required: true,
  },
});

export const CurrentEnrollment = mongoose.model("Enrollment", enrollmentSchema);
