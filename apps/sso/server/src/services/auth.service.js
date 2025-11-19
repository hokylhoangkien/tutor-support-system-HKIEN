import { User } from "../models/user.model.js";
import { AppError } from "@shared/utils/AppError";

export const authService = {
  async login({ username, password }) {
    // YOUR CODE HERE
    //--------------test test----------------
    const user = await User.findOne({ username: username });
    const validPassword = await user.comparePassword(password);
    if (user == null || !validPassword) return false;
    return true;
    // --------------------------------------
  },
  async changePassword({ username, currentPassword, newPassword }) {
    // YOUR CODE HERE
  },
  async findUser({ username, mail }) {
    const user = await User.findOne({ username: username, mail: mail });
    return user;
  },
  async resetPassword({ username, newpassword }) {
    const user = await User.findOne({ username: username });
    if (user) {
      user.password = newpassword;
      user.save();
    }
    return user;
  },
  async logout({ userId }) {
    // YOUR CODE HERE
  },
};
