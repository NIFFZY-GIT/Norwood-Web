"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import Image from "next/image";
import "swiper/css";
import "swiper/css/pagination";

const slides = [
  {
    id: 1,
    image: "/allbitepackings.jpg",
    title: "THE BRAND",
    subtitle: "OF TEA AND BITE TASTE",
  },
  {
    id: 2,
    image: "/garlic bite.jpg",
    title: "PREMIUM SNACKS",
    subtitle: "MADE IN CEYLON",
  },
  {
    id: 3,
    image: "/magic purple.jpg",
    title: "DELICIOUS CRUNCH",
    subtitle: "BEST FOR TEA TIME",
  },
];

const HeroSlider = () => {
  return (
    <div className="w-full h-[500px] relative overflow-hidden">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop={true}
        className="h-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <motion.div
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative h-full w-full"
            >
              <Image
                src={slide.image}
                alt="Slide Image"
                layout="fill"
                objectFit="cover"
                className="rounded-lg transform hover:scale-105 transition-all duration-500 ease-in-out"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center">
                <motion.div
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.3 }}
                  className="text-white px-10 max-w-lg"
                >
                  <h1 className="text-5xl font-extrabold">
                    {slide.title}{" "}
                    <span className="text-green-500">{slide.id === 1 && "BRAND"}</span>
                  </h1>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.5 }}
                    className="text-2xl mt-3 text-yellow-400"
                  >
                    {slide.subtitle}
                  </motion.p>
                </motion.div>
              </div>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroSlider;
