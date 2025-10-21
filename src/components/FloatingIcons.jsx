'use client'
import { useEffect, useRef } from 'react'

const icons = ['🛒', '📦', '💳', '🏷️', '🧾', '🏬', '📈', '🚀', '📲', '🛍️', '💡', '🧠']

const FloatingIcons = () => {
  const containerRef = useRef(null)
  const iconRefs = useRef([])

  useEffect(() => {
    const speeds = icons.map(() => ({
      x: (Math.random() - 0.5) * 0.7, // Speed between -0.35 to 0.35
      y: (Math.random() - 0.5) * 0.7,
    }))

    const positions = icons.map(() => ({ x: 0, y: 0 }))

    const setInitialPositions = () => {
      if (!containerRef.current) return
      const rect = containerRef?.current?.getBoundingClientRect()

      icons.forEach((_, i) => {
        positions[i] = {
          x: Math.random() * rect.width,
          y: Math.random() * rect.height,
        }
      })
    }

    const animate = () => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()

      icons.forEach((_, i) => {
        positions[i].x += speeds[i].x * 2
        positions[i].y += speeds[i].y * 2

        // Reset if out of bounds
        if (positions[i].x < -50 || positions[i].x > rect.width + 50) {
          positions[i].x = Math.random() * rect.width
          positions[i].y = Math.random() * rect.height
        }
        if (positions[i].y < -50 || positions[i].y > rect.height + 50) {
          positions[i].x = Math.random() * rect.width
          positions[i].y = Math.random() * rect.height
        }

        const el = iconRefs.current[i]
        if (el) {
          el.style.transform = `translate(${positions[i].x}px, ${positions[i].y}px)`
        }
      })

      requestAnimationFrame(animate)
    }

    setInitialPositions()
    animate()

    window.addEventListener('resize', setInitialPositions)
    return () => window.removeEventListener('resize', setInitialPositions)
  }, [])

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
    >
      {icons.map((icon, i) => (
        <div
          key={i}
          ref={(el) => (iconRefs.current[i] = el)}
          className="absolute text-[24px] opacity-20"
        >
          {icon}
        </div>
      ))}
    </div>
  )
}

export default FloatingIcons
