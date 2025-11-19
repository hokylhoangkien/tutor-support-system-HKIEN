import { asyncHandler } from "@shared/utils/asyncHandler";
import { authService } from "../services/auth.service.js";
import { tokenService } from "../services/token.service.js";
import { env } from "../config/env.js";

export const login = asyncHandler(async (req, res) => {
  // YOUR CODE HERE
  //--------------test test----------------
  const username = req.body.username;
  const password = req.body.password;
  const valid = await authService.login({ username, password });
  if (valid) res.status(200).json({ message: "" });
  return res.status(400).json({ message: "" });
  // --------------------------------------
});

export const changePassword = asyncHandler(async (req, res) => {
  // YOUR CODE HERE
});

export const resetPassword = asyncHandler(async (req, res) => {
  const { username, mail } = req.body;

  // Generate token
  const payload = { username: username, mail: mail };
  const token = await tokenService.generateToken(payload);
  // This url will be sent to user's mail attached with generated Token
  const resetLink = `http://localhost:3002/api/auth/reset-password/${token}`;
  console.log(`http://localhost:3002/api/auth/reset-password/${token}`);
  return res.status(200).json({
    message: "Password reset link generated successfully",
    resetLink,
  });
});

export const resetPasswordToken = asyncHandler(async (req, res) => {
  const token = req.params.token;
  const { username, newpassword } = req.body;

  // Incase a specific user put the old password again
  const isSamePassword = await req.user.comparePassword(newpassword);
  if (isSamePassword) {
    return res.status(400).json({ message: "New password cannot be same as old password" });
  }

  // Change password
  const user = await authService.resetPassword({ username, newpassword });
  if (user) {
    await tokenService.clearToken(token);
    return res.status(200).json({ message: "Reset password successfully" });
  }
});

export const logout = asyncHandler(async (req, res) => {
  // YOUR CODE HERE
});
