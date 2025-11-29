import { useState } from "react";
import { Search, Bell, MessageCircle } from "lucide-react";
import bkLogo from "../../assets/images/BkLogo.png";

export default function Header() {
  const [activeMenu, setActiveMenu] = useState("Home"); // state quản lý menu active

  const menus = ["Home", "My Sessions", "Library"];

  return (
    <header className="w-full bg-[#0881A3] fixed top-0 left-0 z-50 shadow-md">
      <div className="w-full flex items-center justify-between h-[60px] px-6">
        {/* LEFT */}
        <div className="flex items-center gap-10">
          {/* Logo */}
          <div className="flex items-center gap-1 cursor-pointer">
            <img src={bkLogo} alt="Tutor Support" className="h-12 w-12 object-cover" />
            <span className="text-white text-lg font-semibold">
              <i>Tutor Support</i>
            </span>
          </div>

          {/* Menu */}
          {/* Menu */}
          <nav className="flex items-stretch text-white font-medium w-[360px]">
            {menus.map((menu) => (
              <a
                key={menu}
                href="#"
                onClick={() => setActiveMenu(menu)}
                className={`flex-1 h-[60px] flex items-center justify-center cursor-pointer transition-colors ${
                  activeMenu === menu ? "bg-[#0052CC]" : "hover:bg-[#005A99]"
                }`}
              >
                {menu}
              </a>
            ))}
          </nav>
        </div>

        {/* CENTER – Search */}
        <div className="flex items-center w-[420px]">
          <input
            type="text"
            placeholder="Search"
            className="w-full px-4 py-2 rounded-l-lg outline-none"
          />
          <button className="bg-[#001F8B] rounded-r-lg px-4 h-[40px] flex items-center justify-center">
            <Search className="text-white" size={18} />
          </button>
        </div>

        {/* RIGHT – Icons + Avatar */}
        <div className="flex items-center gap-6">
          <Bell className="text-white cursor-pointer hover:text-gray-200" />

          <div className="relative cursor-pointer">
            <MessageCircle className="text-white hover:text-gray-200" />
          </div>

          {/* Avatar */}
          <img
            src="/avatar.png"
            alt="user"
            className="w-9 h-9 rounded-full object-cover border border-white cursor-pointer"
          />
        </div>
      </div>
    </header>
  );
}
