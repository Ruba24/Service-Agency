'use client'

import ServiceCard from '@/components/ServiceCard'

const services = [
  {
    slug: 'amazon-wholesale',
    title: 'Amazon Wholesale',
    icon: '🛍️',
    desc: 'Grow your business by sourcing and selling profitable products on Amazon.',
  },
  {
    slug: 'shopify-setup',
    title: 'Shopify Setup',
    icon: '🛒',
    desc: 'Launch your own branded store with our complete Shopify setup solutions.',
  },
  {
    slug: 'llc-tax-filing',
    title: 'LLC & Tax Filing',
    icon: '📑',
    desc: 'We help you register your business and handle all tax formalities professionally.',
  },
  {
    slug: 'digital-marketing',
    title: 'Digital Marketing',
    icon: '📊',
    desc: 'Boost your visibility and conversions with paid ads, SEO, and funnels.',
  },
  {
    slug: 'ebay-walmart',
    title: 'eBay / Walmart',
    icon: '🧾',
    desc: 'Sell beyond Amazon — we help you set up and scale on eBay and Walmart.',
  },
  {
    slug: 'account-reinstatement',
    title: 'Account Reinstatement',
    icon: '⛓️💥',
    desc: 'Recover your suspended seller accounts with expert appeal strategies.',
  },
  {
    slug: 'ecommerce-trainings',
    title: 'eCommerce Trainings',
    icon: '🎓',
    desc: 'Learn the A to Z of Amazon, Shopify, and digital marketing from experts.',
  },
]

export default function ServicesPage() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-20">
      <h1 className="text-4xl font-extrabold mb-12 text-center text-[#1F102E]">
        Our <span className="text-[#B877F7]">Services</span>
      </h1>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <a key={service.slug} href={`/services/${service.slug}`}>
            <ServiceCard service={service} index={index} />
          </a>
        ))}
      </div>
    </section>
  )
}
