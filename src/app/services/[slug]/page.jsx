export const revalidate = 600;

import { client } from "@/lib/sanity";
import ServiceClient from "./ServiceClient";

// ✅ Pre-generate all service slugs for static pages (SSG)
export async function generateStaticParams() {
  const query = `*[_type == "service"]{ "slug": slug.current }`;
  const services = await client.fetch(query);
  return services.map((s) => ({ slug: s.slug }));
}

// ✅ Server component — fetch data for a specific service
export default async function ServiceDetailPage({ params }) {
  const { slug } = params;

  // ✅ Fetch service + related data
  const query = `{
    "service": *[_type == "service" && slug.current == $slug][0]{
      title,
      excerpt,
      description,       // ✅ Rich formatted content
      "imageUrl": image.asset->url,
      "gallery": gallery[].asset->url,
      tools[]->{ _id, name, icon, color } // optional
    },
    "blogs": *[_type == "blog"] | order(_createdAt desc){
      _id,
      title,
      slug,
      excerpt,
      mainImage,
      url
    },
    "testimonials": *[_type == "testimonial"]{
      name,
      role,
      quote,
      rating,
      photo
    },
    "awards": *[_type == "award"]{
      name,
      image
    },
    "caseStudies": *[_type == "caseStudy"] | order(_createdAt desc){
      _id,
      title,
      slug,
      excerpt,
      mainImage,
      url
    }
  }`;

  const data = await client.fetch(query, { slug });

  if (!data?.service) {
    return (
      <div className="py-24 text-center">
        <h2 className="text-2xl font-semibold text-gray-700">
          Service not found
        </h2>
      </div>
    );
  }

  return (
    <ServiceClient
      service={data.service}
      testimonials={data.testimonials}
      awards={data.awards}
      caseStudies={data.caseStudies}
      blogs={data.blogs}
    />
  );
}
