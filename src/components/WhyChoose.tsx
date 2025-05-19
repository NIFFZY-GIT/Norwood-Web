"use client";

import { motion } from "framer-motion";

const featuresData = [
  {
    id: "01",
    title: "Expertise and Experience",
    description:
      "With 10 years of experience in the food industry, we have honed our expertise to consistently deliver products that meet the highest standards of quality, safety, and taste.",
  },
  {
    id: "02",
    title: "Authentic and Unique Flavors",
    description:
      "Our recipes are crafted to bring you authentic, unique flavors that resonate with your customers, making every bite a delightful experience.",
    isHighlighted: true, // This feature will use the accent color
  },
  {
    id: "03",
    title: "Reasonable Pricing",
    description:
      "We offer high-quality products at reasonable prices, ensuring excellent value for your investment without compromising on quality.",
  },
  {
    id: "04",
    title: "Superior Quality and Freshness",
    description:
      "We use only the finest, freshest ingredients, sourced from trusted suppliers, ensuring our products stand out for their exceptional taste and nutritional value.",
  },
  {
    id: "05",
    title: "Proven Trust and Reliability",
    description:
      "Our long-standing partnerships with clients and a track record of consistent quality and timely delivery make us a reliable choice in the industry.",
    // You could optionally highlight another one with a secondary, more subdued accent if needed
    // or keep it consistent with defaults.
  },
];

const WhyChoose = () => {
  // Define color themes for cards
  const highlightColors = {
    bg: "bg-blue-600", // A professional blue accent
    text: "text-white",
    borderColor: "border-blue-700", // Can also use 'border-current border-opacity-30'
  };

  const defaultColors = {
    bg: "bg-white",
    idText: "text-blue-600", // Use accent for the ID number
    titleText: "text-gray-900", // Standard dark text for title
    descriptionText: "text-gray-700", // Standard lighter text for description
    borderColor: "border-gray-200", // Subtle border for default cards
  };

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
          {featuresData.map((feature, index) => {
            const isHighlightedCard = feature.isHighlighted;

            const currentBg = isHighlightedCard ? highlightColors.bg : defaultColors.bg;
            const currentIdColor = isHighlightedCard ? `${highlightColors.text} opacity-75` : `${defaultColors.idText} opacity-75`;
            const currentTitleColor = isHighlightedCard ? highlightColors.text : defaultColors.titleText;
            const currentDescriptionColor = isHighlightedCard ? `${highlightColors.text} opacity-90` : defaultColors.descriptionText;
            const currentBorderColor = isHighlightedCard ? `${highlightColors.borderColor} border-opacity-50` : defaultColors.borderColor;
            // Or for highlighted border: `border-current border-opacity-20` if currentTextColor is the main text color for that card

            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                whileHover={{ scale: 1.03, y: -5, boxShadow: "0px 12px 24px rgba(0,0,0,0.15)" }}
                className={`p-6 md:p-8 rounded-xl shadow-lg transition-all transform border-2 ${currentBorderColor} ${currentBg} flex flex-col h-full`}
              >
                {/* Animated Number */}
                <motion.span
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.4 }}
                  className={`text-3xl sm:text-4xl font-extrabold mb-2 ${currentIdColor}`}
                >
                  {feature.id}
                </motion.span>

                <h3 className={`text-xl sm:text-2xl font-bold mt-2 mb-3 ${currentTitleColor}`}>{feature.title}</h3>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.5 }}
                  className={`mt-auto text-base sm:text-lg leading-relaxed ${currentDescriptionColor}`}
                >
                  {feature.description}
                </motion.p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;