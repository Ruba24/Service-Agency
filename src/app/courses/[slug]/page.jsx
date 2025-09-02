// app/courses/[slug]/page.jsx
'use client'

import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { PortableText } from '@portabletext/react'
import { client } from '@/lib/sanity'
import FloatingIcons from '@/components/FloatingIcons'
import { courseData } from '@/data/courseIcons'
import CourseTestimonials from '@/components/CourseTestimonials'
import EnrollModal from '@/components/EnrollModal'
import ToolSlider from '@/components/ToolSlider'
import FaqsSection from '@/components/FAQ'

export default function CourseDetailsPage() {
  const { slug } = useParams()
  const router = useRouter()
  const [course, setCourse] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [showFullDesc, setShowFullDesc] = useState(false)

  useEffect(() => {
    if (!slug) return

    const query = `*[_type == "course" && slug.current == $slug][0]{
      title,
      description,
      price,
      isFeatured,
      "slug": slug.current,
      "duration": duration,
      "level": level,
      "testimonials": *[_type == "testimonial" && references(^._id)]{
            _id,
            name,
            role,
            quote,
            rating,
            clientImage
          },
          "tools": *[_type == "tool" && references(^._id)]{
        _id,
        name,
        icon,
        color
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
        <p className="text-lg text-gray-700 mb-4">{course.description.length > 300 ? (
          <>
            {showFullDesc ? course.description : `${course.description.substring(0, 300)}...`}
            <span
              className="text-purple-600 text-sm cursor-pointer ml-2 font-medium hover:underline"
              onClick={() => setShowFullDesc(!showFullDesc)}
            >
              {showFullDesc ? ' Show Less' : ' Read More'}
            </span>
          </>
        ) : (
          course.description
        )}
        </p>
        <p className="text-lg text-gray-700">Duration: {course.duration}</p>
        <p className="text-lg text-gray-700">Level: {course.level}</p>
        <div className="flex items-center justify-between mb-8">
          <span className="text-lg font-semibold text-purple-600">
            Cost: ${course.price?.toFixed(2) || 'Free'}
          </span>
        </div>

      </div>
      <div>
        {course.testimonials?.length > 0 && (
          <CourseTestimonials testimonials={course.testimonials} />
        )}
      </div>
      <div className="mt-10 mb-10">
        {course.tools?.length > 0 && (
          <ToolSlider tools={course.tools} title={`Tools for ${course.title}`} />
        )}
      </div>
      <div>
        <FaqsSection courseId={course._id} description={`Questions about ${course.title}`} />
      </div>
      <div className="flex justify-center mt-20 gap-4">
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
      {selectedCourse && (
        <EnrollModal
          course={selectedCourse}
          onClose={() => setSelectedCourse(null)}
        />
      )}
    </main>
  )
}