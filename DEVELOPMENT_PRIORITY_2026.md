# 프롬프토리 2026 개발 우선순위 (Business Default Alignment)

**작성일**: 2026.03.31  
**기준**: 사업 디폴트 수립 후 레포 갭 분석  
**목표**: 수익화 UI 완성 및 영업 퍼널 구축

---

## 현재 레포 상태 (As-Is)

### ✅ 이미 완성된 부분 (95%)
- [x] 홈 헤드라인: "Slack에 URL을내면 진단부터 실행 초안까지"
- [x] 타겟 명시: "중소기업 팀" / "외국계 한국지사"
- [x] Pain Point: "초안이 밀리는 팀"
- [x] 패키지 구조: 3개 Agent 패키지 (`/packages`)
- [x] 핵심 워크플로: `/optimize` (URL → 진단 → 추천)
- [x] 저장/이어보기: `/library`, App Home

### ❌ 부족한 부분 (5% = 핵심 갭)
- [ ] **수익 모델 UI**: 구축비/월 운영비 가격이 어디에도 없음
- [ ] **Quick Audit 상품화**: `/optimize`는 있지만 "1회 49~99만원" 포지셔닝 없음
- [ ] **영업 퍼널**: `/contact`는 있지만 "진입→핵심→운영→업셀" 구조 없음
- [ ] **구축 과정 표시**: "맞춤 세팅 2주" 등의 기대값 설정 없음

---

## 개발 우선순위 (P0 → P3)

### 🔴 P0: 수익화 모델 UI (즉시 - 1주일)
**목표**: 고객이 가격을 알고 결제할 수 있게 함

#### 1. `/pricing` 페이지 신설
```
라우트: /pricing
구성:
  - Quick Audit Pack: 49~99만원 (1회)
  - Core Package: 구축 300~500만 + 월 79~99만
  - Growth Package: 구축 700~1200만 + 월 149~249만
  - FAQ: "구축은 뭐 하는 건가요?"
```

#### 2. 패키지 상세에 가격 카드 추가
```
라우트: /packages/[slug]
추가:
  - "구축비 300만원부터" 배지
  - "월 79만원부터" 배지
  - CTA: "견적 요청하기" → /contact?type=package&slug=xxx
```

#### 3. `/contact` 페이지 개선 (영업 퍼널용)
```
쿼리 파라미터 지원:
  - ?type=quick_audit: Quick Audit Pack 문의
  - ?type=package&slug=xxx: 특정 패키지 문의
  - ?type=demo: 일반 데모 요청

폼 필드 추가:
  - 회사 규모 (20인 미만 / 20~50인 / 50~100인 / 100인 이상)
  - 현재 Pain Point (초안 병목 / 비교 분석 / 보고 정리)
  - 도입 희망 시기 (즉시 / 1개월 내 / 3개월 내)
```

**예상 작업량**: 2~3일 (기존 컴포넌트 재사용)

---

### 🟡 P1: Quick Audit 상품화 (2주)
**목표**: `/optimize`를 유입 상품으로 명확히 포지셔닝

#### 1. `/optimize` 히어로 개선
```
현재: "채널 URL로 공개 진단을 시작하세요"
변경: "1회 49만원 Quick Audit으로 시작해보세요"
서브: "URL 하나로 핵심 병목과 경쟁사 비교 초안을 받아보고, 
       계속해서 Core Package로 이어갈 수 있습니다"
```

#### 2. 결과 화면에 업셀 CTA
```
위치: `/optimize` 결과 하단
추가:
  - "이 진단을 매주 자동으로 받으시려면?"
  - Core Package 업셀 카드 (구축 300만 + 월 79만)
  - CTA: "패키지 도입 상담" → /contact?type=upsell&from=optimize
```

#### 3. Quick Audit 결과 저장/공유
```
기능:
  - 결과를 PDF로 다운로드 (영업용)
  - Slack으로 결과 공유하기
  - "다음 단계 상담 예약" 캘린더 연동
```

**예상 작업량**: 3~5일

---

### 🟢 P2: 구축 과정 시각화 (3주)
**목표**: "맞춤 세팅"의 가치를 시각적으로 전달

#### 1. `/setup-process` 페이지 (옵션)
```
구성:
  1. 팀 인터뷰 (1일): 입력물, 질문 흐름, 출력 형식 확인
  2. Slack 연동 (1일): 워크스페이스 연결, 권한 설정
  3. 워크플로 고정 (3일): 팀 맞춤형 Agent 세팅
  4. 테스트/수정 (2일): 샘플 URL로 완성도 검증
  5. 팀 교육 (1일): 핵심 사용자 2~3명 대상 사용법
  
총 소요: 2주 (최소) ~ 4주 (복잡한 워크플로)
```

#### 2. 견적 제안서 템플릿 (자동 생성)
```
기능:
  - /contact 폼 제출 → 자동 견적 이메일 발송
  - 템플릿: "회사명님의 Promptory 도입 견적"
  - 내용: 선택한 패키지, 예상 구축 기간, 월 운영비, 다음 단계
```

**예상 작업량**: 5~7일

---

### 🔵 P3: 업셀/확장 기능 (4주~)
**목표**: LTV 확대 및 Retention 강화

#### 1. 패키지 추가 기능
```
위치: `/account/add-package`
기능:
  - 기존 고객이 추가 패키지 구독
  - KR/EN Summary 옵션 추가
  - 팀별 App Home 분리 (대기업 확장용)
```

#### 2. 정기 운영 리포트
```
기능:
  - 월간 사용량 리포트 (슬랙으로 발송)
  - "이번 달 X개 초안 생성, Y시간 절약"
  - 다음 달 추천 개선사항
```

#### 3. CRM/영업 툴 연동 (선택)
```
후보:
  - HubSpot (무료 티어)
  - Notion Database (간단한 Lead 관리)
  - Airtable (영업 파이프라인)
```

**예상 작업량**: 2주+

---

## 즉시 실행 체크리스트 (Today)

### 오늘 바로 할 수 있는 것
- [ ] `/pricing` 페이지 컴포넌트 생성 (`src/app/pricing/page.tsx`)
- [ ] `/packages/[slug]`에 가격 배지 추가 (기존 `Card` 컴포넌트 활용)
- [ ] `/contact`에 쿼리 파라미터 로직 추가 (`useSearchParams`)
- [ ] 홈 CTA 버튼 링크 수정: `/contact` → `/pricing` 또는 `/contact?type=demo`

### 이번 주에 할 것
- [ ] 가격 정책 문서 정리 (내부용)
- [ ] 견적 요청 폼 개선
- [ ] `/optimize` 업셀 CTA 추가
- [ ] Quick Audit Pack 소개 섹션 (홈 하단)

### 다음 주에 할 것
- [ ] `/setup-process` 페이지 (옵션)
- [ ] 자동 견적 이메일 템플릿
- [ ] 영업 CRM 연동 검토

---

## 코드 예시: `/pricing` 페이지 기본 구조

```tsx
// src/app/pricing/page.tsx
// 위치: 이미 /packages와 유사한 UI 패턴 사용

const pricingTiers = [
  {
    name: "Quick Audit Pack",
    price: "49~99만원",
    period: "1회",
    description: "URL 기반 1차 진단 + 비교표 초안 + 방향 제안",
    features: ["URL 진단 1회", "비교표 초안", "CTA 개선안", "보고용 요약"],
    cta: "지금 신청",
    href: "/contact?type=quick_audit",
    highlight: false,
  },
  {
    name: "Core Package",
    price: "300~500만원 + 월 79~99만",
    period: "구축 + 월 운영",
    description: "Slack에 Agent 1개 구축. 저장/이어보기 포함.",
    features: [
      "맞춤 세팅 (2주)",
      "Slack DM/채널/모달",
      "1개 핵심 워크플로",
      "App Home 저장",
      "월간 리포트",
    ],
    cta: "견적 요청",
    href: "/contact?type=package&plan=core",
    highlight: true, // featured
  },
  {
    name: "Growth Package",
    price: "700~1200만원 + 월 149~249만",
    period: "구축 + 월 운영",
    description: "복수 워크플로 + KR/EN + 외국계 지사용",
    features: [
      "맞춤 세팅 (4주)",
      "Slack 전체 연동",
      "2~4개 워크플로",
      "KR/EN Summary",
      "HQ 공유용 포맷",
      "우선 지원",
    ],
    cta: "상담 예약",
    href: "/contact?type=package&plan=growth",
    highlight: false,
  },
];
```

---

## 레포 변경 예상 파일 목록

### 신규 파일
- `src/app/pricing/page.tsx`
- `src/app/setup-process/page.tsx` (P2)
- `src/components/pricing/pricing-card.tsx`
- `src/lib/contact-form.ts` (쿼리 파라미터 처리)

### 수정 파일
- `src/app/page.tsx` (CTA 링크 수정)
- `src/app/packages/[slug]/page.tsx` (가격 배지 추가)
- `src/app/contact/page.tsx` (폼 개선, 쿼리 파라미터)
- `src/app/optimize/page.tsx` (히어로 문구, 업셀 CTA)
- `src/components/ui/cta-button.tsx` (telemetry 추가)

---

## 결론

**핵심 갭은 "코드"가 아니라 "메시지"입니다.**

현재 레포는 이미 제품 방향성이 95% 정확합니다. 
부족한 5%는 **"가격을 명시하고 영업 퍼널을 명확히 하는 UI"**입니다.

### 즉시 실행 권장 순서
1. **오늘**: `/pricing` 페이지 생성 (하루)
2. **내일**: `/contact` 개선 (반나절)
3. **이번 주**: `/packages/[slug]`에 가격 배지 추가 (반나절)
4. **다음 주**: `/optimize` 업셀 CTA (하루)

총 작업량: **3~4일**이면 사업 디폴트와 완벽히 정렬된 수익화 UI 완성.

---

*다음 단계*: 위 개발 우선순위에 따라 **실제 코드 PR**을 생성하거나,  
**영업 자료** (PDF, PPT)를 제작할 수 있습니다.
