'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FiMenu, FiX } from 'react-icons/fi'
import Image from 'next/image';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const toggleMenu = () => setIsOpen(!isOpen)
  const closeMenu = () => setIsOpen(false)

  const pathname = usePathname()

  // Detect scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) setScrolled(true)
      else setScrolled(false)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Determine if on Service Detail page
  const isServiceDetail = pathname?.startsWith('/services/') && pathname.split('/').length > 2
  const isCourseDetail = pathname?.startsWith('/courses/') && pathname.split('/').length > 2

  // Determine button text
  const ctaText = isServiceDetail && scrolled ? 'Request Service' : isCourseDetail && scrolled ? 'Enroll Now' : 'Book a Consultation'

  return (
    <nav className="w-full fixed top-0 z-50 bg-[#F9F6FF] backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-10 py-4 flex items-center justify-between">
{/* Logo */}
<Link
  href="/"
  onClick={closeMenu}
  className="flex items-center"
>
  {/* SVG Logo */}
  {/* <Image
    src="/logo.svg"
    alt="ZELLVERSE Logo"
    width={65}
    height={48}
    priority
  /> */}

  {/* Brand Name + Tagline */}
   <div className="flex items-center">
    <img
      src="/logo.svg"
      alt="ZELLVERSE Logo"
      width={50}
      height={40
      }
      className="mr-2"
    />
    <div className="flex flex-col items-center leading-tight">
      <h2 className="font-['IBM_Plex_Mono'] font-bold text-[24px] mt-2 leading-none text-black">
        ZELL<span className="text-[#B877F7]">VERSE</span>
      </h2>
      <p className="font-['Montserrat'] text-[11px] text-gray-900 text-center mt-[2px]">
        Idea to Empire
      </p>
    </div>
    </div>
</Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-6 font-medium text-[#1F102E]">
          <Link
            href="/"
            className={pathname === '/' ? 'text-[#B877F7]' : 'hover:text-[#B877F7] transition'}
          >
            Home
          </Link>
          <Link
            href="/about"
            className={pathname === '/about' ? 'text-[#B877F7]' : 'hover:text-[#B877F7] transition'}
          >
            About
          </Link>
          <Link
            href="/services"
            className={pathname.startsWith('/services') ? 'text-[#B877F7]' : 'hover:text-[#B877F7] transition'}
          >
            Services
          </Link>
          <Link
            href="/courses"
            className={pathname === '/courses' ? 'text-[#B877F7]' : 'hover:text-[#B877F7] transition'}
          >
            Courses
          </Link>
          <Link
            href="/blogs"
            className={pathname === '/blogs' ? 'text-[#B877F7]' : 'hover:text-[#B877F7] transition'}
          >
            Blog
          </Link>
          <Link
            href="/case-studies"
            className={pathname === '/case-studies' ? 'text-[#B877F7]' : 'hover:text-[#B877F7] transition'}
          >
            Case Studies
          </Link>
          <Link
            href="/contact"
            className={pathname === '/contact' ? 'text-[#B877F7]' : 'hover:text-[#B877F7] transition'}
          >
            Contact
          </Link>

          {/* CTA Button */}
          <div className="relative group">
            <Link
              href="/contact"
              className={`relative z-10 px-5 py-2 rounded-full ${isServiceDetail && scrolled ? "bg-[#FFBF00] hover:bg-[#FFBF00]" : "bg-gradient-to-r from-[#FFBF00] via-[#A062D5] to-[#FFBF00] bg-[length:200%_200%] hover:shadow-purple-400/40 hover:ring-2 hover:ring-[#B877F7]"} font-semibold text-white animate-shimmer transition-all duration-500 ease-in-out shadow-lg`}
            >
              {ctaText}
            </Link>
            <span className="absolute -inset-[3px] rounded-full bg-gradient-to-r from-[#B877F7] via-[#D6A4F7] to-[#FFDB58] blur-md opacity-70 group-hover:opacity-100 transition duration-500 animate-pulse-slow"></span>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-[#B877F7] text-2xl focus:outline-none"
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white w-full shadow-md px-6 pb-6 pt-4 text-[#1F102E] font-medium">
          <ul className="space-y-4">
            <li>
              <Link href="/" onClick={closeMenu} className={pathname === '/' ? 'text-[#B877F7]' : ''}>Home</Link>
            </li>
            <li>
              <Link href="/about" onClick={closeMenu} className={pathname === '/about' ? 'text-[#B877F7]' : ''}>About</Link>
            </li>
            <li>
              <Link href="/services" onClick={closeMenu} className={pathname.startsWith('/services') ? 'text-[#B877F7]' : ''}>Services</Link>
            </li>
            <li>
              <Link href="/courses" onClick={closeMenu} className={pathname === '/courses' ? 'text-[#B877F7]' : ''}>Courses</Link>
            </li>
            <li>
              <Link href="/blogs" onClick={closeMenu} className={pathname === '/blogs' ? 'text-[#B877F7]' : ''}>Blog</Link>
            </li>
            <li>
              <Link href="/case-studies" onClick={closeMenu} className={pathname === '/case-studies' ? 'text-[#B877F7]' : ''}>Case Studies</Link>
            </li>
            <li>
              <Link href="/contact" onClick={closeMenu} className={pathname === '/contact' ? 'text-[#B877F7]' : ''}>Contact</Link>
            </li>
            <li>
              <Link
                href="/contact"
                onClick={closeMenu}
                className="block text-center font-semibold text-white px-5 py-2 rounded-full bg-gradient-to-r from-[#B877F7] via-[#A062D5] to-[#B877F7] animate-shimmer"
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
