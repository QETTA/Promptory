# Promptory Quick Audit 검증 실험 실행 가이드

**버전**: 2026.03.31  
**실험 기간**: 2주 (10영업일) + 1주 분석  
**목표**: 60개 업체 아웃리치 → 15%+ 전환율 검증

---

## 🚀 빠른 시작

### 1. 실험 환경 설정

```bash
cd /home/user/webapp/validation_experiment

# 1) 데이터베이스 초기화
python crm_tracker.py init

# 2) 샘플 데이터 로드 (또는 직접 추가)
python crm_tracker.py import-csv sample_companies.csv

# 3) 가격 그룹 무작위 할당
python crm_tracker.py assign-groups

# 4) 현황 확인
python dashboard.py
```

### 2. 첫 번째 아웃리치

```bash
# 회사 정보 입력 → 메시지 자동 생성
python outreach_generator.py \
  --group=49 \
  --company="주식회사 알파테크" \
  --name="김민수" \
  --role="마케팅리드" \
  --website="https://alphatech.co.kr" \
  --pain=draft
```

---

## 📅 2주 실험 일정

### Week 1: 준비 및 집중 아웃리치

| 일자 | 활동 | 산출물 | 명령어/도구 |
|------|------|--------|-------------|
| **월** | 60개 타겟 리스트업 | `companies.csv` | 수동 입력 또는 `crm_tracker.py add-company` |
| **화** | 그룹 할당 + 아웃리치 20개 | DM 발송 기록 | `crm_tracker.py assign-groups` |
| **수** | 아웃리치 20개 추가 |  | `outreach_generator.py` |
| **목** | 아웃리치 20개 완료 |  | `crm_tracker.py update --id=X` |
| **금** | 미팅 2-3건 진행 | 미팅 노트 |  |

### Week 2: 전환 및 클로징

| 일자 | 활동 | 산출물 |
|------|------|--------|
| **월** | 미팅 3-4건, 제안서 발송 | 제안서 2부 |
| **화** | 제안서 발송 3건 | 협상 로그 |
| **수** | 결제 유도 | Toss 결제 완료 |
| **목** | 핫리드 추가 미팅 |  |
| **금** | 데이터 정리, 인터뷰 | 인터뷰 노트 |

### Week 3: 분석 및 결정

| 활동 | 결과 |
|------|------|
| 대시보드 분석 | `dashboard.py --html` |
| 그룹별 전환율 비교 | `crm_tracker.py report` |
| Go/No-Go 결정 | Pivot/Persevere/Accelerate |

---

## 🛠️ 도구 사용법

### CRM 트래커

```bash
# 회사 추가 (대화형)
python crm_tracker.py add-company

# 리스트 조회 (전체 또는 그룹별)
python crm_tracker.py list
python crm_tracker.py list --group=49

# 상태 업데이트 (대화형)
python crm_tracker.py update --id=1

# CSV보내기
python crm_tracker.py export experiment_data.csv
```

### 아웃리치 생성기

```bash
# 단일 메시지 생성
python outreach_generator.py \
  --group=49 \
  --company="회사명" \
  --name="담당자" \
  --website="https://..." \
  --pain=draft

# 배치 처리 (CSV 입력)
python outreach_generator.py batch \
  --input=companies.csv \
  --output=messages/
```

### 대시보드

```bash
# 콘솔 대시보드
python dashboard.py

# JSON 데이터 추출
python dashboard.py --export

# HTML 보고서 생성
python dashboard.py --html
```

---

## 📊 데이터 구조

### 회사 정보 (Company Schema)

```json
{
  "id": 1,
  "name": "주식회사 예시",
  "industry": "B2B SaaS",
  "size": "20-50",
  "contact_name": "김대표",
  "contact_role": "마케팅리드",
  "linkedin_url": "https://linkedin.com/in/...",
  "website_url": "https://...",
  "price_group": "49",
  "status": "contacted",
  "contacted_date": "2026-03-31",
  "meeting_date": null,
  "proposal_date": null,
  "close_date": null,
  "deal_value": 49,
  "close_probability": 50,
  "core_upsell_intent": 7,
  "pain_point": "draft",
  "next_action": "Send follow-up",
  "notes": "Slack user confirmed"
}
```

### 단계별 Status

| Status | 의미 | 다음 단계 |
|--------|------|----------|
| `identified` | 타겟 선정 | 아웃리치 발송 |
| `contacted` | 연락 발송 | 반응 대기 |
| `responded` | 반응 있음 | 미팅 예약 |
| `meeting_scheduled` | 미팅 예약 | 미팅 진행 |
| `meeting_done` | 미팅 완료 | 제안서 발송 |
| `proposal_sent` | 제안서 발송 | 협상/결제 |
| `negotiating` | 협상 중 | 최종 계약 |
| `won` | 계약 성공 | Core 업셀 |
| `lost` | 계약 실패 | 장기 육성 |
| `nurture` | 장기 육성 | 정기 팔로우업 |

---

## 💰 가격 A/B/C 테스트

### 그룹 구성

- **Group A (29만원)**: 진입 가격 테스트, 고객 확보 우선
- **Group B (49만원)**: 목표 가격, 수익성 + 전환율 균형
- **Group C (79만원)**: 프리미엄 포지셔닝 테스트

### 무작위화

```bash
# 자동 무작위 할당 (1/3씩)
python crm_tracker.py assign-groups

# 수동 조정이 필요한 경우
python crm_tracker.py update --id=5
# → price_group을 29/49/79 중 선택
```

---

## 📈 핵심 지표 체크포인트

### 일일 체크포인트

```bash
# 매일 아침 실행
python dashboard.py
```

확인 사항:
- [ ] 새로운 반응 (responded) 체크
- [ ] 미팅 예약 필요 리스트
- [ ] 팔로업 필요 리스트 (contacted 3일+)
- [ ] 제안서 발송 후 5일+ (협상 중)

### 주간 체크포인트 (금요일)

- [ ] Week 목표 대비 실적 비교
- [ ] 다음 주 미팅 예 확보 (최소 3건)
- [ ] 제안서 발송 대상 선정

---

## 🎯 성공/실패 기준

### 최소 성공 (Go)

| 지표 | 기준 | 현재 상황 확인 |
|------|------|----------------|
| 총 미팅 | 10건 | `dashboard.py` |
| Paid Audit | 2건 | `crm_tracker.py list --status=won` |
| 49만원 그룹 전환 | 10%+ | 대시보드 비교 섹션 |

### 완전 성공 (Accelerate)

| 지표 | 기준 |
|------|------|
| 총 미팅 | 15건+ |
| Paid Audit | 5건+ |
| 49만원 그룹 전환 | 20%+ |
| Core 업셀 상담 | 2건+ |

### 실패/피벗 (Pivot)

| 상황 | 조치 |
|------|------|
| 모든 그룹 10% 미만 | 타겟 수정 (50-200인) |
| 29만원만 성공 | 29만원으로 진입 가격 확정 |
| 79만원도 15%+ | 프리미엄 포지셔닝 테스트 |

---

## 📝 아웃리치 템플릿

### LinkedIn DM 기본 구조

```
제목: [{회사명}] 사이트 진단 {가격}만원에 받아보세요

안녕하세요, {이름}님.
{Pain Point 기반 오프닝}

저는 중소기업 마케팅팀을 위한 "Quick Audit" 서비스를 운영 중입니다.
- 홈페이지 URL 하나로 진단 시작
- 경쟁사 비교표 + CTA 개선안 + 보고용 요약
- 결과는 Slack으로 바로 전달
- 비용: 1회 {가격}만원 (VAT 별도)

{가격별 Value Prop}

{가격별 Urgency}, 30분 미팅으로 어떤 결과가 나오는지 보여드릴 수 있습니다.

이번 주 목/금 중 가능하신 시간 있으실까요?

감사합니다.
Promptory 팀
```

### Pain Point별 오프닝

| Pain Point | 오프닝 문구 |
|------------|-------------|
| `draft` | 신규 캠페인이나 사이트 개선을 준비 중이신 것 같아 연락드립니다. |
| `comparison` | 경쟁사 대비 {회사명}의 디지털 전략이 궁금했습니다. |
| `report` | 마케팅 보고용 데이터 수집에 시간이 많이 들고 계실 것 같아요. |
| `speed` | 사이트 개선이 반복적으로 밀리고 계신 것 같아 연락드립니다. |

---

## 🔧 문제 해결

### 자주 발생하는 문제

| 문제 | 해결 방법 |
|------|----------|
| 데이터 파일 없음 | `python crm_tracker.py init` |
| 그룹 미할당 | `python crm_tracker.py assign-groups` |
| CSV 인코딩 문제 | UTF-8 with BOM 사용 |
| 미팅 중복 예약 | `crm_tracker.py list`로 확인 |

### 백업

```bash
# 매일 백업 권장
cp experiment_data.json backup/experiment_$(date +%Y%m%d).json
```

---

## 📞 지원

- **Slack 알림**: `/contact` 폼 제출 시 자동 알림
- **결제 완료**: Toss Payments 웹훅 → Slack #sales 채널
- **기술 지원**: 팀 Slack #validation 채널

---

**마지막 업데이트**: 2026.03.31  
**다음 검토**: Week 2 종료 후 (2026.04.14 예정)
