
import Link from 'next/link'
import ServiceCard from './ServiceCard'

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

const Services = ({ services }) => {

  return (
    <section
      className="relative w-full bg-[#F9F6FF] py-20 px-4 sm:px-10 overflow-hidden"
      id="services"
    >
      {/* Background Blobs */}
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

      {/* ✅ Make service cards clickable */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {services.slice(0, 9).map((service, index) => (
          <Link
            key={index}
            href={`/services/${service.slug?.current || ''}`}
            className="cursor-pointer"
          >
            <ServiceCard
              service={{
                ...service,
                icon: iconMap[service.icon] || <FaCode />
              }}
              index={index}
            />
          </Link>
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
