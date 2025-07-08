'use client'

import { motion } from 'framer-motion'

const ServiceCard = ({ service, index }) => {
  return (
    <motion.div
      className="relative group bg-white rounded-3xl p-6 overflow-hidden border border-gray-200 shadow-md transition-all duration-300 hover:shadow-xl hover:border-[#B877F7]"
      whileHover={{ scale: 1.03 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {/* Accent Gradient Corner Blob */}
      <div className="absolute -top-5 -right-5 w-24 h-24 bg-gradient-to-br from-[#B877F7] to-[#A062D5] rounded-full opacity-20 blur-2xl z-0" />

      {/* Icon with Glowing Ring */}
      <div className="relative z-10 w-16 h-16 mb-4 flex items-center justify-center bg-white rounded-full shadow-inner border-2 border-[#B877F7] group-hover:shadow-lg transition">
        <div className="text-2xl text-[#B877F7]">{service.icon}</div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <h3 className="text-xl font-bold text-[#1F102E] mb-2 group-hover:text-[#B877F7] transition-colors duration-300">
          {service.title}
        </h3>
        <p className="text-[#6B7280] text-sm leading-relaxed">{service.desc}</p>
      </div>

      {/* Bottom Accent Line */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#B877F7] to-[#A062D5] opacity-70 rounded-b-3xl" />
    </motion.div>
  )
}

export default ServiceCard
