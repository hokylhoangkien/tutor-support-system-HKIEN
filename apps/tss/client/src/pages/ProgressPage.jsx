import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const CURRENT_TUTOR = "Mai Duc Trung";

export default function Progress() {
  const navigate = useNavigate();
  const [studentName, setStudentName] = useState("");
  const [sessionNumber, setSessionNumber] = useState("");
  const [topic, setTopic] = useState("");

  const [details, setDetails] = useState("");
  const [goalResult, setGoalResult] = useState("");
  const [tasks, setTasks] = useState("");

  const [interaction, setInteraction] = useState("Good");
  const [issues, setIssues] = useState("");

  const [nextPlan, setNextPlan] = useState("");
  const [requestSupport, setRequestSupport] = useState("");

  const [previewMode, setPreviewMode] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const reportData = {
    studentName,
    sessionNumber,
    topic,
    details,
    goalResult,
    tasks,
    interaction,
    issues,
    nextPlan,
    requestSupport,
    tutor: CURRENT_TUTOR,
    date: new Date().toLocaleDateString("en-US"),
  };

  const validate = () => {
    const newErrors = {};
    if (!studentName.trim()) newErrors.studentName = "Please enter tutor name.";
    if (!sessionNumber.trim()) newErrors.sessionNumber = "Please enter session number.";
    if (!topic.trim()) newErrors.topic = "Please enter topic.";
    return newErrors;
  };

  const handlePreview = () => {
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      setPreviewMode(true);
    }
  };

  const handleSubmit = () => {
    console.log("📌 REPORT SUBMITTED:", reportData);
    setPreviewMode(false);
    setSubmitted(true);
  };

  const inputErrorStyle = (field) => (errors[field] ? "border-red-500" : "border-gray-300");

  return (
    <div>
      <Header />
      <div className="max-w-5xl mx-auto px-6 py-12 mt-12">
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center w-10 h-10 hover:bg-gray-200 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-[#0a1f44]" />
          </button>

          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">Create Report</h1>
        </div>

        <p className="text-gray-600 mb-10">
          This report summarizes the teaching progress, student performance, achieved outcomes and
          support requirements after each session.
        </p>

        {submitted && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-6 py-4 rounded mb-8">
            The report has been successfully submitted to the management team.
          </div>
        )}

        {!previewMode ? (
          <div className="space-y-7 bg-white p-6 rounded-lg shadow-md">
            <div>
              <label className="font-semibold">Tutor Name:</label>
              <input
                value={studentName}
                onChange={(e) => {
                  setStudentName(e.target.value);
                  setErrors({ ...errors, studentName: "" });
                }}
                className={`w-full border ${inputErrorStyle(
                  "studentName"
                )} px-4 py-2 rounded-lg mt-1`}
                placeholder="Example: John Smith"
              />
              {errors.studentName && (
                <p className="text-red-500 text-sm mt-1">{errors.studentName}</p>
              )}
            </div>

            <div>
              <label className="font-semibold">Session Number:</label>
              <input
                type="number"
                value={sessionNumber}
                onChange={(e) => {
                  setSessionNumber(e.target.value);
                  setErrors({ ...errors, sessionNumber: "" });
                }}
                className={`w-full border ${inputErrorStyle(
                  "sessionNumber"
                )} px-4 py-2 rounded-lg mt-1`}
                placeholder="Example: 5"
              />
              {errors.sessionNumber && (
                <p className="text-red-500 text-sm mt-1">{errors.sessionNumber}</p>
              )}
            </div>

            <div>
              <label className="font-semibold">Session Topic / Syllabus:</label>
              <input
                value={topic}
                onChange={(e) => {
                  setTopic(e.target.value);
                  setErrors({ ...errors, topic: "" });
                }}
                className={`w-full border ${inputErrorStyle("topic")} px-4 py-2 rounded-lg mt-1`}
                placeholder="Example: Asynchronous JS – Async Await"
              />
              {errors.topic && <p className="text-red-500 text-sm mt-1">{errors.topic}</p>}
            </div>

            <div>
              <label className="font-semibold">Content Delivered & Teaching Method:</label>
              <textarea
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                className="w-full border px-4 py-2 rounded-lg mt-1"
                rows={4}
                placeholder="Example: Explained async concepts, demo code..."
              />
            </div>

            <div>
              <label className="font-semibold">Learning Outcome & Goal Completion:</label>
              <textarea
                value={goalResult}
                onChange={(e) => setGoalResult(e.target.value)}
                className="w-full border px-4 py-2 rounded-lg mt-1"
                rows={3}
                placeholder="Example: Achieved 80% of lesson objectives..."
              />
            </div>

            <div>
              <label className="font-semibold">Assignments & Follow-up Tasks:</label>
              <textarea
                value={tasks}
                onChange={(e) => setTasks(e.target.value)}
                className="w-full border px-4 py-2 rounded-lg mt-1"
                rows={3}
                placeholder="Example: Complete 02 coding exercises..."
              />
            </div>

            <div>
              <label className="font-semibold">Student Engagement & Interaction:</label>
              <select
                value={interaction}
                onChange={(e) => setInteraction(e.target.value)}
                className="w-full border px-4 py-2 rounded-lg mt-1"
              >
                <option>Very Active</option>
                <option>Active</option>
                <option>Average</option>
                <option>Limited</option>
              </select>
            </div>

            <div>
              <label className="font-semibold">Challenges / Risks Identified:</label>
              <textarea
                value={issues}
                onChange={(e) => setIssues(e.target.value)}
                className="w-full border px-4 py-2 rounded-lg mt-1"
                rows={3}
                placeholder="Example: Lack of prerequisite HTML knowledge..."
              />
            </div>

            <div>
              <label className="font-semibold">Next Session Execution Plan:</label>
              <textarea
                value={nextPlan}
                onChange={(e) => setNextPlan(e.target.value)}
                className="w-full border px-4 py-2 rounded-lg mt-1"
                rows={3}
                placeholder="Example: Additional theory recap..."
              />
            </div>

            <div>
              <label className="font-semibold">Support Required / Notes:</label>
              <textarea
                value={requestSupport}
                onChange={(e) => setRequestSupport(e.target.value)}
                className="w-full border px-4 py-2 rounded-lg mt-1"
                rows={3}
                placeholder="Example: Need presentation resources..."
              />
            </div>

            <button
              className="mt-6 bg-[#4caf50] text-white font-semibold px-6 py-3 rounded-lg transition shadow-md w-full"
              onClick={handlePreview}
            >
              Preview Report
            </button>
          </div>
        ) : (
          <div className="bg-gray-50 p-8 shadow-lg rounded-xl border">
            <h2 className="text-2xl font-bold text-center mb-6">TEACHING PROGRESS REPORT</h2>

            <div className="space-y-2 text-gray-800">
              <p>
                <strong>Tutor:</strong> {studentName}
              </p>
              <p>
                <strong>Session:</strong> {sessionNumber}
              </p>
              <p>
                <strong>Topic:</strong> {topic}
              </p>
              <p>
                <strong>Content & Method:</strong> {details}
              </p>
              <p>
                <strong>Outcome Achieved:</strong> {goalResult}
              </p>
              <p>
                <strong>Assigned Tasks:</strong> {tasks}
              </p>
              <p>
                <strong>Engagement:</strong> {interaction}
              </p>
              <p>
                <strong>Challenges:</strong> {issues || "None"}
              </p>
              <p>
                <strong>Next Plan:</strong> {nextPlan}
              </p>
              <p>
                <strong>Support Notes:</strong> {requestSupport}
              </p>

              <p className="mt-4 text-sm text-gray-600">Date Submitted: {reportData.date}</p>
              <p className="text-sm text-gray-600">Reported by: {reportData.tutor}</p>
            </div>

            <div className="flex gap-4 mt-8">
              <button
                className="bg-gray-400 text-white px-6 py-2 rounded-lg w-1/2"
                onClick={() => setPreviewMode(false)}
              >
                Edit
              </button>

              <button
                className="bg-[#0881a3] text-white font-semibold px-6 py-2 rounded-lg w-1/2"
                onClick={handleSubmit}
              >
                Submit Report
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
