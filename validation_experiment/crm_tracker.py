#!/usr/bin/env python3
"""
Promptory Quick Audit Validation Experiment - CRM Tracker
Manages 60-company outreach with A/B/C price testing

Usage:
    python crm_tracker.py init              # Initialize database
    python crm_tracker.py add-company     # Add single company interactively
    python crm_tracker.py import-csv      # Import from CSV
    python crm_tracker.py list --group=A  # List companies by group
    python crm_tracker.py update --id=1   # Update company status
    python crm_tracker.py report          # Generate experiment report
    python crm_tracker.py export          # Export to CSV for analysis
"""

import json
import csv
import sys
import random
from datetime import datetime, date
from pathlib import Path
from typing import List, Dict, Optional
from dataclasses import dataclass, asdict
from enum import Enum

DATA_FILE = Path(__file__).parent / "experiment_data.json"


class PriceGroup(Enum):
    A = "29"    # 29만원 그룹
    B = "49"    # 49만원 그룹 (채택 목표)
    C = "79"    # 79만원 그룹


class CompanyStatus(Enum):
    IDENTIFIED = "identified"      # 타겟 선정
    CONTACTED = "contacted"      # 아웃리치 발송
    RESPONDED = "responded"        # 반응 있음
    MEETING_SCHEDULED = "meeting_scheduled"  # 미팅 예약
    MEETING_DONE = "meeting_done" # 미팅 완료
    PROPOSAL_SENT = "proposal_sent"  # 제안서 발송
    NEGOTIATING = "negotiating"    # 협상 중
    WON = "won"                    # 계약 체결
    LOST = "lost"                  # 계약 실패
    NURTURE = "nurture"            # 장기 육성


@dataclass
class Company:
    id: int
    name: str
    industry: str
    size: str  # "20-50", "50-100", etc.
    contact_name: str
    contact_role: str
    linkedin_url: str
    website_url: str
    price_group: str
    status: str
    contacted_date: Optional[str] = None
    meeting_date: Optional[str] = None
    proposal_date: Optional[str] = None
    close_date: Optional[str] = None
    deal_value: Optional[int] = None  # 만원 단위
    close_probability: int = 0  # 0-100
    core_upsell_intent: int = 0  # 0-10
    pain_point: str = ""  # draft/comparison/report/etc
    next_action: str = ""
    notes: str = ""
    created_at: str = ""
    updated_at: str = ""


class ExperimentCRM:
    def __init__(self, data_file: Path = DATA_FILE):
        self.data_file = data_file
        self.companies: List[Company] = []
        self.next_id = 1
        self.load()

    def load(self):
        if self.data_file.exists():
            with open(self.data_file, 'r', encoding='utf-8') as f:
                data = json.load(f)
                self.next_id = data.get('next_id', 1)
                self.companies = [Company(**c) for c in data.get('companies', [])]

    def save(self):
        data = {
            'next_id': self.next_id,
            'companies': [asdict(c) for c in self.companies],
            'updated_at': datetime.now().isoformat()
        }
        with open(self.data_file, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)

    def add_company(self, company: Company) -> Company:
        company.id = self.next_id
        self.next_id += 1
        company.created_at = datetime.now().isoformat()
        company.updated_at = company.created_at
        self.companies.append(company)
        self.save()
        return company

    def get_company(self, company_id: int) -> Optional[Company]:
        for c in self.companies:
            if c.id == company_id:
                return c
        return None

    def update_company(self, company_id: int, updates: Dict) -> Optional[Company]:
        company = self.get_company(company_id)
        if company:
            for key, value in updates.items():
                if hasattr(company, key):
                    setattr(company, key, value)
            company.updated_at = datetime.now().isoformat()
            self.save()
        return company

    def list_by_group(self, group: Optional[str] = None) -> List[Company]:
        if group:
            return [c for c in self.companies if c.price_group == group]
        return self.companies

    def list_by_status(self, status: str) -> List[Company]:
        return [c for c in self.companies if c.status == status]

    def assign_price_groups(self):
        """Assign A/B/C price groups randomly to unassigned companies"""
        unassigned = [c for c in self.companies if not c.price_group]
        groups = ["29", "49", "79"] * (len(unassigned) // 3 + 1)
        random.shuffle(groups)

        for company, group in zip(unassigned, groups):
            company.price_group = group
            company.updated_at = datetime.now().isoformat()

        self.save()
        return len(unassigned)

    def get_funnel_metrics(self) -> Dict:
        """Calculate funnel metrics by price group"""
        metrics = {
            "29": self._calc_group_metrics("29"),
            "49": self._calc_group_metrics("49"),
            "79": self._calc_group_metrics("79"),
            "total": self._calc_group_metrics(None)
        }
        return metrics

    def _calc_group_metrics(self, group: Optional[str]) -> Dict:
        companies = self.list_by_group(group) if group else self.companies
        total = len(companies)
        if total == 0:
            return {"total": 0}

        contacted = len([c for c in companies if c.contacted_date])
        meetings = len([c for c in companies if c.meeting_date])
        proposals = len([c for c in companies if c.proposal_date])
        won = len([c for c in companies if c.status == "won"])
        lost = len([c for c in companies if c.status == "lost"])

        revenue = sum(c.deal_value or 0 for c in companies if c.status == "won")

        return {
            "total": total,
            "contacted": contacted,
            "contact_rate": round(contacted / total * 100, 1) if total > 0 else 0,
            "meetings": meetings,
            "meeting_rate": round(meetings / contacted * 100, 1) if contacted > 0 else 0,
            "proposals": proposals,
            "proposal_rate": round(proposals / meetings * 100, 1) if meetings > 0 else 0,
            "won": won,
            "lost": lost,
            "win_rate": round(won / (won + lost) * 100, 1) if (won + lost) > 0 else 0,
            "revenue": revenue,
            "conversion_rate": round(won / total * 100, 1) if total > 0 else 0
        }

    def export_csv(self, output_path: str):
        """Export to CSV for external analysis"""
        if not self.companies:
            return

        fieldnames = list(asdict(self.companies[0]).keys())
        with open(output_path, 'w', newline='', encoding='utf-8-sig') as f:
            writer = csv.DictWriter(f, fieldnames=fieldnames)
            writer.writeheader()
            for company in self.companies:
                writer.writerow(asdict(company))

    def generate_report(self) -> str:
        """Generate text report"""
        metrics = self.get_funnel_metrics()

        report = []
        report.append("=" * 60)
        report.append("Promptory Quick Audit Validation Report")
        report.append(f"Generated: {datetime.now().strftime('%Y-%m-%d %H:%M')}")
        report.append("=" * 60)
        report.append("")

        for group_name, group_metrics in metrics.items():
            report.append(f"[Price Group: {group_name}만원]")
            report.append(f"  Total Companies: {group_metrics['total']}")
            report.append(f"  Contacted: {group_metrics['contacted']} ({group_metrics.get('contact_rate', 0)}%)")
            report.append(f"  Meetings: {group_metrics['meetings']} ({group_metrics.get('meeting_rate', 0)}%)")
            report.append(f"  Proposals: {group_metrics['proposals']} ({group_metrics.get('proposal_rate', 0)}%)")
            report.append(f"  Won: {group_metrics['won']} | Lost: {group_metrics['lost']}")
            report.append(f"  Win Rate: {group_metrics.get('win_rate', 0)}%")
            report.append(f"  Revenue: {group_metrics['revenue']}만원")
            report.append(f"  Overall Conversion: {group_metrics.get('conversion_rate', 0)}%")
            report.append("")

        report.append("-" * 60)
        report.append("Statistical Significance (Target: 95% confidence)")

        g29 = metrics["29"]["conversion_rate"]
        g49 = metrics["49"]["conversion_rate"]
        g79 = metrics["79"]["conversion_rate"]

        report.append(f"  29만원 그룹 전환율: {g29}%")
        report.append(f"  49만원 그룹 전환율: {g49}%")
        report.append(f"  79만원 그룹 전환율: {g79}%")

        if g49 >= 15:
            report.append(f"  ✅ 49만원 그룹: 목표 전환율(15%+) 달성")
        else:
            report.append(f"  ⚠️ 49만원 그룹: 목표 미달({g49}% < 15%)")

        return "\n".join(report)


def interactive_add_company(crm: ExperimentCRM):
    """Interactive company addition"""
    print("\n=== Add New Company ===")
    company = Company(
        id=0,  # Will be assigned
        name=input("Company Name: "),
        industry=input("Industry (B2B SaaS/제조/컨설팅/etc): "),
        size=input("Company Size (20-50/50-100/100+): "),
        contact_name=input("Contact Name: "),
        contact_role=input("Contact Role (마케팅리드/사업기획/etc): "),
        linkedin_url=input("LinkedIn URL: "),
        website_url=input("Website URL: "),
        price_group="",  # Will be assigned randomly
        status="identified",
        pain_point=input("Pain Point (draft/comparison/report/etc): ")
    )

    added = crm.add_company(company)
    print(f"\n✅ Added company #{added.id}: {added.name}")
    print(f"   Price group will be assigned when you run 'assign-groups'")


def interactive_update(crm: ExperimentCRM, company_id: int):
    """Interactive company update"""
    company = crm.get_company(company_id)
    if not company:
        print(f"❌ Company #{company_id} not found")
        return

    print(f"\n=== Update Company #{company_id}: {company.name} ===")
    print(f"Current status: {company.status}")
    print(f"Current group: {company.price_group}만원")
    print("\nFields to update (press Enter to keep current value):")

    updates = {}

    new_status = input(f"Status [{company.status}]: ").strip()
    if new_status:
        updates['status'] = new_status

    if not company.contacted_date:
        contacted = input("Contacted today? (y/n): ").strip().lower()
        if contacted == 'y':
            updates['contacted_date'] = date.today().isoformat()

    if not company.meeting_date and company.status != "meeting_done":
        meeting = input("Meeting completed today? (y/n): ").strip().lower()
        if meeting == 'y':
            updates['meeting_date'] = date.today().isoformat()
            updates['status'] = 'meeting_done'

    proposal = input("Proposal sent today? (y/n): ").strip().lower()
    if proposal == 'y':
        updates['proposal_date'] = date.today().isoformat()

    deal_won = input("Deal won? (y/n): ").strip().lower()
    if deal_won == 'y':
        updates['status'] = 'won'
        updates['close_date'] = date.today().isoformat()
        value = input("Deal value (만원): ").strip()
        if value:
            updates['deal_value'] = int(value)

    deal_lost = input("Deal lost? (y/n): ").strip().lower()
    if deal_lost == 'y':
        updates['status'] = 'lost'

    notes = input(f"Notes [{company.notes}]: ").strip()
    if notes:
        updates['notes'] = notes

    if updates:
        crm.update_company(company_id, updates)
        print(f"\n✅ Updated company #{company_id}")
    else:
        print("\nℹ️ No changes made")


def main():
    if len(sys.argv) < 2:
        print(__doc__)
        sys.exit(1)

    command = sys.argv[1]
    crm = ExperimentCRM()

    if command == "init":
        print("✅ CRM initialized")
        print(f"   Data file: {DATA_FILE}")

    elif command == "add-company":
        interactive_add_company(crm)

    elif command == "list":
        group = None
        for arg in sys.argv[2:]:
            if arg.startswith("--group="):
                group = arg.split("=")[1]

        companies = crm.list_by_group(group)
        if group:
            print(f"\n=== Companies in {group}만원 group ({len(companies)}) ===")
        else:
            print(f"\n=== All Companies ({len(companies)}) ===")

        for c in companies:
            status_icon = "✅" if c.status == "won" else "❌" if c.status == "lost" else "⏳"
            print(f"  #{c.id}: {c.name} [{c.price_group}만원] {status_icon} {c.status}")

    elif command == "update":
        company_id = None
        for arg in sys.argv[2:]:
            if arg.startswith("--id="):
                company_id = int(arg.split("=")[1])

        if company_id is None:
            print("❌ Usage: python crm_tracker.py update --id=1")
            sys.exit(1)

        interactive_update(crm, company_id)

    elif command == "assign-groups":
        count = crm.assign_price_groups()
        print(f"✅ Assigned price groups to {count} companies")
        print("   Distribution: 29만원, 49만원, 79만원 (randomized)")

    elif command == "report":
        print(crm.generate_report())

    elif command == "export":
        output_path = sys.argv[2] if len(sys.argv) > 2 else "experiment_export.csv"
        crm.export_csv(output_path)
        print(f"✅ Exported to {output_path}")

    elif command == "metrics":
        metrics = crm.get_funnel_metrics()
        import json
        print(json.dumps(metrics, ensure_ascii=False, indent=2))

    else:
        print(__doc__)


if __name__ == "__main__":
    main()
