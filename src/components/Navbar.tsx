"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 w-full z-50 h-30 px-10 flex items-center shadow-md transition-all ${
        isScrolled ? "bg-green-700 shadow-lg" : "bg-white"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between w-full">
        {/* Logo and Brand Name */}
        <div className="flex items-center space-x-4">
          <Image src="/logo.png" alt="Norwood Empire Logo" width={90} height={70} />
          <span
            className={`font-bold text-lg transition-all ${
              isScrolled ? "text-white" : "text-green-600"
            }`}
          >
            NORWOOD EMPIRE
          </span>
        </div>
        {/* Navigation Links */}
        <div className="flex space-x-8">
          {["/", "/Our-Story", "/Products", "/Contact-Us"].map((path, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}
              className="relative"
            >
              <Link
                href={path}
                className={`text-lg font-medium transition-all ${
                  isScrolled ? "text-white" : "text-green-600 hover:text-green-800"
                }`}
              >
               {path === "/" ? "HOME" : path.replace(/\//g, "").replace(/-/g, " ").toUpperCase()}
              </Link>
              <motion.div
                className="absolute left-0 w-full h-0.5 bg-green-500 scale-x-0 origin-left transition-transform"
                whileHover={{ scaleX: 1 }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
