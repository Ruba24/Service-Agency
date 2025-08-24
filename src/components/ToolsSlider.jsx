'use client'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { Autoplay } from 'swiper'

const CourseToolsSlider = ({ tools }) => {
  if (!tools || tools.length === 0) return null

  return (
    <Swiper
      modules={[Autoplay]}
      spaceBetween={20}
      slidesPerView={4}
      loop={true} // infinite loop
      autoplay={{ delay: 2500, disableOnInteraction: false }}
      breakpoints={{
        640: { slidesPerView: 2 },
        768: { slidesPerView: 3 },
        1024: { slidesPerView: 4 },
      }}
    >
      {tools.map((tool, idx) => (
        <SwiperSlide key={idx}>
          <div className="flex flex-col items-center">
            <img
              src={tool.logoUrl}
              alt={tool.title}
              className="w-20 h-20 object-contain mb-2"
            />
            <p className="text-center font-medium">{tool.title}</p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default CourseToolsSlider
