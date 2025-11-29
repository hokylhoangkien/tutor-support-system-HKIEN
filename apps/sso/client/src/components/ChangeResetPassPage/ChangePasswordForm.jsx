import { useState } from "react";
import { User, Lock } from "lucide-react";
import FormInput from "./FormInput";
import { authApi } from "@/api/authApi";

function ChangePasswordForm() {
  const [formData, setFormData] = useState({
    username: "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.username.trim() ||
      !formData.oldPassword.trim() ||
      !formData.newPassword.trim() ||
      !formData.confirmPassword.trim()
    ) {
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
    setMessage("");

    try {
      await authApi.changePassword({
        username: formData.username,
        currentPassword: formData.oldPassword,
        newPassword: formData.newPassword,
      });

      setMessage("Password changed successfully!");
      setStatus("success");

      // reset form
      setFormData({ username: "", oldPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      console.error(err.response?.data || err);
      setMessage(err.response?.data?.message || "Cannot change password. Please try again.");
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg mx-auto">
      <FormInput
        type="text"
        title="Username"
        icon={<User size={18} />}
        name="username"
        value={formData.username}
        onChange={handleChange}
      />
      <FormInput
        type="password"
        title="Old Password"
        icon={<Lock size={18} />}
        name="oldPassword"
        value={formData.oldPassword}
        onChange={handleChange}
      />
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

      {message && (
        <div
          className={`text-sm text-left p-2 rounded-md transition-all duration-300 ${
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
          className="px-6 py-2 bg-green-600 text-white text-sm font-semibold rounded-md shadow hover:bg-green-700 transition"
        >
          {loading ? "Processing..." : "Submit"}
        </button>
      </div>
    </form>
  );
}

export default ChangePasswordForm;
