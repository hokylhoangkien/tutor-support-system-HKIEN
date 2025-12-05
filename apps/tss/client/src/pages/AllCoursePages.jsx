import React, { useState, useEffect } from "react";
import Pagin from "../components/pagin";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

import { mockCoursesStudent } from "./mockSession/mockCoursesStudent";
import { mockCoursesTutor } from "./mockSession/mockCoursesTutor";

import { getCurrentRole, getCurrentUser } from "../utils/auth";

export default function AllCoursesPages() {
  const [sessions, setSessions] = useState([]);
  const [role, setRole] = useState(null); // ✅ lưu role để render nút
  const navigate = useNavigate();

  useEffect(() => {
    const currentRole = getCurrentRole(); // "student" | "tutor"
    const user = getCurrentUser();

    setRole(currentRole);

    if (currentRole === "tutor") {
      setSessions(mockCoursesTutor(user?.name || "John Doe"));
    } else {
      setSessions(mockCoursesStudent);
    }
  }, []);

  // const handleCreateReport = () => {
  //   navigate("/progress");
  // };

  return (
    <>
      <Header />

      <div className="w-full bg-[#e8e8e8] font-roboto text-gray-800 mt-16 mb-8">
        <main className="max-w-[1600px] mx-auto p-6 space-y-8">

          <Pagin sessions={sessions} />
        </main>
      </div>

      <Footer />
    </>
  );
}
