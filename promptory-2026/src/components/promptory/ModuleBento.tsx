"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { memo, useCallback } from "react";
import { Badge } from "@/components/primitives/Badge";
import { ArrowUpRightIcon } from "@heroicons/react/20/solid";
import { gradients, animation, colors } from "@/lib/tokens";

interface Module {
  id: string;
  name: string;
  description: string;
  tone: string;
  impact: number;
  category: string;
}

interface ModuleBentoProps {
  modules: Module[];
  onModuleClick?: (id: string) => void;
  className?: string;
}

// =====================================================
// Memoized single module card for performance optimization
// =====================================================
const ModuleCard = memo(function ModuleCard({
  module,
  index,
  onClick,
}: {
  module: Module;
  index: number;
  onClick: (id: string) => void;
}) {
  // Use token system for gradient
  const gradient = gradients.all[index % gradients.all.length];
  
  const handleClick = useCallback(() => onClick(module.id), [module.id, onClick]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * animation.stagger.base, duration: animation.duration.base, ease: animation.ease.out }}
      onClick={handleClick}
      className={cn(
        "group relative rounded-2xl p-4 cursor-pointer overflow-hidden",
        "bg-white dark:bg-neutral-900 ring-1 ring-neutral-200 dark:ring-neutral-800",
        "hover:shadow-[0_0_0_2px_rgba(59,130,246,0.25)] hover:scale-[1.02] transition-all duration-200"
      )}
    >
      {/* Gradient accent using token */}
      <div className={cn("absolute top-0 left-0 right-0 h-1 bg-gradient-to-r", gradient)} />
      
      <div className="flex items-start justify-between mb-2">
        <Badge color="neutral" size="sm">{module.category}</Badge>
        <ArrowUpRightIcon 
          className="w-4 h-4 text-neutral-400 transition-colors" 
          style={{ ['--hover-color' as string]: colors.ai.core }}
        />
      </div>
      
      <h4 className="font-semibold text-neutral-900 dark:text-white mb-1">
        {module.name}
      </h4>
      
      <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-2 mb-3">
        {module.description}
      </p>
      
      <div className="flex items-center justify-between">
        <Badge color="ai" size="sm">{module.tone}</Badge>
        <span className="text-sm font-semibold" style={{ color: colors.success.DEFAULT }}>
          +{module.impact}%
        </span>
      </div>
    </motion.div>
  );
});

// =====================================================
// Bottleneck Fix: Memoized parent prevents unnecessary re-renders
// =====================================================
const ModuleBento = memo(function ModuleBento({ modules, onModuleClick, className }: ModuleBentoProps) {
  // Stable callback reference
  const handleModuleClick = useCallback((id: string) => {
    onModuleClick?.(id);
  }, [onModuleClick]);

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-neutral-900 dark:text-white">
          추천 모듈
        </h3>
        <span className="text-xs text-neutral-500">
          {modules.length}개 모듈
        </span>
      </div>
      
      <div className={cn("grid grid-cols-1 sm:grid-cols-2 gap-3")}>
        {modules.map((module, idx) => (
          <ModuleCard
            key={module.id}
            module={module}
            index={idx}
            onClick={handleModuleClick}
          />
        ))}
      </div>
    </div>
  );
});

export { ModuleBento, type Module };
