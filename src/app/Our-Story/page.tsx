"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const OurStoryPage = () => {
  return (
    <section className="py-12 md:py-20 bg-gradient-to-r from-yellow-400 to-orange-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-extrabold text-white mb-4 md:mb-6 leading-tight"
        >
          Our Story
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base md:text-lg text-white max-w-2xl mx-auto"
        >
          At Norwood Empire, our journey started with a simple goal — to bring
          high-quality, authentic flavors to the world. From humble beginnings
          to becoming a trusted name, our commitment to excellence has never wavered.
        </motion.p>

        {/* Story Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mt-12">
          
          {/* Left - Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.03 }}
            className="relative group"
          >
            <div className="overflow-hidden rounded-xl shadow-2xl aspect-[4/3]">
              <Image
                src="/our-story.jpg"
                alt="Our Journey"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg"
            >
              <h3 className="text-base md:text-lg font-bold text-gray-900">Est. 2015</h3>
              <p className="text-gray-700 text-xs md:text-sm">
                A legacy of excellence in food & beverages.
              </p>
            </motion.div>
          </motion.div>

          {/* Right - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-left text-white space-y-6"
          >
            <h3 className="text-2xl md:text-3xl font-bold leading-snug">
              A Journey of Passion & Quality
            </h3>
            <p className="text-base md:text-lg leading-relaxed">
              From sourcing the finest ingredients to crafting recipes that bring joy,
              our mission has always been to deliver products that delight our customers.
              We believe in quality, authenticity, and creating flavors that leave a lasting impression.
            </p>
            <p className="text-base md:text-lg leading-relaxed">
              Our dedication to excellence has led us to expand our product range, reaching homes and businesses worldwide.
              As we continue to grow, we remain committed to our roots — offering nothing but the best.
            </p>

            {/* Call to Action */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="inline-block mt-4 bg-white text-gray-900 px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-gray-100 transition-all"
            >
              Learn More
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default OurStoryPage;
