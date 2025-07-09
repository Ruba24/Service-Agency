'use client'

import { useState } from 'react'
import Link from 'next/link'
import { FiMenu, FiX } from 'react-icons/fi'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)
  const closeMenu = () => setIsOpen(false)

  return (
    <nav className="w-full fixed top-0 z-50 bg-[#F9F6FF] backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-10 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" onClick={closeMenu} className="text-2xl font-bold whitespace-nowrap">
          <span className="text-black">ZELL</span>
          <span className="text-[#B877F7]">VERSE</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-6 font-medium text-[#1F102E]">
          <Link href="/" className="hover:text-[#B877F7] transition">Home</Link>
          <Link href="/about" className="hover:text-[#B877F7] transition">About</Link>
          <Link href="/services" className="hover:text-[#B877F7] transition">Services</Link>
          <Link href="/courses" className="hover:text-[#B877F7] transition">Courses</Link>
          <Link href="/blogs" className="hover:text-[#B877F7] transition">Blog</Link>
          <Link href="/case-studies" className="hover:text-[#B877F7] transition">Case Studies</Link>
          <Link href="/contact" className="hover:text-[#B877F7] transition">Contact</Link>

          <Link
            href="/contact"
            className="ml-4 bg-[#B877F7] text-white px-4 py-2 rounded-full hover:bg-[#A062D5] transition whitespace-nowrap"
          >
            Book a Consultation
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-[#B877F7] text-2xl focus:outline-none"
          aria-label="Toggle Menu"
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white w-full shadow-md px-6 pb-6 pt-4 text-[#1F102E] font-medium">
          <ul className="space-y-4">
            <li><Link href="/courses" onClick={closeMenu}>Home</Link></li>
            <li><Link href="/courses" onClick={closeMenu}>About</Link></li>
            <li><Link href="/services" onClick={closeMenu}>Services</Link></li>
            <li><Link href="/courses" onClick={closeMenu}>Courses</Link></li>
            <li><Link href="/blogs" onClick={closeMenu}>Blog</Link></li>
            <li><Link href="/case-studies" onClick={closeMenu}>Case Studies</Link></li>
            <li><Link href="/contact" onClick={closeMenu}>Contact</Link></li>
            <li>
              <Link
                href="/booking"
                onClick={closeMenu}
                className="inline-block bg-[#B877F7] text-white px-4 py-2 rounded-full hover:bg-[#A062D5] transition"
              >
                Book a Consultation
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  )
}

export default Navbar
