'use client'

import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/lib/sanity'
import { useEffect, useRef } from 'react'

const CaseStudyCards = ({ caseStudies }) => {
  const sliderRef = useRef(null)

  useEffect(() => {
    const slider = sliderRef.current
    if (!slider) return

    let scrollAmount = 0
    const speed = 2 // 👉 increase for faster movement

    const scroll = () => {
      scrollAmount += speed
      slider.scrollLeft = scrollAmount

      // reset for infinite loop
      if (slider.scrollLeft >= slider.scrollWidth / 2) {
        slider.scrollLeft = 0
        scrollAmount = 0
      }

      requestAnimationFrame(scroll)
    }

    requestAnimationFrame(scroll)
  }, [])

  return (
    <>
      {/* ✅ MOBILE SLIDER */}
      <div
        ref={sliderRef}
        className="flex gap-6 overflow-hidden sm:hidden"
      >
        {[...caseStudies, ...caseStudies].map((item, index) => (
          <div
            key={index}
            className="min-w-[85%] bg-white rounded-3xl overflow-hidden
            shadow-[0_0_10px_rgba(0,0,0,0.05)]
            hover:shadow-[0_0_25px_rgba(184,119,247,0.3)]
            transition-all duration-300"
          >
            <Image
              src={item?.mainImage ? urlFor(item.mainImage).url() : '/images/fallback.jpg'}
              alt={item.title}
              width={500}
              height={300}
              className="w-full h-56 object-cover"
            />
            <div className="p-5">
              <h3 className="text-xl font-bold text-[#1F102E] mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 mb-4">
                {item.excerpt}
              </p>
              <Link
                href={item.url || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#B877F7] font-medium hover:underline"
              >
                View Case Study →
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ DESKTOP GRID */}
      <div className="hidden sm:grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {caseStudies.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-3xl overflow-hidden
            shadow-[0_0_10px_rgba(0,0,0,0.05)]
            hover:shadow-[0_0_25px_rgba(184,119,247,0.3)]
            transition-all duration-300"
          >
            <Image
              src={item?.mainImage ? urlFor(item.mainImage).url() : '/images/fallback.jpg'}
              alt={item.title}
              width={500}
              height={300}
              className="w-full h-56 object-cover"
            />
            <div className="p-5">
              <h3 className="text-xl font-bold text-[#1F102E] mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 mb-4">
                {item.excerpt}
              </p>
              <Link
                href={item.url || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#B877F7] font-medium hover:underline"
              >
                View Case Study →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default CaseStudyCards
