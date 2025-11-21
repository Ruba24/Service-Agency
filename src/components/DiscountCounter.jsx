"use client"
import { useEffect, useState } from "react"

const DiscountCounter = () => {
  const initialTime = 3 * 24 * 60 * 60 + 2 * 60 * 60
  const [timeLeft, setTimeLeft] = useState(initialTime)

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => (prev <= 1 ? initialTime : prev - 1))
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const formatTime = (seconds) => {
    const d = Math.floor(seconds / (3600 * 24))
    const h = Math.floor((seconds % (3600 * 24)) / 3600)
    const m = Math.floor((seconds % 3600) / 60)
    const s = Math.floor(seconds % 60)
    return { d, h, m, s }
  }

  const { d, h, m, s } = formatTime(timeLeft)

  return (
    <section className="relative w-full bg-[#1F102E] py-24 px-4 overflow-hidden rounded-3xl">

      {/* Background Purple Blobs */}
      <div className="absolute -top-32 -left-32 w-72 h-72 bg-[#7B3FBF] opacity-30 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#5A2C91] opacity-20 rounded-full blur-3xl animate-blob animation-delay-4000"></div>

      {/* Section Header */}
      <div className="relative z-10 text-center mb-12">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-white drop-shadow-lg">
          Limited Time <span className="text-[#B877F7]">Offer</span>
        </h2>
        <p className="text-gray-300 mt-3 max-w-3xl mx-auto">
          <strong>Enroll Now </strong> before the price increases
        </p>
      </div>

      {/* Counter Clock Row */}
      <div className="relative z-10 flex justify-center items-center gap-6 flex-wrap w-full px-4">
        {[{ label: "Days", val: d },
          { label: "Hours", val: h },
          { label: "Minutes", val: m },
          { label: "Seconds", val: s }]
          .map((item, index) => (
            <div
              key={index}
              className="w-24 sm:w-28 h-28 sm:h-32 flex flex-col items-center justify-center
              bg-gradient-to-br from-[#7B3FBF] via-[#B877F7] to-[#C288FF]
              rounded-2xl shadow-[0_0_12px_rgba(184,119,247,0.6)] border border-purple-800
              text-white font-extrabold text-3xl sm:text-4xl tracking-widest
              transition-transform duration-300 hover:scale-105 animate-pulse"
            >
              <div>{item.val}</div>
              <div className="text-sm text-purple-200 mt-1 font-medium">{item.label}</div>
            </div>
          ))}
      </div>
    </section>
  )
}

export default DiscountCounter
