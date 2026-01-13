"use client";

import { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import Image from "next/image";
import FloatingIcons from "../FloatingIcons";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const BackgroundGallery = ({ backgroundImages }) => {
  const swiperRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* 🔹 Slider wrapper */}
      <div className="relative w-full max-w-[1200px] mx-auto overflow-hidden">
        {/* Floating icons */}
        <div className="pointer-events-none">
          <FloatingIcons />
        </div>

        {/* Swiper Slider */}
        <Swiper
          modules={[Autoplay, EffectFade]}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          effect="fade"
          speed={1000}
          loop
          className="w-full"
        >
          {backgroundImages.length > 0 ? (
            backgroundImages.map((url, index) => (
              <SwiperSlide
                key={index}
                className="relative w-full
                           h-[200px]       /* mobile */
                           sm:h-[300px]    /* small tablets */
                           md:h-[450px]    /* tablets */
                           lg:h-[600px]    /* desktop */
                           xl:h-[700px]    /* large screens */
                           flex justify-center items-center"
              >
                {/* Image fully visible on mobile, hero effect on desktop */}
                <Image
                  src={url}
                  alt=""
                  fill
                  className="w-full h-full object-contain sm:object-cover"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-[#1F102E]/20"></div>
              </SwiperSlide>
            ))
          ) : (
            <div className="w-full h-[400px] bg-[#1F102E]" />
          )}
        </Swiper>
      </div>

      {/* Navigation buttons */}
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
    </>
  );
};

export default BackgroundGallery;
