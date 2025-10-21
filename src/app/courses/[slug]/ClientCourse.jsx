'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState, useRef } from 'react'
import { client } from '@/lib/sanity'
import FloatingIcons from '@/components/FloatingIcons'
import { courseData } from '@/data/courseIcons'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CourseTestimonials from '@/components/CourseTestimonials'
import EnrollModal from '@/components/EnrollModal'
import ToolSlider from '@/components/ToolSlider'
import FaqsSection from '@/components/FAQ'
import StatsSection from '@/components/StatsSection'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectFade } from 'swiper/modules'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import 'swiper/css'
import 'swiper/css/effect-fade'
import Image from 'next/image'

const ClientCourse = () => {
  const { slug } = useParams()
  const [course, setCourse] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [showFullDesc, setShowFullDesc] = useState(false)
  const swiperRef = useRef(null)

  useEffect(() => {
    if (!slug) return

    const fetchCourseData = async () => {
      const query = `
        *[_type == "course" && slug.current == $slug][0]{
          title,
          "description": pt::text(description),
          slug,
          icon,
          price,
          duration,
          level,
          "imageUrl": image.asset->url,
          "gallery": gallery[].asset->url,
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

  const courseIcons =
    courseData.find((c) => c.id === course.slug)?.icons || ['📘', '📖']

  return (
    <main className="relative min-h-screen bg-white">
      <Navbar />

      {/* ✅ Hero Slider (Homepage Style) */}
      <div className="relative bg-[#1F102E] text-white overflow-hidden h-[400px] md:h-[500px]">
        {/* Floating background icons */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none">
            <FloatingIcons icons={courseIcons} />
          </div>

          {/* Swiper Background Slider */}
          <Swiper
            modules={[Autoplay, EffectFade]}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            effect="fade"
            speed={1000}
            loop
            className="w-full h-full"
          >
            {course.gallery && course.gallery.length > 0 ? (
              course.gallery.map((url, index) => (
                <SwiperSlide key={index}>
                  <div
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${url})` }}
                  >
                    <div className="absolute inset-0 bg-[#1F102E]/60"></div>
                  </div>
                </SwiperSlide>
              ))
            ) : (
              <SwiperSlide>
                <div className="w-full h-full bg-[#1F102E]" />
              </SwiperSlide>
            )}
          </Swiper>
        </div>

        {/* Slider Arrows */}
        <div className="absolute inset-0 flex items-center justify-between px-5 z-40 pointer-events-none">
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="bg-black/40 hover:bg-[#B877F7] p-3 rounded-full transition pointer-events-auto"
            aria-label="Previous slide"
          >
            <FiChevronLeft className="text-white text-2xl" />
          </button>
          <button
            onClick={() => swiperRef.current?.slideNext()}
            className="bg-black/40 hover:bg-[#B877F7] p-3 rounded-full transition pointer-events-auto"
            aria-label="Next slide"
          >
            <FiChevronRight className="text-white text-2xl" />
          </button>
        </div>

        {/* Course Title Overlay */}
        <div className="absolute inset-0 flex items-center justify-center text-center px-4 z-20">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg">
            {course.title}
          </h1>
        </div>
      </div>

      {/* ✅ Course Details */}
      <div className="max-w-4xl mx-auto px-6 pt-10 relative z-10">
        <p className="text-lg text-gray-700 mb-4">
          {course.description.length > 300 ? (
            <>
              {showFullDesc
                ? course.description
                : `${course.description.substring(0, 300)}...`}
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
        <p className="text-lg text-gray-700">
          Level:{' '}
          {course.level
            ? course.level.charAt(0).toUpperCase() +
              course.level.slice(1).toLowerCase()
            : ''}
        </p>

        <div className="flex items-center justify-between mb-8">
          <span className="text-lg font-semibold text-purple-600">
            Cost: ${course.price?.toFixed(2) || 'Free'}
          </span>
        </div>

        <StatsSection
          stats={[
            { value: '7+', label: 'Hours of expert tutorials' },
            { value: '6+', label: 'Downloadable resources' },
            {
              value: '4',
              label:
                'Learning tracks (sales & marketing, productivity, entrepreneurship, content creation)',
            },
          ]}
        />
      </div>

      {/* ✅ Tools Slider */}
      <div className="mb-10">
        {course.tools?.length > 0 && (
          <ToolSlider tools={course.tools} title={`Tools for ${course.title}`} />
        )}
      </div>

      {/* ✅ Stats Section */}
      <StatsSection
        stats={[
          { value: `${course.learnersCount || 0}`, label: 'Learners enrolled' },
          {
            value:
              course.testimonials?.length > 0
                ? (
                    course.testimonials.reduce(
                      (sum, t) => sum + (t.rating || 0),
                      0
                    ) / course.testimonials.length
                  ).toFixed(1)
                : 'N/A',
            label: 'Average rating',
          },
        ]}
      />

      {/* ✅ Testimonials */}
      <div>
        {course.testimonials?.length > 0 && (
          <CourseTestimonials testimonials={course.testimonials} />
        )}
      </div>

      {/* ✅ FAQs */}
      <div>
        <FaqsSection
          courseId={course._id}
          description={`Questions about ${course.title}`}
        />
      </div>

      {/* ✅ Enroll Modal */}
      <div className="flex justify-center my-20 gap-4"></div>
      {selectedCourse && (
        <EnrollModal
          course={selectedCourse}
          onClose={() => setSelectedCourse(null)}
        />
      )}

      <Footer />
    </main>
  )
}

export default ClientCourse
