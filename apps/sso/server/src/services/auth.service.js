import { User } from "../models/user.model.js";
import { AppError } from "@shared/utils/AppError";

export const authService = {
  async login({ username, password }) {
    const user = await User.findOne({username});

    if (!user || !user.isActive) {
      throw new AppError('Invalid credentials', 401);
    }

    // allow 5 failed attempts
    if (user.failedLoginCount >= 5) {
      throw new AppError('Too many failed attempts. Account locked', 423);
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      user.failedLoginCount += 1;
      await user.save();
      
      const remainingAttempts = 5 - user.failedLoginCount;
      const message = remainingAttempts > 0 
        ? `Wrong password. ${remainingAttempts} attempts remaining.`
        : 'Account locked. Please reset your password.';
      
      throw new AppError(message, 401);
    }

    if (user.failedLoginCount > 0) {
      user.failedLoginCount = 0;
      await user.save();
    }

    const token = jwt.sign(
      { 
        userId: user.userId,
        username: user.username,
        role: user.role 
      },
      env.JWT_SECRET,
      { expiresIn: '24h' } // token expires in 24 hours
    );

    const userData = user.toObject();
    delete userData.password;
    return {
      user: userData,
      token
    };
  },
  
  async changePassword({ username, currentPassword, newPassword }) {
    // YOUR CODE HERE
  },
  async resetPassword({ mail }) {
    // YOUR CODE HERE
  },
  
  async logout({ userId }) {
    // YOUR CODE HERE
  },
};
