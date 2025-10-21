import { client } from "@/lib/sanity"
import { notFound } from "next/navigation"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import CourseClient from "./ClientCourse"

// ✅ Dynamic SEO Metadata from Sanity
export async function generateMetadata({ params }) {
  const { slug } = await params // 👈 fix

  try {
    const data = await client.fetch(
      `*[_type == "course" && slug.current == $slug][0]{
        seoTitle,
        seoDescription,
        seoKeywords,
        "seoImage": seoImage.asset->url,
        title
      }`,
      { slug }
    )

    if (!data) {
      return {
        title: "Course - ZELLVERSE",
        description: "Learn about this course at ZELLVERSE",
      }
    }

    return {
      title: data?.seoTitle || `${data.title} | ZELLVERSE`,
      description: data?.seoDescription || "Learn this course at ZELLVERSE",
      keywords: data?.seoKeywords || [],
      openGraph: {
        title: data?.seoTitle || data.title,
        description: data?.seoDescription || "",
        images: data?.seoImage ? [data.seoImage] : [],
      },
    }
  } catch {
    return {
      title: "Course - ZELLVERSE",
      description: "Learn more about our courses at ZELLVERSE",
    }
  }
}

// ✅ Fetch course data from Sanity
async function getCourse(slug) {
  return await client.fetch(
    `*[_type == "course" && slug.current == $slug][0]{
      title,
      description,
      duration,
      level,
      instructor,
      "gallery": gallery[].asset->url,
      content
    }`,
    { slug }
  )
}

// ✅ Page Component
export default async function CourseDetailPage({ params }) {
  const { slug } = await params // 👈 fix

  const course = await getCourse(slug)
  if (!course) return notFound()

  return (
    <div className="bg-white text-gray-900">
      <Navbar />
      <CourseClient course={course} />
      <Footer />
    </div>
  )
}
