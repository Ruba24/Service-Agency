'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

const Consultation = () => {
  const [activeTab, setActiveTab] = useState('services')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    selectedOption: '',
  })

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleWhatsApp = () => {
    const message = `Hello, I'm interested in ${
      activeTab === 'services' ? 'a service' : 'a course'
    }.\n\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\n${
      activeTab === 'services' ? 'Service' : 'Course'
    }: ${formData.selectedOption}`

    window.open(`https://wa.me/923XXXXXXXXX?text=${encodeURIComponent(message)}`, '_blank')
  }

  const handleEmail = () => {
    const subject = `Consultation Request: ${activeTab === 'services' ? 'Service' : 'Course'}`
    const body = `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\n${
      activeTab === 'services' ? 'Service' : 'Course'
    }: ${formData.selectedOption}`

    window.location.href = `mailto:your@email.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`
  }

  const serviceOptions = ['Web Development', 'UI/UX Design', 'Mobile App Development', 'Digital Marketing', 'Ecommerce Setup', 'Brand Strategy']
  const courseOptions = ['Shopify Mastery', 'Facebook Ads Bootcamp', 'UI/UX Fundamentals', 'SEO for Beginners']

  const renderForm = () => (
  <motion.div
    key={activeTab}
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    className="grid gap-5"
  >
    <div className="grid sm:grid-cols-2 gap-5">
      <Input name="firstName" value={formData.firstName || ''} onChange={handleChange} placeholder="First Name" />
      <Input name="lastName" value={formData.lastName || ''} onChange={handleChange} placeholder="Second Name" />
      <Input name="email" value={formData.email} onChange={handleChange} placeholder="Email Address" />
      <Input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number" />
      <Select
        name="selectedOption"
        value={formData.selectedOption}
        onChange={handleChange}
        options={activeTab === 'services' ? serviceOptions : courseOptions}
        placeholder={activeTab === 'services' ? 'Select a Service' : 'Select a Course'}
      />
      <Input name="business" value={formData.business || ''} onChange={handleChange} placeholder="Business Name" />
      <Input name="website" value={formData.website || ''} onChange={handleChange} placeholder="Website (If any)" />
      <Select
        name="budget"
        value={formData.budget || ''}
        onChange={handleChange}
        options={['< $500', '$500 - $1000', '$1000 - $3000', '$3000+']}
        placeholder="Project Budget"
      />
    </div>

    {/* Textarea at full width */}
    <Textarea
      name="details"
      value={formData.details || ''}
      onChange={handleChange}
      placeholder={
        activeTab === 'services'
          ? 'Tell us about your project'
          : 'What are your goals with this course?'
      }
    />
  </motion.div>
)


  return (
    <section className="relative w-full bg-[#F9F6FF] py-20 px-4 sm:px-10 min-h-screen">
      {/* Blob Background */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#B877F7] opacity-20 rounded-full blur-3xl z-0"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#B877F7] opacity-10 rounded-full blur-3xl z-0"></div>

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row gap-10 items-center">
        {/* Left Side Info */}
        <div className="flex-1 text-center lg:text-left">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-[#1F102E] leading-tight">
            Book a <span className="text-[#B877F7]">Free Consultation</span>
          </h2>
          <p className="text-[#6B7280] mt-4 max-w-lg text-lg">
            Connect with our experts to elevate your brand with design, tech, and strategy.
          </p>
          <div className="mt-6 flex justify-center lg:justify-start gap-3">
            <button
              onClick={() => setActiveTab('services')}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === 'services' ? 'bg-[#B877F7] text-white' : 'bg-white border border-gray-300 text-[#1F102E]'
              }`}
            >
              Services
            </button>
            <button
              onClick={() => setActiveTab('courses')}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === 'courses' ? 'bg-[#B877F7] text-white' : 'bg-white border border-gray-300 text-[#1F102E]'
              }`}
            >
              Courses
            </button>
          </div>
        </div>

        {/* Right Side Form Card */}
        <div className="flex-1 bg-white rounded-3xl shadow-xl border border-gray-100 p-8 w-full max-w-xl">
          {renderForm()}
          <div className="flex justify-center sm:justify-start gap-4 mt-8">
            <button
              onClick={handleEmail}
              className="bg-[#B877F7] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#A062D5] transition"
            >
              Send Email
            </button>
            <button
              onClick={handleWhatsApp}
              className="border border-[#B877F7] text-[#B877F7] px-6 py-3 rounded-full font-semibold hover:bg-white transition"
            >
              Chat on WhatsApp
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Consultation

// Reusable Input
const Input = ({ name, value, onChange, placeholder }) => (
  <input
    name={name}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white text-[#1F102E] focus:outline-none focus:ring-2 focus:ring-[#B877F7] transition"
  />
)

// Reusable Select
const Select = ({ name, value, onChange, options, placeholder }) => (
  <select
    name={name}
    value={value}
    onChange={onChange}
    className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white text-[#1F102E] focus:outline-none focus:ring-2 focus:ring-[#B877F7] transition"
  >
    <option value="">{placeholder}</option>
    {options.map((option) => (
      <option key={option} value={option}>
        {option}
      </option>
    ))}
  </select>
)
