"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/primitives/Button";
import { Alert } from "@/components/primitives/Alert";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ClipboardDocumentIcon, 
  DocumentDuplicateIcon, 
  GlobeAltIcon,
  ExclamationTriangleIcon 
} from "@heroicons/react/24/outline";
import { useCopy } from "@/lib/hooks";
import { useCallback } from "react";
import { colors, animation, layout } from "@/lib/tokens";
import { fadeInUp, bottomSheet, buttonTap } from "@/lib/animations";

interface ActionPanelProps {
  onCopySentence?: () => void;
  onCopyAll?: () => void;
  onBrowserVerify?: () => void;
  showBrowserAlert?: boolean;
  className?: string;
}

function ActionPanel({
  onCopySentence,
  onCopyAll,
  onBrowserVerify,
  showBrowserAlert = true,
  className,
}: ActionPanelProps) {
  // =====================================================
  // Improved useCopy hook with error handling and async support
  // =====================================================
  const { copied: copiedSentence, copy: copySentence } = useCopy({
    successDuration: 2000,
    onSuccess: onCopySentence,
  });
  
  const { copied: copiedAll, copy: copyAll } = useCopy({
    successDuration: 2000,
    onSuccess: onCopyAll,
  });
  
  const handleCopySentence = useCallback(async () => {
    await copySentence();
  }, [copySentence]);
  
  const handleCopyAll = useCallback(async () => {
    await copyAll();
  }, [copyAll]);

  return (
    <div className={cn("space-y-4", className)}>
      <h3 className="text-sm font-semibold text-neutral-900 dark:text-white">
        작업
      </h3>
      
      <div className="space-y-3">
        {/* Copy single sentence */}
        <motion.div whileTap={buttonTap}>
          <Button
            onClick={handleCopySentence}
            className="w-full"
          >
            <ClipboardDocumentIcon className="w-4 h-4" />
            {copiedSentence ? "복사 완료!" : "문장 복사하기"}
          </Button>
        </motion.div>

        {/* Copy all */}
        <motion.div whileTap={buttonTap}>
          <Button
            variant="secondary"
            onClick={handleCopyAll}
            className="w-full"
          >
            <DocumentDuplicateIcon className="w-4 h-4" />
            {copiedAll ? "전체 복사 완료!" : "전체 초안 복사"}
          </Button>
        </motion.div>

        {/* Browser verify */}
        {showBrowserAlert && (
          <Alert
            color="warning"
            title="브라우저에서 확인해보세요"
            description="실제 페이지에서의 렌더링을 확인하는 것이 좋습니다."
            actions={
              <Button
                size="sm"
                variant="secondary"
                onClick={onBrowserVerify}
              >
                <GlobeAltIcon className="w-4 h-4" />
                미리보기
              </Button>
            }
          />
        )}
      </div>
    </div>
  );
}

// Mobile Bottom Sheet version
interface MobileActionPanelProps extends ActionPanelProps {
  isOpen: boolean;
  onToggle: () => void;
}

function MobileActionPanel({
  isOpen,
  onToggle,
  onCopySentence,
  onCopyAll,
  onBrowserVerify,
  showBrowserAlert = true,
  className,
}: MobileActionPanelProps) {
  // =====================================================
  // Improved useCopy hook with error handling and async support
  // =====================================================
  const { copied: copiedSentence, copy: copySentence } = useCopy({
    successDuration: 2000,
    onSuccess: onCopySentence,
  });

  const { copied: copiedAll, copy: copyAll } = useCopy({
    successDuration: 2000,
    onSuccess: onCopyAll,
  });
  
  const handleMobileCopySentence = useCallback(async () => {
    await copySentence();
  }, [copySentence]);
  
  const handleMobileCopyAll = useCallback(async () => {
    await copyAll();
  }, [copyAll]);

  return (
    <motion.div
      className={cn(
        "fixed bottom-0 left-0 right-0 bg-white dark:bg-neutral-900 rounded-t-3xl z-40",
        className
      )}
      style={{
        boxShadow: `0 -4px 20px ${colors.neutral[950]}1a`, // 10% opacity using token
      }}
      variants={bottomSheet}
      initial="hidden"
      animate={isOpen ? "visible" : "hidden"}
    >
      {/* Handle */}
      <motion.div
        className="w-full h-6 flex items-center justify-center cursor-pointer"
        onClick={onToggle}
        whileTap={buttonTap}
      >
        <div className="w-12 h-1 rounded-full bg-neutral-300 dark:bg-neutral-700" />
      </motion.div>
      
      <div className="p-4 space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <Button onClick={handleMobileCopySentence} className="w-full">
            <ClipboardDocumentIcon className="w-4 h-4" />
            {copiedSentence ? "완료!" : "복사"}
          </Button>
          <Button variant="secondary" onClick={handleMobileCopyAll} className="w-full">
            <DocumentDuplicateIcon className="w-4 h-4" />
            {copiedAll ? "전체 복사 완료!" : "전체 복사"}
          </Button>
        </div>
        
        {showBrowserAlert && (
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="flex items-start gap-3 p-3 rounded-xl"
            style={{
              backgroundColor: `${colors.warning.DEFAULT}15`, // 15% opacity
            }}
          >
            <ExclamationTriangleIcon className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: colors.warning.DEFAULT }} />
            <div className="flex-1">
              <p className="text-sm font-medium" style={{ color: colors.warning.dark }}>
                브라우저에서 확인해보세요
              </p>
              <p className="text-xs mt-1" style={{ color: colors.warning.light }}>
                실제 페이지에서의 렌더링을 확인하는 것이 좋습니다.
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

export { ActionPanel, MobileActionPanel };
