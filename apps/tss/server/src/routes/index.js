// Main router file to aggregate all route modules
import express from "express";
import { router as studentRoutes } from "./student.routes.js";

const router = express.Router();
router.use("/student", studentRoutes);

export default router;
