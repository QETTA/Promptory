"use client";

import { cn } from "@/lib/utils";
import { motion, AnimatePresence, type Transition } from "framer-motion";
import { useState, useCallback, memo } from "react";
import { Badge } from "@/components/primitives/Badge";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { statusColors, animation, colors } from "@/lib/tokens";

// =====================================================
// Bottleneck Optimization: Static transitions object
// prevents recreating objects on each render
// =====================================================
const CARD_TRANSITION: Transition = {
  duration: animation.duration.base,
  ease: animation.ease.out,
};

const EXPAND_TRANSITION: Transition = {
  duration: animation.duration.fast,
  ease: animation.ease.out,
};

type CardStatus = "idle" | "processing" | "completed" | "error";
type ReasonType = "clarity" | "impact" | "flow" | "urgency";

interface CardData {
  id: string;
  index: number;
  original: string;
  optimized?: string;
  reasons?: Array<{ type: ReasonType; label: string }>;
  status: CardStatus;
}

interface MobileCardStackProps {
  cards: CardData[];
  onCardClick?: (id: string) => void;
  className?: string;
}

// =====================================================
// Bottleneck Fix: Memoized child components prevent
// unnecessary re-renders when parent updates
// =====================================================
const MemoizedCard = memo(function Card({
  card,
  isExpanded,
  onToggle,
  index,
}: {
  card: CardData;
  isExpanded: boolean;
  onToggle: (id: string) => void;
  index: number;
}) {
  const handleClick = useCallback(() => onToggle(card.id), [card.id, onToggle]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * animation.stagger.base }}
      className={cn(
        "rounded-2xl bg-white dark:bg-neutral-900 overflow-hidden",
        "shadow-sm ring-1 ring-neutral-200 dark:ring-neutral-800"
      )}
    >
      {/* Collapsed View */}
      <div className="p-4 cursor-pointer" onClick={handleClick}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge color="ai" size="sm">문장 {card.index + 1}</Badge>
            <StatusBadge status={card.status} />
          </div>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: animation.duration.fast, ease: animation.ease.out }}
          >
            <ChevronDownIcon className="w-5 h-5 text-neutral-400" />
          </motion.div>
        </div>
        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2">
          {card.original}
        </p>
      </div>

      {/* Expanded View */}
      <AnimatePresence>
        {isExpanded && card.status === "completed" && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={EXPAND_TRANSITION}
            className="border-t border-neutral-100 dark:border-neutral-800"
          >
            <div className="p-4 space-y-4">
              {card.optimized && (
                <div
                  className="rounded-xl p-3 border"
                  style={{
                    backgroundColor: `${colors.ai.core}15`, // 15% opacity using token
                    borderColor: `${colors.ai.core}25`, // 25% opacity using token
                  }}
                >
                  <p className="text-xs font-medium mb-1" style={{ color: colors.ai.dark }}>AI 최적화</p>
                  <p className="text-sm text-neutral-900 dark:text-white">{card.optimized}</p>
                </div>
              )}
              {card.reasons && card.reasons.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {card.reasons.map((reason, ridx) => (
                    <Badge key={ridx} color={reason.type} size="sm">
                      {reason.label}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
});

function MobileCardStack({ cards, onCardClick, className }: MobileCardStackProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // =====================================================
  // Bottleneck Fix: useCallback prevents function recreation
  // =====================================================
  const toggleExpand = useCallback((id: string) => {
    setExpandedId((prev) => {
      const newExpanded = prev === id ? null : id;
      if (newExpanded !== null) {
        onCardClick?.(id);
      }
      return newExpanded;
    });
  }, [onCardClick]);

  return (
    <div className={cn("space-y-4 pb-32", className)}>
      <h2 className="text-lg font-semibold text-neutral-900 dark:text-white px-1">
        최적화 결과
      </h2>
      
      {cards.map((card, idx) => (
        <MemoizedCard
          key={card.id}
          card={card}
          isExpanded={expandedId === card.id}
          onToggle={toggleExpand}
          index={idx}
        />
      ))}
    </div>
  );
}

// =====================================================
// Token-based StatusBadge with static config
// =====================================================
const STATUS_CONFIG: Record<CardStatus, { color: "neutral" | "ai" | "success" | "error"; label: string; hasPulse?: boolean }> = {
  idle: { color: "neutral", label: statusColors.idle.label },
  processing: { color: "ai", label: statusColors.processing.label, hasPulse: true },
  completed: { color: "success", label: statusColors.completed.label },
  error: { color: "error", label: statusColors.error.label },
};

function StatusBadge({ status }: { status: CardStatus }) {
  const config = STATUS_CONFIG[status];

  return (
    <Badge color={config.color} size="sm">
      {config.hasPulse && (
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-current animate-pulse mr-1" />
      )}
      {config.label}
    </Badge>
  );
}

export { MobileCardStack, type CardData, type CardStatus, type ReasonType };
