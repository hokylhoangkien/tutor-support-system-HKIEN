import redis from "@shared/redis/client";
import { generateOtp } from "../utils/generateOtp.js";
import { env } from "../config/env.js";

export const OtpService = {
  async createOtp(mail) {
    const otp = generateOtp();
    // Store OTP with expiration
    await redis.set(`otp:${mail}`, otp, "EX", env.OTP_EXPIRE_SEC);

    return otp;
  },

  async verifyOtp(mail, otp) {
    // Retrieve stored OTP
    const stored = await redis.get(`otp:${mail}`);
    return stored === otp;
  },

  async clearOtp(mail) {
    // Delete OTP from Redis
    await redis.del(`otp:${mail}`);
  },

  async increaseFailCount(mail) {
    const key = `otp_retry:${mail}`;
    const count = await redis.incr(key);

    return count;
  },

  async getFailCount(mail) {
    const count = await redis.get(`otp_retry:${mail}`);
    return Number(count);
  },
};
