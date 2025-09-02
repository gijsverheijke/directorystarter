'use client';

import { motion } from 'motion/react';
import { ReactNode } from 'react';

interface HeroAnimationProps {
  children: ReactNode;
}

export default function HeroAnimation({ children }: HeroAnimationProps) {
  return (
    <motion.div 
      className="relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Animated color orbs */}
      <motion.div
        className="absolute -top-10 -left-10 h-40 w-40 rounded-full bg-chart-1/30 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 30, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-chart-2/30 blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -40, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
      <motion.div
        className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-chart-3/25 blur-2xl"
        animate={{
          scale: [1, 1.5, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />
      <motion.div
        className="absolute top-1/4 right-1/4 h-24 w-24 rounded-full bg-chart-4/20 blur-2xl"
        animate={{
          scale: [0.8, 1.2, 0.8],
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5
        }}
      />
      <motion.div
        className="absolute bottom-1/4 left-1/4 h-28 w-28 rounded-full bg-chart-5/25 blur-2xl"
        animate={{
          scale: [1, 1.4, 1],
          x: [0, -30, 0],
          y: [0, 40, 0],
        }}
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5
        }}
      />
      
      {/* Main content with stagger animation */}
      <motion.div 
        className="relative mx-auto max-w-2xl text-center"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ 
          duration: 0.8,
          delay: 0.2,
          ease: [0.215, 0.61, 0.355, 1]
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}