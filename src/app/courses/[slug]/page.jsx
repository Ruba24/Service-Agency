'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { PortableText } from '@portabletext/react'
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
import StatsSection from '@/components/StatsSection'

const CourseDetailPage = () => {
  const { slug } = useParams()
  const [course, setCourse] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [showFullDesc, setShowFullDesc] = useState(false)

  useEffect(() => {
    if (!slug) return

    const fetchCourseData = async () => {
      // Fetch course with references to tools, faqs, and testimonials
      const query = `
  *[_type == "course" && slug.current == $slug][0]{
    title,
    description,
    slug,
    price,
    duration,
    level,
    "imageUrl": image.asset->url,
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
    }
    fetchCourseData()

  }, [slug])

  if (loading) return <p className="text-center mt-20">Loading...</p>
  if (!course) return <p className="text-center mt-20">Course not found</p>

  // ✅ Find matching icons from courseData
  const courseIcons = courseData.find(c => c.id === course.slug)?.icons || ['📘', '📖']

  return (
    <main className="relative min-h-screen bg-white">
      {/* </> */}
      <Navbar />
      <div className="relative h-[300px] flex items-center justify-center bg-[#1F102E]">
        <FloatingIcons icons={courseIcons} />
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-[#663b8f] opacity-20 rounded-full blur-3xl pointer-events-none animate-blob"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-[#663b8f] opacity-20 rounded-full blur-2xl pointer-events-none animate-blob animation-delay-2000"></div>
        <div className="absolute top-10 right-1/3 w-64 h-64 bg-[#F3E8FF] opacity-10 rounded-full blur-[90px] pointer-events-none animate-blob animation-delay-4000"></div>

        <h1 className="relative z-10 text-4xl font-bold text-center text-white">
          {course.title}
        </h1>
      </div>
      {/* <section className="pt-32 px-6 md:px-12 lg:px-24"> */}
      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-6 pt-8 relative z-10">
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
        <p className="text-lg text-gray-700">Level: {course.level
          ? course.level.charAt(0).toUpperCase() + course.level.slice(1).toLowerCase()
          : ''}</p>
        <div className="flex items-center justify-between mb-8">
          <span className="text-lg font-semibold text-purple-600">
            Cost: ${course.price?.toFixed(2) || 'Free'}
          </span>
        </div>
        <StatsSection
          stats={[
            { value: '7+', label: 'Hours of expert tutorials' },
            { value: '6+', label: 'Downloadable resources' },
            { value: '4', label: 'Learning tracks (sales & marketing, productivity, entrepreneurship, content creation)' },
          ]}
        />


      </div>
      <div className="mb-10">
        {course.tools?.length > 0 && (
          <ToolSlider tools={course.tools} title={`Tools for ${course.title}`} />
        )}
      </div>
      <StatsSection
        stats={[
          { value: `${course.learnersCount || 0}`, label: 'Learners enrolled' },
          {
            value: course.testimonials?.length > 0
              ? (
                (course.testimonials.reduce((sum, t) => sum + (t.rating || 0), 0) /
                  course.testimonials.length).toFixed(1)
              )
              : 'N/A',
            label: 'Average rating'
          }
        ]} />
      <div>
        {course.testimonials?.length > 0 && (
          <CourseTestimonials testimonials={course.testimonials} />
        )}
      </div>
      <div>
        <FaqsSection courseId={course._id} description={`Questions about ${course.title}`} />
      </div>
      <div className="flex justify-center my-20 gap-4">
        <button
          onClick={() => setSelectedCourse(course)}
          className="px-6 py-2 rounded-lg bg-[#ffa329] text-white hover:bg-[#f58c00] transition">
          Enroll Now
        </button>
      </div>
      {selectedCourse && (
        <EnrollModal
          course={selectedCourse}
          onClose={() => setSelectedCourse(null)}
        />
      )}
      <div>
  {course.webinars?.length > 0 && (
    <WebinarSection webinars={course.webinars} />
  )}
</div>

      {/* </section> */}
      <Footer />
      {/* </> */}
    </main>
  )
}

export default CourseDetailPage