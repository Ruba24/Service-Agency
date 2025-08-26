"use client"

import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { client } from "../../../../sanity/lib/client"
import { PortableText } from "@portabletext/react"
import Image from "next/image"
import Link from "next/link"
import Footer from "@/components/Footer"
import AwardsSlider from "@/components/AwardsSlider"
import ServiceSlider from "@/components/ServiceLogoSlider"
import Testimonials from "@/components/Testimonials"
import FAQ from "@/components/FAQ"

const CourseDetailPage = () => {
  const { slug } = useParams()
  const [course, setCourse] = useState(null)

  useEffect(() => {
    const fetchCourse = async () => {
      const query = `*[_type == "course" && slug.current == $slug][0]{
        _id,
        title,
        description,
        price,
        slug,
        image
      }`
      const data = await client.fetch(query, { slug })
      setCourse(data)
    }
    if (slug) fetchCourse()
  }, [slug])

  if (!course) return <p className="text-center mt-10">Loading...</p>

  return (
    <div>
      {/* Hero Section */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
        {course.image && (
          <div className="relative w-full h-64 mb-6">
            <Image
              src={course.image}
              alt={course.title}
              fill
              className="object-cover rounded-lg"
            />
          </div>
        )}

        <p className="text-xl font-semibold text-purple-600 mb-6">
          Price: ${course.price}
        </p>

        {/* Full Rich Description */}
        <div className="prose max-w-none text-gray-800 mb-10">
          <PortableText value={course.description} />
        </div>

        <Link
          href="/booking"
          className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
        >
          Book This Course
        </Link>
      </section>

      {/* Related Sections */}
      <AwardsSlider />
      <ServiceSlider />
      <Testimonials />
      <FAQ />
      <Footer />
    </div>
  )
}

export default CourseDetailPage
