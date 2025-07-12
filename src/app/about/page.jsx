'use client'

import Image from 'next/image'
import Footer from '@/components/Footer'

const teamMembers = [
  {
    name: 'Sarah Malik',
    role: 'Founder & CEO',
    image: '/images/team/sarah.jpg',
    description:
      'Visionary leader driving strategy, growth, and innovation. She has led ZELLVERSE to become a top-tier ecommerce agency.',
  },
  {
    name: 'Ali Raza',
    role: 'Lead Developer',
    image: '/images/team/ali.jpg',
    description:
      'Architect behind our scalable and modern web systems. He ensures seamless user experiences and robust backend solutions.',
  },
  {
    name: 'Zoya Khan',
    role: 'UI/UX Designer',
    image: '/images/team/zoya.jpg',
    description:
      'Design expert focused on creating beautiful, user-centered interfaces that convert visitors into loyal customers.',
  },
  {
    name: 'Ahmed Iqbal',
    role: 'Marketing Head',
    image: '/images/team/ahmed.jpg',
    description:
      'Crafts data-driven strategies that fuel brand growth and ROI. Specialized in eCommerce paid media and content funnels.',
  },
]

const About = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-[#1F102E] text-white overflow-hidden py-28">
        <div className="relative z-10 max-w-6xl mx-auto text-center px-4">
          <h2 className="text-4xl sm:text-5xl font-extrabold leading-tight">
            About <span className="text-[#B877F7]">ZELLVERSE</span>
          </h2>
          <p className="mt-4 text-[#E2E8F0] max-w-2xl mx-auto text-lg">
            At ZELLVERSE, we empower eCommerce brands through bold design, seamless tech, and powerful marketing strategies.
          </p>
        </div>
      </section>

      {/* Zigzag Team Section */}
      <section className="relative bg-[#F9F6FF] py-28 px-4 sm:px-10 overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute inset-0 bg-[url('/images/bg-pattern-light.svg')] bg-no-repeat bg-cover opacity-10 z-0" />

        {/* Decorative Background Blobs */}
        <div className="absolute top-0 left-0 w-80 h-80 bg-[#EBDDFC] rounded-full blur-3xl opacity-30 pointer-events-none animate-blob z-0"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#D8C4F8] rounded-full blur-2xl opacity-20 pointer-events-none animate-blob animation-delay-2000 z-0"></div>
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-[#F3E8FF] rounded-full blur-[90px] opacity-20 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0"></div>
        <div className="absolute top-[10%] right-[15%] w-60 h-60 bg-[#E9D6FF] rounded-full blur-[100px] opacity-25 pointer-events-none animate-blob animation-delay-1000 z-0"></div>
        <div className="absolute bottom-[15%] left-[10%] w-48 h-48 bg-[#F4EFFF] rounded-full blur-[90px] opacity-20 pointer-events-none animate-blob animation-delay-3000 z-0"></div>

        {/* Connecting lines with animation */}
        <svg className="absolute top-0 left-0 w-full h-full pointer-events-none z-0 animate-draw-lines" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <marker id="arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto" markerUnits="strokeWidth">
              <path d="M0,0 L0,6 L6,3 z" fill="#B877F7" />
            </marker>
          </defs>
          <line x1="30%" y1="250" x2="70%" y2="430" stroke="#B877F7" strokeWidth="2" strokeDasharray="5,5">
            <animate attributeName="stroke-dashoffset" from="100" to="0" dur="2s" repeatCount="indefinite" />
          </line>
          <line x1="70%" y1="430" x2="30%" y2="610" stroke="#B877F7" strokeWidth="2" strokeDasharray="5,5">
            <animate attributeName="stroke-dashoffset" from="100" to="0" dur="2s" repeatCount="indefinite" />
          </line>
          <line x1="30%" y1="610" x2="70%" y2="790" stroke="#B877F7" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#arrow)">
            <animate attributeName="stroke-dashoffset" from="100" to="0" dur="2s" repeatCount="indefinite" />
          </line>
        </svg>

        <div className="max-w-6xl mx-auto text-center mb-16 relative z-10">
          <h3 className="text-3xl font-bold text-[#1F102E]">
            Meet Our <span className="text-[#B877F7]">Team</span>
          </h3>
        </div>

        <div className="max-w-5xl mx-auto flex flex-col items-center gap-0 relative z-10">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className={`w-full flex ${
                index % 2 === 0 ? 'justify-start' : 'justify-end'
              } ${index !== 0 ? '-mt-20' : ''}`}
            >
              <div className="w-[260px] h-[260px] bg-white border border-gray-200 rounded-2xl shadow-md p-4 text-center transition-all duration-300 hover:ring-2 hover:ring-[#B877F7] hover:shadow-[0_0_20px_2px_rgba(184,119,247,0.3)]">
                <div className="w-20 h-20 rounded-full overflow-hidden mb-3 mx-auto border-2 border-[#B877F7]">
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={80}
                    height={80}
                    className="object-cover w-full h-full"
                  />
                </div>
                <h4 className="text-lg font-semibold text-[#1F102E]">{member.name}</h4>
                <p className="text-sm text-[#B877F7]">{member.role}</p>
                <p className="text-xs text-[#4B5563] mt-2">{member.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </>
  )
}

export default About
