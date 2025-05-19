// "use client";

// import { motion } from "framer-motion";

// const features = [
//   {
//     id: "01",
//     title: "Expertise and Experience",
//     description:
//       "With 10 years of experience in the food industry, we have honed our expertise to consistently deliver products that meet the highest standards of quality, safety, and taste.",
//     bgColor: "bg-blue-500",
//     textColor: "text-white",
//   },
//   {
//     id: "02",
//     title: "Authentic and Unique Flavors",
//     description:
//       "Our recipes are crafted to bring you authentic, unique flavors that resonate with your customers, making every bite a delightful experience.",
//     bgColor: "bg-yellow-500",
//     textColor: "text-black",
//     highlight: true,
//   },
//   {
//     id: "03",
//     title: "Reasonable Pricing",
//     description:
//       "We offer high-quality products at reasonable prices, ensuring excellent value for your investment without compromising on quality.",
//     bgColor: "bg-green-500",
//     textColor: "text-white",
//   },
//   {
//     id: "04",
//     title: "Superior Quality and Freshness",
//     description:
//       "We use only the finest, freshest ingredients, sourced from trusted suppliers, ensuring our products stand out for their exceptional taste and nutritional value.",
//     bgColor: "bg-purple-500",
//     textColor: "text-white",
//   },
//   {
//     id: "05",
//     title: "Proven Trust and Reliability",
//     description:
//       "Our long-standing partnerships with clients and a track record of consistent quality and timely delivery make us a reliable choice in the industry.",
//     bgColor: "bg-red-500",
//     textColor: "text-white",
//   },
// ];

// const WhyChoose = () => {
//   return (
//     <section className="py-16 bg-gradient-to-r from-gray-100 to-gray-200">
//       <div className="max-w-7xl mx-auto px-6">
//         {/* Heading */}
//         <motion.div
//           initial={{ opacity: 0, y: -30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="max-w-lg mb-10 text-center mx-auto"
//         >
//           <h2 className="text-5xl font-extrabold text-gray-900">
//             Why Choose <br /> Our Products?
//           </h2>
//           <p className="text-gray-600 mt-3">
//             Whether you’re looking for premium quality, unique flavors, or reliability, we’ve got you covered.
//           </p>
//         </motion.div>

//         {/* Features Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//           {features.map((feature, index) => (
//             <motion.div
//               key={feature.id}
//               initial={{ opacity: 0, scale: 0.9 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ duration: 0.6, delay: index * 0.2 }}
//               whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0,0,0,0.2)" }}
//               className={`p-6 rounded-lg shadow-lg transition-all transform border-4 border-opacity-50 ${feature.bgColor} ${feature.textColor}`}
//             >
//               {/* Animated Number */}
//               <motion.span
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ duration: 0.5 }}
//                 className={`text-4xl font-extrabold ${feature.textColor}`}
//               >
//                 {feature.id}
//               </motion.span>

//               <h3 className="text-2xl font-bold mt-2">{feature.title}</h3>
//               <motion.p
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5, delay: 0.3 }}
//                 className="mt-2 text-lg"
//               >
//                 {feature.description}
//               </motion.p>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default WhyChoose;
"use client";

import { motion } from "framer-motion";
import React from 'react'; // Import React for CSSProperties

// Define actual color values for inline styles
const inlineColorStyles = {
  default: {
    card: {
      backgroundColor: '#FFFFFF', // white
      borderColor: '#E5E7EB', // gray-200
    } as React.CSSProperties,
    idText: { color: '#2563EB', opacity: 0.75 } as React.CSSProperties, // blue-600
    titleText: { color: '#111827' } as React.CSSProperties, // gray-900
    descriptionText: { color: '#374151' } as React.CSSProperties, // gray-700
  },
  blue: {
    card: {
      backgroundColor: '#2563EB', // blue-600
      borderColor: '#1D4ED8', // blue-700
    } as React.CSSProperties,
    idText: { color: '#FFFFFF', opacity: 0.75 } as React.CSSProperties,
    titleText: { color: '#FFFFFF' } as React.CSSProperties,
    descriptionText: { color: '#DBEAFE', opacity: 0.90 } as React.CSSProperties, // blue-100
  },
  green: {
    card: {
      backgroundColor: '#16A34A', // green-600
      borderColor: '#15803D', // green-700
    } as React.CSSProperties,
    idText: { color: '#FFFFFF', opacity: 0.75 } as React.CSSProperties,
    titleText: { color: '#FFFFFF' } as React.CSSProperties,
    descriptionText: { color: '#DCFCE7', opacity: 0.90 } as React.CSSProperties, // green-100
  },
  purple: {
    card: {
      backgroundColor: '#7E22CE', // purple-600
      borderColor: '#6B21A8', // purple-700
    } as React.CSSProperties,
    idText: { color: '#FFFFFF', opacity: 0.75 } as React.CSSProperties,
    titleText: { color: '#FFFFFF' } as React.CSSProperties,
    descriptionText: { color: '#F3E8FF', opacity: 0.90 } as React.CSSProperties, // purple-100
  },
};

// 1. Define a type for the keys of inlineColorStyles
type AccentKey = keyof typeof inlineColorStyles;

// Define the structure for a single feature
interface Feature {
  id: string;
  title: string;
  description: string;
  accent: AccentKey; // 2. Use this type for the accent property
}

const featuresData: Feature[] = [ // Type the array
  {
    id: "01",
    title: "Expertise and Experience",
    description:
      "With 10 years of experience in the food industry, we have honed our expertise to consistently deliver products that meet the highest standards of quality, safety, and taste.",
    accent: "default",
  },
  {
    id: "02",
    title: "Authentic and Unique Flavors",
    description:
      "Our recipes are crafted to bring you authentic, unique flavors that resonate with your customers, making every bite a delightful experience.",
    accent: "blue",
  },
  {
    id: "03",
    title: "Reasonable Pricing",
    description:
      "We offer high-quality products at reasonable prices, ensuring excellent value for your investment without compromising on quality.",
    accent: "default",
  },
  {
    id: "04",
    title: "Superior Quality and Freshness",
    description:
      "We use only the finest, freshest ingredients, sourced from trusted suppliers, ensuring our products stand out for their exceptional taste and nutritional value.",
    accent: "green",
  },
  {
    id: "05",
    title: "Proven Trust and Reliability",
    description:
      "Our long-standing partnerships with clients and a track record of consistent quality and timely delivery make us a reliable choice in the industry.",
    accent: "purple",
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
          {featuresData.map((feature, index) => {
            // Now feature.accent is of type AccentKey, which is a valid index for inlineColorStyles
            const styles = inlineColorStyles[feature.accent]; // No || needed if all keys in featuresData are guaranteed to be in inlineColorStyles

            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                whileHover={{ scale: 1.03, y: -5, boxShadow: "0px 12px 24px rgba(0,0,0,0.15)" }}
                className="p-6 md:p-8 rounded-xl shadow-lg transition-all transform border-2 flex flex-col h-full"
                style={styles.card}
              >
                <motion.span
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.4 }}
                  className="text-3xl sm:text-4xl font-extrabold mb-2"
                  style={styles.idText}
                >
                  {feature.id}
                </motion.span>

                <h3
                  className="text-xl sm:text-2xl font-bold mt-2 mb-3"
                  style={styles.titleText}
                >
                  {feature.title}
                </h3>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.5 }}
                  className="mt-auto text-base sm:text-lg leading-relaxed"
                  style={styles.descriptionText}
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