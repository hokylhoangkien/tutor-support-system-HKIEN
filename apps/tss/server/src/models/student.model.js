import { User } from "./user.model.js";
import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    learningStatus: {
      type: String,
      enum: ["active", "graduated", "suspended"],
      default: "active",
    },
    degreeLevel: {
      type: String,
      enum: ["associate", "bachelor", "master", "doctorate", "exchange", "foundation"],
      default: "bachelor",
    },
    yearOfAdmission: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export const Student = User.discriminator("student", studentSchema);
