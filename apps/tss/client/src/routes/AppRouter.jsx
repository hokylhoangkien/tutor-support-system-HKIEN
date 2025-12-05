import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

import HomePage from "../pages/HomePage";
import ViewCourseDetail from "../pages/ViewDetailCourse/ViewDetailCourse";
import Support from "../pages/Support/Support";
import SupportDetail from "../pages/Support/SupportDetail";
import SessionDetailPage from "../pages/Session/Session";
// import LoginPage from "../pages/AuthPage/LoginPage";
import Profile from "../pages/Profile";
import FeedbackDetail from "../pages/Feedback/FeedbackDetail";
import ViewFeedback from "../pages/Feedback/ViewFeedback";
import SendFeedback from "../pages/Feedback/SendFeedback";
import ViewTutors from "../pages/ViewTutorsPage";
// import PrivateRouter from "./PrivateRouter"; // nếu cần dùng sau này
import TutorProfilePage from "../pages/TutorProfilePage";
import AllCoursesPages from "../pages/AllCoursePages.jsx";
import ViewFeedbackStudent from "../pages/Feedback/ViewFeedStudent";
import Progress from "../pages/ProgressPage";
import SchedulePage from "../pages/SchedulePage/SchedulePage";
import MySched from "../pages/SchedulePage/Mysched.jsx";
import CreateSession from "../pages/Session/CreateSession";
import ProgressPage from "../pages/ProgressPage";

export default function AppRouter() {
  const location = useLocation();

  useEffect(() => {
    const pathTitleMap = {
      "/home": "Home | Tutor Support System",
      "/view-course-detail": "Course Detail | Tutor Support System",
      "/support": "Support | Tutor Support System",
      "/support/question": "Question Detail | Tutor Support System",
      "/feedback": "Feedback | Tutor Support System",
      "/session": "Session Detail | Tutor Support System",
      "/view-tutor-profile": "Tutor Profile | Tutor Support System",
      "/my-sessions": "My Sessions | Tutor Support System",
      // // từ router 2
      // "/login": "Login | Tutor Support System",
      "/my-schedule": "My Schedule | Tutor Support System",
      "/view-feedback": "View Feedback | Tutor Support System",
      "/schedule": "Schedule | Tutor Support System",
      "/profile": "Profile | Tutor Support System",
      "/progress": "Progress | Tutor Support System",
      "/view-tutors": "Tutors | Tutor Support System",
      "/feedback/detail": "Feedback Detail | Tutor Support System",
      "/feedbacks": "Feedback List | Tutor Support System",
      "/send": "Send Feedback | Tutor Support System",
      "/create-session": "Create Session | Tutor Support System"
    };

    document.title = pathTitleMap[location.pathname] || "Tutor Support System";
  }, [location]);

  console.log("AppRouter rendered");

  return (
    <Routes>
      {/* Redirect trang chủ */}
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="/view-feedback" element={<ViewFeedbackStudent />} />
      {/* ========== ROUTES TỪ FILE 1 ========== */}
      <Route path="/home" element={<HomePage />} />
      <Route path="/Course" element={<ViewCourseDetail />} />
      <Route path="/Course/:sessionId" element={<SessionDetailPage />} />
      <Route path="/support" element={<Support />} />
      <Route path="/support/question" element={<SupportDetail />} />
      {/*<Route path="/feedback" element={<FeedbackPage />} />*/}
      <Route path="/view-tutor-profile" element={<TutorProfilePage />} />
      <Route path="/my-sessions" element={<AllCoursesPages />} />
      {/* <Route path="/login" element={<LoginPage />} /> */}
      <Route path="/profile" element={<Profile />} />
      <Route path="/schedule" element={<SchedulePage />} />
      <Route path="/progress" element={<Progress />} />
      <Route path="/view-tutors" element={<ViewTutors />} />
      <Route path="/create-session" element={<CreateSession />} />
      <Route path="/feedbacks/detail" element={<FeedbackDetail />} />
      <Route path="/feedbacks" element={<ViewFeedback />} />
      <Route path="/send" element={<SendFeedback />} />
      <Route path="/my-schedule" element={<MySched />} />
      <Route path="/progress/:id" element={<ProgressPage />} />
      {/* 404 fallback */}
      {/*<Route path="*" element={<LoginPage />} />*/}
    </Routes>
  );
}
