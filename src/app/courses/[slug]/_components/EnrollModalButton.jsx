"use client";

import { useState } from "react";
import EnrollModal from "@/components/EnrollModal";

const EnrollModalButton = ({ course, children }) => {
  const [selectedCourse, setSelectedCourse] = useState(null);

  return (
    <>
      <button
        onClick={() => setSelectedCourse(course)}
        className="relative inline-block cursor-pointer border-0 bg-transparent p-0"
      >
        {/* ✅ this ensures styled content (children) actually renders */}
        {children ? children : (
          <span className="px-6 py-2 bg-black text-white rounded-full">
            Enroll Now
          </span>
        )}
      </button>

      {selectedCourse && (
        <EnrollModal
          course={course}
          onClose={() => setSelectedCourse(null)}
        />
      )}
    </>
  );
};

export default EnrollModalButton;
