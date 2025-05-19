"use client";

import { motion } from "framer-motion";
import ProductShowcase from "@/components/ProductShowcase";

const products = [
  { id: 1, name: "Bathala Bite", description: "Premium quality tea with a rich aroma and smooth taste.", image: "public\Norwood product pics\Bathala bite\IMG_0236.HEIC" },
  { id: 2, name: "Chips", description: "Crunchy coconut snacks, perfect for a tropical treat.", image: "/coconut-rock.png" },
  { id: 3, name: "Coconut toffee", description: "Spicy and crispy murukku, a perfect companion for tea time.", image: "/magic-murukku.png" },
  { id: 4, name: "Coil murukku", description: "Traditional milk toffee with a sweet and creamy flavor.", image: "/milk-toffee.png" },
  { id: 5, name: "Dhal", description: "Traditional milk toffee with a sweet and creamy flavor.", image: "/milk-toffee.png" },
  { id: 6, name: "Garlic Bite", description: "Traditional milk toffee with a sweet and creamy flavor.", image: "/milk-toffee.png" },
  { id: 7, name: "Ghee cookies", description: "Traditional milk toffee with a sweet and creamy flavor.", image: "/milk-toffee.png" },
  { id: 8, name: "Manioc", description: "Traditional milk toffee with a sweet and creamy flavor.", image: "/milk-toffee.png" },
  { id: 9, name: "Milk toffee", description: "Traditional milk toffee with a sweet and creamy flavor.", image: "/milk-toffee.png" },
  { id: 10, name: "Mixture", description: "Traditional milk toffee with a sweet and creamy flavor.", image: "/milk-toffee.png" },
  { id: 11, name: "Ribbon Bite", description: "Traditional milk toffee with a sweet and creamy flavor.", image: "/milk-toffee.png" },
  { id: 12, name: "Ring Bite", description: "Traditional milk toffee with a sweet and creamy flavor.", image: "/milk-toffee.png" },
  { id: 13, name: "Roasted bite", description: "Traditional milk toffee with a sweet and creamy flavor.", image: "/milk-toffee.png" },
  { id: 14, name: "Tip tip", description: "Traditional milk toffee with a sweet and creamy flavor.", image: "/milk-toffee.png" },

];

const ProductsPage = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-black via-gray-900 to-black text-white">
      <div className="max-w-7xl mx-auto px-6 text-center">
        
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-6xl font-extrabold text-gold-400 mb-12"
        >
          Our Exclusive Collection
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg text-gray-300 max-w-3xl mx-auto"
        >
          Indulge in the finest selection of premium products crafted to perfection. Experience quality, taste, and luxury like never before.
        </motion.p>

        {/* Product Showcase List */}
        <div className="flex flex-col gap-12 mt-12">
          {products.map((product) => (
            <ProductShowcase key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsPage;
