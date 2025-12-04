import { useState } from "react";
import {
  Search,
  Bold,
  Italic,
  Underline,
  Type,
  AlignLeft,
  AlignCenter,
  List,
  MoreHorizontal,
  Link as LinkIcon,
  Image as ImageIcon,
  Smile,
} from "lucide-react";

const HEADER_TITLE_COLOR = "text-[#0a1f44]";
const SUBMIT_BUTTON_COLOR = "bg-[#1a237e]";

// Toolbar gọn nhẹ
const EditorToolbar = () => {
  const tools = [
    { icon: Bold, label: "Bold" },
    { icon: Italic, label: "Italic" },
    { icon: Underline, label: "Underline" },
    { icon: Type, label: "Font" },
    { icon: AlignLeft, label: "Align Left" },
    { icon: AlignCenter, label: "Align Center" },
    { icon: List, label: "List" },
    { icon: MoreHorizontal, label: "More" },
    { icon: LinkIcon, label: "Link" },
    { icon: ImageIcon, label: "Image" },
    { icon: Smile, label: "Emoji" },
  ];

  return (
    <div className="bg-white border-b border-gray-300 h-11 sm:h-12 px-3 flex items-center gap-2 overflow-x-auto no-scrollbar rounded-t-lg">
      {tools.map((Tool, index) => (
        <button
          key={index}
          type="button"
          title={Tool.label}
          className="w-8 h-8 flex-shrink-0 flex items-center justify-center hover:bg-gray-100 rounded text-gray-600 text-xs"
        >
          <Tool.icon className="w-4 h-4" />
        </button>
      ))}
    </div>
  );
};

// Label + input: chữ nhỏ hơn
const FormRow = ({ label, children, alignTop = false }) => (
  <div
    className={`grid grid-cols-1 md:grid-cols-[120px_1fr] gap-3 md:gap-5 ${
      alignTop ? "items-start" : "items-center"
    }`}
  >
    <label className={`text-sm sm:text-base font-semibold text-gray-800 ${alignTop ? "pt-1" : ""}`}>
      {label}
    </label>
    <div className="relative w-full">{children}</div>
  </div>
);

// const tutors = ["Nguyễn Văn A", "Nguyễn Vũ Quốc An", "Nguyễn Huy Lượng", "Nguyễn Trung An"];

export default function SupportForm({ onSubmitQuestion }) {
  const [isOpen, setIsOpen] = useState(false);

  // const [searchQuery, setSearchQuery] = useState("");
  // const [showDropdown, setShowDropdown] = useState(false);
  const [selectedTutor, setSelectedTutor] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // const filteredTutors = tutors.filter((tutor) =>
  //   tutor.toLowerCase().includes(searchQuery.toLowerCase())
  // );

  // const handleTutorSelect = (tutor) => {
  //   setSelectedTutor(tutor);
  //   setSearchQuery("");
  //   setShowDropdown(false);
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    const now = new Date();
    const formattedDate = now.toLocaleDateString("vi-VN"); // 04/12/2025

    const newQuestion = {
      id: Date.now(),
      title: title.trim(),
      user: "Nguyễn Vũ Quốc An", // tạm hard-code
      date: formattedDate,
      answers: 0,
      sendTo: selectedTutor || null,
      fullContent: content.trim(),
    };

    if (onSubmitQuestion) {
      onSubmitQuestion(newQuestion);
    }

    setTitle("");
    setContent("");
    setSelectedTutor("");
    // setSearchQuery("");
    setIsOpen(false);
  };

  return (
    <section className="bg-white rounded-lg p-4 sm:p-6 shadow-md border border-[#0054A6]">
      {/* Header + nút mở form */}
      <div className="flex items-center justify-between gap-3 mb-3">
        <h2 className={`text-lg sm:text-xl font-bold ${HEADER_TITLE_COLOR} font-roboto`}>
          Support
        </h2>
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="px-3 py-2 rounded-md border border-[#1a237e] text-sm sm:text-base font-medium text-[#1a237e] hover:bg-[#1a237e] hover:text-white transition-colors"
        >
          {isOpen ? "Hide form" : "Ask a question"}
        </button>
      </div>

      {/* Form chỉ hiện khi isOpen = true */}
      {isOpen && (
        <form onSubmit={handleSubmit} className="space-y-5 mt-3">
          {/* Send to */}
          {/* <FormRow label="Send to" alignTop={!!selectedTutor}>
            <div className="flex flex-col gap-3">
              <div className="relative max-w-[420px]">
                <input
                  type="text"
                  placeholder="Find Tutor"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowDropdown(true);
                  }}
                  onFocus={() => setShowDropdown(true)}
                  className="w-full h-10 sm:h-11 pl-3 pr-10 border border-gray-400 rounded-md text-sm sm:text-base font-roboto placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-900/20"
                />
                <button
                  type="button"
                  className="absolute right-0 top-0 h-full w-10 bg-[#1a237e] flex items-center justify-center rounded-r-md hover:opacity-90"
                >
                  <Search className="w-4 h-4 text-white" />
                </button>

                {showDropdown && searchQuery && (
                  <div className="absolute z-20 w-full mt-1 bg-white border border-gray-200 shadow-lg max-h-52 overflow-y-auto rounded-md">
                    {filteredTutors.length > 0 ? (
                      filteredTutors.map((tutor, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => handleTutorSelect(tutor)}
                          className="w-full text-left px-3 py-2 text-sm sm:text-base font-roboto hover:bg-gray-50 border-b border-gray-100 last:border-0"
                        >
                          {tutor}
                        </button>
                      ))
                    ) : (
                      <div className="px-3 py-2 text-sm text-gray-500">No tutors found</div>
                    )}
                  </div>
                )}
              </div>

              {selectedTutor && (
                <div className="inline-flex items-center px-3 py-2 rounded-md border border-gray-400 bg-blue-50/60 text-sm sm:text-base">
                  <span className="font-medium">{selectedTutor}</span>
                  <button
                    type="button"
                    onClick={() => setSelectedTutor("")}
                    className="ml-2 text-gray-400 hover:text-red-500"
                  >
                    ×
                  </button>
                </div>
              )}
            </div>
          </FormRow> */}

          {/* Title */}
          <FormRow label="Title">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter title"
              className="w-full max-w-[600px] h-10 sm:h-11 px-3 border border-gray-400 rounded-md text-sm sm:text-base font-roboto focus:outline-none focus:ring-2 focus:ring-blue-900/20"
            />
          </FormRow>

          {/* Content */}
          <FormRow label="Content" alignTop>
            <div className="border border-gray-400 rounded-md shadow-sm w-full">
              <EditorToolbar />
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full h-48 sm:h-56 p-3 text-sm sm:text-base font-roboto resize-none focus:outline-none rounded-b-md"
                placeholder="Type your question / problem here..."
              />
            </div>
          </FormRow>

          {/* Submit */}
          <div className="flex justify-end">
            <button
              type="submit"
              className={`px-4 py-2 sm:px-6 sm:py-2.5 ${SUBMIT_BUTTON_COLOR} text-white rounded-md text-sm sm:text-base font-semibold font-roboto hover:opacity-90 active:scale-95 shadow-md`}
            >
              Submit
            </button>
          </div>
        </form>
      )}
    </section>
  );
}
