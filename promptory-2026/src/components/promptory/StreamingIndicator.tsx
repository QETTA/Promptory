"use client";

import { motion } from "framer-motion";
import { SparklesIcon } from "@heroicons/react/24/solid";
import { colors, animation, gradients } from "@/lib/tokens";

interface StreamingIndicatorProps {
  message?: string;
}

// =====================================================
// Bottleneck Fix: Static constants (no runtime calculation)
// Prevents recalculation on every render
// =====================================================
const DOT_DELAYS = [0, 0.05, 0.1] as const; // animation.stagger.fast, animation.stagger.base
const STREAMING_DURATION = 1.0; // Pre-calculated: animation.duration.slower (0.7) + animation.duration.base (0.3)

function StreamingIndicator({ message = "AI가 문장을 최적화하는 중..." }: StreamingIndicatorProps) {
  return (
    <div 
      className="flex items-center gap-3 p-4 rounded-xl border"
      style={{ 
        backgroundColor: `${colors.ai.core}10`,
        borderColor: `${colors.ai.core}20`
      }}
    >
      <div className="relative">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ 
            duration: STREAMING_DURATION, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute inset-0 rounded-full blur-md"
          style={{ backgroundColor: colors.ai.light }}
        />
        <div className={`relative w-8 h-8 rounded-full bg-gradient-to-br ${gradients.ai} flex items-center justify-center`}>
          <SparklesIcon className="w-4 h-4 text-white" />
        </div>
      </div>
      
      <div className="flex-1">
        <p className="text-sm font-medium text-neutral-900 dark:text-white">
          {message}
        </p>
        <div className="flex items-center gap-1 mt-1">
          {DOT_DELAYS.map((delay, idx) => (
            <motion.span
              key={idx}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ 
                duration: STREAMING_DURATION, 
                repeat: Infinity, 
                delay,
                ease: "easeInOut"
              }}
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: colors.ai.core }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export { StreamingIndicator };
