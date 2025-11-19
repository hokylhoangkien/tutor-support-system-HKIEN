import { Router } from "express";
import {
  login,
  changePassword,
  resetPassword,
  resetPasswordToken,
} from "../controllers/auth.controller.js";
import { checkUserExists, attachUserFromToken } from "../middlewares/validate.middleware.js";

export const router = Router();

// DEFINE ROUTES HERE
// router post /login
// router post /change-password
// router post /forgot-password
// Example:
// router.post("/register", <middleware> ,register);
router.post("/login", login);

router.post("/reset-password", checkUserExists, resetPassword);

router.post("/reset-password/:token", attachUserFromToken, resetPasswordToken);
