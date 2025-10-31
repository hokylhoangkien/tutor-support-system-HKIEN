import session from "express-session";
import redis from "./config.js";
import { env } from "../config/env.js";
import { RedisStore } from "connect-redis";

export const sessionMiddleware = (appPrefix) =>
  session({
    store: new RedisStore({
      client: redis,
      prefix: `${appPrefix}:sess:`,
    }),
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    rolling: true, // reset session expiration on each request
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60,
    },
  });
