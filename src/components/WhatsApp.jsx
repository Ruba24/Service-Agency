'use client'

import { useEffect, useState } from 'react'
import { FaWhatsapp } from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'

const WhatsappButton = () => {
  const [showText, setShowText] = useState(true)

  // Hide text when scrolling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) setShowText(false)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center space-x-3">
      {/* Animated Text */}
      <AnimatePresence>
        {showText && (
          <motion.span
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 60 }}
            transition={{ duration: 0.4, type: 'spring' }}
            className="bg-gradient-to-r from-green-400 to-green-600 text-white font-extrabold px-4 py-2 rounded-xl shadow-2xl text-lg whitespace-nowrap cursor-pointer animate-bounce"
          >
          Live Queries Now!
          </motion.span>
        )}
      </AnimatePresence>

      {/* WhatsApp Icon */}
      <a
        href="https://wa.me/923088622067"
        target="_blank"
        rel="noopener noreferrer"
        className="relative bg-[#25D366] text-white p-5 rounded-full shadow-lg hover:scale-125 transition-transform duration-300"
        onMouseEnter={() => setShowText(true)}
        onMouseLeave={() => setShowText(false)}
      >
        <FaWhatsapp size={42} />
      </a>
    </div>
  )
}

export default WhatsappButton
