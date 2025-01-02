"use client"
import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";

export const Hero = () => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center hero-gradient px-4 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-4xl mx-auto"
      >
        <h1 className="text-5xl md:text-7xl font-bold mb-6 gradient-text">
          Create. Rank. Dominate.
        </h1>
        <div className="text-xl md:text-2xl text-gray-600 mb-8 h-12">
          <Typewriter
            options={{
              strings: [
                "Write Smarter...",
                "Rank Faster...",
                "Save Time...",
              ],
              autoStart: true,
              loop: true,
            }}
          />
        </div>
        <p className="text-xl text-gray-600 mb-8">
          Your all-in-one AI article generator for SEO success.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium"
          >
            Start Free Trial
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50"
          >
            How It Works
          </motion.button>
        </div>
      </motion.div>
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10" />
      </div>
    </section>
  );
};