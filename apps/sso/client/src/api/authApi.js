import axios from "axios";

const axiosClient = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

export const authApi = {
  login: (username, password) => axiosClient.post("/auth/login", { username, password }),

  changePassword: ({ username, currentPassword, newPassword }) =>
    axiosClient.post("/auth/change-password", {
      username,
      currentPassword,
      newPassword,
    }),

  sendResetToken: (username, mail) => axiosClient.post("/auth/send-token", { username, mail }),

  resetPasswordWithToken: (token, newPassword) =>
    axiosClient.post(`/auth/reset-password?token=${encodeURIComponent(token)}`, { newPassword }),
};

export default axiosClient;
