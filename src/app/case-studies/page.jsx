'use client'

import Footer from '@/components/Footer'
import CaseStudyCards from '@/components/CaseStudies'

const AllCaseStudiesPage = () => {
  return (
    <>
      <section className="w-full bg-[#F8F3FC] text-[#1F102E] pb-20">
        {/* Header */}
        <div className="w-full px-4 sm:px-10 pt-32 pb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Case Studies</h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Discover how we've helped brands scale, optimize, and succeed through data-driven strategies.
          </p>
        </div>

        {/* Cards */}
        <div className="w-full px-4 sm:px-10 mt-4">
          <h2 className="text-2xl font-semibold text-[#B877F7] mb-6">Success Stories</h2>
          <CaseStudyCards />
        </div>
      </section>

      <Footer />
    </>
  )
}

export default AllCaseStudiesPage
