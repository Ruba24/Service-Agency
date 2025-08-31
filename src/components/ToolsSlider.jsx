'use client'

import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/autoplay'

const ToolsSlider = ({ tools }) => {
  if (!tools || tools.length === 0) return null

  return (
    <Swiper
      modules={[Autoplay]}
      spaceBetween={20}
      slidesPerView={4}
      autoplay={{ delay: 2000, disableOnInteraction: false }}
      loop
      className="my-8"
    >
      {tools.map((tool, index) => (
        <SwiperSlide key={index}>
          <div className="flex flex-col items-center justify-center bg-white p-4 rounded-xl shadow-md">
            {tool.logo && (
              <div className="relative w-16 h-16 mb-2">
                <Image
                  src={tool.logo}
                  alt={tool.title}
                  fill
                  className="object-contain"
                />
              </div>
            )}
            <p className="text-gray-800 font-medium text-center">{tool.title}</p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default ToolsSlider
