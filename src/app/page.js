import Achievements from "@/components/Achievements";
import AwardsSlider from "@/components/AwardsSlider";
import BlogsHome from "@/components/BlogsHome";
import Courses from "@/components/Course";
import FaqsSection from "@/components/FAQ";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import ServiceLogoSlider from "@/components/ServiceLogoSlider";
import Services from "@/components/Services";
import TestimonialsSection from "@/components/Testimonials";
import ToolSlider from "@/components/ToolSlider";
import WhyChooseUs from "@/components/WhyChooseUs";
import { sanityFetch } from "../../sanity/lib/live";
import { homepageQuery } from "../../sanity/lib/queries/queries";
import { client } from "../../sanity/lib/client";

export async function generateMetadata() {
  try {
    const data = await client.fetch(
      `*[_type == "homepage"][0]{ seoTitle, seoDescription, seoKeywords, "seoImage": seoImage.asset->url }`
    );
    return {
      title: data?.seoTitle || "ZELLVERSE - Ecommerce Agency",
      description:
        data?.seoDescription ||
        "Zelverse empowers ecommerce businesses with design, marketing, and tech that converts.",
      keywords: data?.seoKeywords || [],
      openGraph: {
        title: data?.seoTitle || "ZELLVERSE - Ecommerce Agency",
        description: data?.seoDescription,
        images: data?.seoImage ? [data.seoImage] : undefined,
      },
    };
  } catch (e) {
    return {
      title: "ZELLVERSE - Ecommerce Agency",
      description: "Zelverse agency",
    };
  }
}

export default async function Home() {
  const { data } = await sanityFetch({
    query: homepageQuery,
  });

  const amount = 49.99;
  return (
    <main>
      <Hero images={data?.heroSlider?.heroGallery} />
      <AwardsSlider awards={data?.awards} />
      <Services services={data?.services} />
      <ServiceLogoSlider />
      <ToolSlider tools={data?.tools} />
      {/* <Stripe/> */}
      {/* <Tools /> */}
      <Courses courses={data?.courses} />
      <Achievements />
      <WhyChooseUs />
      <TestimonialsSection testimonials={data.testimonials} />
      <FaqsSection faqs={data?.faqs} />
      <BlogsHome blogs={data?.blogs} />
      <Footer />
    </main>
  );
}
