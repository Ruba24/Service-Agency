'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FiMenu, FiX } from 'react-icons/fi'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const toggleMenu = () => setIsOpen(!isOpen)
  const closeMenu = () => setIsOpen(false)

  const pathname = usePathname()

  // Detect scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Page detection
  const isServiceDetail =
    pathname?.startsWith('/services/') && pathname.split('/').length > 2

  const isCourseDetail =
    pathname?.startsWith('/courses/') && pathname.split('/').length > 2

  const ctaText =
    isServiceDetail && scrolled
      ? 'Request Service'
      : isCourseDetail && scrolled
      ? 'Enroll Now'
      : 'Book a Consultation'

  return (
    <nav className="w-full fixed top-0 z-50 bg-[#F9F6FF] backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-10 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" onClick={closeMenu} className="flex items-center">
          <div className="flex items-center">
            <img
              src="/logo.svg"
              alt="ZELLVERSE Logo"
              width={50}
              height={40}
              className="mr-2"
            />

            <div className="flex flex-col items-center leading-tight">
              <h2 className="font-ibm font-bold text-[24px] mt-2 leading-none text-black">
                ZELL<span className="text-[#B877F7]">VERSE</span>
              </h2>

              <p className="font-montserrat text-[11px] text-gray-900 text-center mt-[2px]">
                Idea to Empire
              </p>
            </div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-6 font-medium text-[#1F102E]">
          {[
            ['/', 'Home'],
            ['/about', 'About'],
            ['/services', 'Services'],
            ['/courses', 'Courses'],
            ['/blogs', 'Blog'],
            ['/case-studies', 'Case Studies'],
            ['/contact', 'Contact'],
          ].map(([href, label]) => (
            <Link
              key={href}
              href={href}
              className={
                pathname === href || pathname.startsWith(href + '/')
                  ? 'text-[#B877F7]'
                  : 'hover:text-[#B877F7] transition'
              }
            >
              {label}
            </Link>
          ))}

          {/* CTA */}
          <div className="relative group">
            <Link
              href="/contact"
              className={`relative z-10 px-5 py-2 rounded-full ${
                isServiceDetail && scrolled
                  ? 'bg-[#FFBF00]'
                  : 'bg-yellow-400'
              } font-semibold text-purple-950 hover:ring-2 hover:ring-[#B877F7] transition-all duration-500 shadow-lg`}
            >
              {ctaText}
            </Link>
            <span className="absolute -inset-[3px] rounded-full blur-md opacity-70 group-hover:opacity-100"></span>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-[#B877F7] text-2xl"
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white w-full shadow-md px-6 pb-6 pt-4 text-[#1F102E] font-medium">
          <ul className="space-y-4">
            {[
              ['/', 'Home'],
              ['/about', 'About'],
              ['/services', 'Services'],
              ['/courses', 'Courses'],
              ['/blogs', 'Blog'],
              ['/case-studies', 'Case Studies'],
              ['/contact', 'Contact'],
            ].map(([href, label]) => (
              <li key={href}>
                <Link
                  href={href}
                  onClick={closeMenu}
                  className={pathname === href ? 'text-[#B877F7]' : ''}
                >
                  {label}
                </Link>
              </li>
            ))}

            <li>
              <Link
                href="/contact"
                onClick={closeMenu}
                className="block text-center font-semibold text-purple-950 px-5 py-2 rounded-full bg-yellow-400 hover:ring-2 hover:ring-[#B877F7] transition"
              >
                {ctaText}
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  )
}

export default Navbar
