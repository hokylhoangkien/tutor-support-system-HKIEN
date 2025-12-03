import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  ArrowLeft,
} from "lucide-react";
import Header from "../../components/Header.jsx";
import Footer from "../../components/Footer.jsx";

const HEADER_TITLE_COLOR = "text-[#0a1f44]";
const SUBMIT_BUTTON_COLOR = "bg-[#4CAF50]";

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
    <div className="bg-white border-b border-gray-300 shadow-sm h-[60px] sm:h-[76px] px-4 flex items-center gap-2 overflow-x-auto no-scrollbar rounded-t-lg">
      {tools.map((Tool, index) => (
        <button
          key={index}
          type="button"
          title={Tool.label}
          className="w-10 h-10 flex-shrink-0 flex items-center justify-center hover:bg-gray-100 rounded transition-colors text-gray-600"
        >
          <Tool.icon className="w-5 h-5" />
        </button>
      ))}
    </div>
  );
};

// Helper: Consistent Form Row Layout
const FormRow = ({ label, children, alignTop = false }) => (
  <div
    className={`grid grid-cols-1 md:grid-cols-[140px_1fr] lg:grid-cols-[180px_1fr] gap-4 md:gap-8 ${alignTop ? "items-start" : "items-center"}`}
  >
    <label
      className={`text-xl sm:text-2xl lg:text-3xl font-bold font-roboto text-gray-800 ${alignTop ? "pt-3" : ""}`}
    >
      {label}
    </label>
    <div className="relative w-full">{children}</div>
  </div>
);

export default function SendFeedback() {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedTutor, setSelectedTutor] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const tutors = ["Nguyễn Văn A", "Nguyễn Vũ Quốc An", "Nguyễn Huy Lượng", "Nguyễn Trung An"];

  const filteredTutors = tutors.filter((tutor) =>
    tutor.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleTutorSelect = (tutor) => {
    setSelectedTutor(tutor);
    setSearchQuery("");
    setShowDropdown(false);
  };

  const handleSubmit = () => {
    console.log({ selectedTutor, title, content });
    navigate("/feedbacks");
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-[1440px] mx-auto px-4 mt-10 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {/* Header - Aligned with ViewFeedback base */}
        <div className="flex items-center gap-4 mb-8 sm:mb-12">
          <button
            onClick={() => navigate("/feedbacks")}
            className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 hover:bg-gray-200 rounded-full transition-colors"
          >
            <ArrowLeft className={`w-6 h-6 sm:w-8 sm:h-8 ${HEADER_TITLE_COLOR}`} />
          </button>
          <h1
            className={`text-4xl sm:text-5xl lg:text-[40px] font-bold ${HEADER_TITLE_COLOR} font-roboto`}
          >
            Back to Feedback
          </h1>
        </div>

        {/* Main Content Card - Aligned width to 1256px */}
        <div className="bg-white rounded-lg p-6 sm:p-8 lg:p-12 max-w-[1256px] mx-auto shadow-sm">
          <div className="space-y-8 max-w-[1100px]">
            {/* 1. Send To Field */}
            <FormRow label="Send to" alignTop={!!selectedTutor}>
              <div className="flex flex-col gap-4">
                {/* Search Box */}
                <div className="relative max-w-[487px]">
                  <input
                    type="text"
                    placeholder="Find Tutor"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setShowDropdown(true);
                    }}
                    onFocus={() => setShowDropdown(true)}
                    className="w-full h-[50px] sm:h-[62px] pl-5 pr-14 border border-black rounded-lg text-lg sm:text-xl font-roboto placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-900/20"
                  />
                  <button className="absolute right-0 top-0 h-full w-[60px] bg-[#1a237e] flex items-center justify-center rounded-r-lg hover:opacity-90 transition-opacity">
                    <Search className="w-6 h-6 text-white" />
                  </button>

                  {/* Dropdown Results */}
                  {showDropdown && searchQuery && (
                    <div className="absolute z-20 w-full mt-1 bg-white border border-gray-200 shadow-xl max-h-60 overflow-y-auto rounded-lg">
                      {filteredTutors.length > 0 ? (
                        filteredTutors.map((tutor, index) => (
                          <button
                            key={index}
                            type="button"
                            onClick={() => handleTutorSelect(tutor)}
                            className="w-full text-left px-5 py-3 text-lg font-roboto hover:bg-gray-50 border-b border-gray-100 last:border-0 transition-colors"
                          >
                            {tutor}
                          </button>
                        ))
                      ) : (
                        <div className="px-5 py-3 text-gray-500">No tutors found</div>
                      )}
                    </div>
                  )}
                </div>

                {/* Selected Tutor Badge */}
                {selectedTutor && (
                  <div className="w-fit min-w-[250px] h-[60px] border border-black rounded-lg flex items-center px-6 bg-blue-50/50">
                    <span className="text-xl font-medium font-roboto text-gray-900">
                      {selectedTutor}
                    </span>
                    <button
                      onClick={() => setSelectedTutor("")}
                      className="ml-4 text-gray-400 hover:text-red-500"
                    >
                      ×
                    </button>
                  </div>
                )}
              </div>
            </FormRow>

            {/* 2. Title Field */}
            <FormRow label="Title">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter title"
                className="w-full max-w-[712px] h-[50px] sm:h-[70px] px-5 border border-black rounded-lg text-lg sm:text-xl font-roboto focus:outline-none focus:ring-2 focus:ring-blue-900/20"
              />
            </FormRow>

            {/* 3. Content Field */}
            <FormRow label="Content" alignTop>
              <div className="border border-black rounded-lg shadow-sm w-full">
                <EditorToolbar />
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full h-[300px] sm:h-[400px] p-6 text-lg sm:text-xl font-roboto resize-none focus:outline-none rounded-b-lg"
                  placeholder="Type your feedback here..."
                />
              </div>
            </FormRow>

            {/* Submit Button */}
            <div className="flex justify-end pt-4 md:ml-[180px] md:pl-8">
              <button
                onClick={handleSubmit}
                className={`w-full sm:w-[200px] h-[56px] ${SUBMIT_BUTTON_COLOR} text-white rounded-lg text-2xl font-bold font-roboto hover:opacity-90 transition-all active:scale-95 shadow-md flex items-center justify-center gap-2`}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
