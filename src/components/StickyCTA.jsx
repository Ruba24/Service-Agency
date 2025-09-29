'use client'

import Link from 'next/link'
import { FaArrowRight } from 'react-icons/fa'
import { useEffect, useState } from 'react'

const StickyCTA = () => {
  const [showCTA, setShowCTA] = useState(false)

  useEffect(() => {
    // Smooth slide-in on page load
    const timer = setTimeout(() => setShowCTA(true), 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div
      className={`fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-700 ${
        showCTA ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
      }`}
    >
      <Link
        href="/contact"
        className="flex items-center gap-3 bg-gradient-to-r from-[#B877F7] to-[#9e5de0] text-white font-bold px-6 py-3 rounded-full shadow-xl hover:scale-105 hover:shadow-2xl transition-transform duration-300"
      >
        <span className="text-lg md:text-xl">Request Service</span>
        <FaArrowRight size={18} />
      </Link>
    </div>
  )
}

export default StickyCTA
