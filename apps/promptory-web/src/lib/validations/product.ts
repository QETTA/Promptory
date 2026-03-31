import { z } from "zod";

export const productTypeSchema = z.enum(["automation_system", "template_bundle", "prompt_pack"]);
export const productStatusSchema = z.enum(["draft", "published"]);

const allowedProductFileExtensions = ["zip", "pdf", "txt", "md", "json", "yaml", "yml"] as const;
const allowedProductFileMimeTypes = [
  "application/zip",
  "application/x-zip-compressed",
  "application/pdf",
  "text/plain",
  "application/json",
  "text/markdown",
  "application/x-yaml",
  "application/yaml",
  "application/octet-stream",
] as const;

export const allowedProductFileFormatLabel = "ZIP, PDF, TXT, MD, JSON, YAML";
export const allowedProductFileAccept =
  ".zip,.pdf,.txt,.md,.json,.yaml,.yml,application/zip,application/x-zip-compressed,application/pdf,text/plain,application/json,text/markdown,application/x-yaml,application/yaml";

function getFileExtension(fileName: string) {
  const index = fileName.lastIndexOf(".");

  if (index < 0) {
    return "";
  }

  return fileName.slice(index + 1).trim().toLowerCase();
}

export const productFormSchema = z.object({
  title: z.string().trim().min(2, "상품명을 입력해 주세요.").max(120),
  description: z.string().trim().min(20, "상품 설명은 20자 이상 입력해 주세요.").max(5000),
  category: z.string().trim().min(2, "카테고리를 입력해 주세요.").max(40),
  keywordsText: z.string().trim().min(2, "키워드를 하나 이상 입력해 주세요."),
  priceKrw: z.coerce.number().int().min(1000, "최소 가격은 1,000원입니다."),
  previewPointsText: z.string().trim().min(3, "미리 보여줄 핵심 포인트를 입력해 주세요."),
  productType: productTypeSchema,
  setupMinutes: z.coerce.number().int().min(1, "예상 세팅 시간은 1분 이상이어야 합니다.").max(1440),
  status: productStatusSchema,
});

export type ProductFormInput = z.input<typeof productFormSchema>;
export type ProductFormOutput = z.output<typeof productFormSchema>;

const maxThumbnailBytes = 5 * 1024 * 1024;
const maxProductBytes = 50 * 1024 * 1024;

export function validateThumbnailFile(file: File | null) {
  if (!file || file.size === 0) {
    return;
  }

  if (!file.type.startsWith("image/")) {
    throw new Error("썸네일은 이미지 파일만 업로드할 수 있습니다.");
  }

  if (file.size > maxThumbnailBytes) {
    throw new Error("썸네일은 5MB 이하만 업로드할 수 있습니다.");
  }
}

export function validateProductFile(file: File | null) {
  if (!file || file.size === 0) {
    return;
  }

  if (file.size > maxProductBytes) {
    throw new Error("실행 팩 파일은 50MB 이하만 업로드할 수 있습니다.");
  }

  const extension = getFileExtension(file.name);

  if (!allowedProductFileExtensions.includes(extension as (typeof allowedProductFileExtensions)[number])) {
    throw new Error(`실행 팩 파일은 ${allowedProductFileFormatLabel} 형식만 업로드할 수 있습니다.`);
  }

  const mimeType = file.type.trim().toLowerCase();
  if (
    mimeType &&
    !allowedProductFileMimeTypes.includes(mimeType as (typeof allowedProductFileMimeTypes)[number])
  ) {
    throw new Error(`실행 팩 파일은 ${allowedProductFileFormatLabel} 형식만 업로드할 수 있습니다.`);
  }
}

export function parsePreviewPoints(input: string) {
  return input
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .slice(0, 6);
}

export function parseKeywords(input: string) {
  return Array.from(
    new Set(
      input
        .split(/[\r\n,]/)
        .map((item) => item.trim())
        .filter(Boolean),
    ),
  ).slice(0, 8);
}
