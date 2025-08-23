'use client'

import { useParams } from 'next/navigation'
import Image from 'next/image'
import Footer from '@/components/Footer'
import AwardsSlider from '@/components/AwardsSlider'
import ServiceSlider from '@/components/ServiceLogoSlider'
import Testimonials from '@/components/Testimonials'
import Link from 'next/link'
import FAQ from '@/components/FAQ' // make sure you have this

const CourseDetailPage = () => {
  const { slug } = useParams()

  // ✅ Dummy data (replace with Sanity later)
  const course = {
    title: "Full Stack Web Development",
    description:
      "This course covers frontend, backend, database, and deployment strategies with real-world projects. Learn MERN stack with hands-on experience.",
    image: "/course-placeholder.jpg",
    badges: ["Beginner Friendly", "Certificate Included", "Hands-on Projects"],
    experience: "10+ Years of Training Experience",
    tools: [
      { name: "React", icon: "/icons/react.svg" },
      { name: "Node.js", icon: "/icons/nodejs.svg" },
      { name: "MongoDB", icon: "/icons/mongodb.svg" },
      { name: "Next.js", icon: "/icons/nextjs.svg" },
    ],
    faqs: [
      {
        question: "What is the duration of this course?",
        answer: "The course runs for 12 weeks with live and recorded sessions."
      },
      {
        question: "Do I need prior coding knowledge?",
        answer: "Basic understanding of JavaScript helps, but we start from fundamentals."
      },
      {
        question: "Will I get a certificate?",
        answer: "Yes, a certificate of completion will be provided."
      },
    ]
  }

  return (
    <>
      {/* Hero Section */}
      <section className="w-full bg-gray-50 py-20"> {/* increased padding to avoid navbar overlap */}
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center px-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{course.title}</h1>
            <p className="text-lg text-gray-600 mb-6">{course.description}</p>

            {/* Badges */}
            <div className="flex flex-wrap gap-3 mb-6">
              {course.badges.map((badge, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-purple-100 text-purple-600 text-sm font-medium rounded-full"
                >
                  {badge}
                </span>
              ))}
            </div>

            {/* Experience */}
            <p className="text-gray-700 font-semibold mb-6">
              {course.experience}
            </p>

            {/* CTA Buttons */}
            <div className="flex gap-4">
              <Link
                href="https://wa.me/yourwhatsapp"
                target="_blank"
                className="px-6 py-3 bg-[#B877F7] text-white rounded-xl shadow hover:bg-purple-600 transition"
              >
                Contact via WhatsApp
              </Link>
              <Link
                href="/courses"
                className="px-6 py-3 bg-gray-200 text-gray-800 rounded-xl shadow hover:bg-gray-300 transition"
              >
                Back to Courses
              </Link>
            </div>
          </div>

          {/* Image */}
          <div className="relative w-full h-80">
            <Image
              src={course.image}
              alt={course.title}
              fill
              className="object-cover rounded-2xl shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Tools Slider */}
      <section className="py-16 bg-white">
        <h2 className="text-center text-2xl font-bold text-gray-900 mb-8">
          Tools You Will Learn
        </h2>
        <ServiceSlider tools={course.tools} />
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <h2 className="text-center text-2xl font-bold text-gray-900 mb-8">
          What Our Students Say
        </h2>
        <Testimonials />
      </section>

      {/* FAQs */}
      <section className="py-16 bg-white">
        <h2 className="text-center text-2xl font-bold text-gray-900 mb-8">
          Frequently Asked Questions
        </h2>
        <FAQ faqs={course.faqs} />
      </section>

      <Footer />
    </>
  )
}

export default CourseDetailPage
