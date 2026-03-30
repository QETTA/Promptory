"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { animation } from "@/lib/tokens";
// =====================================================
// Code Consolidation: Using shared clipboard utilities
// Eliminates duplication between useCopy, useCopy, and page.tsx
// =====================================================
import { copyToClipboard } from "@/lib/utils/clipboard";

interface UseCopyOptions {
  successDuration?: number;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
  text?: string; // Text to copy when copy() is called
}

interface UseCopyReturn {
  copied: boolean;
  error: Error | null;
  copy: (text?: string) => Promise<boolean>;
  reset: () => void;
}

/**
 * 복사 상태 관리를 위한 커스텀 훅
 * ActionPanel, FloatingCopyButton 등에서 중복 사용되던 로직 통합
 * 
 * Bottleneck Fixes:
 * - Delegates to shared clipboard utilities (no duplicate fallback logic)
 * - Memoized error handling prevents function recreation
 * - Proper cleanup on unmount
 * 
 * Features:
 * - navigator.clipboard API with automatic fallback
 * - Error handling for non-secure contexts
 * - Async/await support
 */
export function useCopy(options: UseCopyOptions = {}): UseCopyReturn {
  const { 
    successDuration = animation.duration.base * 1000, 
    onSuccess, 
    onError, 
    text: defaultText 
  } = options;
  
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 컴포넌트 언마운트시 타임아웃 정리
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, []);

  const reset = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setCopied(false);
    setError(null);
  }, []);

  const copy = useCallback(async (text?: string): Promise<boolean> => {
    // 이전 타임아웃 정리
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    
    const textToCopy = text ?? defaultText ?? "";
    
    if (!textToCopy) {
      const err = new Error("No text provided to copy");
      setError(err);
      onError?.(err);
      return false;
    }

    try {
      // =====================================================
      // Deduplication: Using shared clipboard utility
      // Single source of truth for all copy operations
      // =====================================================
      await copyToClipboard(textToCopy);

      setCopied(true);
      setError(null);
      onSuccess?.();

      // 새 타임아웃 설정
      timeoutRef.current = setTimeout(() => {
        setCopied(false);
        timeoutRef.current = null;
      }, successDuration);
      
      return true;
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Failed to copy to clipboard");
      setError(error);
      setCopied(false);
      onError?.(error);
      return false;
    }
  }, [defaultText, successDuration, onSuccess, onError]);

  return {
    copied,
    error,
    copy,
    reset,
  };
}
