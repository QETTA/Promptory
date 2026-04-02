import Link from "next/link";
import { notFound } from "next/navigation";

import { Hero } from "@/components/marketplace/hero";
import { ProductCard } from "@/components/marketplace/product-card";
import { Section } from "@/components/marketplace/section";
import { PurchaseButton } from "@/components/marketplace/purchase-button";
import { Badge } from "@/components/ui/badge";
import { CTAButton } from "@/components/ui/cta-button";
import { SetupCallout } from "@/components/ui/setup-callout";
import { formatKrw } from "@/lib/currency";
import { getPublicEnvStatus } from "@/lib/env/public";
import { formatDate } from "@/lib/format";
import {
  getAudienceCopy,
  getGoodFitCopy,
  getIncludedItems,
  getNotYetFitCopy,
  getOutcomeHeadline,
  getPreviewBlock,
  getResultExample,
  getUsageSteps,
  getWhatThisIs,
} from "@/lib/promptory-product-copy";
import { getDifficultyLabel, getProductTypeLabel, getSellerDisplayName } from "@/lib/promptory-display";
import { getPublishedProductBySlug, getRelatedPublishedProducts } from "@/lib/server/products";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const publicStatus = getPublicEnvStatus();

  if (!publicStatus.hasPublicEnv) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <SetupCallout
          title="실행 팩 상세를 보려면 공개 Supabase 연결이 필요합니다."
          body="아직 공개 환경 변수가 비어 있어 실제 상품 데이터를 불러오지 못하고 있습니다. /setup에서 공개 환경 설정을 먼저 확인해 주세요."
        />
      </div>
    );
  }

  const product = await getPublishedProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const sellerName = getSellerDisplayName(product.seller?.display_name);
  const typeLabel = getProductTypeLabel(product.product_type);
  const outcomeHeadline = getOutcomeHeadline(product.product_type);
  const audience = getAudienceCopy(product.category);
  const goodFit = getGoodFitCopy(product.category);
  const notYetFit = getNotYetFitCopy();
  const usageSteps = getUsageSteps(product.setup_minutes);
  const resultExample = getResultExample(product.category);
  const previewBlock = getPreviewBlock(product.preview_points);
  const includedItems = getIncludedItems(product.setup_minutes, product.product_type);
  const whatThisIs = getWhatThisIs(product.category, product.product_type);
  const difficultyLabel = getDifficultyLabel(product.setup_minutes);
  const relatedProducts = await getRelatedPublishedProducts(product.id, product.category, 3);

  return (
    <div className="pb-16">
      <Hero
        eyebrow="실행 팩 상세"
        theme="detail"
        title={product.title}
        tone="light"
        body={
          <>
            <p>{outcomeHeadline}</p>
            <p>이 상세는 URL 진단 뒤에 어떤 결과 전달 실행 팩을 붙일지 판단하는 보조 표면입니다.</p>
          </>
        }
        actions={
          <div className="flex flex-wrap gap-2">
            <Badge>{product.category}</Badge>
            <Badge variant="neutral">{typeLabel}</Badge>
            <Badge variant="neutral">설치 {product.setup_minutes}분</Badge>
          </div>
        }
        aside={
          <div className="rounded-xl border border-[var(--line-strong)] bg-[var(--surface-1)] p-5">
            <p className="section-kicker text-[var(--slate-500)]">보조 레일</p>
            <p className="mt-3 text-[2rem] font-semibold tracking-tight text-[var(--slate-950)]">{formatKrw(product.price_krw)}</p>
            <div className="mt-4 grid gap-2 text-sm leading-6 text-[var(--slate-600)]">
              <p>판매자 {sellerName}</p>
              <p>난이도 {difficultyLabel}</p>
              <p>업데이트 {formatDate(product.updated_at)}</p>
            </div>
            <Link href="#buy-box" className="mt-5 inline-flex h-10 w-full items-center justify-center rounded-xl bg-[var(--brand-600)] px-4 text-sm font-semibold text-white">
              적용 흐름 보기
            </Link>
          </div>
        }
      />

      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:px-8">
        <div className="space-y-2 lg:space-y-0">
          <Section eyebrow="기대 결과" title="이걸로 할 수 있는 것" className="border-b border-[var(--line)]">
            <div className="grid gap-3">
              {product.preview_points.map((point) => (
                <div key={point} className="rounded-xl border border-[var(--line)] bg-[var(--surface-1)] px-4 py-3 text-sm leading-7 text-[var(--slate-700)]">
                  {point}
                </div>
              ))}
            </div>
          </Section>

          <Section eyebrow="구성 항목" title="구매하면 받는 것" className="border-b border-[var(--line)]">
            <div className="grid gap-3 md:grid-cols-2">
              {includedItems.map((item) => (
                <div key={item} className="rounded-xl border border-[var(--line)] bg-[var(--surface-1)] px-4 py-3 text-sm leading-7 text-[var(--slate-700)]">
                  {item}
                </div>
              ))}
            </div>
            <div className="mt-5 grid gap-2 text-sm leading-7 text-[var(--slate-700)]">
              {whatThisIs.map((item) => (
                <p key={item}>{item}</p>
              ))}
            </div>
          </Section>

          <Section eyebrow="설치 순서" title="설치 방법" className="border-b border-[var(--line)]">
            <div className="grid gap-3">
              {usageSteps.map((step, index) => (
                <div key={step} className="grid gap-3 rounded-xl border border-[var(--line)] bg-[var(--surface-1)] p-4 sm:grid-cols-[32px_1fr]">
                  <p className="text-lg font-semibold text-[var(--brand-700)]">{index + 1}</p>
                  <p className="text-sm leading-7 text-[var(--slate-700)]">{step}</p>
                </div>
              ))}
            </div>
          </Section>

          <Section eyebrow="적합한 경우" title="누구에게 적합한지" className="border-b border-[var(--line)]">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-[var(--line)] bg-[var(--surface-1)] p-4">
                <p className="section-kicker text-[var(--slate-500)]">잘 맞는 경우</p>
                <div className="mt-3 grid gap-2 text-sm leading-7 text-[var(--slate-700)]">
                  {goodFit.map((item) => (
                    <p key={item}>{item}</p>
                  ))}
                  <p>{audience[0]}</p>
                </div>
              </div>
              <div className="rounded-xl border border-[var(--line)] bg-[var(--surface-1)] p-4">
                <p className="section-kicker text-[var(--slate-500)]">아직 맞지 않는 경우</p>
                <div className="mt-3 grid gap-2 text-sm leading-7 text-[var(--slate-700)]">
                  {notYetFit.map((item) => (
                    <p key={item}>{item}</p>
                  ))}
                </div>
              </div>
            </div>
          </Section>

          <Section eyebrow="미리보기" title="미리보기와 예시">
            <div className="grid gap-3 md:grid-cols-2">
              {resultExample.map((line) => (
                <div key={line} className="rounded-xl border border-[var(--line)] bg-[var(--surface-2)] px-4 py-3 text-sm leading-7 text-[var(--slate-700)]">
                  {line}
                </div>
              ))}
            </div>
            <div className="mt-5 grid gap-2 text-sm leading-7 text-[var(--slate-700)]">
              {previewBlock.map((item) => (
                <p key={item}>{item}</p>
              ))}
              <p>{product.description}</p>
            </div>
          </Section>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div id="buy-box" className="rounded-2xl border border-[var(--line-strong)] bg-[var(--surface-1)] p-5">
            <p className="section-kicker text-[var(--slate-500)]">결과 전달 레일</p>
            <h2 className="mt-3 text-[1.4rem] font-semibold text-[var(--slate-950)]">{product.title}</h2>
            <p className="mt-2 text-sm leading-6 text-[var(--slate-600)]">{outcomeHeadline}</p>
            <p className="mt-4 text-[2rem] font-semibold tracking-tight text-[var(--slate-950)]">{formatKrw(product.price_krw)}</p>

            <div className="mt-4 grid gap-2 border-t border-[var(--line)] pt-4 text-sm leading-6 text-[var(--slate-700)]">
              <p>설치 {product.setup_minutes}분</p>
              <p>판매자 {sellerName}</p>
              <p>최근 업데이트 {formatDate(product.updated_at)}</p>
            </div>

            <div className="mt-5">
              <PurchaseButton productId={product.id} label="이 실행 팩 연결하기" disabled={!publicStatus.hasPublicEnv} redirectTo={`/products/${slug}`} />
            </div>

            <div className="mt-5 grid gap-2 border-t border-[var(--line)] pt-4 text-sm leading-6 text-[var(--slate-600)]">
              <p>진단 결과에 맞는 실행 팩이면 checkout, 주문 내역, 보관함으로 이어집니다.</p>
              <p>먼저 URL 진단을 다시 보고 싶다면 /optimize에서 방향을 다시 고정한 뒤 돌아와도 됩니다.</p>
            </div>
          </div>
        </aside>
      </div>

      {relatedProducts.length > 0 ? (
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Section
            eyebrow="관련 실행 팩"
            title="같은 카테고리의 다른 결과 전달 실행 팩"
            actions={
              <CTAButton href={`/products?category=${encodeURIComponent(product.category)}`} variant="outline" size="sm">
                {product.category} 실행 팩 더 보기
              </CTAButton>
            }
          >
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </Section>
        </div>
      ) : null}
    </div>
  );
}
