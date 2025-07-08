'use client'

import { useEffect, useRef } from 'react'

const TAIL_LENGTH = 12

const CustomCursor = () => {
  const mainDot = useRef(null)
  const tailDots = useRef([])
  const coords = useRef({ x: 0, y: 0 })
  const trail = useRef([])

  useEffect(() => {
    // Initialize trail points
    trail.current = Array.from({ length: TAIL_LENGTH }, () => ({
      x: 0,
      y: 0,
    }))

    const handleMouseMove = (e) => {
      coords.current = { x: e.clientX, y: e.clientY }
    }

    window.addEventListener('mousemove', handleMouseMove)

    const animate = () => {
      // Update the trail
      let { x, y } = coords.current

      trail.current.forEach((point, i) => {
        const next = i === 0 ? coords.current : trail.current[i - 1]
        point.x += (next.x - point.x) * 0.2
        point.y += (next.y - point.y) * 0.2
      })

      // Move the main dot
      if (mainDot.current) {
        mainDot.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`
      }

      // Move the tail
      tailDots.current.forEach((dot, i) => {
        const { x, y } = trail.current[i]
        if (dot) {
          dot.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) scale(${1 - i * 0.06})`
          dot.style.opacity = `${1 - i * 0.08}`
        }
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <>
      {/* Main cursor dot */}
      <div
        ref={mainDot}
        className="fixed top-0 left-0 z-[9999] w-6 h-6 rounded-full bg-[#B877F7]/40 border border-[#B877F7]/60 shadow-lg shadow-[#B877F7]/30 backdrop-blur-sm pointer-events-none"
      />

      {/* Trail dots */}
      {Array.from({ length: TAIL_LENGTH }).map((_, i) => (
        <div
          key={i}
          ref={(el) => (tailDots.current[i] = el)}
          className="fixed top-0 left-0 z-[9998] w-3 h-3 rounded-full bg-[#B877F7] pointer-events-none blur-[2px] transition-transform duration-75 ease-out"
        />
      ))}
    </>
  )
}

export default CustomCursor
