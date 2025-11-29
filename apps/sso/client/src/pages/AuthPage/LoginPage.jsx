import React from "react";
import LoginHeader from "../../components/LoginPage/LoginHeader";
import LoginForm from "../../components/LoginPage/LoginForm";
import LoginSidebar from "../../components/LoginPage/LoginSidebar";
import LoginFooter from "../../components/LoginPage/LoginFooter";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#e6e6e6] flex flex-col items-center font-['Roboto'] text-[14.5px] text-[#222] pt-0">
      <div className="w-full sm:w-[90%] md:w-[85%] mt-0 bg-white shadow-[0_0_15px_rgba(0,0,0,0.1)] rounded-sm overflow-hidden border border-[#ddd]">
        <LoginHeader />

        <main className="grid grid-cols-1 md:grid-cols-[420px_1fr] gap-6 px-4 sm:px-6 py-6">
          <LoginForm />
          <LoginSidebar />
        </main>
      </div>

      <LoginFooter />
    </div>
  );
}
