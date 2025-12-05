// src/utils/auth.js

export function getCurrentUser() {
  try {
    const raw = localStorage.getItem("user");
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    console.error("[auth] Failed to parse user:", e);
    return null;
  }
}

export function getCurrentRole() {
  // return "tutor";
  return getCurrentUser()?.role || "";
}

export function getCurrentToken() {
  return localStorage.getItem("token");
}

// 🟥 LOGOUT CHUẨN CHO TOÀN APP
export function logoutToLogin() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  // Nếu bạn muốn gọi API logout của backend:
  fetch("http://localhost:4002/api/auth/logout", { method: "POST", credentials: "include" });

  window.location.href = "http://localhost:4002/login";
}
