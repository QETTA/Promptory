import { ChatPreviewCard } from "@/components/marketplace/chat-preview-card";
import { Hero } from "@/components/marketplace/hero";
import { HomeAudienceTabs } from "@/components/marketplace/home-audience-tabs";
import { Card } from "@/components/ui/card";
import { SetupCallout } from "@/components/ui/setup-callout";
import { CTAButton } from "@/components/ui/cta-button";
import { cn } from "@/lib/cn";
import { getPublicEnvStatus } from "@/lib/env/public";
import { homeFirstReplyPreview, promptoryWowSignals } from "@/lib/promptory-chat-preview-copy";
import { getServerEnvStatus } from "@/lib/env/server";
import {
  promptoryAudienceTabs,
  promptoryFaqItems,
  promptoryHowItWorks,
  promptoryResultBento,
  promptoryTrustBoundary,
  promptoryUseCases,
} from "@/lib/promptory-landing-copy";
import { promptoryWebSurfaceSetupCopy } from "@/lib/promptory-web-surface-copy";
import styles from "./home.module.css";

export default async function HomePage() {
  const publicStatus = getPublicEnvStatus();
  const serverStatus = getServerEnvStatus();
  const isReady = publicStatus.hasPublicEnv && serverStatus.hasSupabaseServiceRole;

  return (
    <div className={styles.page}>
      {!isReady ? (
        <div className={styles.setupWrap}>
          <SetupCallout
            title={promptoryWebSurfaceSetupCopy.title}
            body={promptoryWebSurfaceSetupCopy.body}
          />
        </div>
      ) : null}

      <Hero
        eyebrow="Channel Stack Doctor"
        mobileBodyHidden
        mobileCompact
        mobileAsideFirst
        mobileContentHidden
        mobileTitleSmall
        theme="workspace"
        tone="light"
        showQuickFacts={false}
        title="URL 하나를 보내면, 채널 병목부터 실행 초안까지 채팅 안에서 끝납니다"
        body={
          <>
            <p>프롬프토리는 회사 사이트, 유튜브, 스토어 URL을 읽고 몇 가지 질문만으로 목표를 고정한 뒤 경쟁사 비교, 전환 문구 초안, 보고용 요약까지 바로 이어줍니다.</p>
          </>
        }
        actions={
          <div className={styles.heroActions}>
            <CTAButton
              href="/optimize"
              telemetryEventName="execution_pack_clicked"
              telemetryPayload={{ href: "/optimize", source: "home_hero_demo" }}
              size="lg"
            >
              데모 요청하기
            </CTAButton>
            <CTAButton
              href="#sample-chat"
              telemetryEventName="execution_pack_clicked"
              telemetryPayload={{ href: "#sample-chat", source: "home_hero_sample" }}
              variant="outline"
              size="lg"
            >
              샘플 대화 보기
            </CTAButton>
          </div>
        }
        aside={
          <ChatPreviewCard
            {...homeFirstReplyPreview}
            className={styles.heroPreview}
            mobileHideStatus
            mobileMessageLimit={3}
          />
        }
      />

      <div className={styles.content}>
        <section id="sample-chat" className={styles.section}>
          <div className={styles.sectionHeader}>
            <p className={cn("section-kicker", styles.sectionEyebrow)}>채팅형 진입면</p>
            <h2 className={cn("section-title", styles.sectionTitle)}>제품 소개보다 먼저, 채팅 안에서 일이 되는 장면을 보여줍니다</h2>
            <p className={styles.sectionBody}>
              첫 답장에서 무엇을 읽었는지 알아듣고, 몇 개의 질문으로 병목을 좁히고, 바로 실행 버튼으로 이어져야 합니다.
            </p>
          </div>
          <div className={styles.startGrid}>
            <div className={styles.inputColumn}>
              <Card variant="heroBright" className={styles.summaryCard}>
                <p className={cn("section-kicker", styles.summaryEyebrow)}>첫 5메시지</p>
                <h3 className={styles.summaryTitle}>프롬프토리의 와우는 결과 페이지가 아니라 대화 흐름에서 터져야 합니다</h3>
                <p className={styles.summaryBody}>
                  채널을 읽는다, 맥락을 좁힌다, 바로 제안한다, 실제로 움직인다, 다시 와도 이어진다. 이 5개가 홈에서 먼저 보여야 합니다.
                </p>
                <div className={styles.summaryList}>
                  {promptoryWowSignals.map((signal) => (
                    <div key={signal} className={styles.summaryItem}>
                      {signal}
                    </div>
                  ))}
                </div>
              </Card>

              <Card variant="tint" className={styles.summaryCard}>
                <p className={cn("section-kicker", styles.summaryEyebrow)}>바로 시작</p>
                <h3 className={styles.summaryTitle}>데모보다 빠르게, 지금 URL로 작업면을 열 수 있습니다</h3>
                <p className={styles.summaryBody}>
                  제품 소개를 다 읽지 않아도 됩니다. 실제로 진단을 시작하는 작업면으로 바로 들어가 첫 답장 흐름을 확인하면 됩니다.
                </p>
                <div className={styles.heroActions}>
                  <CTAButton href="/optimize" telemetryEventName="execution_pack_clicked" telemetryPayload={{ href: "/optimize", source: "home_jump_optimize" }}>
                    작업면 열기
                  </CTAButton>
                  <CTAButton href="/products" variant="outline" telemetryEventName="execution_pack_clicked" telemetryPayload={{ href: "/products", source: "home_jump_products" }}>
                    실행 팩 패널 보기
                  </CTAButton>
                </div>
              </Card>
            </div>

            <ChatPreviewCard {...homeFirstReplyPreview} mobileHideStatus mobileMessageLimit={3} />
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <p className={cn("section-kicker", styles.sectionEyebrow)}>타깃 분기</p>
            <h2 className={cn("section-title", styles.sectionTitle)}>중소기업과 외국계 한국팀을 같은 채팅 구조 안에서 나눕니다</h2>
            <p className={styles.sectionBody}>
              랜딩은 한 장이지만, 누구를 위한 데모인지와 어떤 실행물을 기대하는지는 탭에서 바로 갈라져야 합니다.
            </p>
          </div>
          <HomeAudienceTabs items={promptoryAudienceTabs} />
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <p className={cn("section-kicker", styles.sectionEyebrow)}>How It Works</p>
            <h2 className={cn("section-title", styles.sectionTitle)}>설명보다 먼저, 채팅 안에서 바로 일합니다</h2>
            <p className={styles.sectionBody}>
              URL 입력, 질문 3개, 실행 선택. 이 세 단계만으로 처음 경험이 이해되도록 잡았습니다.
            </p>
          </div>
          <div className={styles.howGrid}>
            {promptoryHowItWorks.map((item) => (
              <Card key={item.title} variant="strong" className={styles.howCard}>
                <p className={cn("section-kicker", styles.howEyebrow)}>{item.kicker}</p>
                <h3 className={styles.howTitle}>{item.title}</h3>
                <p className={styles.howBody}>{item.body}</p>
              </Card>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <p className={cn("section-kicker", styles.sectionEyebrow)}>결과물</p>
            <h2 className={cn("section-title", styles.sectionTitle)}>채팅이 끝나면 남는 건 답변이 아니라 실행물입니다</h2>
            <p className={styles.sectionBody}>
              비교표, 문구 초안, 요약본, 액션 메모처럼 바로 검토하고 공유할 수 있는 결과물이 중심이어야 합니다.
            </p>
          </div>
          <div className={styles.bento}>
            {promptoryResultBento.map((item, index) => (
              <Card
                key={item.title}
                variant={index % 3 === 0 ? "heroBright" : "default"}
                className={cn(styles.bentoCard, index % 3 === 0 ? styles.bentoCardAccent : "")}
              >
                <h3 className={styles.bentoTitle}>{item.title}</h3>
                <p className={styles.bentoBody}>{item.body}</p>
              </Card>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <p className={cn("section-kicker", styles.sectionEyebrow)}>Use Cases</p>
            <h2 className={cn("section-title", styles.sectionTitle)}>타깃별로 무엇이 바로 줄어드는지 한눈에 보여줍니다</h2>
          </div>
          <div className={styles.useCaseGrid}>
            {promptoryUseCases.map((item) => (
              <Card key={item.title} variant="strong" className={styles.useCaseCard}>
                <p className={cn("section-kicker", styles.useCaseEyebrow)}>{item.eyebrow}</p>
                <h3 className={styles.useCaseTitle}>{item.title}</h3>
                <p className={styles.useCaseBody}>{item.body}</p>
                <div className={styles.useCasePoints}>
                  {item.points.map((point) => (
                    <div key={point} className={styles.useCasePoint}>
                      {point}
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <Card variant="tint" className={styles.trustCard}>
            <div className={styles.trustGrid}>
              <div>
                <p className={cn("section-kicker", styles.trustEyebrow)}>신뢰 경계</p>
                <h3 className={styles.trustTitle}>공개 표면은 먼저 빠르게, 깊은 실행은 필요한 만큼만</h3>
                <div className={styles.trustList}>
                  {promptoryTrustBoundary.map((item) => (
                    <div key={item} className={styles.trustItem}>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              <CTAButton href="/optimize" telemetryEventName="execution_pack_clicked" telemetryPayload={{ href: "/optimize", source: "home_trust_cta" }} size="lg">
                작업면 열기
              </CTAButton>
            </div>
          </Card>
        </section>

        <section className={styles.section}>
          <Card variant="heroBright" className={styles.ctaCard}>
            <p className={cn("section-kicker", styles.summaryEyebrow)}>CTA</p>
            <h2 className={styles.ctaTitle}>30분 파일럿으로 귀사 URL 기준 예시를 보내드립니다</h2>
            <p className={styles.ctaBody}>
              제품 설명보다 빠릅니다. 회사 사이트나 채널 URL을 보내주시면, 프롬프토리 방식으로 실제 진단 예시와 다음 액션 흐름을 바로 보여드립니다.
            </p>
            <div className={styles.ctaActions}>
              <CTAButton href="/optimize" telemetryEventName="execution_pack_clicked" telemetryPayload={{ href: "/optimize", source: "home_final_primary" }} size="lg">
                회사 URL 보내기
              </CTAButton>
              <CTAButton href="mailto:hello@promptory.ai" variant="outline" telemetryEventName="execution_pack_clicked" telemetryPayload={{ href: "mailto:hello@promptory.ai", source: "home_final_secondary" }} size="lg">
                메일로 문의하기
              </CTAButton>
            </div>
          </Card>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <p className={cn("section-kicker", styles.sectionEyebrow)}>FAQ</p>
            <h2 className={cn("section-title", styles.sectionTitle)}>초기 랜딩에서 먼저 풀어줘야 하는 질문만 남깁니다</h2>
          </div>
          <div className={styles.faqGrid}>
            {promptoryFaqItems.map((item) => (
              <Card key={item.question} variant="default" className={styles.faqCard}>
                <h3 className={styles.faqQuestion}>{item.question}</h3>
                <p className={styles.faqAnswer}>{item.answer}</p>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
