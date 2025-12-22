// src/app/services/[slug]/page.jsx
import { client } from '@/lib/sanity'
import ServiceClient from './ServiceClient'
import { defineQuery } from 'next-sanity'

// ✅ Pre-generate all service slugs for static pages (SSG)
export async function generateStaticParams() {
  const query = `*[_type == "service"]{ "slug": slug.current }`
  const services = await client.fetch(query)
  return services.map((s) => ({ slug: s.slug }))
}

// ✅ Server component — fetch data for a specific service
export default async function ServiceDetailPage({ params }) {
  // 🔧 Fix: await params in Next.js 15+
  const { slug } = await params

  const query = defineQuery(`{
    
    "service" : *[_type == "service" && slug.current == $slug][0]{
      title,
      desc,
      "imageUrl": image.asset->url,
      "gallery": gallery[].asset->url
    },

    "blogs" : *[_type == "blog"] | order(_createdAt desc) {
      _id,
      title,
      slug,
      excerpt,
      mainImage,
      url
    },

    "testimonials" : *[_type == "testimonial"]{
      name,
      role,
      quote,
      rating,
      photo
    },
    "awards": *[_type == "award"]{ name, image },

    "caseStudies" : *[_type == "caseStudy"] | order(_createdAt desc) {
      _id,
      title,
      slug,
      excerpt,
      mainImage,
      url
    }
  }`)


  const data = await client.fetch(query, { slug })

  // ✅ Safety check (same as your previous layout)
  if (!data.service) {
    return (
      <div className="text-center py-24">
        <h2 className="text-2xl font-semibold text-gray-700">
          Service not found
        </h2>
      </div>
    )
  }

  // ✅ Keep your previous layout intact
  return <ServiceClient
    service={data.service}
    testimonials={data.testimonials}
    awards={data.awards}
    caseStudies={data.caseStudies}
    blogs={data.blogs}
  />
}
