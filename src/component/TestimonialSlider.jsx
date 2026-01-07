import React, { useState } from "react";

const testimonials = [
  {
    stars: 5,
    text: "I adopted two adorable kittens through PawMart. The platform is user-friendly, and I felt secure throughout the entire process.",
    name: "Michael Chen",
    role: "Cat Lover 🐱",
    img: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    stars: 5,
    text: "Best pet marketplace ever! I found quality pet supplies at great prices and even adopted a rabbit.",
    name: "Emily Rodriguez",
    role: "Pet Enthusiast 🐇",
    img: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    stars: 5,
    text: "PawMart made finding my parrot so easy. The detailed listings gave me confidence.",
    name: "David Thompson",
    role: "Bird Owner 🦜",
    img: "https://randomuser.me/api/portraits/men/65.jpg",
  },
  {
    stars: 5,
    text: "Amazing experience! PawMart connected me with a loving dog for adoption.",
    name: "Sophia Lee",
    role: "Dog Lover 🐶",
    img: "https://randomuser.me/api/portraits/women/55.jpg",
  },
];

const visibleCards = 3;

const TestimonialSlider = () => {
  const [index, setIndex] = useState(0);

  const nextSlide = () => {
    if (index < testimonials.length - visibleCards) {
      setIndex(index + 1);
    }
  };

  const prevSlide = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  return (
    <section className=" bg-gray-50 mt-10 dark:bg-gray-900 transition-colors">
      <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-white">
        What Our Community Says
      </h1>
      <p className="text-center text-gray-600 dark:text-gray-400 mt-3 mb-14">
        Real stories from real pet parents
      </p>

      <div className="relative max-w-[1400px] mx-auto overflow-hidden px-4">
        {/* Left */}
        <button
          onClick={prevSlide}
          className="absolute left-2 top-1/2 -translate-y-1/2 text-3xl text-sky-400 z-10"
        >
          ❮
        </button>

        {/* Right */}
        <button
          onClick={nextSlide}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-3xl text-sky-400 z-10"
        >
          ❯
        </button>

        {/* Slider */}
        <div
          className="flex transition-transform duration-500"
          style={{
            transform: `translateX(-${index * (100 / visibleCards)}%)`,
          }}
        >
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="min-w-[33.333%] p-4 box-border"
            >
              <div className="h-full rounded-2xl border bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 p-8 shadow-lg dark:shadow-black/40">
                <div className="text-yellow-400 mb-3">
                  {"★".repeat(t.stars)}
                </div>

                <p className="italic text-gray-700 dark:text-gray-200 leading-relaxed">
                  “{t.text}”
                </p>

                <div className="flex items-center mt-6">
                  <img
                    src={t.img}
                    alt={t.name}
                    className="w-14 h-14 rounded-full border-2 border-sky-400 mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {t.name}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {t.role}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSlider;
