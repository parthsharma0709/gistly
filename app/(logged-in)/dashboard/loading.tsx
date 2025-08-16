"use client";

import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";


const MotionDiv = motion.div;
const MotionCard = motion(Card);

export default function SummariesLoadingSkeleton() {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const shimmerVariants = {
    initial: { x: "-100%" },
    animate: {
      x: "100%",
      transition: {
        repeat: Infinity,
        duration: 1.5,
        ease: "linear"
      }
    }
  };

  return (
    <MotionDiv
      className="w-full p-6 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 min-h-screen"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header Section */}
      <MotionDiv className="mb-8" variants={cardVariants}>
        <div className="flex justify-between items-center">
          <div className="space-y-3">
            <Skeleton className="h-10 w-64 bg-gradient-to-r from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-600" />
            <Skeleton className="h-5 w-80 bg-slate-200 dark:bg-slate-700" />
          </div>
          <Skeleton className="h-11 w-32 bg-gradient-to-r from-pink-200 to-pink-300 dark:from-pink-800 dark:to-pink-700 rounded-lg" />
        </div>
      </MotionDiv>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((index) => (
          <MotionCard
            key={index}
            className="relative overflow-hidden bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 shadow-lg hover:shadow-xl transition-shadow duration-300"
            variants={cardVariants}
          >
            {/* Shimmer Effect Overlay */}
            <MotionDiv
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 dark:via-slate-400/10 to-transparent"
              variants={shimmerVariants}
              initial="initial"
              animate="animate"
            />

            <div className="p-6 space-y-4">
              {/* Header with Delete Icon */}
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-3">
                  <Skeleton className="h-10 w-10 rounded-lg bg-gradient-to-br from-pink-200 to-red-200 dark:from-pink-800 dark:to-red-800" />
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-32 bg-slate-200 dark:bg-slate-700" />
                    <Skeleton className="h-4 w-24 bg-slate-100 dark:bg-slate-600" />
                  </div>
                </div>
                <Skeleton className="h-8 w-8 rounded-md bg-slate-100 dark:bg-slate-700" />
              </div>

              {/* Content Area */}
              <div className="space-y-3">
                <div className="flex items-start space-x-2">
                  <Skeleton className="h-4 w-4 rounded bg-slate-200 dark:bg-slate-700 mt-1" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-full bg-slate-200 dark:bg-slate-700" />
                    <Skeleton className="h-4 w-[85%] bg-slate-200 dark:bg-slate-700" />
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 pl-6">
                  <Skeleton className="h-4 w-4 rounded bg-slate-200 dark:bg-slate-700" />
                  <Skeleton className="h-4 w-4 rounded bg-slate-200 dark:bg-slate-700" />
                  <Skeleton className="h-4 w-[70%] bg-slate-200 dark:bg-slate-700" />
                </div>
              </div>

              {/* Status Badge */}
              <div className="pt-4">
                <Skeleton className="h-6 w-20 rounded-full bg-gradient-to-r from-emerald-200 to-green-200 dark:from-emerald-800 dark:to-green-800" />
              </div>
            </div>

            {/* Animated Border Glow */}
            <MotionDiv
              className="absolute inset-0 rounded-lg border-2 border-transparent bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-pink-400/20"
              animate={{
                background: [
                  "linear-gradient(90deg, rgba(59,130,246,0.2) 0%, rgba(147,51,234,0.2) 50%, rgba(236,72,153,0.2) 100%)",
                  "linear-gradient(90deg, rgba(236,72,153,0.2) 0%, rgba(59,130,246,0.2) 50%, rgba(147,51,234,0.2) 100%)",
                  "linear-gradient(90deg, rgba(147,51,234,0.2) 0%, rgba(236,72,153,0.2) 50%, rgba(59,130,246,0.2) 100%)"
                ]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{ zIndex: -1 }}
            />
          </MotionCard>
        ))}
      </div>

      {/* Loading Indicator */}
      <MotionDiv
        className="flex justify-center items-center mt-12"
        variants={cardVariants}
      >
        <div className="flex space-x-2">
          {[1, 2, 3].map((dot) => (
            <MotionDiv
              key={dot}
              className="w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: dot * 0.2
              }}
            />
          ))}
        </div>
      </MotionDiv>
    </MotionDiv>
  );
}