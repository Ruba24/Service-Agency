// src/app/testimonials/page.jsx
'use client'

import Testimonials from '.../components/Testimonials'

// Example test data
const testData = [
  {
    name: 'John Doe',
    role: 'CEO, Example Co.',
    quote: 'ZELLVERSE is amazing!',
    rating: 5,
    photo: null,
  },
  {
    name: 'Jane Smith',
    role: 'Designer',
    quote: 'Highly recommended!',
    rating: 4,
    photo: null,
  },
]

export default function TestimonialsPage() {
  return <Testimonials testimonials={testData} />
}
