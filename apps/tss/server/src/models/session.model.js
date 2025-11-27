import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema(
  {
    students: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
      },
    ],
    tutor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tutor",
      required: true,
    },
    subject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      required: true,
    },
    status: {
      type: String,
      enum: ["scheduled", "completed", "cancelled"],
      default: "scheduled",
    },
    type: {
      type: String,
      enum: ["online", "offline"],
      default: "online",
    },
    location: {
      type: String,
      required: function () {
        return this.type === "offline";
      },
    },
  },
  { timestamps: true }
);

export const Session = mongoose.model("Session", sessionSchema);
