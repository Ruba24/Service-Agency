'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { client, urlFor } from '@/lib/sanity'
import {
  FaShopify,
  FaGoogle,
  FaFacebook,
  FaTrello,
  FaAmazon,
} from 'react-icons/fa'
import {
  SiHelium,
  SiCanva,
  SiNotion,
  SiWalmart,
  SiZoom,
} from 'react-icons/si'
import { MdOutlineGavel } from 'react-icons/md' // for legal/tax
import { RiAccountPinCircleLine } from 'react-icons/ri' // for reinstatement

// const tools = [
//   { icon: <FaAmazon size={32} color="#FF9900" />, name: 'Amazon Seller' },
//   { icon: <SiHelium size={32} color="#0F75BC" />, name: 'Helium 10' },
//   { icon: <FaShopify size={32} color="#95BF47" />, name: 'Shopify' },
//   { icon: <SiWalmart size={32} color="#0071CE" />, name: 'Walmart Seller' },
//   { icon: <FaFacebook size={32} color="#1877F2" />, name: 'Meta Ads' },
//   { icon: <FaGoogle size={32} color="#4285F4" />, name: 'Google Ads' },
//   { icon: <SiCanva size={32} color="#00C4CC" />, name: 'Canva' },
//   { icon: <MdOutlineGavel size={32} color="#7D3C98" />, name: 'LegalZoom' },
//   { icon: <RiAccountPinCircleLine size={32} color="#5D6D7E" />, name: 'Reinstatement Tool' },
//   { icon: <SiZoom size={32} color="#2D8CFF" />, name: 'Zoom' },
//   { icon: <FaTrello size={32} color="#0079BF" />, name: 'Trello' },
//   { icon: <SiNotion size={32} color="#000000" />, name: 'Notion' },
// ]

const iconMap = {
  amazon: <FaAmazon size={32} color="#FF9900" />,
  shopify: <FaShopify size={32} color="#95BF47" />,
  google: <FaGoogle size={32} color="#4285F4" />,
  facebook: <FaFacebook size={32} color="#1877F2" />,
  helium10: <SiHelium size={32} color="#0F75BC" />,
  walmart: <SiWalmart size={32} color="#0071CE" />,
  canva: <SiCanva size={32} color="#00C4CC" />,
  legalzoom: <MdOutlineGavel size={32} color="#7D3C98" />,
  reinstatement: <RiAccountPinCircleLine size={32} color="#5D6D7E" />,
  zoom: <SiZoom size={32} color="#2D8CFF" />,
  trello: <FaTrello size={32} color="#0079BF" />,
  notion: <SiNotion size={32} color="#000000" />
}


const ToolSlider = ({ tools: courseTools, title = "Ecommerce Tools We Use" }) => {
  const [tools, setTools] = useState([])

  useEffect(() => {
    if (courseTools && courseTools.length > 0) {
      setTools(courseTools)
      return
    }
    const fetchTools = async () => {
      const query = `*[_type == "tool"] | order(_createdAt asc) {
        name,
        icon,
        color
      }`
      const data = await client.fetch(query)
      setTools(data)
    }

    fetchTools()
  }, [])
  const repeated = [...tools, ...tools, ...tools, ...tools]
   if (!tools || tools.length === 0) return null

  return (
    <section className="bg-white py-10 overflow-hidden">
      <h2 className="text-3xl font-bold text-center text-[#1F102E] mb-8">
        {title}
      </h2>

      <div className="overflow-hidden w-screen relative left-[50%] right-[50%] -mx-[50vw] group">
        <div className="animate-marquee whitespace-nowrap flex">
          {repeated.map((tool, index) => (
            <div
              key={index}
              className="inline-flex flex-col items-center text-[#1F102E] w-[200px] px-4"
            >
              <div className="bg-gray-100 p-4 rounded-full shadow">
                {iconMap[tool.icon] || <FaShopify size={32} color="#95BF47" />}
              </div>
              <p className="text-sm font-medium mt-2 text-center leading-tight">
                {tool.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ToolSlider
