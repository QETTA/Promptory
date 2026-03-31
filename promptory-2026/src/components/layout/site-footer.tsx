import Link from "next/link";
import { PromptoryLogo } from "@/components/layout/promptory-logo";

export function SiteFooter() {
  const footerLinks = [
    { href: "/packages", label: "패키지" },
    { href: "/demo/slack", label: "데모" },
    { href: "/contact", label: "문의" },
  ];

  const packageLinks = [
    { href: "/packages/website-diagnosis-agent", label: "Website Diagnosis" },
    { href: "/packages/campaign-brief-agent", label: "Campaign Brief" },
    { href: "/packages/korea-local-ops-agent", label: "Korea Local Ops" },
  ];

  return (
    <footer className="mt-16 border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <PromptoryLogo />
            <p className="mt-4 text-lg font-semibold text-slate-950">
              맞춤형 Slack Agent Package
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-600 max-w-sm">
              Slack에 URL을내면 진단부터 실행 초안까지 팀 대화 안에서 끝납니다. 
              홈페이지, 랜딩, 문서 링크를 읽고 비교표, 카피 초안, 보고용 요약까지 이어서 만듭니다.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 mb-3">메뉴</h3>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Packages */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 mb-3">패키지</h3>
            <ul className="space-y-2">
              {packageLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-500">
            © 2026 Promptory. 맞춤형 Slack Agent Package.
          </p>
          <a 
            href="mailto:hello@promptory.kr" 
            className="text-xs text-slate-500 hover:text-slate-700 transition-colors"
          >
            hello@promptory.kr
          </a>
        </div>
      </div>
    </footer>
  );
}
