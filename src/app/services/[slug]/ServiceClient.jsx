import Footer from "@/components/Footer";
import AwardsSlider from "@/components/AwardsSlider";
import ServiceSlider from "@/components/ServiceLogoSlider";
import CaseStudies from "@/components/CaseStudies";
import BlogCards from "@/components/BlogCards";
import Testimonials from "@/components/Testimonials";
import ServiceHero from "./_components/ServiceHero";
import RequestAService from "@/components/RequestAService";
import { PortableText } from "@portabletext/react";

const ServiceClient = ({
  service,
  blogs,
  caseStudies,
  testimonials,
  awards,
}) => {
  return (
    <>
      {/* ✅ HERO SECTION */}
      <ServiceHero service={service} />

      {/* ✅ SERVICE DESCRIPTION */}
      {service.description && (
        <div className="max-w-4xl mx-auto px-4 sm:px-10 mt-20 prose prose-purple">
          <PortableText value={service.description} />
        </div>
      )}

      {/* ✅ EXPERIENCE SECTION */}
      <div className="w-full px-4 sm:px-10 mt-20">
        <div className="bg-[#F4E9FF] p-8 sm:p-12 rounded-3xl shadow-md">
          <h2 className="text-2xl font-semibold mb-3 text-[#B877F7]">
            Our Experience
          </h2>
          <p className="text-gray-700 leading-relaxed">
            With over{" "}
            <strong className="text-[#B877F7]">
              20+ successful {service.title}
            </strong>{" "}
            projects completed, our team brings hands-on expertise, cutting-edge
            tools, and data-backed strategies to every client. <br />
            {service.excerpt}
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

      <div className="w-full flex justify-center mt-10">
        <RequestAService selectedService={service.title} />
      </div>

      {/* ✅ TOOLS / LOGO SLIDER */}
      <div className="w-full mt-20">
        {service.tools?.length > 0 && (
          <div className="mb-10">
            <ServiceSlider tools={service.tools} title={`Tools for ${service.title}`} />
          </div>
        )}
        <ServiceSlider />
      </div>

      {/* ✅ TESTIMONIALS */}
      <div className="w-full px-4 sm:px-10 my-20">
        <Testimonials testimonials={testimonials} />
      </div>

      <div className="w-full flex justify-center mt-10">
        <RequestAService selectedService={service.title} />
      </div>

      {/* ✅ RELATED BLOGS */}
      {blogs?.length > 0 && (
        <div className="w-full px-4 sm:px-10 mt-20">
          <h2 className="text-2xl font-semibold mb-6 text-[#B877F7]">
            Related Blogs
          </h2>
          <BlogCards blogs={blogs} />
        </div>
      )}

      {/* ✅ FOOTER */}
      <Footer />
    </>
  );
};

export default ServiceClient;
