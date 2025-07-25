'use client'

import { useParams } from 'next/navigation'
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

  return (
    <>
      <section className="w-full bg-[#F8F3FC] text-[#1F102E] pb-20">
        <div className="w-full px-4 sm:px-10 py-20 flex flex-col lg:flex-row items-center gap-10">
          <div className="w-full lg:w-1/2">
            <h1 className="text-4xl md:text-5xl font-extrabold capitalize mb-4">
              {serviceTitle}
            </h1>
            <p className="text-gray-700 text-lg mb-6">
              Discover how our <span className="text-[#B877F7] font-semibold">{serviceTitle}</span> service can transform your business. Backed by real-world experience and proven results.
            </p>
            <Link
              href="/booking?type=service"
              className="inline-block bg-[#B877F7] text-white font-medium py-3 px-6 rounded-full shadow hover:bg-[#a665e6] transition"
            >
              Request Service
            </Link>
          </div>
          <div className="w-full lg:w-1/2">
            <Image
              src="/images/service-detail.jpg"
              alt={serviceTitle}
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
              With over <strong className="text-[#B877F7]">20+ successful {serviceTitle}</strong> projects completed, our team brings hands-on expertise, cutting-edge tools, and data-backed strategies to every client. From initial consultation to delivery, you’ll experience professionalism and results.
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
              href="/booking?type=service"
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
