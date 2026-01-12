'use client'

import { urlFor } from '@/lib/sanity'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const CaseStudyCards = ({ caseStudies }) => {
  const router = useRouter()

  const handleNavigate = (slug) => {
    if (!slug) return
    // Navigate to the iframe-based detail page
    router.push(`/case-studies/${slug}`)
  }

  return (
    <div
      className="
        flex gap-6 overflow-x-auto pb-4
        sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:overflow-visible
      "
    >
      {caseStudies.map((item, index) => (
        <div
          key={index}
          className="
            bg-white rounded-3xl min-w-[280px] sm:min-w-0
            overflow-hidden shadow-[0_0_10px_rgba(0,0,0,0.05)]
            hover:shadow-[0_0_25px_rgba(184,119,247,0.3)]
            transition-all duration-300 cursor-pointer
          "
          onClick={() => handleNavigate(item.slug?.current)}
        >
          {/* IMAGE */}
          <Image
            src={item?.mainImage ? urlFor(item.mainImage).url() : '/images/fallback.jpg'}
            alt={item.title}
            width={600}
            height={300}
            className="w-full h-56 object-cover"
          />

          {/* CONTENT */}
          <div className="p-5">
            {/* TITLE */}
            <h3 className="text-xl font-bold text-[#1F102E] mb-2">
              {item.title}
            </h3>

            {/* TRUNCATED DESCRIPTION */}
            <p className="text-gray-600 mb-4">
              {item.excerpt
                ? item.excerpt.length > 120
                  ? item.excerpt.slice(0, 120) + '...'
                  : item.excerpt
                : ''}
            </p>

            {/* READ MORE LINK */}
            <span
              onClick={() => handleNavigate(item.slug?.current)}
              className="text-[#B877F7] font-medium hover:underline cursor-pointer"
            >
              Read More →
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default CaseStudyCards
