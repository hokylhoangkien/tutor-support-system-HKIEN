import { User } from "../models/user.model.js";
import { AppError } from "@shared/utils/AppError";

export const AuthService = {
  async login({ username, password }) {
    const user = await User.findOne({ username });

    if (!user || !user.isActive) {
      throw new AppError("Wrong password or username", 401);
    }

    const isPasswordValid = await user.comparePassword(password);

    if (isPasswordValid && user.failedLoginCount > 0) {
      user.failedLoginCount = 0;
      await user.save();
    } else if (!isPasswordValid) {
      user.failedLoginCount += 1;
      if (user.failedLoginCount >= 3) user.isActive = false;

      await user.save();
      throw new AppError("Wrong password or username", 401);
    }

    return { id: user.userId, role: user.role };
  },

  async changePassword({ username, currentPassword, newPassword }) {
    const user = await User.findOne({ username });

    if (!user || !(await user.comparePassword(currentPassword)))
      throw new AppError("Wrong password or username", 400);

    user.password = newPassword;
    await user.save();
  },

  async resetPassword({ username, newPassword }) {
    const user = await User.findOne({ username });
    if (!user) throw new AppError("User not found", 404);
    user.password = newPassword;
    user.save();
  },
};
