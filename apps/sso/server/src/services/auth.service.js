import { User } from "../models/user.model.js";
import { AppError } from "@shared/utils/AppError";
import bcrypt from "bcryptjs";

export const authService = {
  async login({ username, password }) {
    const user = await User.findOne({ username });

    if (!user || !user.isActive) {
      throw new AppError("Invalid credentials", 401);
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      user.failedLoginCount += 1;
      if (user.failedLoginCount >= 3) {
        user.isActive = false;
        await user.save();
        throw new AppError("Too many failed attempts. Account locked", 423);
      }
      await user.save();
      const remainingAttempts = 3 - user.failedLoginCount;
      throw new AppError(`Wrong password. ${remainingAttempts} attempts remaining.`, 401);
    }

    if (user.failedLoginCount > 0) {
      user.failedLoginCount = 0;
      await user.save();
    }

    const userData = user.toObject();
    delete userData.password;
    delete userData.failedLoginCount;

    return { user: userData };
  },

  async changePassword({ username, currentpassword, newpassword }) {
    const user = await User.findOne({ username });
    console.log(currentpassword);
    if (!user) throw new AppError("User Not Found", 404);
    if (!(await user.comparePassword(currentpassword)))
      throw new AppError("Current Password do not match", 400);

    user.password = newpassword;
    await user.save();

    return user;
  },
  async checkUserExists(username) {
    const user = await User.findOne({ username });
    return user;
  },
  async resetPassword({ username, newpassword }) {
    const user = await User.findOne({ username });
    user.password = newpassword;
    user.save();
    return user;
  },
};
