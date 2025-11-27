// @ts-nocheck
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";

// import routes from "./routes/index.js";
// import testRoute from "./routes/test.routes.js";
import { env } from "./config/env.js";
// eslint-disable-next-line import/no-unresolved
import { errorHandler } from "@shared/middlewares/error";
import { AppError } from "@shared/utils/AppError";
import { sessionMiddleware } from "@shared/redis/session";

export const createApp = () => {
  const app = express();

  app.disable("x-powered-by"); // Security best practice
  app.use(helmet()); // Security headers
  app.use(cors({ origin: env.CORS_ORIGIN, credentials: true })); // CORS
  app.use(express.json({ limit: "1mb" })); // Body parser
  app.use(express.urlencoded({ extended: true }));

  if (env.NODE_ENV !== "production") {
    app.use(morgan("dev")); // Logger
  }
  app.use(cookieParser()); // Cookie parser

  app.use(sessionMiddleware("sso")); // Session management
  // Routes
  //   app.use("/api", routes);
  //   app.use("/test", testRoute);
  // 404 handler
  app.use((_req, _res, next) => next(new AppError("Not Found", 404)));
  // Error handler
  app.use(errorHandler);
  return app;
};
