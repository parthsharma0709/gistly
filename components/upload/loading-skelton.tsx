'use client';

import { Card } from '../ui/card';

export default function LoadingSkeleton() {
  return (
    <div className="flex flex-col justify-center items-center gap-10 text-center animate-pulse py-10">
      {/* ROADMAP CARD SKELETON */}
      <div className="w-full max-w-2xl">
        <Card className="overflow-hidden bg-white dark:bg-gray-800 shadow-lg">
          {/* Header Section with Purple Background */}
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-4">
            {/* Header Badge Skeleton */}
            <div className="flex items-center gap-2 mb-3">
              <div className="h-5 w-5 bg-purple-300 rounded-full"></div>
              <div className="h-4 w-48 bg-purple-300 rounded-md"></div>
            </div>

            {/* Title Skeleton */}
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="h-6 w-6 bg-purple-300 rounded"></div>
                <div className="h-7 w-64 bg-purple-300 rounded-lg"></div>
                <div className="h-6 w-6 bg-purple-300 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-6 space-y-4">
            {/* Description Lines Skeleton */}
            <div className="space-y-3">
              <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded-md"></div>
              <div className="h-4 w-[95%] bg-gray-200 dark:bg-gray-700 rounded-md"></div>
              <div className="h-4 w-[88%] bg-gray-200 dark:bg-gray-700 rounded-md"></div>
              <div className="h-4 w-[92%] bg-gray-200 dark:bg-gray-700 rounded-md"></div>
            </div>

            {/* Why It Matters Section */}
            <div className="space-y-3 mt-6">
              <div className="flex items-center gap-2">
                <div className="h-5 w-5 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-5 w-32 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
              </div>
              <div className="space-y-2">
                <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded-md"></div>
                <div className="h-4 w-[97%] bg-gray-200 dark:bg-gray-700 rounded-md"></div>
                <div className="h-4 w-[90%] bg-gray-200 dark:bg-gray-700 rounded-md"></div>
                <div className="h-4 w-[85%] bg-gray-200 dark:bg-gray-700 rounded-md"></div>
              </div>
            </div>
          </div>
        </Card>

        {/* Navigation Dots Skeleton */}
        <div className="flex justify-center items-center gap-2 mt-6">
          <div className="h-8 w-8 bg-pink-200 dark:bg-pink-300 rounded-full"></div>
          <div className="flex gap-1">
            <div className="h-2 w-2 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
            <div className="h-2 w-2 bg-pink-400 rounded-full"></div>
            <div className="h-2 w-2 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
          </div>
          <div className="h-8 w-8 bg-pink-200 dark:bg-pink-300 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
