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
    type: "image", // Added type
    image: "/allbitepackings.jpg",
    title: "THE BRAND",
    subtitle: "OF TEA AND BITE TASTE",
  },
  {
    id: 2,
    type: "video", // Added type
    videoSrc: "/Norwood intro.mp4", // Path to your video in /public
    poster: "/garlic bite.jpg", // Optional: poster image for the video
    title: "DYNAMIC MOTION",
    subtitle: "EXPERIENCE IT LIVE",
  },
  {
    id: 3,
    type: "image", // Added type
    image: "/magic purple.jpg",
    title: "DELICIOUS CRUNCH",
    subtitle: "BEST FOR TEA TIME",
  },
];

const HeroSlider = () => {
  return (
    <div className="w-full h-[500px] md:h-[600px] lg:h-[700px] relative overflow-hidden"> {/* Made height responsive */}
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 5000, disableOnInteraction: false }} // Increased delay slightly for video
        pagination={{ clickable: true }}
        loop={true}
        className="h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.id}>
            <motion.div
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative h-full w-full"
            >
              {slide.type === "image" && slide.image && (
                <Image
                  src={slide.image}
                  alt={slide.title || "Slide Image"}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg transform group-hover:scale-105 transition-all duration-500 ease-in-out" // Use group-hover if you want hover on SwiperSlide
                  priority={index === 0} // Prioritize loading the first image
                />
              )}
              {slide.type === "video" && slide.videoSrc && (
                <video
                  src={slide.videoSrc}
                  poster={slide.poster}
                  autoPlay
                  loop
                  muted
                  playsInline // Important for iOS
                  className="absolute inset-0 w-full h-full object-cover rounded-lg transform group-hover:scale-105 transition-all duration-500 ease-in-out"
                >
                  Your browser does not support the video tag.
                </video>
              )}
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent flex items-center"> {/* Slightly darker gradient for better text contrast */}
                <motion.div
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.3 }}
                  className="text-white px-6 sm:px-10 md:px-16 max-w-md md:max-w-lg lg:max-w-xl" // Responsive padding and max-width
                >
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight"> {/* Responsive text size */}
                    {slide.title}{" "}
                    {/* Example of conditional rendering for specific slide, you can remove or adapt it */}
                    {/* <span className="text-green-500">{slide.id === 1 && "BRAND"}</span> */}
                  </h1>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.5 }}
                    className="text-xl sm:text-2xl mt-3 text-yellow-400" // Responsive text size
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