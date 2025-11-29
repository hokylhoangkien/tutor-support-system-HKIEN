import React from "react";
import Footer from "../components/HomePage/Footer.jsx";
import Header from "../components/HomePage/Header.jsx";
import Info from "../components/HomePage/Info.jsx";
import HeroSection from "../components/HomePage/HeroSection.jsx";
import SuggestedSessions from "../components/HomePage/SuggestedSession.jsx";
import QuickActions from "../components/HomePage/QuickAction.jsx";
import RecommendedTutors from "../components/HomePage/RecommendedTutors.jsx";
import HelpCategories from "../components/HomePage/HelpCategories.jsx";
export default function HomePage() {
  return (
    <>
      <Header></Header>
      <HeroSection></HeroSection>
      <QuickActions></QuickActions>
      <SuggestedSessions></SuggestedSessions>
      <RecommendedTutors></RecommendedTutors>
      <HelpCategories></HelpCategories>
      <Info></Info>
      <Footer></Footer>
    </>
  );
}
