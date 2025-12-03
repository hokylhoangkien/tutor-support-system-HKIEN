import { useState } from "react";
import {
  Bell,
  MessageCircle,
  ChevronDown,
  User,
  Calendar,
  Settings,
  LogOut
} from "lucide-react";
import { useNavigate } from 'react-router-dom';
import bkLogo from "../assets/images/BkLogo.png";

// Helper Component for Menu Items (Kept separate for cleanliness)
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
  const [activeMenu, setActiveMenu] = useState("Home");

  // 1. ADDED STATE FOR DROPDOWN HERE
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const menus = [
    { tag: "Home", link: "/home" },
    { tag: "My Session", link: "/my-sessions" },
    { tag: "Library", link: "/library" },
  ];

  const navigate = useNavigate();

  return (
    <header className="w-full bg-[#0881A3] fixed top-0 left-0 z-50 shadow-md">
      <div className="w-full flex items-center justify-between h-[60px] px-6">

        {/* LEFT SECTION */}
        <div className="flex items-center gap-10">
          {/* Logo */}
          <div className="flex items-center gap-1 cursor-pointer">
            <img src={bkLogo} alt="Tutor Support" className="h-12 w-12 object-cover" />
            <span className="text-white text-lg font-semibold">
              <i>Tutor Support</i>
            </span>
          </div>

          {/* Navigation Links */}
          <div className="flex items-stretch text-white font-medium w-[360px]">
            {menus.map((menu) => (
              <a
                key={menu.tag}
                onClick={() => {
                  setActiveMenu(menu.tag);
                  navigate(menu.link);
                }}
                className={`flex-1 h-[60px] flex items-center justify-center cursor-pointer transition-colors ${
                  activeMenu === menu.tag ? "bg-[#0052CC]" : "hover:bg-[#005A99]"
                }`}
              >
                {menu.tag}
              </a>
            ))}
          </div>
        </div>

        {/* RIGHT SECTION – Icons + Avatar */}
        <div className="flex items-center gap-6">
          <button onClick={() => navigate('/notify')} className="flex items-center gap-2">
            <Bell className="text-white cursor-pointer hover:text-gray-200" />
          </button>

          <button onClick={() => navigate('/chat')} className="flex items-center gap-2">
            <MessageCircle className="text-white hover:text-gray-200" />
          </button>

          {/* 2. AVATAR & DROPDOWN WRAPPER */}
          {/* 'relative' is required here so the absolute dropdown anchors to this div */}
          <div className="relative">

            {/* The Trigger Button */}
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-2 focus:outline-none"
            >
              <img
                src="/avatar.png"
                alt="user"
                className="w-9 h-9 rounded-full object-cover border border-white cursor-pointer"
              />
            </button>

            {/* 3. THE POPUP MENU */}
            {isProfileOpen && (
              <div className="absolute right-0 top-12 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">

                {/* Header Section */}
                <div className="p-6 pb-4">
                  <h3 className="text-xl font-bold text-gray-900">Nguyen Trung An</h3>
                  <p className="text-gray-500 text-sm mt-1">an.nguyentrung@hcmut.edu.vn</p>
                </div>

                {/* Divider */}
                <div className="h-px bg-gray-200 mx-6"></div>

                {/* Menu Items */}
                <div className="p-4 flex flex-col gap-1">
                  <MenuItem
                    icon={<User size={20} />}
                    label="Profile"
                    onClick={() => navigate('/profile')}
                  />
                  <MenuItem
                    icon={<Calendar size={20} />}
                    label="Schedule"
                    onClick={() => navigate('/schedule')}
                  />
                  <MenuItem
                    icon={<Settings size={20} />}
                    label="Setting"
                    onClick={() => navigate('/settings')}
                  />

                  <div className="mt-2">
                    <MenuItem
                      icon={<LogOut size={20} />}
                      label="Logout"
                      onClick={() => console.log("Logging out...")}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Click outside listener (Optional UI improvement) */}
            {/* To make the menu close when clicking elsewhere, you usually add a fixed invisible overlay or use a hook.
                For now, clicking the avatar again closes it. */}
          </div>
        </div>
      </div>
    </header>
  );
}