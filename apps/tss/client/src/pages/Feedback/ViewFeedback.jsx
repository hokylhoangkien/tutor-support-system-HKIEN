import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import ListItem from "../../components/ListItem.jsx";
import { feedbackList } from "./mockFeedbackData.js";
import Header from "../../components/Header.jsx";
import Footer from "../../components/Footer.jsx";

const FeedbackItem = ({ item }) => {
  return (
    <div className="border-[1.5px] border-black rounded-lg shadow-lg p-6 sm:p-8 bg-white relative">
      <div className="flex items-start gap-4 sm:gap-6">
        <img
          src={item.avatar}
          alt={item.name}
          className="w-12 h-12 sm:w-16 sm:h-16 lg:w-[72px] lg:h-[72px] rounded-full object-cover flex-shrink-0"
        />
        <div className="flex-1">
          <h3 className="text-lg sm:text-xl lg:text-2xl text-primary font-roboto mb-1 sm:mb-2">
            {item.name}
          </h3>
          <p className="text-base sm:text-lg lg:text-xl font-roboto text-black mb-3 sm:mb-4">
            {item.date}
          </p>
          <div className="border-t border-black pt-4 sm:pt-6">
            {item.type === "feedback" ? (
              <p className="text-lg sm:text-xl lg:text-2xl font-roboto text-black">
                {item.content}
              </p>
            ) : (
              <p className="text-lg sm:text-xl lg:text-2xl font-bold font-roboto text-black">
                {item.title}
              </p>
            )}
          </div>
        </div>

        {/* Updated Link format below */}
        <Link
          to={`/feedbacks/detail?id=${item.id}`}
          className="text-lg sm:text-xl lg:text-2xl text-primary font-roboto hover:underline flex-shrink-0"
        >
          {"View"}
        </Link>
      </div>
    </div>
  );
};

export default function ViewFeedback() {
  return (
    <div className="min-h-screen bg-tutor-gray">
      <Header />
      <div className="max-w-[1440px] mx-auto mt-10 px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="flex items-center justify-between mb-8 sm:mb-12">
          <h1 className="text-4xl sm:text-5xl lg:text-[40px] font-bold text-tutor-blue-dark font-roboto">
            Feedback
          </h1>
          <Link
            to="/send"
            className="flex items-center gap-2 px-6 py-3 bg-primary text-black rounded-lg hover:opacity-90 transition-opacity font-roboto text-lg"
          >
            <Plus className="w-5 h-5" />
            Send Feedback
          </Link>
        </div>

        {/* 2. Use ListItem with requested configuration */}
        <ListItem
          itemList={feedbackList}
          title=""
          itemTab={FeedbackItem}
          columns={1} // Forces 1 column layout
          itemsPerPage={6}
          haveSearch={false}
        />
      </div>
      <Footer />
    </div>
  );
}
