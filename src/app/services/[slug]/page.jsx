'use client'

import { useParams } from 'next/navigation'
import { sanityClient } from '../../../../sanity/lib/client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Footer from '@/components/Footer'
import AwardsSlider from '@/components/AwardsSlider'
import ServiceSlider from '@/components/ServiceLogoSlider'
import CaseStudies from '@/components/CaseStudies'
import BlogCards from '@/components/BlogCards'
import Testimonials from '@/components/Testimonials'
import Link from 'next/link'

const ServiceDetailPage = () => {
  const { slug } = useParams()
  const serviceTitle = slug.replace(/-/g, ' ')
  const [service, setService] = useState(null)

  useEffect(() => {
    if (!slug) return
    const fetchData = async () => {
      const data = await sanityClient.fetch(`
        *[_type == "service" && slug.current == $slug][0]{
          title,
          desc,
          "imageUrl": image.asset->url
        }
      `, { slug })

      setService(data)
    }

    fetchData()
  }, [slug])

  if (!service) return <div className="p-20 text-center">Loading...</div>

  return (
    <>
      <section className="w-full bg-[#F8F3FC] text-[#1F102E] pb-20">
        <div className="w-full px-4 sm:px-10 py-20 flex flex-col lg:flex-row items-center gap-10">
          <div className="w-full lg:w-1/2">
            <h1 className="text-4xl md:text-5xl font-extrabold capitalize mb-4">
              {service.title}
            </h1>
            <p className="text-gray-700 text-lg mb-6">
              Discover how our <span className="text-[#B877F7] font-semibold">{service.title}</span> service can transform your business. Backed by real-world experience and proven results.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-[#B877F7] text-white font-medium py-3 px-6 rounded-full shadow hover:bg-[#a665e6] transition"
            >
              Request Service
            </Link>
          </div>
          <div className="w-full lg:w-1/2">
            <Image
              src={service.imageUrl ? service.imageUrl : '/placeholder.jpg'}
              alt={service.title}
              width={600}
              height={400}
              className="rounded-3xl shadow-xl w-full object-cover"
            />
          </div>
        </div>
        <div className="w-full">
          <AwardsSlider />
        </div>
        <div className="w-full px-4 sm:px-10 mt-20">
          <div className="bg-[#F4E9FF] p-8 sm:p-12 rounded-3xl shadow-md">
            <h2 className="text-2xl font-semibold mb-3 text-[#B877F7]">Our Experience</h2>
            <p className="text-gray-700 leading-relaxed">
              With over <strong className="text-[#B877F7]">20+ successful {service.title}</strong> projects completed, our team brings hands-on expertise, cutting-edge tools, and data-backed strategies to every client. From initial consultation to delivery, you’ll experience professionalism and results.
            </p>
          </div>
        </div>
        <div className="w-full px-4 sm:px-10 mt-20">
          <h2 className="text-2xl font-semibold mb-6 text-[#B877F7]">Related Case Studies</h2>
          <CaseStudies serviceSlug={slug} />
        </div>
        <div className="w-full px-4 sm:px-10 mt-20">
          <h2 className="text-2xl font-semibold mb-6 text-[#B877F7]">Related Blogs</h2>
          <BlogCards serviceSlug={slug} />
        </div>
        <div className="w-full mt-20">
          <ServiceSlider />
        </div>
        <div className="w-full px-4 sm:px-10 mt-20">
          <h2 className="text-2xl font-semibold mb-6 text-[#B877F7]">What Our Clients Say</h2>
          <Testimonials serviceSlug={slug} />
          <div className="mt-10 text-center">
            <Link
              href="/contact"
              className="inline-block bg-[#B877F7] text-white font-medium py-3 px-6 rounded-full shadow hover:bg-[#a665e6] transition"
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

export default ServiceDetailPage
