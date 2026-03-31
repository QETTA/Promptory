# E2E Testing Guide

## 개요
프롬프토리의 End-to-End (E2E) 테스트 시스템은 Playwright를 기반으로 합니다.
모든 주요 페이지의 시각적 렌더링, 기능, 반응형 디자인을 자동으로 검증합니다.

## 테스트 환경

### 설치된 도구
- **Playwright**: Chromium, Firefox, WebKit 지원
- **screenshot-test.mjs**: 빠른 시각적 회귀 테스트용 Node.js 스크립트

### 지원하는 브라우저
- Desktop: Chrome, Firefox, Safari
- Mobile: Pixel 5, iPhone 12

## 명령어

```bash
# E2E 테스트 실행
npm run test:e2e

# UI 모드로 실행 (시각적 디버깅)
npm run test:e2e:ui

# 디버그 모드
npm run test:e2e:debug

# 스크린샷 테스트만 실행
npm run test:e2e:screenshots

# 테스트 리포트 보기
npm run test:e2e:report
```

## 테스트 커버리지

### 페이지 테스트 (`pages.spec.ts`)
- [x] 홈페이지 (`/`)
- [x] 가격 페이지 (`/pricing`)
- [x] 패키지 페이지 (`/packages`)
- [x] 문의 페이지 (`/contact`)
- [x] 로그인 페이지 (`/login`)
- [x] 설정 페이지 (`/setup`)
- [x] 패키지 상세 페이지 (`/packages/[slug]`)

### 테스트 항목
- 페이지 로딩 성공 (HTTP 200)
- 페이지 제목 확인
- 콘솔 에러 체크
- 반응형 디자인 (모바일/태블릿/데스크톱)
- 헤더/푸터 가시성
- 내비게이션 기능
- 폼 표시
- 시각적 회귀 (스크린샷 비교)

## 스크린샷 테스트

빠른 시각적 검증을 위한 스크립트:

```bash
# 개발 서버가 실행 중일 때
node e2e/screenshot-test.mjs

# 외부 URL 테스트
TEST_URL=https://your-url.com node e2e/screenshot-test.mjs
```

결과는 `e2e/screenshots/` 디렉토리에 생성되며, 이 산출물은 버전 관리 대상이 아닙니다.

## CI/CD 통합

GitHub Actions에서 자동으로 실행됩니다:

```yaml
# .github/workflows/e2e.yml
- push 시: main, develop 브랜치
- PR 시: main, develop 브랜치 대상
```

## 디자인 깨짐 감지

스크린샷 테스트로 다음을 감지합니다:
- CSS 변수 누락
- 레이아웃 깨짐
- 컴포넌트 렌더링 오류
- 반응형 문제

## 문제 해결

### Playwright 브라우저 설치
```bash
npx playwright install --with-deps
```

### 테스트 업데이트 (스냅샷 재생성)
```bash
npx playwright test --update-snapshots
```

### 특정 테스트만 실행
```bash
npx playwright test pages.spec.ts --grep "Home Page"
```
