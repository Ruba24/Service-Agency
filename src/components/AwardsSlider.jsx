'use client'

import React, { useEffect, useState } from 'react'
import { client, urlFor } from '@/lib/sanity'

const AwardsSlider = () => {
  const [awards, setAwards] = useState([])
  const [uniqueKey, setUniqueKey] = useState(Date.now()) // 👈 forces re-mount

  useEffect(() => {
    const fetchAwards = async () => {
      const query = `*[_type == "award"]{ name, image }`
      const data = await client.fetch(query)
      setAwards(data || [])
      setUniqueKey(Date.now()) // 👈 reset animation each time awards load
    }
    fetchAwards()
  }, [])

  const repeatedAwards = [...awards, ...awards, ...awards, ...awards]

  return (
    <section key={uniqueKey} className="bg-white py-10 overflow-hidden">
      <h2 className="text-3xl font-bold text-center text-[#1F102E] mb-8">
        Our <span className="text-[#B877F7]">Awards & Recognitions</span>
      </h2>

      <div className="overflow-hidden w-full">
        <div
          className="award-marquee flex"
          style={{
            animation: 'scroll 25s linear infinite',
          }}
        >
          {repeatedAwards.map((award, index) => (
            <div
              key={index}
              className="flex-shrink-0 flex flex-col items-center text-[#1F102E] w-[180px] px-4"
            >
              <div className="w-24 h-24 rounded-full overflow-hidden shadow-md">
                <img
                  src={urlFor(award.image).url()}
                  alt={award.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-sm font-medium mt-2 text-center leading-tight">
                {award.name}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .award-marquee {
          width: max-content;
        }

        .award-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  )
}

export default AwardsSlider
