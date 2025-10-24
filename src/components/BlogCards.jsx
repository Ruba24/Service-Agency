import { urlFor } from '@/lib/sanity'
import Image from 'next/image'
import Link from 'next/link'

const BlogCards = ({ blogs }) => {
  
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {blogs.map((blog, index) => (
        <div
          key={index}
          className="bg-white rounded-3xl overflow-hidden shadow-[0_0_10px_rgba(0,0,0,0.05)] hover:shadow-[0_0_25px_rgba(184,119,247,0.3)] transition-all duration-300"
        >
          <Image
            src={blog?.mainImage ? urlFor(blog.mainImage).url() : '/images/fallback.jpg'}
            alt={blog.title}
            width={600}
            height={300}
            className="w-full h-56 object-cover"
          />
          <div className="p-5">
            <h3 className="text-xl font-bold text-[#1F102E] mb-2">{blog.title}</h3>
            <p className="text-gray-600 mb-4">{blog.excerpt}</p>
            <Link
              href={blog.url || '#'}
              target='_blank'
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
