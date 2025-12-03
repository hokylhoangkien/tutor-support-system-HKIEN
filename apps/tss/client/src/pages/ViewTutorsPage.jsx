import React, { useState, useEffect } from "react";
// import {Search, ChevronDown} from "lucide-react";
import ListItem from "../components/ListItem.jsx";
import { StarIcon } from "lucide-react";
import Footer from "../components/Footer";
import Header from "../components/Header";

export default function ViewTutorsPage() {
  const getRandomAvatar = (seed) => `https://i.pravatar.cc/150?u=${seed}`;
  const firstNames = [
    "Lionel",
    "Cristiano",
    "Taylor",
    "Son",
    "Elon",
    "Bill",
    "Mark",
    "Lisa",
    "Hideo",
    "Sana",
    "Jennie",
    "Robert",
  ];
  const lastNames = [
    "Messi",
    "Ronaldo",
    "Swift",
    "Heung-min",
    "Musk",
    "Gates",
    "Zuckerberg",
    "Manoban",
    "Kojima",
    "Minatozaki",
    "Kim",
    "Downey Jr.",
  ];
  const subjects = [
    "Computer Science",
    "Software Engineering",
    "Data Science",
    "Artificial Intelligence",
    "Machine Learning",
    "Cyber Security",
    "Web Development",
    "Cloud Computing",
  ];

  const generateRandomTutors = (count) => {
    return Array.from({ length: count }, (_, i) => {
      const randomFirst = firstNames[Math.floor(Math.random() * firstNames.length)];
      const randomLast = lastNames[Math.floor(Math.random() * lastNames.length)];
      const randomSubject = subjects[Math.floor(Math.random() * subjects.length)];

      const randomRating = (Math.random() * (5.0 - 4.0) + 4.0).toFixed(1);
      const randomReviews = (Math.random() * (5.0 - 0.5) + 0.5).toFixed(1) + "k";

      const uniqueSeed = `${randomFirst}${i}${Math.random()}`;

      return {
        id: i,
        name: `${randomFirst} ${randomLast}`,
        rating: randomRating,
        reviews: randomReviews,
        subject: randomSubject,
        seed: uniqueSeed,
      };
    });
  };

  const [tutors, setTutors] = useState([]);

  useEffect(() => {
    setTutors(generateRandomTutors(300));
  }, []);

  function tutorsTab({ item }) {
    const getRandomPicture = (seed) => `https://picsum.photos/seed/${seed}/300/400`;

    return (
      <div
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
      </div>
    );
  }

  const upcomingSessions = [
    {
      id: 1,
      name: "Hoang Tunilever",
      date: "Oct 23 2025",
      time: "9:40 AM",
      course: "Revise For Midterm",
      seed: "user1",
    },
    {
      id: 2,
      name: "Tran Tuan P",
      date: "Nov 02 2025",
      time: "12:00 PM",
      course: "Equilibrium And Le Châtelier's Principle",
      seed: "user2",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 font-roboto text-gray-800">
      <Header />
      <main className="max-w-7xl mt-20 mx-auto p-6 space-y-8">
        <section className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="bg-[#2196f3] px-6 py-3">
            <h2 className="text-white font-bold text-lg italic">Your Tutor</h2>
          </div>

          <div className="grid-cols-12 gap-4 px-6 py-3 text-xs font-bold text-gray-500 uppercase border-b hidden md:grid">
            <div className="col-span-3">Instructor Name</div>
            <div className="col-span-3 text-center">Upcoming Session</div>
            <div className="col-span-4">Course Title</div>
            <div className="col-span-2 text-right">Actions</div>
          </div>

          <div className="divide-y divide-gray-100">
            {upcomingSessions.map((session) => (
              <div
                key={session.id}
                className="grid grid-cols-1 md:grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-gray-50 transition"
              >
                <div className="col-span-3 flex items-center gap-3">
                  <img
                    src={getRandomAvatar(session.seed)}
                    alt="Avatar"
                    className="w-10 h-10 rounded-full object-cover border border-gray-200"
                  />
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-700 text-sm">{session.name}</span>
                    <span className="md:hidden text-xs text-gray-400">Instructor</span>
                  </div>
                </div>

                <div className="col-span-3 flex md:justify-center gap-2">
                  <span className="px-3 py-1 bg-gray-200 rounded-full text-xs font-semibold text-gray-600">
                    {session.date}
                  </span>
                  <span className="px-3 py-1 bg-gray-200 rounded-full text-xs font-semibold text-gray-600">
                    {session.time}
                  </span>
                </div>

                <div className="col-span-4 text-sm text-gray-600 truncate">{session.course}</div>

                <div className="col-span-2 md:text-right flex md:block">
                  <button className="bg-blue-100 text-blue-600 text-xs font-bold px-4 py-2 rounded hover:bg-blue-200 transition uppercase w-full md:w-auto">
                    Show Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
        <ListItem itemList={tutors} itemTab={tutorsTab} title={"Tutors"} />
      </main>

      {/*Footer */}
      <Footer />
    </div>
  );
}
