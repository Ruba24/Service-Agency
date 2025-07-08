'use client'

import { FaHandshake, FaClock, FaStar, FaRocket } from 'react-icons/fa'

const reasons = [
  {
    id: 1,
    icon: <FaHandshake />,
    title: 'Client-Centric Approach',
    desc: 'We listen first, understand deeply, and build solutions that meet your exact needs.',
  },
  {
    id: 2,
    icon: <FaClock />,
    title: 'On-Time Delivery',
    desc: 'Deadlines matter. Our team ensures every project is delivered on schedule.',
  },
  {
    id: 3,
    icon: <FaStar />,
    title: 'Proven Track Record',
    desc: 'Hundreds of successful ecommerce projects across industries and platforms.',
  },
  {
    id: 4,
    icon: <FaRocket />,
    title: 'Creative & Scalable',
    desc: 'From startup to scale-up, our services grow with your brand and vision.',
  },
]

const WhyChooseUs = () => {
  return (
    <section
      className="w-full relative py-20 px-4 sm:px-10 bg-gradient-to-br from-[#F9F6FF] via-[#F4F0FA] to-[#ffffff]"
      id="why-us"
    >
      {/* Optional soft blurred background blob */}
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-[#B877F7]/10 rounded-full blur-3xl z-0"></div>

      <div className="relative z-10 max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1F102E]">
          Why <span className="text-[#B877F7]">Choose Us</span>
        </h2>
        <p className="text-[#6B7280] mt-3 max-w-2xl mx-auto">
          Discover what makes Zelverse the preferred digital partner for ecommerce growth.
        </p>
      </div>

      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {reasons.map((reason) => (
          <div
            key={reason.id}
            className="bg-white rounded-2xl p-6 text-center shadow-sm"
          >
            <div className="text-[#B877F7] text-3xl mb-4 flex justify-center">
              {reason.icon}
            </div>
            <h3 className="text-lg font-semibold text-[#1F102E] mb-2">
              {reason.title}
            </h3>
            <p className="text-[#6B7280] text-sm leading-relaxed">
              {reason.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default WhyChooseUs
