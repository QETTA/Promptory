import { Hero } from "@/components/marketplace/hero";
import { Section } from "@/components/marketplace/section";
import { EmptyState } from "@/components/ui/empty-state";
import { SetupCallout } from "@/components/ui/setup-callout";
import { CTAButton } from "@/components/ui/cta-button";
import { DashboardCard } from "@/components/ui/dashboard-card";
import { formatKrw } from "@/lib/currency";
import { hasSellerWriteRuntime } from "@/lib/env/runtime";
import { formatDate } from "@/lib/format";
import {
  canPublishProduct,
  getSellerReadinessLabel,
  getSellerReadinessSummary,
  sellerReadinessRuleText,
} from "@/lib/product-editor";
import { requireUser } from "@/lib/server/auth";
import { getSellerProductSummaries } from "@/lib/server/products";

function getStatusLabel(status: string) {
  return status === "published" ? "공개" : "초안";
}

function sortProducts<T extends { updated_at: string; price_krw: number; pendingOrderCount: number }>(
  products: T[],
  sort: string,
) {
  const list = [...products];

  switch (sort) {
    case "price-high":
      return list.sort((a, b) => b.price_krw - a.price_krw);
    case "price-low":
      return list.sort((a, b) => a.price_krw - b.price_krw);
    case "interest":
      return list.sort((a, b) => {
        if (b.pendingOrderCount !== a.pendingOrderCount) {
          return b.pendingOrderCount - a.pendingOrderCount;
        }

        return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
      });
    default:
      return list.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
  }
}

const sortOptions = [
  { value: "latest", label: "최근 수정순" },
  { value: "interest", label: "관심 높은 순" },
  { value: "price-high", label: "가격 높은 순" },
  { value: "price-low", label: "가격 낮은 순" },
];

export default async function SellerProductsPage({
  searchParams,
}: {
  searchParams?: Promise<{ sort?: string | string[] }>;
}) {
  if (!hasSellerWriteRuntime()) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <SetupCallout
          title="판매자 센터를 열려면 Promptory 연결이 필요합니다."
          body="실행 팩 등록과 파일 업로드에는 공개 Supabase 설정과 SUPABASE_SERVICE_ROLE_KEY가 필요합니다. /setup에서 연결 상태를 먼저 확인해 주세요."
        />
      </div>
    );
  }

  const params = (await searchParams) ?? {};
  const currentSort = Array.isArray(params.sort) ? params.sort[0] : params.sort;
  const safeSort =
    currentSort && sortOptions.some((option) => option.value === currentSort) ? currentSort : "latest";
  const currentPath = safeSort === "latest" ? "/seller/products" : `/seller/products?sort=${safeSort}`;

  const user = await requireUser(currentPath);
  const products = sortProducts(await getSellerProductSummaries(user.id), safeSort);
  const totalCount = products.length;
  const publishedCount = products.filter((product) => product.status === "published").length;
  const draftCount = products.filter((product) => product.status === "draft").length;
  const readyCount = products.filter((product) => canPublishProduct({ hasProductFile: Boolean(product.file_path) })).length;

  return (
    <div className="pb-16">
      <Hero
        eyebrow="제작실"
        theme="workspace"
        title="판매자는 운영 대시보드처럼 써야 합니다"
        body="현재 상태, 공개 가능 여부, 관심 반응, 수정 액션이 바로 보여야 하는 구조로 정리했습니다."
        actions={
          <>
            <CTAButton href="/seller/products/new" size="lg">
              새 실행 팩 등록
            </CTAButton>
            <CTAButton href="/products" variant="outline" size="lg">
              공개 팩 보기
            </CTAButton>
          </>
        }
        aside={
          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            <DashboardCard caption="전체 팩" value={totalCount} />
            <DashboardCard caption="공개 팩" value={publishedCount} />
            <DashboardCard caption="공개 가능" value={readyCount} detail={`초안 ${draftCount}개`} />
          </div>
        }
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Section
          eyebrow="관리 항목"
          title="실행 팩 상태와 수정 우선순위를 바로 확인"
          description={sellerReadinessRuleText}
          actions={sortOptions.map((option) => (
            <CTAButton
              key={option.value}
              href={option.value === "latest" ? "/seller/products" : `/seller/products?sort=${option.value}`}
              variant={safeSort === option.value ? "default" : "outline"}
              size="sm"
            >
              {option.label}
            </CTAButton>
          ))}
        >
          {products.length === 0 ? (
            <EmptyState
              title="아직 등록한 실행 팩이 없습니다."
              body="첫 실행 팩은 초안으로 먼저 저장해도 됩니다. 설명과 미리보기부터 적고, 파일이 준비되면 공개해 보세요."
              ctaHref="/seller/products/new"
              ctaLabel="첫 실행 팩 등록"
            />
          ) : (
            <div className="grid gap-4">
              {products.map((product) => {
                const hasFile = Boolean(product.file_path);
                const hasThumbnail = Boolean(product.thumbnail_url);
                const readinessLabel = getSellerReadinessLabel({ hasProductFile: hasFile, hasThumbnail });
                const readinessSummary = getSellerReadinessSummary({ hasProductFile: hasFile, hasThumbnail });

                return (
                  <div key={product.id} className="rounded-2xl border border-[var(--line-strong)] bg-[var(--surface-1)] p-5">
                    <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_220px]">
                      <div className="space-y-3">
                        <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--slate-500)]">
                          <span>{getStatusLabel(product.status)}</span>
                          <span>{product.category}</span>
                          <span>{readinessLabel}</span>
                          <span>관심 {product.pendingOrderCount}</span>
                        </div>
                        <div>
                          <h2 className="text-[1.2rem] font-semibold text-[var(--slate-950)]">{product.title}</h2>
                          <p className="mt-2 text-sm leading-6 text-[var(--slate-600)]">
                            {formatKrw(product.price_krw)} · 설치 {product.setup_minutes}분 · 업데이트 {formatDate(product.updated_at)}
                          </p>
                        </div>
                        <p className="text-sm leading-7 text-[var(--slate-700)]">{readinessSummary}</p>
                      </div>

                      <div className="flex flex-col gap-3 lg:items-end">
                        <CTAButton href={`/seller/products/${product.id}/edit`} size="sm">
                          수정하기
                        </CTAButton>
                        {product.status === "published" ? (
                          <CTAButton href={`/products/${product.slug}`} variant="outline" size="sm">
                            공개 페이지 보기
                          </CTAButton>
                        ) : null}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </Section>
      </div>
    </div>
  );
}
