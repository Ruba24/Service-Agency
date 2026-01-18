"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useRef } from "react";
import "swiper/css";
import "swiper/css/effect-fade";
import RequestAService from "@/components/RequestAService";

const ServiceHero = ({ service }) => {
  const swiperRef = useRef();
  const hasGallery = service.gallery && service.gallery.length > 0;

  return (
    <div className="relative bg-[#1F102E] text-white overflow-hidden h-[400px] md:h-[500px]">
      {/* Swiper Background Slider */}
      <Swiper
        modules={[Autoplay, EffectFade]}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        effect="fade"
        speed={1000}
        loop
        className="w-full h-full"
      >
        {hasGallery ? (
          service.gallery.map((url, index) => (
            <SwiperSlide key={index}>
              <div
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${url})` }}
              >
                <div className="absolute inset-0 bg-[#1F102E]/60"></div>
              </div>
            </SwiperSlide>
          ))
        ) : (
          <SwiperSlide>
            <div className="w-full h-full bg-[#1F102E]" />
          </SwiperSlide>
        )}
      </Swiper>

      {/* Slider Arrows */}
      <div className="absolute inset-0 flex items-center justify-between px-5 z-40 pointer-events-none">
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          className="bg-black/40 hover:bg-[#B877F7] p-3 rounded-full transition pointer-events-auto"
          aria-label="Previous slide"
        >
          <FiChevronLeft className="text-white text-2xl" />
        </button>
        <button
          onClick={() => swiperRef.current?.slideNext()}
          className="bg-black/40 hover:bg-[#B877F7] p-3 rounded-full transition pointer-events-auto"
          aria-label="Next slide"
        >
          <FiChevronRight className="text-white text-2xl" />
        </button>
      </div>

      {/* Service Title & Button Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-20">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg mb-6">
          {service.title}
        </h1>

        {/* Request Service Button */}
        <RequestAService selectedService={service.title} />
      </div>
    </div>
  );
};

export default ServiceHero;
