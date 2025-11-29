import { useNavigate } from "react-router-dom";
import { Home, Mail } from "lucide-react";
import ChangePasswordForm from "../../components/ChangeResetPassPage/ChangePasswordForm";

function ChangePasswordPage() {
  const navigate = useNavigate();

  const baseBtn =
    "inline-flex items-center justify-center gap-2 w-60 px-5 py-2 text-[15px] font-medium rounded-md border-none focus:outline-none transition-colors duration-200 ease-in-out";
  const activeBtn = "bg-gray-200 text-gray-800 shadow-inner";
  const idleBtn = "bg-white text-gray-700 hover:bg-gray-50";

  return (
    <div className="flex justify-center bg-[#eee] py-12">
      <div className="w-full max-w-4xl bg-white rounded-md shadow-lg p-8">
        <div className="bg-white rounded-md shadow-lg p-3">
          <div className="flex items-center gap-3">
            <button type="button" className={`${baseBtn} ${activeBtn}`}>
              <Home size={18} />
              <span>Change Password</span>
            </button>

            <button
              type="button"
              onClick={() => navigate("/reset-password")}
              className={`${baseBtn} ${idleBtn}`}
            >
              <Mail size={18} />
              <span>Reset Password by Email</span>
            </button>
          </div>
        </div>

        <div className="mt-4 border border-gray-200 rounded-md bg-[#77cde6a3] p-6 shadow-lg">
          <ChangePasswordForm />
        </div>

        <p className="text-left text-xs text-gray-500 mt-6">
          © 2025 Tutor Support System — All rights reserved
        </p>
      </div>
    </div>
  );
}

export default ChangePasswordPage;
