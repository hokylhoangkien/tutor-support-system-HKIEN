import { ChevronDown, ChevronLeft, ChevronRight, Search, Settings2 } from "lucide-react";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentRole } from "../utils/auth";

export default function Pagin({ sessions }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const navigate = useNavigate();
  const role = getCurrentRole(); // "student" | "tutor"

  const totalPages = Math.ceil(sessions.length / itemsPerPage);

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;

  const currentSessions = sessions.slice(indexOfFirst, indexOfLast);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  function checkPermissions() {
    const canCreateReport = Math.random() < 0.2;
    return canCreateReport;
  }

  const getPageNumbers = () => {
    const pageNumbers = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pageNumbers.push(i);
    } else {
      if (currentPage <= 3) {
        pageNumbers.push(1, 2, 3, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
      } else {
        pageNumbers.push(1, "...", currentPage, "...", totalPages);
      }
    }
    return pageNumbers;
  };

  return (
    <section className="bg-white rounded-lg shadow-sm p-6 pb-12">
      {/* HEADER */}
      <div className="flex justify-between items-end mb-6">
        <div className="text-2xl font-bold text-blue-900">My Sessions</div>

        <button className={` bg-blue-900 text-xl font-semibold text-white px-4 py-1.5 rounded-full ${role === "tutor" ? "" : "hidden"}`}
                onClick={() => navigate("/create-session")}>
          Create Session
        </button>

      </div>

      {/* FILTER */}
      <div className="flex flex-wrap gap-4 mb-8">
        <button className="flex items-center gap-2 px-4 py-2 border rounded-xl text-gray-500 hover:bg-gray-50 text-sm">
          All <ChevronDown className="w-4 h-4 text-gray-500" />
        </button>

        <div className="flex-1 relative min-w-[200px] max-w-[400px]">
          <Settings2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-10 pr-10 py-2 border rounded-xl text-sm outline-none focus:border-blue-900"
          />
          <button className="absolute right-0 top-0 h-full bg-[#1a237e] text-white px-4 rounded-r-xl">
            <Search className="w-4 h-4 text-white" />
          </button>
        </div>

        <button className="flex items-center gap-2 px-4 py-2 border rounded-xl text-gray-500 hover:bg-gray-50 text-sm">
          Sort by: Most Recommended <ChevronDown className="w-4 h-4 text-gray-500" />
        </button>
      </div>

      {/* GRID – SESSION CARDS */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-8">
        {currentSessions.map((item, idx) => {
          const canCreateReport = checkPermissions();

          return (
            <div
              key={idx}
              className="bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-xl transition-all"
            >
              <img src={item.img} alt={item.title} className="w-full h-40 object-cover" />

              <div className="p-5">
                <h3 className="text-[#142b63] font-semibold text-lg">{item.title}</h3>

                <p className="text-gray-700 text-sm mt-1 flex items-center gap-2">
                  <span>{item.tutorName || item.tutor}</span> ⭐ <span>{item.rating}</span>
                </p>

                <p className="text-gray-600 text-sm mt-2">{item.locationType || item.mode}</p>

                <div className="flex items-center mt-5 mb-5 gap-3">
                  {/* View Detail */}
                  <button
                    onClick={() => navigate("/Course/"+item.id)}
                    className="text-[#142b63] text-sm font-semibold border border-[#142b63] px-4 py-1.5 rounded-full hover:bg-[#142b63] hover:text-white transition-all"
                  >
                    View Detail
                  </button>

                  {role !== "tutor" && (
                    <button
                      onClick={() => navigate("/send")}
                      className="bg-[#1a237e] text-white text-sm font-semibold px-4 py-1.5 rounded-full hover:bg-[#0f1f4c] transition-all"
                    >
                      Send Feedback
                    </button>
                  )}
                  {/* TUTOR ONLY */}
                  {role === "tutor" && (
                    <button
                      onClick={() => navigate("/feedbacks")}
                      className="bg-[#1a237e] text-white text-sm font-semibold px-4 py-1.5 rounded-full hover:bg-[#0f1f4c] transition-all"
                    >
                      View Feedbacks
                    </button>
                  )}
                </div>
                {role === "tutor" && canCreateReport && (
                  <button
                    onClick={() => navigate("/progress")}
                    className="bg-[#1a237e] max-w-[500px] w-full text-white text-sm font-semibold px-4 py-1.5 rounded-full hover:bg-[#0f1f4c] transition-all"
                  >
                    Create Report
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-4">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 border rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {getPageNumbers().map((num, index) =>
            num === "..." ? (
              <span
                key={index}
                className="w-10 h-10 flex items-center justify-center text-gray-500"
              >
                ...
              </span>
            ) : (
              <button
                key={index}
                onClick={() => paginate(num)}
                className={`w-10 h-10 rounded border transition-colors font-medium ${
                  currentPage === num
                    ? "bg-[#1a237e] text-white border-[#1a237e]"
                    : "bg-white text-gray-700 hover:bg-gray-50 border-gray-200"
                }`}
              >
                {num}
              </button>
            )
          )}

          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 border rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </section>
  );
}

Pagin.propTypes = {
  sessions: PropTypes.array.isRequired,
};
