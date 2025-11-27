/* eslint n/no-process-exit: "off" */
import http from "http";
import { createApp } from "./app.js";
import { connectDB, disconnectDB } from "@shared/config/db";
import { natsWrapper } from "@shared/nats/wrapper";
import { Subjects } from "@shared/nats/subjects";
import { logger } from "@shared/utils/logger";
import { env } from "./config/env.js";

const bootstrap = async () => {
  await connectDB(env.MONGO_URI);
  await natsWrapper.connect(env.SERVICE_NAME);
  await natsWrapper.subscribeJetStream({
    stream: env.NATS_STREAM,
    consumer: env.NATS_CONSUMER,
    filter: Subjects.UserCreated,
    deliver: env.NATS_DELIVERY,
  });
  const app = createApp();
  const server = http.createServer(app);

  server.listen(env.PORT, () => {
    logger.info(`TSS server listening on port ${env.PORT}`);
  });

  const shutdown = async (signal) => {
    try {
      logger.warn(`Received ${signal}. Closing TSS server...`);

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
