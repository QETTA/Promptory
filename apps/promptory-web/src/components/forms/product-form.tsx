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
import { getProductEditorChecklist } from "@/lib/product-editor";
import type { ProductRow } from "@/lib/supabase/types";
import {
  allowedProductFileAccept,
  allowedProductFileFormatLabel,
  productFormSchema,
  type ProductFormInput,
  type ProductFormOutput,
} from "@/lib/validations/product";
import { cn } from "@/lib/cn";

import styles from "./product-form.module.css";

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
    <section className={styles.section}>
      {eyebrow ? <p className={cn("section-kicker", styles.kickerBrand)}>{eyebrow}</p> : null}
      <h2 className={styles.sectionTitle}>{title}</h2>
      {description ? <p className={styles.sectionDescription}>{description}</p> : null}
      <div className={styles.sectionBody}>{children}</div>
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
      ? styles.readinessReady
      : checklist.summaryTone === "almost"
        ? styles.readinessAlmost
        : styles.readinessBlocked;
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
    <div className={styles.shell}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.stageRail}>
          <div className={styles.stageGrid}>
            {stageItems.map((item, index) => (
              <div
                key={item.label}
                className={cn(styles.stageCard, index === 0 ? styles.stageCardActive : styles.stageCardMuted)}
              >
                <p className={cn("section-kicker", styles.kickerBrand)}>
                  {index + 1}. {item.label}
                </p>
                <p className={styles.stageBody}>{item.body}</p>
              </div>
            ))}
          </div>
        </div>

        <FormSection
          eyebrow="Pack Setup"
          title="1. 기본 정보"
          description="실행 팩명, 카테고리, 실행 유형을 먼저 고정하면 오른쪽 상태판과 미리보기가 즉시 따라옵니다."
        >
          <div className={styles.twoColumn}>
            <div className={styles.field}>
              <Label htmlFor="title">실행 팩명</Label>
              <Input id="title" placeholder="예: 고객 상담 자동화 실행 팩" {...register("title")} />
              {errors.title ? <p className={styles.fieldError}>{errors.title.message}</p> : null}
            </div>
            <div className={styles.field}>
              <Label htmlFor="category">카테고리</Label>
              <Input id="category" placeholder="예: 자동화, 마케팅, 운영" {...register("category")} />
              {errors.category ? <p className={styles.fieldError}>{errors.category.message}</p> : null}
            </div>
          </div>
          <div className={styles.fieldCompact}>
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
          <div className={styles.fieldCompact}>
            <Label htmlFor="description">실행 팩 설명</Label>
            <Textarea
              id="description"
              placeholder="이 시스템이 어떤 결과를 만드는지 한눈에 이해되도록 설명해 주세요."
              className={styles.tallTextarea}
              {...register("description")}
            />
            {errors.description ? <p className={styles.fieldError}>{errors.description.message}</p> : null}
          </div>
          <div className={styles.fieldCompact}>
            <Label htmlFor="keywordsText">키워드</Label>
            <Input
              id="keywordsText"
              placeholder="예: AI, 자동화, 블로그, 마케팅"
              {...register("keywordsText")}
            />
            <p className={styles.fieldHint}>쉼표로 구분해서 입력합니다. 예: AI, 자동화, 블로그</p>
            {errors.keywordsText ? <p className={styles.fieldError}>{errors.keywordsText.message}</p> : null}
          </div>
          <div className={styles.fieldCompact}>
            <Label htmlFor="previewPointsText">미리보기 포인트</Label>
            <Textarea
              id="previewPointsText"
              placeholder={"예시:\n바로 실행 가능한 기본 흐름 포함\n초보자용 시작 가이드 제공\n결과 예시와 템플릿 제공"}
              className={styles.tallTextarea}
              {...register("previewPointsText")}
            />
            <p className={styles.fieldHint}>줄바꿈 한 줄마다 한 항목씩 표시됩니다. 현재 {checklist.previewCount}개</p>
            {errors.previewPointsText ? <p className={styles.fieldError}>{errors.previewPointsText.message}</p> : null}
          </div>
        </FormSection>

        <FormSection
          eyebrow="Assets"
          title="3. 파일 업로드"
          description="공개 전환의 필수 조건은 실제 실행 팩 파일입니다. 썸네일은 목록과 상세 이해 속도를 높이는 보조 신호입니다."
        >
          <div className={styles.twoColumn}>
            <div className={styles.fieldCompact}>
              <Label htmlFor="thumbnailFile">썸네일 이미지</Label>
              <Input
                ref={thumbnailInputRef}
                id="thumbnailFile"
                type="file"
                accept="image/*"
                onChange={(event) => setSelectedThumbnailName(event.target.files?.[0]?.name ?? null)}
              />
              <p className={styles.fieldHint}>
                {selectedThumbnailName
                  ? `새 썸네일 선택됨: ${selectedThumbnailName}`
                  : product?.thumbnail_url
                    ? "현재 썸네일이 등록되어 있습니다."
                    : "아직 썸네일이 없습니다."}
              </p>
            </div>
            <div className={styles.fieldCompact}>
              <Label htmlFor="productFile">실행 팩 파일</Label>
              <Input
                ref={productFileInputRef}
                id="productFile"
                type="file"
                accept={allowedProductFileAccept}
                onChange={(event) => setSelectedProductFileName(event.target.files?.[0]?.name ?? null)}
              />
              <p className={styles.fieldHint}>지원 형식: {allowedProductFileFormatLabel}</p>
              <p className={styles.fieldHint}>
                {selectedProductFileName
                  ? `새 실행 팩 파일 선택됨: ${selectedProductFileName}`
                  : product?.file_path
                    ? "현재 실행 팩 파일이 등록되어 있습니다."
                    : "아직 실행 팩 파일이 없습니다."}
              </p>
            </div>
          </div>
        </FormSection>

        <input className={styles.hiddenInput} type="hidden" {...register("setupMinutes")} />

        <FormSection
          eyebrow="Release"
          title="4. 공개 전 확인"
          description="가격과 공개 상태를 마지막으로 확인하고, 오른쪽 상태판에서 공개 가능 여부를 바로 읽을 수 있게 맞춥니다."
        >
          <div className={styles.twoColumn}>
            <div className={styles.fieldCompact}>
              <Label htmlFor="priceKrw">가격 (KRW)</Label>
              <Input id="priceKrw" type="number" {...register("priceKrw")} />
            </div>
            <div className={styles.fieldCompact}>
              <Label htmlFor="status">상태</Label>
              <Select id="status" {...register("status")}>
                <option value="draft">비공개</option>
                <option value="published">공개</option>
              </Select>
            </div>
          </div>
        </FormSection>

        {serverError ? <p className={styles.fieldError}>{serverError}</p> : null}

        <div className={styles.actions}>
          <Button type="submit" size="lg" disabled={isSubmitting}>
            {isSubmitting ? "저장 중..." : mode === "create" ? "실행 팩 등록" : "실행 팩 수정"}
          </Button>
          <Button type="button" variant="outline" onClick={() => router.push("/seller/products")}>
            목록으로
          </Button>
        </div>
      </form>

      <div className={styles.aside}>
        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <p className={cn("section-kicker", styles.kickerBrand)}>Readiness</p>
            <div className={styles.panelHeaderRow}>
              <div>
                <h2 className={styles.panelHeading}>{checklist.title}</h2>
                <p className={styles.panelBodyText}>{checklist.summary}</p>
              </div>
              <Badge className={styles.badgeNoShrink}>{checklist.readinessLabel}</Badge>
            </div>
          </div>

          <div className={styles.panelBody}>
            <div className={cn(styles.readinessRule, readinessAccentClass)}>
              {checklist.ruleText}
            </div>
            <div className={styles.readinessList}>
              {checklist.items.map((item) => (
                <div
                  key={item.id}
                  className={cn(
                    styles.checkItem,
                    item.done
                      ? styles.checkItemDone
                      : item.tone === "required"
                        ? styles.checkItemRequired
                        : styles.checkItemSuggested,
                  )}
                >
                  <p className={styles.checkLabel}>
                    {item.done ? "완료" : item.tone === "required" ? "필수" : "권장"}
                  </p>
                  <p className={styles.checkCopy}>{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={cn(styles.panel, styles.previewPanel)}>
          <div className={styles.previewHeader}>
            <div className={styles.previewMetaRow}>
              <div>
                <p className={cn("section-kicker", styles.kickerBrand)}>Preview</p>
                <h2 className={styles.previewTitle}>{getPreviewTitle(titleValue ?? "")}</h2>
              </div>
              <Badge variant="neutral">{statusLabel}</Badge>
            </div>
            <div className={styles.badgeRow}>
              <Badge>{previewCategoryLabel}</Badge>
              {previewKeywords.map((keyword) => (
                <Badge key={keyword} variant="neutral">
                  {keyword}
                </Badge>
              ))}
            </div>
            <p className={styles.previewDescription}>{getPreviewDescription(descriptionValue ?? "")}</p>
          </div>

          <div className={styles.previewBody}>
            <div className={styles.priceCard}>
              <div className={styles.priceHeader}>
                <p className={styles.priceLabel}>Price</p>
                <Badge variant="neutral">즉시 노출</Badge>
              </div>
              <p className={styles.priceValue}>{previewPriceLabel}</p>
            </div>

            <div className={styles.previewPointList}>
              {previewPoints.length > 0 ? (
                previewPoints.map((point) => (
                  <div key={point} className={styles.previewPoint}>
                    {point}
                  </div>
                ))
              ) : (
                <div className={styles.previewEmpty}>
                  미리보기 포인트를 3개 이상 적으면 구매 전에 보이는 핵심 가치가 더 빨리 정리됩니다.
                </div>
              )}
            </div>

            <div className={styles.assetStatusGrid}>
              <div className={styles.assetStatusCard}>
                <p className={styles.assetStatusLabel}>썸네일</p>
                <p className={styles.assetStatusValue}>{hasThumbnail ? "준비됨" : "없음"}</p>
              </div>
              <div className={styles.assetStatusCard}>
                <p className={styles.assetStatusLabel}>실행 팩 파일</p>
                <p className={styles.assetStatusValue}>{hasProductFile ? "준비됨" : "필수"}</p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.notesCard}>
          <p className={cn("section-kicker", styles.kickerMuted)}>Release Notes</p>
          <div className={styles.notesList}>
            <p>공개 전환의 필수 조건은 실제 실행 팩 파일입니다.</p>
            <p>썸네일과 미리보기 포인트가 있으면 목록과 상세에서 이해 속도가 빨라집니다.</p>
            <p>제목과 설명이 또렷할수록 주문과 보관함에서도 덜 끊깁니다.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
