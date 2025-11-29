import { UserSearch, BookOpen, MessageCircle, MessageSquareMore, LifeBuoy } from "lucide-react";

export default function QuickActions() {
  const actions = [
    { icon: <UserSearch size={40} />, title: "Match Tutor", desc: "Find your ideal tutor" },
    { icon: <BookOpen size={40} />, title: "Book Session", desc: "Schedule new session" },
    { icon: <MessageCircle size={40} />, title: "Messages", desc: "Chat with your tutor" },
    { icon: <MessageSquareMore size={40} />, title: "Feedback", desc: "Share your experience" },
    { icon: <LifeBuoy size={40} />, title: "Support", desc: "Get quick assistance" },
  ];

  return (
    <section className="w-full py-8">
      <div className="max-w-[1600px] mx-auto px-6">
        <h2 className="text-2xl font-semibold text-white bg-[#1488d8] px-4 py-2 rounded">
          <i>Quick Actions</i>
        </h2>

        <div className="grid md:grid-cols-5 gap-10 mt-8">
          {actions.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center bg-white shadow-lg rounded-2xl p-6 h-44 hover:shadow-xl transition-all"
            >
              <div className="text-[#142b63] mb-3">{item.icon}</div>

              <h3 className="text-[#142b63] font-semibold text-lg">{item.title}</h3>

              <p className="text-gray-600 text-sm mt-2 text-center leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
