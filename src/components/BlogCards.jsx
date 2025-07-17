'use client'

const BlogCards = ({ serviceSlug }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3].map((item) => (
        <div key={item} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition">
          <h3 className="font-bold text-[#1F102E] text-lg mb-2">
            How {serviceSlug.replace(/-/g, ' ')} helped our client #{item}
          </h3>
          <p className="text-gray-600 text-sm">
            Discover the strategies and implementations we used in real-world scenarios.
          </p>
        </div>
      ))}
    </div>
  )
}

export default BlogCards
