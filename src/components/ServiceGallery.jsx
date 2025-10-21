'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import Image from 'next/image'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const ServiceGallery = ({ gallery, imageUrl, title }) => {
  return (
    <div className="relative h-[600px] w-full bg-[#1F102E] overflow-hidden">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        loop={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        className="h-full w-full"
      >
        {gallery?.length > 0 ? (
          gallery.map((img, index) => (
            <SwiperSlide key={index}>
              <div className="relative h-[600px] w-full">
                <Image
                  src={img}
                  alt={`Slide ${index + 1}`}
                  fill
                  className="object-cover brightness-75 transition-transform duration-700"
                  priority={index === 0}
                />
              </div>
            </SwiperSlide>
          ))
        ) : (
          <SwiperSlide>
            <div className="relative h-[600px] w-full">
              <Image
                src={imageUrl || '/placeholder.jpg'}
                alt={title}
                fill
                className="object-cover brightness-75"
              />
            </div>
          </SwiperSlide>
        )}
      </Swiper>
    </div>
  )
}

export default ServiceGallery
