import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    mail: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["tutor", "student", "employee"], default: "student" },
    isActive: { type: Boolean, default: true },
    // last login, created at, updated at will be handled by timestamps
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  // Hash password before saving
  if (this.isModified("password")) {
    // Only hash if password is modified
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Method to compare password
userSchema.methods.comparePassword = function (pw) {
  return bcrypt.compare(pw, this.password);
};

export const User = mongoose.model("User", userSchema);
