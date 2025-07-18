import Link from 'next/link'
import FloatingIcons from './FloatingIcons'
// import ServiceSlider from './ServiceLogoSlider' // ✅ Import this

const Hero = () => {
  return (
    <>
      <section className="relative bg-[#1F102E] text-white overflow-hidden py-28">
        <FloatingIcons />

        {/* 🎯 Floating Ecommerce Icons */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          {[
            '🛒', '📦', '💳', '🏷️', '🧾', '🚀', '🛍️', '📈', '🧠', '🧑‍💻', '💡', '📲'
          ].map((icon, index) => (
            <div
              key={index}
              className={`floating-icon icon-${index + 1}`}
              style={{
                top: `${Math.random() * 90}%`,
                left: `${Math.random() * 90}%`
              }}
            >
              {icon}
            </div>
          ))}
        </div>

        {/* 🌟 Main Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 flex flex-col-reverse lg:flex-row items-center gap-12">
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-5xl font-extrabold leading-tight text-white">
              Scale Your <span className="text-[#B877F7]">Ecommerce Brand</span> <br />
              with Precision & Power
            </h1>
            <p className="mt-4 text-[#E2E8F0] text-lg">
              Zelverse empowers ambitious businesses with design, marketing, and tech that converts.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                href="/booking"
                className="bg-[#B877F7] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#A062D5] transition"
              >
                Book a Free Call
              </Link>
              <Link
                href="/services"
                className="border border-[#B877F7] text-[#B877F7] px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-[#1F102E] transition"
              >
                Explore Services
              </Link>
            </div>
          </div>

          {/* ✅ Optional Hero Image Placeholder
          <div className="flex-1 flex justify-center">
            <img
              src="/images/hero-agency.jpg"
              alt="Zelverse Hero"
              className="w-full max-w-md rounded-xl shadow-2xl"
            />
          </div>
          */}
        </div>
      </section>
      {/* <ServiceLogoSlider /> */}
    </>
  )
}

export default Hero
