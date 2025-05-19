"use client";

import { motion } from "framer-motion";

const features = [
  {
    id: "01",
    title: "Expertise and Experience",
    description:
      "With 10 years of experience in the food industry, we have honed our expertise to consistently deliver products that meet the highest standards of quality, safety, and taste.",
    bgColor: "bg-blue-500", // Accent from theme
    textColor: "text-white",
  },
  {
    id: "02",
    title: "Authentic and Unique Flavors",
    description:
      "Our recipes are crafted to bring you authentic, unique flavors that resonate with your customers, making every bite a delightful experience.",
    bgColor: "bg-yellow-500", // Accent from theme
    textColor: "text-black", // Specific text color for yellow BG for contrast
    highlight: true,
  },
  {
    id: "03",
    title: "Reasonable Pricing",
    description:
      "We offer high-quality products at reasonable prices, ensuring excellent value for your investment without compromising on quality.",
    bgColor: "bg-green-500", // Accent from theme
    textColor: "text-white",
  },
  {
    id: "04",
    title: "Superior Quality and Freshness",
    description:
      "We use only the finest, freshest ingredients, sourced from trusted suppliers, ensuring our products stand out for their exceptional taste and nutritional value.",
    bgColor: "bg-purple-500", // Accent from theme
    textColor: "text-white",
  },
  {
    id: "05",
    title: "Proven Trust and Reliability",
    description:
      "Our long-standing partnerships with clients and a track record of consistent quality and timely delivery make us a reliable choice in the industry.",
    bgColor: "bg-red-500", // Accent from theme
    textColor: "text-white",
  },
];

const WhyChoose = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-gray-100 to-gray-200">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-xl mb-12 text-center mx-auto"
        >
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900">
            Why Choose <br /> Our Products?
          </h2>
          <p className="text-gray-700 mt-4 text-lg">
            Whether you’re looking for premium quality, unique flavors, or reliability, we’ve got you covered.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
              whileHover={{ scale: 1.03, y: -5, boxShadow: "0px 12px 24px rgba(0,0,0,0.15)" }}
              className={`p-6 md:p-8 rounded-xl shadow-lg transition-all transform border-4 border-current border-opacity-20 ${feature.bgColor} ${feature.textColor} flex flex-col`}
              // Note: 'border-current border-opacity-20' will use the feature.textColor for the border color
            >
              {/* Animated Number */}
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.4 }}
                className={`text-3xl sm:text-4xl font-extrabold ${feature.textColor} opacity-75 mb-2`} // Number slightly less prominent
              >
                {feature.id}
              </motion.span>

              <h3 className={`text-xl sm:text-2xl font-bold mt-2 mb-3 ${feature.textColor}`}>{feature.title}</h3>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.5 }}
                className={`mt-auto text-base sm:text-lg leading-relaxed ${feature.textColor} opacity-90`} // Paragraph text slightly less prominent
              >
                {feature.description}
              </motion.p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;