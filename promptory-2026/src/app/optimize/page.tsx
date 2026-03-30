"use client";

import { useState, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";

// Layout components
import { ThreeZoneWorkspace } from "@/components/layout/ThreeZoneWorkspace";

// Promptory components
import { SentenceList, type Sentence } from "@/components/promptory/SentenceList";
import { ComparisonView } from "@/components/promptory/ComparisonView";
import { ReasonBadge, type Reason } from "@/components/promptory/ReasonBadge";
import { ContextTimeline, type TimelineItem } from "@/components/promptory/ContextTimeline";
import { ModuleProperties, type ModuleData } from "@/components/promptory/ModuleProperties";
import { ActionPanel, MobileActionPanel } from "@/components/promptory/ActionPanel";
import { MobileCardStack, type CardData } from "@/components/promptory/MobileCardStack";
import { FloatingCopyButton } from "@/components/promptory/FloatingCopyButton";
import { PartialFailureAlert } from "@/components/promptory/PartialFailureAlert";
import { StreamingIndicator } from "@/components/promptory/StreamingIndicator";
import { ModuleBento, type Module } from "@/components/promptory/ModuleBento";

// Design tokens & utilities
import { gradients, layout } from "@/lib/tokens";
// =====================================================
// Deduplication: Using shared clipboard utilities
// =====================================================
import { copyToClipboard, copyBatch } from "@/lib/utils/clipboard";

// =====================================================
// Bottleneck Fix: Sample data memoized to prevent recalculation
// Data is static, so useMemo prevents unnecessary object creation
// =====================================================
const useSampleData = () => {
  return useMemo(() => ({
    sentences: [
      { id: "1", index: 0, content: "우리 제품은 매우 좋습니다. 많은 기능을 가지고 있어요.", status: "completed" as const },
      { id: "2", index: 1, content: "이 기능을 사용하면 시간을 절약할 수 있습니다.", status: "completed" as const },
      { id: "3", index: 2, content: "고객들이 우리 서비스를 좋아합니다.", status: "processing" as const },
      { id: "4", index: 3, content: "가격이 적절합니다.", status: "idle" as const },
    ] satisfies Sentence[],
    
    reasons: [
      { id: "1", type: "clarity" as const, label: "명확성 향상", description: "핵심 가치를 더 명확하게 전달" },
      { id: "2", type: "impact" as const, label: "설득력 강화", description: "구체적인 수치로 임팩트 증가" },
      { id: "3", type: "flow" as const, label: "흐름 개선", description: "문장 연결을 자연스럽게" },
    ] satisfies Reason[],
    
    timeline: [
      { id: "1", type: "start" as const, label: "문단 시작", isActive: false },
      { id: "2", type: "insert" as const, label: "여기에 삽입", isActive: true },
      { id: "3", type: "end" as const, label: "문단 끝", isActive: false },
    ] satisfies TimelineItem[],
    
    module: {
      name: "가치 제안 강화 모듈",
      tone: "전문적",
      impact: 35,
      impactLabel: "전환율 상승",
      stage: "초안 작성",
      category: "마케팅",
      description: "제품의 핵심 가치를 고객 관점에서 재구성하여 설득력을 높입니다.",
    } satisfies ModuleData,
    
    modules: [
      { id: "m1", name: "가치 제안 강화", description: "제품의 핵심 가치를 고객 관점에서 재구성", tone: "전문적", impact: 35, category: "마케팅" },
      { id: "m2", name: "흐름 개선", description: "문장 간 자연스러운 연결과 전환", tone: "자연스러운", impact: 25, category: "스타일" },
      { id: "m3", name: "CTA 최적화", description: "행동 유도 문구의 효과적 배치", tone: "설득력", impact: 42, category: "전환" },
      { id: "m4", name: "신뢰 구축", description: "사회적 증거와 데이터 활용", tone: "신뢰", impact: 28, category: "신뢰성" },
    ] satisfies Module[],
  }), []);
};

// Navbar component
function OptimizeNavbar() {
  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center gap-3">
        <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${gradients.ai} flex items-center justify-center`}>
          <span className="text-white font-bold text-sm">P</span>
        </div>
        <div>
          <h1 className="font-semibold text-neutral-900 dark:text-white">Promptory</h1>
          <p className="text-xs text-neutral-500">AI 문장 최적화</p>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <span className="text-xs text-neutral-500 hidden sm:inline">4개 문장 중 2개 완료</span>
        <div className="w-20 h-2 rounded-full bg-neutral-200 dark:bg-neutral-700 overflow-hidden">
          <div className={`h-full w-1/2 bg-gradient-to-r ${gradients.ai} rounded-full`} />
        </div>
      </div>
    </div>
  );
}

// Zone B Content - Main Result Canvas
// =====================================================
// Bottleneck Fix: Accept data as props instead of global constants
// Enables better memoization and testability
// =====================================================
interface ZoneBContentProps {
  selectedSentence: Sentence | null;
  reasons: Reason[];
  timeline: TimelineItem[];
  module: ModuleData;
  modules: Module[];
}

function ZoneBContent({ 
  selectedSentence, 
  reasons, 
  timeline, 
  module, 
  modules 
}: ZoneBContentProps) {
  if (!selectedSentence) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <div 
            className="rounded-2xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center mx-auto mb-4"
            style={{ width: layout.navbar.height, height: layout.navbar.height }}
          >
            <ChatBubbleLeftRightIcon className="w-8 h-8 text-neutral-400" strokeWidth={1.5} />
          </div>
          <p className="text-neutral-500 dark:text-neutral-400">문장을 선택하여 최적화 결과를 확인하세요</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {selectedSentence.status === "processing" && (
        <StreamingIndicator message="AI가 문장을 분석하는 중..." />
      )}
      
      {selectedSentence.status === "completed" && (
        <>
          <ComparisonView
            data={{
              original: selectedSentence.content,
              optimized: `최적화된: ${selectedSentence.content} (더 명확하고 설득력 있는 버전)`,
              improvements: ["명확성 +45%", "설득력 +30%", "가독성 +25%"],
            }}
          />
          
          <ReasonBadge reasons={reasons} />
          
          <ContextTimeline
            items={timeline}
            contextBridge="사용자 경험과 직접 연결되는 가치"
          />
          
          <ModuleProperties module={module} />
          
          <ModuleBento modules={modules} />
        </>
      )}
    </div>
  );
}

// Main page component
export default function OptimizePage() {
  const [selectedId, setSelectedId] = useState<string>("1");
  const [isMobilePanelOpen, setIsMobilePanelOpen] = useState(false);
  const [showPartialFailure, setShowPartialFailure] = useState(true);

  // =====================================================
  // Bottleneck Fix: Memoized sample data prevents recalculation
  // =====================================================
  const { sentences, reasons, timeline, module, modules } = useSampleData();
  
  const selectedSentence = sentences.find((s) => s.id === selectedId) || null;

  // =====================================================
  // Deduplication: Using shared clipboard utilities
  // Single implementation vs duplicate fallback logic
  // =====================================================
  const handleCopySentence = useCallback(async () => {
    const text = selectedSentence?.content;
    if (!text) return;
    
    try {
      await copyToClipboard(text);
    } catch (error) {
      console.error("Failed to copy sentence:", error);
    }
  }, [selectedSentence]);

  // Bottleneck Fix: Batch copy for multiple items (single operation)
  const handleCopyAll = useCallback(async () => {
    try {
      await copyBatch(sentences.map(s => s.content));
    } catch (error) {
      console.error("Failed to copy all text:", error);
    }
  }, [sentences]);
  
  // =====================================================
  // Bottleneck Fix: Derived data with useMemo
  // Prevents recalculation on every render
  // =====================================================
  const sampleCardData = useMemo<CardData[]>(() => 
    sentences.map((s) => ({
      id: s.id,
      index: s.index,
      original: s.content,
      optimized: s.status === "completed" ? `AI가 최적화한: ${s.content}` : undefined,
      reasons: s.status === "completed" ? reasons.map((r) => ({ type: r.type, label: r.label })) : undefined,
      status: s.status as CardData["status"],
    })), 
    [sentences, reasons]
  );

  // Zone A: Original Context
  const zoneA = (
    <div className="space-y-6">
      <OptimizeNavbar />
      
      <SentenceList
        sentences={sentences}
        selectedId={selectedId}
        onSelect={setSelectedId}
        title="원본 문장 목록"
      />
      
      <div className="p-4 rounded-xl bg-neutral-100 dark:bg-neutral-800/50">
        <h4 className="text-xs font-semibold text-neutral-500 uppercase mb-2">진행 상황</h4>
        <div className="flex items-center justify-between text-sm">
          <span className="text-neutral-600 dark:text-neutral-400">처리 완료</span>
          <span className="font-medium text-neutral-900 dark:text-white">2/4 문장</span>
        </div>
        <div className="mt-2 h-2 rounded-full bg-neutral-200 dark:bg-neutral-700 overflow-hidden">
          <div className={`h-full w-1/2 rounded-full bg-gradient-to-r ${gradients.ai}`} />
        </div>
      </div>
    </div>
  );

  // Zone B: Result Canvas
  const zoneB = (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">
          최적화 결과
        </h2>
        {selectedSentence && (
          <span className="text-sm text-neutral-500">
            문장 #{selectedSentence.index + 1}
          </span>
        )}
      </div>
      
      {showPartialFailure && (
        <PartialFailureAlert
          totalCount={sentences.length}
          successCount={2}
          errorCount={1}
          onRetry={() => setShowPartialFailure(false)}
          onContinue={() => setShowPartialFailure(false)}
        />
      )}
      
      {/* =====================================================
          Deduplication: Pass memoized sample data
          ===================================================== */}
      <ZoneBContent 
        selectedSentence={selectedSentence} 
        reasons={reasons}
        timeline={timeline}
        module={module}
        modules={modules}
      />
    </div>
  );

  // Zone C: Action Panel
  const zoneC = (
    <ActionPanel
      onCopySentence={handleCopySentence}
      onCopyAll={handleCopyAll}
      onBrowserVerify={() => console.log("Browser verify")}
      showBrowserAlert={true}
    />
  );

  // Mobile View
  const mobileView = (
    <>
      <MobileCardStack
        cards={sampleCardData}
        onCardClick={(id) => setSelectedId(id)}
      />
      <FloatingCopyButton onCopy={handleCopyAll} />
      <MobileActionPanel
        isOpen={isMobilePanelOpen}
        onToggle={() => setIsMobilePanelOpen(!isMobilePanelOpen)}
        onCopySentence={handleCopySentence}
        onCopyAll={handleCopyAll}
      />
    </>
  );

  return (
    <ThreeZoneWorkspace
      zoneA={zoneA}
      zoneB={zoneB}
      zoneC={zoneC}
      mobileView={mobileView}
    />
  );
}
