'use client'

import { useParams } from 'next/navigation'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { client } from '../../../../sanity/lib/client'
import Footer from '@/components/Footer'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { Autoplay } from 'swiper'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

const CourseDetailPage = () => {
  const { slug } = useParams()
  const [course, setCourse] = useState(null)
  const [testimonials, setTestimonials] = useState([])

  useEffect(() => {
    const fetchCourse = async () => {
      const query = `
        *[_type=="course" && slug.current == $slug][0]{
          _id,
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
          }
        }
      `
      const data = await client.fetch(query, { slug })
      setCourse(data)

      // Fetch testimonials filtered by this course
      if (data?._id) {
        const testimonialQuery = `
          *[_type=="testimonial" && references($courseId)]{
            name,
            rating,
            comment,
            "avatar": avatar.asset->url
          }
        `
        const testimonialData = await client.fetch(testimonialQuery, { courseId: data._id })
        setTestimonials(testimonialData)
      }
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

  if (!course) return <p className="text-center py-20">Loading...</p>

  return (
    <>
      {/* Hero Section */}
      <section className="w-full bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center px-6">
          <div className="order-2 md:order-1">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{course.title}</h1>
            <p className="text-lg text-gray-600 mb-6">{course.description}</p>

            {course.experience && <p className="text-gray-700 font-semibold mb-6">{course.experience}</p>}
            {course.price && <p className="text-2xl font-bold text-purple-600 mb-6">Price: {course.price}</p>}

            <button
              onClick={handleEnroll}
              className="px-6 py-3 bg-[#B877F7] text-white rounded-xl shadow hover:bg-purple-600 transition"
            >
              Enroll Now
            </button>
          </div>

          {course.imageUrl && (
            <div className="relative w-full h-80 order-1 md:order-2">
              <Image src={course.imageUrl} alt={course.title} fill className="object-cover rounded-2xl shadow-lg" />
            </div>
          )}
        </div>
      </section>

      {/* Course-specific Tools Slider */}
      {course.tools && course.tools.length > 0 && (
        <section className="w-full py-12 bg-gray-50">
          <div className="max-w-[90rem] mx-auto px-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Tools You Will Learn</h2>
            <Swiper
              modules={[Autoplay]}
              spaceBetween={20}
              slidesPerView={4}
              loop={true}
              autoplay={{ delay: 2500, disableOnInteraction: false }}
              breakpoints={{
                640: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 4 },
              }}
            >
              {course.tools.map((tool, idx) => (
                <SwiperSlide key={idx}>
                  <div className="flex flex-col items-center">
                    <img src={tool.logoUrl} alt={tool.title} className="w-20 h-20 object-contain mb-2" />
                    <p className="text-center font-medium">{tool.title}</p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>
      )}

      {/* Course-specific Testimonials (filtered) */}
      {testimonials.length > 0 && (
        <section className="py-16 bg-[#B877F7] text-white">
          <h2 className="text-center text-2xl font-bold mb-8">What Our Students Say</h2>
          <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-8">
            {testimonials.map((t, idx) => (
              <div key={idx} className="bg-white text-gray-900 rounded-xl p-6 shadow">
                <p className="text-lg mb-4">"{t.comment}"</p>
                <div className="flex items-center gap-4">
                  {t.avatar && <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover" />}
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

      {/* Course-specific FAQs */}
      {course.faqs && course.faqs.length > 0 && (
        <section className="py-16 bg-white">
          <h2 className="text-center text-2xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h2>
          <div className="max-w-4xl mx-auto space-y-4 px-6">
            {course.faqs.map((faq, idx) => (
              <details key={idx} className="border rounded-lg p-4">
                <summary className="font-semibold cursor-pointer">{faq.question}</summary>
                <p className="mt-2 text-gray-700">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>
      )}

      <Footer />
    </>
  )
}

export default CourseDetailPage
