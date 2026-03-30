# Promptory Design System 2026
## AI-First Mobile Result Workspace Specification

---

## 1. 2026년 AI 서비스 핵심 트렌드 분석

### Dense Information Hierarchy (정보 밀도 계층)
- **출처**: `studio.zip` 패널 구조 + `radiant.zip` bento grid
- **적용**: `/optimize` 결과 화면에 4단계 정보(문장/이유/위치/모듈)를 밀도 있게 배치
- **패턴**: Progressive Disclosure (점진적 공개) - 탭/아코디언으로 복잡도 조절

### Ambient Intelligence (주변 지능)
- **출처**: `catalyst-ui-kit` 상태 관리 + `protocol` 문서 네비게이션
- **적용**: 실시간 분류 상태, 부분 실패 처리, 재시도 플로우
- **패턴**: Skeleton → Streaming → Complete 3단계 상태 UI

### Frictionless Action (마찰 없는 액션)
- **출처**: `pocket` 모바일 중심 설계 + `oatmeal` 액션 버튼 패턴
- **적용**: 복붙 원클릭, 바로 적용, 브라우저 재확인 분할뷰
- **패턴**: Primary Action Floating Button + Contextual Slide-over

---

## 2. 템플릿 융합 분석

### Studio (핵심 레퍼런스)
```
레이아웃: Split Workspace (Left: Results / Right: Details)
패널:   Sticky Headers + Scrollable Content
카드:   Rounded Corners + Shadow Depth
밀도:   High (Inspector-style Properties Panel)
```
**Promptory 적용**: `/optimize` 결과 워크스페이스
- 왼쪽: 분류된 문장 리스트 (Studio의 파일 탐색기 패턴)
- 오른쪽: 선택된 문장의 모듈 상세 (Studio의 Properties 패널)

### Catalyst UI Kit (컴포넌트 기반)
```
레이아웃: Sidebar Layout, Stacked Layout (Mobile)
컴포넌트: Alert, Badge, Button, Card, Dialog, Table, Tabs
내비게이션: Navbar, Sidebar, Pagination
```
**Promptory 적용**: 전체 UI 시스템 기반
- Form elements: 질문 입력, URL 입력
- Data display: 결과 테이블, 모듈 카드
- Feedback: Alert (부분 실패), Badge (상태)

### Radiant (시각적 밀도)
```
그리드: Bento Grid, Complex Grid Layouts (grid-[1fr_24rem])
카드:   Bento Card with Gradient Backgrounds
애니메이션: Animated Number, Logo Clusters
```
**Promptory 적용**: 결과 시각화
- Bento Grid로 모듈별 통계 표시
- Animated Number로 진행률/통계 표시

### Pocket (모바일 퍼스트)
```
레이아웃: Stacked (flex-col), Mobile-optimized spacing
폰:     Phone Frame mockups for app preview
패턴:   px-6 기반 모바일 여백 시스템
```
**Promptory 적용**: 모바일 진입/결과 화면
- 세로 스택 기반 결과 카드
- Phone Frame으로 미리보기 제공

### Protocol (문서화/정보 구조)
```
내비게이션: Mobile Navigation Store, Section Provider
레이아웃: Grid with 1px separators (grid-[1fr_1px_1fr])
컴포넌트: CodeGroup, Properties, Note, Tag
```
**Promptory 적용**: 브라우저 재확인 패널
- Split view with separator
- Tag-based 모듈 표시
- CodeGroup으로 원문/수정문 비교

---

## 3. Promptory Component Token System

### Color Tokens (2026 AI 트렌드: 신뢰성 + 친화성)
```css
/* Primary - AI 신뢰성 */
--color-ai-core: #3b82f6;      /* blue-500 */
--color-ai-deep: #1e40af;      /* blue-800 */
--color-ai-soft: #dbeafe;      /* blue-100 */

/* Accent - 성공/실패 상태 */
--color-success: #10b981;      /* emerald-500 */
--color-warning: #f59e0b;      /* amber-500 */
--color-error: #ef4444;        /* red-500 */
--color-partial: #f97316;      /* orange-500 (부분 실패) */

/* Neutral - 정보 밀도 */
--color-surface: #ffffff;
--color-surface-elevated: #f8fafc; /* slate-50 */
--color-border: #e2e8f0;       /* slate-200 */
--color-text-primary: #0f172a; /* slate-900 */
--color-text-secondary: #64748b; /* slate-500 */
--color-text-tertiary: #94a3b8; /* slate-400 */
```

### Typography Tokens
```css
/* 2026 트렌드: 가독성 + 정보 밀도 */
--font-display: 'Inter', system-ui;     /* Studio/Radiant 참고 */
--font-mono: 'JetBrains Mono', monospace; /* Protocol 참고 */

/* Scale */
--text-xs: 0.75rem;    /* 12px - 태그, 보조정보 */
--text-sm: 0.875rem;   /* 14px - 본문, 설명 */
--text-base: 1rem;     /* 16px - 기본 */
--text-lg: 1.125rem;   /* 18px - 강조 */
--text-xl: 1.25rem;    /* 20px - 카드 제목 */
--text-2xl: 1.5rem;    /* 24px - 섹션 제목 */
--text-3xl: 1.875rem;  /* 30px - 페이지 제목 */

/* Line height - 정보 밀도 최적화 */
--leading-snug: 1.25;   /* Studio 패널 스타일 */
--leading-normal: 1.5;  /* 기본 본문 */
--leading-relaxed: 1.75; /* 설명 텍스트 */
```

### Spacing Tokens (Mobile-First)
```css
/* 2026 트렌드: 촘촘한 밀도 */
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-5: 1.25rem;   /* 20px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-10: 2.5rem;   /* 40px */

/* Container */
--container-sm: 640px;   /* 모바일 */
--container-md: 768px;   /* 태블릿 */
--container-lg: 1024px;  /* 데스크톱 */
--container-xl: 1280px;  /* 와이드 */
```

### Component Tokens

#### Card (결과 카드 - Studio + Radiant 융합)
```css
/* Dense Result Card */
--card-padding: 0.75rem;        /* space-3 */
--card-radius: 0.75rem;         /* rounded-xl (12px) */
--card-shadow: 0 1px 3px 0 rgba(0,0,0,0.1);
--card-shadow-hover: 0 4px 6px -1px rgba(0,0,0,0.1);
--card-border: 1px solid #e2e8f0;

/* 모듈 추천 카드 */
--module-card-padding: 1rem;
--module-card-radius: 0.5rem;   /* rounded-lg */
--module-card-bg: #f8fafc;
--module-card-border: 1px solid #e2e8f0;
```

#### Panel (워크스페이스 - Studio 기반)
```css
/* Split View Panel */
--panel-width-left: 320px;      /* 모바일: 100%, 데스크톱: 320px */
--panel-width-right: 1fr;       /* 유연한 영역 */
--panel-header-height: 3rem;    /* 48px */
--panel-padding: 1rem;
--panel-divider: 1px solid #e2e8f0;

/* Sticky Header */
--sticky-header-bg: rgba(255,255,255,0.95);
--sticky-header-blur: blur(8px);
```

#### Button (액션 - Catalyst + Pocket 융합)
```css
/* Primary Action (복붙, 적용) */
--btn-primary-bg: #3b82f6;
--btn-primary-text: #ffffff;
--btn-primary-radius: 0.5rem;
--btn-primary-padding: 0.625rem 1rem;
--btn-primary-font: 0.875rem;
--btn-primary-weight: 500;

/* Floating Action Button (Mobile) */
--fab-size: 3.5rem;             /* 56px */
--fab-radius: 9999px;         /* rounded-full */
--fab-shadow: 0 4px 12px rgba(59,130,246,0.4);
```

---

## 4. Promptory Screen-Specific Architecture

### 4.1 `/optimize` Result Workspace (Studio 패턴 중심)

#### Layout Structure
```
┌─────────────────────────────────────────┐
│  Header (Progress + Actions)            │  --sticky-header
├──────────────┬──────────────────────────┤
│              │                          │
│  Sentence    │   Selected Sentence      │
│  List        │   Details                │
│  (Scroll)    │   (Split View)           │
│              │                          │
│  ┌────────┐  │   ┌──────────────────┐   │
│  │ 문장1  │  │   │ 원문 vs 수정문   │   │
│  │ 문장2  │  │   │ (CodeGroup)      │   │
│  │ 문장3  │  │   ├──────────────────┤   │
│  │ ...    │  │   │ 모듈 추천 카드   │   │
│  └────────┘  │   │ (Bento Grid)     │   │
│              │   ├──────────────────┤   │
│              │   │ 적용/복사/재확인  │   │
│              │   │ (Action Bar)     │   │
│              │   └──────────────────┘   │
└──────────────┴──────────────────────────┘

모바일 변형 (Stacked Layout):
┌─────────────────────────┐
│ Header                  │
├─────────────────────────┤
│ ┌───────────────────┐   │
│ │ 문장1 (Card)       │   │
│ │ [Tap to Expand]    │   │
│ └───────────────────┘   │
│ ┌───────────────────┐   │
│ │ 문장2 (Card)       │   │
│ └───────────────────┘   │
│ ...                     │
└─────────────────────────┘
```

#### Component Hierarchy
1. **ResultWorkspace** (Container)
   - **ResultHeader**: 진행률, 전체통계, 일괄액션
   - **SentenceListPanel** (Left, Studio sidebar 패턴)
     - **SentenceCard** (Condensed)
       - 원문 미리보기
       - 상태 Badge (완료/부분실패/실패)
       - 모듈 아이콘
   - **DetailPanel** (Right, Studio properties 패턴)
     - **SentenceDetailView**
       - **ComparisonView** (Protocol CodeGroup 패턴)
         - 원문 / 수정문 side-by-side
       - **ModuleRecommendation** (Radiant Bento 패턴)
         - 모듈명, 신뢰도, 이유, 적용위치
       - **ActionBar** (Catalyst Button 패턴)
         - 복사하기 / 적용하기 / 재확인

#### 4-Step Information Architecture
```
Level 1: 바꿀 문장 (원문/수정문)
  └─ ComparisonView
     
Level 2: 이유 (왜 이 모듈인가)
  └─ ModuleCard.Reason
     
Level 3: 붙일 위치 (타이밍/컨텍스트)
  └─ ContextBadge + TimelineIndicator
     
Level 4: 모듈 정보 (속성, 설정)
  └─ ModuleProperties (Accordion)
```

### 4.2 Mobile Result Card Rhythm (Pocket + Radiant 융합)

#### Card States
```
[Collapsed Card]                    [Expanded Card]
┌─────────────────────────┐         ┌─────────────────────────┐
│ ▶ "그 날의 기억은..."    │    →   │ ▼ "그 날의 기억은..."    │
│    바꿈: 추억으로       │         │ ┌─────────────────────┐   │
│ [✓ 추천모듈]           │         │ │ 원문: 기억           │   │
│                         │         │ │ 수정: 추억           │   │
└─────────────────────────┘         │ └─────────────────────┘   │
                                    │ 이유: 더 감성적 표현    │   │
                                    │ 위치: 0:45-0:47         │   │
                                    │ ┌─────────────────┐     │   │
                                    │ │ 🎵 Nostalgic    │     │   │
                                    │ │    신뢰도: 92%  │     │   │
                                    │ │    ━━ [적용]    │     │   │
                                    │ └─────────────────┘     │   │
                                    └─────────────────────────┘
```

#### Rhythm Pattern (스크롤 스냅)
- 카드 간 간격: `space-3` (12px)
- 스크롤 스냅: `scroll-snap-type: y mandatory`
- 활성 카드: Scale 1.02 + Shadow 강화
- 비활성 카드: Opacity 0.7

### 4.3 Browser Re-confirmation Panel (Protocol Split View)

#### Split View Layout
```
┌─────────────────────┬─────────────────────┐
│  Current Result     │  Original Browser   │
│  (Promptory AI)   │  (YouTube/Platform) │
│                     │                     │
│  ┌───────────────┐  │  ┌───────────────┐  │
│  │ 수정된 자막   │  │  │ 원본 자막     │  │
│  │ 미리보기      │  │  │ (iframe)      │  │
│  └───────────────┘  │  └───────────────┘  │
│                     │                     │
│  [최종 적용]      │  [새로고침] [닫기] │
└─────────────────────┴─────────────────────┘

모바일: Tab Switching (Before/After)
┌─────────────────────────┐
│ [수정보기] [원본보기]   │ ← Tab Bar
├─────────────────────────┤
│                         │
│   (현재 선택된 탭 내용)  │
│                         │
└─────────────────────────┘
```

### 4.4 Partial Failure State (Ambient Intelligence)

#### State Visualization
```
┌─────────────────────────────────────────┐
│ ⚠️ 3개 문장에 부분 오류 발생            │  ← Alert Banner
├─────────────────────────────────────────┤
│                                         │
│ ┌─────────────────────────────────┐     │
│ │ 문장 A                          │     │
│ │ ━━━━━━━━━━━━━━━░░░░░░░░░ 70%   │     │  ← Progress Bar
│ │ ⚠️ 위치 인식 불확실              │     │  ← Warning Tag
│ │ [수동 위치 지정]                │     │
│ └─────────────────────────────────┘     │
│                                         │
│ ┌─────────────────────────────────┐     │
│ │ 문장 B                          │     │
│ │ ━━━━━━━━━━━━━━━━━━━━━━━━━━ 100%│    │
│ │ ✓ 완료                          │     │
│ └─────────────────────────────────┘     │
│                                         │
└─────────────────────────────────────────┘
```

---

## 5. Animation & Interaction Tokens

### Micro-interactions (2026 트렌드: 자연스러운 AI 피드백)

#### Loading/Streaming States
```css
/* Skeleton Pulse */
@keyframes skeleton-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
--animate-skeleton: skeleton-pulse 2s ease-in-out infinite;

/* Streaming Text Cursor */
@keyframes streaming-cursor {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
--animate-streaming: streaming-cursor 0.8s ease-in-out infinite;

/* Result Card Entry */
@keyframes card-enter {
  from { 
    opacity: 0; 
    transform: translateY(8px) scale(0.98); 
  }
  to { 
    opacity: 1; 
    transform: translateY(0) scale(1); 
  }
}
--animate-card-enter: card-enter 0.3s cubic-bezier(0.4, 0, 0.2, 1);
```

#### Hover/Active States
```css
/* Card Hover (Desktop) */
--hover-card-shadow: 0 4px 12px rgba(0,0,0,0.1);
--hover-card-transform: translateY(-2px);
--hover-card-transition: all 0.2s ease;

/* Button Press */
--active-button-scale: scale(0.97);
--active-button-transition: transform 0.1s ease;

/* List Item Selection (Studio 패턴) */
--selected-item-bg: #eff6ff; /* blue-50 */
--selected-item-border: #3b82f6; /* blue-500 */
--selected-indicator-width: 3px;
```

### Gesture Tokens (Mobile)
```css
/* Swipe Actions */
--swipe-threshold: 80px;
--swipe-action-bg: #ef4444; /* red-500 for delete */
--swipe-action-text: #ffffff;

/* Pull to Refresh */
--pull-threshold: 100px;
--pull-indicator-size: 40px;

/* Card Expansion */
--expand-transition: max-height 0.3s ease, opacity 0.3s ease;
```

---

## 6. Responsive Breakpoints & Behavior

### Breakpoint System
```css
/* Mobile First Approach */
--bp-sm: 640px;   /* 태블릿 세로 */
--bp-md: 768px;   /* 태블릿 가로 */
--bp-lg: 1024px;  /* 데스크톱 */
--bp-xl: 1280px;  /* 와이드 */
```

### Layout Transformation

#### `/optimize` Result Workspace
```
Mobile (< 768px):
  - Stacked Layout (single column)
  - Sentence cards with expand/collapse
  - Bottom Sheet for details
  - Floating Action Button

Tablet (768px - 1024px):
  - Split View (40% / 60%)
  - Fixed left panel
  - Scrollable right panel

Desktop (> 1024px):
  - Split View (320px / 1fr)
  - Draggable panel divider (Studio 패턴)
  - Multi-select support
```

---

## 7. Implementation Priority

### Phase 1: Core Result Workspace (Studio 기반)
1. **Split Panel Layout** - Studio의 좌측리스트/우측상세 패턴
2. **Dense Result Card** - 4단계 정보 계층 구현
3. **Mobile Card Stack** - 스크롤 스냅 + 확장/축소
4. **Action Bar** - 복붙/적용/재확인 버튼 그룹

### Phase 2: Enhanced Interactions (Catalyst + Radiant)
1. **Module Bento Grid** - 추천 모듈 카드 그리드
2. **Comparison View** - 원문/수정문 분할 보기
3. **State Management** - Skeleton → Streaming → Complete
4. **Partial Failure UI** - Warning states + Retry flows

### Phase 3: Mobile Polish (Pocket 기반)
1. **Stacked Layout** - 세로 카드 리듬
2. **Bottom Sheets** - 상세 정보 모달
3. **Floating Actions** - FAB + Speed Dial
4. **Swipe Gestures** - 빠른 액션

### Phase 4: Advanced Features (Protocol + Compass)
1. **Browser Re-confirmation** - Split View with iframe
2. **Progressive Onboarding** - Contextual hints
3. **Keyboard Shortcuts** - Power user features

---

## 8. Component Composition Examples

### Dense Result Card (Fully Expanded)
```jsx
<ResultCard
  status="completed" | "partial" | "failed"
  confidence={92}
>
  <SentencePreview original="그 날의 기억은" modified="그 날의 추억은" />
  <StatusBadge status="partial" message="위치 인식 불확실" />
  
  <ModuleRecommendation>
    <ModuleCard
      name="Nostalgic"
      type="audio"
      confidence={92}
      reason="더 감성적이고 따뜻한 느낌을 줍니다"
      position="0:45-0:47"
    />
  </ModuleRecommendation>
  
  <ActionBar>
    <CopyButton text={modifiedText} />
    <ApplyButton onClick={handleApply} />
    <VerifyButton onClick={openBrowserPanel} />
  </ActionBar>
</ResultCard>
```

### Mobile Result Stack
```jsx
<ResultStack>
  {sentences.map((sentence, index) => (
    <ResultCard
      key={sentence.id}
      index={index}
      active={activeIndex === index}
      onExpand={() => setActiveIndex(index)}
      snapAlign="start"
    />
  ))}
  <FloatingActionBar>
    <BatchApplyButton />
    <BatchCopyButton />
  </FloatingActionBar>
</ResultStack>
```

### Browser Re-confirmation Panel
```jsx
<SplitView divider="draggable">
  <LeftPanel>
    <ResultPreview sentences={modifiedSentences} />
    <ActionBar actions={["apply", "copy"]} />
  </LeftPanel>
  
  <RightPanel>
    <BrowserPreview 
      url={originalUrl} 
      highlightPosition={currentPosition}
    />
    <RefreshButton onClick={refreshBrowser} />
  </RightPanel>
</SplitView>
```

---

## 9. File Structure (Recommended)

```
app/
├── (routes)/
│   ├── optimize/
│   │   ├── page.tsx                 # 진입점
│   │   └── result/
│   │       ├── page.tsx             # 결과 워크스페이스
│   │       └── components/
│   │           ├── ResultWorkspace.tsx      # Studio 패턴
│   │           ├── SentenceListPanel.tsx      # 좌측 패널
│   │           ├── DetailPanel.tsx            # 우측 패널
│   │           ├── ResultCard.tsx             # 결과 카드
│   │           ├── ModuleRecommendation.tsx     # 모듈 추천
│   │           ├── ComparisonView.tsx           # 원문/수정문 비교
│   │           ├── ActionBar.tsx               # 액션 버튼
│   │           ├── BrowserPanel.tsx             # 브라우저 재확인
│   │           └── PartialFailureAlert.tsx     # 부분 실패 알림
│   │
│   ├── components/
│   │   ├── ui/                      # Catalyst UI Kit 기반
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Alert.tsx
│   │   │   ├── Dialog.tsx
│   │   │   ├── Tabs.tsx
│   │   │   └── ...
│   │   │
│   │   ├── layout/                  # 레이아웃 컴포넌트
│   │   │   ├── SplitView.tsx        # Studio Split 패턴
│   │   │   ├── StackedLayout.tsx    # Pocket 모바일 패턴
│   │   │   ├── SidebarLayout.tsx    # Catalyst 사이드바
│   │   │   └── Panel.tsx            # Studio 패널
│   │   │
│   │   └── patterns/                # 복합 패턴
│   │       ├── BentoGrid.tsx        # Radiant 그리드
│   │       ├── CodeComparison.tsx   # Protocol 비교
│   │       ├── CardStack.tsx        # 모바일 카드 스택
│   │       └── FloatingActions.tsx  # FAB 패턴
│   │
│   └── lib/
│       ├── tokens.ts                # 디자인 토큰
│       ├── animations.ts            # 애니메이션
│       └── utils.ts
│
└── styles/
    ├── tokens.css                   # CSS Variables
    ├── components.css               # 컴포넌트 스타일
    └── animations.css               # 애니메이션
```

---

## 10. Summary: 2026 AI 서비스 핵심 적용

| 트렌드 | 적용 컴포넌트 | 출처 템플릿 |
|--------|--------------|------------|
| **Dense Information** | 4단계 계층 카드 | Studio + Radiant |
| **Progressive Disclosure** | Expandable Cards, Accordion | Studio + Catalyst |
| **Ambient Intelligence** | Streaming States, Skeleton | Catalyst + Protocol |
| **Frictionless Action** | FAB, One-click Actions | Pocket + Oatmeal |
| **Split Comparison** | Side-by-side Browser View | Protocol |
| **Mobile-First Rhythm** | Scroll Snap Cards, Bottom Sheet | Pocket |
| **Split Workspace** | Left List / Right Detail | Studio |
| **Visual Density** | Bento Grid Stats | Radiant |

**한 줄 요약**: 
> Studio의 워크스페이스 밀도 + Catalyst의 UI 시스템 + Radiant의 시각적 리듬 + Pocket의 모바일 퍼스트 + Protocol의 정보 구조 = 2026년 Promptory AI 결과 워크스페이스

---

*Generated by analyzing 14 Tailwind Plus templates*
*Optimized for 2026 AI Service Design Trends*
*Target: Promptory /optimize Result Flow*
