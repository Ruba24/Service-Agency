"use client";

import EnrollModal from "@/components/EnrollModal";
import { useState } from "react"

const EnrollModalButton = ({ course }) => {

  const [selectedCourse, setSelectedCourse] = useState(null)

  return (
    <>
      <button onClick={() => {
        setSelectedCourse(course)
      }}>Enroll Now</button>
      {
        selectedCourse && (
          <EnrollModal
            course={course}
            onClose={() => setSelectedCourse(null)}
          />
        )
      }
    </>
  )
}

export default EnrollModalButton