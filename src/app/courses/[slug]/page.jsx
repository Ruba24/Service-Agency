'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { client } from '../../../../sanity/lib/client'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ToolsSlider from '@/components/ToolsSlider'
import { PortableText } from '@portabletext/react'
import Testimonials from '@/components/Testimonials'
import FAQ from '@/components/FAQ'

const CourseDetailPage = () => {
  const { slug } = useParams()
  const [course, setCourse] = useState(null)
  const [testimonials, setTestimonials] = useState([])
  const [faqs, setFaqs] = useState([])
  const [showFullDesc, setShowFullDesc] = useState(false)

  useEffect(() => {
    if (!slug) return

    const fetchCourseData = async () => {
      // Fetch course with references to tools, faqs, and testimonials
      const query = `
  *[_type == "course" && slug.current == $slug][0]{
    title,
    description,
    "slug": slug.current,
    "imageUrl": image.asset->url,
    tools[]->{
      title,
      "logo": image.asset->url
    },
    faqs[]{
      question,
      answer
    }
  }
`

      const data = await client.fetch(query, { slug })
      if (data) {
        setCourse(data)
        setFaqs(data.faqs || [])
        setTestimonials(data.testimonials || [])
      }
    }

    fetchCourseData()
  }, [slug])

  if (!course) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading course details...</p>
      </div>
    )
  }

  // Extract plain text from PortableText blocks
  const getPlainText = (blocks) => {
    if (!Array.isArray(blocks)) return ''
    return blocks
      .map(block => (block.children ? block.children.map(child => child.text).join('') : ''))
      .join('\n\n')
  }

  const plainDescription = getPlainText(course.description)

  return (
    <>
      <Navbar />
      <section className="pt-32 px-6 md:px-12 lg:px-24">
        {/* Title */}
        <h1 className="text-4xl font-bold text-gray-900 mb-6">{course.title}</h1>

        {/* Image */}
        {course.imageUrl && (
          <div className="relative w-full h-[400px] mb-8 rounded-2xl overflow-hidden shadow-lg">
            <Image
              src={course.imageUrl}
              alt={course.title}
              fill
              className="object-cover"
            />
          </div>
        )}

        {/* Description */}
        <div className="text-lg text-gray-700 mb-8">
          {plainDescription.length > 300 ? (
            <p>
              {showFullDesc ? plainDescription : `${plainDescription.substring(0, 300)}...`}
              <span
                className="text-purple-600 cursor-pointer ml-2"
                onClick={() => setShowFullDesc(!showFullDesc)}
              >
                {showFullDesc ? ' Show Less' : ' Read More'}
              </span>
            </p>
          ) : (
            <PortableText value={course.description} />
          )}
        </div>

        {/* Tools Slider */}
        {course.tools && course.tools.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Tools we will use</h2>
            <ToolsSlider tools={course.tools} />
          </div>
        )}

        {/* FAQs */}
        {faqs.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
            <FAQ data={faqs} />
          </div>
        )}

        {/* Testimonials */}
        {testimonials.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">What our students say</h2>
            <Testimonials data={testimonials} />
          </div>
        )}
      </section>
      <Footer />
    </>
  )
}

export default CourseDetailPage
