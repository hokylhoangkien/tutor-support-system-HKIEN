import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";

export default function QuestionsList({ questions }) {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const filteredQuestions = useMemo(
    () => questions.filter((q) => q.title.toLowerCase().includes(search.toLowerCase())),
    [questions, search]
  );

  const totalQuestions = questions.length;
  const totalFiltered = filteredQuestions.length;
  const totalPages = Math.max(1, Math.ceil(totalFiltered / pageSize));
  const safePage = Math.min(currentPage, totalPages);

  const pagedQuestions = filteredQuestions.slice((safePage - 1) * pageSize, safePage * pageSize);

  return (
    <section className="bg-white rounded-lg p-4 sm:p-6 shadow-md border border-[#0054A6]">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <h2 className="text-lg sm:text-xl font-bold text-[#0a1f44] font-roboto">Questions List</h2>

        <div className="flex items-center border border-gray-300 rounded-md bg-white w-full sm:w-[260px]">
          <input
            type="text"
            placeholder="Search question..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="flex-1 px-3 text-sm outline-none h-9"
          />
          <button
            type="button"
            onClick={() => setCurrentPage(1)}
            className="bg-[#0054A6] text-white w-9 h-9 flex items-center justify-center rounded-r-md"
          >
            <Search className="w-4 h-4" />
          </button>
        </div>
      </div>

      <p className="text-xs sm:text-sm text-gray-600 mb-3">
        Total questions: <span className="font-semibold">{totalQuestions}</span> | Showing{" "}
        <span className="font-semibold">{totalFiltered}</span> result(s)
      </p>

      <div className="space-y-3">
        {pagedQuestions.length === 0 ? (
          <p className="text-sm text-gray-500 italic">No questions found.</p>
        ) : (
          pagedQuestions.map((q) => (
            <div
              key={q.id}
              className="border border-gray-300 rounded-lg px-3 py-3 sm:px-4 sm:py-3 bg-white flex items-start justify-between gap-3 hover:shadow-sm transition-shadow"
            >
              <div className="flex-1 min-w-0">
                <h3 className="text-sm sm:text-base font-semibold text-[#0a1f44] truncate">
                  {q.title}
                </h3>
                <div className="mt-1 text-xs sm:text-sm text-gray-600 flex flex-wrap gap-x-3 gap-y-1">
                  <span>By: {q.user}</span>
                  <span>•</span>
                  <span>Date: {q.date}</span>
                  <span>•</span>
                  <span>Answers: {q.answers}</span>
                </div>
              </div>

              <Link
                to={`/support/detail?id=${q.id}`}
                className="text-sm sm:text-base text-[#0054A6] font-roboto hover:underline flex-shrink-0"
              >
                View
              </Link>
            </div>
          ))
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-4 text-sm">
          <button
            onClick={() => setCurrentPage((p) => (p > 1 ? p - 1 : p))}
            disabled={safePage === 1}
            className={`px-2 py-1 rounded ${
              safePage === 1 ? "text-gray-400 cursor-not-allowed" : "hover:bg-gray-200"
            }`}
          >
            «
          </button>
          <span>
            Page <span className="font-semibold">{safePage}</span> /{" "}
            <span className="font-semibold">{totalPages}</span>
          </span>
          <button
            onClick={() => setCurrentPage((p) => (p < totalPages ? p + 1 : p))}
            disabled={safePage === totalPages}
            className={`px-2 py-1 rounded ${
              safePage === totalPages ? "text-gray-400 cursor-not-allowed" : "hover:bg-gray-200"
            }`}
          >
            »
          </button>
        </div>
      )}
    </section>
  );
}
