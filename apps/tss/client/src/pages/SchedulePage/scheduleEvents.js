const events = [
  // --- MONDAY (01/12) ---
  {
    id: "tt-3",
    title: "Tutor - Nhập môn Lập trình (C++)",
    start: "2025-12-01T13:00:00",
    end: "2025-12-01T15:00:00",
    extendedProps: {
      tutor: "Mai Đức Trung",
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
      tutor: "Mai Đức Trung",
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
      tutor: "Mai Đức Trung",
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
      tutor: "Mai Đức Trung",
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
      tutor: "Mai Đức Trung",
      session: "Tổng ôn tập trước thi",
      type: "online",
      location: null,
      role: "tutor",
    },
  },
];
export { events as registeredEvents };
