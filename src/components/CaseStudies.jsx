import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { client, urlFor } from '@/lib/sanity'

const query = `*[_type == "caseStudy"] | order(_createdAt desc) {
  _id,
  title,
  slug,
  excerpt,
  mainImage
}`

// const caseStudies = [
//   {
//     id: 1,
//     title: 'Fashion Brand Growth Strategy',
//     slug: 'fashion-brand-growth',
//     excerpt: 'How we helped a clothing brand 3x its revenue through full-funnel marketing.',
//     image: '/images/casestudies/1.jpg',
//   },
//   {
//     id: 2,
//     title: 'Shopify Store Conversion Boost',
//     slug: 'shopify-conversion-boost',
//     excerpt: 'Improved UX and CRO strategies that raised conversion rates by 47%.',
//     image: '/images/casestudies/2.jpg',
//   },
//   {
//     id: 3,
//     title: 'Amazon Sales Acceleration',
//     slug: 'amazon-sales-growth',
//     excerpt: 'Optimized listings and PPC strategy leading to 85% sales lift in 3 months.',
//     image: '/images/casestudies/3.jpg',
//   },
//   {
//     id: 4,
//     title: 'Local Business Digital Launch',
//     slug: 'local-business-digital-launch',
//     excerpt: 'Complete digital transformation of a service-based startup.',
//     image: '/images/casestudies/4.jpg',
//   },
//   {
//     id: 5,
//     title: 'Luxury Brand Identity Overhaul',
//     slug: 'luxury-brand-rebrand',
//     excerpt: 'Redesigned brand identity for a premium leather goods company.',
//     image: '/images/casestudies/5.jpg',
//   },
// ]

const CaseStudyCards = () => {
  const [caseStudies, setCaseStudies] = useState([])

  useEffect(() => {
    client.fetch(query).then((data) => setCaseStudies(data))
  }, [])

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {caseStudies.map((item, index) => (
        <div
          key={index}
          className="bg-white rounded-3xl overflow-hidden shadow-[0_0_10px_rgba(0,0,0,0.05)] hover:shadow-[0_0_25px_rgba(184,119,247,0.3)] transition-all duration-300"
        >
          <Image
            src={item?.mainImage ? urlFor(item.mainImage).url() : '/images/fallback.jpg'}
            alt={item.title}
            width={500}
            height={300}
            className="w-full h-56 object-cover"
          />
          <div className="p-5">
            <h3 className="text-xl font-bold text-[#1F102E] mb-2">{item.title}</h3>
            <p className="text-gray-600 mb-4">{item.excerpt}</p>
            <Link
             href={`/case-studies`}
              className="text-[#B877F7] font-medium hover:underline"
            >
              View Case Study →
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}

export default CaseStudyCards
