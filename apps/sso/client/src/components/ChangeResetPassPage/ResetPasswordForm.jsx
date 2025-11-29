import { useState, useEffect } from "react";
import { User, Mail, Lock } from "lucide-react";
import FormInput from "./FormInput";
import { authApi } from "@/api/authApi";
import { useSearchParams } from "react-router-dom";

function ResetPasswordForm() {
  const [searchParams] = useSearchParams();
  const tokenFromUrl = searchParams.get("token"); // token từ URL nếu user click link mail

  // Step logic:
  // 1 -> user nhập username + mail để nhận link
  // 2 -> user tới trang reset password (có token trong URL)
  const [step, setStep] = useState(tokenFromUrl ? 2 : 1);

  const [formData, setFormData] = useState({
    username: "",
    mail: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setMessage("");
    setStatus("");

    // STEP 1: Gửi token (username + mail)
    if (step === 1) {
      if (!formData.username.trim() || !formData.mail.trim()) {
        setMessage("Please fill in all fields!");
        setStatus("error");
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.mail)) {
        setMessage("Invalid email format!");
        setStatus("error");
        return;
      }

      setLoading(true);
      try {
        const res = await authApi.sendResetToken(formData.username, formData.mail);

        if (res?.status === 200) {
          setMessage("Reset password link has been sent to your email!");
          setStatus("success");
          // Không tự chuyển step, user cần click link trong mail
        } else {
          setMessage(res?.data?.message || "Cannot send reset link.");
          setStatus("error");
        }
      } catch (err) {
        console.error(err.response?.data || err);
        setMessage(err.response?.data?.message || "Cannot send reset link.");
        setStatus("error");
      } finally {
        setLoading(false);
      }

      return;
    }

    // STEP 2: Reset password (token có trong URL)
    if (!tokenFromUrl) {
      setMessage("Reset token missing. Please click the link from your email first.");
      setStatus("error");
      return;
    }

    if (!formData.newPassword.trim() || !formData.confirmPassword.trim()) {
      setMessage("Please fill in all fields!");
      setStatus("error");
      return;
    }
    if (formData.newPassword !== formData.confirmPassword) {
      setMessage("New password and confirmation do not match!");
      setStatus("error");
      return;
    }

    setLoading(true);
    try {
      const res = await authApi.resetPasswordWithToken(tokenFromUrl, formData.newPassword);
      if (res?.status === 200) {
        setMessage("Password has been reset successfully!");
        setStatus("success");
        setFormData({
          username: "",
          mail: "",
          newPassword: "",
          confirmPassword: "",
        });
      } else {
        setMessage(res?.data?.message || "Cannot reset password.");
        setStatus("error");
      }
    } catch (err) {
      console.error(err.response?.data || err);
      setMessage(err.response?.data?.message || "Cannot reset password.");
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg mx-auto">
      {step === 1 ? (
        <>
          <FormInput
            type="text"
            title="Username"
            icon={<User size={18} />}
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          <FormInput
            type="email"
            title="Mail"
            icon={<Mail size={18} />}
            name="mail"
            value={formData.mail}
            onChange={handleChange}
          />
        </>
      ) : (
        <>
          <FormInput
            type="password"
            title="New Password"
            icon={<Lock size={18} />}
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
          />
          <FormInput
            type="password"
            title="Confirm Password"
            icon={<Lock size={18} />}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </>
      )}

      {message && (
        <div
          className={`text-sm text-left p-2 rounded-md transition-all duration-500 ${
            status === "success"
              ? "bg-green-100 text-green-700 border border-green-300"
              : "bg-red-100 text-red-700 border border-red-300 animate-pulse"
          }`}
        >
          {message}
        </div>
      )}

      <div className="flex justify-center">
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-green-600 text-white text-sm font-semibold rounded-md shadow hover:bg-green-700 transition disabled:opacity-60"
        >
          {loading ? "Processing..." : step === 1 ? "Send Reset Link" : "Reset Password"}
        </button>
      </div>
    </form>
  );
}

export default ResetPasswordForm;
