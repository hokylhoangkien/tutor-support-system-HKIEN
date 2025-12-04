import { useState } from "react";
import { Bell, MessageCircle, User, Calendar, Settings, LogOut } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import bkLogo from "../assets/images/BkLogo.png";

// 🔹 Auth helpers
import { getCurrentUser, logoutToLogin } from "../utils/auth";

// Helper Component for Menu Items
const MenuItem = ({ icon, label, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-4 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-xl transition-colors text-left"
    >
      <span className="text-gray-900">{icon}</span>
      <span className="text-lg font-medium">{label}</span>
    </button>
  );
};

export default function Header() {

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const user = getCurrentUser();
  const username = user?.username || "User";
  const email = user ? `${user.username}@hcmut.edu.vn` : "";

  const menus = [
    { tag: "Home", link: "/home" },
    { tag: "My Session", link: "/my-sessions" },
    { tag: "Library", link: "/library" },
  ];

  const handleLogout = () => {
    setIsProfileOpen(false);
    logoutToLogin();
  };

  // Hàm kiểm tra xem menu có đang active không
  const isActive = (path) => {
    // So sánh chính xác hoặc dùng startsWith nếu có trang con (ví dụ /library/detail)
    return location.pathname === path || location.pathname.startsWith(path);
  };

  return (
    <header className="w-full bg-[#0881A3] fixed top-0 left-0 z-50 shadow-md">
      <div className="w-full flex items-center justify-between h-[60px] px-6">
        {/* LEFT SECTION */}
        <div className="flex items-center gap-10">
          {/* Logo */}
          <div
            className="flex items-center gap-1 cursor-pointer"
            onClick={() => {
              navigate("/home");
            }}
          >
            <img src={bkLogo} alt="Tutor Support" className="h-12 w-12 object-cover" />
            <span className="text-white text-lg font-semibold">
              <i>Tutor Support</i>
            </span>
          </div>

          {/* Navigation Links */}
          <div className="flex items-stretch text-white font-medium w-[360px]">
            {menus.map((menu) => {
              // 4️⃣ Tính toán trạng thái active dựa trên URL
              const active = isActive(menu.link);

              return (
                <a
                  key={menu.tag}
                  onClick={() => {
                    navigate(menu.link);
                  }}
                  // 5️⃣ Sử dụng biến 'active' để set class
                  className={`flex-1 h-[60px] flex items-center justify-center cursor-pointer transition-colors ${
                    active ? "bg-[#0052CC]" : "hover:bg-[#005A99]"
                  }`}
                >
                  {menu.tag}
                </a>
              );
            })}
          </div>
        </div>

        {/* RIGHT SECTION – Icons + Avatar */}
        <div className="flex items-center gap-6">
          <button onClick={() => navigate("/notify")} className="flex items-center gap-2">
            <Bell className="text-white cursor-pointer hover:text-gray-200" />
          </button>

          <button onClick={() => navigate("/chat")} className="flex items-center gap-2">
            <MessageCircle className="text-white hover:text-gray-200" />
          </button>

          {/* Avatar & Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen((prev) => !prev)}
              className="flex items-center gap-2 focus:outline-none"
            >
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/5cd3fd5bfb85afe958c3abdecd2c9da7b63e3c15?width=308"
                alt="user"
                className="w-9 h-9 rounded-full object-cover border border-white cursor-pointer"
              />
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 top-12 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                <div className="p-6 pb-4">
                  <h3 className="text-xl font-bold text-gray-900">{username}</h3>
                  {email && <p className="text-gray-500 text-sm mt-1">{email}</p>}
                </div>
                <div className="h-px bg-gray-200 mx-6"></div>
                <div className="p-4 flex flex-col gap-1">
                  <MenuItem
                    icon={<User size={20} />}
                    label="Profile"
                    onClick={() => {
                      setIsProfileOpen(false);
                      navigate("/profile");
                    }}
                  />
                  <MenuItem
                    icon={<Calendar size={20} />}
                    label="Schedule"
                    onClick={() => {
                      setIsProfileOpen(false);
                      navigate("/my-schedule");
                    }}
                  />
                  <MenuItem
                    icon={<Settings size={20} />}
                    label="Setting"
                    onClick={() => {
                      setIsProfileOpen(false);
                      navigate("/settings");
                    }}
                  />
                  <div className="mt-2">
                    <MenuItem icon={<LogOut size={20} />} label="Logout" onClick={handleLogout} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}