'use client'

import Image from 'next/image'
import Footer from '@/components/Footer'

const teamMembers = [
  {
    name: 'Sarah Malik',
    role: 'Founder & CEO',
    image: '/images/team/sarah.jpg',
  },
  {
    name: 'Ali Raza',
    role: 'Lead Developer',
    image: '/images/team/ali.jpg',
  },
  {
    name: 'Zoya Khan',
    role: 'UI/UX Designer',
    image: '/images/team/zoya.jpg',
  },
  {
    name: 'Ahmed Iqbal',
    role: 'Marketing Head',
    image: '/images/team/ahmed.jpg',
  },
]

const About = () => {
  return (
    <>
      {/* Hero Section with deep purple */}
      <section className="relative bg-[#1F102E] text-white overflow-hidden py-28">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#B877F7] opacity-30 rounded-full blur-3xl" />
        <div className="absolute top-20 right-0 w-72 h-72 bg-[#B877F7] opacity-20 rounded-full blur-2xl" />

        <div className="relative z-10 max-w-6xl mx-auto text-center px-4">
          <h2 className="text-4xl sm:text-5xl font-extrabold leading-tight">
            About <span className="text-[#B877F7]">ZELLVERSE</span>
          </h2>
          <p className="mt-4 text-[#E2E8F0] max-w-2xl mx-auto text-lg">
            At ZELLVERSE, we empower eCommerce brands through bold design, seamless tech, and powerful marketing strategies. Our team thrives on innovation and is passionate about helping clients scale to new heights with precision and creativity.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem eius inventore iusto numquam! Aspernatur pariatur explicabo at, odio cumque enim accusantium quos veritatis! Quia neque quisquam illum numquam aliquam nisi.
          </p>
        </div>
      </section>

      {/* Meet Our Team Section with light background */}
      <section className="w-full bg-[#F9F6FF] py-20 px-4 sm:px-10">
        <div className="max-w-6xl mx-auto text-center mb-16">
          <h3 className="text-3xl font-bold text-[#1F102E]">
            Meet Our <span className="text-[#B877F7]">Team</span>
          </h3>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-3xl shadow-md p-6 text-center"
            >
              <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.name}
                  width={96}
                  height={96}
                  className="object-cover w-full h-full"
                />
              </div>
              <h4 className="text-xl font-semibold text-[#1F102E]">{member.name}</h4>
              <p className="text-[#B877F7] text-sm mt-1">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </>
  )
}

export default About
