// pages/404.js
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Custom404() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-8">
      <motion.h1 
        initial={{ opacity: 0, scale: 0.8 }} 
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-6xl font-bold text-gray-800 mb-4"
      >
        404
      </motion.h1>

      <motion.p 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-xl text-gray-600 mb-8 text-center"
      >
        Oops! The page you&apos;re looking for doesn&apos;t exist.
      </motion.p>

      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <Link href="/" className="px-6 py-3 bg-blue-600 text-white rounded-2xl text-lg hover:bg-blue-700 transition">
          Go Home
        </Link>
      </motion.div>

      <motion.div 
        initial={{ rotate: -10 }} 
        animate={{ rotate: 10 }} 
        transition={{ repeat: Infinity, repeatType: "reverse", duration: 2 }}
        className="mt-10"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-40 w-40 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M12 2.25c5.385 0 9.75 4.365 9.75 9.75S17.385 21.75 12 21.75 2.25 17.385 2.25 12 6.615 2.25 12 2.25z" />
        </svg>
      </motion.div>
    </div>
  );
}
