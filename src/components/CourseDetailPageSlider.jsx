"use client";



import 'swiper/css'
import 'swiper/css/effect-fade'
import { Autoplay, EffectFade } from "swiper/modules"
import FloatingIcons from "./FloatingIcons"
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { useRef } from 'react';
import { courseData } from '@/data/courseIcons';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';


const CourseDetailPageSlider = ({ gallery, slug }) => {

  const swiperRef = useRef(null)
  const courseIcons =
    courseData.find((c) => c.id === slug)?.icons || ['📘', '📖']

  return (
      <>
        {/* Floating background icons */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none">
            <FloatingIcons icons={courseIcons} />
          </div>

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
            {gallery && gallery.length > 0 ? (
              gallery.map((url, index) => (
                <SwiperSlide key={index}>
                  <div
                    className="w-full h-full bg-cover bg-center relative"
                  >
                    <Image
                      src={url}
                      fill
                      alt=''
                      className='object-cover'
                    />
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
        </div>

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

    </>
  )
}

export default CourseDetailPageSlider