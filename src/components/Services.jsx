'use client'

import ServiceCard from './ServiceCard'
import { FaCode, FaPaintBrush, FaMobileAlt, FaChartLine, FaStore, FaRocket } from 'react-icons/fa'

const services = [
  {
    id: 1,
    title: 'Web Development',
    desc: 'Crafting responsive, fast and modern websites for your brand.',
    icon: <FaCode />,
  },
  {
    id: 2,
    title: 'UI/UX Design',
    desc: 'Stunning, user-centered designs that enhance digital experiences.',
    icon: <FaPaintBrush />,
  },
  {
    id: 3,
    title: 'Mobile App Development',
    desc: 'iOS and Android apps with smooth performance and great UX.',
    icon: <FaMobileAlt />,
  },
  {
    id: 4,
    title: 'Digital Marketing',
    desc: 'Boost your online presence through SEO, PPC & social campaigns.',
    icon: <FaChartLine />,
  },
  {
    id: 5,
    title: 'Ecommerce Solutions',
    desc: 'Complete eCommerce setup with Shopify, WooCommerce or custom.',
    icon: <FaStore />,
  },
  {
    id: 6,
    title: 'Brand Launch & Strategy',
    desc: 'Positioning your brand with clarity, voice and creative impact.',
    icon: <FaRocket />,
  },
]

const Services = () => {
  return (
    <section className="w-full bg-[#F9F6FF] py-20 px-4 sm:px-10" id="services">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1F102E]">
          Our <span className="text-[#B877F7]">Services</span>
        </h2>
        <p className="text-[#6B7280] mt-3 max-w-2xl mx-auto">
          From concept to launch, we provide complete digital solutions for your ecommerce brand.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {services.map((service, index) => (
          <ServiceCard key={service.id} service={service} index={index} />
        ))}
      </div>

      <div className="text-center mt-12">
        <a
          href="/services"
          className="inline-block bg-[#B877F7] text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-[#A062D5] transition-all duration-300"
        >
          See All Services
        </a>
      </div>
    </section>
  )
}

export default Services
