"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const ProductCard = ({ product }: { product: { id: number; name: string; description: string; price: string; image: string; bgColor: string } }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0,0,0,0.3)" }}
      className={`p-6 rounded-lg shadow-lg transition-all transform border-4 border-opacity-50 ${product.bgColor} text-white`}
    >
      <div className="flex justify-center">
        <Image
          src={product.image}
          alt={product.name}
          width={150}
          height={150}
          className="w-32 h-32 object-contain rounded-md shadow-md"
        />
      </div>
      <h3 className="text-xl font-bold mt-4">{product.name}</h3>
      <p className="text-sm mt-2">{product.description}</p>
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

export default ProductCard;
