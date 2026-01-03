// sanity/lib/queries/queries.js

// -------------------- Homepage --------------------
export const homepageQuery = `
*[_type == "homepage"][0]{
  heroGallery[]{
    asset->{
      _id,
      url
    }
  }
}
`

// -------------------- Courses --------------------
export const coursesQuery = `
*[_type == "course"]{
  _id,
  title,
  slug,
  price,
  duration,
  level,
  isFeatured,
  image{
    asset->{
      _id,
      url
    }
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
`

// -------------------- Free Courses --------------------
export const freeCoursesQuery = `
*[_type == "freeCourse"]{
  _id,
  title,
  videoId
}
`

// -------------------- Services --------------------
export const servicesQuery = `
*[_type == "service"]{
  _id,
  title,
  slug,
  icon,
  desc,
  image{
    asset->{
      _id,
      url
    }
  },
  gallery[]{
    asset->{
      _id,
      url
    }
  }
}
`

// -------------------- Blogs --------------------
export const blogsQuery = `
*[_type == "blog"]{
  _id,
  title,
  slug,
  excerpt,
  mainImage{
    asset->{
      _id,
      url
    }
  },
  publishedAt,
  url
}
`

// -------------------- Awards --------------------
export const awardsQuery = `
*[_type == "award"]{
  _id,
  name,
  image{
    asset->{
      _id,
      url
    }
  }
}
`

// -------------------- FAQs --------------------
export const faqsQuery = `
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
`

// -------------------- Team Members --------------------
export const teamMembersQuery = `
*[_type == "teamMember"]{
  _id,
  name,
  role,
  description,
  image{
    asset->{
      _id,
      url
    }
  }
}
`

// -------------------- Testimonials --------------------
export const testimonialsQuery = `
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
    asset->{
      _id,
      url
    }
  }
}
`

// -------------------- Tools --------------------
export const toolsQuery = `
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
`
