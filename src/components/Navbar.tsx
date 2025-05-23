"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setMenuOpen((open) => !open);
  const closeMenu  = () => setMenuOpen(false);

  const navLinks = [
    { path: "/",          label: "HOME"      },
    { path: "/Our-Story",  label: "OUR STORY" },
    { path: "/Products",   label: "PRODUCTS"  },
    { path: "/Contact-Us", label: "CONTACT US" },
  ];

  return (
    <>
      <motion.nav
        // only animates in once on mount
        initial   ={{ y: -50, opacity: 0 }}
        animate   ={{ y:   0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={`
          fixed top-0 left-0 w-full z-50
          px-6 sm:px-10 flex items-center
          transition-all duration-300
          ${isScrolled
             ? "bg-white/80 backdrop-blur-lg shadow-md"
             : "bg-transparent"
          }
        `}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between w-full h-20">
          {/* Logo & Brand */}
          <div
            className={`flex items-center space-x-3
              ${menuOpen ? "invisible" : ""}  /* hide when menu is open? */}
          >
            <Link href="/">
              <Image
                src="/logo.png"
                alt="Norwood Empire Logo"
                width={60}
                height={50}
                priority
              />
            </Link>
            <span className="font-bold text-2xl sm:text-3xl text-green-700">
              NORWOOD EMPIRE
            </span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-10">
            {navLinks.map((link, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className="relative group"
              >
                <Link
                  href={link.path}
                  className="text-lg font-medium text-green-700 hover:text-green-600 transition-colors"
                >
                  {link.label}
                </Link>
                <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-green-500 group-hover:w-full transition-all duration-300" />
              </motion.div>
            ))}
          </div>

          {/* Mobile Hamburger */}
          <div className={`flex md:hidden ${menuOpen ? "invisible" : ""}`}>
            <button
              onClick={toggleMenu}
              className="text-3xl text-green-700 transition-colors"
              aria-label="Toggle Menu"
            >
              {menuOpen ? <HiOutlineX /> : <HiOutlineMenu />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Slide-Out Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial ={{ x: "100%" }}
            animate ={{ x:   0   }}
            exit    ={{ x: "100%" }}
            transition={{ duration: 0.4, type: "spring", bounce: 0.2 }}
            className="
              fixed top-0 right-0 h-full w-64
              bg-white shadow-2xl flex flex-col p-8 space-y-8
              z-60  /* bump above the nav’s z-50 */
              md:hidden
            "
          >
            <div className="flex justify-end">
              <button
                onClick={closeMenu}
                aria-label="Close Menu"
                className="text-3xl text-green-700"
              >
                <HiOutlineX />
              </button>
            </div>
            {navLinks.map((link, i) => (
              <Link
                key={i}
                href={link.path}
                onClick={closeMenu}
                className="text-green-700 font-semibold text-xl hover:text-green-900 transition"
              >
                {link.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
