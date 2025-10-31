import { createClient } from "redis";
import { logger } from "../utils/logger.js";
import { env } from "../config/env.js";

const redis = createClient({
  socket: {
    host: env.REDIS_HOST,
    port: env.REDIS_PORT,
  },

  // password: env.REDIS_PASSWORD
});

redis.on("connect", () => {
  logger.info("Redis connected");
});

redis.on("error", (err) => {
  logger.error(`Redis error: ${err}`);
});

await redis.connect();

export default redis;
