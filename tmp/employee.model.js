import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true },
  workFor: {
    department: { type: mongoose.Schema.Types.ObjectId, ref: "Department", unique: true },
    position: String,
    startDate: Date,
  },
});

export const Employee = mongoose.model("Employee", employeeSchema);
