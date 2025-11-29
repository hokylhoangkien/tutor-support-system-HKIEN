import React from "react";
import { useNavigate } from "react-router-dom";

export default function LoginSidebar() {
  const navigate = useNavigate();

  const handleLangSwitch = (lang) => navigate(`/lang/${lang}`);

  return (
    <aside className="text-sm leading-relaxed">
      <h3 className="text-[#990033] font-semibold mb-1 text-lg">Languages</h3>
      <p className="mb-3">
        <button onClick={() => handleLangSwitch("vi")} className="text-[#0000ee] underline mr-2">
          Vietnamese
        </button>
        |
        <button onClick={() => handleLangSwitch("en")} className="text-[#0000ee] underline ml-2">
          English
        </button>
      </p>

      <h3 className="text-[#990033] font-semibold mb-1 text-lg">Please note</h3>
      <p className="mb-2">
        The Login page enables single sign-on to multiple websites at HCMUT. This means that you
        only have to enter your user name and password once for websites that subscribe to the Login
        page.
      </p>
      <p className="mb-4">
        You will need to use your HCMUT Username and password to login to this site. The "HCMUT"
        account provides access to many resources including the HCMUT Information System, e-mail,
        ...
      </p>
      <p className="mb-4">
        For security reasons, please Exit your web browser when you are done accessing services that
        require authentication
      </p>

      <h3 className="text-[#990033] font-semibold mb-1 text-lg">Technical support</h3>
      <p>
        E-mail:{" "}
        <a href="mailto:support@hcmut.edu.vn" className="text-[#0000ee] underline">
          support@hcmut.edu.vn
        </a>
      </p>
      <p>Tel: (84-8) 38647256 - 7204</p>
    </aside>
  );
}
