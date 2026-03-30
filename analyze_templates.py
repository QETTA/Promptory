#!/usr/bin/env python3
"""
Tailwind Plus Templates 병렬 분석기
2026년 AI 서비스 디자인 트렌드 최적화를 위한 컴포넌트 추출
"""

import os
import re
import json
from pathlib import Path
from collections import defaultdict

TEMPLATES_DIR = "/home/user/webapp/templates"
OUTPUT_FILE = "/home/user/webapp/template_analysis.json"

# 핵심 템플릿 우선순위
PRIORITY_TEMPLATES = [
    "studio",           # 결과 워크스페이스 (핵심)
    "catalyst-ui-kit",    # UI 시스템
    "radiant",           # 대시보드/앱
    "salient",           # 랜딩
    "keynote",           # 쇼케이스
    "commit",            # 개발자 도구
    "compass",           # 온보딩
    "pocket",            # 모바일
    "protocol",          # API 문서
    "primer",            # 콘텐츠
    "syntax",            # 기술 문서
    "transmit",          # 파일 관리
]

def extract_components(template_path):
    """템플릿에서 컴포넌트 패턴 추출"""
    components = {
        "layouts": [],
        "ui_components": [],
        "patterns": [],
        "colors": set(),
        "interactions": [],
        "mobile_patterns": []
    }
    
    # 파일 찾기
    tsx_files = list(Path(template_path).rglob("*.tsx")) + list(Path(template_path).rglob("*.jsx"))
    
    for file in tsx_files[:30]:  # 상위 30개만 분석 (속도)
        try:
            content = file.read_text(encoding='utf-8', errors='ignore')
            
            # 레이아웃 패턴 감지
            if 'className=' in content:
                # 그리드/플렉스 레이아웃
                grid_match = re.findall(r'grid-cols-(\d+|\[[^\]]+\])', content)
                flex_match = re.findall(r'flex-(col|row)', content)
                if grid_match:
                    components["layouts"].extend([f"grid-{g}" for g in grid_match])
                if flex_match:
                    components["layouts"].extend([f"flex-{f}" for f in flex_match])
                
                # 모바일 반응형 패턴
                mobile_patterns = re.findall(r'(md|lg|xl|sm):([^\s"\']+)', content)
                components["mobile_patterns"].extend([f"{m[0]}:{m[1]}" for m in mobile_patterns[:10]])
                
                # 색상 토큰
                colors = re.findall(r'(bg|text|border|ring)-(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(\d+)', content)
                for c in colors:
                    components["colors"].add(f"{c[1]}-{c[2]}")
                
            # UI 컴포넌트 감지
            component_names = re.findall(r'export\s+(?:default\s+)?(?:function|const)\s+(\w+)', content)
            components["ui_components"].extend(component_names)
            
            # 인터랙션 패턴
            if 'useState' in content or 'useReducer' in content:
                components["interactions"].append("state-management")
            if 'onClick' in content or 'onSubmit' in content:
                components["interactions"].append("event-handlers")
            if 'Dialog' in content or 'Modal' in content or 'Sheet' in content:
                components["patterns"].append("modal-overlay")
            if 'Sidebar' in content or 'Navigation' in content:
                components["patterns"].append("sidebar-nav")
            if 'Card' in content or 'card' in str(file):
                components["patterns"].append("card-component")
            if 'Tab' in content or 'tab' in str(file).lower():
                components["patterns"].append("tabs")
            if 'Accordion' in content or 'Collapsible' in content:
                components["patterns"].append("accordion")
            if 'Table' in content:
                components["patterns"].append("data-table")
            if 'Form' in content or 'Input' in content:
                components["patterns"].append("form-elements")
            if 'Chart' in content or 'graph' in content.lower():
                components["patterns"].append("data-visualization")
                
        except Exception as e:
            continue
    
    components["colors"] = list(components["colors"])[:20]  # 상위 20개만
    return components

def analyze_studio_deep(template_path):
    """Studio 템플릿 심층 분석 - Promptory 핵심 참고"""
    analysis = {
        "layout_patterns": [],
        "panel_structures": [],
        "card_patterns": [],
        "inspector_patterns": [],
        "split_view": False,
        "sidebar_density": 0,
        "key_components": []
    }
    
    files = list(Path(template_path).rglob("*.tsx")) + list(Path(template_path).rglob("*.jsx"))
    
    for file in files:
        try:
            content = file.read_text(encoding='utf-8', errors='ignore')
            filename = file.name.lower()
            
            # 핵심 컴포넌트명 추출
            if any(x in filename for x in ['panel', 'inspector', 'sidebar', 'split', 'workspace']):
                analysis["key_components"].append(filename.replace('.tsx', '').replace('.jsx', ''))
            
            # Split View 패턴 감지
            if any(x in content for x in ['split', 'resizable', 'panes', 'leftPanel', 'rightPanel']):
                analysis["split_view"] = True
                
            # 패널 구조 감지
            if 'h-full' in content and 'overflow' in content:
                analysis["panel_structures"].append("full-height-scrollable")
            if 'sticky' in content or 'fixed' in content:
                analysis["panel_structures"].append("sticky-headers")
                
            # 카드 패턴
            if 'rounded-lg' in content or 'rounded-xl' in content:
                analysis["card_patterns"].append("rounded-corners")
            if 'shadow' in content:
                analysis["card_patterns"].append("shadow-depth")
                
            # Inspector 패턴 (Properties 패널)
            if any(x in content for x in ['properties', 'Property', 'details', 'metadata']):
                analysis["inspector_patterns"].append(filename)
                
        except:
            continue
    
    return analysis

def analyze_catalyst_deep(template_path):
    """Catalyst UI Kit 심층 분석"""
    analysis = {
        "base_components": [],
        "layout_systems": [],
        "navigation_patterns": [],
        "mobile_adaptations": [],
        "feedback_components": []
    }

    # Handle nested catalyst-ui-kit directory structure
    base_path = Path(template_path)
    if (base_path / "catalyst-ui-kit").exists():
        base_path = base_path / "catalyst-ui-kit"

    components_dir = base_path / "demo" / "typescript" / "src" / "components"
    if not components_dir.exists():
        components_dir = base_path / "demo" / "javascript" / "src" / "components"

    if components_dir.exists():
        for file in components_dir.glob("*.tsx"):
            analysis["base_components"].append(file.stem)

        # 핵심 컴포넌트 분류
        nav_components = ['navbar', 'sidebar', 'pagination', 'tabs']
        layout_components = ['sidebar-layout', 'stacked-layout', 'application-layout']
        feedback_components = ['alert', 'dialog', 'dropdown', 'button', 'divider']
        mobile_components = ['sidebar', 'navbar', 'dialog', 'dropdown']

        for comp in analysis["base_components"]:
            if any(n in comp for n in nav_components):
                analysis["navigation_patterns"].append(comp)
            if any(l in comp for l in layout_components):
                analysis["layout_systems"].append(comp)
            if any(f in comp for f in feedback_components):
                analysis["feedback_components"].append(comp)
            if any(m in comp for m in mobile_components):
                analysis["mobile_adaptations"].append(comp)

    return analysis

def analyze_radiant_deep(template_path):
    """Radiant 템플릿 심층 분석 - Bento Grid, Dense Card, Gradient"""
    analysis = {
        "key_files": [],
        "components": [],
        "bento_patterns": [],
        "gradient_patterns": [],
        "card_density": [],
        "pattern_summary": {}
    }

    from collections import Counter

    files = list(Path(template_path).rglob("*.tsx")) + list(Path(template_path).rglob("*.jsx"))

    for file in files[:50]:
        try:
            content = file.read_text(encoding='utf-8', errors='ignore')
            relative_path = str(file.relative_to(template_path))

            patterns = []

            # Bento Grid 패턴 감지
            if any(x in content for x in ['BentoCard', 'bento', 'grid-cols-2', 'grid-cols-3', 'grid-cols-4']):
                patterns.append("bento-grid")

            # Gradient 패턴
            if any(x in content for x in ['gradient', 'bg-linear', 'from-', 'to-', 'via-']):
                patterns.append("gradient")

            # Dense Card 패턴
            if any(x in content for x in ['rounded-lg', 'rounded-xl', 'shadow', 'p-4', 'p-6', 'p-8']):
                patterns.append("dense-card")

            # Animation
            if any(x in content for x in ['motion.', 'AnimatedNumber', 'FadeIn']):
                patterns.append("animation")

            # Logo/Brand components
            if any(x in content for x in ['Logo', 'LogoCloud', 'LogoCluster', 'LogoTimeline']):
                patterns.append("logo-system")

            if patterns:
                analysis["key_files"].append({
                    "path": relative_path,
                    "patterns": patterns,
                    "size": len(content)
                })

                # 컴포넌트명 추출
                comps = re.findall(r'(?:function|const|export\s+(?:default\s+)?(?:function|const))\s+([A-Z][a-zA-Z0-9]+)', content)
                analysis["components"].extend(comps)

        except:
            continue

    # 패턴 집계
    all_patterns = []
    for f in analysis["key_files"]:
        all_patterns.extend(f["patterns"])
    analysis["pattern_summary"] = dict(Counter(all_patterns))

    # 중복 제거
    analysis["components"] = list(set(analysis["components"]))

    return analysis

def analyze_pocket_deep(template_path):
    """Pocket 템플릿 심층 분석 - Mobile-first Stack, AppScreen"""
    analysis = {
        "key_files": [],
        "components": [],
        "mobile_patterns": [],
        "app_screen_patterns": [],
        "fab_patterns": [],
        "stack_patterns": [],
        "pattern_summary": {}
    }

    from collections import Counter

    files = list(Path(template_path).rglob("*.tsx")) + list(Path(template_path).rglob("*.jsx"))

    for file in files[:50]:
        try:
            content = file.read_text(encoding='utf-8', errors='ignore')
            relative_path = str(file.relative_to(template_path))

            patterns = []

            # AppScreen 패턴
            if any(x in content for x in ['AppScreen', 'PhoneFrame', 'mobile', 'app-demo']):
                patterns.append("app-screen")

            # Stack/Card 리듬 패턴
            if any(x in content for x in ['flex-col', 'space-y-', 'stack', 'Card']):
                patterns.append("stack-rhythm")

            # Mobile-first 반응형
            if any(x in content for x in ['sm:', 'md:', 'lg:', 'max-sm:', 'mobile']):
                patterns.append("mobile-responsive")

            # FAB (Floating Action Button)
            if any(x in content for x in ['fixed', 'bottom-', 'right-', 'rounded-full', 'fab']):
                patterns.append("fab")

            # Bottom Sheet
            if any(x in content for x in ['bottom-sheet', 'sheet', 'drawer', 'slide-up']):
                patterns.append("bottom-sheet")

            # Auth Layout (모바일 인증 패턴)
            if any(x in content for x in ['AuthLayout', 'auth', 'login', 'register']):
                patterns.append("auth-layout")

            if patterns:
                analysis["key_files"].append({
                    "path": relative_path,
                    "patterns": patterns,
                    "size": len(content)
                })

                # 컴포넌트명 추출
                comps = re.findall(r'(?:function|const|export\s+(?:default\s+)?(?:function|const))\s+([A-Z][a-zA-Z0-9]+)', content)
                analysis["components"].extend(comps)

        except:
            continue

    # 패턴 집계
    all_patterns = []
    for f in analysis["key_files"]:
        all_patterns.extend(f["patterns"])
    analysis["pattern_summary"] = dict(Counter(all_patterns))

    # 중복 제거
    analysis["components"] = list(set(analysis["components"]))

    return analysis

def analyze_all():
    """모든 템플릿 병렬 분석"""
    results = {}
    
    templates = [d for d in os.listdir(TEMPLATES_DIR) if os.path.isdir(os.path.join(TEMPLATES_DIR, d))]
    
    for template in templates:
        template_path = os.path.join(TEMPLATES_DIR, template)
        print(f"🔍 Analyzing: {template}...")
        
        basic = extract_components(template_path)
        
        # 심층 분석 (우선순위 템플릿 - Promptory 2026 핵심 4종)
        deep = {}
        if 'studio' in template.lower():
            deep = analyze_studio_deep(template_path)
        elif 'catalyst' in template.lower():
            deep = analyze_catalyst_deep(template_path)
        elif 'radiant' in template.lower():
            deep = analyze_radiant_deep(template_path)
        elif 'pocket' in template.lower():
            deep = analyze_pocket_deep(template_path)
            
        results[template] = {
            "basic": basic,
            "deep": deep
        }
    
    # JSON 저장
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        json.dump(results, f, indent=2, ensure_ascii=False)
    
    return results

if __name__ == "__main__":
    results = analyze_all()
    print(f"\n✅ Analysis complete! Results saved to {OUTPUT_FILE}")
    print(f"📊 Analyzed {len(results)} templates")
