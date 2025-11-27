import { Router } from "express";
import {
  login,
  logout,
  changePassword,
  sendToken,
  resetPassword,
} from "../controllers/auth.controller.js";
import {} from "../middlewares/validate.middleware.js";

export const router = Router();

// DEFINE ROUTES HERE
router.post("/login", login);

router.post("/logout", logout);

router.post("/change-password", changePassword);

router.post("/send-token", sendToken);

router.post("/reset-password", resetPassword);
