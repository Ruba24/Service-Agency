'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import RequestAServiceButton from './RequestAService'

const ServiceCard = ({ service }) => {
  const router = useRouter()
  console.log('SERVICE SLUG:', service.slug)

  const serviceUrl = `/services/${service.slug}`

  return (
    <div
      className='relative group bg-white rounded-3xl p-6 overflow-hidden border border-gray-200 shadow-md transition-all duration-300 hover:shadow-xl hover:border-[#B877F7] cursor-pointer'
      onClick={() => router.push(serviceUrl)} // card click navigation
    >
      {/* Accent Gradient Blob */}
      <div className="absolute -top-5 -right-5 w-24 h-24 bg-gradient-to-br from-[#B877F7] to-[#A062D5] rounded-full opacity-20 blur-2xl z-0" />

      {/* Icon */}
      <div className="relative z-10 w-16 h-16 mb-4 flex items-center justify-center bg-white rounded-full shadow-inner border-2 border-[#B877F7] group-hover:shadow-lg transition">
        {service.imageUrl ? (
          <Image
            src={service.imageUrl}
            alt={service.title}
            width={100}
            height={100}
            className="rounded-full object-cover w-16 h-16"
          />
        ) : (
          <div className="text-gray-400 text-sm text-center">No Image</div>
        )}
      </div>

      {/* Content */}
      <div className="relative z-10">
        <h3 className="text-xl font-bold text-[#1F102E] mb-2 group-hover:text-[#B877F7] transition-colors duration-300">
          {service.title}
        </h3>
        <p className="text-[#6B7280] text-sm leading-relaxed line-clamp-1">
          {service.desc || 'Description coming soon...'}
        </p>
      </div>

      {/* Bottom Gradient Line */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#B877F7] to-[#A062D5] opacity-70 rounded-b-3xl" />

{/* Top-right button overlay */}
<div
  className="absolute right-4 z-20 cursor-pointer"
  style={{ top: '38px' }}
  onClick={(e) => {
    e.stopPropagation()
    router.push(serviceUrl)
  }}
>
  {/* Disable internal Link click ONLY here */}
  <div className="pointer-events-none">
    <RequestAServiceButton small />
  </div>
</div>


    </div>
  )
}

export default ServiceCard
