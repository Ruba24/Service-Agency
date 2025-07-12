'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'

const awards = [
  {
    image: '/images/awards/award1.png',
    title: 'Top Amazon Agency 2024',
    description: 'Recognized for excellence in Amazon Private Label and Wholesale growth strategies.',
  },
  {
    image: '/images/awards/award2.png',
    title: 'eCommerce Innovation Award',
    description: 'Awarded for cutting-edge solutions in Shopify & AI-based business automation.',
  },
  {
    image: '/images/awards/award3.png',
    title: 'Digital Marketing Elite',
    description: 'Honored for outstanding performance in SEO, Ads, and SMM campaigns.',
  },
  {
    image: '/images/awards/award4.png',
    title: 'Best Training Program',
    description: 'Acknowledged for top-rated Amazon & Shopify training programs.',
  },
]

const AwardsSlider = () => {
  return (
    <section className="bg-white py-20 px-4 sm:px-10">
      <div className="max-w-6xl mx-auto text-center mb-10">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
          <span className="text-[#B877F7]">Our Achievements</span> & Awards
        </h2>
        <p className="text-gray-600 mt-2">
          Recognized for driving real results across eCommerce platforms
        </p>
      </div>

      <Swiper
        modules={[Autoplay]}
        slidesPerView={1}
        spaceBetween={20}
        loop={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        breakpoints={{
          640: { slidesPerView: 1.2 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {awards.map((award, idx) => (
          <SwiperSlide key={idx}>
            <div className="bg-[#f9f4fd] border border-[#d9c7f3] rounded-2xl p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-[#B877F7]">
              <img
                src={award.image}
                alt={award.title}
                className="h-24 w-auto mx-auto object-contain mb-4"
              />
              <h3 className="text-lg font-semibold text-gray-800">{award.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{award.description}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}

export default AwardsSlider
