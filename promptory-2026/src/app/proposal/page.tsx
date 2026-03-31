"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";

const packagePrices = {
  quick_audit: { low: 4.9, high: 9.9 },
  core: { low: 79, high: 99 },
  growth: { low: 149, high: 249 },
} as const;

const setupFees = {
  quick_audit: { low: 0, high: 0 },
  core: { low: 300, high: 500 },
  growth: { low: 700, high: 1200 },
} as const;

const packageNames = {
  quick_audit: "Quick Audit Pack",
  core: "Core Package",
  growth: "Growth Package",
} as const;

const agentNames = {
  "website-diagnosis": "Website Diagnosis Agent",
  "campaign-brief": "Campaign Brief Agent",
  "korea-local-ops": "Korea Local Ops Agent",
} as const;

const quickAuditItems = [
  { body: "URL 기반 핵심 병목 분석", title: "사이트/채널 진단" },
  { body: "3사 대표 경쟁사 비교 분석", title: "경쟁사 비교표" },
  { body: "전환 문구 초안 3개", title: "CTA 초안" },
  { body: "1페이지 실행 요약", title: "보고용 요약" },
] as const;

const packageItems = [
  { body: "DM/채널/모달 연동 및 App Home 설정", title: "Slack 에이전트 설치" },
  { body: "팀 내 무제한 에이전트 사용", title: "무제한 URL 진단" },
  { body: "팀 인터뷰 기반 질문 및 출력 형식 조정", title: "맞춤 흐름 세팅" },
  { body: "App Home에서 진단 및 초안 히스토리 관리", title: "결과 저장 및 관리" },
  { body: "한국어 및 영문 요약 동시 생성", title: "KR/EN 언어 옵션" },
  { body: "평일 9-18시 기술 문의 응답", title: "이메일 기술 지원" },
] as const;

const setupSteps = [
  { desc: "입력물, 질문 흐름, 출력 형식 정의", step: 1, title: "팀 인터뷰 (1주)" },
  { desc: "워크스페이스 연결 및 권한 설정", step: 2, title: "Slack 연동 (3~5일)" },
  { desc: "맞춤 질문, 출력 템플릿, 공유 채널 설정", step: 3, title: "에이전트 흐름 설계 (1주)" },
  { desc: "샘플 URL 테스트 및 흐름 조정", step: 4, title: "테스트 및 수정 (3~5일)" },
  { desc: "사용 가이드 전달 및 Q&A", step: 5, title: "팀 교육 및 론칭 (1~2일)" },
] as const;

type PackageType = keyof typeof packageNames;
type AgentType = keyof typeof agentNames;

function formatLocalDateInputValue(date: Date) {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function ProposalSectionHeading({ number, title }: { number: string; title: string }) {
  return (
    <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-[var(--slate-900)]">
      <span className="ui-paper-marker">{number}</span>
      {title}
    </h2>
  );
}

function ProposalFeatureCard({ body, title }: { body: string; title: string }) {
  return (
    <div className="ui-paper-card p-4">
      <p className="mb-2 font-medium text-[var(--slate-900)]">{title}</p>
      <p className="text-sm text-[var(--slate-600)]">{body}</p>
    </div>
  );
}

function ProposalInfoBlock({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wider text-[var(--slate-500)]">{label}</p>
      <p className="text-sm font-semibold text-[var(--slate-900)] sm:text-lg">{value}</p>
    </div>
  );
}

// This page is designed to be printed/saved as PDF
export default function ProposalPage() {
  const [clientName, setClientName] = useState("[고객사명]");
  const [contactName, setContactName] = useState("[담당자명]");
  const [packageType, setPackageType] = useState<PackageType>("core");
  const [agentType, setAgentType] = useState<AgentType>("website-diagnosis");
  const [validUntil, setValidUntil] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() + 30);
    return formatLocalDateInputValue(date);
  });

  const today = formatLocalDateInputValue(new Date());
  const price = packagePrices[packageType];
  const setupFee = setupFees[packageType];
  const packageName = packageNames[packageType];
  const agentName = agentNames[agentType];
  const includedItems = packageType === "quick_audit" ? quickAuditItems : packageItems;
  const nextStepNumber = packageType === "quick_audit" ? "03" : "04";

  return (
    <div className="min-h-screen bg-[var(--surface-2)] py-8 print:bg-[var(--surface-1)] print:py-0">
      <div className="mx-auto mb-4 max-w-[210mm] px-4 print:hidden">
        <Card variant="default" className="rounded-[1.5rem] p-6">
          <h1 className="section-title text-[var(--slate-950)]">프롬프토리 제안서 생성기</h1>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="clientName">고객사명</Label>
              <Input
                id="clientName"
                type="text"
                value={clientName}
                onChange={(event) => setClientName(event.target.value)}
                placeholder="고객사명"
              />
            </div>
            <div>
              <Label htmlFor="contactName">담당자명</Label>
              <Input
                id="contactName"
                type="text"
                value={contactName}
                onChange={(event) => setContactName(event.target.value)}
                placeholder="담당자명"
              />
            </div>
            <div>
              <Label htmlFor="packageType">패키지 유형</Label>
              <Select
                id="packageType"
                value={packageType}
                onChange={(event) => setPackageType(event.target.value as PackageType)}
              >
                <option value="quick_audit">Quick Audit Pack</option>
                <option value="core">Core Package</option>
                <option value="growth">Growth Package</option>
              </Select>
            </div>
            <div>
              <Label htmlFor="agentType">에이전트 선택</Label>
              <Select
                id="agentType"
                value={agentType}
                onChange={(event) => setAgentType(event.target.value as AgentType)}
              >
                <option value="website-diagnosis">Website Diagnosis Agent</option>
                <option value="campaign-brief">Campaign Brief Agent</option>
                <option value="korea-local-ops">Korea Local Ops Agent</option>
              </Select>
            </div>
            <div>
              <Label htmlFor="validUntil">유효 기한</Label>
              <Input
                id="validUntil"
                type="date"
                value={validUntil}
                onChange={(event) => setValidUntil(event.target.value)}
              />
            </div>
          </div>
          <div className="mt-6 flex gap-3">
            <Button type="button" onClick={() => window.print()}>
              PDF로 저장/인쇄
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setClientName("[고객사명]");
                setContactName("[담당자명]");
                setPackageType("core");
                setAgentType("website-diagnosis");
                const nextMonth = new Date();
                nextMonth.setDate(nextMonth.getDate() + 30);
                setValidUntil(formatLocalDateInputValue(nextMonth));
              }}
            >
              초기화
            </Button>
          </div>
        </Card>
      </div>

      <div className="ui-paper-sheet mx-auto max-w-[210mm] shadow-[var(--shadow-xl)] print:max-w-none print:shadow-none">
        <div className="min-h-[297mm] p-[20mm]">
          <div className="mb-8 flex items-start justify-between border-b-2 border-[var(--slate-950)] pb-6">
            <div>
              <h1 className="text-2xl font-bold text-[var(--slate-900)]">프롬프토리</h1>
              <p className="mt-1 text-sm text-[var(--slate-500)]">맞춤형 Slack Agent Package</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-[var(--slate-900)]">제안서</p>
              <p className="mt-1 text-xs text-[var(--slate-500)]">No. PT-{today.replace(/-/g, "")}-001</p>
            </div>
          </div>

          <div className="ui-paper-muted mb-8 p-6">
            <div className="grid gap-4 md:grid-cols-2">
              <ProposalInfoBlock label="고객사" value={clientName} />
              <ProposalInfoBlock label="담당자" value={`${contactName} 님`} />
              <ProposalInfoBlock label="제안일" value={today} />
              <ProposalInfoBlock label="유효 기한" value={`${validUntil}까지`} />
            </div>
          </div>

          <div className="mb-8">
            <ProposalSectionHeading number="01" title="제안 패키지" />
            <div className="ui-paper-card overflow-hidden">
              <table className="w-full">
                <tbody>
                  <tr className="border-b border-[var(--line)] bg-[var(--surface-2)]">
                    <td className="w-1/3 p-4 text-sm font-medium text-[var(--slate-600)]">패키지명</td>
                    <td className="p-4 text-base font-semibold text-[var(--slate-900)]">{packageName}</td>
                  </tr>
                  <tr className="border-b border-[var(--line)]">
                    <td className="p-4 text-sm font-medium text-[var(--slate-600)]">포함 에이전트</td>
                    <td className="p-4 text-sm text-[var(--slate-900)]">{agentName}</td>
                  </tr>
                  {packageType !== "quick_audit" ? (
                    <tr className="border-b border-[var(--line)]">
                      <td className="p-4 text-sm font-medium text-[var(--slate-600)]">세팅 기간</td>
                      <td className="p-4 text-sm text-[var(--slate-900)]">2~4주 (팀 인터뷰, Slack 연동, 흐름 설계, 테스트)</td>
                    </tr>
                  ) : null}
                  <tr className="border-b border-[var(--line)] bg-[var(--surface-2)]">
                    <td className="p-4 text-sm font-medium text-[var(--slate-600)]">월 요금</td>
                    <td className="p-4">
                      <span className="text-2xl font-bold text-[var(--slate-900)]">₩{price.low}~{price.high}만원</span>
                      <span className="ml-2 text-sm text-[var(--slate-500)]">/월 (VAT 별도)</span>
                    </td>
                  </tr>
                  {setupFee.low > 0 ? (
                    <tr className="border-b border-[var(--line)]">
                      <td className="p-4 text-sm font-medium text-[var(--slate-600)]">초기 세팅비</td>
                      <td className="p-4">
                        <span className="text-lg font-semibold text-[var(--slate-900)]">₩{setupFee.low}~{setupFee.high}만원</span>
                        <span className="ml-2 text-sm text-[var(--slate-500)]">(일회성)</span>
                      </td>
                    </tr>
                  ) : null}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mb-8">
            <ProposalSectionHeading number="02" title="포함 사항" />
            <div className="grid gap-4 md:grid-cols-2">
              {includedItems.map((item) => (
                <ProposalFeatureCard key={item.title} body={item.body} title={item.title} />
              ))}
            </div>
          </div>

          {packageType !== "quick_audit" ? (
            <div className="mb-8">
              <ProposalSectionHeading number="03" title="도입 프로세스" />
              <div className="space-y-3">
                {setupSteps.map((item) => (
                  <div key={item.step} className="flex gap-4">
                    <div className="ui-step-marker shrink-0">{item.step}</div>
                    <div>
                      <p className="font-medium text-[var(--slate-900)]">{item.title}</p>
                      <p className="text-sm text-[var(--slate-600)]">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          <div className="mb-8">
            <ProposalSectionHeading number={nextStepNumber} title="다음 단계" />
            <div className="ui-paper-callout p-6">
              <ol className="list-inside list-decimal space-y-2 text-sm text-[var(--slate-700)]">
                <li>본 제안서 검토 및 내부 결정</li>
                <li>회신 또는 /contact 페이지에서 견적 확정 요청</li>
                <li>{packageType === "quick_audit" ? "URL 전달 및 진단 일정 확정" : "Kick-off 미팅 일정 확정"}</li>
                <li>계약서 작성 및 세팅 시작</li>
              </ol>
            </div>
          </div>

          <div className="mt-auto border-t border-[var(--line)] pt-6">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-sm font-medium text-[var(--slate-900)]">프롬프토리</p>
                <p className="mt-1 text-xs text-[var(--slate-500)]">https://promptory.ai</p>
                <p className="text-xs text-[var(--slate-500)]">contact@promptory.ai</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-[var(--slate-400)]">본 문서는 견적 제안 목적으로 작성되었습니다.</p>
                <p className="text-xs text-[var(--slate-400)]">유효 기한: {validUntil}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
