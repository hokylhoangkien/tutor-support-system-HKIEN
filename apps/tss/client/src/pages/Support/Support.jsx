import { useState, useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Back from "../../components/Back";
import SupportForm from "../../components/Support/SupportForm";
import QuestionsList from "../../components/Support/QuestionList";
import FindContact from "../../components/Support/FindContact";

const STORAGE_KEY = "supportQuestions";

const initialMockQuestions = [
  {
    id: 1,
    title: "Problem1",
    user: "Nguyễn Vũ Quốc An",
    date: "08/04/2025",
    answers: 5,
    fullContent: "Mô tả chi tiết vấn đề 1...",
  },
  {
    id: 2,
    title: "I have problem with...",
    user: "Nguyễn Vũ Quốc An",
    date: "25/10/2025",
    answers: 0,
    fullContent: "Chi tiết về vấn đề I have problem with...",
  },
  {
    id: 3,
    title: "Problem2",
    user: "Nguyễn Vũ Quốc An",
    date: "23/10/2025",
    answers: 0,
    fullContent: "Mô tả chi tiết Problem2...",
  },
  {
    id: 4,
    title: "Problem3",
    user: "Nguyễn Vũ Quốc An",
    date: "23/10/2025",
    answers: 0,
    fullContent: "Mô tả chi tiết Problem3...",
  },
  {
    id: 5,
    title: "Problem4",
    user: "Nguyễn Vũ Quốc An",
    date: "23/10/2025",
    answers: 0,
    fullContent: "Mô tả chi tiết Problem4...",
  },
  {
    id: 6,
    title: "Problem5",
    user: "Nguyễn Vũ Quốc An",
    date: "25/10/2025",
    answers: 0,
    fullContent: "Mô tả chi tiết Problem5...",
  },
  {
    id: 7,
    title: "Problem6",
    user: "Nguyễn Vũ Quốc An",
    date: "25/10/2025",
    answers: 0,
    fullContent: "Mô tả chi tiết Problem6...",
  },
  {
    id: 8,
    title: "Hết bài + viết lại :v",
    user: "Nguyễn Vũ Quốc An",
    date: "25/10/2025",
    answers: 0,
    fullContent: "Mô tả chi tiết Hết bài + viết lại :v...",
  },
];

export default function SupportPage() {
  const [questions, setQuestions] = useState([]);

  // load từ localStorage hoặc seed mock
  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setQuestions(JSON.parse(saved));
    } else {
      setQuestions(initialMockQuestions);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialMockQuestions));
    }
  }, []);

  const handleAddQuestion = (newQuestion) => {
    setQuestions((prev) => {
      const updated = [newQuestion, ...prev];
      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      }
      return updated;
    });
  };

  return (
    <div className="min-h-screen bg-[#E8E8E8]">
      <Header />

      {/* top bar: back + về home */}
      <div className="max-w-6xl mx-auto px-4 mt-20">
        <Back />
      </div>

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 space-y-8 mb-6">
        <SupportForm onSubmitQuestion={handleAddQuestion} />
        <QuestionsList questions={questions} />
        <FindContact />
      </main>

      <Footer />
    </div>
  );
}
