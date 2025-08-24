'use client'

import { useParams } from 'next/navigation'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { client } from '../../../../sanity/lib/client'
import Footer from '@/components/Footer'
import ServiceSlider from '@/components/ServiceLogoSlider'
import Testimonials from '@/components/Testimonials'
import FAQ from '@/components/FAQ'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

const CourseDetailPage = () => {
  const { slug } = useParams()
  const [course, setCourse] = useState(null)

  useEffect(() => {
    const fetchCourse = async () => {
      const query = `
        *[_type == "course" && slug.current == $slug][0]{
          title,
          description,
          price,
          experience,
          "imageUrl": image.asset->url,
          tools[]->{
            title,
            "logoUrl": logo.asset->url
          },
          faqs[] {
            question,
            answer
          },
          "testimonials": testimonials[]->{
            name,
            rating,
            comment,
            avatar
          }
        }
      `
      const data = await client.fetch(query, { slug })
      setCourse(data)
    }

    if (slug) fetchCourse()
  }, [slug])

  const handleEnroll = async () => {
    const stripe = await stripePromise
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        courseTitle: course.title,
        price: course.price,
      }),
    })

    const session = await res.json()
    await stripe.redirectToCheckout({ sessionId: session.id })
  }

  if (!course) {
    return <p className="text-center py-20">Loading...</p>
  }

  return (
    <>
      {/* Hero Section */}
      <section className="w-full bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center px-6">
          <div className="order-2 md:order-1">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{course.title}</h1>
            <p className="text-lg text-gray-600 mb-6">{course.description}</p>

            {course.experience && (
              <p className="text-gray-700 font-semibold mb-6">{course.experience}</p>
            )}

            {course.price && (
              <p className="text-2xl font-bold text-purple-600 mb-6">
                Price: {course.price}
              </p>
            )}

            <div>
              <button
                onClick={handleEnroll}
                className="px-6 py-3 bg-[#B877F7] text-white rounded-xl shadow hover:bg-purple-600 transition"
              >
                Enroll Now
              </button>
            </div>
          </div>

          {course.imageUrl && (
            <div className="relative w-full h-80 order-1 md:order-2">
              <Image
                src={course.imageUrl}
                alt={course.title}
                fill
                className="object-cover rounded-2xl shadow-lg"
              />
            </div>
          )}
        </div>
      </section>

      {/* Tools Slider - Full Width */}
      {course.tools && course.tools.length > 0 && (
        <section className="w-full py-12 bg-gray-50">
          <div className="max-w-[90rem] mx-auto px-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Tools You Will Learn
            </h2>
            <ServiceSlider tools={course.tools} infinite={true} />
          </div>
        </section>
      )}

      {/* Testimonials - Purple Card */}
      {course.testimonials && course.testimonials.length > 0 && (
        <section className="py-16 bg-[#B877F7] text-white">
          <h2 className="text-center text-2xl font-bold mb-8">
            What Our Students Say
          </h2>
          <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-8">
            {course.testimonials.map((t, idx) => (
              <div key={idx} className="bg-white text-gray-900 rounded-xl p-6 shadow">
                <p className="text-lg mb-4">"{t.comment}"</p>
                <div className="flex items-center gap-4">
                  {t.avatar && (
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  )}
                  <div>
                    <p className="font-semibold">{t.name}</p>
                    <p className="text-yellow-400">{'⭐'.repeat(t.rating)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* FAQs */}
      {course.faqs && course.faqs.length > 0 && (
        <section className="py-16 bg-white">
          <FAQ faqs={course.faqs} />
        </section>
      )}

      <Footer />
    </>
  )
}

export default CourseDetailPage
