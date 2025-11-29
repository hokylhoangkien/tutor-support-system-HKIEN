import React, { useState, useEffect } from "react";
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

    setLoading(true);
    setShowError(false);

    try {
      await authApi.login(username, password);
      console.log("Login thành công");
      navigate("/dashboard");
    } catch (err) {
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
      <div className="mb-2 pb-2 border-b border-[#ddd] text-sm text-[#444]"></div>

      <div
        className={`absolute top-[-10px] left-1/2 transform -translate-x-1/2 px-3 py-2 rounded-sm text-white bg-red-600 shadow-md transition-all duration-500 ${
          showError ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5"
        }`}
      >
        The credentials you provided cannot be determined to be authentic.
      </div>

   
      <div className="mb-4">
        <label htmlFor="username" className="block text-[#333] font-semibold mb-1">
          Username
        </label>
        <input
          id="username"
          name="username"
          type="text"
          autoComplete="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-[292px] border border-[#ccc] rounded-sm px-2 py-1.5 bg-[#ffffdd] focus:outline-none focus:ring-1 focus:ring-[#aaa]"
          required
        />
      </div>

   
      <div className="mb-4">
        <label htmlFor="password" className="block text-[#333] font-semibold mb-1">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-[292px] border border-[#ccc] rounded-sm px-2 py-1.5 bg-[#ffffdd] focus:outline-none focus:ring-1 focus:ring-[#aaa]"
          required
        />
      </div>

     
      <div className="flex items-center gap-2 flex-wrap">
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
          className="bg-[#0066cc] hover:bg-[#004c99] text-white text-sm px-4 py-1.5 rounded-sm font-medium border border-[#004c99]"
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
