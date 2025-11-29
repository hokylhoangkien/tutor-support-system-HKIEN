import { AuthService } from "../services/auth.service.js";
import { UserService } from "../services/user.service.js";
import { RedisService } from "@shared/redis/service";
import { MailService } from "@shared/notifications/service";

import { env } from "../config/env.js";
import { asyncHandler } from "@shared/utils/asyncHandler";
import { generateToken } from "../utils/crypto.js";

export const login = asyncHandler(async (req, res) => {
  const { redirect } = req.query;
  const { username, password } = req.body;

  const { id, role } = await AuthService.login({ username, password });

  req.session.user = { id: id, role: role };

  res.status(200).json({
    message: "Login successful",
    redirect: redirect,
  });
});

export const changePassword = asyncHandler(async (req, res) => {
  const { username, currentPassword, newPassword } = req.body;

  await AuthService.changePassword({ username, currentPassword, newPassword });

  return res.status(200).json({ message: "Password changed successfully" });
});

export const sendToken = asyncHandler(async (req, res) => {
  const { username, mail } = req.body;
  const user = await UserService.getUserByUsername(username);
  if (!user) return res.status(404).json({ message: "User not found" });

  // Generate and Save Token into Redis
  const token = generateToken();
  const key = `token:${token}`;
  const value = { username, mail };

  // Set value into Redis
  RedisService.set(key, value, env.EXPIRE_SEC);

  // This url will be sent to user's mail attached with generated Token
  const resetLink = `${env.CORS_ORIGIN}/reset-password?token=${token}`;
  // Send mail to user
  await MailService.sendToken(mail, { resetLink });

  return res.status(200).json({ message: "Token has been sent to your email" });
});

export const resetPassword = asyncHandler(async (req, res) => {
  const token = req.query.token;
  const { newPassword } = req.body;

  const key = `token:${token}`;
  const value = await RedisService.get(key);
  if (!value) return res.status(401).json({ message: "Unauthorized token" });
  const username = value.username;

  await AuthService.resetPassword({ username, newPassword });
  RedisService.del(key);
  return res.status(200).json({ message: "Password has been resetted successfully." });
});

export const logout = asyncHandler(async (req, res) => {
  await req.session.destroy();
  res.clearCookie("connect.sid", {
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  res.status(200).json({ success: true, message: "Successfully logged out" });
});
