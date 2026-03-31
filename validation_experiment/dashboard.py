#!/usr/bin/env python3
"""
Promptory Validation Experiment Dashboard
Real-time metrics and visualization for A/B/C price testing

Usage:
    python dashboard.py              # Show current metrics
    python dashboard.py --serve      # Start web dashboard (if flask installed)
    python dashboard.py --export    # Export JSON for external tools
"""

import json
import sys
from pathlib import Path
from datetime import datetime, timedelta
from typing import Dict, List
from crm_tracker import ExperimentCRM, DATA_FILE


class ExperimentDashboard:
    def __init__(self, crm: ExperimentCRM = None):
        self.crm = crm or ExperimentCRM()

    def get_summary(self) -> Dict:
        """Get overall experiment summary"""
        companies = self.crm.companies
        total = len(companies)
        
        if total == 0:
            return {"status": "no_data", "message": "No companies in system"}
        
        # Count by status
        status_counts = {}
        for c in companies:
            status_counts[c.status] = status_counts.get(c.status, 0) + 1
        
        # Calculate revenue
        revenue = sum(c.deal_value or 0 for c in companies if c.status == "won")
        
        # Funnel metrics
        contacted = len([c for c in companies if c.contacted_date])
        meetings = len([c for c in companies if c.meeting_date])
        proposals = len([c for c in companies if c.proposal_date])
        won = status_counts.get("won", 0)
        lost = status_counts.get("lost", 0)
        
        # Pipeline value
        pipeline = sum(
            (c.deal_value or 0) * (c.close_probability or 0) / 100
            for c in companies
            if c.status in ["meeting_done", "proposal_sent", "negotiating"]
        )
        
        # Days since start
        if companies:
            first_contact = min(
                (c.contacted_date for c in companies if c.contacted_date),
                default=None
            )
            days_running = (
                (datetime.now() - datetime.fromisoformat(first_contact)).days
                if first_contact else 0
            )
        else:
            days_running = 0
        
        return {
            "status": "active",
            "experiment_days": days_running,
            "total_companies": total,
            "by_status": status_counts,
            "funnel": {
                "contacted": contacted,
                "meetings": meetings,
                "proposals": proposals,
                "won": won,
                "lost": lost
            },
            "conversion_rates": {
                "contact_to_meeting": round(meetings / contacted * 100, 1) if contacted else 0,
                "meeting_to_proposal": round(proposals / meetings * 100, 1) if meetings else 0,
                "proposal_to_win": round(won / (won + lost) * 100, 1) if (won + lost) else 0,
                "overall": round(won / total * 100, 1) if total else 0
            },
            "financial": {
                "revenue_won": revenue,
                "pipeline_value": round(pipeline, 0),
                "avg_deal_size": round(revenue / won, 0) if won else 0
            },
            "price_group_comparison": self._get_price_comparison()
        }

    def _get_price_comparison(self) -> Dict:
        """Compare metrics across price groups"""
        comparison = {}
        for group in ["29", "49", "79"]:
            companies = self.crm.list_by_group(group)
            if not companies:
                continue
                
            total = len(companies)
            contacted = len([c for c in companies if c.contacted_date])
            meetings = len([c for c in companies if c.meeting_date])
            won = len([c for c in companies if c.status == "won"])
            lost = len([c for c in companies if c.status == "lost"])
            revenue = sum(c.deal_value or 0 for c in companies if c.status == "won")
            
            comparison[group] = {
                "total": total,
                "contacted": contacted,
                "meetings": meetings,
                "won": won,
                "lost": lost,
                "revenue": revenue,
                "win_rate": round(won / (won + lost) * 100, 1) if (won + lost) else 0,
                "conversion": round(won / total * 100, 1) if total else 0
            }
        
        return comparison

    def print_dashboard(self):
        """Print formatted dashboard to console"""
        summary = self.get_summary()
        
        if summary["status"] == "no_data":
            print("\n⚠️  No data available. Run 'python crm_tracker.py init' first.")
            return
        
        print("\n" + "=" * 70)
        print(f"📊 PROMTORY QUICK AUDIT VALIDATION DASHBOARD")
        print(f"   Last updated: {datetime.now().strftime('%Y-%m-%d %H:%M')}")
        print("=" * 70)
        
        # Overview
        print(f"\n🎯 OVERVIEW (Day {summary['experiment_days']})")
        print(f"   Total Companies: {summary['total_companies']}")
        print(f"   Revenue Closed: {summary['financial']['revenue_won']}만원")
        print(f"   Pipeline Value: {summary['financial']['pipeline_value']}만원")
        
        # Status breakdown
        print(f"\n📋 STATUS BREAKDOWN")
        for status, count in summary['by_status'].items():
            emoji = {
                "won": "✅", "lost": "❌", "identified": "📌",
                "contacted": "📧", "responded": "👀", 
                "meeting_scheduled": "📅", "meeting_done": "🤝",
                "proposal_sent": "📄", "negotiating": "⚖️"
            }.get(status, "⏳")
            print(f"   {emoji} {status}: {count}")
        
        # Funnel
        print(f"\n🔄 FUNNEL")
        funnel = summary['funnel']
        print(f"   📧 Contacted:     {funnel['contacted']}")
        print(f"   🤝 Meetings:      {funnel['meetings']}")
        print(f"   📄 Proposals:     {funnel['proposals']}")
        print(f"   ✅ Won:           {funnel['won']}")
        print(f"   ❌ Lost:          {funnel['lost']}")
        
        # Conversion rates
        print(f"\n📈 CONVERSION RATES")
        rates = summary['conversion_rates']
        print(f"   Contact → Meeting:    {rates['contact_to_meeting']}%")
        print(f"   Meeting → Proposal:   {rates['meeting_to_proposal']}%")
        print(f"   Proposal → Win:     {rates['proposal_to_win']}%")
        print(f"   Overall:            {rates['overall']}%")
        
        # Price group comparison
        print(f"\n💰 PRICE GROUP COMPARISON")
        print(f"   {'Group':<8} {'Total':<8} {'Won':<6} {'Win Rate':<10} {'Revenue':<10}")
        print(f"   {'-'*7} {'-'*7} {'-'*5} {'-'*9} {'-'*9}")
        for group, data in summary['price_group_comparison'].items():
            print(f"   {group}만원   {data['total']:<8} {data['won']:<6} {data['win_rate']:<10} {data['revenue']}만원")
        
        # Hypothesis check
        print(f"\n🧪 HYPOTHESIS CHECK")
        g49 = summary['price_group_comparison'].get('49', {})
        conv_49 = g49.get('conversion', 0)
        
        if conv_49 >= 15:
            print(f"   ✅ H1 PASS: 49만원 그룹 전환율 {conv_49}% >= 15%")
        else:
            print(f"   ⚠️  H1 CHECK: 49만원 그룹 전환율 {conv_49}% < 15%")
        
        # Next actions
        print(f"\n📌 NEXT ACTIONS")
        nurturing = [c for c in self.crm.companies if c.status in ['responded', 'meeting_scheduled']]
        if nurturing:
            print(f"   • Follow up with {len(nurturing)} leads needing attention")
        
        no_meeting = [c for c in self.crm.companies if c.status == 'contacted' and not c.meeting_date]
        if no_meeting:
            print(f"   • Send follow-up to {len(no_meeting)} contacts (no meeting yet)")
        
        proposals_out = [c for c in self.crm.companies if c.status == 'proposal_sent']
        if proposals_out:
            print(f"   • Chase {len(proposals_out)} outstanding proposals")
        
        print("\n" + "=" * 70)
        print("Use 'python crm_tracker.py list' for company details")
        print("Use 'python crm_tracker.py report' for full report")
        print("=" * 70 + "\n")

    def export_json(self, output_file: str = "dashboard_data.json"):
        """Export dashboard data as JSON"""
        data = self.get_summary()
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        print(f"✅ Exported to {output_file}")


def generate_html_dashboard(dashboard: ExperimentDashboard) -> str:
    """Generate HTML dashboard for web viewing"""
    data = dashboard.get_summary()
    
    # Simple HTML template
    html = f"""<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Promptory Validation Dashboard</title>
    <style>
        body {{ font-family: -apple-system, system-ui, sans-serif; margin: 40px; background: #f5f5f5; }}
        .container {{ max-width: 1200px; margin: 0 auto; }}
        .header {{ background: #1a1a2e; color: white; padding: 30px; border-radius: 10px; margin-bottom: 20px; }}
        .card {{ background: white; padding: 20px; border-radius: 10px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }}
        .metric-row {{ display: flex; gap: 20px; flex-wrap: wrap; }}
        .metric {{ flex: 1; min-width: 150px; text-align: center; padding: 20px; background: #f8f9fa; border-radius: 8px; }}
        .metric-value {{ font-size: 32px; font-weight: bold; color: #1a1a2e; }}
        .metric-label {{ font-size: 14px; color: #666; margin-top: 5px; }}
        .price-table {{ width: 100%; border-collapse: collapse; }}
        .price-table th, .price-table td {{ padding: 12px; text-align: left; border-bottom: 1px solid #eee; }}
        .price-table th {{ background: #f8f9fa; font-weight: 600; }}
        .success {{ color: #22c55e; }}
        .warning {{ color: #f59e0b; }}
        .danger {{ color: #ef4444; }}
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>📊 Promptory Quick Audit Validation</h1>
            <p>Last updated: {datetime.now().strftime('%Y-%m-%d %H:%M')}</p>
        </div>
        
        <div class="card">
            <h2>🎯 Overview</h2>
            <div class="metric-row">
                <div class="metric">
                    <div class="metric-value">{data['total_companies']}</div>
                    <div class="metric-label">Total Companies</div>
                </div>
                <div class="metric">
                    <div class="metric-value">{data['funnel']['won']}</div>
                    <div class="metric-label">Deals Won</div>
                </div>
                <div class="metric">
                    <div class="metric-value">{data['financial']['revenue_won']}만</div>
                    <div class="metric-label">Revenue</div>
                </div>
                <div class="metric">
                    <div class="metric-value">{data['conversion_rates']['overall']}%</div>
                    <div class="metric-label">Conversion</div>
                </div>
            </div>
        </div>
        
        <div class="card">
            <h2>💰 Price Group Comparison</h2>
            <table class="price-table">
                <tr>
                    <th>Price Group</th>
                    <th>Total</th>
                    <th>Contacted</th>
                    <th>Won</th>
                    <th>Win Rate</th>
                    <th>Revenue</th>
                </tr>
"""
    
    for group, gdata in data['price_group_comparison'].items():
        win_rate_class = "success" if gdata['win_rate'] >= 15 else "warning" if gdata['win_rate'] >= 10 else "danger"
        html += f"""
                <tr>
                    <td><strong>{group}만원</strong></td>
                    <td>{gdata['total']}</td>
                    <td>{gdata['contacted']}</td>
                    <td>{gdata['won']}</td>
                    <td class="{win_rate_class}">{gdata['win_rate']}%</td>
                    <td>{gdata['revenue']}만원</td>
                </tr>
"""
    
    html += """
            </table>
        </div>
    </div>
</body>
</html>
"""
    return html


def main():
    dashboard = ExperimentDashboard()
    
    if len(sys.argv) > 1 and sys.argv[1] == "--export":
        dashboard.export_json()
    elif len(sys.argv) > 1 and sys.argv[1] == "--html":
        html = generate_html_dashboard(dashboard)
        output_file = "dashboard.html"
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write(html)
        print(f"✅ HTML dashboard saved to {output_file}")
    else:
        dashboard.print_dashboard()


if __name__ == "__main__":
    main()
