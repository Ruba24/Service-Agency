
import Footer from '@/components/Footer'
import AwardsSlider from '@/components/AwardsSlider'
import ServiceSlider from '@/components/ServiceLogoSlider'
import CaseStudies from '@/components/CaseStudies'
import BlogCards from '@/components/BlogCards'
import Testimonials from '@/components/Testimonials'
import Link from 'next/link'
import ServiceHero from './_components/ServiceHero'


const ServiceClient = ({ service, blogs, caseStudies, testimonials, awards }) => {


  return (
    <>
      {/* ✅ HERO SECTION */}
      
      <ServiceHero service={service} />

      {/* ✅ EXPERIENCE SECTION */}
      <div className="w-full px-4 sm:px-10 mt-20">
        <div className="bg-[#F4E9FF] p-8 sm:p-12 rounded-3xl shadow-md">
          <h2 className="text-2xl font-semibold mb-3 text-[#B877F7]">
            Our Experience
          </h2>
          <p className="text-gray-700 leading-relaxed">
            With over{' '}
            <strong className="text-[#B877F7]">
              20+ successful {service.title}
            </strong>{' '}
            projects completed, our team brings hands-on expertise,
            cutting-edge tools, and data-backed strategies to every client. <br />
            {service.desc}
          </p>
        </div>
      </div>

      {/* ✅ AWARDS */}
      <div className="w-full mt-20">
        <AwardsSlider awards={awards} />
      </div>

      {/* ✅ RELATED CASE STUDIES */}
      <div className="w-full px-4 sm:px-10 mt-20">
        <h2 className="text-2xl font-semibold mb-6 text-[#B877F7]">
          Related Case Studies
        </h2>
        <CaseStudies caseStudies={caseStudies} />
      </div>

      {/* ✅ RELATED BLOGS */}
      {
        blogs?.length &&
        <div className="w-full px-4 sm:px-10 mt-20">
          <h2 className="text-2xl font-semibold mb-6 text-[#B877F7]">
            Related Blogs
          </h2>
          <BlogCards blogs={blogs} />
        </div>
      }

      {/* ✅ LOGO SLIDER */}
      <div className="w-full mt-20">
        <ServiceSlider />
      </div>

      {/* ✅ TESTIMONIALS */}
      <div className="w-full px-4 sm:px-10 mt-20">
        <h2 className="text-2xl font-semibold mb-6 text-[#B877F7]">
          What Our Clients Say
        </h2>
        <Testimonials testimonials={testimonials} />
        <div className="mt-10 text-center">
          <Link
            href="/contact"
            className="inline-block bg-[#ffa329] text-white font-medium py-3 px-6 rounded-full shadow hover:bg-[#f58c00] transition"
          >
            Request Service
          </Link>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default ServiceClient
