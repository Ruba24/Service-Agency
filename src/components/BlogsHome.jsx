
import BlogCards from '@/components/BlogCards'

const BlogsHome = ({ blogs }) => {
  return (
    <>
      <section className="w-full bg-[#F8F3FC] text-[#1F102E] pb-32">
        <div className=" max-w-7xl mx-auto">
          {/* Header */}
          <div className="relative z-10 max-w-7xl mx-auto pt-2 text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1F102E]">
              Our <span className="text-[#B877F7]">Blogs</span>
            </h2>
            <p className="text-[#6B7280] mt-3 max-w-2xl mx-auto">
              Explore expert insights, tips, and strategies from Zellverse to level up your digital game.
            </p>
          </div>

          {/* Blog Cards Section */}
          <div className="w-full px-4 sm:px-10 mt-4">
            <h2 className="text-2xl font-semibold text-[#B877F7] mb-6">Latest Articles</h2>
            <BlogCards blogs={blogs} />
          </div>
        </div>
      </section>
    </>
  )
}

export default BlogsHome
