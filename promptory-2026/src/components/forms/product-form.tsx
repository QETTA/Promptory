"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/cn";
import { getProductEditorChecklist } from "@/lib/product-editor";
import type { ProductRow } from "@/lib/supabase/types";
import {
  allowedProductFileAccept,
  allowedProductFileFormatLabel,
  productFormSchema,
  type ProductFormInput,
  type ProductFormOutput,
} from "@/lib/validations/product";

interface ProductFormProps {
  mode: "create" | "edit";
  product?: ProductRow;
}

function getPreviewTitle(title: string) {
  const trimmed = title.trim();
  return trimmed || "실행 팩명이 여기에 표시됩니다";
}

function getPreviewDescription(description: string) {
  const trimmed = description.trim();
  return trimmed || "이 실행 팩으로 어떤 일을 해결하는지 한 줄로 먼저 보이게 적어 주세요.";
}

function buildKeywordPreview(input: string | undefined) {
  return (input ?? "")
    .split(",")
    .map((keyword) => keyword.trim())
    .filter(Boolean)
    .slice(0, 4);
}

function FormSection({
  eyebrow,
  title,
  description,
  children,
}: {
  children: React.ReactNode;
  description?: string;
  eyebrow?: string;
  title: string;
  }) {
  return (
    <section className="ui-panel-soft p-5 sm:p-6">
      {eyebrow ? <p className="section-kicker text-[var(--brand-700)]">{eyebrow}</p> : null}
      <h2 className="mt-2 text-[1.05rem] font-semibold tracking-tight text-[var(--slate-950)]">{title}</h2>
      {description ? <p className="mt-2 text-sm leading-7 text-[var(--slate-600)]">{description}</p> : null}
      <div className="mt-5 space-y-4">{children}</div>
    </section>
  );
}

export function ProductForm({ mode, product }: ProductFormProps) {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [selectedThumbnailName, setSelectedThumbnailName] = useState<string | null>(null);
  const [selectedProductFileName, setSelectedProductFileName] = useState<string | null>(null);
  const thumbnailInputRef = useRef<HTMLInputElement>(null);
  const productFileInputRef = useRef<HTMLInputElement>(null);
  const previewDefault = product?.preview_points?.join("\n") ?? "";
  const keywordsDefault = product?.keywords?.join(", ") ?? "AI, 자동화, 블로그";

  const {
    formState: { errors, isSubmitting },
    register,
    handleSubmit,
    watch,
  } = useForm<ProductFormInput, unknown, ProductFormOutput>({
    defaultValues: {
      category: product?.category ?? "자동화",
      description: product?.description ?? "",
      keywordsText: keywordsDefault,
      previewPointsText: previewDefault,
      priceKrw: String(product?.price_krw ?? 29000),
      productType: product?.product_type ?? "automation_system",
      setupMinutes: String(product?.setup_minutes ?? 15),
      status: product?.status ?? "draft",
      title: product?.title ?? "",
    },
    resolver: zodResolver(productFormSchema),
  });

  const titleValue = watch("title");
  const categoryValue = watch("category");
  const descriptionValue = watch("description");
  const keywordsValue = watch("keywordsText");
  const previewPointsValue = watch("previewPointsText");
  const priceValue = watch("priceKrw");
  const statusValue = watch("status");

  const hasThumbnail = Boolean(selectedThumbnailName || product?.thumbnail_url);
  const hasProductFile = Boolean(selectedProductFileName || product?.file_path);
  const previewCategoryLabel =
    typeof categoryValue === "string" && categoryValue.trim() ? categoryValue.trim() : "카테고리";
  const previewKeywords = buildKeywordPreview(keywordsValue);
  const previewPoints = (previewPointsValue ?? "")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .slice(0, 4);
  const previewPriceValue =
    typeof priceValue === "string" || typeof priceValue === "number"
      ? Number(priceValue)
      : Number(product?.price_krw ?? 0);
  const previewPriceLabel = Number.isFinite(previewPriceValue)
    ? `${previewPriceValue.toLocaleString("ko-KR")}원`
    : "가격 입력";
  const statusLabel = statusValue === "published" ? "공개" : "비공개";

  const checklist = getProductEditorChecklist({
    description: descriptionValue ?? "",
    hasProductFile,
    hasThumbnail,
    previewPointsText: previewPointsValue ?? "",
    status: statusValue ?? product?.status ?? "draft",
    title: titleValue ?? "",
  });
  const readinessAccentClass =
    checklist.summaryTone === "ready"
      ? "border-emerald-200 bg-emerald-50 text-emerald-800"
      : checklist.summaryTone === "almost"
        ? "border-amber-200 bg-amber-50 text-amber-800"
        : "border-rose-200 bg-rose-50 text-rose-800";
  const stageItems = [
    { label: "입력", body: "이름, 카테고리, 유형을 먼저 고정합니다." },
    { label: "설명", body: "설명과 미리보기 포인트를 바로 다듬습니다." },
    { label: "공개", body: "파일과 상태판으로 공개 가능 여부를 확인합니다." },
  ] as const;

  async function onSubmit(values: ProductFormOutput) {
    setServerError(null);

    try {
      const formData = new FormData();
      formData.set("title", values.title);
      formData.set("description", values.description);
      formData.set("category", values.category);
      formData.set("keywordsText", values.keywordsText);
      formData.set("priceKrw", String(values.priceKrw));
      formData.set("productType", values.productType);
      formData.set("setupMinutes", String(values.setupMinutes));
      formData.set("previewPointsText", values.previewPointsText);
      formData.set("status", values.status);

      const thumbnailFile = thumbnailInputRef.current?.files?.[0] ?? null;
      const assetFile = productFileInputRef.current?.files?.[0] ?? null;

      if (thumbnailFile) {
        formData.set("thumbnailFile", thumbnailFile);
      }

      if (assetFile) {
        formData.set("productFile", assetFile);
      }

      const endpoint = mode === "create" ? "/api/products" : `/api/products/${product?.id}`;
      const response = await fetch(endpoint, {
        body: formData,
        method: mode === "create" ? "POST" : "PATCH",
      });

      let payload: { error?: string; productId?: string } | null = null;

      try {
        const raw = await response.text();
        payload = raw ? (JSON.parse(raw) as { error?: string; productId?: string }) : null;
      } catch {
        payload = null;
      }

      if (!response.ok || !payload?.productId) {
        throw new Error(payload?.error ?? "실행 팩 저장에 실패했습니다.");
      }

      router.push(`/seller/products/${payload.productId}/edit`);
      router.refresh();
    } catch (submitError) {
      setServerError(
        submitError instanceof Error ? submitError.message : "실행 팩 저장에 실패했습니다. 잠시 후 다시 시도해 주세요.",
      );
    }
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_352px]">
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="ui-panel-soft p-3">
          <div className="grid gap-3 md:grid-cols-3">
          {stageItems.map((item, index) => (
            <div
              key={item.label}
              className={cn(index === 0 ? "ui-panel-highlight" : "ui-panel-muted bg-white/90", "px-4 py-4")}
            >
              <p className="section-kicker text-[var(--brand-700)]">
                {index + 1}. {item.label}
              </p>
              <p className="mt-2 text-sm font-semibold text-[var(--slate-950)]">{item.body}</p>
            </div>
          ))}
          </div>
        </div>

        <FormSection
          eyebrow="Pack Setup"
          title="1. 기본 정보"
          description="실행 팩명, 카테고리, 실행 유형을 먼저 고정하면 오른쪽 상태판과 미리보기가 즉시 따라옵니다."
        >
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <Label htmlFor="title">실행 팩명</Label>
              <Input id="title" placeholder="예: 고객 상담 자동화 실행 팩" {...register("title")} />
              {errors.title ? <p className="mt-2 text-xs text-rose-600">{errors.title.message}</p> : null}
            </div>
            <div>
              <Label htmlFor="category">카테고리</Label>
              <Input id="category" placeholder="예: 자동화, 마케팅, 운영" {...register("category")} />
              {errors.category ? <p className="mt-2 text-xs text-rose-600">{errors.category.message}</p> : null}
            </div>
          </div>
          <div>
            <Label htmlFor="productType">실행 유형</Label>
            <Select id="productType" {...register("productType")}>
              <option value="automation_system">실행 시스템</option>
              <option value="template_bundle">템플릿 번들</option>
              <option value="prompt_pack">프롬프트 팩</option>
            </Select>
          </div>
        </FormSection>

        <FormSection
          eyebrow="Message"
          title="2. 설명"
          description="무엇을 해결하는지, 누가 바로 쓸 수 있는지, 구매 전에 무엇을 확인할지를 한 번에 읽히게 적습니다."
        >
          <div>
            <Label htmlFor="description">실행 팩 설명</Label>
            <Textarea
              id="description"
              placeholder="이 시스템이 어떤 결과를 만드는지 한눈에 이해되도록 설명해 주세요."
              className="min-h-32"
              {...register("description")}
            />
            {errors.description ? <p className="mt-2 text-xs text-rose-600">{errors.description.message}</p> : null}
          </div>
          <div>
            <Label htmlFor="keywordsText">키워드</Label>
            <Input
              id="keywordsText"
              placeholder="예: AI, 자동화, 블로그, 마케팅"
              {...register("keywordsText")}
            />
            <p className="mt-2 text-xs text-[var(--slate-500)]">쉼표로 구분해서 입력합니다. 예: AI, 자동화, 블로그</p>
            {errors.keywordsText ? <p className="mt-2 text-xs text-rose-600">{errors.keywordsText.message}</p> : null}
          </div>
          <div>
            <Label htmlFor="previewPointsText">미리보기 포인트</Label>
            <Textarea
              id="previewPointsText"
              placeholder={"예시:\n바로 실행 가능한 기본 흐름 포함\n초보자용 시작 가이드 제공\n결과 예시와 템플릿 제공"}
              className="min-h-32"
              {...register("previewPointsText")}
            />
            <p className="mt-2 text-xs text-[var(--slate-500)]">줄바꿈 한 줄마다 한 항목씩 표시됩니다. 현재 {checklist.previewCount}개</p>
            {errors.previewPointsText ? <p className="mt-2 text-xs text-rose-600">{errors.previewPointsText.message}</p> : null}
          </div>
        </FormSection>

        <FormSection
          eyebrow="Assets"
          title="3. 파일 업로드"
          description="공개 전환의 필수 조건은 실제 실행 팩 파일입니다. 썸네일은 목록과 상세 이해 속도를 높이는 보조 신호입니다."
        >
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <Label htmlFor="thumbnailFile">썸네일 이미지</Label>
              <Input
                ref={thumbnailInputRef}
                id="thumbnailFile"
                type="file"
                accept="image/*"
                onChange={(event) => setSelectedThumbnailName(event.target.files?.[0]?.name ?? null)}
              />
              <p className="mt-2 text-xs text-[var(--slate-500)]">
                {selectedThumbnailName
                  ? `새 썸네일 선택됨: ${selectedThumbnailName}`
                  : product?.thumbnail_url
                    ? "현재 썸네일이 등록되어 있습니다."
                    : "아직 썸네일이 없습니다."}
              </p>
            </div>
            <div>
              <Label htmlFor="productFile">실행 팩 파일</Label>
              <Input
                ref={productFileInputRef}
                id="productFile"
                type="file"
                accept={allowedProductFileAccept}
                onChange={(event) => setSelectedProductFileName(event.target.files?.[0]?.name ?? null)}
              />
              <p className="mt-2 text-xs text-[var(--slate-500)]">지원 형식: {allowedProductFileFormatLabel}</p>
              <p className="mt-2 text-xs text-[var(--slate-500)]">
                {selectedProductFileName
                  ? `새 실행 팩 파일 선택됨: ${selectedProductFileName}`
                  : product?.file_path
                    ? "현재 실행 팩 파일이 등록되어 있습니다."
                    : "아직 실행 팩 파일이 없습니다."}
              </p>
            </div>
          </div>
        </FormSection>

        <input type="hidden" {...register("setupMinutes")} />

        <FormSection
          eyebrow="Release"
          title="4. 공개 전 확인"
          description="가격과 공개 상태를 마지막으로 확인하고, 오른쪽 상태판에서 공개 가능 여부를 바로 읽을 수 있게 맞춥니다."
        >
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <Label htmlFor="priceKrw">가격 (KRW)</Label>
              <Input id="priceKrw" type="number" {...register("priceKrw")} />
            </div>
            <div>
              <Label htmlFor="status">상태</Label>
              <Select id="status" {...register("status")}>
                <option value="draft">비공개</option>
                <option value="published">공개</option>
              </Select>
            </div>
          </div>
        </FormSection>

        {serverError ? <p className="text-sm text-rose-600">{serverError}</p> : null}

        <div className="flex flex-wrap gap-3">
          <Button type="submit" size="lg" disabled={isSubmitting}>
            {isSubmitting ? "저장 중..." : mode === "create" ? "실행 팩 등록" : "실행 팩 수정"}
          </Button>
          <Button type="button" variant="outline" onClick={() => router.push("/seller/products")}>
            목록으로
          </Button>
        </div>
      </form>

      <div className="space-y-5 xl:sticky xl:top-24 xl:self-start">
        <div className="ui-panel-elevated overflow-hidden rounded-[1.4rem]">
          <div className="border-b border-[var(--line)] bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)] px-5 py-5">
            <p className="section-kicker text-[var(--brand-700)]">Readiness</p>
            <div className="mt-3 flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h2 className="text-[1.15rem] font-semibold tracking-tight text-[var(--slate-950)]">{checklist.title}</h2>
                <p className="mt-2 text-sm leading-7 text-[var(--slate-700)]">{checklist.summary}</p>
              </div>
              <Badge className="shrink-0">{checklist.readinessLabel}</Badge>
            </div>
          </div>

          <div className="px-5 py-5">
            <div className={cn("rounded-[1rem] border px-4 py-3 text-sm leading-7", readinessAccentClass)}>
              {checklist.ruleText}
            </div>
            <div className="mt-4 grid gap-2 text-sm leading-6 text-[var(--slate-600)]">
              {checklist.items.map((item) => (
                <div
                  key={item.id}
                  className={cn("rounded-[0.95rem] border px-3 py-3", 
                    item.done
                      ? "border-emerald-200 bg-emerald-50/70 text-emerald-800"
                      : item.tone === "required"
                        ? "border-rose-200 bg-rose-50 text-rose-800"
                        : "border-[var(--line)] bg-[var(--surface-2)] text-[var(--slate-700)]"
                  )}
                >
                  <p className="text-xs font-semibold">
                    {item.done ? "완료" : item.tone === "required" ? "필수" : "권장"}
                  </p>
                  <p className="mt-1">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="ui-panel-elevated overflow-hidden">
          <div className="border-b border-[var(--line)] bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] px-5 py-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="section-kicker text-[var(--brand-700)]">Preview</p>
                <h2 className="mt-2 text-[1.15rem] font-semibold tracking-tight text-[var(--slate-950)]">
                  {getPreviewTitle(titleValue ?? "")}
                </h2>
              </div>
              <Badge variant="neutral">{statusLabel}</Badge>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge>{previewCategoryLabel}</Badge>
              {previewKeywords.map((keyword) => (
                <Badge key={keyword} variant="neutral">
                  {keyword}
                </Badge>
              ))}
            </div>
            <p className="mt-4 text-sm leading-7 text-[var(--slate-700)]">{getPreviewDescription(descriptionValue ?? "")}</p>
          </div>

          <div className="px-5 py-5">
            <div className="ui-panel-muted bg-[linear-gradient(180deg,#ffffff_0%,#f5f8fc_100%)] px-4 py-4">
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--slate-500)]">Price</p>
                <Badge variant="neutral">즉시 노출</Badge>
              </div>
              <p className="mt-2 text-[1.5rem] font-semibold tracking-tight text-[var(--slate-950)]">{previewPriceLabel}</p>
            </div>

            <div className="mt-4 grid gap-2">
              {previewPoints.length > 0 ? (
                previewPoints.map((point) => (
                  <div key={point} className="ui-panel-muted bg-[rgba(248,250,252,0.95)] px-3 py-3 text-sm leading-6 text-[var(--slate-700)]">
                    {point}
                  </div>
                ))
              ) : (
                <div className="rounded-[0.9rem] border border-dashed border-[var(--line-strong)] bg-[var(--surface-2)] px-3 py-4 text-sm leading-6 text-[var(--slate-500)]">
                  미리보기 포인트를 3개 이상 적으면 구매 전에 보이는 핵심 가치가 더 빨리 정리됩니다.
                </div>
              )}
            </div>

            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              <div className="ui-panel-muted bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] px-3 py-3 text-sm leading-6 text-[var(--slate-700)]">
                <p className="text-xs font-semibold text-[var(--slate-500)]">썸네일</p>
                <p className="mt-1">{hasThumbnail ? "준비됨" : "없음"}</p>
              </div>
              <div className="ui-panel-muted bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] px-3 py-3 text-sm leading-6 text-[var(--slate-700)]">
                <p className="text-xs font-semibold text-[var(--slate-500)]">실행 팩 파일</p>
                <p className="mt-1">{hasProductFile ? "준비됨" : "필수"}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="ui-panel-muted rounded-[1.25rem] bg-[linear-gradient(180deg,#fbfdff_0%,#f4f8ff_100%)] p-5">
          <p className="section-kicker text-[var(--slate-500)]">Release Notes</p>
          <div className="mt-3 grid gap-2 text-sm leading-7 text-[var(--slate-700)]">
            <p>공개 전환의 필수 조건은 실제 실행 팩 파일입니다.</p>
            <p>썸네일과 미리보기 포인트가 있으면 목록과 상세에서 이해 속도가 빨라집니다.</p>
            <p>제목과 설명이 또렷할수록 주문 레일과 보관함에서도 덜 끊깁니다.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
