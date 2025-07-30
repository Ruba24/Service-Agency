'use client'

import ServiceCard from '@/components/ServiceCard'
import { sanityClient } from '../../../sanity/lib/client'
import { useState, useEffect } from 'react'

export default function ServicesPage() {
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
    <section className="max-w-7xl mx-auto px-4 py-20">
      <h1 className="text-4xl font-extrabold mb-12 text-center text-[#1F102E]">
        Our <span className="text-[#B877F7]">Services</span>
      </h1>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <a key={service.slug.current} href={`/services/${service.slug.current}`}>
            <ServiceCard service={service} index={index} />
          </a>
        ))}
      </div>
    </section>
  )
}
