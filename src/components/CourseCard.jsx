'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

export default function CourseCard({ course, index, onView }) {
  return (
    <motion.div
      className="relative group bg-white rounded-3xl p-6 overflow-hidden border border-gray-200 shadow-md transition-all duration-300 hover:shadow-xl hover:border-[#B877F7]"
      whileHover={{ scale: 1.03 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {/* Accent Corner Blob */}
      <div className="absolute -top-5 -right-5 w-24 h-24 bg-gradient-to-br from-[#B877F7] to-[#A062D5] rounded-full opacity-20 blur-2xl z-0" />

      {/* Content */}
      <div className="relative z-10">
        <h3 className="text-md font-bold text-[#1F102E] mb-2 group-hover:text-[#B877F7] transition-colors duration-300">
          {course.title}
        </h3>
        <p className="text-[#6B7280] text-sm leading-relaxed">{course.description?.length > 90 ? course.description.trim().slice(0, 88) + '...' : course.description}</p>
      </div>

      <div className="relative z-10 mt-4">
        <button
          // onClick={() => onEnroll(course)}
           onClick={() => onView(course)}
          className="px-5 py-2 bg-[#B877F7] text-white rounded-full font-medium hover:bg-[#A062D5] transition-colors"
        >
          View
        </button>
      </div>

      {/* Bottom Accent Line */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#B877F7] to-[#A062D5] opacity-70 rounded-b-3xl" />
    </motion.div>
  )
}