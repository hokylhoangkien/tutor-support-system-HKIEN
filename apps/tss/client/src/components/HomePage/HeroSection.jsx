import { useState, useEffect } from "react";

// IMPORT IMAGE
import slide1 from "../../assets/images/slide1.png";
import slide2 from "../../assets/images/slide2.png";
import slide3 from "../../assets/images/slide3.png";
import slide4 from "../../assets/images/slide4.png";

// LIST SLIDES
const slides = [
  {
    image: slide1,
    title: "Tutor Support System",
    subtitle: "Where students and tutors connect to grow together",
  },
  {
    image: slide2,
    title: "Collaborate. Learn. Succeed.",
    subtitle: "Build knowledge through teamwork and academic support",
  },
  {
    image: slide4,
    title: "Personalized Tutoring for Every Student",
    subtitle: "Get one-on-one support tailored to your learning goals",
  },
  {
    image: slide3,
    title: "Your Path to Academic Excellence",
    subtitle: "Stay focused, learn efficiently, and achieve your potential",
  },
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);

  // AUTO SLIDE
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full overflow-hidden relative h-[400px] md:h-[500px] lg:h-[550px] mt-24">
      {/* SLIDE ITEMS */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-[1200ms] ease-in-out
            ${index === current ? "opacity-100 translate-x-0" : "opacity-0 translate-x-5"}
          `}
        >
          <img src={slide.image} alt="hero" className="w-full h-full object-cover" />

          {/* OVERLAY */}
          <div className="absolute inset-0 bg-black/40"></div>

          {/* TEXT */}
          {index === current && (
            <div className="absolute top-1/4 left-10 md:left-16 text-white">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold italic drop-shadow-lg">
                {slide.title}
              </h1>
              <p className="mt-4 text-xl md:text-2xl italic opacity-90">{slide.subtitle}</p>
            </div>
          )}
        </div>
      ))}

      {/* DOTS */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-500
              ${index === current ? "bg-white scale-125" : "bg-white/50"}
            `}
          ></div>
        ))}
      </div>
    </div>
  );
}
