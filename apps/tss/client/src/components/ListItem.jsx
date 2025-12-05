import { ChevronLeft, ChevronRight } from "lucide-react";
import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";

export default function ListItem({
  itemList,
  itemTab,
  title = "Items",
  columns = 3,
  itemsPerPage = 12,
  haveSearch = true,
}) {
  const ItemTab = itemTab;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [itemList]);

  const getGridClasses = (colCount) => {
    const gridMap = {
      1: "grid-cols-1",
      2: "grid-cols-1 sm:grid-cols-2",
      3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
      4: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
      5: "grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5",
    };
    return gridMap[colCount] || gridMap[3];
  };

  const totalPages = Math.ceil(itemList.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const items = itemList.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
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
      <div className="flex justify-between items-end mb-6">
        <h2 className="text-2xl font-bold text-blue-900">{title}</h2>
      </div>
      {haveSearch && <SearchBar />}

      <div className={`grid gap-14 mb-8 ${getGridClasses(columns)}`}>
        {items.map((item, index) => (
          <ItemTab key={item.id || index} item={item} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-4">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 border rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {getPageNumbers().map((number, index) => (
            <React.Fragment key={index}>
              {number === "..." ? (
                <span className="w-10 h-10 flex items-center justify-center text-gray-500">
                  ...
                </span>
              ) : (
                <button
                  onClick={() => paginate(number)}
                  className={`w-10 h-10 rounded border transition-colors font-medium ${
                    currentPage === number
                      ? "bg-[#1a237e] text-white border-[#1a237e]"
                      : "bg-white text-gray-700 hover:bg-gray-50 border-gray-200"
                  }`}
                >
                  {number}
                </button>
              )}
            </React.Fragment>
          ))}

          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 border rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}

      {totalPages === 0 && <div className="flex justify-center items-center gap-2"></div>}
    </section>
  );
}

ListItem.propTypes = {
  itemList: PropTypes.array.isRequired,
  itemTab: PropTypes.func.isRequired,
  columns: PropTypes.number,
  itemsPerPage: PropTypes.number,
  title: PropTypes.string,
  haveSearch: PropTypes.bool,
};
