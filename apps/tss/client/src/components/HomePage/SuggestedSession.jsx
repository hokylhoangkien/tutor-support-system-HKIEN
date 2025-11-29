export default function SuggestedSessions() {
  const sessions = [
    {
      title: "Calculus I",
      tutor: "Cristiano Ronaldo",
      rating: "4.8(1.8K)",
      mode: "Online (Google Meet)",
      img: "https://picsum.photos/400/250?random=1",
    },
    {
      title: "Physics I",
      tutor: "Lionel Messi",
      rating: "4.9(2.5K)",
      mode: "Offline (H05-110)",
      img: "https://picsum.photos/400/250?random=2",
    },
    {
      title: "Data Structures & Algorithms",
      tutor: "Ernest Khalimov",
      rating: "4.7(2.1K)",
      mode: "Online (Zoom)",
      img: "https://picsum.photos/400/250?random=3",
    },
    {
      title: "Data Structures & Algorithms",
      tutor: "Taylor Swift",
      rating: "4.1(2.2K)",
      mode: "Offline (H03-132)",
      img: "https://picsum.photos/400/250?random=4",
    },
    {
      title: "Software Engineering",
      tutor: "Tom Holland",
      rating: "4.9(1.9K)",
      mode: "Online (Google Meet)",
      img: "https://picsum.photos/400/250?random=5",
    },
    {
      title: "Modelling and Simulation",
      tutor: "Cillian Murphy",
      rating: "3.9(1.7K)",
      mode: "Offline (H02-103)",
      img: "https://picsum.photos/400/250?random=6",
    },
    {
      title: "Computer Networks",
      tutor: "Nguyen Thanh Tung",
      rating: "4.5(1.3K)",
      mode: "Online (Zoom)",
      img: "https://picsum.photos/400/250?random=7",
    },
    {
      title: "Calculus II",
      tutor: "Cristiano Ronaldo",
      rating: "3.6(1.2K)",
      mode: "Offline (H10-020)",
      img: "https://picsum.photos/400/250?random=8",
    },
  ];

  return (
    <section className="w-full bg-[#e8e8e8] py-10">
      <div className="max-w-[1600px] mx-auto px-6">
        <h2 className="text-2xl font-semibold text-white bg-[#1488d8] px-4 py-2 rounded">
          <i>Suggested Sessions</i>
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mt-8">
          {sessions.map((item, idx) => (
            <div
              key={idx}
              className="bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-xl transition-all"
            >
              <img src={item.img} alt={item.title} className="w-full h-40 object-cover" />

              <div className="p-5">
                <h3 className="text-[#142b63] font-semibold text-lg">{item.title}</h3>

                <p className="text-gray-700 text-sm mt-1 flex items-center gap-2">
                  <span>{item.tutor}</span> ⭐ <span>{item.rating}</span>
                </p>

                <p className="text-gray-600 text-sm mt-2">{item.mode}</p>

                <div className="flex justify-between items-center mt-5">
                  <button className="text-[#142b63] text-sm font-semibold border border-[#142b63] px-4 py-1.5 rounded-full hover:bg-[#142b63] hover:text-white transition-all">
                    View Detail
                  </button>

                  <button className="bg-[#142b63] text-white text-sm font-semibold px-4 py-1.5 rounded-full hover:bg-[#0f1f4c] transition-all">
                    Register
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="w-full flex justify-end mt-6">
          <button className="bg-[#ffffff] rounded-lg text-[#0024b3] px-8 py-2 font-semibold hover:bg-[#1488d8] hover:text-white transition-all">
            View more {">>"}
          </button>
        </div>
      </div>
    </section>
  );
}
