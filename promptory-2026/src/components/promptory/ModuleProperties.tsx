"use client";

import { cn } from "@/lib/utils";
import { DescriptionList, DescriptionTerm, DescriptionDetails } from "@/components/primitives/DescriptionList";
import { Badge } from "@/components/primitives/Badge";
import { motion } from "framer-motion";
import { colors } from "@/lib/tokens";

interface ModuleData {
  name: string;
  tone: string;
  impact: number;
  impactLabel: string;
  stage: string;
  category?: string;
  description?: string;
}

interface ModulePropertiesProps {
  module: ModuleData;
  className?: string;
}

function ModuleProperties({ module, className }: ModulePropertiesProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "rounded-2xl bg-white dark:bg-neutral-900 ring-1 ring-neutral-200 dark:ring-neutral-800 overflow-hidden",
        className
      )}
    >
      {/* Header */}
      <div className="px-4 py-3 bg-neutral-50 dark:bg-neutral-800/50 border-b border-neutral-200 dark:border-neutral-800">
        <h4 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
          모듈 속성
        </h4>
      </div>
      
      {/* Content */}
      <div className="p-4">
        <DescriptionList className="gap-y-3">
          <DescriptionTerm>모듈명</DescriptionTerm>
          <DescriptionDetails className="font-medium">
            {module.name}
          </DescriptionDetails>
          
          <DescriptionTerm>톤</DescriptionTerm>
          <DescriptionDetails>
            <Badge color="neutral" size="sm">{module.tone}</Badge>
          </DescriptionDetails>
          
          <DescriptionTerm>카테고리</DescriptionTerm>
          <DescriptionDetails>
            <Badge color="ai" size="sm">{module.category || "일반"}</Badge>
          </DescriptionDetails>
          
          <DescriptionTerm>예상 효과</DescriptionTerm>
          <DescriptionDetails className="flex items-center gap-2">
            <span 
              className="font-semibold text-lg"
              style={{ color: colors.success.DEFAULT }}
            >
              +{module.impact}%
            </span>
            <span className="text-neutral-500 text-sm">{module.impactLabel}</span>
          </DescriptionDetails>
          
          <DescriptionTerm>적용 단계</DescriptionTerm>
          <DescriptionDetails className="text-neutral-700 dark:text-neutral-300">
            {module.stage}
          </DescriptionDetails>
        </DescriptionList>
        
        {module.description && (
          <div className="mt-4 pt-4 border-t border-neutral-100 dark:border-neutral-800">
            <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
              {module.description}
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export { ModuleProperties, type ModuleData };
