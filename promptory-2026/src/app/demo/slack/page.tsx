"use client";

import { useState } from "react";
import { WebsiteDiagnosisMock, CampaignBriefMock, KoreaLocalOpsMock } from "@/components/slack/slack-mock";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CTAButton } from "@/components/ui/cta-button";
import { cn } from "@/lib/cn";

const tabs = [
  { id: "website", label: "Website Diagnosis", color: "blue" },
  { id: "campaign", label: "Campaign Brief", color: "emerald" },
  { id: "korea", label: "Korea Local Ops", color: "indigo" },
];

export default function DemoSlackPage() {
  const [activeTab, setActiveTab] = useState("website");

  return (
    <div className="pb-16">
      {/* Hero */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-slate-50 to-slate-100/50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="mb-4">Slack Agent Demo</Badge>
          <h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Slack 안에서 어떻게 작동하는지 보여드립니다
          </h1>
          <p className="mt-4 text-base text-slate-600 max-w-2xl mx-auto">
            패키지별로 Slack에서 URL을 입력했을 때의 대화 흐름을 확인하세요.
            실제 화면은 더 많은 인터랙션을 포함합니다.
          </p>
        </div>
      </section>

      {/* Tabs */}
      <section className="py-8 border-b border-slate-200">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all",
                  activeTab === tab.id
                    ? `bg-${tab.color}-600 text-white`
                    : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                )}
                style={
                  activeTab === tab.id
                    ? {
                        backgroundColor:
                          tab.color === "blue"
                            ? "#2563eb"
                            : tab.color === "emerald"
                            ? "#059669"
                            : "#4f46e5",
                      }
                    : {}
                }
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Content */}
      <section className="py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Left: Slack Mock */}
            <div className="flex justify-center">
              {activeTab === "website" && <WebsiteDiagnosisMock />}
              {activeTab === "campaign" && <CampaignBriefMock />}
              {activeTab === "korea" && <KoreaLocalOpsMock />}
            </div>

            {/* Right: Explanation */}
            <div className="space-y-6">
              {activeTab === "website" && (
                <>
                  <div>
                    <Badge className="mb-2">Website Diagnosis Agent</Badge>
                    <h2 className="text-xl font-bold text-slate-950">사이트 진단에서 실행 초안까지</h2>
                    <p className="mt-2 text-sm text-slate-600 leading-6">
                      URL을 입력하면 1차 병목 진단이 바로 나옵니다. 
                      목표를 확인한 뒤 경쟁사 비교, CTA 초안, 보고용 요약 중 선택해서 이어갑니다.
                    </p>
                  </div>
                  <div className="space-y-3">
                    {[
                      { step: "1", text: "URL 입력 → 사이트 분석 시작" },
                      { step: "2", text: "1차 병목 진단 수신" },
                      { step: "3", text: "목표 확인 (문의/구매/콘텐츠)" },
                      { step: "4", text: "실행 버튼 선택 → 결과 생성" },
                    ].map((item) => (
                      <Card key={item.step} variant="tint" className="p-3 flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-xs font-bold flex items-center justify-center">
                          {item.step}
                        </span>
                        <span className="text-sm text-slate-700">{item.text}</span>
                      </Card>
                    ))}
                  </div>
                </>
              )}

              {activeTab === "campaign" && (
                <>
                  <div>
                    <Badge className="mb-2 bg-emerald-600">Campaign Brief Agent</Badge>
                    <h2 className="text-xl font-bold text-slate-950">회의에서 브리프까지</h2>
                    <p className="mt-2 text-sm text-slate-600 leading-6">
                      회의 메모와 참고 자료를 입력하면 캠페인 방향을 정리하고 
                      브리프, 메시지, 카피 초안까지 이어서 만듭니다.
                    </p>
                  </div>
                  <div className="space-y-3">
                    {[
                      { step: "1", text: "회의 메모/링크 입력" },
                      { step: "2", text: "캠페인 방향 및 메시지 우선순위 분석" },
                      { step: "3", text: "목표 확인 (리드/구매/인지)" },
                      { step: "4", text: "브리프/카피/보고 선택 → 결과 생성" },
                    ].map((item) => (
                      <Card key={item.step} variant="tint" className="p-3 flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 text-xs font-bold flex items-center justify-center">
                          {item.step}
                        </span>
                        <span className="text-sm text-slate-700">{item.text}</span>
                      </Card>
                    ))}
                  </div>
                </>
              )}

              {activeTab === "korea" && (
                <>
                  <div>
                    <Badge className="mb-2 bg-indigo-600">Korea Local Ops Agent</Badge>
                    <h2 className="text-xl font-bold text-slate-950">한국 채널과 HQ 공유</h2>
                    <p className="mt-2 text-sm text-slate-600 leading-6">
                      한국 사이트 URL을 입력하면 한국 시장용 진단과 
                      KR/EN summary, HQ action memo를 한 흐름으로 생성합니다.
                    </p>
                  </div>
                  <div className="space-y-3">
                    {[
                      { step: "1", text: "한국 사이트/채널 URL 입력" },
                      { step: "2", text: "한국 시장 진단 및 경쟁사 스캔" },
                      { step: "3", text: "KR/EN 옵션 및 HQ 보고 방식 선택" },
                      { step: "4", text: "KR/EN summary 및 action memo 생성" },
                    ].map((item) => (
                      <Card key={item.step} variant="tint" className="p-3 flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 text-xs font-bold flex items-center justify-center">
                          {item.step}
                        </span>
                        <span className="text-sm text-slate-700">{item.text}</span>
                      </Card>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Slack Surfaces Explained */}
      <section className="py-16 bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold text-slate-600 mb-2">Slack Surfaces</p>
            <h2 className="text-2xl font-bold text-slate-950">4개의 Slack Surface로 구성됩니다</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {[
              {
                title: "Messages / DM / Channel",
                desc: "URL 입력, 1차 진단, 빠른 실행 버튼. 팀과 실시간으로 대화하며 결과를 공유합니다.",
                icon: "💬",
              },
              {
                title: "Modals",
                desc: "목표 설정, 결과 형식 선택, KR/EN 옵션. 집중된 입력을 받아 정확한 결과물을 만듭니다.",
                icon: "🪟",
              },
              {
                title: "Threads",
                desc: "생성된 비교표, 초안, 요약을 스레드로 정리해 팀이 쉽게 따라갈 수 있습니다.",
                icon: "🧵",
              },
              {
                title: "App Home",
                desc: "저장된 작업, 최근 실행 결과, 다시 열기. 사용자별 1:1 공간에서 히스토리를 관리합니다.",
                icon: "🏠",
              },
            ].map((surface) => (
              <Card key={surface.title} variant="strong" className="p-6">
                <div className="flex items-start gap-4">
                  <span className="text-2xl">{surface.icon}</span>
                  <div>
                    <h3 className="font-semibold text-slate-950">{surface.title}</h3>
                    <p className="mt-2 text-sm text-slate-600 leading-6">{surface.desc}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-slate-950">
            실제로 우리 팀 Slack에서 체험해보세요
          </h2>
          <p className="mt-4 text-base text-slate-600 max-w-2xl mx-auto">
            데모 요청하시면 회사 URL 기준으로 실제 패키지 흐름을 보여드립니다.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <CTAButton href="/contact" size="lg">
              데모 요청하기
            </CTAButton>
            <CTAButton href="/packages" variant="outline" size="lg">
              패키지 보기
            </CTAButton>
          </div>
        </div>
      </section>
    </div>
  );
}
