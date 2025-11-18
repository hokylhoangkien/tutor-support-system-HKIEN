import { useNavigate } from "react-router-dom";
import user from "../../assets/images/user.png";
import lock from "../../assets/images/lock.png";
import home from "../../assets/images/Home.png";
import envelope from "../../assets/images/envelope.png";
import { useState } from "react";

function Component(probs) {
  return (
    <div className="flex flex-col w-full gap-1">
      <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
        {probs.image && (
          <img src={probs.image} alt={probs.title} className="object-contain w-5 h-5" />
        )}
        <p>{probs.title}</p>
      </div>
      <input
        type={probs.type}
        name={probs.name}
        onChange={probs.onChange}
        placeholder={probs.title}
        className="w-full h-10 px-3 text-sm bg-white border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>
  );
}

function ChangePassword() {
  const [formData, setFormData] = useState({
    username: "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); // 👈 kiểm tra giá trị thực tế

    if (
      !formData.username.trim() ||
      !formData.oldPassword.trim() ||
      !formData.newPassword.trim() ||
      !formData.confirmPassword.trim()
    ) {
      setMessage("Please fill in all fields!");
      setStatus("error");
    } else if (formData.newPassword !== formData.confirmPassword) {
      setMessage("New password and confirmation do not match!");
      setStatus("error");
    }
    // else if ( formData.oldPassword !== "correctOldPassword" ) {
    //   setMessage("Old password is incorrect!");
    //   setStatus("error");
    // }
    else if (formData.newPassword === formData.oldPassword) {
      setMessage("New password must be different from old password!");
      setStatus("error");
    } else if (formData.newPassword.length < 8 || formData.confirmPassword.length > 16) {
      setMessage("Password must be between 8 and 16 characters!");
      setStatus("error");
    } else {
      setMessage("Password changed successfully!");
      setStatus("success");
    }
    // setTimeout(() => setMessage(""), 3000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg mx-auto">
      <Component
        type="text"
        title="Username"
        image={user}
        name="username"
        onChange={handleChange}
      />
      <Component
        type="password"
        title="Old Password"
        image={lock}
        name="oldPassword"
        onChange={handleChange}
      />
      <Component
        type="password"
        title="New Password"
        image={lock}
        name="newPassword"
        onChange={handleChange}
      />
      <Component
        type="password"
        title="Confirm Password"
        image={lock}
        name="confirmPassword"
        onChange={handleChange}
      />

      {message && (
        <div
          className={`text-sm text-left p-2 rounded-md transition-all duration-300 ${
            status === "success"
              ? "bg-green-100 text-green-700 border border-green-300"
              : "bg-red-100 text-red-700 border border-red-300"
          }`}
        >
          {message}
        </div>
      )}

      <div className="flex justify-start">
        <button
          type="submit"
          className="px-6 py-2 bg-green-600 text-white text-sm font-semibold rounded-md shadow hover:bg-green-700 transition"
        >
          Submit
        </button>
      </div>
    </form>
  );
}

function ResetbyEmail() {
  const [formData, setFormData] = useState({ username: "", email: "" });
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("DEBUG:", formData);

    if (!formData.username.trim() || !formData.email.trim()) {
      setMessage("Please fill in all fields!");
      setStatus("error");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setMessage("Invalid email format!");
      setStatus("error");
      return;
    }

    setMessage("Reset link sent to your email!");
    setStatus("success");

    // setTimeout(() => setMessage(""), 3000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg mx-auto">
      <Component
        type="text"
        title="Username"
        image={user}
        name="username"
        onChange={handleChange}
      />
      <Component type="email" title="Email" image={envelope} name="email" onChange={handleChange} />

      {message && (
        <div
          className={`text-sm text-left p-2 rounded-md transition-all duration-300 ${
            status === "success"
              ? "bg-green-100 text-green-700 border border-green-300"
              : "bg-red-100 text-red-700 border border-red-300"
          }`}
        >
          {message}
        </div>
      )}
      <div className="flex justify-start">
        <button
          type="submit"
          className="px-6 py-2 bg-green-600 text-white text-sm font-semibold rounded-md shadow hover:bg-green-700 transition"
        >
          Submit
        </button>
      </div>
    </form>
  );
}

function ChangePasswordPage() {
  const [isChangePassword, setIsChangePassword] = useState(true);

  const baseBtn =
    "inline-flex items-center justify-center gap-2 w-60 px-5 py-2 text-[15px] font-medium rounded-md border-none focus:outline-none transition-colors duration-200 ease-in-out";
  const activeBtn = "bg-gray-200 text-gray-800 shadow-inner";
  const idleBtn = "bg-white text-gray-700 hover:bg-gray-50";

  return (
    <div className="flex justify-center py-12">
      <div className="w-full max-w-4xl bg-white rounded-md shadow-lg p-8">
        <div className="bg-white rounded-md shadow-lg p-3">
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-selected={isChangePassword}
              onClick={() => setIsChangePassword(true)}
              className={`${baseBtn} ${isChangePassword ? activeBtn : idleBtn}`}
            >
              <img src={home} alt="home" className="w-4 h-4" />
              <span>Change password</span>
            </button>

            <button
              type="button"
              aria-selected={!isChangePassword}
              onClick={() => setIsChangePassword(false)}
              className={`${baseBtn} ${!isChangePassword ? activeBtn : idleBtn}`}
            >
              <img src={envelope} alt="envelope" className="w-4 h-4" />
              <span>Reset Password by Email</span>
            </button>
          </div>
        </div>

        <div className="mt-4 border border-gray-200 rounded-md bg-[#77cde6a3] p-6 shadow-lg ">
          {isChangePassword ? <ChangePassword /> : <ResetbyEmail />}
        </div>

        <p className="text-left text-xs text-gray-500 mt-6">
          © 2025 Tutor Support System — All rights reserved
        </p>
      </div>
    </div>
  );
}

export default ChangePasswordPage;
