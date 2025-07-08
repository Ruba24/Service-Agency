'use client'

import { useEffect, useState } from 'react'

const stats = [
  { id: 1, label: 'Clients', end: 320 },
  { id: 2, label: 'Projects Delivered', end: 850 },
  { id: 3, label: 'Our Ranking', end: 5 },
]

const Achievements = () => {
  const [counts, setCounts] = useState(stats.map(() => 0))

  useEffect(() => {
    const intervals = stats.map((stat, index) => {
      return setInterval(() => {
        setCounts((prev) => {
          const updated = [...prev]
          if (updated[index] < stat.end) {
            updated[index] += Math.ceil(stat.end / 100)
          } else {
            updated[index] = stat.end
          }
          return updated
        })
      }, 30)
    })

    return () => intervals.forEach(clearInterval)
  }, [])

  return (
    <section className="w-full bg-[#1F102E] text-white py-20 px-4 sm:px-10">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
          Our <span className="text-[#B877F7]">Achievements</span>
        </h2>
        <p className="text-[#E2E8F0] mt-3 max-w-2xl mx-auto">
          Celebrating the milestones we've reached with our incredible clients.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 max-w-5xl mx-auto text-center">
        {stats.map((stat, index) => (
          <div
            key={stat.id}
            className="bg-[#2A1B3D] rounded-3xl py-10 px-6 shadow-lg border border-[#B877F7]/20"
          >
            <h3 className="text-5xl font-bold text-[#B877F7]">
              {counts[index]}+
            </h3>
            <p className="mt-2 text-[#E2E8F0] text-lg">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Achievements
