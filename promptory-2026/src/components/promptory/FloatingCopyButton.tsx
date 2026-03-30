"use client";

import { motion } from "framer-motion";
import { ClipboardDocumentIcon, CheckIcon } from "@heroicons/react/24/outline";
import { useCopy } from "@/lib/hooks";
import { colors } from "@/lib/tokens";
import { buttonTap } from "@/lib/animations";

interface FloatingCopyButtonProps {
  onCopy?: () => void;
}

function FloatingCopyButton({ onCopy }: FloatingCopyButtonProps) {
  // 중복 제거: useCopy 훅 사용 (기존의 useState + useEffect + setTimeout 로직 대체)
  const { copied, copy } = useCopy({
    successDuration: 2000,
    onSuccess: onCopy,
  });
  
  // Type Fix: Wrap copy function to match MouseEventHandler signature
  const handleClick = () => {
    copy();
  };

  return (
    <motion.button
      onClick={handleClick}
      whileTap={buttonTap}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full text-white shadow-lg flex items-center justify-center"
      style={{ 
        backgroundColor: colors.ai.core,
        boxShadow: `0 10px 15px -3px ${colors.ai.core}40` 
      }}
    >
      {copied ? (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
        >
          <CheckIcon className="w-6 h-6" strokeWidth={2} />
        </motion.div>
      ) : (
        <ClipboardDocumentIcon className="w-6 h-6" />
      )}
    </motion.button>
  );
}

export { FloatingCopyButton };
