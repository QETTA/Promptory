"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";

const packagePrices = {
  starter: { low: 79, high: 99 },
  department: { low: 149, high: 249 },
  private: { low: 249, high: 399 },
  enterprise: { low: 499, high: 999 },
} as const;

const setupFees = {
  starter: { low: 300, high: 500 },
  department: { low: 700, high: 1200 },
  private: { low: 1200, high: 2000 },
  enterprise: { low: 2000, high: 4000 },
} as const;

const packageNames = {
  starter: "Starter Package",
  department: "Department Package",
  private: "Private Package",
  enterprise: "Enterprise Package",
} as const;

const workflowNames = {
  "deal-desk": "Deal Desk Approval Pack",
  "people-ops": "People Ops Request Pack",
  "it-access": "IT Access & Security Pack",
  "finance-procurement": "Finance & Procurement Pack",
} as const;

const packageItems = {
  starter: [
    { body: "Slack intake, approval card, 결과 회신까지 한 workflow를 닫는 첫 파일럿 범위", title: "Starter pilot setup" },
    { body: "한 부서, 한 요청 유형, 2~3개 connector 기준으로 small-scope MVP 구성", title: "Scoped workflow design" },
    { body: "주간 ops review와 failed case replay를 포함한 운영 cadence 설계", title: "Pilot operations review" },
    { body: "read / write / admin 경계와 approval rule 기본 설정", title: "Approval and policy baseline" },
  ],
  department: [
    { body: "2~3개 action pack과 운영 리포트까지 포함한 부서형 도입 패키지", title: "Department rollout" },
    { body: "App Home, approval queue, request state, ops dashboard mock 또는 실제 연결 범위", title: "Operator surface" },
    { body: "connector 상태, policy tuning, retry 운영 기준까지 포함한 일상 운영 설계", title: "Connector and policy operations" },
    { body: "부서 KPI와 approval turnaround 기준의 weekly review", title: "Department KPI cadence" },
  ],
  private: [
    { body: "customer environment deployment와 boundary 설계를 포함한 전용 배포 범위", title: "Private deployment rail" },
    { body: "delegated access, audit export, connector scope control 중심의 security setup", title: "Security and access controls" },
    { body: "custom connector 또는 customer-specific runtime boundary 설계", title: "Custom integration scope" },
    { body: "보안 검토와 운영 handoff 문서화", title: "Review and handoff pack" },
  ],
  enterprise: [
    { body: "여러 부서 pack을 포트폴리오처럼 운영하는 확장 범위", title: "Cross-department rollout" },
    { body: "advanced approval routing, exec briefing, portfolio KPI review 구성", title: "Executive and approval layer" },
    { body: "runtime, console, audit boundary를 유지한 채 scale하는 운영 구조", title: "Scale operations model" },
    { body: "전사 rollout roadmap과 governance 정렬", title: "Governance plan" },
  ],
} as const;

const setupSteps = [
  { desc: "반복 요청과 승인 규칙, first workflow 범위를 인터뷰로 자릅니다.", step: 1, title: "Scope workshop (1주)" },
  { desc: "Slack surface, approver, connector boundary, 권한 범위를 정리합니다.", step: 2, title: "Slack and policy setup (3~5일)" },
  { desc: "request-to-resolution workflow와 결과 반영 경로를 설계합니다.", step: 3, title: "Workflow design (1주)" },
  { desc: "샘플 케이스로 approval, fallback, system reflection을 점검합니다.", step: 4, title: "Pilot validation (3~5일)" },
  { desc: "운영 cadence와 handoff를 맞추고 launch 또는 pilot review를 진행합니다.", step: 5, title: "Ops launch (1~2일)" },
] as const;

type PackageType = keyof typeof packageNames;
type WorkflowType = keyof typeof workflowNames;

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
  const [packageType, setPackageType] = useState<PackageType>("starter");
  const [workflowType, setWorkflowType] = useState<WorkflowType>("deal-desk");
  const [validUntil, setValidUntil] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() + 30);
    return formatLocalDateInputValue(date);
  });

  const today = formatLocalDateInputValue(new Date());
  const price = packagePrices[packageType];
  const setupFee = setupFees[packageType];
  const packageName = packageNames[packageType];
  const workflowName = workflowNames[workflowType];
  const includedItems = packageItems[packageType];
  const nextStepNumber = "04";

  return (
    <div className="min-h-screen bg-[var(--surface-2)] py-8 print:bg-[var(--surface-1)] print:py-0">
      <div className="mx-auto mb-4 max-w-[210mm] px-4 print:hidden">
        <Card variant="default" className="rounded-3xl p-6">
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
                <option value="starter">Starter Package</option>
                <option value="department">Department Package</option>
                <option value="private">Private Package</option>
                <option value="enterprise">Enterprise Package</option>
              </Select>
            </div>
            <div>
              <Label htmlFor="workflowType">첫 workflow</Label>
              <Select
                id="workflowType"
                value={workflowType}
                onChange={(event) => setWorkflowType(event.target.value as WorkflowType)}
              >
                <option value="deal-desk">Deal Desk Approval Pack</option>
                <option value="people-ops">People Ops Request Pack</option>
                <option value="it-access">IT Access & Security Pack</option>
                <option value="finance-procurement">Finance & Procurement Pack</option>
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
                setPackageType("starter");
                setWorkflowType("deal-desk");
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
              <p className="mt-1 text-sm text-[var(--slate-500)]">Slack-first request-to-resolution package proposal</p>
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
                    <td className="p-4 text-sm font-medium text-[var(--slate-600)]">첫 workflow</td>
                    <td className="p-4 text-sm text-[var(--slate-900)]">{workflowName}</td>
                  </tr>
                  <tr className="border-b border-[var(--line)]">
                    <td className="p-4 text-sm font-medium text-[var(--slate-600)]">세팅 기간</td>
                    <td className="p-4 text-sm text-[var(--slate-900)]">2~4주 (scope workshop, Slack setup, workflow design, validation)</td>
                  </tr>
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

          <div className="mb-8">
            <ProposalSectionHeading number={nextStepNumber} title="다음 단계" />
            <div className="ui-paper-callout p-6">
              <ol className="list-inside list-decimal space-y-2 text-sm text-[var(--slate-700)]">
                <li>본 제안서 검토 및 내부 결정</li>
                <li>회신 또는 /contact 페이지에서 견적 확정 요청</li>
                <li>Kick-off 미팅 일정과 pilot scope 확정</li>
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
