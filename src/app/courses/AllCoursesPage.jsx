'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
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

// Map icons
const iconMap = {
  FaCode: <FaCode />,
  FaPaintBrush: <FaPaintBrush />,
  FaMobileAlt: <FaMobileAlt />,
  FaChartLine: <FaChartLine />,
  FaStore: <FaStore />,
  FaRocket: <FaRocket />,
  FaCogs: <FaCogs />,
  FaCloud: <FaCloud />,
  FaTools: <FaTools />,
  FaPenFancy: <FaPenFancy />
}

// Helper: extract YouTube ID from full URL or just return ID
function getYouTubeID(urlOrID) {
  if (!urlOrID) return null
  const regex = /(?:\?v=|\/embed\/|\.be\/)([a-zA-Z0-9_-]{11})/
  const match = urlOrID.match(regex)
  return match ? match[1] : urlOrID
}

export default function AllCoursesPage({ freeCourses, paidCourses }) {
  const searchParams = useSearchParams()
  const initialTab = searchParams.get('tab') || 'free'
  const [activeTab, setActiveTab] = useState(initialTab)

  const [selectedCourse, setSelectedCourse] = useState(null)
  const [viewCourse, setViewCourse] = useState(null)

  const router = useRouter()

  return (
    <main className="max-w-7xl mx-auto px-4 pt-20 pb-12">
      {/* Heading */}
      <div className="relative z-10 max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1F102E]">
          All <span className="text-[#B877F7]">Courses</span>
        </h2>
      </div>

      {/* Tabs */}
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

      {/* Tab Content */}
      {activeTab === 'free' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {freeCourses.length > 0 ? (
            freeCourses.map((course) => {
              const videoID = getYouTubeID(course.videoId)
              return (
                <div
                  key={course._id}
                  className="bg-white rounded-xl shadow p-4 flex flex-col items-center"
                >
                  {videoID ? (
                    <iframe
                      className="rounded-xl w-full h-48"
                      src={`https://www.youtube.com/embed/${videoID}`}
                      title={course.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <p className="text-center text-gray-500 mt-4">
                      No video available
                    </p>
                  )}
                  <h3 className="mt-4 font-semibold text-md text-center">
                    {course.title}
                  </h3>
                </div>
              )
            })
          ) : (
            <p className="col-span-full text-center">No free courses found</p>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {paidCourses.length > 0 ? (
            paidCourses.map((course, index) => (
              <CourseCard
                key={course._id}
                course={{ ...course, icon: iconMap[course.icon] || <FaCode /> }}
                index={index}
                onView={(c) => {
                  if (c?.slug?.current) router.push(`/courses/${c.slug.current}`)
                }}
              />
            ))
          ) : (
            <p className="col-span-full text-center">No paid courses found</p>
          )}
        </div>
      )}

      {/* Modals */}
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
