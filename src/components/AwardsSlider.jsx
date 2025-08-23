'use client'

import React from 'react'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { client, urlFor } from '@/lib/sanity'

const awards = [
  { image: '/images/awards/award1.png', name: 'Top Amazon Partner' },
  { image: '/images/awards/award2.png', name: 'Best Shopify Agency' },
  { image: '/images/awards/award3.png', name: 'Meta Ads Certified' },
  { image: '/images/awards/award4.png', name: 'Top Ecommerce Growth' },
  { image: '/images/awards/award5.png', name: 'Client Satisfaction Award' },
]

const AwardsSlider = () => {
  const [awards, setAwards] = useState([])

  useEffect(() => {
    const fetchAwards = async () => {
      const query = `*[_type == "award"]{
        name,
        image
      }`
      const data = await client.fetch(query)
      setAwards(data)
    }

    fetchAwards()
  }, [])

  const repeatedAwards = [...awards, ...awards, ...awards]

  return (
    <section className="bg-white py-10 overflow-hidden">
      <h2 className="text-3xl font-bold text-center text-[#1F102E] mb-8">
        Our <span className="text-[#B877F7]">Awards & Recognitions</span>
      </h2>

      <div className="overflow-hidden w-screen relative left-1/2 right-1/2 -mx-[50vw] group">
        <div className="flex whitespace-nowrap animate-award-marquee">
          {repeatedAwards.map((award, index) => (
            <div
              key={index}
              className="inline-flex flex-col items-center text-[#1F102E] w-[180px] px-4"
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
    </section>
  )
}

export default AwardsSlider
