'use client'

import Footer from '@/components/Footer'
import BlogCards from '@/components/BlogCards'

const AllBlogsPage = () => {
  return (
    <>
      <section className="w-full bg-[#F8F3FC] text-[#1F102E] pb-20">
        {/* Header */}
          <div className="w-full px-4 sm:px-10 pt-32 pb-16 text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Our Blogs</h1>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Explore expert insights, tips, and strategies from Zellverse to level up your digital game.
            </p>
        </div>


        {/* Blog Cards Section */}
        <div className="w-full px-4 sm:px-10 mt-4">
          <h2 className="text-2xl font-semibold text-[#B877F7] mb-6">Latest Articles</h2>
          <BlogCards />
        </div>
      </section>

      <Footer />
    </>
  )
}

export default AllBlogsPage
