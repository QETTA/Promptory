"use client";

import { useCallback, useRef, useEffect } from "react";

interface UseTimeoutReturn {
  set: (callback: () => void, delay: number) => void;
  clear: () => void;
  isPending: () => boolean;
}

/**
 * 안전한 타임아웃 관리를 위한 커스텀 훅
 * BrowserVerifyPanel, ActionPanel 등에서 중복 사용되던 setTimeout 로직 통합
 * 컴포넌트 언마운트 시 자동 정리
 */
export function useTimeout(): UseTimeoutReturn {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 컴포넌트 언마운트시 타임아웃 정리
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const clear = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const set = useCallback((callback: () => void, delay: number) => {
    // 이전 타임아웃 정리
    clear();

    // 새 타임아웃 설정
    timeoutRef.current = setTimeout(() => {
      callback();
      timeoutRef.current = null;
    }, delay);
  }, [clear]);

  const isPending = useCallback(() => {
    return timeoutRef.current !== null;
  }, []);

  return {
    set,
    clear,
    isPending,
  };
}

/**
 * 지연 실행을 위한 커스텀 훅 (단발성)
 */
export function useDelay(
  callback: () => void,
  delay: number,
  deps: React.DependencyList = []
): { trigger: () => void; clear: () => void } {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const clear = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const trigger = useCallback(() => {
    clear();
    timeoutRef.current = setTimeout(() => {
      callback();
      timeoutRef.current = null;
    }, delay);
  }, [callback, delay, clear]);

  return { trigger, clear };
}
