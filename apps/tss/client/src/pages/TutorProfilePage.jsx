import React, { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import getById from "./mockDataTutor"; // Import the helper function

export default function TutorProfilePage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [tutor, setTutor] = useState(null);
  const [loading, setLoading] = useState(true);

  // --- Calendar Logic ---
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prevMonth = () => {
    if (month === 0) { setMonth(11); setYear(year - 1); } else { setMonth(month - 1); }
  };
  const nextMonth = () => {
    if (month === 11) { setMonth(0); setYear(year + 1); } else { setMonth(month + 1); }
  };
  // ----------------------

  // Fetch Tutor Data
  useEffect(() => {
    if (id) {
      const foundTutor = getById(id);
      console.log(foundTutor);
      setTutor(foundTutor);
      setLoading(false);
      window.scrollTo(0, 0);
    }
  }, [id]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!tutor) {
    return (
      <div className="flex flex-col h-screen">
        <Header />
        <div className="flex-1 flex justify-center items-center text-xl font-bold text-gray-500">
          Tutor not found
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="w-full bg-[#e8e8e8] font-roboto text-gray-800 mt-20 mb-12">
        <main className="max-w-[1600px] mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* LEFT CONTENT */}
          <div className="lg:col-span-2 space-y-6">

            {/* TOP CARD */}
            <section className="bg-white rounded-2xl shadow-lg overflow-hidden">
              {/* Banner */}
              <div className="bg-[#1488d8] h-28 w-full"></div>

              {/* Avatar & Info */}
              <div className="px-6 pb-6 -mt-16 flex items-start gap-6">
                <img
                  src={`https://picsum.photos/seed/${tutor.seed || tutor.id}/300/400`}
                  alt="avatar"
                  className="w-40 h-40 rounded-full border-4 border-white shadow-lg object-cover bg-gray-200"
                />

                <div className="flex flex-col mt-20 flex-1">
                  {/* Tên Dynamic */}
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{tutor.name}</h1>
                  <p className="text-gray-500 mb-4">{tutor.subject}</p>

                  {/* Badges + CHAT NOW */}
                  <div className="flex items-center gap-4">
                    <button className="mr-auto bg-[#1488d8] text-white text-sm px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition">
                      CHAT NOW
                    </button>
                    <div className="flex items-center gap-1 bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-semibold">
                      <Star className="w-4 h-4" />
                      {tutor.rating} ({tutor.reviews})
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* INTRODUCTION */}
            <section className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4">Introduction</h2>
              <ul className="text-sm space-y-2 text-gray-700 list-disc list-inside">
                {tutor.info && tutor.info.map((line, index) => (
                  <li key={index}>{line}</li>
                ))}
              </ul>
            </section>

            {/* TEACHING COURSES */}
            <section className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold mb-5">Teaching Courses</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {tutor.teachingCourses && tutor.teachingCourses.map((course) => (
                  <div
                    key={course.id}
                    className="bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-xl transition-all flex flex-col"
                  >
                    <img
                      src={`https://picsum.photos/seed/${tutor.seed}${course.id}/400/250`}
                      className="w-full h-36 object-cover bg-gray-100"
                      alt={course.title}
                    />

                    <div className="p-5 flex flex-col flex-1">
                      <h3 className="text-[#142b63] font-semibold text-lg mb-2">
                        {course.title}
                      </h3>

                      <p className="text-gray-600 text-sm mb-4 flex items-center gap-1">
                        Offline ({course.code})
                        <span className="flex gap-1 text-yellow-500 ml-2">
                          <Star className="w-4 h-4" /> {course.rating}
                        </span>
                      </p>

                      <div className="mt-auto flex justify-center">
                        <button className="text-[#142b63] text-sm font-semibold border border-[#142b63] px-6 py-2 rounded-full hover:bg-[#142b63] hover:text-white transition-all">
                          View Detail
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* RIGHT SIDEBAR */}
          <aside className="space-y-6">
            {/* BOOK A SESSION */}
            <section className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-4">Book a Session</h2>

              {/* Month Selector */}
              <div className="flex justify-between items-center mb-3">
                <button onClick={prevMonth} className="p-2 rounded hover:bg-gray-100 transition">&lt;</button>
                <span className="text-sm font-semibold text-gray-700">{monthNames[month]} {year}</span>
                <button onClick={nextMonth} className="p-2 rounded hover:bg-gray-100 transition">&gt;</button>
              </div>

              {/* Mini Calendar */}
              <div className="grid grid-cols-7 gap-1 text-xs text-gray-600">
                {[...Array(daysInMonth)].map((_, i) => {
                  const dayNum = i + 1;
                  const isToday =
                    dayNum === today.getDate() &&
                    month === today.getMonth() &&
                    year === today.getFullYear();
                  return (
                    <div
                      key={i}
                      className={`p-2 text-center rounded cursor-pointer transition ${
                        isToday ? "bg-blue-600 text-white font-semibold" : "hover:bg-gray-200"
                      }`}
                    >
                      {dayNum}
                    </div>
                  );
                })}
              </div>

              {/* Time picker */}
              <div className="mt-4">
                {/*<div className="text-sm font-semibold mb-1">Select Time</div>*/}
                {/*<input*/}
                {/*  type="time"*/}
                {/*  defaultValue="09:30"*/}
                {/*  className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"*/}
                {/*/>*/}
                <button
                  onClick={()=> navigate("/schedule")}
                  className="mt-3 w-full bg-[#030391] text-white py-2 rounded-lg text-sm hover:bg-blue-700 transition">
                  BOOK NOW
                </button>
              </div>
            </section>

            {/* UPCOMING SESSION */}
            <section className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-3">Upcoming Session</h2>

              <div className="bg-blue-900 text-white p-4 rounded-xl">
                <p className="text-xs opacity-80">SESSION</p>
                <p className="text-xs opacity-80 mb-2">November 6, 2025</p>

                <h3 className="text-lg font-bold leading-tight mb-3">
                  Revision for<br />Final Exam
                </h3>

                <p className="text-sm mb-4">Instructor: {tutor.name}</p>

                <button className="bg-white text-blue-900 font-semibold w-full py-2 rounded-lg text-sm hover:bg-gray-100 transition">
                  Join now
                </button>
              </div>
            </section>
          </aside>
        </main>
      </div>
      <Footer />
    </>
  );
}