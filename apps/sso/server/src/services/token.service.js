import redis from "@shared/redis/client";
import { generateOtp } from "../utils/generateOtp.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { env } from "../config/env.js";

export const tokenService = {
  async generateToken(payload) {
    // Redis Token
    const longToken = jwt.sign(payload, env.JWT_SECRET, { expiresIn: "15s" });

    // Shorten token that will later be attached to URL sent back to user
    const shortToken = crypto.randomBytes(20).toString("hex");

    // Mapping those 2 tokens
    await redis.set(`shorttoken:${shortToken}`, longToken, "EX", 15); // 15s

    return shortToken;
  },

  // async setToken(mail, token) {
  //   // const otp = generateOtp();
  //   // Store OTP with expiration
  //   await redis.set(`token:${mail}`, token, "EX", env.OTP_EXPIRE_SEC);
  // },

  async verifyToken(shorttoken) {
    // Retrieve stored Token
    const longtoken = await redis.get(`shorttoken:${shorttoken}`);
    if (!longtoken) return false;

    try {
      jwt.verify(longtoken, env.JWT_SECRET);
      return true;
    } catch (err) {
      return false; // token is now invalid due to expiration or tampering or whatever shjt happens
    }
  },

  async clearToken(shorttoken) {
    // Delete OTP from Redis
    await redis.del(`shorttoken:${shorttoken}`);
  },

  async increaseFailCount(mail) {
    const key = `token_retry:${mail}`;
    const count = await redis.incr(key);

    return count;
  },

  async getFailCount(mail) {
    const count = await redis.get(`token_retry:${mail}`);
    return Number(count);
  },

  async decodeToken(shorttoken) {
    const longtoken = await redis.get(`shorttoken:${shorttoken}`);
    const payload = jwt.verify(longtoken, env.JWT_SECRET);
    return payload;
  },
};
