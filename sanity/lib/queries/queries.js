// sanity/lib/queries/queries.ts
import { defineQuery } from "next-sanity";

// -------------------- Homepage --------------------
export const homepageQuery = defineQuery(`{
  "heroSlider": *[_type == "homepage"][0]{
    heroGallery[]{
      asset->{ url }
    }
  },

  "awards": *[_type == "award"]{
    name,
    image
  },

  "services": *[_type == "service"]{
    title,
    slug,
    icon,
    desc,
    "imageUrl": image.asset->url
  },

  "courses": *[_type == "course" && isFeatured == true][0...3]{
    _id,
    title,
    slug,
    icon,
    "imageUrl": image.asset->url,
    "description": pt::text(description)
  },

  "blogs": *[_type == "blog"] | order(_createdAt desc){
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    url
  },

  "tools": *[_type == "tool"] | order(_createdAt asc){
    name,
    icon,
    color
  },

  "testimonials": *[_type == "testimonial"]{
    name,
    role,
    quote,
    rating,
    photo
  },

  "faqs": *[_type == "faq"] | order(_createdAt asc){
    _id,
    question,
    answer
  }
}`);

// -------------------- Courses --------------------
export const coursesQuery = defineQuery(`
*[_type == "course"]{
  _id,
  title,
  slug,
  price,
  duration,
  level,
  isFeatured,
  image{
    asset->{ _id, url }
  },
  tools[]->{
    _id,
    name,
    icon,
    color
  },
  faqs[]{
    question,
    answer
  }
}
`);

// -------------------- Free Courses --------------------
export const freeCoursesQuery = defineQuery(`
*[_type == "freeCourse"]{
  _id,
  title,
  videoId
}
`);

// -------------------- Services --------------------
export const servicesQuery = defineQuery(`
*[_type == "service"]{
  _id,
  title,
  slug,
  icon,
  desc,
  image{
    asset->{ _id, url }
  },
  gallery[]{
    asset->{ _id, url }
  }
}
`);

// -------------------- Blogs --------------------
export const blogsQuery = defineQuery(`
*[_type == "blog"] | order(publishedAt desc){
  _id,
  title,
  slug,
  excerpt,
  mainImage{
    asset->{ _id, url }
  },
  publishedAt,
  url
}
`);

// -------------------- Awards --------------------
export const awardsQuery = defineQuery(`
*[_type == "award"]{
  _id,
  name,
  image{
    asset->{ _id, url }
  }
}
`);

// -------------------- FAQs --------------------
export const faqsQuery = defineQuery(`
*[_type == "faq"]{
  _id,
  question,
  answer,
  course->{
    _id,
    title,
    slug
  }
}
`);

// -------------------- Team Members --------------------
export const teamMembersQuery = defineQuery(`
*[_type == "teamMember"]{
  _id,
  name,
  role,
  description,
  image{
    asset->{ _id, url }
  }
}
`);

// -------------------- Testimonials --------------------
export const testimonialsQuery = defineQuery(`
*[_type == "testimonial"]{
  _id,
  name,
  role,
  quote,
  rating,
  relatedTo->{
    _id,
    _type,
    title
  },
  photo{
    asset->{ _id, url }
  }
}
`);

// -------------------- Tools --------------------
export const toolsQuery = defineQuery(`
*[_type == "tool"]{
  _id,
  name,
  icon,
  color,
  courses[]->{
    _id,
    title,
    slug
  }
}
`);
