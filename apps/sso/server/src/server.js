/* eslint n/no-process-exit: "off" */
import http from "http";
import { createApp } from "./app.js";
import { env } from "./config/env.js";
import { connectDB, disconnectDB } from "@tss/config/db";
import { logger } from "@tss/utils/logger";

const bootstrap = async () => {
  await connectDB(env.MONGO_URI);
  const app = createApp();
  const server = http.createServer(app);

  server.listen(env.PORT, () => {
    logger.info(`SSO server listening on port ${env.PORT}`);
  });

  const shutdown = async (signal) => {
    try {
      logger.warn(`Received ${signal}. Closing SSO server...`);

      // Close the HTTP server
      await new Promise((resolve, reject) => {
        server.close((err) => {
          if (err) reject(err);
          else resolve();
        });
      });

      logger.info("HTTP server closed");

      await disconnectDB();

      process.exit(0);
    } catch (err) {
      logger.error("Error during shutdown", err);
      process.exit(1);
    }
  };

  process.on("SIGINT", () => shutdown("SIGINT"));
  process.on("SIGTERM", () => shutdown("SIGTERM"));
};

bootstrap().catch((err) => {
  logger.error("Fatal bootstrap error:", err);
  process.exit(1);
});
