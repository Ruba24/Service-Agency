// app/courses/[slug]/page.jsx
'use client'

import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { client } from '@/lib/sanity'
import FloatingIcons from '@/components/FloatingIcons'
import { courseData } from '@/data/courseIcons'
import CourseTestimonials from '@/components/CourseTestimonials'
import EnrollModal from '@/components/EnrollModal'

export default function CourseDetailsPage() {
  const { slug } = useParams()
  const router = useRouter()
  const [course, setCourse] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedCourse, setSelectedCourse] = useState(null)

  useEffect(() => {
    if (!slug) return

    const query = `*[_type == "course" && slug.current == $slug][0]{
      title,
      description,
      price,
      isFeatured,
      "slug": slug.current,
      "testimonials": *[_type == "testimonial" && references(^._id)]{
            _id,
            name,
            role,
            quote,
            rating,
            clientImage
          }
    }`

    client.fetch(query, { slug }).then((data) => {
      setCourse(data)
      setLoading(false)
    })
  }, [slug])

  if (loading) return <p className="text-center mt-20">Loading...</p>
  if (!course) return <p className="text-center mt-20">Course not found</p>

  // ✅ Find matching icons from courseData
  const courseIcons = courseData.find(c => c.id === course.slug)?.icons || ['📘', '📖']

  return (
    <main className="relative min-h-screen bg-white mb-20">
      {/* Floating Icons Section */}
      <div className="relative h-[300px] flex items-center justify-center bg-gradient-to-r from-purple-100 to-indigo-100">
        <FloatingIcons icons={courseIcons} />
        <h1 className="relative z-10 text-4xl font-bold text-center text-[#1F102E]">
          {course.title}
        </h1>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-6 py-12 relative z-10">
        <p className="text-lg text-gray-700 mb-8">{course.description}</p>

        <div className="flex items-center justify-between mb-8">
          <span className="text-2xl font-semibold text-[#1F102E]">
            ${course.price?.toFixed(2) || 'Free'}
          </span>
        </div>

        <div className="flex justify-center gap-4">
          <button
            onClick={() => router.push('/courses?tab=paid')}
            className="px-6 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
          >
            Back
          </button>
          <button
            onClick={() => setSelectedCourse(course)}
            className="px-6 py-2 rounded-lg bg-[#B877F7] text-white hover:bg-[#9b5de5] transition">
            Enroll Now
          </button>
        </div>
      </div>
      <div>
        {course.testimonials?.length > 0 && (
          <CourseTestimonials testimonials={course.testimonials} />
          // <section className="mt-20 flex justify-center">
          //   <h2 className="text-2xl font-bold mb-8 text-center">
          //     What Our Clients Say
          //   </h2>
          //   <div className='flex justify-center'>
          //     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          //       {course.testimonials.map((t) => (
          //         <div
          //           key={t._id}
          //           className="bg-[#1F102E] text-white p-6 rounded-xl shadow-md"
          //         >
          //           {t.clientImage ? (
          //             <img
          //               src={t.clientImage.asset.url}
          //               alt={t.name}
          //               className="w-16 h-16 rounded-full mx-auto mb-4"
          //             />
          //           ) : (
          //             <div className="w-16 h-16 rounded-full bg-purple-600 flex items-center justify-center mx-auto mb-4">
          //               <span className="text-2xl">👤</span>
          //             </div>
          //           )}
          //           <p className="italic mb-4 text-center">“{t.quote}”</p>
          //           <div className="flex justify-center mb-2">
          //             {Array.from({ length: t.rating }).map((_, i) => (
          //               <span key={i}>⭐</span>
          //             ))}
          //           </div>
          //           <p className="text-center font-semibold">{t.name}</p>
          //           <p className="text-center text-sm text-gray-300">{t.role}</p>
          //         </div>
          //       ))}
          //     </div>
          //   </div>
          // </section>
        )}
      </div>

      {selectedCourse && (
        <EnrollModal
          course={selectedCourse}
          onClose={() => setSelectedCourse(null)}
        />
      )}
    </main>
  )
}