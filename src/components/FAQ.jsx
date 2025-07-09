'use client'

import { useState } from 'react'
import { FaChevronDown } from 'react-icons/fa'

const faqs = [
  {
    question: 'What services does ZELLVERSE provide?',
    answer:
      'We offer end-to-end eCommerce solutions including web/app development, UI/UX design, digital marketing, branding, and more.',
  },
  {
    question: 'Do you offer consultation before project start?',
    answer:
      'Yes, we offer a free consultation to understand your brand needs and suggest the best strategy to scale your eCommerce business.',
  },
  {
    question: 'How long does a project usually take?',
    answer:
      'Project timelines vary depending on scope, but most projects are delivered within 2–6 weeks.',
  },
  {
    question: 'Can I request a custom service package?',
    answer:
      'Absolutely! We tailor our offerings to meet your specific business goals.',
  },
]

const FaqsSection = () => {
  const [activeIndex, setActiveIndex] = useState(null)

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

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
          Got questions? We’ve got answers to help you understand how ZELLVERSE works.
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
