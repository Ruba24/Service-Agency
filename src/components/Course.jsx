'use client'

import { useEffect, useState } from 'react'
import { client } from '@/lib/sanity'
import CourseCard from './CourseCard'

const Courses = () => {
   const [courses, setCourses] = useState([])

  useEffect(() => {
    client.fetch(
      `*[_type == "course" && isFeatured == true][0...3]{
        _id, title, description}`
    ).then(setCourses)
  }, [])

  return (
    <section
      className="relative w-full bg-[#F9F6FF] py-20 px-4 sm:px-10 overflow-hidden"
      id="courses"
    >
      {/* Themed Blobs for Background Accent */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-[#B877F7] opacity-20 rounded-full blur-3xl animate-blob animation-delay-2000 z-0"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#B877F7] opacity-10 rounded-full blur-3xl animate-blob animation-delay-4000 z-0"></div>

      {/* Content Wrapper */}
      <div className="relative z-10 max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1F102E]">
          Our <span className="text-[#B877F7]">Courses</span>
        </h2>
        <p className="text-[#6B7280] mt-3 max-w-2xl mx-auto">
          Learn the most in-demand skills through our industry-focused training programs.
        </p>
      </div>

      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {courses.map((course, index) => (
          <CourseCard key={index} course={course} index={index} />
        ))}
      </div>

      <div className="relative z-10 text-center mt-12">
        <a
          href="/courses"
          className="inline-block bg-[#B877F7] text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-[#A062D5] transition-all duration-300"
        >
          See All Courses
        </a>
      </div>
    </section>
  )
}

export default Courses
