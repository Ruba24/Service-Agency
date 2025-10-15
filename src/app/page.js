import Achievements from '@/components/Achievements'
import AwardsSlider from '@/components/AwardsSlider'
import BlogsHome from '@/components/BlogsHome'
import Courses from '@/components/Course'
import FaqsSection from '@/components/FAQ'
import Footer from '@/components/Footer'
import Hero from '@/components/Hero'
import ServiceLogoSlider from '@/components/ServiceLogoSlider'
import Services from '@/components/Services'
import TestimonialsSection from '@/components/Testimonials'
import ToolSlider from '@/components/ToolSlider'
import WhyChooseUs from '@/components/WhyChooseUs'

export default function Home() {
  const amount = 49.99;
  return (
    <main>
      <Hero />
      <AwardsSlider />
      <Services />
      <ServiceLogoSlider />
      {/* <Stripe/> */}
      {/* <Tools /> */}
      <Courses />
      <BlogsHome />
      <ToolSlider />
      <Achievements />
      <WhyChooseUs />
      <TestimonialsSection />
      <FaqsSection />
      <Footer />
    </main>
  )
}
