// src/pages/Schedule/MySched.jsx
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import FullCalendarBasic from "../../components/SchedulePage/FullCalendarBasic";
import { getCurrentRole, getCurrentUser } from "../../utils/auth.js";

// --- MOCK DATA THEO ROLE ---
// Có thể tách ra file riêng nếu bạn muốn.

const studentEvents = [
  // --- MONDAY (01/12) ---
  {
    id: "st-3",
    title: "Quản trị dự án (Project Mgmt)",
    start: "2025-12-01T07:30:00",
    end: "2025-12-01T10:30:00",
    extendedProps: {
      tutor: "NGUYỄN VĂN A",
      session: "Lý thuyết: PERT & CPM",
      type: "offline",
      location: "H6-101",
      role: "student",
    },
  },

  // --- TUESDAY (02/12) ---
  {
    id: "st-4",
    title: "Lập trình Web (ReactJS)",
    start: "2025-12-02T08:00:00",
    end: "2025-12-02T11:00:00",
    extendedProps: {
      tutor: "TRẦN MINH TUẤN",
      session: "Thực hành: Custom Hooks",
      type: "offline",
      location: "Lab Web 1",
      role: "student",
    },
  },
  {
    id: "st-5",
    title: "Tư vấn Online: ReactJS",
    start: "2025-12-02T20:00:00",
    end: "2025-12-02T21:00:00",
    extendedProps: {
      tutor: "TRẦN MINH TUẤN",
      session: "Review Code đồ án",
      type: "online",
      location: null,
      role: "student",
    },
  },

  // --- WEDNESDAY (03/12) ---
  {
    id: "st-6",
    title: "Mạng máy tính (Cisco)",
    start: "2025-12-03T07:00:00",
    end: "2025-12-03T09:30:00",
    extendedProps: {
      tutor: "LÊ VĂN HÙNG",
      session: "Routing OSPF & VLAN",
      type: "offline",
      location: "Lab Network",
      role: "student",
    },
  },

  // --- THURSDAY (04/12) ---
  {
    id: "st-7",
    title: "Kiểm thử phần mềm",
    start: "2025-12-04T13:00:00",
    end: "2025-12-04T15:30:00",
    extendedProps: {
      tutor: "PHẠM THU HÀ",
      session: "Selenium Automation",
      type: "offline",
      location: "Phòng máy 3",
      role: "student",
    },
  },

  // --- FRIDAY (05/12) ---
  {
    id: "st-8",
    title: "Hệ cơ sở dữ liệu",
    start: "2025-12-05T09:30:00",
    end: "2025-12-05T12:00:00",
    extendedProps: {
      tutor: "AN NGUYỄN VŨ QUỐC",
      session: "Tối ưu hóa truy vấn",
      type: "offline",
      location: "H6-109",
      role: "student",
    },
  },
];

const tutorEvents = [
  // --- MONDAY (01/12) ---
  {
    id: "tt-3",
    title: "Tutor - Nhập môn Lập trình (C++)",
    start: "2025-12-01T13:00:00",
    end: "2025-12-01T15:00:00",
    extendedProps: {
      tutor: "Bạn (Tutor)",
      session: "Con trỏ & Mảng",
      type: "offline",
      location: "H2-101",
      role: "tutor",
    },
  },

  // --- WEDNESDAY (03/12) ---
  {
    id: "tt-4",
    title: "Tutor - Discrete Math",
    start: "2025-12-03T13:00:00",
    end: "2025-12-03T15:00:00",
    extendedProps: {
      tutor: "Bạn (Tutor)",
      session: "Lý thuyết đồ thị (Graph)",
      type: "offline",
      location: "H2-203",
      role: "tutor",
    },
  },
  {
    id: "tt-5",
    title: "Online Support - Logic",
    start: "2025-12-03T19:30:00",
    end: "2025-12-03T20:30:00",
    extendedProps: {
      tutor: "Bạn (Tutor)",
      session: "Giải bài tập Logic mệnh đề",
      type: "online",
      location: null,
      role: "tutor",
    },
  },

  // --- FRIDAY (05/12) ---
  {
    id: "tt-6",
    title: "Tutor - Web Basics (HTML/CSS)",
    start: "2025-12-05T15:00:00",
    end: "2025-12-05T17:00:00",
    extendedProps: {
      tutor: "Bạn (Tutor)",
      session: "Flexbox & Grid Layout",
      type: "offline",
      location: "Lab Web 2",
      role: "tutor",
    },
  },

  // --- SATURDAY (06/12) ---
  {
    id: "tt-7",
    title: "Exam Review (All Subjects)",
    start: "2025-12-06T09:00:00",
    end: "2025-12-06T11:00:00",
    extendedProps: {
      tutor: "Bạn (Tutor)",
      session: "Tổng ôn tập trước thi",
      type: "online",
      location: null,
      role: "tutor",
    },
  },
];

export default function Mysched() {
  const role = getCurrentRole() || "student";
  const [selectedEvent, setSelectedEvent] = useState(null);

  const events = role === "student" ? studentEvents : tutorEvents;

  const handleEventClick = (info) => {
    const e = info.event;
    const props = e.extendedProps || {};

    setSelectedEvent({
      id: e.id,
      title: e.title,
      tutor: props.tutor,
      session: props.session,
      type: props.type,
      location: props.location,
      start: e.start,
      end: e.end,
    });
  };

  return (
    <div className="min-h-screen bg-[#e6e6e6]">
      <Header />

      <section className="mt-10 px-6 py-6 mb-5">
        <section className="bg-white flex-row px-6 py-6 max-w-[1300px] mx-auto rounded-xl shadow">
          {/* Header + chọn role */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
            <h2 className="text-xl font-bold text-[#030391]">My Schedule</h2>

          </div>

          {/* Calendar */}
          <section className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-8 min-h-[600px]">
            <div className="flex-1 h-full">
              <FullCalendarBasic events={events} onEventClick={handleEventClick} />
            </div>

          {selectedEvent && (
            <div className="mt-6 border-t pt-4 ">
              <h3 className="text-lg font-semibold mb-2 text-[#030391]">Selected session</h3>

              <p className="text-sm text-gray-700">
                <span className="font-medium">Title:</span> {selectedEvent.title}
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-medium">Tutor:</span> {selectedEvent.tutor || "N/A"}
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-medium">Session:</span> {selectedEvent.session || "N/A"}
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-medium">Type:</span> {selectedEvent.type || "N/A"}
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-medium">Location:</span>{" "}
                {selectedEvent.type === "offline"
                  ? selectedEvent.location || "N/A"
                  : selectedEvent.location || "Google Meet link"}
              </p>
              {selectedEvent.start && (
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Time:</span>{" "}
                  {selectedEvent.start.toLocaleString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    day: "2-digit",
                    month: "2-digit",
                  })}
                  {selectedEvent.end &&
                    " – " +
                      selectedEvent.end.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                </p>
              )}
            </div>
          )}
          </section>

        </section>
      </section>
  <Footer />
    </div>
  );
}
