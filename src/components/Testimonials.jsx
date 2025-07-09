'use client'

import { FaStar } from 'react-icons/fa'
import { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const testimonials = [
  {
    name: 'Ayesha Rehman',
    role: 'Founder, BeautyBay',
    quote:
      'ZELLVERSE helped scale our eCommerce sales 3x in 2 months! The team is amazing and very professional.',
    rating: 5,
    image: '/images/testimonials/ayesha.jpg',
  },
  {
    name: 'Talha Khan',
    role: 'CEO, UrbanCrafts',
    quote:
      'Their design & development team transformed our digital presence. Highly recommended!',
    rating: 4,
    image: '/images/testimonials/talha.jpg',
  },
  {
    name: 'Mariam Qureshi',
    role: 'Owner, Mariam Apparel',
    quote:
      'From branding to marketing, they took care of everything and delivered fantastic results.',
    rating: 5,
    image: '/images/testimonials/mariam.jpg',
  },
]

const TestimonialsSection = () => {
  return (
    <section className="w-full bg-[#1F102E] py-20 px-4 sm:px-10 text-white" id="testimonials">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-extrabold">
          What Our <span className="text-[#B877F7]">Clients Say</span>
        </h2>
        <p className="text-[#E2E8F0] mt-3 max-w-xl mx-auto">
          We’ve worked with amazing brands. Here’s what they say about their journey with ZELLVERSE.
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          className="pb-10"
        >
          {testimonials.map((t, idx) => (
            <SwiperSlide key={idx}>
              <div className="bg-[#2A1D3E] rounded-3xl shadow-md border border-[#B877F7] p-8 flex flex-col items-center text-center">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-16 h-16 rounded-full object-cover mb-4 border-2 border-[#B877F7]"
                />
                <p className="text-white font-medium mb-4">“{t.quote}”</p>
                <div className="flex items-center justify-center mb-2">
                  {[...Array(t.rating)].map((_, i) => (
                    <FaStar key={i} className="text-[#B877F7]" />
                  ))}
                </div>
                <h4 className="font-bold text-white">{t.name}</h4>
                <span className="text-sm text-[#D1D5DB]">{t.role}</span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}

export default TestimonialsSection
