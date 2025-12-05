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
import { feedbackList } from "./mockFeedbackData.js"; // MOCK DATA

const CURRENT_USER = "Nguyễn Trung An"; // Người đang login (Student)

const HEADER_TITLE_COLOR = "text-[#0a1f44]";
const SUBMIT_BUTTON_COLOR = "bg-[#4CAF50]";

/* -------------------------- Toolbar Editor -------------------------- */
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

/* ------------------------------ Form Row ------------------------------ */
const FormRow = ({ label, children, alignTop = false }) => (
  <div
    className={`grid grid-cols-1 md:grid-cols-[140px_1fr] lg:grid-cols-[180px_1fr] gap-4 md:gap-8 ${
      alignTop ? "items-start" : "items-center"
    }`}
  >
    <label
      className={`text-xl sm:text-2xl lg:text-3xl font-bold font-roboto text-gray-800 ${
        alignTop ? "pt-3" : ""
      }`}
    >
      {label}
    </label>
    <div className="relative w-full">{children}</div>
  </div>
);

/* -------------------------- MAIN COMPONENT --------------------------- */
export default function SendFeedback() {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedTutor, setSelectedTutor] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const tutors = ["Mai Đức Trung", "Bùi Xuân Giang", " Trần Thị Quế Nguyệt", " Nguyễn Minh Tâm"];

  const filteredTutors = tutors.filter((tutor) =>
    tutor.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleTutorSelect = (tutor) => {
    setSelectedTutor(tutor);
    setSearchQuery("");
    setShowDropdown(false);
  };

  const handleSubmit = () => {
    if (!selectedTutor || !title || !content) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    const newFeedback = {
      id: Date.now(),
      sender: CURRENT_USER, // Người gửi
      receiver: selectedTutor, // Người nhận
      date: new Date().toLocaleDateString("vi-VN"),
      title,
      content,
      avatar:
        "https://api.builder.io/api/v1/image/assets/TEMP/94056da088f34e4161fb673971f19468cfcc93bc",
      replied: false,
      replyContent: "",
      replyDate: null,
    };

    feedbackList.unshift(newFeedback);

    navigate("/view-feedback");
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen ">
      <Header />

      <div className="max-w-[1440px] mx-auto px-4 mt-10 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="flex items-center gap-4 mb-8 sm:mb-12">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 hover:bg-gray-200 rounded-full transition-colors"
          >
            <ArrowLeft className={`w-6 h-6 sm:w-8 sm:h-8 ${HEADER_TITLE_COLOR}`} />
          </button>

          <h1
            className={`text-4xl sm:text-5xl lg:text-[40px] font-bold ${HEADER_TITLE_COLOR} font-roboto`}
          >
            Back
          </h1>
        </div>

        <div className="bg-white rounded-lg p-6 sm:p-8 lg:p-12 max-w-[1256px] mx-auto shadow-sm">
          <div className="space-y-8 max-w-[1100px]">
            <FormRow label="Send to" alignTop={!!selectedTutor}>
              <div className="flex flex-col gap-4">
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
                    className="w-full h-[50px] sm:h-[62px] pl-5 pr-14 border border-black rounded-lg text-lg sm:text-xl font-roboto"
                  />
                  <button className="absolute right-0 top-0 h-full w-[60px] bg-[#1a237e] flex items-center justify-center rounded-r-lg">
                    <Search className="w-6 h-6 text-white" />
                  </button>

                  {showDropdown && searchQuery && (
                    <div className="absolute z-20 w-full mt-1 bg-white border shadow-xl max-h-60 overflow-y-auto rounded-lg">
                      {filteredTutors.map((tutor, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => handleTutorSelect(tutor)}
                          className="w-full text-left px-5 py-3 text-lg hover:bg-gray-50"
                        >
                          {tutor}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {selectedTutor && (
                  <div className="w-fit min-w-[250px] h-[60px] border rounded-lg flex items-center px-6 bg-blue-50/50">
                    <span className="text-xl font-medium">{selectedTutor}</span>
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

            <FormRow label="Title">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full h-[70px] px-5 border rounded-lg text-xl"
              />
            </FormRow>

            <FormRow label="Content" alignTop>
              <div className="border rounded-lg w-full">
                <EditorToolbar />
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full h-[350px] p-6 text-xl resize-none"
                />
              </div>
            </FormRow>

            <div className="flex justify-end">
              <button
                onClick={handleSubmit}
                className={`w-[200px] h-[56px] ${SUBMIT_BUTTON_COLOR} text-white rounded-lg text-2xl font-bold`}
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
