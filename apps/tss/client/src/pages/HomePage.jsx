import React, { useEffect, useState } from "react";
import Footer from "../components/Footer.jsx";
import Header from "../components/Header.jsx";
import Info from "../components/HomePage/Info.jsx";
import HeroSection from "../components/HomePage/HeroSection.jsx";
import SuggestedSessions from "../components/HomePage/SuggestedSession.jsx";
import QuickActions from "../components/HomePage/QuickAction.jsx";
import RecommendedTutors from "../components/HomePage/RecommendedTutors.jsx";
import HelpCategories from "../components/HomePage/HelpCategories.jsx";

export default function HomePage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    console.log("🏠 HomePage useEffect start");

    const params = new URLSearchParams(window.location.search);
    const tokenFromQuery = params.get("token");
    const userFromQuery = params.get("user");

    console.log("[HomePage] tokenFromQuery =", tokenFromQuery);
    console.log("[HomePage] userFromQuery =", userFromQuery);

    // ============================
    // Trường hợp vừa login xong
    // ============================
    if (tokenFromQuery && userFromQuery) {
      try {
        const decodedUserJson = decodeURIComponent(userFromQuery);
        const parsedUser = JSON.parse(decodedUserJson);

        localStorage.setItem("token", tokenFromQuery);
        localStorage.setItem("user", JSON.stringify(parsedUser));

        console.log("[HomePage] Saved to localStorage:", {
          token: tokenFromQuery,
          user: parsedUser,
        });

        // Xóa query sau khi lưu
        window.history.replaceState({}, document.title, "/home");

        setUser(parsedUser);
        return;
      } catch (e) {
        console.error("[HomePage] Failed to parse userFromQuery:", e);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    }

    // ============================
    // Reload → đọc localStorage
    // ============================
    const token = localStorage.getItem("token");
    const storedUserString = localStorage.getItem("user");

    if (!token || !storedUserString) {
      console.log("[HomePage] No token/user → redirect về 4002/login");
      window.location.href = "http://localhost:4002/login";
      return;
    }

    try {
      const storedUser = JSON.parse(storedUserString);
      setUser(storedUser);
    } catch (e) {
      console.error("[HomePage] Failed to parse storedUser:", e);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      // window.location.href = "http://localhost:4002/login";
    }
  }, []);

  if (!user) return null;

  const isTutor = user.role === "tutor";

  return (
    <>
      <Header />
      <HeroSection />
      <QuickActions />
      {!isTutor && (
        <>
          <SuggestedSessions />
          <RecommendedTutors />
          <HelpCategories />
        </>
      )}

      <Info />
      <Footer />
    </>
  );
}
