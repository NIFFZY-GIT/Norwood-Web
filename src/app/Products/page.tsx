"use client";

import { motion } from "framer-motion";
import ProductShowcase from "@/components/ProductShowcase";

const products = [
  { id: 1, name: "Laska Tea", description: "Premium quality tea with a rich aroma and smooth taste.", image: "/laska-tea.png" },
  { id: 2, name: "Coconut Rock", description: "Crunchy coconut snacks, perfect for a tropical treat.", image: "/coconut-rock.png" },
  { id: 3, name: "Magic Murukku", description: "Spicy and crispy murukku, a perfect companion for tea time.", image: "/magic-murukku.png" },
  { id: 4, name: "Milk Toffee", description: "Traditional milk toffee with a sweet and creamy flavor.", image: "/milk-toffee.png" },
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
