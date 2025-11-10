import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CourseTestimonials from '@/components/CourseTestimonials'
import ToolSlider from '@/components/ToolSlider'
import FaqsSection from '@/components/FAQ'
import StatsSection from '@/components/StatsSection'

import CourseDetailPageSlider from '@/components/CourseDetailPageSlider'
// import EnrollModalButton from './EnrollModalButton'
import CourseDescription from './CourseDescription'
import EnrollModalButton from './EnrollModalButton'

const ClientCourse = ({ course }) => {

  return (
    <main className="relative min-h-screen bg-white">
      <Navbar />


      <div className="relative bg-[#1F102E] text-white overflow-hidden h-[400px] md:h-[500px]">
        <CourseDetailPageSlider gallery={course.gallery} />

        {/* Course Title Overlay */}
        <div className="absolute inset-0 flex items-center justify-center text-center px-4 z-20">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg">
            {course.title}
          </h1>
        </div>

      </div>

      {/* ✅ Course Details */}
      <div className="max-w-4xl mx-auto px-6 pt-10 relative z-10">
        
        <CourseDescription description={course.description} />

        <p className="text-lg text-gray-700">Duration: {course.duration}</p>
        <p className="text-lg text-gray-700">
          Level:{' '}
          {course.level
            ? course.level.charAt(0).toUpperCase() +
            course.level.slice(1).toLowerCase()
            : ''}
        </p>

        <div className="flex items-center justify-between mb-8">
          <span className="text-lg font-semibold text-purple-600">
            Cost: ${course.price?.toFixed(2) || 'Free'}
          </span>
        </div>

        <StatsSection
          stats={[
            { value: '7+', label: 'Hours of expert tutorials' },
            { value: '6+', label: 'Downloadable resources' },
            {
              value: '4',
              label:
                'Learning tracks (sales & marketing, productivity, entrepreneurship, content creation)',
            },
          ]}
        />
      </div>

      {/* ✅ Tools Slider */}
      <div className="mb-10">
        {course.tools?.length > 0 && (
          <ToolSlider tools={course.tools} title={`Tools for ${course.title}`} />
        )}
      </div>

      {/* ✅ Stats Section */}
      <StatsSection
        stats={[
          { value: `${course.learnersCount || 0}`, label: 'Learners enrolled' },
          {
            value:
              course.testimonials?.length > 0
                ? (
                  course.testimonials.reduce(
                    (sum, t) => sum + (t.rating || 0),
                    0
                  ) / course.testimonials.length
                ).toFixed(1)
                : 'N/A',
            label: 'Average rating',
          },
        ]}
      />

      {/* ✅ Testimonials */}
      <div>
        {course.testimonials?.length > 0 && (
          <CourseTestimonials testimonials={course.testimonials} />
        )}
      </div>

      {/* ✅ FAQs */}
      <div>
        <FaqsSection
          courseId={course._id}
          description={`Questions about ${course.title}`}
        />
      </div>

      {/* ✅ Enroll Modal Button
      <div className="flex justify-center my-20 gap-4">
        <EnrollModalButton course={course} />
      </div> */}
      <div className="relative group">
            <Link
              href="/contact"
              className={`relative z-10 px-5 py-2 rounded-full ${isServiceDetail && scrolled ? "bg-[#FFBF00] hover:bg-[#FFBF00]" : "bg-gradient-to-r from-[#FFBF00] via-[#A062D5] to-[#FFBF00] bg-[length:200%_200%] hover:shadow-purple-400/40 hover:ring-2 hover:ring-[#B877F7]"} font-semibold text-white animate-shimmer transition-all duration-500 ease-in-out shadow-lg`}
            >
              {ctaText}
            </Link>
            <span className="absolute -inset-[3px] rounded-full bg-gradient-to-r from-[#B877F7] via-[#D6A4F7] to-[#FFDB58] blur-md opacity-70 group-hover:opacity-100 transition duration-500 animate-pulse-slow"></span>
          </div>
      {/* <Footer /> */}
    </main>
  )
}

export default ClientCourse
