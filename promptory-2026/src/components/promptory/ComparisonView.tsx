"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ArrowRightIcon, CheckIcon } from "@heroicons/react/20/solid";
import { colors, animation } from "@/lib/tokens";

interface ComparisonData {
  original: string;
  optimized: string;
  improvements?: string[];
}

interface ComparisonViewProps {
  data: ComparisonData;
  className?: string;
  isStreaming?: boolean;
}

function ComparisonView({ data, className, isStreaming = false }: ComparisonViewProps) {
  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-center gap-2">
        <h3 className="text-sm font-semibold text-neutral-900 dark:text-white">
          문장 비교
        </h3>
        <div className="h-px flex-1 bg-neutral-200 dark:bg-neutral-800" />
      </div>
      
      <div className="relative grid grid-cols-1 gap-4">
        {/* Original */}
        <div className="rounded-2xl bg-neutral-100 dark:bg-neutral-800 p-5 border border-neutral-200 dark:border-neutral-700">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
              Original
            </span>
            <span className="text-xs text-neutral-400">원본</span>
          </div>
          <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
            {data.original}
          </p>
        </div>

        {/* Arrow indicator */}
        <div className="flex items-center justify-center -my-2 relative z-10">
          <div 
            className="text-white p-2 rounded-full shadow-lg"
            style={{ 
              backgroundColor: colors.ai.core,
              boxShadow: `0 10px 15px -3px ${colors.ai.core}30`
            }}
          >
            <ArrowRightIcon className="w-4 h-4" />
          </div>
        </div>

        {/* Optimized */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: animation.duration.base, ease: animation.ease.out }}
          className="rounded-2xl p-5 border"
          style={{ 
            backgroundColor: `${colors.ai.core}10`, // 10% opacity
            borderColor: `${colors.ai.core}20`, // 20% opacity
          }}
        >
          <div className="flex items-center justify-between mb-3">
            <span 
              className="text-xs font-semibold uppercase tracking-wider"
              style={{ color: colors.ai.dark }}
            >
              AI Optimized
            </span>
            <span style={{ color: colors.ai.core }}>최적화됨</span>
          </div>
          <p className="text-neutral-900 dark:text-white font-medium leading-relaxed">
            {isStreaming ? (
              <StreamingText text={data.optimized} />
            ) : (
              data.optimized
            )}
          </p>
        </motion.div>
      </div>

      {data.improvements && data.improvements.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {data.improvements.map((improvement, idx) => (
            <motion.span
              key={idx}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                delay: idx * animation.stagger.base,
                duration: animation.duration.fast,
                ease: animation.ease.out
              }}
              className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium"
              style={{ 
                backgroundColor: colors.success[50],
                color: colors.success.dark
              }}
            >
              <CheckIcon className="w-3 h-3" />
              {improvement}
            </motion.span>
          ))}
        </div>
      )}
    </div>
  );
}

function StreamingText({ text }: { text: string }) {
  const words = text.split(" ");
  
  return (
    <span>
      {words.map((word, idx) => (
        <motion.span
          key={idx}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ 
            delay: idx * animation.stagger.fast,
            duration: animation.duration.fast
          }}
        >
          {word}{" "}
        </motion.span>
      ))}
      <span 
        className="inline-block w-0.5 h-5 animate-pulse ml-0.5 align-middle"
        style={{ backgroundColor: colors.ai.core }}
      />
    </span>
  );
}

export { ComparisonView, type ComparisonData };
