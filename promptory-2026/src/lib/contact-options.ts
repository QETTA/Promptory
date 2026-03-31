export const teamTypeLabels = {
  "sme-b2b": "한국 B2B 중소기업 팀",
  "foreign-korea-branch": "외국계 한국지사 팀",
  other: "기타",
} as const;

export const painPointLabels = {
  "website-diagnosis": "사이트/랜딩 진단",
  "competitor-scan": "경쟁사 비교",
  "conversion-copy": "전환 문구 초안",
  "campaign-brief": "캠페인 브리프 정리",
  "internal-summary": "팀장/대표 보고용 요약",
  "kr-en-summary": "KR/EN summary",
  other: "기타",
} as const;

export const teamTypeOptions = [
  { value: "sme-b2b", label: "한국 B2B 중소기업 팀" },
  { value: "foreign-korea-branch", label: "외국계 한국지사 팀" },
  { value: "other", label: "기타" },
] as const;

export const painPointOptions = [
  { value: "website-diagnosis", label: "사이트/랜딩 진단" },
  { value: "competitor-scan", label: "경쟁사 비교" },
  { value: "conversion-copy", label: "전환 문구 초안" },
  { value: "campaign-brief", label: "캠페인 브리프 정리" },
  { value: "internal-summary", label: "팀장/대표 보고용 요약" },
  { value: "kr-en-summary", label: "KR/EN summary" },
  { value: "other", label: "기타" },
] as const;
