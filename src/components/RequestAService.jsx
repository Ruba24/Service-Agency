// "use client"
// import Link from "next/link"
// import { motion } from "framer-motion"

// export default function RequestAServiceButton() {
//   return (
//     <motion.div
//       className="relative inline-block group"
//       animate={{ scale: [1, 1.12, 1] }}   // 👈 exaggerated on purpose
//       transition={{
//         duration: 2,
//         repeat: Infinity,
//         ease: "easeInOut",
//       }}
//     >
//       <Link href="/contact">
//         <span
//           className="
//             relative z-10
//             px-6 py-3 md:px-8 md:py-4
//             rounded-full
//             bg-gradient-to-r from-[#FFBF00] via-[#A062D5] to-[#FFBF00]
//             bg-[length:200%_200%]
//             font-semibold text-white
//             shadow-lg cursor-pointer
//             hover:shadow-purple-400/40
//             hover:ring-2 hover:ring-[#B877F7]
//           "
//         >
//           Request A Service
//         </span>
//       </Link>

//       {/* Glow */}
// <span
//   className="
//     absolute inset-0
//     rounded-full
//     bg-gradient-to-r from-[#B877F7] via-[#D6A4F7] to-[#FFDB58]
//     blur-xl
//     opacity-70
//     scale-110
//   "
// />

//     </motion.div>
//   )
// }
'use client'
import Link from "next/link"
import { motion } from "framer-motion"

export default function RequestAServiceButton({ small }) {
  return (
    <motion.div
      className="relative inline-block group"
      animate={small ? undefined : { scale: [1, 1.12, 1] }} // disable zoom for small
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    >
      <Link href="/contact">
        <span
          className={`
            relative z-10
            rounded-full
            bg-gradient-to-r from-[#FFBF00] via-[#A062D5] to-[#FFBF00]
            bg-[length:200%_200%]
            font-semibold text-white
            shadow-lg cursor-pointer
            hover:shadow-purple-400/40
            hover:ring-2 hover:ring-[#B877F7]
            ${small 
              ? 'px-3 py-1.5 text-xs md:px-4 md:py-2 md:text-sm' 
              : 'px-6 py-3 md:px-8 md:py-4 text-sm md:text-base'
            }
          `}
        >
          Request A Service
        </span>
      </Link>

      {/* Glow */}
      <span
        className="
          absolute inset-0
          rounded-full
          bg-gradient-to-r from-[#B877F7] via-[#D6A4F7] to-[#FFDB58]
          blur-xl
          opacity-70
          scale-110
        "
      />
    </motion.div>
  )
}
