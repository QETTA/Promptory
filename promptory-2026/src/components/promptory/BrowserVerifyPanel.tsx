"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { GlobeAltIcon, ArrowPathIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/primitives/Button";
import { useState } from "react";
import { useTimeout } from "@/lib/hooks";
import { fadeInUp, spin } from "@/lib/animations";

interface BrowserVerifyPanelProps {
  optimizedContent: string;
  previewUrl?: string;
  onRefresh?: () => void;
  className?: string;
}

function BrowserVerifyPanel({
  optimizedContent,
  previewUrl,
  onRefresh,
  className,
}: BrowserVerifyPanelProps) {
  const [isLoading, setIsLoading] = useState(false);
  // 중복 제거: useTimeout 훅 사용 (기존의 useRef + useEffect + setTimeout 로직 대체)
  const { set: setLoadingTimeout } = useTimeout();

  const handleRefresh = () => {
    setIsLoading(true);
    onRefresh?.();
    // useTimeout 훅 사용하여 1초 후 로딩 상태 해제
    setLoadingTimeout(() => setIsLoading(false), 1000);
  };

  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      className={cn(
        "rounded-2xl overflow-hidden ring-1 ring-neutral-200 dark:ring-neutral-800",
        className
      )}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* AI Result */}
        <div className="p-6 bg-white dark:bg-neutral-900">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-semibold text-neutral-500 dark:text-neutral-400">
              AI 결과
            </h4>
            <Button size="sm" variant="ghost" onClick={handleRefresh}>
              <ArrowPathIcon className={cn("w-4 h-4", isLoading && "animate-spin")} />
            </Button>
          </div>
          <div className="prose prose-sm dark:prose-invert max-w-none">
            <p className="text-neutral-900 dark:text-white leading-relaxed whitespace-pre-wrap">
              {optimizedContent}
            </p>
          </div>
        </div>

        {/* Browser Preview */}
        <div className="p-6 bg-neutral-50 dark:bg-neutral-800/50 border-t lg:border-t-0 lg:border-l border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center gap-2 mb-4">
            <GlobeAltIcon className="w-4 h-4 text-neutral-500" />
            <h4 className="text-sm font-semibold text-neutral-500 dark:text-neutral-400">
              실제 브라우저
            </h4>
          </div>
          
          {previewUrl ? (
            <iframe
              src={previewUrl}
              className="w-full h-64 rounded-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700"
              sandbox="allow-same-origin allow-scripts"
              title="Browser Preview"
            />
          ) : (
            <div className="w-full h-64 rounded-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 flex items-center justify-center">
              <div className="text-center">
                <GlobeAltIcon className="w-12 h-12 text-neutral-300 dark:text-neutral-600 mx-auto mb-2" />
                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                  미리보기 URL을 설정하세요
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export { BrowserVerifyPanel };
