import type { LucideIcon } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface FloatingElementProps {
  icon?: LucideIcon;
  imageSrc?: string;
  className?: string;
  top: string;
  left?: string; // Optional left position
  right?: string; // Optional right position
  color: string;
}

export const FloatingElement = ({
  icon: Icon,
  imageSrc,
  className,
  top,
  left,
  right,
  color,
}: FloatingElementProps) => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <motion.div
      className={cn(
        "absolute hidden xl:block animate-float",
        className
      )}
      style={{ top, left, right, y }}
      whileHover={{ scale: 1.1 }}
      transition={{ duration: 0.2 }}
    >
      {Icon && <Icon className={`w-12 h-12 ${color}`} />}
      {imageSrc && (
        <Image
          src={imageSrc}
          alt=""
          className="w-12 h-12 rounded-full object-cover"
        />
      )}
    </motion.div>
  );
};