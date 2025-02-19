"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const OurStoryPage = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-yellow-400 to-orange-500">
      <div className="max-w-7xl mx-auto px-6 text-center">
        
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-extrabold text-white mb-6"
        >
          Our Story
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg text-white max-w-2xl mx-auto"
        >
          At Norwood Empire, our journey started with a simple goal – to bring
          high-quality, authentic flavors to the world. From humble beginnings
          to becoming a trusted name, our commitment to excellence and passion
          for delivering premium products has never wavered.
        </motion.p>

        {/* Story Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mt-12">
          
          {/* Left - Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.05 }}
            className="relative"
          >
            <Image
              src="/our-story.jpg"
              alt="Our Journey"
              width={500}
              height={300}
              className="rounded-lg shadow-lg"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="absolute -bottom-8 -right-8 bg-white p-4 rounded-lg shadow-lg"
            >
              <h3 className="text-lg font-bold text-gray-900">Est. 2015</h3>
              <p className="text-gray-700 text-sm">A legacy of excellence in food & beverages.</p>
            </motion.div>
          </motion.div>

          {/* Right - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-left text-white"
          >
            <h3 className="text-3xl font-bold mb-4">A Journey of Passion & Quality</h3>
            <p className="text-lg leading-relaxed">
              From sourcing the finest ingredients to crafting recipes that bring joy,
              our mission has always been to deliver products that delight our customers.
              We believe in quality, authenticity, and creating flavors that leave a lasting impression.
            </p>
            <p className="mt-4 text-lg leading-relaxed">
              Our dedication to excellence has led us to expand our product range, reaching homes and businesses worldwide.
              As we continue to grow, we remain committed to our roots – offering nothing but the best.
            </p>

            {/* Call to Action */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
              className="mt-6 bg-white text-gray-900 px-6 py-3 rounded-full font-semibold shadow-md hover:bg-gray-200 transition"
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
