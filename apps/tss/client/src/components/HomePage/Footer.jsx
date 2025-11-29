import bkLogo from "../../assets/images/BkLogo.png";

export default function Footer() {
  return (
    <footer className="w-full bg-[#142b63] text-gray-200">
      <div className="w-full px-10 py-6 flex flex-col md:flex-row gap-8">
        {/* Left block – Logo + Campus */}
        <div className="flex flex-col md:w-1/3">
          <div className="flex items-center gap-3">
            <img src={bkLogo} className="w-16 h-16 object-contain" alt="HCMUT Logo" />
            <div className="flex flex-col justify-center">
              <span className="text-[10px] font-semibold leading-tight whitespace-nowrap text-left">
                VIETNAM NATIONAL UNIVERSITY HO CHI MINH CITY
              </span>
              <span className="text-[10px] font-semibold leading-tight whitespace-nowrap text-left">
                HO CHI MINH CITY UNIVERSITY OF TECHNOLOGY
              </span>
            </div>
          </div>

          <h3 className="text-lg font-bold text-white italic mb-4">TUTOR SUPPORT SYSTEM</h3>

          <ul className="text-[12px] leading-tight whitespace-nowrap text-left">
            <li>▷ Campus 1: 268 Ly Thuong Kiet, District 10, Ho Chi Minh City</li>
            <li>▷ Campus 2: Tan Lap Quarter, Dong Hoa Ward, Ho Chi Minh City</li>
          </ul>
        </div>

        {/* Right 3 columns */}
        <div className="flex flex-1 gap-12 justify-start md:justify-center">
          {/* About */}
          <div className="flex flex-col text-left">
            <h4 className="font-semibold text-white mb-3 mt-8">About</h4>
            <ul className="space-y-2 text-[12px]">
              <li>
                <a className="hover:text-white" href="#">
                  About Us
                </a>
              </li>
              <li>
                <a className="hover:text-white" href="#">
                  Our Mission
                </a>
              </li>
              <li>
                <a className="hover:text-white" href="#">
                  Blog / Tips
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="flex flex-col text-left">
            <h4 className="font-semibold text-white mb-3 mt-8">Support</h4>
            <ul className="space-y-2 text-[12px]">
              <li>
                <a className="hover:text-white" href="#">
                  Help Center
                </a>
              </li>
              <li>
                <a className="hover:text-white" href="#">
                  Contact us
                </a>
              </li>
              <li>
                <a className="hover:text-white" href="#">
                  Term & Privacy
                </a>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div className="flex flex-col text-left">
            <h4 className="font-semibold text-white mb-3 mt-8">Connect</h4>
            <ul className="space-y-2 text-[12px]">
              <li>
                <a className="hover:text-white" href="#">
                  Facebook
                </a>
              </li>
              <li>
                <a className="hover:text-white" href="#">
                  LinkedIn
                </a>
              </li>
              <li>
                <a className="hover:text-white" href="#">
                  Github
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-[#0d2551] text-gray-300 text-xs w-full">
        <div className="w-full px-6 py-3 flex flex-col md:flex-row justify-between items-center">
          <p className="italic mb-1 md:mb-0">
            © 2025 Tutor Support System – HCMUT. All rights reserved
          </p>
          <p className="italic">Powered by HCMUT</p>
        </div>
      </div>
    </footer>
  );
}
