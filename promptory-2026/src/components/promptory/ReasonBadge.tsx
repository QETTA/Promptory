"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { memo, type SVGProps } from "react";
import { 
  LightBulbIcon, 
  BoltIcon, 
  ArrowPathIcon, 
  ClockIcon
} from "@heroicons/react/20/solid";
import { reasonColors, animation, type ReasonType } from "@/lib/tokens";

interface Reason {
  id: string;
  type: ReasonType;
  label: string;
  description?: string;
}

interface ReasonBadgeProps {
  reasons: Reason[];
  className?: string;
}

// =====================================================
// Token-based config using centralized tokens
// =====================================================
const reasonConfig: Record<ReasonType, { 
  icon: React.ComponentType<SVGProps<SVGSVGElement>>; 
  color: string; 
  bgColor: string;
  label: string;
}> = {
  clarity: {
    icon: LightBulbIcon,
    color: reasonColors.clarity.text,
    bgColor: reasonColors.clarity.bg,
    label: "명확성",
  },
  impact: {
    icon: BoltIcon,
    color: reasonColors.impact.text,
    bgColor: reasonColors.impact.bg,
    label: "임팩트",
  },
  flow: {
    icon: ArrowPathIcon,
    color: reasonColors.flow.text,
    bgColor: reasonColors.flow.bg,
    label: "흐름",
  },
  urgency: {
    icon: ClockIcon,
    color: reasonColors.urgency.text,
    bgColor: reasonColors.urgency.bg,
    label: "긴급성",
  },
};

// =====================================================
// Memoized single reason badge for performance
// =====================================================
const SingleReasonBadge = memo(function SingleReasonBadge({ reason, index }: { reason: Reason; index: number }) {
  const config = reasonConfig[reason.type];
  const Icon = config.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * animation.stagger.base }}
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium",
        config.bgColor,
        config.color
      )}
      title={reason.description}
    >
      <Icon className="w-3.5 h-3.5" />
      <span>{reason.label}</span>
    </motion.div>
  );
});

// =====================================================
// Bottleneck Fix: Memoized parent component with optimized children
// =====================================================
const ReasonBadge = memo(function ReasonBadge({ reasons, className }: ReasonBadgeProps) {
  return (
    <div className={cn("space-y-3", className)}>
      <h4 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
        개선 이유
      </h4>
      
      <div className="flex flex-wrap gap-2">
        {reasons.map((reason, idx) => (
          <SingleReasonBadge key={reason.id} reason={reason} index={idx} />
        ))}
      </div>
    </div>
  );
});

export { ReasonBadge, type Reason, type ReasonType };
