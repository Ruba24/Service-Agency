'use client'

const serviceLogos = [
  '/icons/shopify.png',
  '/icons/uiux.png',
  '/icons/facebook.png',
  '/icons/seo.png',
  '/icons/ads.png',
  '/icons/email.png',
]

const ServiceLogoSlider = () => {
  return (
    <section className="bg-white py-6 overflow-hidden">
      <div className="w-full overflow-hidden group">
        <div className="flex whitespace-nowrap animate-slide gap-12">
          {serviceLogos.concat(serviceLogos).map((logo, index) => (
            <img
              key={index}
              src={logo}
              alt={`Service Logo ${index}`}
              className="h-12 w-auto object-contain inline-block"
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ServiceLogoSlider
