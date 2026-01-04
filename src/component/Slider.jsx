import React from "react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate } from "react-router-dom"; // React Router

import p2 from "../assets/p2_converted.png";
import p3 from "../assets/p3_converted.png";
import p4 from "../assets/output.png";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Slider = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/pets");
  };

  return (
    <div className="w-full max-w-7xl mx-auto mt-6">
      <Swiper
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        modules={[Navigation, Pagination, Autoplay]}
        className="rounded-xl overflow-hidden shadow-2xl"
      >
        {/* Slide 1 */}
        <SwiperSlide>
          <div className="relative w-full h-[250px] sm:h-[300px] md:h-[400px] lg:h-[500px]">
            <img src={p4} alt="Pet" className="w-full h-full object-cover" />

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6 space-y-4">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white drop-shadow-md">
                Find Your Furry Friend Today!
              </h2>

              <button
                onClick={handleButtonClick}
                className="self-start bg-gradient-to-r from-[#f97316] to-[#f59e0b] text-white font-semibold py-2 px-5 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
              >
                Available Pets & Supplies
              </button>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 2 */}
        <SwiperSlide>
          <div className="relative w-full h-[250px] sm:h-[300px] md:h-[400px] lg:h-[500px]">
            <img src={p3} alt="Pet Adoption" className="w-full h-full object-cover" />

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6 space-y-4">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white drop-shadow-md">
                Adopt, Don’t Shop — Give a Pet a Home
              </h2>

              <button
                onClick={handleButtonClick}
                className="self-start bg-gradient-to-r from-[#f97316] to-[#f59e0b] text-white font-semibold py-2 px-5 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
              >
                Available Pets & Supplies
              </button>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 3 */}
        <SwiperSlide>
          <div className="relative w-full h-[250px] sm:h-[300px] md:h-[400px] lg:h-[500px]">
            <img src={p2} alt="Pet Care" className="w-full h-full object-cover" />

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6 space-y-4">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white drop-shadow-md">
                Because Every Pet Deserves Love & Care
              </h2>

              <button
                onClick={handleButtonClick}
                className="self-start bg-gradient-to-r from-[#f97316] to-[#f59e0b] text-white font-semibold py-2 px-5 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
              >
                Available Pets & Supplies
              </button>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Slider;
