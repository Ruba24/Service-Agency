'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { client } from '../../../sanity/lib/client'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'

export default function ContactPage() {
  const [activeTab, setActiveTab] = useState('services')
  const [services, setServices] = useState([])
  const [paidCourses, setPaidCourses] = useState([])

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    selectedOption: '',
    business: '',
    website: '',
    budget: '',
    details: '',
    mode: '',
    experience: '',
    goals: '',
    price: '',
  })

  useEffect(() => {
    const fetchData = async () => {
      const data = await client.fetch(`
          *[_type == "service"]{
            title
          }
        `)
      setServices(data)
    }
    const fetchCourses = async () => {
      const data = await client.fetch(
        `*[_type == "course"] | order(_createdAt desc){
            _id,
            title,
            price,
          }`
      )
      setPaidCourses(data || [])
    }

    fetchData()
    fetchCourses()
    console.log("services", services, "\ncourses", paidCourses);
  }, [])

  const handleChange = (e) => {
  const { name, value } = e.target

  if (name === 'selectedOption' && activeTab === 'courses') {
    const selectedCourse = paidCourses.find(course => course.title === value)

    setFormData((prev) => ({
      ...prev,
      selectedOption: value,
      price: selectedCourse ? selectedCourse.price : '',
    }))
  } else {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }
}

  const handleWhatsApp = () => {
    const message = `Hello, I'm interested in ${activeTab === 'services' ? 'a service' : 'a course'
      }.

Name: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}
Phone: ${formData.phone}
${activeTab === 'services'
        ? `Service: ${formData.selectedOption}
Business: ${formData.business}
Website: ${formData.website}
Budget: ${formData.budget}
Details: ${formData.details}`
        : `Course: ${formData.selectedOption}
Mode: ${formData.mode}
Experience: ${formData.experience}
Goals: ${formData.goals}`
      }`

    window.open(`https://wa.me/923088622067?text=${encodeURIComponent(message)}`, '_blank')
  }

  const handleEmail = () => {
    const subject = `Consultation Request: ${activeTab === 'services' ? 'Service' : 'Course'}`
    const body =
      `Name: ${formData.firstName} ${formData.lastName}\nEmail: ${formData.email}\nPhone: ${formData.phone}\n` +
      (activeTab === 'services'
        ? `Service: ${formData.selectedOption}\nBusiness: ${formData.business}\nWebsite: ${formData.website}\nBudget: ${formData.budget}\nDetails: ${formData.details}`
        : `Course: ${formData.selectedOption}\nMode: ${formData.mode}\nExperience: ${formData.experience}\nGoals: ${formData.goals}`)

    window.location.href = `mailto:rubaqazi2000@gmail.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`
  }

  const serviceOptions = ['Web Development', 'UI/UX Design', 'Mobile App Development', 'Digital Marketing', 'Ecommerce Setup', 'Brand Strategy']
  const courseOptions = ['Shopify Mastery', 'Facebook Ads Bootcamp', 'UI/UX Fundamentals', 'SEO for Beginners']

  const renderForm = () => (
    <motion.div
      key={activeTab}
      initial={{ opacity: 0 }}
      animate={{ opacity: 2 }}
      transition={{ duration: 0.5 }}
      className="grid gap-5"
    >
      <div className="grid sm:grid-cols-2 gap-5">
        <Input name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" />
        <Input name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Second Name" />
        <Input name="email" value={formData.email} onChange={handleChange} placeholder="Email Address" />
        <Input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number" />

        <Select
          name="selectedOption"
          value={formData.selectedOption}
          onChange={handleChange}
          options={activeTab === 'services' ? services.map(service => service.title) : paidCourses.map(course => course.title)}
          placeholder={activeTab === 'services' ? 'Select a Service' : 'Select a Course'}
        />
        <Input name="business" value={formData.business} onChange={handleChange} placeholder="Business Name" />
        <Input name="website" value={formData.website} onChange={handleChange} placeholder="Website (If any)" />
        {activeTab === 'services' ? (
          <Select
            name="budget"
            value={formData?.budget}
            onChange={handleChange}
            options={['< $500', '$500 - $1000', '$1000 - $3000', '$3000+']}
            placeholder="Project Budget"
          />
        ) : (
          <Input
            name="price"
            value={formData?.price}
            placeholder="Course Price"
            onChange={() => { }}
            readOnly
          />
        )}

      </div>

      <Textarea
        name="details"
        value={formData?.details}
        onChange={handleChange}
        placeholder={
          activeTab === 'services'
            ? 'Tell us about your project'
            : 'What are your goals with this course?'
        }
      />

      <div className="flex justify-center sm:justify-start gap-4 mt-2">
        <button
          onClick={handleEmail}
          className="bg-[#B877F7] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#A062D5] transition"
        >
          Send Email
        </button>
        <button
          onClick={handleWhatsApp}
          className="border border-[#B877F7] text-[#1F102E] px-6 py-3 rounded-full font-semibold hover:bg-[#B877F7]/10 transition"
        >
          Chat on <span className="text-[#25D366] font-bold">WhatsApp</span>
        </button>
      </div>
    </motion.div>
  )

  return (
    <div className="bg-[#F9F6FF] min-h-screen w-full flex flex-col justify-between">
      <Navbar />

      <section className="relative w-full px-4 sm:px-10 py-20 flex-grow">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#B877F7] opacity-20 rounded-full blur-3xl z-0" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#B877F7] opacity-10 rounded-full blur-3xl z-0" />

        <div className="relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row gap-10 items-center justify-between">
          <div className="flex-1 text-center lg:text-left flex flex-col justify-center">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-[#1F102E] leading-tight">
              Book a <span className="text-[#B877F7]">Free Consultation</span>
            </h2>
            <p className="text-[#6B7280] mt-4 text-lg">
              Connect with our experts to elevate your brand with design, tech, and strategy.
            </p>
          </div>

          <div className="flex-1 bg-white rounded-3xl shadow-xl border border-gray-100 p-8 w-full max-w-xl">
            <div className="flex justify-center sm:justify-start gap-0 border border-[#B877F7] rounded-full overflow-hidden w-fit mb-4">
              <button
                onClick={() => setActiveTab('services')}
                className={`px-6 py-2 text-sm font-medium transition-all ${activeTab === 'services' ? 'bg-[#B877F7] text-white' : 'bg-transparent text-[#1F102E] hover:bg-[#B877F7]/10'
                  }`}
              >
                Services
              </button>
              <button
                onClick={() => setActiveTab('courses')}
                className={`px-6 py-2 text-sm font-medium transition-all ${activeTab === 'courses' ? 'bg-[#B877F7] text-white' : 'bg-transparent text-[#1F102E] hover:bg-[#B877F7]/10'
                  }`}
              >
                Courses
              </button>
            </div>

            <div className="min-h-[540px]">{renderForm()}</div>
          </div>
        </div>
      </section>

      <div className="mt-10 w-full">
        <Footer />
      </div>
    </div>
  )
}

const Input = ({ name, value, onChange, placeholder }) => (
  <input
    name={name}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white text-[#1F102E] focus:outline-none focus:ring-2 focus:ring-[#B877F7] transition"
  />
)

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

const Textarea = ({ name, value, onChange, placeholder }) => (
  <textarea
    name={name}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    rows={4}
    className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white text-[#1F102E] focus:outline-none focus:ring-2 focus:ring-[#B877F7] transition resize-none"
  />
)