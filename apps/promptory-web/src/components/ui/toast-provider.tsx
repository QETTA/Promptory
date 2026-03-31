"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

import { cn } from "@/lib/cn";

type ToastTone = "error" | "info" | "success";

type ToastInput = {
  description: string;
  title: string;
  tone?: ToastTone;
};

type ToastRecord = ToastInput & {
  id: string;
  tone: ToastTone;
};

type ToastContextValue = {
  toast: (input: ToastInput) => void;
};

const toastToneClass: Record<ToastTone, string> = {
  error: "border-rose-200 bg-white text-rose-950 shadow-[0_22px_45px_rgba(190,24,93,0.16)]",
  info: "border-[var(--line)] bg-white text-[var(--slate-950)] shadow-[0_22px_45px_rgba(15,23,42,0.12)]",
  success: "border-[rgba(14,116,144,0.18)] bg-[var(--brand-50)] text-[var(--slate-950)] shadow-[0_22px_45px_rgba(14,116,144,0.16)]",
};

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastRecord[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const toast = useCallback(
    ({ tone = "info", ...input }: ToastInput) => {
      const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

      setToasts((current) => [...current, { ...input, id, tone }]);

      window.setTimeout(() => {
        removeToast(id);
      }, 4200);
    },
    [removeToast],
  );

  const value = useMemo(() => ({ toast }), [toast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="pointer-events-none fixed right-4 top-4 z-[100] flex w-[min(92vw,24rem)] flex-col gap-3">
        {toasts.map((item) => (
          <div
            key={item.id}
            className={cn(
              "pointer-events-auto rounded-[1.35rem] border px-4 py-3 backdrop-blur",
              toastToneClass[item.tone],
            )}
          >
            <p className="text-sm font-semibold">{item.title}</p>
            <p className="mt-1 text-sm leading-6 text-current/80">{item.description}</p>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used within ToastProvider.");
  }

  return context;
}
