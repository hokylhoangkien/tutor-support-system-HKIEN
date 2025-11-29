import help1 from "../../assets/images/help1.png";
import help2 from "../../assets/images/help2.png";
import help3 from "../../assets/images/help3.png";
import help4 from "../../assets/images/help4.png";

export default function HelpCategories() {
  const categories = [
    { title: "General Education", img: help1 },
    { title: "Social / Political Studies", img: help2 },
    { title: "Major Foundation / Core Courses", img: help3 },
    { title: "Specialized / Elective Courses", img: help4 },
  ];

  return (
    <section className="w-[1540px] mx-auto py-7 bg-[#ffffff] mb-[70px] rounded-lg">
      <div className="max-w-[1540px] mx-auto px-6">
        {/* Heading */}
        <h2 className="text-2xl font-semibold text-[#1488d8] px-4 py-2 rounded text-center">
          <i>Where do you need the most help right now?</i>
        </h2>
        <p className="text-gray-600 mt-2 text-sm sm:text-base text-center">
          <i>
            Select the fields you’re interested in — we’ll connect you with top tutors from HCMUT
          </i>
        </p>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mt-8">
          {categories.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all cursor-pointer"
            >
              {/* Image */}
              <div className="w-full h-[380px] overflow-hidden">
                <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
              </div>

              {/* Title */}
              <div className="p-4 text-center">
                <h3 className="text-[#142b63] font-semibold text-lg">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
