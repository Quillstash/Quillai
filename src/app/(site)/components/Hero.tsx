"use client";
import { motion } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Features } from "./howitworks";
import {
  Feather,
  FileText,
  Pen,
  Lightbulb,
  Bot,
  Chrome,
  Zap,
  Wrench,
} from "lucide-react";
import { FloatingElement } from "./Floatingelements";

export const Hero = () => {
  const sectionRef = useRef(null);

  return (
    <section
      ref={sectionRef}
      className="py-16 flex flex-col items-center justify-center hero-gradient px-4 relative overflow-hidden mt-20"
    >
      <FloatingElement icon={Bot} top="7%" left="10%" color="text-[#3B82F6]" />

      <FloatingElement
        icon={FileText}
        top="30%"
        right="10%"
        color="text-[#8B5CF6]"
      />

      <FloatingElement icon={Pen} top="65%" left="11%" color="text-[#22C55E]" />

      <FloatingElement
        icon={Lightbulb}
        top="7%"
        right="12%"
        color="text-[#FACC15]"
      />

      <FloatingElement
        icon={Feather}
        top="40%"
        left="9%"
        color="text-[#EC4899]"
      />

      <FloatingElement
        icon={Chrome}
        top="60%"
        right="11%"
        color="text-[#3B82F6]"
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-4xl mx-auto"
      >
        <h1 className="text-4xl font-bold tracking-tight mb-8 md:text-5xl lg:text-6xl">
          Write Content That{" "}
          <span className="bg-gradient-to-r from-purple-600 to-blue-600 text-transparent bg-clip-text">
            Actually Ranks
          </span>
        </h1>
        <div className="text-md md:text-md text-gray-600 mb-6 flex justify-center items-center gap-4">
          <div>
            <span className="font-bold">✓</span> Writes like a{" "}
            <strong>human</strong>
          </div>
          <div>
            <span className="font-bold">✓</span> Optimized to{" "}
            <strong>rank first</strong>
          </div>
          <div>
            <span className="font-bold">✓</span> <strong>One-click</strong>{" "}
            generation
          </div>
        </div>
        <p className="text-lg text-gray-800 md:text-xl mb-12">
          Stop wasting time on content that gets buried. Our AI-powered platform
          helps you create SEO-optimized content that ranks higher, faster.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
          <Link href="/login" >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium flex items-center gap-2 justify-center"
            >
              <Zap size={16} />
              Start With 5 Free Articles
            </motion.button>
          </Link>
          <Dialog>
            <DialogTrigger asChild>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50"
              >
                <div className="flex justify-center items-center gap-2">
                  <Wrench size={16} />
                  How It Works
                </div>
              </motion.button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-4xl max-h-[75vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-center mb-4">
                  Welcome to QuillAi
                </DialogTitle>
              </DialogHeader>
              <Features />
            </DialogContent>
          </Dialog>
        </div>
      </motion.div>
    </section>
  );
};
