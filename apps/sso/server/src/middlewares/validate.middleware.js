import { body, param, validationResult } from "express-validator";
import { asyncHandler } from "@shared/utils/asyncHandler";
import { User } from "../models/user.model.js";
import { tokenService } from "../services/token.service.js";

// export const ...
export const checkUserExists = asyncHandler(async (req, res, next) => {
  const { username, mail } = req.body;
  const user = await User.findOne({ username, mail });
  if (!user) return res.status(400).json({ message: "User not found" });
  req.user = user; // attach user here so that controller can use it (if needed)
  next();
});

export const attachUserFromToken = asyncHandler(async (req, res, next) => {
  const token = req.params.token;

  // Verify extrated Token
  const verified = await tokenService.verifyToken(token);
  if (!verified) return res.status(401).json({ message: "Unauthorized Access!" });

  // Decode token to get payload
  const payload = await tokenService.decodeToken(token);

  const user = await User.findOne({ username: payload.username });
  if (!user) return res.status(400).json({ message: "User not found" });
  req.user = user;
  next();
});
