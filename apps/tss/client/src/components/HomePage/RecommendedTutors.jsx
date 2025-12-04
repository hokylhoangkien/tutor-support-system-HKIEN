import { StarIcon } from "lucide-react";
import React from "react";
import {useNavigate} from "react-router-dom";
import getById from "../../pages/mockDataTutor.js";

export default function RecommendedTutors() {
  const navigate = useNavigate();
  function tutorsTab({ item }) {
    const getRandomPicture = (seed) => `https://picsum.photos/seed/${seed}/300/400`;

    return (
      <button
        onClick={() => navigate("/view-tutor-profile?id="+item.id) || window.scrollTo(0, 0)}
        key={item.id}
        className="group relative rounded-xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all duration-300 bg-gray-200"
      >
        <div className="aspect-[3/4] relative overflow-hidden">
          <img
            src={getRandomPicture(item.seed || item.id)}
            alt={item.name}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
        </div>

        <div className="absolute bottom-0 left-0 w-full p-4 text-center text-white">
          <h3 className="font-bold text-lg leading-tight mb-1">{item.name}</h3>
          <div className="flex justify-center items-center gap-2 mb-2 text-sm">
            <div className="flex items-center text-yellow-400">
              <StarIcon className="w-5 h-5" />
              <span className="font-bold ml-1">{item.rating}</span>
            </div>
            <span className="text-gray-400 text-xs">|</span>
            <span className="text-gray-300 text-xs">({item.reviews})</span>
          </div>
          <p className="text-xs text-gray-300 font-light bg-white/10 py-1 px-2 rounded-full inline-block backdrop-blur-sm border border-white/10">
            {item.subject}
          </p>
        </div>
      </button>
    );
  }

  const tutors = getById(-1).slice(20, 24);

  return (
    <section className="w-full py-10 bg-[#e8e8e8]">
      <div className="max-w-[1600px] mx-auto px-6">
        <h2 className="text-2xl font-semibold text-white bg-[#1488d8] px-4 py-2 rounded">
          <i>Recommended Tutors</i>
        </h2>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mt-8">
          {tutors.map((item, idx) => (
            <div key={idx}>{tutorsTab({ item })}</div>
          ))}
        </div>

        {/* VIEW MORE */}
        <div className="w-full flex justify-end mt-6">
          <button
            onClick={() => navigate("/view-tutors") || window.scrollTo(0, 0)}
            className="bg-[#ffffff] rounded-lg text-[#0024b3] px-8 py-2 font-semibold hover:bg-[#1488d8] hover:text-white transition-all">
            View more {">>"}
          </button>
        </div>
      </div>
    </section>
  );
}
