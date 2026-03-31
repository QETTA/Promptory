# Design Tokens v2.0 - Polished

## 개요
ZIP 파일 템플릿 분석 결과를 바탕으로 CSS 토큰을 폴리싱하여 개선했습니다.

---

## 🎯 주요 개선사항

### 1. @tailwindcss/forms 플러그인 추가
- Contact 페이지 폼 요소 기본 스타일링 개선
- 일관된 인풋/체크박스/라디오 스타일

### 2. Spring Easing 추가 (Dotori 참고)
```css
--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
--ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
--ease-in-expo: cubic-bezier(0.7, 0, 0.84, 0);
```

### 3. 레이어드 섀도우 개선 (Primer 참고)
```css
--shadow-xs: 0 1px 2px 0 rgb(15 23 42 / 0.03);
--shadow-sm: 0 1px 3px 0 rgb(15 23 42 / 0.04), 0 1px 2px -1px rgb(15 23 42 / 0.03);
--shadow-lg: 0 10px 15px -3px rgb(15 23 42 / 0.06), 0 4px 6px -4px rgb(15 23 42 / 0.03);
--shadow-xl: 0 20px 25px -5px rgb(15 23 42 / 0.08), 0 8px 10px -6px rgb(15 23 42 / 0.04);
```

### 4. 접근성 강화 (Dotori 참고)
- **Skip Link**: 키보드 네비게이션용
- **Reduced Motion**: `prefers-reduced-motion` 미디어쿼리
- **Focus Visible**: 개선된 포커스 스타일

### 5. 새로운 토큰 추가

#### 색상 (Semantic)
- `--color-success`, `--color-warning`, `--color-error`, `--color-info`
- `--color-surface-2`, `--color-ink`, `--color-ink-soft`

#### 타이포그래피
- `--text-2xs`: 0.625rem (Commit 참고)
- `--leading-tight`, `--leading-snug`, `--leading-relaxed`

#### 여백/간격
- 체계적인 `--spacing-*` 토큰

#### z-index
- 체계적인 `--z-*` 스케일 (skip-link: 1600, toast: 1700 등)

### 6. 애니메이션 개선
- 모든 애니메이션에 Spring/Expo easing 적용
- 새로운 키프레임: `spin`, `ping`

### 7. 폼 유틸리티
```css
.form-input      /* 기본 인풋 스타일 */
.form-input-error /* 에러 상태 */
.form-label      /* 라벨 */
.form-hint       /* 도움말 */
.form-error      /* 에러 메시지 */
```

### 8. 유틸리티 확장
- `.card-elevated`: lift 효과가 있는 카드
- `.glass-dark`: 다크 모드 글래스
- `.line-clamp-1`, `.line-clamp-2`: 텍스트 제한
- `.truncate-2-lines`: 2줄 말줄임

---

## 📊 토큰 구조 변경

### AS-IS (v1.0)
```css
:root {
  --brand-50: #eef5ff;
  /* ... 단순 변수羅列 ... */
}
```

### TO-BE (v2.0)
```css
@theme {
  /* 체계적인 토큰 그룹핑 */
  --color-brand-*: ...;
  --color-slate-*: ...;
  --color-surface-*: ...;
  --font-*: ...;
  --text-*: ...;
  --leading-*: ...;
  --spacing-*: ...;
  --radius-*: ...;
  --shadow-*: ...;
  --ease-*: ...;
  --duration-*: ...;
  --z-*: ...;
}
```

---

## ✅ Type Check & Build Status

```
✅ TypeScript: 통과 (0 errors)
✅ Build: 통과 (18 pages generated)
✅ @tailwindcss/forms: 설치 완료
```

---

## 🎨 사용 예시

### Skip Link (접근성)
```tsx
// layout.tsx
<body>
  <a href="#main" className="skip-link">본문으로 이동</a>
  <main id="main">...</main>
</body>
```

### Form Input
```tsx
<input className="form-input" placeholder="이메일" />
<input className="form-input form-input-error" /> {/* 에러 상태 */}
```

### Card with Spring Animation
```tsx
<div className="card-elevated">
  {/* hover 시 spring easing으로 lift */}
</div>
```

### Typography
```tsx
<h1 className="hero-display font-display">타이틀</h1>
<p className="body-copy-lg text-ink-soft">본문</p>
<span className="eyebrow-label">서브타이틀</span>
```

---

**업데이트**: 2026-03-31
**버전**: v2.0
