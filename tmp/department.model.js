import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema({
  mail: { type: String, required: true, unique: true },
  type: { type: String, required: true },
  name: { type: String, required: true },
  location: { type: String, required: true },
  abbreviation: { type: String, required: true, unique: true },
  manage: { type: mongoose.Schema.Types.ObjectId, ref: "Employee" },
});

export const Department = mongoose.model("Department", departmentSchema);
