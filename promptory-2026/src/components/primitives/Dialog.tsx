"use client";

import { cn } from "@/lib/utils";
import { ReactNode, useEffect, useRef, useCallback, useId, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { animation } from "@/lib/tokens";

// =====================================================
// Bottleneck Fix: Static focusable selector (computed once)
// Prevents array recreation on every render
// =====================================================
const FOCUSABLE_SELECTOR = [
  'button:not([disabled]):not([aria-hidden="true"])',
  '[href]:not([disabled])',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"]):not([disabled])',
  '[contenteditable]:not([disabled])',
].join(', ');

// =====================================================
// Enhanced Dialog Props with Accessibility Options
// =====================================================
interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  /** Element to focus when dialog opens. Defaults to close button */
  initialFocusRef?: React.RefObject<HTMLElement>;
  /** Prevent closing when clicking backdrop */
  preventBackdropClose?: boolean;
}

function Dialog({ 
  isOpen, 
  onClose, 
  title, 
  description, 
  children, 
  size = "md",
  initialFocusRef,
  preventBackdropClose = false,
}: DialogProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const hasOpenedRef = useRef(false);

  const sizes = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
  };

  // Store previous focus when opening and manage initial focus
  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      hasOpenedRef.current = true;
      
      // Focus management with requestAnimationFrame for smoother transitions
      requestAnimationFrame(() => {
        const focusTarget = initialFocusRef?.current || closeButtonRef.current;
        focusTarget?.focus();
      });
    } else if (previousFocusRef.current && hasOpenedRef.current) {
      // Only restore focus if dialog was actually opened
      previousFocusRef.current.focus();
      hasOpenedRef.current = false;
    }
  }, [isOpen, initialFocusRef]);

  // =====================================================
  // Enhanced Focus Trap and Keyboard Navigation
  // Bottleneck Fix: Uses static FOCUSABLE_SELECTOR
  // =====================================================
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === "Escape") {
      event.preventDefault();
      onClose();
      return;
    }
    
    if (event.key === "Tab") {
      // Use static selector (no array recreation)
      const focusableElements = panelRef.current?.querySelectorAll(FOCUSABLE_SELECTOR);
      if (!focusableElements || focusableElements.length === 0) {
        event.preventDefault();
        return;
      }

      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
      const activeElement = document.activeElement;

      // Handle forward tab (Tab)
      if (!event.shiftKey) {
        if (activeElement === lastElement || !panelRef.current?.contains(activeElement)) {
          event.preventDefault();
          firstElement.focus();
        }
      } 
      // Handle backward tab (Shift+Tab)
      else {
        if (activeElement === firstElement || !panelRef.current?.contains(activeElement)) {
          event.preventDefault();
          lastElement.focus();
        }
      }
    }
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleKeyDown]);

  // Token-based animation configuration
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const panelVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
  };

  // =====================================================
  // SSR Safety: Using useId instead of Math.random()
  // Prevents hydration mismatches between server and client
  // =====================================================
  const generatedId = useId();
  const titleId = title ? `${generatedId}-title` : undefined;
  const descriptionId = description ? `${generatedId}-desc` : undefined;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="relative z-50">
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{
              duration: animation.duration.base,
              ease: animation.ease.out,
            }}
            onClick={() => {
              if (!preventBackdropClose) {
                onClose();
              }
            }}
            aria-hidden="true"
          />

          {/* Dialog Container */}
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <motion.div
                ref={panelRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby={titleId}
                aria-describedby={descriptionId}
                className={cn(
                  "w-full transform overflow-hidden rounded-2xl bg-white dark:bg-neutral-900 p-6 text-left align-middle shadow-xl ring-1 ring-neutral-200 dark:ring-neutral-800",
                  sizes[size]
                )}
                variants={panelVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{
                  duration: animation.duration.base,
                  ease: animation.ease.out,
                }}
              >
                {title && (
                  <h3 id={titleId} className="text-lg font-semibold text-neutral-900 dark:text-white pr-8">
                    {title}
                  </h3>
                )}
                {description && (
                  <p id={descriptionId} className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
                    {description}
                  </p>
                )}
                <button
                  ref={closeButtonRef}
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 rounded-lg text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                  aria-label="닫기"
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
                <div className="mt-4">{children}</div>
              </motion.div>
            </div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}

export { Dialog };
