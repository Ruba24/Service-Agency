
import Image from 'next/image'
import Link from 'next/link'

export default function CourseCard({ course }) {
  return (
    <div
      // whileHover={{ scale: 1.03 }}
      // transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="relative group bg-white rounded-3xl p-6 overflow-hidden border border-gray-200 shadow-md transition-all duration-300 hover:shadow-xl hover:border-[#B877F7]"
    >
      {/* ✅ Full clickable link overlay */}
      <Link
        href={`/courses/${course.slug?.current || ''}`}
        className="absolute inset-0 z-30"
      >
        <span className="sr-only">{course.title}</span>
      </Link>

      {/* Background Accent */}
      <div className="absolute -top-5 -right-5 w-24 h-24 bg-gradient-to-br from-[#B877F7] to-[#A062D5] rounded-full opacity-20 blur-2xl" />

      {/* Icon */}
      <div className="relative z-40 w-16 h-16 mb-4 flex items-center justify-center bg-white rounded-full shadow-inner border-2 border-[#B877F7] group-hover:shadow-lg transition">
        {course.imageUrl ? (
          <Image
            src={course.imageUrl}
            alt={course.title}
            width={100}
            height={100}
            className="rounded-full object-cover w-16 h-16"
          />
        ) : (
          <div className="text-gray-400 text-sm text-center">No Image</div>
        )}
      </div>

      {/* Content */}
      <div className="relative z-40">
        <h3 className="text-md font-bold text-[#1F102E] mb-2 group-hover:text-[#B877F7] transition-colors duration-300">
          {course.title}
        </h3>
        <p className="text-[#6B7280] text-sm leading-relaxed">
          {course.description?.length > 90
            ? course.description.trim().slice(0, 88) + '...'
            : course.description}
        </p>
      </div>

      {/* View Button */}
      <div className="relative z-50 mt-3">
        <Link
          href={`/courses/${course.slug?.current || ''}`}
          className="px-5 py-2 bg-[#B877F7] text-white rounded-full font-medium hover:bg-[#A062D5] transition-colors"
        >
          View
        </Link>
      </div>

      {/* Bottom Line */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#B877F7] to-[#A062D5] opacity-70 rounded-b-3xl" />
    </div>
  )
}
