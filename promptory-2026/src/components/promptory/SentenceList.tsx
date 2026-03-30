"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { colors, animation, statusColors } from "@/lib/tokens";

interface Sentence {
  id: string;
  content: string;
  index: number;
  status: "idle" | "processing" | "completed" | "error";
}

interface SentenceListProps {
  sentences: Sentence[];
  selectedId?: string;
  onSelect: (id: string) => void;
  title?: string;
  className?: string;
}

function SentenceList({ 
  sentences, 
  selectedId, 
  onSelect, 
  title = "원본 문장",
  className 
}: SentenceListProps) {
  return (
    <div className={cn("space-y-3", className)}>
      <h3 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider px-1">
        {title}
      </h3>
      
      <div className="space-y-2">
        {sentences.map((sentence, idx) => (
          <motion.div
            key={sentence.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ 
              delay: idx * animation.stagger.fast,
              duration: animation.duration.base,
              ease: animation.ease.out
            }}
            onClick={() => onSelect(sentence.id)}
            className={cn(
              "group rounded-xl p-4 transition-all cursor-pointer border",
              "hover:bg-neutral-50 dark:hover:bg-neutral-800",
              "hover:border-neutral-300 dark:hover:border-neutral-700"
            )}
            style={selectedId === sentence.id ? {
              boxShadow: `0 0 0 1px ${colors.ai.core}`,
              backgroundColor: `${colors.ai.core}10`,
              borderColor: `${colors.ai.core}30`
            } : undefined}
          >
            <div className="flex items-center gap-2 mb-2">
              <span 
                className="text-xs font-mono px-1.5 py-0.5 rounded"
                style={selectedId === sentence.id ? {
                  backgroundColor: colors.ai[200],
                  color: colors.ai[800]
                } : {
                  backgroundColor: colors.neutral[200],
                  color: colors.neutral[600]
                }}
              >
                {sentence.index + 1}
              </span>
              
              <StatusIndicator status={sentence.status} />
            </div>
            
            <p className={cn(
              "text-sm line-clamp-2",
              selectedId === sentence.id 
                ? "text-neutral-900 dark:text-white"
                : "text-neutral-600 dark:text-neutral-400"
            )}>
              {sentence.content}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function StatusIndicator({ status }: { status: Sentence["status"] }) {
  const config = statusColors[status];
  const shouldAnimate = status === 'processing';
  
  return (
    <span className={cn("text-[10px] px-1.5 py-0.5 rounded-full font-medium", config.bg, config.text, shouldAnimate && "animate-pulse")}>
      {config.label}
    </span>
  );
}

export { SentenceList, type Sentence };
