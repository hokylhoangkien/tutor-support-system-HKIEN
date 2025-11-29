import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import HomePage from "../pages/HomePage";

export default function AppRouter() {
  const location = useLocation();
  useEffect(() => {
    const pathTitleMap = {
      "/home": "Home | Tutor Support System",
      //   "/change-password": "Change Password | Tutor Support System",
      //   "/reset-password": "Reset Password | Tutor Support System",
    };

    document.title = pathTitleMap[location.pathname] || "Tutor Support System";
  }, [location]);

  console.log("AppRouter rendered");

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="/home" element={<HomePage />} />
      {/* <Route path="/change-password" element={<ChangePasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} /> */}
    </Routes>
  );
}
