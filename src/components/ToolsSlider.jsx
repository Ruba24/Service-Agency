'use client'

import Image from 'next/image'

/**
 * ToolsSlider (CSS marquee-based)
 * Props:
 *  - tools: array of { title, logo }
 *  - speed: number (seconds for one full loop). Lower = faster. Default 12.
 */
export default function ToolsSlider({ tools = [], speed = 12 }) {
  if (!tools || tools.length === 0) return null

  // ensure track is long enough by duplicating the items
  const MIN_ITEMS = 12
  const copies = Math.max(2, Math.ceil(MIN_ITEMS / tools.length))
  const items = Array.from({ length: copies }).flatMap(() => tools)

  const duration = `${Math.max(4, speed)}s` // clamp to >= 4s

  return (
    <div className="tools-marquee w-full overflow-hidden">
      <div
        className="tools-track flex items-center"
        style={{
          animationDuration: duration,
        }}
        aria-hidden="false"
      >
        {items.map((tool, i) => (
          <div
            key={`${tool.title}-${i}`}
            className="tool-card flex-shrink-0 w-44 md:w-52 lg:w-56 p-4 bg-white rounded-xl shadow-md flex flex-col items-center justify-center"
          >
            {tool.logo && (
              <div className="relative w-16 h-16 md:w-20 md:h-20 mb-3">
                <Image
                  src={tool.logo}
                  alt={tool.title}
                  fill
                  className="object-contain"
                  sizes="80px"
                />
              </div>
            )}
            <p className="text-center text-sm md:text-base font-medium text-gray-800 px-1">
              {tool.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
