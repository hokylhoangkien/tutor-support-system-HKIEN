import React, { useState } from 'react';
import { User, Calendar, Settings, LogOut, ChevronDown } from 'lucide-react';

const UserDropdown = () => {
  // State to handle the visibility of the popup
  const [isOpen, setIsOpen] = useState(false);

  // Function to toggle state
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-100 pt-20">

      {/* Container for Button + Dropdown */}
      {/* 'relative' is crucial here so the absolute dropdown positions relative to this box */}
      <div className="relative">

        {/* 1. THE TRIGGER BUTTON */}
        <button
          onClick={toggleDropdown}
          className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm hover:bg-gray-50 transition-colors border border-gray-200"
        >
          <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
            A
          </div>
          <span className="font-medium text-gray-700">Account</span>
          <ChevronDown size={16} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>


        {/* 2. THE POPUP (DROPDOWN) */}
        {isOpen && (
          <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">

            {/* Header Section */}
            <div className="p-6 pb-4">
              <h3 className="text-xl font-bold text-gray-900">Nguyen Trung An</h3>
              <p className="text-gray-500 text-sm mt-1">an.nguyentrung@hcmut.edu.vn</p>
            </div>

            {/* Divider */}
            <div className="h-px bg-gray-200 mx-6"></div>

            {/* Menu Items */}
            <div className="p-4 flex flex-col gap-1">
              <MenuItem icon={<User size={20} />} label="Profile" />
              <MenuItem icon={<Calendar size={20} />} label="Schedule" />
              <MenuItem icon={<Settings size={20} />} label="Setting" />

              {/* Logout often has extra margin or distinct style */}
              <div className="mt-2">
                <MenuItem icon={<LogOut size={20} />} label="Logout" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Helper Component for Menu Items
const MenuItem = ({ icon, label }) => {
  return (
    <button className="w-full flex items-center gap-4 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-xl transition-colors text-left">
      <span className="text-gray-900">{icon}</span>
      <span className="text-lg font-medium">{label}</span>
    </button>
  );
};

export default UserDropdown;