import React from "react";
import { useNavigate } from "react-router-dom";
import bkLogo from "../../assets/images/BkLogo.png";

export default function LoginPage() {
  const navigate = useNavigate();

  const handleChangePassword = () => navigate("/ChangePasswordPage");
  const handleLangSwitch = (lang) => navigate(`/lang/${lang}`);
  const handleJasigLink = () => window.open("https://www.apereo.org/projects/cas", "_blank");

  return (
    <div className="min-h-screen bg-[#e6e6e6] flex flex-col items-center font-['Roboto'] text-[14.5px] text-[#222] pt-0">
      {/* MAIN WHITE BOX */}
      <div className="w-full sm:w-[90%] md:w-[85%] mt-0 bg-white shadow-[0_0_15px_rgba(0,0,0,0.1)] rounded-sm overflow-hidden border border-[#ddd]">
        {/* HEADER */}
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

        {/* CONTENT */}
        <main className="grid grid-cols-1 md:grid-cols-[420px_1fr] gap-6 px-4 sm:px-6 py-6">
          {/* LEFT LOGIN FORM */}
          <section>
            <form
              id="fm1"
              method="post"
              action="#"
              onSubmit={(e) => e.preventDefault()}
              className="bg-[#f5f5f5] p-4 sm:p-5 border border-[#ddd] rounded-sm"
            >
              <h2 className="text-[#990033] text-lg font-bold mb-0">
                Enter your Username and Password
              </h2>
              <div className="mb-2 pb-2 border-b border-[#ddd] text-sm text-[#444]"></div>

              {/* Username */}
              <div className="mb-4">
                <label htmlFor="username" className="block text-[#333] font-semibold mb-1">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="off"
                  className="w-[292px] border border-[#ccc] rounded-sm px-2 py-1.5 bg-[#ffffdd] focus:outline-none focus:ring-1 focus:ring-[#aaa]"
                />
              </div>

              {/* Password */}
              <div className="mb-4">
                <label htmlFor="password" className="block text-[#333] font-semibold mb-1">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  className="w-[292px] border border-[#ccc] rounded-sm px-2 py-1.5 bg-[#ffffdd] focus:outline-none focus:ring-1 focus:ring-[#aaa]"
                />
              </div>

              <div className="mb-4 pb-2 border-b border-[#ddd] text-sm text-[#444]">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="w-4 h-4" />
                  <span>Warn me before logging me into other sites.</span>
                </label>
              </div>

              {/* Nút Login và Clear */}
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  type="button"
                  onClick={() => alert("Bạn đã bị đuổi học vì không đi sinh hoạt sinh viên")}
                  className="bg-[#0066cc] hover:bg-[#004c99] text-white text-sm px-4 py-1.5 rounded-sm font-medium border border-[#004c99]"
                >
                  Login
                </button>
                <button
                  type="reset"
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
          </section>

          {/* RIGHT SIDEBAR */}
          <aside className="text-sm leading-relaxed">
            <h3 className="text-[#800000] font-semibold mb-1">Languages</h3>
            <p className="mb-3">
              <button
                onClick={() => handleLangSwitch("vi")}
                className="text-[#0000ee] underline mr-2"
              >
                Vietnamese
              </button>
              |
              <button
                onClick={() => handleLangSwitch("en")}
                className="text-[#0000ee] underline ml-2"
              >
                English
              </button>
            </p>

            <h3 className="text-[#800000] font-semibold mb-1">Please note</h3>
            <p className="mb-2">
              The Login page enables single sign-on to multiple websites at HCMUT. This means that
              you only have to enter your user name and password once for websites that subscribe to
              the Login page.
            </p>
            <p className="mb-2">
              You will need to use your HCMUT Username and password to login to this site. The
              "HCMUT" account provides access to many resources including the HCMUT Information
              System, e-mail, ...
            </p>
            <p className="mb-4">
              For security reasons, please Exit your web browser when you are done accessing
              services that require authentication!
            </p>

            <h3 className="text-[#800000] font-semibold mb-1">Technical support</h3>
            <p>
              E-mail:{" "}
              <a href="mailto:support@hcmut.edu.vn" className="text-[#0000ee] underline">
                support@hcmut.edu.vn
              </a>
            </p>
            <p>Tel: (84-8) 38647256 - 7204</p>
          </aside>
        </main>
      </div>

      {/* FOOTER */}
      <footer className="text-[#666] text-sm mt-4 mb-4 text-center leading-tight px-3">
        <div>
          Copyright © 2011 - 2012 Ho Chi Minh University of Technology. All rights reserved.
        </div>
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
    </div>
  );
}