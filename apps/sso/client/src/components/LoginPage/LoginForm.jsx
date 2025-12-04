import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authApi } from "@/api/authApi";

export default function LoginForm() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    // Tự kiểm tra rỗng (đề phòng trường hợp required không chạy)
    if (!username || !password) {
      setShowError(true);
      return;
    }

    setLoading(true);
    setShowError(false);

    try {
      const res = await authApi.login(username, password);
      // const res = 100;
      console.log("[LoginForm] API CALLED, response =", res);
      // const token = 10;
      const token = res.data.accessToken;

      const user = res.data.user;
      // const user = 10;
      // Encode user để truyền qua query
      const encodedUser = encodeURIComponent(JSON.stringify(user));

      // ✅ RẤT QUAN TRỌNG: redirect sang /home (KHÔNG phải "/")
      window.location.href = `http://localhost:4001/home?token=${token}&user=${encodedUser}`;
    } catch (err) {
      console.error("Login error:", err);
      setShowError(true);
      setTimeout(() => setShowError(false), 4000);
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = () => navigate("/change-password");

  const handleReset = () => {
    setUsername("");
    setPassword("");
    setShowError(false);
  };

  return (
    <form
      id="fm1"
      onSubmit={handleSubmit}
      className="bg-[#f5f5f5] p-4 sm:p-5 border border-[#ddd] rounded-sm relative"
    >
      <h2 className="text-[#990033] text-lg font-bold mb-0">Enter your Username and Password</h2>

      <div
        className={`absolute top-[-10px] left-1/2 transform -translate-x-1/2 px-3 py-2 rounded-sm text-white bg-red-600 shadow-md transition-all duration-500 ${
          showError ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5"
        }`}
      >
        The credentials you provided cannot be determined to be authentic.
      </div>

      <div className="mb-4">
        <label className="block font-semibold mb-1">Username</label>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="w-full border px-2 py-1"
        />
      </div>

      <div className="mb-4">
        <label className="block font-semibold mb-1">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full border px-2 py-1"
        />
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={loading}
          className="bg-[#0066cc] hover:bg-[#004c99] text-white text-sm px-4 py-1.5 rounded-sm font-medium border border-[#004c99]"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <button
          type="button"
          onClick={handleReset}
          className="bg-[#6c757d] hover:bg-[#5a6268] text-white text-sm px-4 py-1.5 rounded-sm font-medium border border-[#5a6268]"
        >
          Clear
        </button>
      </div>

      <div className="mt-3">
        <button
          type="button"
          onClick={handleChangePassword}
          className="text-[#210f7a] underline text-sm bg-transparent border-0 p-0 cursor-pointer"
        >
          Change password?
        </button>
      </div>
    </form>
  );
}
