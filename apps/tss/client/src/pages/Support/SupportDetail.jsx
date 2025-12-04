import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const STORAGE_KEY = "supportQuestions";

export default function SupportDetail() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [question, setQuestion] = useState(null);

  const idParam = searchParams.get("id");

  useEffect(() => {
    if (!idParam) return;

    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return;

    const list = JSON.parse(saved);
    const found = list.find((q) => String(q.id) === String(idParam));

    setQuestion(found || null);
  }, [idParam]);

  return (
    <div className="min-h-screen bg-[#E8E8E8]">
      <Header />

      <main className="max-w-4xl mx-auto px-4 pt-24 pb-10">
        {/* Back */}
        <button
          onClick={() => navigate("/support")}
          className="flex items-center gap-2 text-[#0a1f44] mb-6 hover:underline"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-lg font-medium">Back to Support</span>
        </button>

        <section className="bg-white rounded-xl p-6 shadow-md border border-[#0054A6]">
          {!question ? (
            <p className="text-gray-600 text-sm">Question not found.</p>
          ) : (
            <>
              <h1 className="text-2xl font-bold text-[#0a1f44] mb-2">{question.title}</h1>

              <p className="text-sm text-gray-600 mb-4">
                By <b>{question.user}</b> • {question.date}
                {question.sendTo && (
                  <>
                    {" "}
                    • Sent to: <b>{question.sendTo}</b>
                  </>
                )}
              </p>

              <div className="border-t border-gray-300 pt-4">
                <p className="text-base text-gray-800 whitespace-pre-line leading-relaxed">
                  {question.fullContent}
                </p>
              </div>
            </>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
