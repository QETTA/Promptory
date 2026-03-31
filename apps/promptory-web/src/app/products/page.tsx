import { Hero } from "@/components/marketplace/hero";
import { ProductCard } from "@/components/marketplace/product-card";
import { Section } from "@/components/marketplace/section";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { SetupCallout } from "@/components/ui/setup-callout";
import { CTAButton } from "@/components/ui/cta-button";
import { cn } from "@/lib/cn";
import { getPublicEnvStatus } from "@/lib/env/public";
import { getPublishedProducts } from "@/lib/server/products";
import styles from "./products-page.module.css";

const sortOptions = [
  { label: "최신 등록순", value: "latest" },
  { label: "관심 높은 순", value: "interest" },
] as const;

function buildProductsHref(params: { category?: string; q?: string; sort?: string }) {
  const search = new URLSearchParams();

  if (params.category) {
    search.set("category", params.category);
  }

  if (params.q) {
    search.set("q", params.q);
  }

  if (params.sort && params.sort !== "latest") {
    search.set("sort", params.sort);
  }

  const query = search.toString();
  return query ? `/products?${query}` : "/products";
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams?: Promise<{ category?: string | string[]; q?: string | string[]; sort?: string | string[] }>;
}) {
  const publicStatus = getPublicEnvStatus();
  const params = (await searchParams) ?? {};
  const rawCategory = Array.isArray(params.category) ? params.category[0] : params.category;
  const rawQuery = Array.isArray(params.q) ? params.q[0] : params.q;
  const rawSort = Array.isArray(params.sort) ? params.sort[0] : params.sort;
  const selectedSort = rawSort === "interest" ? "interest" : "latest";
  const selectedCategory = rawCategory?.trim() ? rawCategory.trim() : "";
  const selectedQuery = rawQuery?.trim() ? rawQuery.trim() : "";
  const products = publicStatus.hasPublicEnv
    ? await getPublishedProducts({
        category: selectedCategory || undefined,
        q: selectedQuery || undefined,
        sort: selectedSort,
      })
    : [];
  const allProducts = publicStatus.hasPublicEnv ? await getPublishedProducts() : [];
  const categories = Array.from(new Set(allProducts.map((product) => product.category))).slice(0, 8);
  const hasActiveFilters = Boolean(selectedCategory || selectedQuery || selectedSort !== "latest");
  return (
    <div className={styles.page}>
      <Hero
        eyebrow="Promptory Execution Pack Panel"
        mobileCompact
        mobileAsideFirst
        theme="catalog"
        showQuickFacts={false}
        title="진단 뒤 실행 팩만 고릅니다"
        body="이 화면은 진단 결과를 실행으로 넘길 때만 쓰는 보조 패널입니다."
        actions={
          <CTAButton href="/optimize" variant="outline" size="sm" className={styles.heroActionDesktop}>
            진단으로 돌아가기
          </CTAButton>
        }
        aside={
          <Card variant="heroGlass" className={styles.heroAsideCard}>
            <form action="/products" className={styles.searchForm}>
              {selectedCategory ? <input type="hidden" name="category" value={selectedCategory} /> : null}
              <input type="hidden" name="sort" value={selectedSort} />
              <label className={cn("section-kicker", styles.searchLabel)}>검색</label>
              <input
                type="search"
                name="q"
                defaultValue={selectedQuery}
                placeholder="예: 마케팅 자동화, 데이터 정리"
                className={styles.searchInput}
              />
              <button type="submit" className={styles.searchButton}>
                연결할 실행 팩 찾기
              </button>
            </form>
          </Card>
        }
      />

      <div className={styles.content}>
        <section className={styles.summarySection}>
          <Card variant="heroBright" className={styles.summaryCard}>
            <div className={styles.summaryBadges}>
              <span className={cn(styles.summaryBadge, styles.summaryBadgePrimary)}>
                보조 패널
              </span>
              <span className={styles.summaryBadge}>
                공개 팩 {products.length}개
              </span>
              <span className={styles.summaryBadge}>
                {selectedSort === "interest" ? "관심 높은 순" : "최신 등록순"}
              </span>
            </div>
            <h2 className={styles.summaryTitle}>지금 필요한 다음 액션만 봅니다</h2>
            <p className={styles.summaryBody}>
              설치 시간과 결과 형태 기준으로 지금 붙일 수 있는 팩만 빠르게 고르도록 정리했습니다.
            </p>
            <div className={styles.summaryActions}>
              <CTAButton href="/optimize" variant="outline" size="sm">
                먼저 진단 보기
              </CTAButton>
              <CTAButton href="/library" variant="outline" size="sm" className={styles.hiddenOnMobile}>
                보관함 보기
              </CTAButton>
            </div>
          </Card>
        </section>

        <Section
          compact
          eyebrow="보조 패널"
          title={`${products.length}개 실행 팩`}
          description={
            <>
              {selectedCategory ? `${selectedCategory} · ` : "전체 카테고리 · "}
              {selectedQuery ? `"${selectedQuery}" 검색 결과 · ` : ""}
              {selectedSort === "interest" ? "관심 높은 순" : "최신 등록순"}
            </>
          }
          actions={sortOptions.map((option) => (
            <CTAButton
              key={option.value}
              href={buildProductsHref({
                category: selectedCategory || undefined,
                q: selectedQuery || undefined,
                sort: option.value,
              })}
              variant={selectedSort === option.value ? "default" : "outline"}
              size="sm"
            >
              {option.label}
            </CTAButton>
          ))}
        >
          {categories.length > 0 ? (
            <div className={styles.filters}>
              <CTAButton href="/products" variant={!selectedCategory ? "default" : "outline"} size="sm">
                전체
              </CTAButton>
              {categories.map((category) => (
                <CTAButton
                  key={category}
                  href={buildProductsHref({
                    category,
                    q: selectedQuery || undefined,
                    sort: selectedSort,
                  })}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                >
                  {category}
                </CTAButton>
              ))}
            </div>
          ) : null}
        </Section>

        {!publicStatus.hasPublicEnv ? (
          <div className={styles.setupWrap}>
            <SetupCallout
              title="상품 목록을 보려면 공개 Supabase 연결이 필요합니다."
              body="현재 공개 환경 변수가 비어 있어 실제 상품 데이터를 불러올 수 없습니다. 먼저 /setup에서 연결 상태를 확인해 주세요."
            />
          </div>
        ) : null}

        <Section compact eyebrow="공개 실행 팩" title="진단 뒤에 연결할 공개 실행 팩" className="pt-0">
          {products.length === 0 ? (
            <EmptyState
              title={hasActiveFilters ? "조건에 맞는 실행 팩이 아직 없습니다." : "아직 공개된 실행 팩이 없습니다."}
              body={
                hasActiveFilters
                  ? "다른 카테고리나 검색어로 바꾸면 지금 진단 결과에 더 가까운 실행 팩을 찾을 수 있습니다."
                  : "먼저 URL 진단을 시작한 뒤, 필요한 실행 팩이 있는지 다시 보는 흐름이 더 자연스럽습니다."
              }
              ctaHref={hasActiveFilters ? "/products" : "/optimize"}
              ctaLabel={hasActiveFilters ? "전체 실행 팩 보기" : "먼저 진단 시작"}
            />
          ) : (
            <div className={styles.grid}>
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </Section>
      </div>
    </div>
  );
}
