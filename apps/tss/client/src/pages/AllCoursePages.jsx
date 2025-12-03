import React, { useState, useEffect } from "react";
import Pagin from "../components/pagin";
import Header from "../components/Header";
import Footer from "../components/Footer";
export default function AllCoursesPages() {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const generateRandomSessions = (count) => {
      return Array.from({ length: count }, (_, i) => ({
        id: i,
        title: `Introduction to Data Science #${i + 1}`,
        tutor: ["John Doe", "Anna Smith", "Taylor Lee", "Chris Paul"][
          Math.floor(Math.random() * 4)
        ],
        rating: (Math.random() * (5 - 4) + 4).toFixed(1),
        mode: Math.random() > 0.5 ? "Online via Zoom" : "Offline at Campus",
        img: `https://picsum.photos/seed/session${i}/300/200`,
      }));
    };

    setSessions(generateRandomSessions(200));
  }, []);

  return (
    <>
      <Header></Header>;
      <div className="min-h-screen bg-[#e8e8e8] font-roboto text-gray-800 mt-16 mb-8">
        <main className="max-w-7xl mx-auto p-6 space-y-8">
          <Pagin sessions={sessions} />
        </main>
      </div>
      <Footer></Footer>
    </>
  );
}
