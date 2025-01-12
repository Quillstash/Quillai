"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import Typewriter from "typewriter-effect";
import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Features } from "./howitworks";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const BackgroundShape = ({ initialX, initialY }:any) => {
  const { scrollYProgress } = useScroll();
  const x = useTransform(scrollYProgress, [0, 1], [initialX, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [initialY, 0]);

  return (
    <motion.div
      className="absolute w-16 h-16 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 opacity-20"
      style={{ x, y }}
    />
  );
};

export const Hero = () => {
  const [shapes, setShapes] = useState<{ id: number; x: number; y: number }[]>([]);
  const sectionRef = useRef(null);

  useEffect(() => {
    const newShapes = Array.from({ length: 10 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
    }));
    setShapes(newShapes);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex flex-col items-center justify-center hero-gradient px-4 relative overflow-hidden"
    >
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
              strings: ["Write Smarter...", "Rank Faster...", "Save Time..."],
              autoStart: true,
              loop: true,
            }}
          />
        </div>
        <p className="text-xl text-gray-600 mb-8">
          Your all-in-one AI article generator for SEO success.
        </p>
          {/* Onboarding Video Section */}
          <div className="w-full max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          {/* <h2 className="text-2xl font-semibold text-gray-800 p-4">
            Watch Our Onboarding Video
          </h2> */}
          <div className="aspect-w-16 aspect-h-9">
            <video
              src="/video/onboarding.mp4"
              
              autoPlay
              muted
              loop
              className="w-full h-full"
            />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center my-12">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium"
          >
            <Link href="/login">
            
            Start Free Trial
            </Link>
          </motion.button>
          <Dialog>
            <DialogTrigger asChild>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 border border-gray-300   rounded-lg font-medium text-gray-700 hover:bg-gray-50"
              >
                How It Works
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

      {/* Background Shapes */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10" />
        {shapes.map((shape) => (
          <BackgroundShape
            key={shape.id}
            initialX={shape.x}
            initialY={shape.y}
          />
        ))}
      </div>
    </section>
  );
};
