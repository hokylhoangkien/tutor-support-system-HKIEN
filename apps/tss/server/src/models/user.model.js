import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userID: {
      // MSSV or MSCB
      type: String,
      required: true,
      unique: true,
    },

    faculty: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Faculty",
      required: true,
    },

    major: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Major",
      required: true,
    },
    mail: {
      type: String,
      required: true,
    },
    name: {
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
    },
    phoneNumber: {
      type: String,
    },
    role: {
      type: String,
      enum: ["student", "tutor"],
      default: "student",
    },
    gender: {
      type: String,
      enum: ["male", "female"],
    },
    avatar: {
      publicId: {
        type: String,
      },
    },
  },
  { timestamps: true, discriminatorKey: "role" }
);

export const User = mongoose.model("User", userSchema);
