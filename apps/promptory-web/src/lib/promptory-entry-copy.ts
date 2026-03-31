import type { ChannelIntakeCardProps } from "@/components/channel-intake/channel-intake-card";

export const homeEntryIntakeCopy: Pick<
  ChannelIntakeCardProps,
  "afterInputHint" | "body" | "density" | "flowBody" | "flowLabel" | "submitLabel" | "title"
> = {
  afterInputHint: "첫 답장: 채널 종류, 1차 병목, 다음 질문",
  body: "첫 답장에서 채널 종류와 1차 병목을 바로 말하고, 이어서 질문을 좁혀 갑니다.",
  density: "compact",
  flowBody: "채널 종류 → 1차 병목 → 다음 질문",
  flowLabel: "첫 답장",
  submitLabel: "첫 답장 받기",
  title: "URL 던지고 첫 답장 받기",
};

export const optimizeEntryIntakeCopy: Pick<
  ChannelIntakeCardProps,
  "afterInputHint" | "body" | "density" | "flowBody" | "flowLabel" | "submitLabel" | "title"
> = {
  afterInputHint: "첫 답장 뒤에 Ask 질문과 실행 추천으로 이어집니다.",
  body: "URL 확인부터 첫 답장, Ask 질문, 실행 제안까지 한 화면에서 이어집니다.",
  density: "workspace",
  flowBody: "첫 답장 → Ask 질문 → 실행 제안",
  flowLabel: "대화 흐름",
  submitLabel: "첫 답장 시작",
  title: "URL 던지고 첫 답장 열기",
};
