import type { ChatPreviewAction, ChatPreviewCardProps, ChatPreviewMessage } from "@/components/marketplace/chat-preview-card";

const firstReplyUrlMessage: ChatPreviewMessage = {
  role: "user",
  body: "https://company-example.co.kr",
};

const firstReplyDiagnosisMessage: ChatPreviewMessage = {
  role: "assistant",
  body: (
    <>
      회사 사이트로 인식했어요. 지금은 유입보다 문의 전환 장치가 약합니다.
      <br />
      문의 기준으로 다시 볼까요?
    </>
  ),
};

const firstReplyQuestionNarrowingMessage: ChatPreviewMessage = {
  role: "assistant",
  body: "질문은 길지 않게 갑니다. 목표, 가장 급한 병목, 시간 제약만 먼저 고정하면 결과 스택이 바로 바뀝니다.",
};

const firstReplyGoalMessage: ChatPreviewMessage = {
  role: "user",
  body: "네, 문의가 목표예요.",
};

const firstReplyRecommendationMessage: ChatPreviewMessage = {
  role: "assistant",
  body: (
    <>
      좋아요. 현재 병목은 신뢰 요소 부족, CTA 위치 문제, 메시지 분산입니다.
      <br />
      지금 바로 이어서 할 건 경쟁사 비교, 전환 문구 초안, 보고용 요약입니다.
    </>
  ),
};

export const promptoryWowSignals = [
  "URL만 붙여도 채널 종류와 1차 병목을 바로 말합니다.",
  "질문은 길지 않고, 목표와 제약을 2~4개 안에서 고정합니다.",
  "답변이 들어오면 추천 결과와 다음 버튼이 바로 바뀝니다.",
  "대화가 설명으로 끝나지 않고 실제 실행으로 바로 이어집니다.",
  "저장 후 돌아오면 어제 하던 작업을 바로 이어갈 수 있습니다.",
] as const;

export const homeFirstReplyPreview: Pick<ChatPreviewCardProps, "description" | "eyebrow" | "messages" | "status" | "title"> & {
  actions: ChatPreviewAction[];
} = {
  eyebrow: "첫 답장 예시",
  title: "URL 하나로 무엇을 본 건지, 첫 답장에서 알아야 합니다",
  description: "프롬프토리의 와우는 예쁜 결과 화면이 아니라 첫 5개의 메시지 안에서 터져야 합니다.",
  messages: [firstReplyUrlMessage, firstReplyDiagnosisMessage, firstReplyGoalMessage, firstReplyRecommendationMessage],
  status: "읽기 → 질문 → 실행 추천이 몇 번의 메시지 안에서 바로 이어집니다.",
  actions: [
    { href: "/optimize", label: "경쟁사 비교", variant: "default" },
    { href: "/optimize", label: "전환 문구 초안", variant: "outline" },
    { href: "/optimize", label: "보고용 요약", variant: "outline" },
  ],
};

export const optimizeFirstReplyPreview: Pick<
  ChatPreviewCardProps,
  "description" | "eyebrow" | "messages" | "status" | "title"
> = {
  eyebrow: "첫 답장 흐름",
  title: "URL 하나면 첫 읽기와 다음 질문까지 바로 이어집니다",
  description: "첫 답장에서 무엇을 읽었는지 먼저 말하고, 질문 몇 개 안에 병목과 목표를 좁힙니다.",
  messages: [firstReplyUrlMessage, firstReplyDiagnosisMessage, firstReplyQuestionNarrowingMessage],
  status: "질문 2~4개 안에서 방향을 고정하고, 그다음 실행 연결로 넘어갑니다.",
};
