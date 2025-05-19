"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  bgColor: string;
}

const ProductShowcase = ({ product }: { product: Product }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0,0,0,0.3)" }}
      // Added a default border color (e.g., border-gray-700) if product.bgColor is very light,
      // or ensure product.bgColor provides enough contrast for the default white border.
      // Current setup: border-4 border-opacity-50 (color defaults to currentColor, which is text-white)
      className={`p-6 rounded-lg shadow-lg transition-all transform border-4 border-opacity-50 ${product.bgColor} text-white`}
    >
      <div className="flex justify-center mb-4"> {/* Added mb-4 for spacing */}
        <Image
          src={product.image}
          alt={product.name}
          width={150} // Intrinsic_width of image
          height={150} // Intrinsic_height of image
          className="w-32 h-32 object-contain rounded-md shadow-md" // Display_size
        />
      </div>
      <h3 className="text-xl font-bold mt-4">{product.name}</h3>
      <p className="text-sm mt-2 min-h-[3em]">{product.description}</p> {/* Added min-h for consistent height */}
      <p className="text-lg font-bold mt-4">${product.price}</p>
      <motion.button
        whileHover={{ scale: 1.1 }}
        className="mt-4 bg-white text-gray-900 px-4 py-2 rounded-full font-semibold shadow-md hover:bg-gray-200 transition"
      >
        Add to Cart
      </motion.button>
    </motion.div>
  );
};

export default ProductShowcase;