import redis from "@shared/redis/client";
import { generateOtp } from "../utils/generateOtp.js";
import crypto from "crypto";
import { env } from "../config/env.js";

export const tokenService = {
  async generateToken(payload) {
    const longToken = jwt.sign(payload, env.JWT_SECRET, { expiresIn: "30s" }); // Redis Token
    // Shorten token that will later be attached to URL sent back to user
    const shortToken = crypto.randomBytes(20).toString("hex");
    // Mapping those 2 tokens
    await redis.set(`shorttoken:${shortToken}`, longToken, "EX", 30); // 15s

    return shortToken;
  },

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
    // Delete Token from Redis
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
