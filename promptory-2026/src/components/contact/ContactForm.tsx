"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { contactFormSchema, type ContactFormInput } from "@/lib/contact-schema";
import { teamTypeOptions, painPointOptions } from "@/lib/contact-options";
import { submitContactRequest } from "@/app/contact/actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/cn";

interface ContactFormProps {
  inquiryType?: string;
  packageSlug?: string;
  planType?: string;
}

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
    const current = selectedPainPoints;
    const updated = current.includes(value as typeof current[number])
      ? current.filter((v) => v !== value)
      : [...current, value as typeof current[number]];
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
    data.painPoints.forEach((p) => formData.append("painPoints", p));
    if (data.contextNote) formData.append("contextNote", data.contextNote);
    // Add inquiry metadata
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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="ui-panel-elevated rounded-[2rem] p-8"
    >
      {/* Inquiry Type Badge */}
      <div className="flex flex-wrap gap-2">
        <Badge variant="default">
          {inquiryType === "quick_audit" ? "Quick Audit" : inquiryType === "package" ? "패키지 문의" : "데모 요청"}
        </Badge>
        {packageSlug && (
          <Badge variant="neutral">
            {packageSlug}
          </Badge>
        )}
        {planType && (
          <Badge variant="neutral">
            {planType === "growth" ? "Growth" : "Core"}
          </Badge>
        )}
      </div>

      <div className="grid gap-6">
        {/* 팀 이름 */}
        <div>
          <Label htmlFor="teamName">
            팀 이름 <span className="text-[var(--error)]">*</span>
          </Label>
          <Input
            id="teamName"
            {...register("teamName")}
            placeholder="예: 마케팅팀, 사업기획팀, Korea Marketing"
          />
          {errors.teamName && (
            <p className="mt-2 text-sm text-rose-600">{errors.teamName.message}</p>
          )}
        </div>

        {/* 담당자 이름 */}
        <div>
          <Label htmlFor="contactName">
            담당자 이름 <span className="text-[var(--error)]">*</span>
          </Label>
          <Input
            id="contactName"
            {...register("contactName")}
            placeholder="이름"
          />
          {errors.contactName && (
            <p className="mt-2 text-sm text-rose-600">{errors.contactName.message}</p>
          )}
        </div>

        {/* 이메일 */}
        <div>
          <Label htmlFor="email">
            업무용 이메일 <span className="text-[var(--error)]">*</span>
          </Label>
          <Input
            id="email"
            {...register("email")}
            type="email"
            placeholder="name@company.com"
          />
          {errors.email && (
            <p className="mt-2 text-sm text-rose-600">{errors.email.message}</p>
          )}
        </div>

        {/* 팀 유형 */}
        <fieldset>
          <legend className="mb-3 block text-sm font-medium text-[var(--slate-700)]">
            팀 유형 <span className="text-[var(--error)]">*</span>
          </legend>
          <div className="grid gap-3">
            {teamTypeOptions.map((option) => (
              <label
                key={option.value}
                className={choiceCardClass(selectedTeamType === option.value)}
              >
                <input
                  type="radio"
                  value={option.value}
                  {...register("teamType")}
                  className="h-4 w-4 accent-[var(--brand-700)]"
                />
                {option.label}
              </label>
            ))}
          </div>
          {errors.teamType && (
            <p className="mt-2 text-sm text-rose-600">{errors.teamType.message}</p>
          )}
        </fieldset>

        {/* 회사 URL */}
        <div>
          <Label htmlFor="companyUrl">
            회사 사이트 또는 채널 URL <span className="text-[var(--error)]">*</span>
          </Label>
          <Input
            id="companyUrl"
            {...register("companyUrl")}
            placeholder="https://company-site.com"
          />
          <p className="mt-2 text-xs text-[var(--slate-500)]">
            홈페이지, 랜딩, 유튜브, 채널 페이지 중 대표 URL 1개면 충분합니다
          </p>
          {errors.companyUrl && (
            <p className="mt-2 text-sm text-rose-600">{errors.companyUrl.message}</p>
          )}
        </div>

        {/* 밀리는 작업 */}
        <fieldset>
          <legend className="mb-3 block text-sm font-medium text-[var(--slate-700)]">
            지금 가장 밀리는 작업 <span className="text-[var(--error)]">*</span>
          </legend>
          <div className="grid gap-3 sm:grid-cols-2">
            {painPointOptions.map((option) => {
              const isSelected = selectedPainPoints.includes(
                option.value as typeof selectedPainPoints[number]
              );
              return (
                <label
                  key={option.value}
                  className={choiceCardClass(isSelected)}
                >
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
          {errors.painPoints && (
            <p className="mt-2 text-sm text-rose-600">{errors.painPoints.message}</p>
          )}
        </fieldset>

        {/* 회사 규모 */}
        <fieldset>
          <legend className="mb-3 block text-sm font-medium text-[var(--slate-700)]">
            회사 규모
          </legend>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { value: "20-50", label: "20~50명" },
              { value: "50-100", label: "50~100명" },
              { value: "100-200", label: "100~200명" },
              { value: "200+", label: "200명 이상" },
            ].map((option) => (
              <label
                key={option.value}
                className={choiceCardClass(selectedCompanySize === option.value)}
              >
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

        {/* 도입 희망 시기 */}
        <fieldset>
          <legend className="mb-3 block text-sm font-medium text-[var(--slate-700)]">
            도입 희망 시기
          </legend>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { value: "immediate", label: "가능한 빨리 (2주 이내)" },
              { value: "1month", label: "1개월 이내" },
              { value: "3months", label: "3개월 이내" },
              { value: "considering", label: "검토 중 (시기 미정)" },
            ].map((option) => (
              <label
                key={option.value}
                className={choiceCardClass(selectedTimeline === option.value)}
              >
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

        {/* 상황 설명 */}
        <div>
          <Label htmlFor="contextNote">지금 설명해주고 싶은 상황</Label>
          <Textarea
            id="contextNote"
            {...register("contextNote")}
            rows={6}
            placeholder={inquiryType === "quick_audit" 
              ? `예:
홈페이지: https://company-site.com
가장 급한 목표: 문의 전환 개선
현재 병목: 방문은 있는데 문의가 적음

Quick Audit로 확인하고 싶은 부분을 알려주세요.` 
              : `예:
홈페이지는 있는데 문의 전환이 약합니다.
대표 보고용으로 경쟁사 비교와 CTA 초안이 같이 필요합니다.
Slack 안에서 바로 공유할 수 있는 흐름이면 좋겠습니다.`}
            className="resize-none"
          />
          {errors.contextNote && (
            <p className="mt-2 text-sm text-rose-600">{errors.contextNote.message}</p>
          )}
        </div>

        {/* 서버 에러 */}
        {serverError && (
          <div className="rounded-[1rem] border border-[color-mix(in_srgb,var(--color-error)_18%,white)] bg-[var(--color-error-bg)] px-4 py-3">
            <p className="text-sm text-rose-700">{serverError}</p>
          </div>
        )}

        {/* 제출 버튼 */}
        <div className="pt-2">
          <Button
            type="submit"
            disabled={isPending}
            size="lg"
            className="w-full sm:w-auto"
          >
            {isPending ? (
              <>
                <svg
                  className="mr-2 h-5 w-5 animate-spin"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                전송 중...
              </>
            ) : (
              "우리 팀 기준 데모 요청하기"
            )}
          </Button>
          <p className="mt-3 text-sm text-[var(--slate-500)]">
            보내주신 내용으로 Slack 대화 흐름과 결과 예시를 준비합니다
          </p>
        </div>
      </div>
    </form>
  );
}
