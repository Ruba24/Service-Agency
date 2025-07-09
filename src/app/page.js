import Achievements from '@/components/Achievements'
import Courses from '@/components/Course'
import Footer from '@/components/Footer'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import WhyChooseUs from '@/components/WhyChooseUs'

export default function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <Courses />
      <Achievements />
      <WhyChooseUs />
      <Footer />
    </main>
  )
}
