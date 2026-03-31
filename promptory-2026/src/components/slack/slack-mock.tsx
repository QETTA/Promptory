"use client";

import { cn } from "@/lib/cn";

interface SlackMessage {
  type: "user" | "agent";
  content: React.ReactNode;
  buttons?: string[];
}

interface SlackMockProps {
  messages: SlackMessage[];
  className?: string;
}

export function SlackMock({ messages, className }: SlackMockProps) {
  return (
    <div
      className={cn(
        "w-full max-w-md rounded-xl border border-slate-200 bg-white shadow-xl overflow-hidden",
        className
      )}
    >
      {/* Slack Header */}
      <div className="bg-slate-100 px-4 py-3 border-b border-slate-200 flex items-center gap-2">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <div className="w-3 h-3 rounded-full bg-amber-400" />
          <div className="w-3 h-3 rounded-full bg-green-400" />
        </div>
        <span className="text-xs text-slate-500 ml-2">Promptory Agent</span>
      </div>

      {/* Slack Messages */}
      <div className="p-4 space-y-4 bg-white min-h-[300px]">
        {messages.map((message, index) => (
          <div
            key={index}
            className={cn(
              "flex gap-3",
              message.type === "user" ? "flex-row" : "flex-row"
            )}
          >
            {/* Avatar */}
            <div
              className={cn(
                "w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-semibold",
                message.type === "user"
                  ? "bg-slate-200 text-slate-600"
                  : "bg-[#4A154B] text-white"
              )}
            >
              {message.type === "user" ? "U" : "P"}
            </div>

            {/* Message Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-2">
                <span
                  className={cn(
                    "text-sm font-semibold",
                    message.type === "user" ? "text-slate-900" : "text-[#4A154B]"
                  )}
                >
                  {message.type === "user" ? "사용자" : "Promptory Agent"}
                </span>
                <span className="text-xs text-slate-400">오늘</span>
              </div>

              <div className="mt-1 text-sm text-slate-700 leading-relaxed">
                {message.content}
              </div>

              {/* Buttons */}
              {message.buttons && message.buttons.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {message.buttons.map((button, btnIndex) => (
                    <button
                      key={btnIndex}
                      className="px-3 py-1.5 bg-white border border-slate-300 rounded-md text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                    >
                      {button}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="px-4 py-3 border-t border-slate-200 bg-white">
        <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-lg border border-slate-200">
          <span className="text-slate-400 text-sm">URL이나 문서를 입력하세요...</span>
        </div>
      </div>
    </div>
  );
}

export function WebsiteDiagnosisMock() {
  const messages: SlackMessage[] = [
    {
      type: "user",
      content: (
        <span className="text-blue-600 underline">https://회사사이트URL</span>
      ),
    },
    {
      type: "agent",
      content: (
        <>
          사이트로 인식했어요.
          <br />
          지금은 유입보다 문의 전환 장치가 약합니다.
          <br />
          문의 기준으로 다시 볼까요?
        </>
      ),
    },
    {
      type: "user",
      content: "네, 문의가 목표예요.",
    },
    {
      type: "agent",
      content: (
        <>
          좋아요. 현재 병목은 3가지예요.
          <br />
          1. 상단 신뢰 요소가 약합니다
          <br />
          2. CTA 위치가 늦습니다
          <br />
          3. 메시지가 분산돼 있습니다
        </>
      ),
      buttons: ["경쟁사 비교", "전환 문구 초안", "보고용 요약"],
    },
  ];

  return <SlackMock messages={messages} />;
}

export function CampaignBriefMock() {
  const messages: SlackMessage[] = [
    {
      type: "user",
      content: "회의 메모랑 참고 랜딩 2개 보낼게요",
    },
    {
      type: "agent",
      content: (
        <>
          확인했어요.
          <br />
          지금은 캠페인 방향은 있는데 메시지 우선순위가 섞여 있어요.
          <br />
          리드 확보 기준으로 다시 정리할까요?
        </>
      ),
    },
    {
      type: "user",
      content: "네, 이번 목적은 리드예요.",
    },
    {
      type: "agent",
      content: (
        <>
          좋아요.
          <br />
          브리프는 리드 확보 기준으로 다시 정리하고
          <br />
          핵심 메시지 3개와 CTA 초안까지 같이 만들게요.
        </>
      ),
      buttons: ["브리프 만들기", "카피 초안", "팀장 보고용 요약"],
    },
  ];

  return <SlackMock messages={messages} />;
}

export function KoreaLocalOpsMock() {
  const messages: SlackMessage[] = [
    {
      type: "user",
      content: "한국 사이트 URL 보낼게요",
    },
    {
      type: "agent",
      content: (
        <>
          사이트를 확인했어요.
          <br />
          제품 정보는 충분하지만 한국 시장용 메시지와 CTA는 약한 편입니다.
          <br />
          HQ 보고용 요약도 같이 만들까요?
        </>
      ),
    },
    {
      type: "user",
      content: "네, KR/EN 둘 다 필요해요.",
    },
    {
      type: "agent",
      content: (
        <>
          좋아요.
          <br />
          한국 채널 기준 진단과 경쟁사 스캔을 먼저 정리한 뒤
          <br />
          KR/EN summary로 이어서 만들게요.
        </>
      ),
      buttons: ["Korea scan", "KR summary", "EN summary"],
    },
  ];

  return <SlackMock messages={messages} />;
}
