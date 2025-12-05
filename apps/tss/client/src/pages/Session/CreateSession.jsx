import { useState } from "react";
import Header from "../../components/Header.jsx";
import Footer from "../../components/Footer.jsx";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
const HEADER_TITLE_COLOR = "text-[#001A72]";

const initialForm = {
  title: "",
  courseTitle: "",
  date: "",
  startTime: "",
  endTime: "",
  locationType: "online",
  locationLink: "",
  locationRoom: "",
  capacity: "",
  description: "",
  learningGoalsText: "",
};

export default function CreateSession() {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const formatDate = (value) => {
    if (!value) return "";
    const [y, m, d] = value.split("-");
    return `${d}-${m}-${y}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("");

    if (form.endTime <= form.startTime) {
      setMessage("End time must be after start time.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const learningGoals = form.learningGoalsText
        .split("\n")
        .map((x) => x.trim())
        .filter(Boolean);

      const session = {
        id: Date.now().toString(),
        title: form.title.trim(),
        courseTitle: form.courseTitle.trim(),
        date: form.date,
        displayDate: formatDate(form.date),
        startTime: form.startTime,
        endTime: form.endTime,
        locationType: form.locationType,
        location:
          form.locationType === "online" ? form.locationLink.trim() : form.locationRoom.trim(),
        capacity: Number(form.capacity),
        description: form.description.trim(),
        learningGoals,
      };

      const saved = JSON.parse(localStorage.getItem("mockSessions") || "[]");
      saved.push(session);
      localStorage.setItem("mockSessions", JSON.stringify(saved));

      console.log("Saved mock session:", session);

      setLoading(false);
      navigate("/my-sessions");
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#e6e6e6]">
      <Header />

      <main className="max-w-[900px] mx-auto px-6 pt-24 pb-8">
        {/* Back to My Sessions */}
        <div className="flex items-center gap-4 mb-8 sm:mb-12">
          <button
            onClick={() => navigate("/my-sessions")}
            className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 hover:bg-gray-200 rounded-full transition-colors"
          >
            <ArrowLeft className={`w-6 h-6 sm:w-8 sm:h-8 ${HEADER_TITLE_COLOR}`} />
          </button>

          <h1
            className={`text-3xl sm:text-4xl lg:text-[32px] font-bold ${HEADER_TITLE_COLOR} font-roboto`}
          >
            Back to My Sessions
          </h1>
        </div>

        <section className="bg-white px-6 py-6 rounded-xl shadow">
          <h2 className="text-2xl font-bold mb-4 text-[#001A72]">Create new session</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Title */}
            <div className="flex flex-col gap-1">
              <label className="font-medium">Session title</label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                className="border rounded-md px-3 py-2 outline-none"
                placeholder="Revision for Final Exam"
                required
              />
            </div>

            {/* Course */}
            <div className="flex flex-col gap-1">
              <label className="font-medium">Course</label>
              <input
                type="text"
                name="courseTitle"
                value={form.courseTitle}
                onChange={handleChange}
                className="border rounded-md px-3 py-2 outline-none"
                placeholder="Calculus I"
                required
              />
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col gap-1">
                <label>Date</label>
                <input
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  className="border rounded-md px-3 py-2 outline-none"
                  required
                />
              </div>

              <div className="flex flex-col gap-1">
                <label>Start time</label>
                <input
                  type="time"
                  name="startTime"
                  value={form.startTime}
                  onChange={handleChange}
                  className="border rounded-md px-3 py-2 outline-none"
                  required
                />
              </div>

              <div className="flex flex-col gap-1">
                <label>End time</label>
                <input
                  type="time"
                  name="endTime"
                  value={form.endTime}
                  onChange={handleChange}
                  className="border rounded-md px-3 py-2 outline-none"
                  required
                />
              </div>
            </div>

            {/* Location type */}
            <div className="flex flex-col gap-1">
              <label>Location type</label>
              <div className="flex gap-6">
                <label className="flex gap-2 items-center">
                  <input
                    type="radio"
                    name="locationType"
                    value="online"
                    checked={form.locationType === "online"}
                    onChange={handleChange}
                  />
                  Online
                </label>
                <label className="flex gap-2 items-center">
                  <input
                    type="radio"
                    name="locationType"
                    value="offline"
                    checked={form.locationType === "offline"}
                    onChange={handleChange}
                  />
                  Offline (room)
                </label>
              </div>
            </div>

            {/* Location detail */}
            {form.locationType === "online" ? (
              <div className="flex flex-col gap-1">
                <label>Meeting link</label>
                <input
                  type="url"
                  name="locationLink"
                  value={form.locationLink}
                  onChange={handleChange}
                  className="border rounded-md px-3 py-2 outline-none"
                  placeholder="https://meet.google.com/abc-defg-hij"
                  required
                />
              </div>
            ) : (
              <div className="flex flex-col gap-1">
                <label>Room</label>
                <input
                  type="text"
                  name="locationRoom"
                  value={form.locationRoom}
                  onChange={handleChange}
                  className="border rounded-md px-3 py-2 outline-none"
                  placeholder="A1.101"
                  required
                />
              </div>
            )}

            {/* Capacity */}
            <div className="flex flex-col gap-1">
              <label>Capacity</label>
              <input
                type="number"
                name="capacity"
                min="1"
                value={form.capacity}
                onChange={handleChange}
                className="border rounded-md px-3 py-2 outline-none"
                placeholder="40"
                required
              />
            </div>

            {/* Description */}
            <div className="flex flex-col gap-1">
              <label>Description</label>
              <textarea
                name="description"
                rows={3}
                value={form.description}
                onChange={handleChange}
                className="border rounded-md px-3 py-2 outline-none"
                placeholder="Write a short description..."
                required
              />
            </div>

            {/* Learning goals */}
            <div className="flex flex-col gap-1">
              <label>
                Learning goals <span className="text-xs text-gray-500">(1 dòng = 1 mục)</span>
              </label>
              <textarea
                name="learningGoalsText"
                rows={3}
                value={form.learningGoalsText}
                onChange={handleChange}
                className="border rounded-md px-3 py-2 outline-none"
                placeholder={`Review core concepts.\nSolve exam-style problems.\nClarify remaining questions.`}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-[#001A72] text-white px-4 py-2 rounded-md hover:bg-[#0024A5] disabled:opacity-60"
            >
              {loading ? "Saving..." : "Create session"}
            </button>
          </form>

          {message && <p className="mt-4 text-sm">{message}</p>}
        </section>
      </main>

      <Footer />
    </div>
  );
}
