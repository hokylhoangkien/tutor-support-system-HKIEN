export default function Info() {
  return (
    <section className="w-full bg-white py-16">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl text-[#003366] mb-2">What is Tutor Support System?</h2>
        <p className="text-gray-700 mb-12">
          Empowering learning, connecting knowledge, and inspiring growth.
        </p>

        <div className="grid md:grid-cols-3 gap-10 ">
          {/* Personalized Learning Journey */}
          <div>
            <h3 className="text-xl font-semibold text-[#4db6e2] mb-3">
              Personalized Learning Journey
            </h3>
            <p className="text-[#4db6e2] mb-4">
              We believe every student learns differently — that’s why our tutors adapt their
              approach to fit your needs, helping you unlock your potential step by step.
            </p>
            <p className="italic text-[#4db6e2]">
              Learn your way, at your pace, with the right guidance.
            </p>
          </div>

          {/* Academic Connection */}
          <div>
            <h3 className="text-xl font-semibold text-[#4db6e2] mb-3">
              Built on Real Academic Connection
            </h3>
            <p className="text-[#4db6e2] mb-4">
              Our system connects learners with dedicated tutors from HCMUT’s top faculties.
              Together, we foster an environment where curiosity thrives, collaboration grows, and
              academic goals become reality.
            </p>
            <p className="italic text-[#4db6e2]">Knowledge shared is knowledge multiplied.</p>
          </div>

          {/* Supporting Growth Beyond */}
          <div>
            <h3 className="text-xl font-semibold text-[#4db6e2] mb-3">Supporting Growth Beyond</h3>
            <p className="text-[#4db6e2] mb-4">
              From mastering core subjects to developing soft skills, our mission is to guide you
              towards confidence and independence.
            </p>
            <p className="italic text-[#4db6e2]">
              Because real success begins with continuous growth.
            </p>
          </div>
        </div>

        <div className="mt-14">
          <p className="text-[#142b63] font-medium mb-4">Need guidance? We’re here to help.</p>
          <button className="px-6 py-3 rounded-full border border-[#283645] text-[#283645] hover:bg-[#0881A3] hover:text-white transition font-medium">
            Go to Help Center
          </button>
        </div>
      </div>
    </section>
  );
}
