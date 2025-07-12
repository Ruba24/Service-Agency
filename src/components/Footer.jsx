'use client'

import Link from 'next/link'
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaWhatsapp,
} from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="relative bg-[#1F102E] text-white px-4 sm:px-10 pt-20 pb-10 overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute -top-20 -left-20 w-80 h-80 bg-[#EBDCFF] opacity-20 rounded-full blur-3xl pointer-events-none animate-blob"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-[#D8C4F8] opacity-20 rounded-full blur-2xl pointer-events-none animate-blob animation-delay-2000"></div>
      <div className="absolute top-10 right-1/3 w-64 h-64 bg-[#F3E8FF] opacity-10 rounded-full blur-[90px] pointer-events-none animate-blob animation-delay-4000"></div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Logo + About */}
        <div className="col-span-2">
          <h2 className="text-2xl font-bold">
            <span className="text-white">ZELL</span>
            <span className="text-[#B877F7]">VERSE</span>
          </h2>
          <p className="text-[#D1D5DB] mt-4 text-sm max-w-md">
            We’re a performance-driven ecommerce agency empowering brands with tailored design,
            marketing, and scalable technology.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold mb-4 text-[#B877F7]">Quick Links</h3>
          <ul className="space-y-2 text-sm text-[#D1D5DB]">
            <li><Link href="/services" className="hover:text-[#B877F7] transition">Services</Link></li>
            <li><Link href="/courses" className="hover:text-[#B877F7] transition">Courses</Link></li>
            <li><Link href="/blogs" className="hover:text-[#B877F7] transition">Blog</Link></li>
            <li><Link href="/case-studies" className="hover:text-[#B877F7] transition">Case Studies</Link></li>
            <li><Link href="/contact" className="hover:text-[#B877F7] transition">Contact</Link></li>
          </ul>
        </div>

        {/* Contact + Socials */}
        <div>
          <h3 className="font-semibold mb-4 text-[#B877F7]">Contact</h3>
          <p className="text-sm text-[#D1D5DB] mb-4">info@zellverse.com</p>
          <div className="flex items-center gap-4 text-lg">
            <a href="#" className="hover:text-white transition text-[#1877F2]"><FaFacebookF /></a>
            <a href="#" className="hover:text-white transition text-[#E4405F]"><FaInstagram /></a>
            <a href="#" className="hover:text-white transition text-[#0A66C2]"><FaLinkedinIn /></a>
            <a href="#" className="hover:text-white transition text-[#25D366]"><FaWhatsapp /></a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-12 border-t border-[#3A2F50] pt-6 text-center text-sm text-[#9CA3AF]">
        &copy; {new Date().getFullYear()} ZELLVERSE. All rights reserved. <br /> Powered by <strong>ELVOGA LLC</strong>
      </div>
    </footer>
  )
}

export default Footer
