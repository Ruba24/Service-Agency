'use client'

import { FaWhatsapp } from 'react-icons/fa'

const WhatsappButton = () => {
  return (
    <a
      href="https://wa.me/923088622067" // Replace with your number
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:scale-110 transition transform"
    >
      <FaWhatsapp size={24} />
    </a>
  )
}

export default WhatsappButton
