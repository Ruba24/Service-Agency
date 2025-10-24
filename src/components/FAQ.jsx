'use client'

import { useState } from 'react'
import { FaChevronDown } from 'react-icons/fa'


const FaqsSection = ({ faqs, description = "Got questions? We’ve got answers to help you understand how ZELLVERSE works." }) => {
  const [activeIndex, setActiveIndex] = useState(null)

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index)
  }
  if (!faqs || faqs.length === 0) return null

  return (
    <section className="relative w-full bg-[#F9F6FF] py-20 px-4 sm:px-10 overflow-hidden" id="faqs">
      {/* Light decorative blobs */}
      <div className="absolute -top-16 -left-16 w-72 h-72 bg-[#B877F7] opacity-20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-[#B877F7] opacity-20 rounded-full blur-2xl" />

      <div className="relative z-10 max-w-5xl mx-auto text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1F102E]">
          Frequently <span className="text-[#B877F7]">Asked Questions</span>
        </h2>
        <p className="text-[#6B7280] mt-3 max-w-2xl mx-auto">
          {description}
        </p>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto space-y-6">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-2xl p-5 shadow-md cursor-pointer transition-all"
            onClick={() => toggleFAQ(index)}
          >
            <div className="flex justify-between items-center">
              <h4 className="text-lg font-semibold text-[#1F102E]">
                {faq.question}
              </h4>
              <FaChevronDown
                className={`text-[#B877F7] transition-transform duration-300 ${
                  activeIndex === index ? 'rotate-180' : ''
                }`}
              />
            </div>
            {activeIndex === index && (
              <p className="text-[#6B7280] mt-4 text-sm leading-relaxed">
                {faq.answer}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

export default FaqsSection
