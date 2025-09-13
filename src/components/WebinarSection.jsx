// components/WebinarSection.jsx
"use client"

import Image from "next/image"

const WebinarSection = ({ webinars }) => {
  if (!webinars || webinars.length === 0) return null

  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
        Upcoming Webinars
      </h2>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {webinars.map((webinar) => (
          <div
            key={webinar._id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition"
          >
            {webinar.image && (
              <div className="relative w-full h-48">
                <Image
                  src={webinar.image}
                  alt={webinar.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {webinar.title}
              </h3>
              <p className="text-sm text-gray-600 mb-2">
                {new Date(webinar.date).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <p className="text-gray-700 text-sm line-clamp-3 mb-4">
                {webinar.description}
              </p>
              <a
                href={webinar.link}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 text-sm bg-[#B877F7] text-white rounded-lg hover:bg-[#9b5de5] transition"
              >
                Register Now
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default WebinarSection
