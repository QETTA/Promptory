"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/primitives/Button";
import { Badge } from "@/components/primitives/Badge";
import { 
  ArrowRightIcon, 
  SparklesIcon, 
  DocumentTextIcon, 
  BoltIcon,
  DevicePhoneMobileIcon,
  ComputerDesktopIcon
} from "@heroicons/react/24/outline";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-neutral-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-neutral-950" />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center mb-8"
          >
            <Badge color="ai" size="md">
              <SparklesIcon className="w-4 h-4" />
              2026 AI 문장 최적화
            </Badge>
          </motion.div>
          
          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-7xl font-bold text-center text-white mb-6 tracking-tight"
          >
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Promptory
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl sm:text-2xl text-neutral-400 text-center max-w-3xl mx-auto mb-12"
          >
            Studio + Radiant + Pocket + Catalyst
            <br />
            <span className="text-neutral-500">4개 템플릿의 시너지를 활용한 AI 문장 최적화</span>
          </motion.p>
          
          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/optimize">
              <Button size="lg" className="group">
                최적화 시작하기
                <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Button variant="secondary" size="lg">
              문서 보기
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 border-t border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">핵심 기능</h2>
            <p className="text-neutral-400">4개 템플릿의 장점을 결합한 최적의 작업 환경</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => (
              <motion.div
                key={feature.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-6 rounded-2xl bg-neutral-900/50 border border-neutral-800 hover:border-neutral-700 transition-colors"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-white mb-2">{feature.name}</h3>
                <p className="text-sm text-neutral-400">{feature.description}</p>
                <div className="mt-4 flex flex-wrap gap-1">
                  {feature.tags.map((tag) => (
                    <span key={tag} className="text-[10px] px-2 py-1 rounded-full bg-neutral-800 text-neutral-400">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Template Stats */}
      <section className="py-24 border-t border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-sm text-neutral-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3-Zone Preview */}
      <section className="py-24 border-t border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge color="ai" className="mb-4">3-Zone Workspace</Badge>
            <h2 className="text-3xl font-bold text-white mb-4">최적화된 워크스페이스</h2>
            <p className="text-neutral-400">Studio의 Split-Panel 패턴을 활용한 3단계 구조</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="p-6 rounded-2xl bg-neutral-900/50 border border-neutral-800">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-neutral-800 flex items-center justify-center text-xs font-bold text-neutral-400">A</div>
                <h3 className="font-semibold text-white">Original Context</h3>
              </div>
              <p className="text-sm text-neutral-400 mb-4">원본 문장 타임라인과 선택 인터페이스</p>
              <div className="space-y-2">
                <div className="p-3 rounded-lg bg-neutral-800/50 border border-neutral-700">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-neutral-500">1</span>
                    <div className="h-2 w-20 bg-neutral-700 rounded" />
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/30">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-blue-400">2</span>
                    <div className="h-2 w-24 bg-blue-500/50 rounded" />
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-neutral-800/50 border border-neutral-700">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-neutral-500">3</span>
                    <div className="h-2 w-16 bg-neutral-700 rounded" />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-6 rounded-2xl bg-neutral-900/50 border border-neutral-800">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-neutral-800 flex items-center justify-center text-xs font-bold text-neutral-400">B</div>
                <h3 className="font-semibold text-white">Result Canvas</h3>
              </div>
              <p className="text-sm text-neutral-400 mb-4">Radiant 밀도 + Studio 애니메이션</p>
              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-neutral-800/50">
                  <div className="h-2 w-full bg-neutral-700 rounded mb-2" />
                  <div className="h-2 w-2/3 bg-neutral-700 rounded" />
                </div>
                <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/30">
                  <div className="h-2 w-full bg-blue-500/50 rounded mb-2" />
                  <div className="h-2 w-3/4 bg-blue-500/30 rounded" />
                </div>
                <div className="flex gap-2">
                  <span className="px-2 py-1 rounded-full bg-blue-500/20 text-[10px] text-blue-400">명확성</span>
                  <span className="px-2 py-1 rounded-full bg-purple-500/20 text-[10px] text-purple-400">임팩트</span>
                </div>
              </div>
            </div>
            
            <div className="p-6 rounded-2xl bg-neutral-900/50 border border-neutral-800">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-neutral-800 flex items-center justify-center text-xs font-bold text-neutral-400">C</div>
                <h3 className="font-semibold text-white">Action Panel</h3>
              </div>
              <p className="text-sm text-neutral-400 mb-4">Catalyst + Pocket 하이브리드</p>
              <div className="space-y-2">
                <div className="p-3 rounded-lg bg-blue-600 text-center text-sm text-white">
                  문장 복사하기
                </div>
                <div className="p-3 rounded-lg bg-neutral-800 text-center text-sm text-neutral-300">
                  전체 복사
                </div>
                <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/30">
                  <p className="text-xs text-amber-400">⚠️ 브라우저에서 확인하세요</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                <span className="text-white font-bold text-sm">P</span>
              </div>
              <span className="text-neutral-400">Promptory 2026</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-neutral-500">
              <span>Studio</span>
              <span>Radiant</span>
              <span>Pocket</span>
              <span>Catalyst</span>
            </div>
          </div>
          <p className="mt-8 text-center text-xs text-neutral-600">
            Design System v2026.03.30 | Tailwind Plus Templates
          </p>
        </div>
      </footer>
    </div>
  );
}

const features = [
  {
    name: "Studio Core",
    description: "Split-Panel (24x), Inspector (11x), List-Tree (21x) 패턴으로 구축된 3단계 워크스페이스",
    icon: ComputerDesktopIcon,
    gradient: "from-blue-500 to-cyan-500",
    tags: ["Split-Panel", "Inspector", "List-Tree"],
  },
  {
    name: "Radiant Density",
    description: "Bento Grid, Dense Card, Gradient로 모듈 추천 정보의 밀도 극대화",
    icon: BoltIcon,
    gradient: "from-purple-500 to-pink-500",
    tags: ["Bento Grid", "Gradient", "Dense Card"],
  },
  {
    name: "Pocket Mobile",
    description: "Mobile-first Stack, AppScreen, FAB으로 모바일 네이티브 경험",
    icon: DevicePhoneMobileIcon,
    gradient: "from-green-500 to-teal-500",
    tags: ["Stack Pattern", "Bottom Sheet", "FAB"],
  },
  {
    name: "Catalyst System",
    description: "Headless UI 기반 Sidebar-Layout, Dialog, Feedback 시스템",
    icon: DocumentTextIcon,
    gradient: "from-orange-500 to-red-500",
    tags: ["Headless UI", "Dark Mode", "Accessible"],
  },
];

const stats = [
  { value: "132", label: "총 파일 수" },
  { value: "39", label: "Studio 파일" },
  { value: "35", label: "Radiant 파일" },
  { value: "58", label: "Pocket+Catalyst" },
];
