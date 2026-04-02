"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { submitContactRequest } from "@/app/(marketing)/contact/actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/cn";
import { painPointOptions, teamTypeOptions } from "@/lib/contact-options";
import { contactFormSchema, type ContactFormInput } from "@/lib/contact-schema";


const inquiryLabelMap: Record<string, string> = {
  quick_audit: "Public Audit Demo",
  package: "패키지 문의",
  upsell: "Pack 확장 상담",
  starter: "Starter 파일럿",
  department: "Department 상담",
  private: "Private 배포 상담",
  enterprise: "Enterprise 상담",
  pilot: "파일럿 스코프",
  security: "보안 검토",
  architecture: "아키텍처 검토",
  education: "교육 / 실습 문의",
  demo: "데모 요청",
};

function getInquiryLabel(inquiryType: string) {
  return inquiryLabelMap[inquiryType] ?? "데모 요청";
}

function getContextPlaceholder(inquiryType: string) {
  switch (inquiryType) {
    case "quick_audit":
      return `예:
공개 진단 URL: https://company-site.com
현재 가장 막히는 흐름: 문의 triage / 권한 요청 / 승인 요청
데모 이후 이어보고 싶은 범위: Starter 파일럿

public audit 데모에서 확인하고 싶은 부분을 알려주세요.`;
    case "starter":
    case "pilot":
      return `예:
현재 가장 느린 요청: 할인 승인 / 접근권한 요청 / 출장 승인 중 하나
연결할 시스템: Slack + CRM + Jira
승인자: 팀장 1명
목표: 4~6주 안에 처리시간 단축 확인

첫 workflow를 무엇으로 잡고 싶은지 알려주세요.`;
    case "department":
    case "enterprise":
      return `예:
현재 1차로 검토 중인 부서: Sales Ops, People Ops
추가하고 싶은 pack: Deal Desk approval, People request pack
연결 시스템: Slack + CRM + Okta + Jira
관심 KPI: approval turnaround, human touch rate

확장하고 싶은 범위를 알려주세요.`;
    case "private":
    case "security":
    case "architecture":
      return `예:
배포 형태: customer VPC / private deployment 검토 중
보안 요구: 원문 최소 보관, delegated access, audit export 필요
연결 시스템: Slack + IAM + ITSM
승인 규칙: 관리자 작업은 approval required

보안/구조 관점에서 가장 중요한 우려를 알려주세요.`;
    case "upsell":
      return `예:
현재 검증한 workflow: Deal Desk approval
다음 확장 후보: People Ops request pack
운영에서 막힌 점: 승인 병목 / connector failure / policy mismatch

다음 단계로 무엇을 넓히고 싶은지 적어주세요.`;
    case "education":
      return `예:
현재 줄이고 싶은 반복 업무: 회의 후속 정리 / 승인 요청 / 문서 초안 / 계정 발급
원하는 방식: 진단 / 실습 / 팀 워크숍
현재 사용하는 도구: Slack, ChatGPT, n8n, Google Sheets
목표: 내 업무 예제로 먼저 검증하고 싶음

교육 / 실습으로 먼저 확인하고 싶은 범위를 알려주세요.`;
    default:
      return `예:
현재 반복적으로 발생하는 요청 유형: 할인 승인, 접근 권한 요청, 출장 승인
지금 사람이 직접 들어가서 바꾸는 시스템: CRM, Jira, Okta
승인자: 팀장 / 부서장

우리 팀에서 가장 먼저 닫고 싶은 workflow를 알려주세요.`;
  }
}

interface ContactFormProps {
  inquiryType?: string;
  packageSlug?: string;
  planType?: string;
}

const planLabels: Record<string, string> = {
  starter: "Starter",
  department: "Department",
  private: "Private",
  enterprise: "Enterprise",
  diagnostic: "AI 업무자동화 진단",
  "hands-on": "AI 자동화 실습",
  "team-workshop": "팀 자동화 워크숍",
};

export function ContactForm({ inquiryType = "demo", packageSlug, planType }: ContactFormProps) {
  const [isPending, startTransition] = useTransition();
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ContactFormInput>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      teamName: "",
      contactName: "",
      email: "",
      teamType: undefined,
      companyUrl: "",
      painPoints: [],
      contextNote: "",
    },
  });

  const selectedPainPoints = watch("painPoints") || [];
  const selectedTeamType = watch("teamType");
  const [selectedCompanySize, setSelectedCompanySize] = useState<string>("");
  const [selectedTimeline, setSelectedTimeline] = useState<string>("");

  const togglePainPoint = (value: string) => {
    const updated = selectedPainPoints.includes(value as (typeof selectedPainPoints)[number])
      ? selectedPainPoints.filter((item) => item !== value)
      : [...selectedPainPoints, value as (typeof selectedPainPoints)[number]];

    setValue("painPoints", updated, { shouldValidate: true });
  };

  const onSubmit = (data: ContactFormInput) => {
    setServerError(null);
    const formData = new FormData();
    formData.append("teamName", data.teamName);
    formData.append("contactName", data.contactName);
    formData.append("email", data.email);
    formData.append("teamType", data.teamType);
    formData.append("companyUrl", data.companyUrl);
    data.painPoints.forEach((painPoint) => formData.append("painPoints", painPoint));
    if (data.contextNote) formData.append("contextNote", data.contextNote);
    formData.append("inquiryType", inquiryType);
    if (packageSlug) formData.append("packageSlug", packageSlug);
    if (planType) formData.append("planType", planType);
    if (selectedCompanySize) formData.append("companySize", selectedCompanySize);
    if (selectedTimeline) formData.append("timeline", selectedTimeline);

    startTransition(async () => {
      const result = await submitContactRequest(formData);
      if (result?.error) {
        setServerError(result.error);
      }
    });
  };

  function choiceCardClass(selected: boolean) {
    return cn("ui-choice-card px-4 py-3 text-sm", selected && "ui-choice-card-selected");
  }


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="ui-panel-elevated rounded-[var(--radius-4xl)] p-8">
      <div className="flex flex-wrap gap-2">
        <Badge variant="default">{getInquiryLabel(inquiryType)}</Badge>
        {packageSlug ? <Badge variant="neutral">{packageSlug}</Badge> : null}
        {planType ? <Badge variant="neutral">{planLabels[planType] ?? planType}</Badge> : null}
      </div>

      <div className="mt-6 grid gap-6">
        <div>
          <Label htmlFor="teamName">
            팀 이름 <span className="text-[var(--error)]">*</span>
          </Label>
          <Input id="teamName" {...register("teamName")} placeholder="예: Sales Ops, People Ops, IT Ops" />
          {errors.teamName ? <p className="mt-2 text-sm text-rose-600">{errors.teamName.message}</p> : null}
        </div>

        <div>
          <Label htmlFor="contactName">
            담당자 이름 <span className="text-[var(--error)]">*</span>
          </Label>
          <Input id="contactName" {...register("contactName")} placeholder="이름" />
          {errors.contactName ? <p className="mt-2 text-sm text-rose-600">{errors.contactName.message}</p> : null}
        </div>

        <div>
          <Label htmlFor="email">
            업무용 이메일 <span className="text-[var(--error)]">*</span>
          </Label>
          <Input id="email" {...register("email")} type="email" placeholder="name@company.com" />
          {errors.email ? <p className="mt-2 text-sm text-rose-600">{errors.email.message}</p> : null}
        </div>

        <fieldset>
          <legend className="mb-3 block text-sm font-medium text-[var(--slate-700)]">
            팀 유형 <span className="text-[var(--error)]">*</span>
          </legend>
          <div className="grid gap-3">
            {teamTypeOptions.map((option) => (
              <label key={option.value} className={choiceCardClass(selectedTeamType === option.value)}>
                <input type="radio" value={option.value} {...register("teamType")} className="h-4 w-4 accent-[var(--brand-700)]" />
                {option.label}
              </label>
            ))}
          </div>
          {errors.teamType ? <p className="mt-2 text-sm text-rose-600">{errors.teamType.message}</p> : null}
        </fieldset>

        <div>
          <Label htmlFor="companyUrl">
            참고 URL 또는 workspace / docs 링크 <span className="text-[var(--error)]">*</span>
          </Label>
          <Input
            id="companyUrl"
            {...register("companyUrl")}
            placeholder="https://company.com/process-doc or https://www.notion.so/..."
          />
          <p className="mt-2 text-xs text-[var(--slate-500)]">
            회사 위키, help center, process 문서, 현재 쓰는 시스템 화면 링크 등 참고 URL 1개면 충분합니다.
          </p>
          {errors.companyUrl ? <p className="mt-2 text-sm text-rose-600">{errors.companyUrl.message}</p> : null}
        </div>

        <fieldset>
          <legend className="mb-3 block text-sm font-medium text-[var(--slate-700)]">
            지금 가장 막히는 요청 유형 <span className="text-[var(--error)]">*</span>
          </legend>
          <div className="grid gap-3 sm:grid-cols-2">
            {painPointOptions.map((option) => {
              const isSelected = selectedPainPoints.includes(option.value as (typeof selectedPainPoints)[number]);
              return (
                <label key={option.value} className={choiceCardClass(isSelected)}>
                  <input
                    type="checkbox"
                    value={option.value}
                    checked={isSelected}
                    onChange={() => togglePainPoint(option.value)}
                    className="h-4 w-4 accent-[var(--brand-700)]"
                  />
                  {option.label}
                </label>
              );
            })}
          </div>
          {errors.painPoints ? <p className="mt-2 text-sm text-rose-600">{errors.painPoints.message}</p> : null}
        </fieldset>

        <fieldset>
          <legend className="mb-3 block text-sm font-medium text-[var(--slate-700)]">회사 규모</legend>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { value: "20-50", label: "20~50명" },
              { value: "50-100", label: "50~100명" },
              { value: "100-200", label: "100~200명" },
              { value: "200+", label: "200명 이상" },
            ].map((option) => (
              <label key={option.value} className={choiceCardClass(selectedCompanySize === option.value)}>
                <input
                  type="radio"
                  name="companySize"
                  value={option.value}
                  checked={selectedCompanySize === option.value}
                  onChange={() => setSelectedCompanySize(option.value)}
                  className="h-4 w-4 accent-[var(--brand-700)]"
                />
                {option.label}
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="mb-3 block text-sm font-medium text-[var(--slate-700)]">도입 희망 시기</legend>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { value: "immediate", label: "가능한 빨리 (2주 이내)" },
              { value: "1month", label: "1개월 이내" },
              { value: "3months", label: "3개월 이내" },
              { value: "considering", label: "검토 중 (시기 미정)" },
            ].map((option) => (
              <label key={option.value} className={choiceCardClass(selectedTimeline === option.value)}>
                <input
                  type="radio"
                  name="timeline"
                  value={option.value}
                  checked={selectedTimeline === option.value}
                  onChange={() => setSelectedTimeline(option.value)}
                  className="h-4 w-4 accent-[var(--brand-700)]"
                />
                {option.label}
              </label>
            ))}
          </div>
        </fieldset>

        <div>
          <Label htmlFor="contextNote">지금 설명해주고 싶은 상황</Label>
          <Textarea id="contextNote" {...register("contextNote")} rows={6} placeholder={getContextPlaceholder(inquiryType)} className="resize-none" />
          {errors.contextNote ? <p className="mt-2 text-sm text-rose-600">{errors.contextNote.message}</p> : null}
        </div>

        {serverError ? (
          <div className="rounded-[1rem] border border-[color-mix(in_srgb,var(--color-error)_18%,white)] bg-[var(--color-error-bg)] px-4 py-3">
            <p className="text-sm text-rose-700">{serverError}</p>
          </div>
        ) : null}

        <div className="pt-2">
          <Button type="submit" disabled={isPending} size="lg" className="w-full sm:w-auto">
            {isPending ? (
              <>
                <svg className="mr-2 h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                전송 중...
              </>
            ) : inquiryType === "education" ? (
              "교육 / 진단 문의하기"
            ) : inquiryType === "security" || inquiryType === "security-review" ? (
              "보안 · 구조 상담 신청"
            ) : ["package", "starter", "department", "private", "enterprise", "pilot", "pricing", "architecture"].includes(inquiryType) ? (
              "파일럿 / 패키지 상담 신청"
            ) : (
              "우리 팀 기준 데모 요청하기"
            )}
          </Button>
          <p className="mt-3 text-sm text-[var(--slate-500)]">
            {inquiryType === "security-review" || inquiryType === "security"
              ? "보내주신 보안·권한 요구사항을 기준으로 검토 포인트를 정리해 드립니다."
              : inquiryType === "education"
                ? "진단 / 실습 / 팀 워크숍 중 맞는 entry product를 정리해 드립니다."
                : ["package", "starter", "department", "private", "enterprise", "pilot", "pricing", "architecture"].includes(inquiryType)
                  ? "팀 상황에 맞는 파일럿 범위와 도입 일정을 함께 보내드립니다."
                  : "보내주신 내용으로 Slack 대화 흐름과 결과 예시를 준비합니다."}
          </p>
        </div>
      </div>
    </form>
  );
}
