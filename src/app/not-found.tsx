"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Neko } from "neko-ts";

export default function NotFound() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const parallax = (offset: number) => ({
    transform: `translate(${mousePosition.x / offset}px, ${mousePosition.y / offset}px)`,
  });

  useEffect(() => {
    const neko = new Neko({
      autoStart: true,
      scale: 0.5,
      sprite: "https://raw.githubusercontent.com/adryd325/oneko.js/main/neko.gif",
    });

    return () => {
      neko.destroy(); // ✅ Properly clean up
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-100 via-green-200 to-green-300 px-6 overflow-hidden relative">

      {/* Floating Leaves and Butterflies */}
      <motion.div
        className="absolute top-10 left-10 text-5xl select-none"
        style={parallax(40)}
        animate={{ y: [0, 10, 0], rotate: [0, 10, -10, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
      >
        🍃
      </motion.div>
      <motion.div
        className="absolute bottom-10 right-10 text-6xl select-none"
        style={parallax(30)}
        animate={{ y: [0, -10, 0], rotate: [0, -5, 5, 0] }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
      >
        🦋
      </motion.div>
      <motion.div
        className="absolute top-1/3 right-1/4 text-5xl select-none"
        style={parallax(20)}
        animate={{ y: [0, 15, 0], rotate: [0, 10, -10, 0] }}
        transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
      >
        🌳
      </motion.div>
      <motion.div
        className="absolute top-1/4 left-1/3 text-5xl select-none"
        style={parallax(25)}
        animate={{ y: [0, -15, 0], rotate: [0, -5, 5, 0] }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
      >
        🍃
      </motion.div>

      {/* Animated 404 Text */}
      <motion.h1
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="text-[100px] font-extrabold text-green-700 mb-4 drop-shadow-lg z-10 select-none"
      >
        404
      </motion.h1>

      {/* Smooth Animated Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="text-2xl text-green-900 mb-6 text-center z-10"
      >
        Lost deep in the forest of snacks 🌲🍪
      </motion.p>

      {/* Typing Effect Simulation */}
      <motion.p
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ duration: 3, ease: "easeInOut" }}
        className="overflow-hidden whitespace-nowrap border-r-2 border-green-600 text-lg text-green-800 mb-10 z-10"
      >
        Looking for a way back to the snack trail...
      </motion.p>

      {/* Interactive Button */}
      <motion.div
        whileHover={{ scale: 1.1, rotate: 3 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="z-10"
      >
        <Link href="/">
          <button className="px-10 py-4 bg-green-600 text-white text-lg rounded-full shadow-lg hover:bg-green-700 transition duration-300">
            Return Home
          </button>
        </Link>
      </motion.div>

      {/* Floating Fun Text */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ repeat: Infinity, duration: 3, repeatType: "reverse" }}
        className="mt-12 text-sm text-green-700 z-10"
      >
        Don’t worry, a cookie 🍪 will guide you back!
      </motion.p>
    </div>
  );
}
