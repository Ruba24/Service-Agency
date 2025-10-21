'use client'
export default function CourseDetailsModal({ course, onClose, onEnroll }) {
  if (!course) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-xl max-w-lg w-full p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4">✕</button>

        <h2 className="text-lg font-bold mb-2">{course.title}</h2>
        <p className="text-gray-700 mb-4">{course.description}</p>
        <p className="font-semibold text-md text-[#B877F7] mb-6">
          Worth: ${course.price}
        </p>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded border"
          >
            Close
          </button>
          <button
            onClick={() => onEnroll(course)}
            className="px-4 py-2 rounded bg-[#B877F7] text-white"
          >
            Enroll
          </button>
        </div>
      </div>
    </div>
  )
}