'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter, useSearchParams } from 'next/navigation'
import { client } from "../../../sanity/lib/client";
import CourseCard from '@/components/CourseCard'
import CourseDetailsModal from '@/components/CourseDetailsModal'
import EnrollModal from '@/components/EnrollModal'

export default function AllCoursesPage() {
  const searchParams = useSearchParams()
  const initialTab = searchParams.get("tab") || "free"
  const [activeTab, setActiveTab] = useState(initialTab)

  const [paidCourses, setPaidCourses] = useState([])
  const [freeCourses, setFreeCourses] = useState([])
  const [loading, setLoading] = useState(false)

  const [selectedCourse, setSelectedCourse] = useState(null)
  const [viewCourse, setViewCourse] = useState(null)
  const router = useRouter()

  // Fetch Free Courses
  useEffect(() => {
    if (activeTab === 'free' && freeCourses.length === 0) {
      setLoading(true)
      client
        .fetch(`*[_type == "freeCourse"]{ _id, title, videoId }`)
        .then((data) => setFreeCourses(data))
        .finally(() => setLoading(false))
    }
  }, [activeTab])

  // Fetch Paid Courses
  useEffect(() => {
    if (activeTab === 'paid' && paidCourses.length === 0) {
      setLoading(true)
      client
        .fetch(`*[_type == "course"]{ _id, title, description, price, slug }`)
        .then((data) => setPaidCourses(data))
        .finally(() => setLoading(false))
    }
  }, [activeTab])

  return (
    <main className="max-w-7xl mx-auto py-20 px-4">
      <h1 className="text-4xl font-bold mb-10 text-center">All Courses</h1>

      {/* Styled Tabs */}
      <div className="flex justify-center mb-8">
        <div className="flex border border-[#B877F7] rounded-full overflow-hidden">
          <button
            onClick={() => setActiveTab('free')}
            className={`px-6 py-2 text-sm font-medium transition-all ${
              activeTab === 'free'
                ? 'bg-[#B877F7] text-white'
                : 'bg-transparent text-[#1F102E] hover:bg-[#B877F7]/10'
            }`}
          >
            Free Courses
          </button>
          <button
            onClick={() => setActiveTab('paid')}
            className={`px-6 py-2 text-sm font-medium transition-all ${
              activeTab === 'paid'
                ? 'bg-[#B877F7] text-white'
                : 'bg-transparent text-[#1F102E] hover:bg-[#B877F7]/10'
            }`}
          >
            Paid Courses
          </button>
        </div>
      </div>

      {/* Animated Tab Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'free' ? (
          <motion.div
            key="free"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {loading ? (
              <p className="col-span-full text-center">Loading courses...</p>
            ) : freeCourses.length > 0 ? (
              freeCourses.map((course) => (
                <div
                  key={course._id}
                  className="bg-white rounded-xl shadow p-4 flex flex-col items-center"
                >
                  <iframe
                    className="rounded-xl w-full h-48"
                    src={`https://www.youtube.com/embed/${course.videoId}`}
                    title={course.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                  <h3 className="mt-4 font-semibold text-md">{course.title}</h3>
                </div>
              ))
            ) : (
              <p className="col-span-full text-center">No free courses found</p>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="paid"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {loading ? (
              <p className="col-span-full text-center">Loading courses...</p>
            ) : paidCourses.length > 0 ? (
              paidCourses.map((course, index) => (
                <CourseCard
                  key={course._id}
                  course={course}
                  index={index}
                  onView={(course) => {
                    if (course.slug) {
                      router.push(`/courses/${course.slug.current}`)
                    }
                  }}
                />
              ))
            ) : (
              <p className="col-span-full text-center">No paid courses found</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {viewCourse && (
        <CourseDetailsModal
          course={viewCourse}
          onClose={() => setViewCourse(null)}
          onEnroll={(course) => {
            setSelectedCourse(course)
            setViewCourse(null)
          }}
        />
      )}

      {selectedCourse && (
        <EnrollModal
          course={selectedCourse}
          onClose={() => setSelectedCourse(null)}
        />
      )}
    </main>
  )
}
