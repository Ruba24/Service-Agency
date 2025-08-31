'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { client } from '@/lib/sanity'
import FloatingIcons from '@/components/FloatingIcons'
import { courseData } from '@/data/courseIcons'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CourseTestimonials from '@/components/CourseTestimonials'
import EnrollModal from '@/components/EnrollModal'
import ToolSlider from '@/components/ToolSlider'
import FaqsSection from '@/components/FAQ'
import Image from 'next/image'

const CourseDetailPage = () => {
  const { slug } = useParams()
  const [course, setCourse] = useState(null)
  const [testimonials, setTestimonials] = useState([])
  const [faqs, setFaqs] = useState([])
  const [showFullDesc, setShowFullDesc] = useState(false)

  useEffect(() => {
    if (!slug) return

    const fetchCourseData = async () => {
      // Fetch course with references to tools, faqs, and testimonials
      const query = `
  *[_type == "course" && slug.current == $slug][0]{
    title,
    description,
    "slug": slug.current,
    "imageUrl": image.asset->url,
    tools[]->{
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

  if (!course) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading course details...</p>
      </div>
    )
  }

  return (
    <>
      <Navbar />
      <section className="pt-32 px-6 md:px-12 lg:px-24">
        {/* Title */}
        <h1 className="text-4xl font-bold text-gray-900 mb-6">{course.title}</h1>
      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-6 py-12 relative z-10">
         {/* Image */}
        {course.imageUrl && (
          <div className="relative w-full h-[400px] mb-8 rounded-2xl overflow-hidden shadow-lg">
            <Image
              src={course.imageUrl}
              alt={course.title}
              fill
              className="object-cover"
            />
          </div>
        )}
        <p className="text-lg text-gray-700 mb-4">{course.description.length > 300 ? (
            <p>
              {showFullDesc ? course.description : `${course.description.substring(0, 300)}...`}
              <span
                className="text-purple-600 text-sm cursor-pointer ml-2 font-medium hover:underline"
                onClick={() => setShowFullDesc(!showFullDesc)}
              >
                {showFullDesc ? ' Show Less' : ' Read More'}
              </span>
            </p>
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
      </section>
      <Footer />
    </>
  )
}

export default CourseDetailPage
