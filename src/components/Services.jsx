'use client'

import ServiceCard from './ServiceCard'
import { useState, useEffect } from 'react'
// import { sanityClient } from '../../sanity/lib/client'
import { client } from '../../sanity/lib/client'

import {
  FaCode,
  FaPaintBrush,
  FaMobileAlt,
  FaChartLine,
  FaStore,
  FaRocket,
  FaCogs,
  FaCloud,
  FaTools,
  FaPenFancy
} from 'react-icons/fa'

const iconMap = {
  FaCode: <FaCode />,
  FaPaintBrush: <FaPaintBrush />,
  FaMobileAlt: <FaMobileAlt />,
  FaChartLine: <FaChartLine />,
  FaStore: <FaStore />,
  FaRocket: <FaRocket />,
  FaCogs: <FaCogs />,         // 🔧 Custom Software Development
  FaCloud: <FaCloud />,       // ☁️ Cloud & DevOps
  FaTools: <FaTools />,       // 🛠 Maintenance & Support
  FaPenFancy: <FaPenFancy />  // ✍️ Content & Copywriting
}

// const services = [
//   {
//     id: 1,
//     title: 'Web Development',
//     desc: 'Crafting responsive, fast and modern websites for your brand.',
//     icon: <FaCode />,
//   },
//   {
//     id: 2,
//     title: 'UI/UX Design',
//     desc: 'Stunning, user-centered designs that enhance digital experiences.',
//     icon: <FaPaintBrush />,
//   },
//   {
//     id: 3,
//     title: 'Mobile App Development',
//     desc: 'iOS and Android apps with smooth performance and great UX.',
//     icon: <FaMobileAlt />,
//   },
//   {
//     id: 4,
//     title: 'Digital Marketing',
//     desc: 'Boost your online presence through SEO, PPC & social campaigns.',
//     icon: <FaChartLine />,
//   },
//   {
//     id: 5,
//     title: 'Ecommerce Solutions',
//     desc: 'Complete eCommerce setup with Shopify, WooCommerce or custom.',
//     icon: <FaStore />,
//   },
//   {
//     id: 6,
//     title: 'Brand Launch & Strategy',
//     desc: 'Positioning your brand with clarity, voice and creative impact.',
//     icon: <FaRocket />,
//   },
// ]

const Services = () => {
  const [services, setServices] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const data = await sanityClient.fetch(`
          *[_type == "service"]{
            title,
            slug,
            icon,
            desc
          }
        `)
      setServices(data)
    }

    fetchData()
  }, [])

  return (
    <section
      className="relative w-full bg-[#F9F6FF] py-20 px-4 sm:px-10 overflow-hidden"
      id="services"
    >
      {/* Mirrored Background Blobs */}
      <div className="absolute -top-20 -right-20 w-72 h-72 bg-[#B877F7] opacity-20 rounded-full blur-3xl animate-blob animation-delay-2000 z-0"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#B877F7] opacity-10 rounded-full blur-3xl animate-blob animation-delay-4000 z-0"></div>

      <div className="relative z-10 max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1F102E]">
          Our <span className="text-[#B877F7]">Services</span>
        </h2>
        <p className="text-[#6B7280] mt-3 max-w-2xl mx-auto">
          From concept to launch, we provide complete digital solutions for your ecommerce brand.
        </p>
      </div>

      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {services.slice(0, 9).map((service, index) => (
          <ServiceCard key={index} service={{ ...service, icon: iconMap[service.icon] || <FaCode /> }} index={index} />
        ))}
      </div>

      <div className="relative z-10 text-center mt-12">
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