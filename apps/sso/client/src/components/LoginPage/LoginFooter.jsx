import React from "react";

export default function LoginFooter() {
  const handleJasigLink = () => window.open("https://www.apereo.org/projects/cas", "_blank");

  return (
    <footer className="text-[#666] text-sm mt-4 mb-4 text-center leading-tight px-3">
      <div>Copyright © 2011 - 2012 Ho Chi Minh University of Technology. All rights reserved.</div>
      <div>
        Powered by{" "}
        <button
          onClick={handleJasigLink}
          className="text-[#0000ee] underline bg-transparent border-0 p-0 cursor-pointer"
        >
          Jasig CAS 3.5.1
        </button>
      </div>
    </footer>
  );
}
