'use client'

import { FaStar, FaUserCircle } from 'react-icons/fa'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const Testimonials = ({ testimonials }) => {

  return (
    <section
      className="w-full bg-[#1F102E] py-20 px-4 sm:px-10 text-white z-10 relative"
      id="testimonials"
    >
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-extrabold">
          What Our <span className="text-[#B877F7]">Clients Say</span>
        </h2>
        <p className="text-[#E2E8F0] mt-3 max-w-xl mx-auto">
          We’ve worked with amazing brands. Here’s what they say about their journey with ZELLVERSE.
        </p>
      </div>

      <div className="max-w-6xl mx-auto">
        {testimonials.length === 0 ? (
          <p className="text-center text-[#E2E8F0] text-lg mt-10">
            No testimonials yet. Please check back soon.
          </p>
        ) : (
          <>
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={30}
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              loop={testimonials.length > 1}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              pagination={{
                clickable: true,
                el: '.custom-pagination',
              }}
            >
              {testimonials.map((t, idx) => (
                <SwiperSlide
                  key={idx}
                  className={testimonials.length === 1 ? 'flex justify-center' : ''}
                >
                  <div className="group relative z-10 bg-[#2B1A40] rounded-xl border border-[#B877F7]/30 shadow-md p-8 transition-all duration-300 hover:ring-1 hover:ring-[#B877F7]/50 max-w-sm mx-auto">
                    <div className="flex justify-center mb-4 text-[#B877F7]">
                      {t.photo ? (
                        <img
                          src={t.photo}
                          alt={t.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      ) : (
                        <FaUserCircle size={48} />
                      )}
                    </div>
                    <p className="text-white font-medium mb-4 text-center">“{t.quote}”</p>
                    <div className="flex items-center justify-center mb-2">
                      {[...Array(t.rating)].map((_, i) => (
                        <FaStar key={i} className="text-yellow-400" />
                      ))}
                    </div>
                    <h4 className="font-bold text-center">{t.name}</h4>
                    <span className="text-sm text-[#D1D5DB] block text-center">{t.role}</span>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Custom pagination dots below the cards */}
            <div className="custom-pagination mt-8 flex justify-center space-x-2" />
          </>
        )}
      </div>
    </section>
  )
}

export default Testimonials
