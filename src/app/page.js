import Achievements from '@/components/Achievements'
import Courses from '@/components/Course'
import FaqsSection from '@/components/FAQ'
import Footer from '@/components/Footer'
import Hero from '@/components/Hero'
import ServiceLogoSlider from '@/components/ServiceLogoSlider'
import Services from '@/components/Services'
import TestimonialsSection from '@/components/Testimonials'
import ToolSlider from '@/components/ToolSlider'
// import Tools from '@/components/ToolSlider'
import WhyChooseUs from '@/components/WhyChooseUs'

export default function Home() {
  return (
    <main>
      <Hero />
      <ServiceLogoSlider />
      <Services />
      {/* <Tools /> */}
      <Courses />
      <ToolSlider />
      <Achievements />
      <WhyChooseUs />
      <TestimonialsSection />
      <FaqsSection />
      <Footer />
    </main>
  )
}
