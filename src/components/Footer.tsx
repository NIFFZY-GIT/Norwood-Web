"use client";

import { motion } from "framer-motion";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-12"
    >
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
        
        {/* Left: Brand Info */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-3xl font-bold text-yellow-400">Norwood Empire</h2>
          <p className="mt-2 text-gray-300">
            Bringing you premium products with quality and authenticity. 
          </p>
        </motion.div>

        {/* Center: Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col space-y-2"
        >
          <h3 className="text-xl font-semibold text-yellow-400">Quick Links</h3>
          {["About Us", "Our Products", "Contact Us", "Blog"].map((link, index) => (
            <motion.a
              key={index}
              href={`/${link.toLowerCase().replace(/\s+/g, "-")}`}
              whileHover={{ scale: 1.1, x: 5 }}
              transition={{ duration: 0.3 }}
              className="text-gray-400 hover:text-white transition"
            >
              {link}
            </motion.a>
          ))}
        </motion.div>

        {/* Right: Social Media */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h3 className="text-xl font-semibold text-yellow-400">Follow Us</h3>
          <div className="flex space-x-4 mt-4">
            {[
              { icon: FaFacebookF, link: "#" },
              { icon: FaInstagram, link: "#" },
              { icon: FaTwitter, link: "#" },
              { icon: FaLinkedinIn, link: "#" },
            ].map((social, index) => (
              <motion.a
                key={index}
                href={social.link}
                whileHover={{ scale: 1.2, rotate: 5 }}
                transition={{ duration: 0.3 }}
                className="text-gray-400 hover:text-yellow-400 transition"
              >
                <social.icon size={24} />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom Footer */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="mt-12 text-center border-t border-gray-700 pt-4"
      >
        <p className="text-gray-400 text-sm">
          © {new Date().getFullYear()} CodePulse. All Rights Reserved.
        </p>
      </motion.div>
    </motion.footer>
  );
};

export default Footer;
