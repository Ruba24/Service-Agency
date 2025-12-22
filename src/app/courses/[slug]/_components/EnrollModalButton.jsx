"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import EnrollModal from "@/components/EnrollModal";

const EnrollModalButton = ({ course, children }) => {
  const [selectedCourse, setSelectedCourse] = useState(null);

  return (
    <>
      <motion.button
        onClick={() => setSelectedCourse(course)}
        className="relative inline-block cursor-pointer border-0 bg-transparent p-0"
        animate={{ scale: [1, 1.08, 1] }}
        transition={{
          duration: 2.6,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      >
        {/* Styled content */}
        {children ? (
          children
        ) : (
          <span className="px-6 py-2 bg-black text-white rounded-full">
            Enroll Now
          </span>
        )}
      </motion.button>

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
