import { urlFor } from '@/lib/sanity'
import Image from 'next/image'

const AwardsSlider = ({ awards }) => {

  const repeatedAwards = [...awards, ...awards, ...awards, ...awards]

  return (
    <section className="bg-white py-10 overflow-hidden">
      <h2 className="text-3xl font-bold text-center text-[#1F102E] mb-8">
        Our <span className="text-[#B877F7]">Awards & Recognitions</span>
      </h2>

      <div className="overflow-hidden w-full">
        <div
          className="award-marquee flex"
          style={{
            animation: 'scroll 25s linear infinite',
          }}
        >
          {repeatedAwards.map((award, index) => (
            <div
              key={index}
              className="flex-shrink-0 flex flex-col items-center text-[#1F102E] w-[180px] px-4"
            >
              <div className="rounded-full overflow-hidden shadow-md">
                <Image
                  src={urlFor(award.image).url()}
                  alt={award.name}
                  width={96} height={96}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-sm font-medium mt-2 text-center leading-tight">
                {award.name}
              </p>
            </div>
          ))}
        </div>
      </div>

   
    </section>
  )
}

export default AwardsSlider
