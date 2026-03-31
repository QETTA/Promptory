#!/usr/bin/env python3
"""
Promptory Outreach Message Generator
Generates personalized LinkedIn DM templates for A/B/C price testing

Usage:
    python outreach_generator.py --group=A --company="주식회사 예시" --name="김대표"
    python outreach_generator.py batch --input=companies.csv --output=messages/
"""

import argparse
import csv
import json
from pathlib import Path
from typing import Dict, List
from dataclasses import dataclass


@dataclass
class OutreachMessage:
    group: str
    price: str
    subject: str
    body: str
    follow_up: str
    call_to_action: str


# Base templates with price variations
TEMPLATES = {
    "29": {
        "price_text": "29만원 (VAT 별도)",
        "value_prop": "저비용으로 사이트 문제점을 빠르게 파악",
        "urgency": "부담 없는 가격으로 시작해보세요"
    },
    "49": {
        "price_text": "49만원 (VAT 별도)",
        "value_prop": "전문가급 진단 결과를 하루 만에",
        "urgency": "이번 분기 개선안이 필요하시다면"
    },
    "79": {
        "price_text": "79만원 (VAT 별도)",
        "value_prop": "심층 분석과 실행 가능한 개선 로드맵",
        "urgency": "팀의 전략적 우선순위 재설정이 필요하다면"
    }
}


def generate_subject(company_name: str, price_group: str) -> str:
    """Generate subject line based on price group"""
    templates = {
        "29": [
            f"[{company_name}] 사이트 진단 29만원에 받아보세요",
            f"[{company_name}] 29만원으로 사이트 문제 찾기",
            f"홈페이지 개선, 29만원부터 시작하세요"
        ],
        "49": [
            f"[{company_name}] 사이트 진단 49만원에 받아보세요",
            f"[{company_name}] 마케팅팀을 위한 49만원 퀵 진단",
            f"사이트 진단 49만원 - 2일이면 결과 받아보세요"
        ],
        "79": [
            f"[{company_name}] 프리미엄 사이트 진단 79만원",
            f"[{company_name}] 심층 사이트 분석 79만원",
            f"79만원으로 사이트 전략 재정립하기"
        ]
    }
    import random
    return random.choice(templates.get(price_group, templates["49"]))


def generate_message(company_name: str, contact_name: str, 
                     contact_role: str, website_url: str,
                     price_group: str, pain_point: str = "") -> OutreachMessage:
    """Generate personalized outreach message"""
    
    price_info = TEMPLATES.get(price_group, TEMPLATES["49"])
    subject = generate_subject(company_name, price_group)
    
    # Pain point specific opening
    pain_openings = {
        "draft": f"신규 캠페인이나 사이트 개선을 준비 중이신 것 같아 연락드립니다.",
        "comparison": f"경쟁사 대비 {company_name}의 디지털 전략이 궁금했습니다.",
        "report": f"마케팅 보고용 데이터 수집에 시간이 많이 들고 계실 것 같아요.",
        "speed": f"사이트 개선이 반복적으로 밀리고 계신 것 같아 연락드립니다."
    }
    
    opening = pain_openings.get(pain_point, f"{company_name}의 홈페이지를 보다가 연락드립니다.")
    
    body = f"""안녕하세요, {contact_name}님.
{opening}

저는 중소기업 마케팅팀을 위한 "Quick Audit" 서비스를 운영 중입니다.
- 홈페이지 URL 하나로 진단 시작 ({website_url})
- 경쟁사 비교표 + CTA 개선안 + 보고용 요약
- 결과는 Slack으로 바로 전달
- 비용: 1회 {price_info['price_text']}

{price_info['value_prop']}

{price_info['urgency']}, 30분 미팅으로 어떤 결과가 나오는지 보여드릴 수 있습니다.

이번 주 목/금 중 가능하신 시간 있으실까요?

감사합니다.
Promptory 팀"""

    follow_up = f"""안녕하세요, {contact_name}님.

지난주에 보내드린 Quick Audit 관련 메시지 확인 부탁드립니다.

{company_name}의 홈페이지를 기준으로:
- 5분 내 핵심 문제점 3가지
- 경쟁사 대비 강/약점 요약
- 바로 적용 가능한 CTA 개선안

위 내용을 {price_info['price_text']}에 제공해드립니다.

혹시 이번 주 화/수 중 30분 정도 미팅 가능하실까요?

감사합니다.
Promptory 팀"""

    return OutreachMessage(
        group=price_group,
        price=price_info['price_text'],
        subject=subject,
        body=body,
        follow_up=follow_up,
        call_to_action="30분 미팅 예약 요청"
    )


def generate_proposal_template(company_name: str, website_url: str, 
                               price_group: str) -> str:
    """Generate proposal document template"""
    
    price_info = TEMPLATES.get(price_group, TEMPLATES["49"])
    
    proposal = f"""# {company_name} Promptory Quick Audit Pack 제안서

**작성일**: {get_today_date()}  
**대상**: {company_name} ({website_url})  
**제안 가격**: {price_info['price_text']}

---

## 1. 진단 범위

### 1.1 사이트 품질 진단
- **대상 URL**: {website_url}
- **분석 항목**: UX 흐름, CTA 최적화, 메시지 명확성, 모바일 대응
- **산출물**: 문제점 리스트 + 우선순위 매트릭스

### 1.2 경쟁사 비교 분석
- **비교 대상**: 유사 산업군 2-3社 (공개 정보 기반)
- **비교 항목**: 디자인, 메시지, CTA, 차별화 포인트
- **산출물**: 비교표 (PDF + Slack 공유)

### 1.3 개선안 제시
- **CTA 개선안**: 3가지 버전 (보수적/중간/공격적)
- **메시지 최적화**: 헤드라인/서브헤드라인 제안
- **우선순위 로드맵**: 단기(1주)/중기(1개월)/장기(분기)

---

## 2. 결과물 상세

| 산출물 | 형식 | 용도 |
|--------|------|------|
| 비교표 | PDF + Slack | 내부 보고, 팀 공유 |
| CTA 개선안 | Slack 메시지 | 바로 적용 가능 |
| 요약 보고서 | PDF | 임원/팀장용 |
| 체크리스트 | Slack | 후속 실행용 |

---

## 3. 비용 및 일정

### 3.1 비용
- **Quick Audit**: {price_info['price_text']}
- **결제 조건**: 계약 후 100% 선불 (Toss Payments)
- **환불 정책**: 결과물에 만족하지 못하면 100% 환불

### 3.2 일정
- **Kickoff**: 계약 후 바로
- **URL 수신**: 계약일 D+0
- **결과물 전달**: D+2 영업일
- **보완/질문**: D+5 영업일까지

---

## 4. 다음 단계 (Core Package)

Quick Audit 완료 후 Core Package 업그레이드 가능:

**Core Package 구성**:
- 사이트 개선 실행 (리디자인/카피라이팅)
- 캠페인 워크플로우 구축 (자동화 포함)
- 주간/월간 보고 템플릿 세팅
- 비용: 구축 300만원 + 월 79만원

**예상 업그레이드 시점**: Audit 완료 후 2-4주

---

## 5. 특약 사항

1. **기밀 유지**: 분석 내용은 {company_name}와 Promptory 간 기밀로 처리
2. **데이터 사용**: 경쟁사 정보는 공개 소스만 사용
3. **환불 보장**: 결과물에 만족하지 못하면 100% 환불 (결과물 전달 후 7일 이내)
4. **소유권**: 산출물의 지식재산권은 {company_name}에게 귀속

---

## 6. 승인

| 항목 | 내용 |
|------|------|
| 프로젝트명 | {company_name} Quick Audit Pack |
| 금액 | {price_info['price_text']} |
| 일정 | {get_today_date()} ~ {get_delivery_date()} |
| 담당자 | Promptory 팀 |

**계약일**: _______________  
**서명**: _______________

---

Promptory  
contact@promptory.ai  
https://promptory.ai
"""
    return proposal


def get_today_date():
    from datetime import date
    return date.today().strftime("%Y년 %m월 %d일")


def get_delivery_date():
    from datetime import date, timedelta
    delivery = date.today() + timedelta(days=5)
    return delivery.strftime("%Y년 %m월 %d일")


def process_csv_batch(input_file: str, output_dir: str):
    """Process CSV file and generate messages for each company"""
    output_path = Path(output_dir)
    output_path.mkdir(exist_ok=True)
    
    results = []
    
    with open(input_file, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            company_name = row.get('company_name', '')
            contact_name = row.get('contact_name', '')
            contact_role = row.get('contact_role', '')
            website_url = row.get('website_url', '')
            price_group = row.get('price_group', '49')
            pain_point = row.get('pain_point', '')
            
            if not all([company_name, contact_name, website_url]):
                continue
            
            message = generate_message(
                company_name=company_name,
                contact_name=contact_name,
                contact_role=contact_role,
                website_url=website_url,
                price_group=price_group,
                pain_point=pain_point
            )
            
            # Save individual message
            safe_name = company_name.replace(' ', '_').replace('/', '_')
            msg_file = output_path / f"{safe_name}_{price_group}만.txt"
            
            content = f"""제목: {message.subject}

--- 초기 메시지 ---

{message.body}

--- 팔로업 메시지 ---

{message.follow_up}

--- CTA ---
{message.call_to_action}
"""
            
            with open(msg_file, 'w', encoding='utf-8') as f:
                f.write(content)
            
            # Generate proposal
            proposal = generate_proposal_template(
                company_name=company_name,
                website_url=website_url,
                price_group=price_group
            )
            
            proposal_file = output_path / f"{safe_name}_{price_group}만_제안서.md"
            with open(proposal_file, 'w', encoding='utf-8') as f:
                f.write(proposal)
            
            results.append({
                'company': company_name,
                'group': price_group,
                'message_file': str(msg_file),
                'proposal_file': str(proposal_file)
            })
    
    # Generate summary
    summary_file = output_path / "_summary.json"
    with open(summary_file, 'w', encoding='utf-8') as f:
        json.dump(results, f, ensure_ascii=False, indent=2)
    
    print(f"✅ Generated {len(results)} message sets")
    print(f"   Output directory: {output_path}")
    print(f"   Summary: {summary_file}")


def main():
    parser = argparse.ArgumentParser(description='Generate outreach messages for validation experiment')
    parser.add_argument('--group', choices=['29', '49', '79'], default='49',
                       help='Price group (default: 49)')
    parser.add_argument('--company', required=True, help='Company name')
    parser.add_argument('--name', required=True, help='Contact name')
    parser.add_argument('--role', default='마케팅리드', help='Contact role')
    parser.add_argument('--website', required=True, help='Company website URL')
    parser.add_argument('--pain', default='', choices=['draft', 'comparison', 'report', 'speed', ''],
                       help='Pain point type')
    parser.add_argument('--batch', action='store_true', help='Batch mode with CSV')
    parser.add_argument('--input', help='Input CSV file for batch mode')
    parser.add_argument('--output', default='outreach_messages', help='Output directory')
    
    args = parser.parse_args()
    
    if args.batch:
        if not args.input:
            print("❌ Batch mode requires --input CSV file")
            return
        process_csv_batch(args.input, args.output)
    else:
        message = generate_message(
            company_name=args.company,
            contact_name=args.name,
            contact_role=args.role,
            website_url=args.website,
            price_group=args.group,
            pain_point=args.pain
        )
        
        print(f"\n{'='*60}")
        print(f"제목: {message.subject}")
        print(f"{'='*60}\n")
        print(message.body)
        print(f"\n{'='*60}")
        print("팔로업 메시지:")
        print(f"{'='*60}\n")
        print(message.follow_up)


if __name__ == "__main__":
    main()
