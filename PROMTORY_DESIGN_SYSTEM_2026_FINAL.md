# Promptory 2026 AI 서비스 디자인 시스템
## `/optimize` 결과 워크스페이스 설계 가이드

---

## 🎯 핵심 원칙: Studio + Radiant + Pocket + Catalyst 시너지

| 템플릿 | 핵심 기여 | Promptory 적용 |
|-------|----------|----------------|
| **studio.zip** | Split-Panel (24x), Inspector (11x), List-Tree (21x) | `/optimize` 3단계 워크스페이스 |
| **radiant.zip** | Bento Grid, Dense Card, Gradient | 모듈 추천 카드 밀도 |
| **pocket.zip** | Mobile-first Stack, AppScreen | 모바일 카드 리듬 |
| **catalyst-ui-kit** | Sidebar-Layout, Dialog, Feedback | 반응형 패널 시스템 |

---

## 📐 레이아웃 아키텍처: 3-Zone Workspace

### Zone A: Original Context (Left Sidebar)
**Studio의 `List.tsx` + `GridList.tsx` 패턴**
```tsx
// 원본 문장 타임라인
<List className="space-y-3">
  {sentences.map((sentence, idx) => (
    <ListItem
      key={sentence.id}
      index={idx}
      active={selectedId === sentence.id}
      onClick={() => selectSentence(sentence.id)}
      className={clsx(
        "rounded-xl p-4 transition-all cursor-pointer",
        "hover:bg-neutral-50 dark:hover:bg-neutral-900",
        selectedId === sentence.id && "ring-1 ring-blue-500 bg-blue-50/50"
      )}
    >
      <span className="text-xs font-mono text-neutral-400">{idx + 1}</span>
      <p className="mt-1 text-sm text-neutral-700 line-clamp-2">
        {sentence.content}
      </p>
    </ListItem>
  ))}
</List>
```

**토큰:**
- `--sidebar-width: 320px` (catalyst)
- `--item-gap: 12px`
- `--active-ring: 1px solid var(--color-ai-core)`

---

### Zone B: Result Canvas (Center Main)
**Radiant의 `BentoCard` + Studio의 `FadeIn`**

#### L1: 바꿀 문장 (Comparison View)
```tsx
// Studio Split-Panel 패턴 응용
<div className="relative grid grid-cols-1 lg:grid-cols-2 gap-4">
  {/* Original */}
  <div className="rounded-2xl bg-neutral-100 dark:bg-neutral-800 p-6">
    <span className="text-xs font-semibold text-neutral-400 uppercase">Original</span>
    <p className="mt-2 text-neutral-500 line-through decoration-red-400/50">
      {originalSentence}
    </p>
  </div>
  
  {/* Optimized */}
  <motion.div 
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="rounded-2xl bg-blue-50 dark:bg-blue-900/20 p-6 ring-1 ring-blue-200"
  >
    <span className="text-xs font-semibold text-blue-600 uppercase">AI Optimized</span>
    <p className="mt-2 text-neutral-900 dark:text-white font-medium">
      {optimizedSentence}
    </p>
  </motion.div>
</div>
```

#### L2: 이유 (Reason Badge)
```tsx
// Catalyst Badge + Radiant 스타일
<div className="flex flex-wrap gap-2 mt-4">
  {reasons.map(reason => (
    <Badge 
      key={reason.id}
      color={reason.type} // 'clarity' | 'impact' | 'flow'
      className="inline-flex items-center gap-1.5"
    >
      <reason.icon className="w-3.5 h-3.5" />
      {reason.label}
    </Badge>
  ))}
</div>
```

**색상 토큰:**
```css
--reason-clarity: #3b82f6;    /* 파랑 - 명확성 */
--reason-impact: #8b5cf6;     /* 보라 - 임팩트 */
--reason-flow: #10b981;       /* 초록 - 흐름 */
--reason-urgency: #f59e0b;    /* 노랑 - 긴급성 */
```

#### L3: 붙일 위치 (Context Timeline)
```tsx
// Studio의 Section 카운터 패턴 응용
<div className="relative mt-6">
  <div className="absolute left-0 top-0 bottom-0 w-px bg-neutral-200" />
  <div className="space-y-4 pl-6">
    <div className="relative">
      <div className="absolute -left-6 top-1 w-2 h-2 rounded-full bg-neutral-300" />
      <p className="text-sm text-neutral-500">문단 시작</p>
    </div>
    <div className="relative">
      <div className="absolute -left-[26px] top-1 w-3 h-3 rounded-full bg-blue-500 ring-4 ring-blue-100" />
      <p className="text-sm font-medium text-neutral-900">▶ 여기에 삽입</p>
      <p className="text-xs text-neutral-500 mt-1">
        앞 문장과의 연결고리: "{contextBridge}"
      </p>
    </div>
    <div className="relative">
      <div className="absolute -left-6 top-1 w-2 h-2 rounded-full bg-neutral-300" />
      <p className="text-sm text-neutral-500">문단 끝</p>
    </div>
  </div>
</div>
```

#### L4: 모듈 Properties (Inspector Panel)
```tsx
// Studio의 Inspector 패턴 + Catalyst DescriptionList
<div className="mt-8 rounded-2xl bg-white dark:bg-neutral-900 ring-1 ring-neutral-200 dark:ring-neutral-800 overflow-hidden">
  <div className="px-4 py-3 bg-neutral-50 dark:bg-neutral-800/50 border-b border-neutral-200 dark:border-neutral-700">
    <h4 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
      Module Properties
    </h4>
  </div>
  <DescriptionList>
    <DescriptionTerm>모듈명</DescriptionTerm>
    <DescriptionDetails>{module.name}</DescriptionDetails>
    
    <DescriptionTerm>톤</DescriptionTerm>
    <DescriptionDetails>
      <Badge color="neutral">{module.tone}</Badge>
    </DescriptionDetails>
    
    <DescriptionTerm>예상 효과</DescriptionTerm>
    <DescriptionDetails className="flex items-center gap-2">
      <span className="text-green-600 font-semibold">+{module.impact}%</span>
      <span className="text-neutral-500">전환율 상승</span>
    </DescriptionDetails>
    
    <DescriptionTerm>적용 단계</DescriptionTerm>
    <DescriptionDetails>{module.stage}</DescriptionDetails>
  </DescriptionList>
</div>
```

---

### Zone C: Action Panel (Right Sidebar / Bottom Sheet)
**Catalyst의 Sidebar-Layout + Studio의 Footer**

```tsx
// Desktop: 고정 우측 패널
// Mobile: Bottom Sheet (Pocket 패턴)
<div className={clsx(
  "fixed lg:relative lg:w-80",
  "bottom-0 left-0 right-0 lg:bottom-auto",
  "bg-white dark:bg-neutral-900",
  "lg:bg-transparent lg:dark:bg-transparent",
  "rounded-t-3xl lg:rounded-none",
  "shadow-[0_-4px_20px_rgba(0,0,0,0.1)] lg:shadow-none",
  "transition-transform duration-300",
  !isOpen && "translate-y-[calc(100%-60px)] lg:translate-y-0"
)}>
  {/* Mobile Handle */}
  <div 
    className="lg:hidden w-full h-6 flex items-center justify-center"
    onClick={() => setIsOpen(!isOpen)}
  >
    <div className="w-12 h-1 rounded-full bg-neutral-300" />
  </div>
  
  <div className="p-4 lg:p-0 space-y-4">
    {/* 복붙 초안 */}
    <button className="w-full flex items-center justify-center gap-2 
      bg-blue-600 text-white rounded-xl py-3 font-medium
      hover:bg-blue-700 active:scale-[0.98] transition-all">
      <CopyIcon className="w-4 h-4" />
      문장 복사하기
    </button>
    
    {/* 전체 복사 */}
    <button className="w-full flex items-center justify-center gap-2
      bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white 
      rounded-xl py-3 font-medium">
      <DocumentIcon className="w-4 h-4" />
      전체 초안 복사
    </button>
    
    {/* 브라우저 재확인 */}
    <div className="rounded-xl bg-amber-50 dark:bg-amber-900/20 p-4">
      <div className="flex items-start gap-3">
        <AlertTriangleIcon className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-amber-900 dark:text-amber-200">
            브라우저에서 확인해보세요
          </p>
          <p className="text-xs text-amber-700 dark:text-amber-300 mt-1">
            실제 페이지에서의 렌더링을 확인하는 것이 좋습니다.
          </p>
        </div>
      </div>
    </div>
  </div>
</div>
```

---

## 📱 모바일 대응: Pocket + Catalyst 하이브리드

### 카드 스택 리듬 (Pocket AppScreen 패턴)
```tsx
// Mobile-First Card Stack
<div className="lg:hidden space-y-4 pb-32">
  {results.map((result, idx) => (
    <motion.div
      key={result.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: idx * 0.1 }}
      className="rounded-2xl bg-white dark:bg-neutral-900 
        shadow-sm ring-1 ring-neutral-200 dark:ring-neutral-800
        overflow-hidden"
    >
      {/* Collapsed View */}
      <div 
        className="p-4 cursor-pointer"
        onClick={() => toggleExpand(result.id)}
      >
        <div className="flex items-center justify-between">
          <Badge color="ai">문장 {idx + 1}</Badge>
          <ChevronIcon className={clsx(
            "w-5 h-5 transition-transform",
            expanded && "rotate-180"
          )} />
        </div>
        <p className="mt-2 text-sm text-neutral-600 line-clamp-2">
          {result.original}
        </p>
      </div>
      
      {/* Expanded View */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            className="border-t border-neutral-100 dark:border-neutral-800"
          >
            <div className="p-4 space-y-4">
              {/* Zone B 내용이 여기에 축소되어 들어감 */}
              <CompactComparisonView result={result} />
              <CompactProperties result={result} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  ))}
</div>
```

### FAB (Floating Action Button)
```tsx
// Pocket의 FAB 패턴
<motion.button
  whileTap={{ scale: 0.95 }}
  className="fixed bottom-6 right-6 lg:hidden
    w-14 h-14 rounded-full bg-blue-600 text-white
    shadow-lg shadow-blue-600/30
    flex items-center justify-center"
>
  <ClipboardIcon className="w-6 h-6" />
</motion.button>
```

---

## 🎨 2026 디자인 토큰 체계

### 색상 (Radiant 그라데이션 + Studio 네추럴)
```css
/* AI 코어 팔레트 */
--color-ai-core: #3b82f6;
--color-ai-glow: rgba(59, 130, 246, 0.15);
--color-ai-pulse: rgba(59, 130, 246, 0.3);

/* 상태 색상 */
--color-success: #10b981;
--color-partial: #f97316;    /* 부분 실패 */
--color-error: #ef4444;
--color-warning: #f59e0b;

/* 배경 레이어 */
--bg-primary: #ffffff;
--bg-secondary: #fafafa;      /* neutral-50 */
--bg-tertiary: #f5f5f5;       /* neutral-100 */
--bg-dark: #171717;           /* neutral-900 */

/* 텍스트 */
--text-primary: #171717;
--text-secondary: #525252;    /* neutral-600 */
--text-tertiary: #a3a3a3;     /* neutral-400 */
--text-inverse: #ffffff;
```

### 타이포그래피 (Studio Mona Sans + Catalyst Inter)
```css
/* 디스플레이 - Studio 스타일 */
--font-display: 'Mona Sans', sans-serif;
--text-display-sm: 2.25rem/1.2;   /* 36px */
--text-display-md: 3rem/1.1;      /* 48px */
--text-display-lg: 4.5rem/0.95;   /* 72px */

/* 본문 - Catalyst 스타일 */
--font-body: 'Inter', system-ui, sans-serif;
--text-sm: 0.875rem/1.5;          /* 14px */
--text-base: 1rem/1.6;           /* 16px */
--text-lg: 1.125rem/1.6;         /* 18px */

/* 키보드/코드 */
--font-mono: 'JetBrains Mono', monospace;
--text-mono-sm: 0.75rem/1.4;
```

### 스페이싱 & 사이즈
```css
/* 카드 시스템 */
--card-padding: 1rem;             /* 16px */
--card-padding-lg: 1.5rem;        /* 24px */
--card-radius: 0.75rem;           /* 12px */
--card-radius-lg: 1.5rem;        /* 24px */

/* 갭 시스템 */
--gap-xs: 0.25rem;                /* 4px */
--gap-sm: 0.5rem;                 /* 8px */
--gap-md: 1rem;                   /* 16px */
--gap-lg: 1.5rem;                 /* 24px */
--gap-xl: 2rem;                   /* 32px */

/* 레이아웃 */
--sidebar-width: 20rem;           /* 320px */
--navbar-height: 4rem;             /* 64px */
--content-max: 80rem;             /* 1280px */
```

### 애니메이션 (Framer Motion 기반)
```css
/* Fade In - Studio 패턴 */
--ease-out: cubic-bezier(0.16, 1, 0.3, 1);
--ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
--duration-fast: 150ms;
--duration-base: 300ms;
--duration-slow: 500ms;

/* Spring */
--spring-stiff: { stiffness: 300, damping: 30 };
--spring-soft: { stiffness: 200, damping: 25 };

/* Stagger */
--stagger-fast: 50ms;
--stagger-base: 100ms;
```

---

## 🔄 상태 & 인터랙션 패턴

### 1. 스트리밍 결과 (Streaming)
```tsx
// 단어 단위 타이핑 효과
<motion.span
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: wordIndex * 0.05 }}
>
  {word}
</motion.span>

// 커서 블링킹
<span className="inline-block w-0.5 h-5 bg-blue-500 animate-pulse ml-0.5" />
```

### 2. 부분 실패 (Partial Failure)
```tsx
// Catalyst Alert + Studio Border 패턴
<Alert color="orange" className="mb-4">
  <AlertTitle>일부 문장 분석 실패</AlertTitle>
  <AlertDescription>
    3개 문장 중 2개는 성공, 1개는 길이 제한으로 분석되지 않았습니다.
  </AlertDescription>
  <AlertActions>
    <Button size="sm" variant="secondary" onClick={retry}>
      <RefreshIcon className="w-4 h-4 mr-1" />
      재시도
    </Button>
    <Button size="sm" onClick={continueAnyway}>
      계속하기
    </Button>
  </AlertActions>
</Alert>
```

### 3. 브라우저 재확인 (Browser Re-verify)
```tsx
// Split View 패턴
<div className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden ring-1 ring-neutral-200">
  <div className="p-6 bg-white">
    <h4 className="text-sm font-semibold text-neutral-500 mb-4">AI 결과</h4>
    <div className="prose prose-sm">{optimizedContent}</div>
  </div>
  <div className="p-6 bg-neutral-50 border-l border-neutral-200">
    <h4 className="text-sm font-semibold text-neutral-500 mb-4 flex items-center gap-2">
      <GlobeIcon className="w-4 h-4" />
      실제 브라우저
    </h4>
    <iframe 
      src={previewUrl} 
      className="w-full h-64 rounded-lg bg-white border border-neutral-200"
      sandbox="allow-same-origin"
    />
  </div>
</div>
```

---

## 📦 컴포넌트 라이브러리

### Primitives (Catalyst 기반)
| 컴포넌트 | 파일 | 용도 |
|---------|------|------|
| Button | `button.tsx` | 모든 액션 |
| Badge | `badge.tsx` | 태그/상태 |
| Dialog | `dialog.tsx` | 모달/확인 |
| Alert | `alert.tsx` | 에러/경고 |
| DescriptionList | `description-list.tsx` | Properties 패널 |
| SidebarLayout | `sidebar-layout.tsx` | 3-Zone 레이아웃 |

### Domain-Specific (Promptory)
| 컴포넌트 | 소스 패턴 | 용도 |
|---------|----------|------|
| SentenceList | Studio List | Zone A 문장 목록 |
| ComparisonView | Studio Split-Panel | L1 바꿀 문장 |
| ReasonBadge | Catalyst Badge | L2 이유 |
| ContextTimeline | Studio Section | L3 붙일 위치 |
| ModuleProperties | Catalyst DescriptionList | L4 모듈 정보 |
| ModuleBento | Radiant BentoCard | 추천 모듈 그리드 |
| MobileCardStack | Pocket AppScreen | 모바일 결과 리스트 |
| ActionPanel | Catalyst Sidebar | 복붙/재확인 |

---

## 🚀 구현 로드맵

### Phase 1: 핵심 레이아웃 (Week 1)
- [ ] Studio Split-Panel 적용 (3-Zone)
- [ ] Catalyst Sidebar-Layout 통합
- [ ] 반응형 브레이크포인트 설정

### Phase 2: 결과 카드 (Week 2)
- [ ] L1-L4 정보 계층 구현
- [ ] Radiant Bento Grid 적용
- [ ] Module 추천 카드 개발

### Phase 3: 모바일 대응 (Week 3)
- [ ] Pocket Mobile Stack 적용
- [ ] Bottom Sheet Action Panel
- [ ] FAB 구현

### Phase 4: 고급 인터랙션 (Week 4)
- [ ] 스트리밍 애니메이션
- [ ] 부분 실패 UI
- [ ] 브라우저 재확인 패널
- [ ] 키보드 단축키

---

## 📋 사용 예시: `/optimize` 페이지

```tsx
// app/optimize/page.tsx
import { SidebarLayout } from '@/components/catalyst/sidebar-layout'
import { SentenceList } from '@/components/promptory/sentence-list'
import { ResultCanvas } from '@/components/promptory/result-canvas'
import { ActionPanel } from '@/components/promptory/action-panel'
import { MobileCardStack } from '@/components/promptory/mobile-card-stack'

export default function OptimizePage() {
  return (
    <SidebarLayout
      sidebar={<SentenceList />}      /* Zone A */
      navbar={<OptimizeNavbar />}
    >
      {/* Desktop: 3-Zone Workspace */}
      <div className="hidden lg:grid lg:grid-cols-[1fr_320px] gap-6">
        <ResultCanvas />              /* Zone B */
        <ActionPanel />               /* Zone C */
      </div>
      
      {/* Mobile: Card Stack + FAB */}
      <div className="lg:hidden">
        <MobileCardStack />
        <FloatingCopyButton />
      </div>
    </SidebarLayout>
  )
}
```

---

## 🎓 디자인 결정의 근거

### 왜 Studio가 핵심인가?
1. **Split-Panel (24회)** → `/optimize`의 3-Zone 레이아웃 직접 대응
2. **Inspector (11회)** → Properties 패널 패턴
3. **List-Tree (21회)** → 문장 계층 구조 표현
4. **Animation** → Framer Motion 기반 전환 효과

### 왜 Radiant를 보조로?
1. **Bento Grid** → 모듈 추천 정보 밀도
2. **Gradient** → AI 코어 비주얼 아이덴티티
3. **Card Density** → Radiant 카드의 콘텐츠-투-패딩 비율

### 왜 Pocket을 모바일에?
1. **AppScreen** → 모바일 네이티브 느낌
2. **Stack Pattern** → 카드 리듬
3. **FAB** → 원클릭 액션

### 왜 Catalyst를 시스템으로?
1. **Headless UI 기반** → 접근성
2. **Dark Mode** → 내장 지원
3. **Form System** → 입력 패턴

---

*문서 버전: 2026.03.30*
*템플릿 버전: Tailwind Plus (studio, radiant, pocket, catalyst-ui-kit)*
