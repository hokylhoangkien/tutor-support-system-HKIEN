import { asyncHandler } from "@shared/utils/asyncHandler";
import { authService } from "../services/auth.service.js";
import { generateToken } from "../utils/crypto.js";
import { RedisService } from "@shared/redis/service";
import { env } from "../config/env.js";
import { MailService } from "@shared/notifications/service";

// FE: mail, username -> api/send-token (data)
// BE: sendToken: check username (in db) and mail (send mail), create token, redis(token, username), req.sub.username, send mail (http://localhost:4002/reset-password?token={token}), return 200
// FE: please check your mail
// User check mail: click link http://localhost:4002/reset-password?token={token}
// FE: pw, confirm pw -> api/reset-password (new pw)
// BE: resetPw: token in param, check token in redis, change pw, delete token, return 200

export const login = asyncHandler(async (req, res) => {
  // --redirect in query
  const { username, password, redirect } = req.body;
  const { user } = await authService.login({ username, password });

  req.session.user = {
    id: user._id.toString(),
    username: user.username,
    role: user.role,
  };

  await req.session.save(); // --no save

  res.status(200).json({
    success: true,
    data: { user }, // --no return user data
    redirect: redirect,
  });
});

/**
 * @POST
 * @route /api/auth/change-password
 * @desc Change the password of the authenticated user
 *       Userid is extracted from request object (set by authentication middleware)
 *       Change password using authService.changePassword
 *       Send mail to user if an action of changing password is performed (later)
 */
export const changePassword = asyncHandler(async (req, res) => {
  const { username, currentpassword, newpassword } = req.body;

  const updatedUser = await authService.changePassword({
    username,
    currentpassword,
    newpassword,
  });
  if (!updatedUser) return res.status(400).json({ message: "Change Password fail!" });

  return res.status(200).json({
    message: "Password changed successfully",
    data: updatedUser,
  });
});

/**
 * @POST
 * @route /api/auth/reset-password
 * @desc Send reset password token to user's mail
 *       Generate token using crypto.generateToken()
 *       Send mail to user using MailService.sendToken including reset link with token
 */
export const sendToken = asyncHandler(async (req, res) => {
  const { username, mail } = req.body;
  const user = await authService.checkUserExists(username);
  if (!user) return res.status(404).json({ message: "User not found!" });

  // Generate and Save Token into Redis
  const token = await generateToken();
  const key = `token:${token}`;
  const value = { username, mail };

  // Set value into Redis
  RedisService.set(key, value, env.EXPIRE_SEC);

  // This url will be sent to user's mail attached with generated Token
  const resetLink = `${env.CORS_ORIGIN}/reset-password?token=${token}`; // link in env
  // Send mail to user
  await MailService.sendToken(mail, resetLink);

  return res.status(200).json({
    message: "Token has been sent to your email",
  });
});

/**
 * @POST
 * @route /api/auth/reset-password/:token
 * @desc Reset password using token from param
 *       Extract token from req.params
 *       Extract new password and username from req.body
 *       Reset password using authService.resetPassword (username)
 *       Send mail to user if an action of resetting password is performed (later)
 */
export const resetPassword = asyncHandler(async (req, res) => {
  const token = req.query.token;
  const { newpassword } = req.body;
  // get token from redis to verify
  const key = `token:${token}`;
  const value = await RedisService.get(key);
  if (value === null) return res.status(401).json({ message: "Unauthorized token" });
  const username = value.username;
  // Reset password
  const user = await authService.resetPassword({ username, newpassword });
  if (user) {
    RedisService.del(key);
    return res.status(200).json({ message: "Password has been resetted successfully." });
  } else {
    return res.status(400).json({ message: "tuoi lon" });
  }
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
