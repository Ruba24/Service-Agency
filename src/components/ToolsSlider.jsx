'use client'

import React from 'react'
import Image from 'next/image'

const ToolsSlider = ({ tools }) => {
  if (!tools || tools.length === 0) return null

  // Repeat many times for continuous effect
  const repeatedTools = [...tools, ...tools, ...tools, ...tools]

  return (
    <section className="bg-white py-10 overflow-hidden relative w-screen left-1/2 right-1/2 -mx-[50vw]">
      <h2 className="text-3xl font-bold text-center text-[#1F102E] mb-8">
        Tools You’ll Be <span className="text-[#B877F7]">Using</span>
      </h2>

      <div className="overflow-hidden">
        {/* animate-marquee for infinite scroll */}
        <div className="flex whitespace-nowrap animate-marquee">
          {repeatedTools.map((tool, index) => (
            <div
              key={index}
              className="inline-flex flex-col items-center text-[#1F102E] w-[180px] px-4"
            >
              <div className="w-24 h-24 rounded-xl overflow-hidden shadow-md bg-gray-100 flex items-center justify-center">
                <Image
                  src={`/tools/${tool}.png`}
                  alt={tool}
                  width={80}
                  height={80}
                  className="object-contain"
                />
              </div>
              <p className="text-sm font-medium mt-2 text-center leading-tight">
                {tool}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ToolsSlider
