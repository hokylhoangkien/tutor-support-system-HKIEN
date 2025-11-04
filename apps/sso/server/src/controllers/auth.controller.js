import { asyncHandler } from "@shared/utils/asyncHandler";
import { authService } from "../services/auth.service.js";
import { AppError } from "@tss/utils/AppError";


export const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new AppError('Please provide both username and password', 400);
  }
  const { user, token } = await authService.login({ username, password });

  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 24 * 60 * 60 * 1000 // 24g
  });

  res.status(200).json({
    success: true,
    data: {
      user,
      token
    }
  });
});

export const changePassword = asyncHandler(async (req, res) => {
  // YOUR CODE HERE
});

export const resetPassword = asyncHandler(async (req, res) => {
  // YOUR CODE HERE
});

export const logout = asyncHandler(async (req, res) => {
  // YOUR CODE HERE
});
