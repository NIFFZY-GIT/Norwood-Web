"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const ProductShowcase = ({ product }: { product: { id: number; name: string; description: string; image: string } }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col md:flex-row items-center gap-8 p-6 rounded-xl bg-white/10 backdrop-blur-lg shadow-lg hover:shadow-2xl transition-all border border-gray-600"
    >
      {/* Product Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(255, 215, 0, 0.5)" }}
        className="w-full md:w-1/3"
      >
        <Image
          src={product.image}
          alt={product.name}
          width={350}
          height={350}
          className="w-full h-auto object-contain rounded-lg shadow-md border border-yellow-500"
        />
      </motion.div>

      {/* Product Details */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-left md:w-2/3"
      >
        <h3 className="text-4xl font-bold text-gold-400">{product.name}</h3>
        <p className="mt-4 text-lg text-gray-300">{product.description}</p>
      </motion.div>
    </motion.div>
  );
};

export default ProductShowcase;
