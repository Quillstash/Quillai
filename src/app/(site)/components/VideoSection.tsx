"use client";
import { motion } from "framer-motion";
import AOS from 'aos';
import { useEffect } from 'react';
import 'aos/dist/aos.css';

export const VideoSection = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <div className="relative w-full min-h-[300px] md:min-h-[500px] lg:min-h-[760px] flex justify-center">
      <div 
        data-aos="fade-up"
        className="w-full max-w-[1350px] px-4 md:px-6 lg:px-8 bg-white shadow-lg overflow-hidden rounded-xl"
      >
        <div className="aspect-w-16 aspect-h-9">
          <video
            src="https://r5xo8sk0k5.ufs.sh/f/wtzFtcdI0TupuZjIiWRxBK4SZ8XUeaCcojWDr1F6NHTEfVY9"
            autoPlay
            muted
            loop
            className="w-full h-full object-cover rounded-xl"
          />
        </div>
      </div>
    </div>
  );
};