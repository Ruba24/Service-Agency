import { defineQuery } from "next-sanity";

export const homepageQuery = defineQuery(`{

  "heroSlider": *[_type == "homepage"][0] {
    heroGallery[] {
      asset->{
        url
      }
    }
  },
  "awards": *[_type == "award"]{ name, image },

  "services" : *[_type == "service"] {
    title,
    slug,
    icon,
    "imageUrl": image.asset->url,
    desc
  },

  "courses" : *[_type == "course" && isFeatured == true][0...3]{
    _id,
    title,
    slug,
    icon,
    "imageUrl": image.asset->url, 
    "description": pt::text(description)
  },

  "blogs" : *[_type == "blog"] | order(_createdAt desc) {
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    url
  },

  "tools" : *[_type == "tool"] | order(_createdAt asc) {
    name,
    icon,
    color
  },

  "testimonials" : *[_type == "testimonial"]{
    name,
    role,
    quote,
    rating,
    photo
  },

  "faqs" : *[_type == "faq"] | order(_createdAt asc) {
    _id,
    question,
    answer
  },


  

}`)