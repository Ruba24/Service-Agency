"use client";

import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination, Autoplay } from "swiper/modules"
import "swiper/css"
import "swiper/css/pagination"

function CourseTestimonials({ testimonials }) {
    return (
        <section
            // className="mt-20 px-4"
            className="w-full bg-[#1F102E] py-20 px-4 sm:px-10 text-white z-10 relative">
            <h2 className="text-2xl font-bold mb-8 text-center">
                What Our <span className="text-[#B877F7]">Clients Say</span>
            </h2>

            <Swiper
                modules={[Pagination, Autoplay]}
                spaceBetween={20}
                slidesPerView={1}
                breakpoints={{
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                }}
                loop={true}
                autoplay={{ delay: 4000, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                centerInsufficientSlides={true}
                className="max-w-5xl mx-auto"
            >
                {testimonials.map((t) => (
                    <SwiperSlide key={t._id}>
                        <div className="bg-[#2B1A40] text-white p-6 mb-4 rounded-xl shadow-md text-center h-full flex flex-col justify-between">
                            {t.clientImage ? (
                                <img
                                    src={t.clientImage.asset.url}
                                    alt={t.name}
                                    className="w-16 h-16 rounded-full mx-auto mb-4 border-2 border-[#B877F7] object-cover"
                                />
                            ) : (
                                <div className="w-16 h-16 rounded-full bg-purple-600 flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl">👤</span>
                                </div>
                            )}

                            <p className="italic mb-4">“{t.quote}”</p>

                            <div className="flex justify-center mb-2">
                                {Array.from({ length: t.rating }).map((_, i) => (
                                    <span key={i}>⭐</span>
                                ))}
                            </div>

                            <p className="font-semibold">{t.name}</p>
                            <p className="text-sm text-gray-300">{t.role}</p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    )
}

export default CourseTestimonials