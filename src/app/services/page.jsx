'use client'

import ServiceCard from '@/components/ServiceCard'
import { client } from '../../../sanity/lib/client'
import { useState, useEffect } from 'react'
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

export default function ServicesPage() {
  const [services, setServices] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const data = await client.fetch(`
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
    <section className="max-w-7xl mx-auto px-4 py-20">
      <h1 className="text-4xl font-extrabold mb-12 text-center text-[#1F102E]">
        Our <span className="text-[#B877F7]">Services</span>
      </h1>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <a key={service.slug.current} href={`/services/${service.slug.current}`}>
            <ServiceCard service={{ ...service, icon: iconMap[service.icon] || <FaCode /> }} index={index} />
          </a>
        ))}
      </div>
    </section>
  )
}
