'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter, useSearchParams } from 'next/navigation'
import { client } from '../../../sanity/lib/client'
import CourseCard from '@/components/CourseCard'
import CourseDetailsModal from '@/components/CourseDetailsModal'
import EnrollModal from '@/components/EnrollModal'
import {
  FaCode,
  FaPaintBrush,
  FaMobileAlt,
  FaChartLine,
  FaStore,
  FaRocket,
  FaCogs,
  FaCloud,
  FaTools,
  FaPenFancy
} from 'react-icons/fa'

const iconMap = {
  FaCode: <FaCode />,
  FaPaintBrush: <FaPaintBrush />,
  FaMobileAlt: <FaMobileAlt />,
  FaChartLine: <FaChartLine />,
  FaStore: <FaStore />,
  FaRocket: <FaRocket />,
  FaCogs: <FaCogs />,         // 🔧 Custom Software Development
  FaCloud: <FaCloud />,       // ☁️ Cloud & DevOps
  FaTools: <FaTools />,       // 🛠 Maintenance & Support
  FaPenFancy: <FaPenFancy />  // ✍️ Content & Copywriting
}

export default function AllCoursesPage() {
  const searchParams = useSearchParams()
  const initialTab = searchParams.get('tab') || 'free'
  const [activeTab, setActiveTab] = useState(initialTab)

  const [freeCourses, setFreeCourses] = useState([])
  const [paidCourses, setPaidCourses] = useState([])

  const [loadingFree, setLoadingFree] = useState(false)
  const [loadingPaid, setLoadingPaid] = useState(false)

  const [selectedCourse, setSelectedCourse] = useState(null)
  const [viewCourse, setViewCourse] = useState(null)

  const router = useRouter()

  // Fetch Free Courses (YouTube)
  useEffect(() => {
    const getFree = async () => {
      setLoadingFree(true)
      try {
        const data = await client.fetch(
          `*[_type == "freeCourse"] | order(_createdAt desc){
            _id,
            title,
            videoId
          }`
        )
        setFreeCourses(data || [])
      } catch (e) {
        console.error('Error fetching free courses:', e)
        setFreeCourses([])
      } finally {
        setLoadingFree(false)
      }
    }

    if (activeTab === 'free' && freeCourses.length === 0) getFree()
  }, [activeTab, freeCourses.length])

  // Fetch Paid Courses
  useEffect(() => {
    const getPaid = async () => {
      setLoadingPaid(true)
      try {
        const data = await client.fetch(
          `*[_type == "course"] | order(_createdAt desc){
            _id,
            title,
            price,
            slug,
            icon,
             "description": pt::text(description),
            // optional image if your card needs it
            "imageUrl": image.asset->url
          }`
        )
        setPaidCourses(data || [])
      } catch (e) {
        console.error('Error fetching paid courses:', e)
        setPaidCourses([])
      } finally {
        setLoadingPaid(false)
      }
    }

    if (activeTab === 'paid' && paidCourses.length === 0) getPaid()
  }, [activeTab, paidCourses.length])

  return (
    <main className="max-w-7xl mx-auto px-4 pt-20 pb-12">
      {/* Heading (no longer hidden behind the fixed navbar) */}

    <div className="relative z-10 max-w-7xl mx-auto text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1F102E]">
            All <span className="text-[#B877F7]">Courses</span>
          </h2>
        </div>

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
            {loadingFree ? (
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
                  />
                  <h3 className="mt-4 font-semibold text-md text-center">
                    {course.title}
                  </h3>
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
            {loadingPaid ? (
              <p className="col-span-full text-center">Loading courses...</p>
            ) : paidCourses.length > 0 ? (
              paidCourses.map((course, index) => (
                <CourseCard
                  key={course._id}
                  course={{ ...course, icon: iconMap[course.icon] || <FaCode /> }}
                  index={index}
                  onView={(c) => {
                    // keep your original navigation pattern
                    if (c?.slug?.current) router.push(`/courses/${c.slug.current}`)
                  }}
                />
              ))
            ) : (
              <p className="col-span-full text-center">No paid courses found</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Your modals (unchanged) */}
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
