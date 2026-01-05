import React, { useRef } from "react";
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
  const swiperRef = useRef(null);

  const handleButtonClick = () => {
    navigate("/pets");
  };

  return (
    <div className="w-full max-w-7xl mx-auto mt-6">
      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop={true}
        keyboard={{ enabled: true }}
        modules={[Navigation, Pagination, Autoplay]}
        className="rounded-xl overflow-hidden shadow-2xl h-[65vh] max-h-[70vh] min-h-[60vh]"
        onMouseEnter={() => swiperRef.current?.autoplay?.stop?.()}
        onMouseLeave={() => swiperRef.current?.autoplay?.start?.()}
      >
        {/* Slide 1 */}
        <SwiperSlide>
          <div className="relative w-full h-full">
            <img src={p4} alt="Pet" className="w-full h-full object-cover" />

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6 space-y-4">
              <div className="slide-content">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white drop-shadow-md">
                  Find Your Furry Friend Today!
                </h2>

                <button
                  onClick={handleButtonClick}
                  className="mt-2 inline-flex items-center gap-2 self-start bg-gradient-to-r from-[#f97316] to-[#f59e0b] text-white font-semibold py-2 px-5 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
                >
                  Available Pets & Supplies
                </button>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 2 */}
        <SwiperSlide>
          <div className="relative w-full h-full">
            <img src={p3} alt="Pet Adoption" className="w-full h-full object-cover" />

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6 space-y-4">
              <div className="slide-content">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white drop-shadow-md">
                  Adopt, Don’t Shop — Give a Pet a Home
                </h2>

                <button
                  onClick={handleButtonClick}
                  className="mt-2 inline-flex items-center gap-2 self-start bg-gradient-to-r from-[#f97316] to-[#f59e0b] text-white font-semibold py-2 px-5 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
                >
                  Available Pets & Supplies
                </button>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 3 */}
        <SwiperSlide>
          <div className="relative w-full h-full">
            <img src={p2} alt="Pet Care" className="w-full h-full object-cover" />

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6 space-y-4">
              <div className="slide-content">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white drop-shadow-md">
                  Because Every Pet Deserves Love & Care
                </h2>

                <button
                  onClick={handleButtonClick}
                  className="mt-2 inline-flex items-center gap-2 self-start bg-gradient-to-r from-[#f97316] to-[#f59e0b] text-white font-semibold py-2 px-5 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
                >
                  Available Pets & Supplies
                </button>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>

      {/* Down-arrow / visual hint to next section */}
      <div className="relative max-w-7xl mx-auto -mt-12 pointer-events-none">
        <div className="flex justify-center">
          <div className="down-hint -translate-y-2">
            <svg className="w-8 h-8 text-white animate-bounce drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slider;
