import Footer from '@/components/Footer'
import CaseStudyCards from '@/components/CaseStudies'
import { client } from '@/lib/sanity';

const AllCaseStudiesPage = async () => {

  const query = `*[_type == "caseStudy"] | order(_createdAt desc) {
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    url
  }`

  const caseStudies = await client.fetch(query);

  return (
    <>
      <section className="w-full bg-[#F8F3FC] text-[#1F102E] pb-20">
        {/* Header */}
        <div className="relative z-10 max-w-7xl mx-auto pt-20 text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1F102E]">
            Case <span className="text-[#B877F7]">Studies</span>
          </h2>
          <p className="text-[#6B7280] mt-3 max-w-2xl mx-auto">
            Discover how we've helped brands scale, optimize, and succeed through data-driven strategies.
          </p>
        </div>

        {/* Cards */}
        <div className="w-full px-4 sm:px-10 mt-4">
          <h2 className="text-2xl font-semibold text-[#B877F7] mb-6">Success Stories</h2>
          <CaseStudyCards caseStudies={caseStudies} />
        </div>
      </section>

      <Footer />
    </>
  )
}

export default AllCaseStudiesPage
