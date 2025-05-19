"use client";

import { motion } from "framer-motion";
import ProductShowcase from "@/components/ProductShowcase"; // Assuming ProductShowcase.tsx is in components folder

// Updated products array with price, bgColor, and corrected image paths
const products = [
  {
    id: 1,
    name: "Bathala Bite",
    description: "Premium quality tea with a rich aroma and smooth taste.",
    image: "/Norwood product pics/Bathala bite/bathalabite.png",
    price: "12.99",
    bgColor: "bg-red-700",
  },
  {
    id: 2,
    name: "Chips",
    description: "Crunchy coconut snacks, perfect for a tropical treat.",
    image: "public/Norwood product pics/Chips/Chips2.HEIC",
    price: "5.49",
    bgColor: "bg-blue-700",
  }, // Corrected image path
  {
    id: 3,
    name: "Coconut toffee",
    description: "Spicy and crispy murukku, a perfect companion for tea time.",
    image: "/magic-murukku.png",
    price: "7.99",
    bgColor: "bg-green-700",
  },
  {
    id: 4,
    name: "Coil murukku",
    description: "Traditional milk toffee with a sweet and creamy flavor.",
    image: "/milk-toffee.png",
    price: "6.49",
    bgColor: "bg-purple-700",
  },
  {
    id: 5,
    name: "Dhal",
    description: "Savory and spiced dhal, great for a nutritious snack.",
    image: "/milk-toffee.png",
    price: "4.99",
    bgColor: "bg-orange-600",
  }, // Placeholder image, updated description
  {
    id: 6,
    name: "Garlic Bite",
    description: "Crunchy bites infused with a strong garlic flavor.",
    image: "/milk-toffee.png",
    price: "5.99",
    bgColor: "bg-yellow-600",
  }, // Placeholder image
  {
    id: 7,
    name: "Ghee cookies",
    description: "Buttery cookies made with pure ghee, melts in your mouth.",
    image: "/milk-toffee.png",
    price: "8.99",
    bgColor: "bg-pink-600",
  }, // Placeholder image
  {
    id: 8,
    name: "Manioc",
    description: "Crispy manioc chips, a delightful and starchy snack.",
    image: "/milk-toffee.png",
    price: "6.99",
    bgColor: "bg-indigo-600",
  }, // Placeholder image
  {
    id: 9,
    name: "Milk toffee",
    description: "Classic sweet and creamy milk toffee, a local favorite.",
    image: "/milk-toffee.png",
    price: "9.99",
    bgColor: "bg-teal-600",
  },
  {
    id: 10,
    name: "Mixture",
    description: "A savory mix of various fried snacks, perfect for sharing.",
    image: "/milk-toffee.png",
    price: "7.49",
    bgColor: "bg-cyan-600",
  }, // Placeholder image
  {
    id: 11,
    name: "Ribbon Bite",
    description: "Thin, crispy, ribbon-shaped savory snack.",
    image: "/milk-toffee.png",
    price: "5.79",
    bgColor: "bg-lime-600",
  }, // Placeholder image
  {
    id: 12,
    name: "Ring Bite",
    description: "Crunchy, ring-shaped bites, seasoned to perfection.",
    image: "/milk-toffee.png",
    price: "5.89",
    bgColor: "bg-emerald-600",
  }, // Placeholder image
  {
    id: 13,
    name: "Roasted bite",
    description: "Spicy roasted snack, full of flavor and crunch.",
    image: "/milk-toffee.png",
    price: "6.29",
    bgColor: "bg-amber-600",
  }, // Placeholder image
  {
    id: 14,
    name: "Tip tip",
    description: "Small, crunchy, and flavored bites, an addictive snack.",
    image: "/milk-toffee.png",
    price: "4.59",
    bgColor: "bg-rose-600",
  }, // Placeholder image
];

const ProductsPage = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-black via-gray-900 to-black text-white min-h-screen">
      {" "}
      {/* Added min-h-screen */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {" "}
        {/* Adjusted padding for responsiveness */}
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-12" /* Assuming gold-400 is yellow-400 or custom */
        >
          Our Exclusive Collection
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg text-gray-300 max-w-3xl mx-auto mb-16" /* Added mb-16 */
        >
          Indulge in the finest selection of premium products crafted to
          perfection. Experience quality, taste, and luxury like never before.
        </motion.p>
        {/* Product Showcase List - Changed to a grid layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {products.map((product) => (
            <ProductShowcase key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsPage;
