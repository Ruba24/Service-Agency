import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { client, urlFor } from '@/lib/sanity'

const query = `*[_type == "blog"] | order(_createdAt desc) {
  _id,
  title,
  slug,
  excerpt,
  mainImage
}`

const blogs = [
  {
    id: 1,
    title: 'Top 5 Ecommerce Conversion Tips',
    slug: 'ecommerce-conversion-tips',
    excerpt: 'Simple strategies to boost your store conversions and grow revenue.',
    image: '/images/blogs/1.jpg',
  },
  {
    id: 2,
    title: 'Brand Identity Trends for 2025',
    slug: 'brand-identity-2025',
    excerpt: 'Explore modern trends shaping how brands are perceived in digital space.',
    image: '/images/blogs/2.jpg',
  },
  {
    id: 3,
    title: 'Winning Social Media Strategies',
    slug: 'social-media-strategy',
    excerpt: 'Learn how to create content that engages and converts followers.',
    image: '/images/blogs/3.jpg',
  },
  {
    id: 4,
    title: 'How to Optimize Shopify for SEO',
    slug: 'shopify-seo-tips',
    excerpt: 'Boost your organic traffic with these SEO best practices for Shopify.',
    image: '/images/blogs/4.jpg',
  },
  {
    id: 5,
    title: 'Email Marketing Best Practices',
    slug: 'email-marketing-tips',
    excerpt: 'Effective email strategies to increase engagement and ROI.',
    image: '/images/blogs/4.jpg',
  },
  {
    id: 6,
    title: 'User Experience Tips for Ecommerce',
    slug: 'ecommerce-ux-tips',
    excerpt: 'Enhance your store’s UX to drive better conversion and retention.',
    image: '/images/blogs/4.jpg',
  },
]

const BlogCards = () => {
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    client.fetch(query).then((data) => setBlogs(data))
  }, [])
  
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {blogs.map((blog) => (
        <div
          key={blog.id + blog.slug}
          className="bg-white rounded-3xl overflow-hidden shadow-[0_0_10px_rgba(0,0,0,0.05)] hover:shadow-[0_0_25px_rgba(184,119,247,0.3)] transition-all duration-300"
        >
          <Image
            src={blog.image}
            alt={blog.title}
            width={600}
            height={300}
            className="w-full h-56 object-cover"
          />
          <div className="p-5">
            <h3 className="text-xl font-bold text-[#1F102E] mb-2">{blog.title}</h3>
            <p className="text-gray-600 mb-4">{blog.excerpt}</p>
            <Link
              href={`/blogs/${blog.slug}`}
              className="text-[#B877F7] font-medium hover:underline"
            >
              Read More →
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}

export default BlogCards
