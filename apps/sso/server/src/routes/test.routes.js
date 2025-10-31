import express from "express";
// import { MailService } from "../services/mail.service.js";
// import { generateOtp } from "../utils/generateOtp.js";
const router = express.Router();

router.get("/ping", (req, res) => {
  res.json({ msg: "pong", sessionId: req.sessionID });
});

router.get("/login", (req, res) => {
  req.session.user = { id: "test-user", name: "Test User" };
  console.log("Session after login:", req.session);
  return res.json({ msg: "Logged in", sessionID: req.sessionID });
});

router.get("/me", (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ msg: "Not authenticated" });
  }
  return res.json({ user: req.session.user, sessionID: req.sessionID });
});

router.get("/logout", (req, res, next) => {
  if (!req.session) return res.status(200).json({ msg: "No session" });

  req.session.destroy((err) => {
    if (err) return next(err);
    res.clearCookie("connect.sid");
    return res.status(200).json({ msg: "Logged out" });
  });
});

export default router;
