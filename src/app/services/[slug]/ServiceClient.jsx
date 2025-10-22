'use client'

import { useParams } from 'next/navigation'
import { client } from '@/lib/sanity'
import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Footer from '@/components/Footer'
import AwardsSlider from '@/components/AwardsSlider'
import ServiceSlider from '@/components/ServiceLogoSlider'
import CaseStudies from '@/components/CaseStudies'
import BlogCards from '@/components/BlogCards'
import Testimonials from '@/components/Testimonials'
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectFade } from 'swiper/modules'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

import 'swiper/css'
import 'swiper/css/effect-fade'

const ServiceClient = () => {
  const { slug } = useParams()
  const [service, setService] = useState(null)
  const swiperRef = useRef(null)

  useEffect(() => {
    if (!slug) return

    const fetchData = async () => {
      try {
        const data = await client.fetch(
          `
          *[_type == "service" && slug.current == $slug][0]{
            title,
            desc,
            "imageUrl": image.asset->url,
            "gallery": gallery[].asset->url
          }
          `,
          { slug }
        )
        console.log('✅ Service fetched:', data)
        setService(data)
      } catch (error) {
        console.error('❌ Sanity fetch error:', error)
      }
    }

    fetchData()
  }, [slug])

  if (!service) {
    return (
      <div className="flex justify-center items-center h-[70vh] text-gray-600 text-lg">
        Loading...
      </div>
    )
  }

  const hasGallery = service.gallery && service.gallery.length > 0

  return (
    <>
      {/* ✅ HERO SECTION */}
      <div className="relative bg-[#1F102E] text-white overflow-hidden h-[400px] md:h-[500px]">
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
          {hasGallery ? (
            service.gallery.map((url, index) => (
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
            <SwiperSlide>
              <div className="w-full h-full bg-[#1F102E]" />
            </SwiperSlide>
          )}
        </Swiper>

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

        {/* Service Title Overlay */}
        <div className="absolute inset-0 flex items-center justify-center text-center px-4 z-20">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg">
            {service.title}
          </h1>
        </div>
      </div>

      {/* ✅ EXPERIENCE SECTION */}
      <div className="w-full px-4 sm:px-10 mt-20">
        <div className="bg-[#F4E9FF] p-8 sm:p-12 rounded-3xl shadow-md">
          <h2 className="text-2xl font-semibold mb-3 text-[#B877F7]">
            Our Experience
          </h2>
          <p className="text-gray-700 leading-relaxed">
            With over{' '}
            <strong className="text-[#B877F7]">
              20+ successful {service.title}
            </strong>{' '}
            projects completed, our team brings hands-on expertise,
            cutting-edge tools, and data-backed strategies to every client. <br />
            {service.desc}
          </p>
        </div>
      </div>

      {/* ✅ AWARDS */}
      <div className="w-full mt-20">
        <AwardsSlider />
      </div>

      {/* ✅ RELATED CASE STUDIES */}
      <div className="w-full px-4 sm:px-10 mt-20">
        <h2 className="text-2xl font-semibold mb-6 text-[#B877F7]">
          Related Case Studies
        </h2>
        <CaseStudies serviceSlug={slug} />
      </div>

      {/* ✅ RELATED BLOGS */}
      <div className="w-full px-4 sm:px-10 mt-20">
        <h2 className="text-2xl font-semibold mb-6 text-[#B877F7]">
          Related Blogs
        </h2>
        <BlogCards serviceSlug={slug} />
      </div>

      {/* ✅ LOGO SLIDER */}
      <div className="w-full mt-20">
        <ServiceSlider />
      </div>

      {/* ✅ TESTIMONIALS */}
      <div className="w-full px-4 sm:px-10 mt-20">
        <h2 className="text-2xl font-semibold mb-6 text-[#B877F7]">
          What Our Clients Say
        </h2>
        <Testimonials serviceSlug={slug} />
        <div className="mt-10 text-center">
          <Link
            href="/contact"
            className="inline-block bg-[#ffa329] text-white font-medium py-3 px-6 rounded-full shadow hover:bg-[#f58c00] transition"
          >
            Request Service
          </Link>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default ServiceClient
