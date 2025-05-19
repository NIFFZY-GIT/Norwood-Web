"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  bgColor: string; // We'll use this as an accent
}

const ProductShowcase = ({ product }: { product: Product }) => {
  return (
    <motion.div
      // Initial animation for the card itself when it appears on the page
      // This is separate from the page-level stagger animation
      // If the page handles stagger, this might be simpler or removed.
      // For now, keeping it for individual card entrance.
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5, boxShadow: "0px 12px 24px rgba(0,0,0,0.35)" }}
      className={`
        bg-neutral-800 
        rounded-xl 
        shadow-lg 
        overflow-hidden 
        transition-all 
        duration-300 
        ease-in-out
        flex 
        flex-col
        h-full // Ensures cards in a grid row take up same height if needed
        border-t-4 
        ${product.bgColor.replace('bg-', 'border-')} // Use bgColor for top border accent
      `}
    >
      {/* Image Container */}
      <div className="relative w-full h-48 sm:h-56 md:h-60 bg-neutral-700">
        <Image
          src={product.image}
          alt={product.name}
          layout="fill"
          objectFit="contain" // 'cover' might look more modern if images are suitable
          className="p-4" // Add some padding around the image within its container
        />
      </div>

      {/* Content Area */}
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold text-white mb-2 truncate" title={product.name}>
          {product.name}
        </h3>

        <p className="text-sm text-neutral-400 mb-4 flex-grow min-h-[3.5em] line-clamp-3">
          {/* line-clamp-3 will truncate description to 3 lines if it's too long */}
          {product.description}
        </p>

        <div className="flex justify-between items-center mt-auto pt-3 border-t border-neutral-700">
            <p className="text-2xl font-bold text-white">
                ${product.price}
            </p>
            <motion.button
                whileHover={{ scale: 1.05, backgroundColor: product.bgColor.replace('bg-', 'hover:bg-') }} // Use product color on hover
                whileTap={{ scale: 0.95 }}
                // Use a contrasting color for the button, e.g., a primary color for your site
                // Or make it subtly related to the product.bgColor
                className={`
                bg-sky-600 
                hover:bg-sky-500 
                text-white 
                font-medium 
                py-2 
                px-5 
                rounded-lg 
                text-sm 
                transition-colors
                duration-200
                `}
            >
                Add to Cart
            </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductShowcase;