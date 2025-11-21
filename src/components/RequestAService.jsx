// import React from "react";

// export default function RequestAService() {
//   return (
//     <div>
//       <button className="bg-[#B877F7] text-white rounded-full px-6 py-3">
//         <a href="/contact">Request A Service</a>
//       </button>
//     </div>
//   );
// }

"use client"
import Link from "next/link"

export default function RequestAServiceButton() {
  return (
    <div className="relative inline-block">
      <Link href="/contact">
        <span
          className="relative z-10 px-6 py-3 md:px-8 md:py-4 rounded-full
          bg-gradient-to-r from-[#FFBF00] via-[#A062D5] to-[#FFBF00]
          bg-[length:200%_200%] font-semibold text-white
          animate-shimmer transition-all duration-500 ease-in-out shadow-lg cursor-pointer
          hover:shadow-purple-400/40 hover:ring-2 hover:ring-[#B877F7]"
        >
          Request A Service
        </span>
      </Link>
      <span
        className="absolute -inset-[3px] rounded-full bg-gradient-to-r 
        from-[#B877F7] via-[#D6A4F7] to-[#FFDB58] blur-md opacity-70 
        group-hover:opacity-100 transition duration-500 animate-pulse-slow"
      ></span>
    </div>
  )
}
