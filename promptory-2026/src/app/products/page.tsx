import { Hero } from "@/components/marketplace/hero";
import { SignalStrip } from "@/components/marketplace/signal-strip";
import { ProductCard } from "@/components/marketplace/product-card";
import { Section } from "@/components/marketplace/section";
import { StoryGrid } from "@/components/marketplace/story-grid";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { SetupCallout } from "@/components/ui/setup-callout";
import { CTAButton } from "@/components/ui/cta-button";
import { getPublicEnvStatus } from "@/lib/env/public";
import { getPublishedProducts } from "@/lib/server/products";

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
  const surfaceSignals = [
    {
      label: "현재 공개 팩",
      value: `${products.length}개`,
      body: hasActiveFilters ? "필터 기준으로 지금 바로 연결할 수 있는 실행 팩만 보여 주고 있습니다." : "진단 뒤 바로 연결할 수 있는 실행 팩만 보여 주고 있습니다.",
      tone: "accent" as const,
    },
    {
      label: "카테고리",
      value: `${categories.length || 0}개 축`,
      body: "자동화, 마케팅, 콘텐츠, 세일즈, 운영 같은 결과 전달 레일 중심으로 묶습니다.",
    },
    {
      label: "정렬 기준",
      value: selectedSort === "interest" ? "관심 높은 순" : "최신 등록순",
      body: "탐색보다 추천 연결이 먼저이므로, 상세한 필터보다 실행 가능성을 짧게 보여 주는 편이 맞습니다.",
    },
  ];
  const storyItems = [
    {
      eyebrow: "Execution Pack",
      title: "여기는 엔진 본체가 아니라 실행 팩 레일입니다",
      body: "추천 결과 뒤에 바로 연결할 수 있는 팩, 보드, 설치 레일을 정리합니다.",
      points: ["n8n workflow 팩", "Notion 운영 보드", "콘텐츠 재활용 팩", "판매형 전환 팩"],
      tone: "accent" as const,
    },
    {
      eyebrow: "Why It Exists",
      title: "진단 결과를 실제 행동으로 넘겨야 합니다",
      body: "좋은 리포트보다 더 중요한 건 바로 적용 가능한 다음 단계입니다. 그래서 이 목록은 진단 뒤에 붙는 구조여야 합니다.",
      points: ["설치 난이도", "예상 setup 시간", "업데이트 시점", "구매 후 보관함 연결"],
    },
  ];

  return (
    <div className="pb-16">
      <Hero
        eyebrow="Promptory Execution Pack Rail"
        theme="catalog"
        title="진단 뒤에 붙이는 실행 팩을 고르세요"
        body="Promptory의 본체는 URL 진단 엔진이고, 이 목록은 그 결과를 바로 적용하거나 전달할 때 쓰는 보조 실행 레일입니다."
        aside={
          <Card variant="heroGlass" className="p-4">
            <form action="/products">
            {selectedCategory ? <input type="hidden" name="category" value={selectedCategory} /> : null}
            <input type="hidden" name="sort" value={selectedSort} />
            <label className="section-kicker text-white/60">검색</label>
            <input
              type="search"
              name="q"
              defaultValue={selectedQuery}
              placeholder="예: 마케팅 자동화, 데이터 정리"
              className="mt-3 h-12 w-full rounded-full border border-white/12 bg-white px-4 text-sm text-[var(--slate-950)] outline-none"
            />
            <button
              type="submit"
              className="mt-3 inline-flex h-11 w-full items-center justify-center rounded-full bg-white px-4 text-sm font-semibold text-[var(--slate-950)]"
            >
              연결할 실행 팩 찾기
            </button>
            </form>
          </Card>
        }
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Section
          eyebrow="현재 표면"
          title="이 화면은 카탈로그보다 연결 우선 레일이어야 합니다"
          description="레퍼런스 ZIP 기준으로도 이 목록은 먼저 무엇을 연결할지, 얼마나 빨리 적용할지, 어떤 결과를 기대할지부터 보여 주는 편이 맞습니다."
        >
          <SignalStrip items={surfaceSignals} />
        </Section>

        <Section
          eyebrow="설명"
          title="실행 팩은 진단 결과를 현실적인 다음 단계로 바꿔 줍니다"
          description="상품 진열장처럼 읽히지 않게, 이 레일이 왜 존재하는지와 어떤 기준으로 골라야 하는지를 먼저 보여 줍니다."
          className="pt-0"
        >
          <StoryGrid items={storyItems} columns="2" />
        </Section>

        <Section
          eyebrow="보조 레일"
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
            <div className="flex flex-wrap gap-2">
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
          <div className="mb-6 max-w-2xl">
            <SetupCallout
              title="상품 목록을 보려면 공개 Supabase 연결이 필요합니다."
              body="현재 공개 환경 변수가 비어 있어 실제 상품 데이터를 불러올 수 없습니다. 먼저 /setup에서 연결 상태를 확인해 주세요."
            />
          </div>
        ) : null}

        <Section eyebrow="공개 실행 팩" title="진단 뒤에 연결할 공개 실행 팩" className="pt-0">
          {products.length === 0 ? (
            <EmptyState
              title={hasActiveFilters ? "조건에 맞는 실행 팩이 아직 없습니다." : "아직 공개된 실행 팩이 없습니다."}
              body={
                hasActiveFilters
                  ? "다른 카테고리나 검색어로 바꾸면 지금 진단 결과에 더 가까운 실행 팩을 찾을 수 있습니다."
                  : "먼저 URL 진단을 시작한 뒤, 필요한 결과 전달 팩이 있는지 다시 보는 흐름이 더 자연스럽습니다."
              }
              ctaHref={hasActiveFilters ? "/products" : "/optimize"}
              ctaLabel={hasActiveFilters ? "전체 실행 팩 보기" : "먼저 진단 시작"}
            />
          ) : (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
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
