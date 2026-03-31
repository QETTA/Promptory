"use client";

import { Button, type ButtonProps } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast-provider";

type CopyActionButtonProps = {
  currentUrl?: boolean;
  label: string;
  successDescription: string;
  successTitle: string;
  text?: string;
} & Omit<ButtonProps, "onClick">;

export function CopyActionButton({
  currentUrl = false,
  label,
  successDescription,
  successTitle,
  text,
  ...props
}: CopyActionButtonProps) {
  const { toast } = useToast();

  async function handleCopy() {
    const value = currentUrl ? window.location.href : text;

    if (!value) {
      toast({
        title: "복사할 내용이 없습니다",
        description: "현재 복사할 텍스트를 찾지 못했습니다.",
        tone: "error",
      });
      return;
    }

    try {
      await navigator.clipboard.writeText(value);
      toast({
        title: successTitle,
        description: successDescription,
        tone: "success",
      });
    } catch {
      toast({
        title: "복사에 실패했습니다",
        description: "브라우저에서 클립보드 접근을 허용한 뒤 다시 시도해 주세요.",
        tone: "error",
      });
    }
  }

  return (
    <Button {...props} onClick={handleCopy}>
      {label}
    </Button>
  );
}
