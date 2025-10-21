'use client'

import { useParams } from 'next/navigation'
import { client } from '@/lib/sanity'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Footer from '@/components/Footer'
import AwardsSlider from '@/components/AwardsSlider'
import ServiceSlider from '@/components/ServiceLogoSlider'
import CaseStudies from '@/components/CaseStudies'
import BlogCards from '@/components/BlogCards'
import Testimonials from '@/components/Testimonials'
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/pagination'

const ServiceClient = () => {
  const { slug } = useParams()
  const [service, setService] = useState(null)

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
      {/* ✅ HERO SLIDER SECTION */}
      <section className="relative w-full bg-[#F8F3FC] text-[#1F102E] pb-20">
        <div className="relative h-[600px] w-full overflow-hidden">
          {hasGallery || service.imageUrl ? (
            <Swiper
              modules={[Autoplay, Pagination]}
              pagination={{ clickable: true }}
              autoplay={{
                delay: 3500,
                disableOnInteraction: false,
              }}
              loop
              spaceBetween={0}
              slidesPerView={1}
              className="h-full w-full"
            >
              {(hasGallery ? service.gallery : [service.imageUrl]).map(
                (img, index) => (
                  <SwiperSlide key={index}>
                    <div className="relative h-[600px] w-full">
                      <Image
                        src={img || '/placeholder.jpg'}
                        alt={`Slide ${index + 1}`}
                        fill
                        className="object-cover brightness-75"
                        priority={index === 0}
                      />
                    </div>
                  </SwiperSlide>
                )
              )}
            </Swiper>
          ) : (
            <div className="relative h-[600px] w-full bg-gray-200 flex items-center justify-center text-gray-500">
              No Image Found
            </div>
          )}

          {/* ✅ Hero Overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white bg-black/40 px-4">
            <h1 className="text-4xl md:text-5xl font-extrabold capitalize mb-4">
              {service.title}
            </h1>
            <p className="text-lg max-w-2xl mx-auto">
              Discover how our{' '}
              <span className="text-[#B877F7] font-semibold">
                {service.title}
              </span>{' '}
              service can transform your business — backed by proven experience
              and real results.
            </p>
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
      </section>

      <Footer />
    </>
  )
}

export default ServiceClient
