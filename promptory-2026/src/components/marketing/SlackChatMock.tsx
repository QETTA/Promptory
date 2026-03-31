"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

interface SlackMessage {
  type: "user" | "agent";
  content: string;
  buttons?: string[];
}

interface SlackChatMockProps {
  title?: string;
  messages: SlackMessage[];
  className?: string;
  animated?: boolean;
  showInput?: boolean;
}

export function SlackChatMock({
  title = "Promptory Agent",
  messages,
  className,
  animated = true,
  showInput = true,
}: SlackChatMockProps) {
  const [visibleCount, setVisibleCount] = useState(animated ? 0 : messages.length);
  const [showTyping, setShowTyping] = useState(false);

  useEffect(() => {
    if (!animated) return;

    const interval = setInterval(() => {
      setVisibleCount((prev) => {
        if (prev < messages.length) {
          const nextMessage = messages[prev];
          if (nextMessage.type === "agent") {
            setShowTyping(true);
            setTimeout(() => setShowTyping(false), 800);
          }
          return prev + 1;
        }
        clearInterval(interval);
        return prev;
      });
    }, 1200);

    return () => clearInterval(interval);
  }, [messages, animated]);

  return (
    <div
      className={cn(
        "w-full max-w-md rounded-2xl border border-slate-200 bg-white shadow-2xl overflow-hidden",
        className
      )}
    >
      {/* Slack Header */}
      <div className="bg-[#1a1d21] px-4 py-3 border-b border-slate-800 flex items-center gap-2">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <div className="w-3 h-3 rounded-full bg-[#28c840]" />
        </div>
        <span className="text-xs text-slate-400 ml-2 font-medium">{title}</span>
      </div>

      {/* Messages */}
      <div className="p-4 space-y-4 bg-white min-h-[280px] max-h-[380px] overflow-y-auto">
        {messages.slice(0, visibleCount).map((message, index) => (
          <div
            key={index}
            className={cn(
              "flex gap-3",
              message.type === "user" ? "flex-row" : "flex-row"
            )}
            style={{
              animation: "fadeInUp 0.3s ease-out forwards",
              animationDelay: `${index * 50}ms`,
              opacity: 0,
            }}
          >
            {/* Avatar */}
            <div
              className={cn(
                "w-9 h-9 rounded-lg flex-shrink-0 flex items-center justify-center text-xs font-bold shadow-sm",
                message.type === "user"
                  ? "bg-gradient-to-br from-slate-200 to-slate-300 text-slate-700"
                  : "bg-gradient-to-br from-[#4A154B] to-[#611f63] text-white"
              )}
            >
              {message.type === "user" ? "U" : "P"}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-2">
                <span
                  className={cn(
                    "text-sm font-bold",
                    message.type === "user" ? "text-slate-900" : "text-[#4A154B]"
                  )}
                >
                  {message.type === "user" ? "사용자" : "Promptory Agent"}
                </span>
                <span className="text-xs text-slate-400">오늘</span>
              </div>

              <div className="mt-1.5 text-sm text-slate-700 leading-relaxed bg-slate-50 rounded-lg px-3 py-2 inline-block whitespace-pre-line">
                {message.content}
              </div>

              {/* Buttons */}
              {message.buttons && message.buttons.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {message.buttons.map((button, btnIndex) => (
                    <button
                      key={btnIndex}
                      className="px-3 py-1.5 bg-white border border-slate-300 rounded-md text-xs font-medium text-slate-700 hover:bg-slate-50 hover:border-slate-400 hover:shadow-sm transition-all"
                    >
                      {button}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {showTyping && (
          <div className="flex gap-3">
            <div className="w-9 h-9 rounded-lg flex-shrink-0 flex items-center justify-center text-xs font-bold bg-gradient-to-br from-[#4A154B] to-[#611f63] text-white shadow-sm">
              P
            </div>
            <div className="flex-1">
              <span className="text-sm font-bold text-[#4A154B]">Promptory Agent</span>
              <div className="mt-1.5 bg-slate-50 rounded-lg px-3 py-3 inline-flex items-center gap-1">
                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      {showInput && (
        <div className="px-4 py-3 border-t border-slate-200 bg-slate-50">
          <div className="flex items-center gap-2 px-3 py-2 bg-white rounded-lg border border-slate-300 shadow-sm">
            <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
            </svg>
            <span className="text-slate-400 text-sm">URL이나 문서를 입력하세요...</span>
            <button className="ml-auto p-1.5 bg-blue-600 rounded text-white hover:bg-blue-700 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Preset mocks for common use cases
export function WebsiteDiagnosisChatMock({ className }: { className?: string }) {
  return (
    <SlackChatMock
      className={className}
      messages={[
        { type: "user", content: "https://회사사이트URL" },
        { type: "agent", content: "사이트로 인식했어요.\n지금은 유입보다 문의 전환 장치가 약합니다.\n문의 기준으로 다시 볼까요?" },
        { type: "user", content: "네, 문의가 목표예요." },
        { type: "agent", content: "좋아요. 현재 병목은 3가지예요.\n1. 상단 신뢰 요소가 약합니다\n2. CTA 위치가 늦습니다\n3. 메시지가 분산돼 있습니다", buttons: ["경쟁사 비교", "전환 문구 초안", "보고용 요약"] },
      ]}
    />
  );
}

export function CampaignBriefChatMock({ className }: { className?: string }) {
  return (
    <SlackChatMock
      className={className}
      messages={[
        { type: "user", content: "회의 메모랑 참고 랜딩 2개 보낼게요" },
        { type: "agent", content: "확인했어요.\n지금은 캠페인 방향은 있는데 메시지 우선순위가 섞여 있어요.\n리드 확보 기준으로 다시 정리할까요?" },
        { type: "user", content: "네, 이번 목적은 리드예요." },
        { type: "agent", content: "좋아요.\n브리프는 리드 확보 기준으로 다시 정리하고\n핵심 메시지 3개와 CTA 초안까지 같이 만들게요.", buttons: ["브리프 만들기", "카피 초안", "팀장 보고용 요약"] },
      ]}
    />
  );
}

export function KoreaLocalOpsChatMock({ className }: { className?: string }) {
  return (
    <SlackChatMock
      className={className}
      messages={[
        { type: "user", content: "한국 사이트 URL 보낼게요" },
        { type: "agent", content: "사이트를 확인했어요.\n제품 정보는 충분하지만 한국 시장용 메시지와 CTA는 약한 편입니다.\nHQ 보고용 요약도 같이 만들까요?" },
        { type: "user", content: "네, KR/EN 둘 다 필요해요." },
        { type: "agent", content: "좋아요.\n한국 채널 기준 진단과 경쟁사 스캔을 먼저 정리한 뒤\nKR/EN summary로 이어서 만들게요.", buttons: ["Korea scan", "KR summary", "EN summary"] },
      ]}
    />
  );
}
