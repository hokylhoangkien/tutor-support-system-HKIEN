import dotenv from "dotenv";
dotenv.config();

export const env = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
  CORS_ORIGIN: process.env.CORS_ORIGIN,
  SERVICE_NAME: process.env.SERVICE_NAME,
  NATS_STREAM: process.env.NATS_STREAM,
  NATS_CONSUMER: process.env.NATS_CONSUMER,
  NATS_DELIVERY: process.env.NATS_DELIVERY,
};
