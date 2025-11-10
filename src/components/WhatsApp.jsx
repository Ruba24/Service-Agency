'use client'

import { useState } from 'react'
import { FaWhatsapp, FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'

const WhatsappButton = () => {
  const [showSocials, setShowSocials] = useState(false)

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center space-x-3">

      {/* ✅ Live Queries ALWAYS visible & fixed */}
      <motion.span
        initial={{ scale: 1 }}
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
        className="bg-gradient-to-r from-green-400 to-green-600 text-white font-extrabold px-4 py-2 rounded-xl shadow-2xl text-lg whitespace-nowrap"
      >
        Live Queries Now!
      </motion.span>

      {/* ✅ WhatsApp + Social Icon Wrapper */}
      <div
        className="relative flex flex-col items-center"
        onMouseEnter={() => setShowSocials(true)}
        onMouseLeave={() => setShowSocials(false)}
      >
        {/* ✅ Social Icons appear ABOVE (absolute, no layout shift) */}
        <AnimatePresence>
          {showSocials && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: -10 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="absolute bottom-full mb-3 flex flex-col items-center space-y-3"
            >
              <motion.a
                href="#"
                whileHover={{ scale: 1.2 }}
                className="bg-blue-600 text-white p-3 rounded-full shadow-lg"
              >
                <FaFacebookF size={35} />
              </motion.a>

              <motion.a
                href="#"
                whileHover={{ scale: 1.2 }}
                className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white p-3 rounded-full shadow-lg"
              >
                <FaInstagram size={35} />
              </motion.a>

              <motion.a
                href="#"
                whileHover={{ scale: 1.2 }}
                className="bg-blue-700 text-white p-3 rounded-full shadow-lg"
              >
                <FaLinkedinIn size={35} />
              </motion.a>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ✅ WhatsApp Button */}
        <a
          href="https://wa.me/923088622067"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#25D366] text-white p-5 rounded-full shadow-lg hover:scale-125 transition-transform duration-300 cursor-pointer"
        >
          <FaWhatsapp size={35} />
        </a>
      </div>
    </div>
  )
}

export default WhatsappButton
