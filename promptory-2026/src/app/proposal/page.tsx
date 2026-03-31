"use client";

import { useState } from "react";

// This page is designed to be printed/saved as PDF
export default function ProposalPage() {
  const [clientName, setClientName] = useState("[고객사명]");
  const [contactName, setContactName] = useState("[담당자명]");
  const [packageType, setPackageType] = useState("core");
  const [agentType, setAgentType] = useState("website-diagnosis");
  const [priceTier, setPriceTier] = useState("standard");
  const [validUntil, setValidUntil] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() + 30);
    return date.toISOString().split("T")[0];
  });

  const today = new Date().toISOString().split("T")[0];

  const getPrice = () => {
    const prices = {
      quick_audit: { low: 4.9, high: 9.9 },
      core: { low: 79, high: 99 },
      growth: { low: 149, high: 249 },
    };
    return prices[packageType as keyof typeof prices];
  };

  const getSetupFee = () => {
    const fees = {
      quick_audit: { low: 0, high: 0 },
      core: { low: 300, high: 500 },
      growth: { low: 700, high: 1200 },
    };
    return fees[packageType as keyof typeof fees];
  };

  const getPackageName = () => {
    const names = {
      quick_audit: "Quick Audit Pack",
      core: "Core Package",
      growth: "Growth Package",
    };
    return names[packageType as keyof typeof names];
  };

  const getAgentName = () => {
    const names = {
      "website-diagnosis": "Website Diagnosis Agent",
      "campaign-brief": "Campaign Brief Agent",
      "korea-local-ops": "Korea Local Ops Agent",
    };
    return names[agentType as keyof typeof names];
  };

  const price = getPrice();
  const setupFee = getSetupFee();

  return (
    <div className="min-h-screen bg-gray-100 py-8 print:bg-white print:py-0">
      {/* Print Controls */}
      <div className="max-w-[210mm] mx-auto mb-4 px-4 print:hidden">
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-xl font-bold mb-4">프롬프토리 제안서 생성기</h1>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium mb-1">고객사명</label>
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full border rounded px-3 py-2"
                placeholder="고객사명"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">담당자명</label>
              <input
                type="text"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                className="w-full border rounded px-3 py-2"
                placeholder="담당자명"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">패키지 유형</label>
              <select
                value={packageType}
                onChange={(e) => setPackageType(e.target.value)}
                className="w-full border rounded px-3 py-2"
              >
                <option value="quick_audit">Quick Audit Pack</option>
                <option value="core">Core Package</option>
                <option value="growth">Growth Package</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">에이전트 선택</label>
              <select
                value={agentType}
                onChange={(e) => setAgentType(e.target.value)}
                className="w-full border rounded px-3 py-2"
              >
                <option value="website-diagnosis">Website Diagnosis Agent</option>
                <option value="campaign-brief">Campaign Brief Agent</option>
                <option value="korea-local-ops">Korea Local Ops Agent</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">유효 기한</label>
              <input
                type="date"
                value={validUntil}
                onChange={(e) => setValidUntil(e.target.value)}
                className="w-full border rounded px-3 py-2"
              />
            </div>
          </div>
          <div className="mt-6 flex gap-3">
            <button
              onClick={() => window.print()}
              className="bg-slate-900 text-white px-6 py-2 rounded-lg hover:bg-slate-800 transition-colors"
            >
              PDF로 저장/인쇄
            </button>
            <button
              onClick={() => {
                setClientName("[고객사명]");
                setContactName("[담당자명]");
                setPackageType("core");
                setAgentType("website-diagnosis");
              }}
              className="border border-slate-300 px-6 py-2 rounded-lg hover:bg-slate-50 transition-colors"
            >
              초기화
            </button>
          </div>
        </div>
      </div>

      {/* Proposal Document - A4 Size */}
      <div className="max-w-[210mm] mx-auto bg-white shadow-lg print:shadow-none print:max-w-none">
        <div className="p-[20mm] min-h-[297mm]">
          {/* Header */}
          <div className="flex justify-between items-start border-b-2 border-slate-900 pb-6 mb-8">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">프롬프토리</h1>
              <p className="text-sm text-slate-500 mt-1">맞춤형 Slack Agent Package</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-slate-900">제안서</p>
              <p className="text-xs text-slate-500 mt-1">No. PT-{today.replace(/-/g, "")}-001</p>
            </div>
          </div>

          {/* Client Info */}
          <div className="bg-slate-50 rounded-lg p-6 mb-8">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider">고객사</p>
                <p className="text-lg font-semibold text-slate-900">{clientName}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider">담당자</p>
                <p className="text-lg font-semibold text-slate-900">{contactName} 님</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider">제안일</p>
                <p className="text-sm text-slate-900">{today}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider">유효 기한</p>
                <p className="text-sm text-slate-900">{validUntil}까지</p>
              </div>
            </div>
          </div>

          {/* Package Summary */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded bg-slate-900 text-white flex items-center justify-center text-sm">01</span>
              제안 패키지
            </h2>
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full">
                <tbody>
                  <tr className="border-b bg-slate-50">
                    <td className="p-4 text-sm font-medium text-slate-600 w-1/3">패키지명</td>
                    <td className="p-4 text-base font-semibold text-slate-900">{getPackageName()}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4 text-sm font-medium text-slate-600">포함 에이전트</td>
                    <td className="p-4 text-sm text-slate-900">{getAgentName()}</td>
                  </tr>
                  {packageType !== "quick_audit" && (
                    <tr className="border-b">
                      <td className="p-4 text-sm font-medium text-slate-600">세팅 기간</td>
                      <td className="p-4 text-sm text-slate-900">2~4주 (팀 인터뷰, Slack 연동, 흐름 설계, 테스트)</td>
                    </tr>
                  )}
                  <tr className="border-b bg-slate-50">
                    <td className="p-4 text-sm font-medium text-slate-600">월 요금</td>
                    <td className="p-4">
                      <span className="text-2xl font-bold text-slate-900">₩{price.low}~{price.high}만원</span>
                      <span className="text-sm text-slate-500 ml-2">/월 (VAT 별도)</span>
                    </td>
                  </tr>
                  {setupFee.low > 0 && (
                    <tr className="border-b">
                      <td className="p-4 text-sm font-medium text-slate-600">초기 세팅비</td>
                      <td className="p-4">
                        <span className="text-lg font-semibold text-slate-900">₩{setupFee.low}~{setupFee.high}만원</span>
                        <span className="text-sm text-slate-500 ml-2">(일회성)</span>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* What's Included */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded bg-slate-900 text-white flex items-center justify-center text-sm">02</span>
              포함 사항
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {packageType === "quick_audit" ? (
                <>
                  <div className="border rounded-lg p-4">
                    <p className="font-medium text-slate-900 mb-2">사이트/채널 진단</p>
                    <p className="text-sm text-slate-600">URL 기반 핵심 병목 분석</p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <p className="font-medium text-slate-900 mb-2">경쟁사 비교표</p>
                    <p className="text-sm text-slate-600">3사 대표 경쟁사 비교 분석</p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <p className="font-medium text-slate-900 mb-2">CTA 초안</p>
                    <p className="text-sm text-slate-600">전환 문구 초안 3개</p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <p className="font-medium text-slate-900 mb-2">보고용 요약</p>
                    <p className="text-sm text-slate-600">1페이지 실행 요약</p>
                  </div>
                </>
              ) : (
                <>
                  <div className="border rounded-lg p-4">
                    <p className="font-medium text-slate-900 mb-2">Slack 에이전트 설치</p>
                    <p className="text-sm text-slate-600">DM/채널/모달 연동 및 App Home 설정</p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <p className="font-medium text-slate-900 mb-2">무제한 URL 진단</p>
                    <p className="text-sm text-slate-600">팀 내 무제한 에이전트 사용</p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <p className="font-medium text-slate-900 mb-2">맞춤 흐름 세팅</p>
                    <p className="text-sm text-slate-600">팀 인터뷰 기반 질문 및 출력 형식 조정</p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <p className="font-medium text-slate-900 mb-2">결과 저장 및 관리</p>
                    <p className="text-sm text-slate-600">App Home에서 진단 및 초안 히스토리 관리</p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <p className="font-medium text-slate-900 mb-2">KR/EN 언어 옵션</p>
                    <p className="text-sm text-slate-600">한국어 및 영문 요약 동시 생성</p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <p className="font-medium text-slate-900 mb-2">이메일 기술 지원</p>
                    <p className="text-sm text-slate-600">평일 9-18시 기술 문의 응답</p>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Setup Process */}
          {packageType !== "quick_audit" && (
            <div className="mb-8">
              <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 rounded bg-slate-900 text-white flex items-center justify-center text-sm">03</span>
                도입 프로세스
              </h2>
              <div className="space-y-3">
                {[
                  { step: 1, title: "팀 인터뷰 (1주)", desc: "입력물, 질문 흐름, 출력 형식 정의" },
                  { step: 2, title: "Slack 연동 (3~5일)", desc: "워크스페이스 연결 및 권한 설정" },
                  { step: 3, title: "에이전트 흐름 설계 (1주)", desc: "맞춤 질문, 출력 템플릿, 공유 채널 설정" },
                  { step: 4, title: "테스트 및 수정 (3~5일)", desc: "샘플 URL 테스트 및 흐름 조정" },
                  { step: 5, title: "팀 교육 및 론칭 (1~2일)", desc: "사용 가이드 전달 및 Q&A" },
                ].map((item) => (
                  <div key={item.step} className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-sm font-bold shrink-0">
                      {item.step}
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">{item.title}</p>
                      <p className="text-sm text-slate-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Next Steps */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded bg-slate-900 text-white flex items-center justify-center text-sm">{packageType === "quick_audit" ? "03" : "04"}</span>
              다음 단계
            </h2>
            <div className="bg-blue-50 rounded-lg p-6">
              <ol className="space-y-2 text-sm text-slate-700 list-decimal list-inside">
                <li>본 제안서 검토 및 내부 결정</li>
                <li>회신 또는 /contact 페이지에서 견적 확정 요청</li>
                <li>{packageType === "quick_audit" ? "URL 전달 및 진단 일정 확정" : "Kick-off 미팅 일정 확정"}</li>
                <li>계약서 작성 및 세팅 시작</li>
              </ol>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t pt-6 mt-auto">
            <div className="flex justify-between items-end">
              <div>
                <p className="text-sm font-medium text-slate-900">프롬프토리</p>
                <p className="text-xs text-slate-500 mt-1">https://promptory.ai</p>
                <p className="text-xs text-slate-500">contact@promptory.ai</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-400">본 문서는 견적 제안 목적으로 작성되었습니다.</p>
                <p className="text-xs text-slate-400">유효 기한: {validUntil}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
