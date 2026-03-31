"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { contactFormSchema, type ContactFormInput } from "@/lib/contact-schema";
import { teamTypeOptions, painPointOptions } from "@/lib/contact-options";
import { submitContactRequest } from "@/app/contact/actions";

export function ContactForm() {
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

    startTransition(async () => {
      const result = await submitContactRequest(formData);
      if (result?.error) {
        setServerError(result.error);
      }
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-3xl border border-zinc-200 bg-white p-8"
    >
      <div className="grid gap-6">
        {/* 팀 이름 */}
        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-900">
            팀 이름 <span className="text-red-500">*</span>
          </label>
          <input
            {...register("teamName")}
            placeholder="예: 마케팅팀, 사업기획팀, Korea Marketing"
            className="w-full rounded-2xl border border-zinc-300 px-4 py-3 text-sm outline-none transition-colors focus:border-zinc-950"
          />
          {errors.teamName && (
            <p className="mt-2 text-sm text-red-600">{errors.teamName.message}</p>
          )}
        </div>

        {/* 담당자 이름 */}
        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-900">
            담당자 이름 <span className="text-red-500">*</span>
          </label>
          <input
            {...register("contactName")}
            placeholder="이름"
            className="w-full rounded-2xl border border-zinc-300 px-4 py-3 text-sm outline-none transition-colors focus:border-zinc-950"
          />
          {errors.contactName && (
            <p className="mt-2 text-sm text-red-600">{errors.contactName.message}</p>
          )}
        </div>

        {/* 이메일 */}
        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-900">
            업무용 이메일 <span className="text-red-500">*</span>
          </label>
          <input
            {...register("email")}
            type="email"
            placeholder="name@company.com"
            className="w-full rounded-2xl border border-zinc-300 px-4 py-3 text-sm outline-none transition-colors focus:border-zinc-950"
          />
          {errors.email && (
            <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        {/* 팀 유형 */}
        <fieldset>
          <legend className="mb-3 block text-sm font-medium text-zinc-900">
            팀 유형 <span className="text-red-500">*</span>
          </legend>
          <div className="grid gap-3">
            {teamTypeOptions.map((option) => (
              <label
                key={option.value}
                className={`flex cursor-pointer items-center gap-3 rounded-2xl border px-4 py-3 text-sm transition-colors ${
                  selectedTeamType === option.value
                    ? "border-zinc-950 bg-zinc-50 text-zinc-950"
                    : "border-zinc-300 text-zinc-800 hover:border-zinc-400"
                }`}
              >
                <input
                  type="radio"
                  value={option.value}
                  {...register("teamType")}
                  className="h-4 w-4 accent-zinc-950"
                />
                {option.label}
              </label>
            ))}
          </div>
          {errors.teamType && (
            <p className="mt-2 text-sm text-red-600">{errors.teamType.message}</p>
          )}
        </fieldset>

        {/* 회사 URL */}
        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-900">
            회사 사이트 또는 채널 URL <span className="text-red-500">*</span>
          </label>
          <input
            {...register("companyUrl")}
            placeholder="https://company-site.com"
            className="w-full rounded-2xl border border-zinc-300 px-4 py-3 text-sm outline-none transition-colors focus:border-zinc-950"
          />
          <p className="mt-2 text-xs text-zinc-500">
            홈페이지, 랜딩, 유튜브, 채널 페이지 중 대표 URL 1개면 충분합니다
          </p>
          {errors.companyUrl && (
            <p className="mt-2 text-sm text-red-600">{errors.companyUrl.message}</p>
          )}
        </div>

        {/* 밀리는 작업 */}
        <fieldset>
          <legend className="mb-3 block text-sm font-medium text-zinc-900">
            지금 가장 밀리는 작업 <span className="text-red-500">*</span>
          </legend>
          <div className="grid gap-3 sm:grid-cols-2">
            {painPointOptions.map((option) => {
              const isSelected = selectedPainPoints.includes(
                option.value as typeof selectedPainPoints[number]
              );
              return (
                <label
                  key={option.value}
                  className={`flex cursor-pointer items-center gap-3 rounded-2xl border px-4 py-3 text-sm transition-colors ${
                    isSelected
                      ? "border-zinc-950 bg-zinc-50 text-zinc-950"
                      : "border-zinc-300 text-zinc-800 hover:border-zinc-400"
                  }`}
                >
                  <input
                    type="checkbox"
                    value={option.value}
                    checked={isSelected}
                    onChange={() => togglePainPoint(option.value)}
                    className="h-4 w-4 accent-zinc-950"
                  />
                  {option.label}
                </label>
              );
            })}
          </div>
          {errors.painPoints && (
            <p className="mt-2 text-sm text-red-600">{errors.painPoints.message}</p>
          )}
        </fieldset>

        {/* 상황 설명 */}
        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-900">
            지금 설명해주고 싶은 상황
          </label>
          <textarea
            {...register("contextNote")}
            rows={6}
            placeholder={`예:
홈페이지는 있는데 문의 전환이 약합니다.
대표 보고용으로 경쟁사 비교와 CTA 초안이 같이 필요합니다.
Slack 안에서 바로 공유할 수 있는 흐름이면 좋겠습니다.`}
            className="w-full rounded-2xl border border-zinc-300 px-4 py-3 text-sm outline-none transition-colors focus:border-zinc-950 resize-none"
          />
          {errors.contextNote && (
            <p className="mt-2 text-sm text-red-600">{errors.contextNote.message}</p>
          )}
        </div>

        {/* 서버 에러 */}
        {serverError && (
          <div className="rounded-2xl bg-red-50 px-4 py-3">
            <p className="text-sm text-red-700">{serverError}</p>
          </div>
        )}

        {/* 제출 버튼 */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isPending}
            className="inline-flex w-full items-center justify-center rounded-full bg-zinc-950 px-6 py-4 text-base font-semibold text-white transition-all hover:bg-zinc-800 disabled:opacity-60 disabled:cursor-not-allowed sm:w-auto"
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
          </button>
          <p className="mt-3 text-sm text-zinc-500">
            보내주신 내용으로 Slack 대화 흐름과 결과 예시를 준비합니다
          </p>
        </div>
      </div>
    </form>
  );
}
