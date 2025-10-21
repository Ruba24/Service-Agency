'use client'

import { useEffect, useState, useRef } from 'react'
import { client } from '@/lib/sanity'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectFade } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-fade'
import Link from 'next/link'
import FloatingIcons from './FloatingIcons'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { Navigation, Pagination } from 'swiper/modules'


const query = `*[_type == "homepage"][0]{
  heroGallery[] {
    asset->{
      url
    }
  }
}`

const Hero = () => {
  const [images, setImages] = useState([])
  const swiperRef = useRef(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    client.fetch(query).then((data) => {
      if (data?.heroGallery) {
        setImages(data.heroGallery.map((img) => img.asset.url))
      }
    })
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <section className="relative bg-[#1F102E] text-white overflow-hidden py-28">
      {/* Background slider */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="pointer-events-none">
          <FloatingIcons />
        </div>

        <Swiper
          modules={[Autoplay, EffectFade]}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          effect="fade"
          speed={1000}
          loop
          className="w-full h-full"
        >
          {images.length > 0 ? (
            images.map((url, index) => (
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
            <div className="w-full h-full bg-[#1F102E]" />
          )}
        </Swiper>
      </div>

      {/* ✅ Arrows now sit ABOVE everything */}
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

      {/* Hero text & buttons */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 flex flex-col-reverse lg:flex-row items-center gap-12 pl-6 lg:pl-24">
        <div className="flex-1 text-center lg:text-left">
          <h1 className="text-5xl font-extrabold leading-tight text-white">
            Scale Your <span className="text-[#B877F7]">Ecommerce Brand</span> <br />
            with Precision & Power
          </h1>
          <p className="mt-4 text-[#E2E8F0] text-lg">
            Zelverse empowers ambitious businesses with design, marketing, and tech that converts.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link
              href="/contact"
              className="bg-[#B877F7] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#A062D5] transition"
            >
              Book a Free Call
            </Link>
            <Link
              href="/services"
              className="border border-[#B877F7] text-[#B877F7] px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-[#1F102E] transition"
            >
              Explore Services
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
