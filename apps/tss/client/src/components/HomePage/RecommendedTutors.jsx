export default function RecommendedTutors() {
  const tutors = [
    {
      name: "Lionel Messi",
      subject: "Computer Science",
      rating: "4.8(2.5K)",
      img: "https://picsum.photos/300/420?random=11",
    },
    {
      name: "Cristiano Ronaldo",
      subject: "Software Engineering",
      rating: "4.7(2.1K)",
      img: "https://picsum.photos/300/420?random=12",
    },
    {
      name: "Taylor Swift",
      subject: "Data Science",
      rating: "4.4(1.9K)",
      img: "https://picsum.photos/300/420?random=13",
    },
    {
      name: "Nguyen Thanh Tung",
      subject: "Artificial Intelligence",
      rating: "4.9(3.1K)",
      img: "https://picsum.photos/300/420?random=14",
    },
  ];

  return (
    <section className="w-full py-10 bg-[#e8e8e8]">
      <div className="max-w-[1600px] mx-auto px-6">
        <h2 className="text-2xl font-semibold text-white bg-[#1488d8] px-4 py-2 rounded">
          <i>Recommended Tutors</i>
        </h2>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mt-8">
          {tutors.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all"
            >
              <div className="w-full h-[380px] overflow-hidden">
                <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
              </div>

              <div className="p-4 text-center">
                <h3 className="text-[#142b63] font-semibold text-lg">{item.name}</h3>

                <p className="text-gray-700 text-sm mt-1">
                  ⭐ <span className="font-semibold">{item.rating}</span>
                </p>

                <p className="text-gray-600 text-sm mt-1">{item.subject}</p>
              </div>
            </div>
          ))}
        </div>

        {/* VIEW MORE */}
        <div className="w-full flex justify-end mt-6">
          <button className="bg-[#ffffff] rounded-lg text-[#0024b3] px-8 py-2 font-semibold hover:bg-[#1488d8] hover:text-white transition-all">
            View more {">>"}
          </button>
        </div>
      </div>
    </section>
  );
}
