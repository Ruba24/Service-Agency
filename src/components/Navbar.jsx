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

          {/* Animated Button */}
          <div className="relative group">
            <Link
              href="/contact"
              className="relative z-10 px-5 py-2 rounded-full font-semibold text-white bg-gradient-to-r from-[#B877F7] via-[#A062D5] to-[#B877F7] bg-[length:200%_200%] animate-shimmer transition-all duration-500 ease-in-out shadow-lg hover:shadow-purple-400/40 hover:ring-2 hover:ring-[#B877F7]"
            >
              Book a Consultation
            </Link>

            {/* Glowing border effect */}
            <span className="absolute -inset-[3px] rounded-full bg-gradient-to-r from-[#B877F7] via-[#D6A4F7] to-[#B877F7] blur-md opacity-70 group-hover:opacity-100 transition duration-500 animate-pulse-slow"></span>
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
            <li><Link href="/" onClick={closeMenu}>Home</Link></li>
            <li><Link href="/about" onClick={closeMenu}>About</Link></li>
            <li><Link href="/services" onClick={closeMenu}>Services</Link></li>
            <li><Link href="/courses" onClick={closeMenu}>Courses</Link></li>
            <li><Link href="/blogs" onClick={closeMenu}>Blog</Link></li>
            <li><Link href="/case-studies" onClick={closeMenu}>Case Studies</Link></li>
            <li><Link href="/contact" onClick={closeMenu}>Contact</Link></li>
            <li>
              <Link
                href="/contact"
                onClick={closeMenu}
                className="block text-center font-semibold text-white px-5 py-2 rounded-full bg-gradient-to-r from-[#B877F7] via-[#A062D5] to-[#B877F7] animate-shimmer"
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
