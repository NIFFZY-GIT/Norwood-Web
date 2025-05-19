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
