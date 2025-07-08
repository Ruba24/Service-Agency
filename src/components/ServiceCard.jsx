'use client'

import { motion } from 'framer-motion'

const overlayVariants = {
  hidden: { x: '0%' },
  visible: {
    x: '100%',
    transition: {
      duration: 0.8,
      ease: [0.45, 0, 0.55, 1],
    },
  },
}

const ServiceCard = ({ service, index }) => {
  return (
    <motion.div
      className="relative overflow-hidden bg-white p-6 rounded-2xl shadow-md border border-gray-100 transition-all duration-300 hover:border-[#B877F7] hover:shadow-[0_0_12px_#B877F7]"
      whileHover={{ scale: 1.03 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {/* Overlay Animation */}
      <motion.div
        className="absolute inset-0 bg-[#B877F7] z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        variants={overlayVariants}
      />

      {/* Card Content */}
      <div className="relative z-20">
        <div className="w-14 h-14 flex items-center justify-center bg-gradient-to-tr from-[#B877F7] to-[#A062D5] text-white text-2xl rounded-full shadow-md mb-4">
          {service.icon}
        </div>
        <h3 className="text-xl font-bold text-[#1F102E] mb-2">{service.title}</h3>
        <p className="text-[#6B7280] text-sm">{service.desc}</p>
      </div>
    </motion.div>
  )
}

export default ServiceCard
