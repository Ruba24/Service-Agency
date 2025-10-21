'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import Image from 'next/image'

export default function CourseSlider({ gallery = [], title }) {
  if (!gallery.length) {
    return (
      <div className="relative h-[200px] flex items-center justify-center bg-[#1F102E]">
        <p className="text-white">No images available</p>
      </div>
    )
  }

  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      navigation
      pagination={{ clickable: true }}
      loop
      autoplay={{ delay: 4000, disableOnInteraction: false }}
      className="w-full h-[340px]"
    >
      {gallery.map((url, index) => (
        <SwiperSlide key={index}>
          <div className="relative w-full h-[340px]">
            <Image
              src={url}
              alt={`${title} image ${index + 1}`}
              fill
              className="object-cover"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <h1 className="text-3xl md:text-4xl font-bold text-white text-center drop-shadow-lg">
                {title}
              </h1>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
