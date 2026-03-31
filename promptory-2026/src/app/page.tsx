import { ChannelIntakeCard } from "@/components/channel-intake/channel-intake-card";
import { Hero } from "@/components/marketplace/hero";
import { ProductCard } from "@/components/marketplace/product-card";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { SetupCallout } from "@/components/ui/setup-callout";
import { CTAButton } from "@/components/ui/cta-button";
import { supportedChannelHeadline } from "@/lib/channel-intake";
import { getPublicEnvStatus } from "@/lib/env/public";
import { getServerEnvStatus } from "@/lib/env/server";
import { getCategoryLabel } from "@/lib/promptory-display";
import { getPublishedProducts } from "@/lib/server/products";

const defaultCategories = ["자동화", "마케팅", "데이터", "운영", "콘텐츠", "세일즈"];
const demoishPattern = /smoke|draft|test|demo/i;

export default async function HomePage() {
  const publicStatus = getPublicEnvStatus();
  const serverStatus = getServerEnvStatus();
  const isReady = publicStatus.hasPublicEnv && serverStatus.hasSupabaseServiceRole;
  const products = publicStatus.hasPublicEnv ? await getPublishedProducts() : [];
  const curatedProducts = products.filter(
    (product) =>
      !demoishPattern.test(product.title) &&
      !demoishPattern.test(product.description) &&
      !(product.seller?.display_name && demoishPattern.test(product.seller.display_name)),
  );
  const featured = curatedProducts.slice(0, 3);
  const categories = Array.from(new Set(curatedProducts.map((product) => product.category))).slice(0, 6);
  const keywords = Array.from(new Set(curatedProducts.flatMap((product) => product.keywords ?? []))).slice(0, 10);
  const workboardSteps = [
    {
      label: "1. Public Audit",
      title: "채널 URL 입력",
      body: `${supportedChannelHeadline} URL 중 하나를 넣고 공개 표면 신호부터 읽습니다.`,
      tone: "accent" as const,
    },
    {
      label: "2. Ask Plan",
      title: "Ask 질문으로 병목 고정",
      body: "문서처럼 길게 설명하지 않고, 막히는 지점과 목표를 질문 흐름으로 빠르게 고정합니다.",
    },
    {
      label: "3. Apply",
      title: "스택과 실행 팩 연결",
      body: "추천 스택, 복붙 초안, 실행 팩, 저장 레일까지 바로 이어집니다.",
    },
  ];
  const aiSignals = [
    "4개 채널 공개 진단",
    "질문형 플래닝",
    "결정형 스택 추천",
    "저장 / 주문 / 다운로드",
  ];

  return (
    <div className="pb-16">
      {!isReady ? (
        <div className="mx-auto mb-6 max-w-6xl px-4 pt-6 sm:px-6 lg:px-8">
          <SetupCallout
            title="Promptory는 채널 URL 기반 최적화 엔진의 배포 레일 MVP를 함께 점검하는 단계입니다."
            body="현재는 URL 입력 진입면과 함께, 회원가입, 실행 팩 등록, 주문 생성, 개발용 결제 완료, 라이브러리 다운로드 흐름까지 실제로 확인할 수 있습니다."
          />
        </div>
      ) : null}

      <Hero
        eyebrow="Promptory Channel Stack Doctor"
        theme="workspace"
        tone="light"
        title={
          <>
            URL 하나로 바로 읽히는
            <br />
            채널 운영 진단 작업대
          </>
        }
        body={
          <>
            <p>URL을 넣으면 공개 표면을 읽고, Ask 질문으로 병목을 고정한 뒤 자동화 스택과 실행 팩으로 이어집니다.</p>
          </>
        }
        actions={
          <>
            <CTAButton href="/optimize" telemetryEventName="execution_pack_clicked" telemetryPayload={{ href: "/optimize", source: "home_hero" }} size="lg">
              URL 넣고 진단 시작
            </CTAButton>
            <CTAButton
              href="/products"
              telemetryEventName="execution_pack_clicked"
              telemetryPayload={{ href: "/products", source: "home_hero" }}
              variant="outline"
              size="lg"
              className="hidden sm:inline-flex"
            >
              실행 팩 보기
            </CTAButton>
          </>
        }
        aside={<ChannelIntakeCard />}
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <section className="py-6 sm:py-8">
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1.25fr)_minmax(300px,0.75fr)]">
            <Card variant="strong" className="p-5 sm:p-6">
              <div className="flex flex-wrap items-center gap-2">
                <Badge>AI Service Flow</Badge>
                <Badge variant="neutral">2026 UX</Badge>
              </div>
              <h2 className="section-title mt-3 text-[var(--slate-950)]">마켓을 먼저 보여주지 않고, 작업 순서를 먼저 보여줍니다</h2>
              <p className="mt-3 text-sm leading-7 text-[var(--slate-700)]">
                프롬프토리는 실행 팩 탐색 화면이 아니라 채널을 진단하고 계획을 세우는 작업면처럼 읽혀야 합니다. 첫 화면은
                입력, 계획, 적용 순서가 바로 보여야 합니다.
              </p>
              <div className="mt-5 grid gap-3 md:grid-cols-3">
                {workboardSteps.map((step, index) => (
                  <div
                    key={step.label}
                    className={`rounded-[1.2rem] border px-4 py-4 ${
                      index === 0
                        ? "border-[rgba(34,80,221,0.18)] bg-[linear-gradient(180deg,#ffffff_0%,#eef4ff_100%)] shadow-[0_14px_30px_-24px_rgba(34,80,221,0.28)]"
                        : "border-[var(--line)] bg-white"
                    }`}
                  >
                    <p className="section-kicker text-[var(--brand-700)]">{step.label}</p>
                    <p className="mt-2 text-sm font-semibold text-[var(--slate-950)]">{step.title}</p>
                    <p className="mt-2 text-sm leading-6 text-[var(--slate-600)]">{step.body}</p>
                  </div>
                ))}
              </div>
            </Card>

            <Card variant="tint" className="p-5 sm:p-6">
              <p className="section-kicker text-[var(--brand-700)]">Current Product Output</p>
              <h3 className="mt-2 text-[1.05rem] font-semibold text-[var(--slate-950)]">지금 앱이 바로 보여주는 결과</h3>
              <div className="mt-4 grid gap-2">
                {aiSignals.map((signal, index) => (
                  <div
                    key={signal}
                    className="flex items-center justify-between gap-3 rounded-[1rem] border border-[var(--line)] bg-white px-4 py-3 text-sm text-[var(--slate-700)]"
                  >
                    <span className="text-xs font-semibold text-[var(--slate-500)]">0{index + 1}</span>
                    <p className="flex-1 text-right">{signal}</p>
                  </div>
                ))}
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                <CTAButton href="/optimize" telemetryEventName="execution_pack_clicked" telemetryPayload={{ href: "/optimize", source: "home_output" }} size="sm">
                  진단 작업면 열기
                </CTAButton>
                <CTAButton
                  href="/products"
                  telemetryEventName="execution_pack_clicked"
                  telemetryPayload={{ href: "/products", source: "home_output" }}
                  variant="outline"
                  size="sm"
                >
                  실행 팩 보기
                </CTAButton>
              </div>
            </Card>
          </div>
        </section>

        <section className="py-6 sm:py-8">
          <div className="mb-4 flex flex-col gap-3 sm:mb-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="section-kicker text-[var(--slate-500)]">Execution Rail</p>
              <h2 className="section-title mt-2 text-[var(--slate-950)]">진단 결과의 다음 액션을 바로 실행 팩으로 넘깁니다</h2>
              <p className="mt-2 text-sm leading-7 text-[var(--slate-600)]">실행 팩은 홈의 주인공이 아니라, 진단 뒤에 이어지는 적용 레일입니다.</p>
            </div>
            <CTAButton
              href="/products"
              telemetryEventName="execution_pack_clicked"
              telemetryPayload={{ href: "/products", source: "home_execution_rail" }}
              variant="outline"
              size="sm"
            >
              전체 실행 팩 보기
            </CTAButton>
          </div>

          <div className="mb-4 space-y-3">
            <div className="flex flex-wrap gap-2">
              {(categories.length > 0 ? categories : defaultCategories).map((category) => (
                <CTAButton
                  key={category}
                  href={`/products?category=${encodeURIComponent(category)}`}
                  telemetryEventName="execution_pack_clicked"
                  telemetryPayload={{ category, href: `/products?category=${encodeURIComponent(category)}`, source: "home_category" }}
                  variant="outline"
                  size="sm"
                >
                  {getCategoryLabel(category)}
                </CTAButton>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {(keywords.length > 0 ? keywords : ["AI", "자동화", "블로그", "마케팅", "운영", "콘텐츠"]).map((keyword) => (
                <CTAButton
                  key={keyword}
                  href={`/products?q=${encodeURIComponent(keyword)}`}
                  telemetryEventName="execution_pack_clicked"
                  telemetryPayload={{ href: `/products?q=${encodeURIComponent(keyword)}`, keyword, source: "home_keyword" }}
                  variant="outline"
                  size="sm"
                >
                  {keyword}
                </CTAButton>
              ))}
            </div>
          </div>

          {featured.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {featured.map((product) => (
                <ProductCard key={product.id} product={product} variant="compact" />
              ))}
            </div>
          ) : (
            <Card variant="tint" className="p-5 text-sm leading-7 text-[var(--slate-600)]">
              아직 공개된 실행 팩이 없습니다. 첫 실행 팩을 등록하면 여기에 바로 노출됩니다.
            </Card>
          )}
        </section>

        <section className="py-6 sm:py-8">
          <Card variant="tint" className="p-5 sm:p-6">
            <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_220px] lg:items-end">
              <div>
                <p className="section-kicker text-[var(--brand-700)]">Trust Rule</p>
                <h3 className="mt-2 text-[1.05rem] font-semibold text-[var(--slate-950)]">공개 진단과 연결형 설치는 분리해서 말합니다</h3>
                <p className="mt-3 text-sm leading-7 text-[var(--slate-700)]">
                  URL-only 단계에서는 공개 표면만 진단하고, 심화 설치와 운영 연결은 다음 레일에서 다룹니다.
                </p>
              </div>
              <CTAButton href="/optimize" telemetryEventName="execution_pack_clicked" telemetryPayload={{ href: "/optimize", source: "home_trust_rule" }} size="lg">
                공개 진단 시작
              </CTAButton>
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
}
