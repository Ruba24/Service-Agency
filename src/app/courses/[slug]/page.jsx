import { client } from "@/lib/sanity"
import { notFound } from "next/navigation"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import CourseClient from "./_components/ClientCourse"

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


export async function generateStaticParams() {
  const slugs = await client.fetch(`*[_type == "course" && defined(slug.current)][0...100].slug.current`);

  return slugs
    ? slugs.filter((slug) => slug !== null).map((slug) => ({ slug }))
    : [];
}


// ✅ Fetch course data from Sanity
async function getCourse(slug) {
  return await client.fetch(
    `*[_type == "course" && slug.current == $slug][0]{
      title,
      "description": pt::text(description),
      slug,
      icon,
      price,
      duration,
      level,
      "imageUrl": image.asset->url,
      "gallery": gallery[].asset->url,
      "testimonials": *[_type == "testimonial" && references(^._id)]{
        _id,
        name,
        role,
        quote,
        rating,
        clientImage
      },
      "tools": *[_type == "tool" && references(^._id)]{
        _id,
        name,
        icon,
        color
      }
    }`,
  { slug }
  )
}

// ✅ Page Component
export default async function CourseDetailPage({ params }) {
  const { slug } = await params // 👈 fix

  const course = await getCourse(slug)
  if (!course?.slug) return notFound()

  console.log({ course });
  

  return (
    <div className="bg-white text-gray-900">
      <Navbar />
      <CourseClient course={course} />
      <Footer />
    </div>
  )
}
