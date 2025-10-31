import { User } from "../models/user.model.js";
import { AppError } from "@tss/utils/AppError";

export const authService = {
  async login({ username, password }) {
    // YOUR CODE HERE
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
