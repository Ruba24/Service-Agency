'use client'

import AwardsSlider from '@/components/AwardsSlider'
import Footer from '@/components/Footer'
import ServiceSlider from '@/components/ServiceLogoSlider'
import { useParams } from 'next/navigation'

const ServiceDetailPage = () => {
  const { slug } = useParams()

  return (
    <>
    <section className="max-w-4xl mx-auto py-20 px-4 sm:px-10">
      <h1 className="text-3xl font-bold text-[#1F102E] mb-4 capitalize">
        {slug.replace(/-/g, ' ')}
      </h1>
      <p className="text-gray-600 mb-8">
        <AwardsSlider />
        Detailed description for <strong>{slug}</strong> will go here.
      </p>
      <ServiceSlider />

      {/* You can later add: Tool slider, badges, experience, related case studies/blogs */}
    </section>
    <Footer />
  </>
  )
}

export default ServiceDetailPage
