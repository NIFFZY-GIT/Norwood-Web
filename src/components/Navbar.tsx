"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const navLinks = [
    { path: "/", label: "HOME" },
    { path: "/Our-Story", label: "OUR STORY" },
    { path: "/Products", label: "PRODUCTS" },
    { path: "/Contact-Us", label: "CONTACT US" },
  ];

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 w-full z-50 px-6 sm:px-10 flex items-center transition-all duration-300 ${
        isScrolled
          ? "bg-green-700 bg-opacity-90 backdrop-blur-md shadow-lg"
          : "bg-white bg-opacity-80 backdrop-blur-md"
      }`}
    >
      <div className="max-w-8xl mx-auto flex items-center justify-between w-full h-20">
        {/* Logo and Brand Name */}
        <div className="flex items-center space-x-4">
          <Image src="/logo.png" alt="Norwood Empire Logo" width={70} height={60} />
          <span
            className={`font-bold text-2xl sm:text-3xl transition-all ${
              isScrolled ? "text-white" : "text-green-700"
            }`}
          >
            NORWOOD EMPIRE
          </span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-10">
          {navLinks.map((link, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="relative group"
            >
              <Link
                href={link.path}
                className={`text-lg font-medium transition-colors ${
                  isScrolled ? "text-white" : "text-green-700 hover:text-green-900"
                }`}
              >
                {link.label}
              </Link>
              {/* Hover underline animation */}
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-green-500 transition-all group-hover:w-full"></span>
            </motion.div>
          ))}
        </div>

        {/* Mobile Hamburger Icon */}
        <div className="flex md:hidden">
          <button
            onClick={toggleMenu}
            className={`text-3xl transition-colors ${
              isScrolled ? "text-white" : "text-green-700"
            }`}
            aria-label="Toggle Menu"
          >
            {menuOpen ? <HiOutlineX /> : <HiOutlineMenu />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4, type: "spring", bounce: 0.3 }}
              className="absolute top-20 left-4 right-4 bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl flex flex-col items-center space-y-8 py-8 md:hidden z-40"
            >
              {navLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.path}
                  onClick={closeMenu}
                  className="text-green-700 font-semibold text-xl hover:text-green-900 transition relative group"
                >
                  {link.label}
                  {/* Hover underline animation */}
                  <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-green-500 transition-all group-hover:w-full"></span>
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
