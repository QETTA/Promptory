"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { CheckIcon, PlayIcon } from "@heroicons/react/20/solid";
import { colors, animation } from "@/lib/tokens";

interface TimelineItem {
  id: string;
  type: "start" | "insert" | "end";
  label: string;
  description?: string;
  isActive?: boolean;
}

interface ContextTimelineProps {
  items: TimelineItem[];
  contextBridge?: string;
  className?: string;
}

function ContextTimeline({ items, contextBridge, className }: ContextTimelineProps) {
  return (
    <div className={cn("space-y-3", className)}>
      <h4 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
        삽입 위치
      </h4>
      
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-[11px] top-2 bottom-2 w-px bg-neutral-200 dark:bg-neutral-700" />
        
        <div className="space-y-4">
          {items.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ 
                delay: idx * animation.stagger.base,
                duration: animation.duration.base,
                ease: animation.ease.out
              }}
              className="relative flex items-start gap-4 pl-6"
            >
              {/* Dot */}
              <div
                className={cn(
                  "absolute left-0 top-1 w-6 h-6 rounded-full flex items-center justify-center border-2",
                  item.isActive
                    ? "text-white"
                    : "bg-white dark:bg-neutral-800 border-neutral-300 dark:border-neutral-600"
                )}
                style={item.isActive ? {
                  backgroundColor: colors.ai.core,
                  borderColor: colors.ai.core,
                } : undefined}
              >
                {item.isActive && (
                  <CheckIcon className="w-3 h-3" strokeWidth={3} />
                )}
              </div>
              
              {/* Content */}
              <div className="flex-1 pt-0.5">
                <p
                  className={cn(
                    "text-sm",
                    item.isActive
                      ? "font-medium text-neutral-900 dark:text-white"
                      : "text-neutral-500 dark:text-neutral-400"
                  )}
                >
                  {item.isActive && (
                    <PlayIcon className="w-3 h-3 inline-block mr-1" style={{ color: colors.ai.core }} />
                  )}
                  {item.label}
                </p>
                {item.description && (
                  <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-1">
                    {item.description}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {contextBridge && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: animation.duration.base }}
          className="mt-4 p-3 rounded-lg border"
          style={{ 
            backgroundColor: `${colors.ai.core}10`,
            borderColor: `${colors.ai.core}20`
          }}
        >
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-1">
            앞 문장과의 연결:
          </p>
          <p className="text-sm text-neutral-700 dark:text-neutral-300 italic">
            "{contextBridge}"
          </p>
        </motion.div>
      )}
    </div>
  );
}

export { ContextTimeline, type TimelineItem };
