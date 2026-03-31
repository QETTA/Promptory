"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";

import { Button, type ButtonProps } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast-provider";

type SaveOptimizationRunButtonProps = {
  channelKind: string;
  channelLabel: string;
  focusTitle?: string | null;
  label?: string;
  queryString: string;
  rawUrl: string;
  recommendedCategory?: string | null;
  successDescription?: string;
  summaryNote?: string | null;
} & Omit<ButtonProps, "onClick">;

export function SaveOptimizationRunButton({
  channelKind,
  channelLabel,
  focusTitle,
  label = "현재 진단 저장",
  queryString,
  rawUrl,
  recommendedCategory,
  successDescription = "같은 계정으로 /optimize와 보관함에서 다시 열 수 있게 저장했습니다.",
  summaryNote,
  ...props
}: SaveOptimizationRunButtonProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  async function handleSave() {
    try {
      const response = await fetch("/api/optimization-runs", {
        body: JSON.stringify({
          channelKind,
          channelLabel,
          focusTitle,
          queryString,
          rawUrl,
          recommendedCategory,
          summaryNote,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      const payload = (await response.json().catch(() => null)) as { error?: string } | null;

      if (!response.ok) {
        throw new Error(payload?.error ?? "현재 진단을 저장하지 못했습니다.");
      }

      toast({
        title: "진단을 저장했습니다",
        description: successDescription,
        tone: "success",
      });
      startTransition(() => {
        router.refresh();
      });
    } catch (error) {
      toast({
        title: "저장에 실패했습니다",
        description:
          error instanceof Error ? error.message : "현재 진단을 저장하지 못했습니다. 잠시 후 다시 시도해 주세요.",
        tone: "error",
      });
    }
  }

  return (
    <Button {...props} disabled={props.disabled || isPending} onClick={handleSave}>
      {isPending ? "저장 중..." : label}
    </Button>
  );
}
