import { Routes, Route } from "react-router-dom";

// Import các trang
import LoginPage from "../pages/AuthPage/LoginPage";
import ChangePasswordPage from "../pages/AuthPage/ChangePasswordPage";
// import ResetPasswordByEmailPage from "../pages/AuthPage/ResetPasswordByEmailPage";

import PrivateRouter from "./PrivateRouter";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/ChangePasswordPage" element={<ChangePasswordPage />} />
      {/* <Route path="/reset-password" element={<ResetPasswordByEmailPage />} /> */}
      <Route path="*" element={<LoginPage />} />
    </Routes>
  );
}
