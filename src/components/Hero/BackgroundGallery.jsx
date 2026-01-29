// "use client";

// import { useEffect, useState, useRef } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, EffectFade } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/effect-fade";
// import Image from "next/image";
// import FloatingIcons from "../FloatingIcons";
// import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

// const BackgroundGallery = ({ backgroundImages }) => {
//   const swiperRef = useRef(null);
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   if (!mounted) return null;

//   return (
//     <>
//       {/* Responsive wrapper */}
//       <div className="relative w-full mx-0 overflow-hidden">
//         {/* Floating icons */}
//         <div className="pointer-events-none">
//           <FloatingIcons />
//         </div>

//         <Swiper
//           modules={[Autoplay, EffectFade]}
//           onSwiper={(swiper) => (swiperRef.current = swiper)}
//           autoplay={{ delay: 4000, disableOnInteraction: false }}
//           effect="fade"
//           speed={1000}
//           loop
//           className="w-full h-full"
//         >
//           {backgroundImages.length > 0 ? (
//             backgroundImages.map((url, index) => (
//               <SwiperSlide key={index} className="relative w-full h-[250px] max-[375px]:h-[300px] min-[445px]:h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] xl:h-[800px] 2xl:h-[900px]">
//                 {/* Image fills entire slide */}
//                 <Image
//                   src={url}
//                   alt=""
//                   fill
//                   className="object-contain bg-[#1F102E]"
//                 />
//                 {/* Optional overlay */}
//                 <div className="absolute inset-0 bg-[#1F102E]/20"></div>
//               </SwiperSlide>
//             ))
//           ) : (
//             <div className="w-full h-[400px] bg-[#1F102E]" />
//           )}
//         </Swiper>
//       </div>

//       {/* Navigation buttons */}
//       <div className="absolute inset-0 flex items-center justify-between px-5 z-40 pointer-events-none">
//         <button
//           onClick={() => swiperRef.current?.slidePrev()}
//           className="bg-black/40 hover:bg-[#B877F7] p-3 rounded-full transition pointer-events-auto"
//           aria-label="Previous slide"
//         >
//           <FiChevronLeft className="text-white text-2xl" />
//         </button>
//         <button
//           onClick={() => swiperRef.current?.slideNext()}
//           className="bg-black/40 hover:bg-[#B877F7] p-3 rounded-full transition pointer-events-auto"
//           aria-label="Next slide"
//         >
//           <FiChevronRight className="text-white text-2xl" />
//         </button>
//       </div>
//     </>
//   );
// };

// export default BackgroundGallery;




"use client";

import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import Image from "next/image";
import FloatingIcons from "../FloatingIcons";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const BackgroundGallery = ({ backgroundImages = [] }) => {
  const swiperRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative w-full overflow-hidden">
      {/* Floating Icons */}
      <div className="pointer-events-none absolute inset-0 z-10 hidden sm:block">
        <FloatingIcons />
      </div>

      <Swiper
        modules={[Autoplay, EffectFade]}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        autoplay={{ delay: 4500, disableOnInteraction: false }}
        effect="fade"
        speed={1200}
        loop
        className="w-full"
      >
        {backgroundImages.length > 0 ? (
          backgroundImages.map((url, index) => (
            <SwiperSlide key={index}>
              {/* MOBILE: image defines height */}
              <div className="relative w-full sm:hidden">
                <Image
                  src={url}
                  alt=""
                  width={1200}
                  height={800}
                  priority={index === 0}
                  className="w-full h-auto object-contain"
                />
              </div>

              {/* DESKTOP: hero style */}
              <div className="relative hidden sm:block w-full h-[85vh]">
                <Image
                  src={url}
                  alt=""
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/30" />
              </div>
            </SwiperSlide>
          ))
        ) : (
          <div className="w-full h-[60vh] bg-black" />
        )}
      </Swiper>

      {/* Navigation Buttons (desktop only) */}
     <div className="absolute inset-0 z-20 flex items-center justify-between px-2 sm:px-4 pointer-events-none">

        <button
          onClick={() => swiperRef.current?.slidePrev()}
          className="pointer-events-auto bg-black/40 hover:bg-[#B877F7] p-3 rounded-full transition"
          aria-label="Previous slide"
        >
          <FiChevronLeft className="text-white text-2xl" />
        </button>

        <button
          onClick={() => swiperRef.current?.slideNext()}
          className="pointer-events-auto bg-black/40 hover:bg-[#B877F7] p-3 rounded-full transition"
          aria-label="Next slide"
        >
          <FiChevronRight className="text-white text-2xl" />
        </button>
      </div>
    </div>
  );
};

export default BackgroundGallery;
