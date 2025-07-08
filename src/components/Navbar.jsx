'use client'

import Link from 'next/link'

const Navbar = () => {
  return (
    <header className="w-full bg-white shadow-sm fixed top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-10 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold">
          <span className="text-black">ZELL</span>
          <span className="text-[#B877F7]">VERSE</span>
        </Link>

        {/* Nav Links */}
        <nav className="hidden md:flex gap-6 items-center text-sm font-medium text-[#1F102E]">
          <Link href="#services" className="hover:text-[#B877F7] transition-colors duration-300">Services</Link>
          <Link href="#courses" className="hover:text-[#B877F7] transition-colors duration-300">Courses</Link>
          <Link href="#testimonials" className="hover:text-[#B877F7] transition-colors duration-300">Testimonials</Link>
          <Link href="#faq" className="hover:text-[#B877F7] transition-colors duration-300">FAQs</Link>
        </nav>

        {/* Book Button */}
        <div className="ml-auto">
          <Link
            href="/booking"
            className="bg-[#B877F7] text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-[#A062D5] transition-all duration-300"
          >
            Book a Consultation
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Navbar
