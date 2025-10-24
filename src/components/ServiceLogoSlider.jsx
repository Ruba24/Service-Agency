


const ServiceSlider = () => {
  const services = [
  { emoji: '🛍️', title: 'Amazon Wholesale' },
  { emoji: '🛒', title: 'Shopify Setup' },
  { emoji: '📑', title: 'LLC & Tax Filing' },
  { emoji: '📊', title: 'Digital Marketing' },
  { emoji: '🧾', title: 'eBay / Walmart' },
  { emoji: '⛓️💥', title: 'Account Reinstatement' },
  { emoji: '🎓', title: 'eCommerce Trainings' },
]

  const repeated = [...services, ...services, ...services]

  return (
    <section className="bg-white py-10 overflow-hidden">
      {/* <h2 className="text-3xl font-bold text-center text-[#1F102E] mb-8">
        Our Services
      </h2> */}

      <div className="overflow-hidden w-screen relative left-[50%] right-[50%] -mx-[50vw] group">
        <div className="animate-marquee whitespace-nowrap flex">
          {repeated.map((service, index) => (
            <div
              key={index}
              className="inline-flex flex-col items-center text-[#1F102E] w-[200px] px-4"
            >
              <div className="text-3xl">{service.emoji}</div>
              <p className="text-sm font-semibold mt-2 text-center leading-snug">
                {service.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ServiceSlider
