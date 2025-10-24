"use client";

import { useState } from "react";

const CourseDescription = ({ description }) => {
  const [showFullDesc, setShowFullDesc] = useState(false)

  return (
    <p className="text-lg text-gray-700 mb-4">
      {description.length > 300 ? (
        <>
          {showFullDesc
            ? course.description
            : `${description.substring(0, 300)}...`}
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
  )
}

export default CourseDescription