"use client";

import { motion } from "framer-motion";
import ProductShowcase from "@/components/ProductShowcase"; // Assuming ProductShowcase.tsx is in components folder

// Product data remains the same
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
    image: "public/Norwood product pics/Chips/Chips2.HEIC", // Assuming this is a valid path in your public folder
    price: "5.49",
    bgColor: "bg-blue-700",
  },
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
  },
  {
    id: 6,
    name: "Garlic Bite",
    description: "Crunchy bites infused with a strong garlic flavor.",
    image: "/milk-toffee.png",
    price: "5.99",
    bgColor: "bg-yellow-600", // Consider text color if yellow is too light for white text
  },
  {
    id: 7,
    name: "Ghee cookies",
    description: "Buttery cookies made with pure ghee, melts in your mouth.",
    image: "/milk-toffee.png",
    price: "8.99",
    bgColor: "bg-pink-600",
  },
  {
    id: 8,
    name: "Manioc",
    description: "Crispy manioc chips, a delightful and starchy snack.",
    image: "/milk-toffee.png",
    price: "6.99",
    bgColor: "bg-indigo-600",
  },
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
    bgColor: "bg-cyan-600", // Consider text color if cyan is too light
  },
  {
    id: 11,
    name: "Ribbon Bite",
    description: "Thin, crispy, ribbon-shaped savory snack.",
    image: "/milk-toffee.png",
    price: "5.79",
    bgColor: "bg-lime-600", // Consider text color if lime is too light
  },
  {
    id: 12,
    name: "Ring Bite",
    description: "Crunchy, ring-shaped bites, seasoned to perfection.",
    image: "/milk-toffee.png",
    price: "5.89",
    bgColor: "bg-emerald-600",
  },
  {
    id: 13,
    name: "Roasted bite",
    description: "Spicy roasted snack, full of flavor and crunch.",
    image: "/milk-toffee.png",
    price: "6.29",
    bgColor: "bg-amber-600",
  },
  {
    id: 14,
    name: "Tip tip",
    description: "Small, crunchy, and flavored bites, an addictive snack.",
    image: "/milk-toffee.png",
    price: "4.59",
    bgColor: "bg-rose-600",
  },
];

const ProductsPage = () => {
  return (
    <section className="min-h-screen bg-neutral-950 text-neutral-100 py-16 sm:py-20 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h1 // Changed to h1 for semantic correctness (main heading of the page)
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-5"
        >
          Our Exclusive Collection
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-lg text-neutral-400 max-w-2xl mx-auto mb-12 sm:mb-16"
        >
          Indulge in the finest selection of premium products crafted to
          perfection. Experience quality, taste, and luxury like never before.
        </motion.p>

        {/* Product Showcase List - Grid with staggered animations */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8 md:gap-x-8 md:gap-y-10">
          {products.map((product, index) => (
            // This wrapper motion.div handles the staggered appearance of each card
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 + index * 0.07 }} // Staggered delay
            >
              {/* ProductShowcase handles its own internal animations (like hover) */}
              <ProductShowcase product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsPage;