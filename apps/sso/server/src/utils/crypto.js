import crypto from "crypto";
import bcrypt from "bcryptjs";

export const generateToken = (length = 32) => {
  return crypto.randomBytes(length).toString("hex");
};
