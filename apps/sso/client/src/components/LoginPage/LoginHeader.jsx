import React from "react";
import bkLogo from "../../assets/images/BkLogo.png";

export default function LoginHeader() {
  return (
    <header className="relative">
      <div className="h-[6px] bg-white w-full"></div>
      <div className="bg-[#210f7a]">
        <div className="flex items-center h-[78px]">
          <img src={bkLogo} alt="BK logo" className="h-[86px] w-auto object-contain" />
          <h1 className="text-white font-bold text-[30px] leading-[1] ml-0">
            Central Authentication Service
          </h1>
        </div>
      </div>
    </header>
  );
}
