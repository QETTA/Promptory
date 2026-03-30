#!/usr/bin/env python3
"""
Tailwind Plus 템플릿 심층 분석기
- 실제 컴포넌트 코드 분석
- CSS/Tailwind 패턴 추출
- 인터랙션/애니메이션 감지
- 이미지/에셋 구조 파악
"""

import os
import re
import json
from pathlib import Path
from collections import defaultdict, Counter

TEMPLATES_DIR = "/home/user/webapp/templates"
DEEP_OUTPUT = "/home/user/webapp/deep_analysis.json"

def extract_tailwind_classes(content):
    """Tailwind 클래스 추출 및 분류"""
    # className="..." 또는 class="..." 패턴
    class_patterns = [
        r'className="([^"]*)"',
        r'className=\{`([^`]*)`\}',
        r'className=\{cn\(([^\)]+)\)\}',
        r'class="([^"]*)"',
        r'class=\{`([^`]*)`\}',
    ]
    
    all_classes = []
    for pattern in class_patterns:
        matches = re.findall(pattern, content)
        for match in matches:
            # 문자열 결합 패턴 (예: "class1 " + "class2")
            if '"' in match or "'" in match or '+' in match:
                # 복잡한 패턴은 건너뛰거나 간단한 추출 시도
                simple_classes = re.findall(r'[\w\-:\[\]]+', match)
                all_classes.extend(simple_classes)
            else:
                classes = match.split()
                all_classes.extend(classes)
    
    return all_classes

def categorize_classes(classes):
    """Tailwind 클래스 카테고리 분류"""
    categories = {
        "layout": [],
        "spacing": [],
        "typography": [],
        "colors": [],
        "effects": [],
        "animation": [],
        "responsive": [],
        "interactive": [],
    }
    
    for cls in classes:
        # Layout
        if any(x in cls for x in ['grid', 'flex', 'block', 'inline', 'hidden', 'contents']):
            categories["layout"].append(cls)
        # Spacing
        elif any(x in cls for x in ['p-', 'px-', 'py-', 'm-', 'mx-', 'my-', 'gap-', 'space-']):
            categories["spacing"].append(cls)
        # Typography
        elif any(x in cls for x in ['text-', 'font-', 'leading-', 'tracking-', 'whitespace']):
            categories["typography"].append(cls)
        # Colors
        elif any(x in cls for x in ['bg-', 'text-', 'border-', 'ring-', 'fill-', 'stroke-', 'from-', 'to-', 'via-']):
            categories["colors"].append(cls)
        # Effects
        elif any(x in cls for x in ['shadow', 'blur', 'opacity', 'brightness', 'contrast', 'saturate']):
            categories["effects"].append(cls)
        # Animation
        elif any(x in cls for x in ['animate-', 'transition', 'duration', 'ease', 'delay', 'transform']):
            categories["animation"].append(cls)
        # Responsive
        elif any(x in cls for x in ['sm:', 'md:', 'lg:', 'xl:', '2xl:']):
            categories["responsive"].append(cls)
        # Interactive
        elif any(x in cls for x in ['hover:', 'focus:', 'active:', 'disabled:', 'group-', 'peer-']):
            categories["interactive"].append(cls)
    
    # 중복 제거 및 정렬
    for key in categories:
        categories[key] = list(set(categories[key]))[:50]  # 상위 50개
    
    return categories

def analyze_component_file(filepath):
    """개별 컴포넌트 파일 심층 분석"""
    try:
        content = filepath.read_text(encoding='utf-8', errors='ignore')
        
        analysis = {
            "filename": filepath.name,
            "lines": len(content.splitlines()),
            "imports": [],
            "components": [],
            "hooks": [],
            "tailwind_classes": [],
            "animation_libs": [],
            "has_typescript": filepath.suffix == '.tsx',
            "props_interface": None,
        }
        
        # Import 추출
        imports = re.findall(r'import\s+\{?([^}]+)\}?\s+from\s+["\']([^"\']+)["\']', content)
        analysis["imports"] = [f"{imp[0].strip()} from {imp[1]}" for imp in imports[:20]]
        
        # React Hooks
        hooks = re.findall(r'use[A-Z][a-zA-Z]+', content)
        analysis["hooks"] = list(set(hooks))
        
        # 컴포넌트 정의
        components = re.findall(r'(?:function|const|export\s+(?:default\s+)?(?:function|const))\s+([A-Z][a-zA-Z0-9]+)', content)
        analysis["components"] = list(set(components))
        
        # 애니메이션 라이브러리
        if 'framer-motion' in content or 'motion.' in content:
            analysis["animation_libs"].append("framer-motion")
        if '@headlessui' in content:
            analysis["animation_libs"].append("headlessui")
        if 'tailwindcss-animate' in content:
            analysis["animation_libs"].append("tailwind-animate")
        
        # TypeScript 인터페이스
        interface_match = re.search(r'interface\s+(\w+Props?)\s*\{([^}]+)\}', content, re.DOTALL)
        if interface_match:
            analysis["props_interface"] = interface_match.group(1)
        
        # Tailwind 클래스 추출
        classes = extract_tailwind_classes(content)
        analysis["tailwind_classes"] = categorize_classes(classes)
        
        return analysis
    except Exception as e:
        return {"error": str(e)}

def analyze_studio_deep():
    """Studio 템플릿 심층 분석 - 핵심 패턴 추출"""
    studio_path = Path(TEMPLATES_DIR) / "studio"
    if not studio_path.exists():
        return {}
    
    analysis = {
        "key_files": [],
        "components": [],
        "layout_patterns": [],
        "interaction_patterns": [],
        "color_usage": [],
        "unique_features": []
    }
    
    # 주요 파일 찾기
    key_files = list(studio_path.rglob("*.tsx")) + list(studio_path.rglob("*.jsx"))
    
    for file in key_files[:50]:  # 상위 50개
        try:
            content = file.read_text(encoding='utf-8', errors='ignore')
            relative_path = str(file.relative_to(studio_path))
            
            # 핵심 패턴 감지
            patterns = []
            
            # Split View / Panel 패턴
            if any(x in content for x in ['split', 'panel', 'left', 'right', 'sidebar']):
                patterns.append("split-panel")
            
            # Resizable / Draggable
            if any(x in content for x in ['resizable', 'draggable', 'drag', 'resize']):
                patterns.append("resizable")
            
            # Inspector / Properties
            if any(x in content for x in ['inspector', 'properties', 'details', 'metadata']):
                patterns.append("inspector")
            
            # Tabs / Navigation
            if any(x in content for x in ['tabs', 'tablist', 'tabpanel']):
                patterns.append("tabs")
            
            # Form / Input
            if any(x in content for x in ['input', 'form', 'field', 'button']):
                patterns.append("form")
            
            # List / Tree
            if any(x in content for x in ['list', 'tree', 'item', 'node']):
                patterns.append("list-tree")
            
            # Code / Editor
            if any(x in content for x in ['code', 'editor', 'monaco', 'codemirror']):
                patterns.append("code-editor")
            
            # Preview / Canvas
            if any(x in content for x in ['preview', 'canvas', 'viewport']):
                patterns.append("preview-canvas")
            
            if patterns:
                analysis["key_files"].append({
                    "path": relative_path,
                    "patterns": patterns,
                    "size": len(content)
                })
                
        except:
            continue
    
    # 패턴 집계
    all_patterns = []
    for f in analysis["key_files"]:
        all_patterns.extend(f["patterns"])
    analysis["pattern_summary"] = dict(Counter(all_patterns))
    
    return analysis

def analyze_catalyst_deep():
    """Catalyst UI Kit 심층 분석"""
    catalyst_path = Path(TEMPLATES_DIR) / "catalyst-ui-kit (1)"
    if not catalyst_path.exists():
        return {}

    analysis = {
        "components_detailed": [],
        "layout_systems": [],
        "form_patterns": [],
        "data_display": [],
        "feedback_patterns": [],
        "mobile_adaptations": []
    }

    # Handle nested directory structure
    base_path = catalyst_path
    if (base_path / "catalyst-ui-kit").exists():
        base_path = base_path / "catalyst-ui-kit"

    # TypeScript 버전 우선
    ts_path = base_path / "demo" / "typescript" / "src" / "components"

    if ts_path.exists():
        for file in ts_path.glob("*.tsx"):
            try:
                content = file.read_text(encoding='utf-8', errors='ignore')

                comp_analysis = analyze_component_file(file)
                comp_analysis["category"] = categorize_component(file.stem)

                analysis["components_detailed"].append(comp_analysis)

                # 모바일 적응형 컴포넌트 체크
                mobile_indicators = ['sidebar', 'navbar', 'dialog', 'dropdown', 'sheet']
                if any(ind in file.stem.lower() for ind in mobile_indicators):
                    if comp_analysis.get("tailwind_classes", {}).get("responsive"):
                        analysis["mobile_adaptations"].append({
                            "component": file.stem,
                            "responsive_classes": comp_analysis["tailwind_classes"]["responsive"][:5]
                        })
            except:
                continue

    # 카테고리별 분류
    for comp in analysis["components_detailed"]:
        cat = comp.get("category", "other")
        if cat == "layout":
            analysis["layout_systems"].append(comp["filename"])
        elif cat == "form":
            analysis["form_patterns"].append(comp["filename"])
        elif cat == "data":
            analysis["data_display"].append(comp["filename"])
        elif cat == "feedback":
            analysis["feedback_patterns"].append(comp["filename"])

    return analysis

def analyze_radiant_deep():
    """Radiant 템플릿 심층 분석 - Bento Grid, Dense Card, Gradient"""
    radiant_path = Path(TEMPLATES_DIR) / "radiant"
    if not radiant_path.exists():
        return {}

    analysis = {
        "key_files": [],
        "components": [],
        "bento_patterns": [],
        "gradient_patterns": [],
        "card_density": [],
        "animation_patterns": [],
        "pattern_summary": {}
    }

    files = list(radiant_path.rglob("*.tsx")) + list(radiant_path.rglob("*.jsx"))

    for file in files[:50]:
        try:
            content = file.read_text(encoding='utf-8', errors='ignore')
            relative_path = str(file.relative_to(radiant_path))

            file_analysis = {
                "path": relative_path,
                "patterns": [],
                "components": [],
                "size": len(content)
            }

            # Bento Grid 패턴
            if any(x in content for x in ['BentoCard', 'bento', 'grid-cols-2', 'grid-cols-3', 'grid-cols-4', 'col-span-']):
                file_analysis["patterns"].append("bento-grid")
                analysis["bento_patterns"].append(relative_path)

            # Gradient 패턴
            if any(x in content for x in ['gradient', 'bg-linear', 'from-', 'to-', 'via-', 'GradientBackground']):
                file_analysis["patterns"].append("gradient")
                analysis["gradient_patterns"].append(relative_path)

            # Dense Card (카드 밀도)
            if any(x in content for x in ['rounded-lg', 'rounded-xl', 'rounded-2xl', 'shadow-sm', 'shadow-md', 'p-4', 'p-6']):
                file_analysis["patterns"].append("dense-card")
                analysis["card_density"].append(relative_path)

            # Animation
            if any(x in content for x in ['motion.', 'framer-motion', 'AnimatedNumber', 'FadeIn', 'animate-']):
                file_analysis["patterns"].append("animation")
                analysis["animation_patterns"].append(relative_path)

            # 컴포넌트 추출
            comps = re.findall(r'(?:function|const|export\s+(?:default\s+)?(?:function|const))\s+([A-Z][a-zA-Z0-9]+)', content)
            file_analysis["components"] = list(set(comps))
            analysis["components"].extend(file_analysis["components"])

            if file_analysis["patterns"]:
                analysis["key_files"].append(file_analysis)

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

def analyze_pocket_deep():
    """Pocket 템플릿 심층 분석 - Mobile-first Stack, AppScreen, FAB"""
    pocket_path = Path(TEMPLATES_DIR) / "pocket"
    if not pocket_path.exists():
        return {}

    analysis = {
        "key_files": [],
        "components": [],
        "app_screen_patterns": [],
        "stack_patterns": [],
        "fab_patterns": [],
        "mobile_responsive": [],
        "auth_patterns": [],
        "pattern_summary": {}
    }

    files = list(pocket_path.rglob("*.tsx")) + list(pocket_path.rglob("*.jsx"))

    for file in files[:50]:
        try:
            content = file.read_text(encoding='utf-8', errors='ignore')
            relative_path = str(file.relative_to(pocket_path))

            file_analysis = {
                "path": relative_path,
                "patterns": [],
                "components": [],
                "size": len(content)
            }

            # AppScreen 패턴
            if any(x in content for x in ['AppScreen', 'PhoneFrame', 'AppDemo', 'mobile-screen']):
                file_analysis["patterns"].append("app-screen")
                analysis["app_screen_patterns"].append(relative_path)

            # Stack/Card 리듬 패턴
            if any(x in content for x in ['flex-col', 'space-y-', 'stack', 'vstack', 'Card']):
                file_analysis["patterns"].append("stack-rhythm")
                analysis["stack_patterns"].append(relative_path)

            # Mobile-first 반응형 (sm:, md:, lg:)
            responsive = re.findall(r'(sm|md|lg|xl|2xl):([^\s"\']+)', content)
            if responsive:
                file_analysis["patterns"].append("mobile-responsive")
                analysis["mobile_responsive"].append({
                    "path": relative_path,
                    "breakpoints": list(set([r[0] for r in responsive]))
                })

            # FAB (Floating Action Button)
            if any(x in content for x in ['fixed bottom-', 'fixed right-', 'rounded-full', 'fab', 'floating']):
                file_analysis["patterns"].append("fab")
                analysis["fab_patterns"].append(relative_path)

            # Auth Layout (모바일 인증 패턴)
            if any(x in content for x in ['AuthLayout', 'Auth', 'Login', 'Register', 'SignIn', 'SignUp']):
                file_analysis["patterns"].append("auth-layout")
                analysis["auth_patterns"].append(relative_path)

            # 컴포넌트 추출
            comps = re.findall(r'(?:function|const|export\s+(?:default\s+)?(?:function|const))\s+([A-Z][a-zA-Z0-9]+)', content)
            file_analysis["components"] = list(set(comps))
            analysis["components"].extend(file_analysis["components"])

            if file_analysis["patterns"]:
                analysis["key_files"].append(file_analysis)

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

def categorize_component(name):
    """컴포넌트명으로 카테고리 분류"""
    name_lower = name.lower()
    
    if any(x in name_lower for x in ['layout', 'sidebar', 'stacked', 'navbar', 'nav']):
        return "layout"
    elif any(x in name_lower for x in ['input', 'select', 'checkbox', 'radio', 'switch', 'textarea', 'combobox', 'listbox', 'field', 'form']):
        return "form"
    elif any(x in name_lower for x in ['table', 'list', 'description', 'badge', 'avatar']):
        return "data"
    elif any(x in name_lower for x in ['alert', 'dialog', 'dropdown', 'button', 'divider']):
        return "feedback"
    elif any(x in name_lower for x in ['text', 'heading', 'link']):
        return "typography"
    else:
        return "other"

def analyze_assets():
    """이미지/에셋/폰트 분석"""
    assets = {
        "fonts": [],
        "images": [],
        "icons": [],
        "stylesheets": []
    }
    
    for template in os.listdir(TEMPLATES_DIR):
        template_path = Path(TEMPLATES_DIR) / template
        if not template_path.is_dir():
            continue
        
        # 폰트 파일
        fonts = list(template_path.rglob("*.woff*")) + list(template_path.rglob("*.ttf")) + list(template_path.rglob("*.otf"))
        for f in fonts[:5]:
            assets["fonts"].append(f"{template}/{f.name}")
        
        # 이미지
        images = list(template_path.rglob("*.png")) + list(template_path.rglob("*.jpg")) + list(template_path.rglob("*.svg")) + list(template_path.rglob("*.webp"))
        for img in images[:10]:
            assets["images"].append(f"{template}/{img.name}")
        
        # CSS
        styles = list(template_path.rglob("*.css")) + list(template_path.rglob("*.scss"))
        for style in styles[:5]:
            assets["stylesheets"].append(f"{template}/{style.name}")
    
    return assets

def extract_unique_patterns():
    """모든 템플릿에서 고유한 패턴 추출"""
    all_classes = defaultdict(int)
    all_components = defaultdict(int)
    all_hooks = defaultdict(int)
    
    for template in os.listdir(TEMPLATES_DIR):
        template_path = Path(TEMPLATES_DIR) / template
        if not template_path.is_dir():
            continue
        
        tsx_files = list(template_path.rglob("*.tsx")) + list(template_path.rglob("*.jsx"))
        
        for file in tsx_files[:30]:  # 각 템플릿 30개씩
            try:
                content = file.read_text(encoding='utf-8', errors='ignore')
                
                # 클래스 수집
                classes = extract_tailwind_classes(content)
                for cls in set(classes):
                    all_classes[cls] += 1
                
                # 컴포넌트 수집
                comps = re.findall(r'(?:function|const|export\s+(?:default\s+)?(?:function|const))\s+([A-Z][a-zA-Z0-9]+)', content)
                for comp in comps:
                    all_components[comp] += 1
                
                # Hooks 수집
                hooks = re.findall(r'use[A-Z][a-zA-Z]+', content)
                for hook in hooks:
                    all_hooks[hook] += 1
                    
            except:
                continue
    
    return {
        "common_classes": dict(sorted(all_classes.items(), key=lambda x: -x[1])[:100]),
        "common_components": dict(sorted(all_components.items(), key=lambda x: -x[1])[:50]),
        "common_hooks": dict(sorted(all_hooks.items(), key=lambda x: -x[1])[:30])
    }

def main():
    print("🔬 Starting Deep Analysis...")

    results = {
        "studio_deep": analyze_studio_deep(),
        "catalyst_deep": analyze_catalyst_deep(),
        "radiant_deep": analyze_radiant_deep(),
        "pocket_deep": analyze_pocket_deep(),
        "assets": analyze_assets(),
        "common_patterns": extract_unique_patterns()
    }

    with open(DEEP_OUTPUT, 'w', encoding='utf-8') as f:
        json.dump(results, f, indent=2, ensure_ascii=False)

    print(f"\n✅ Deep Analysis Complete!")
    print(f"📄 Output: {DEEP_OUTPUT}")
    print(f"\n📊 Summary:")
    print(f"  - Studio patterns: {len(results['studio_deep'].get('key_files', []))} files")
    print(f"  - Catalyst components: {len(results['catalyst_deep'].get('components_detailed', []))} files")
    print(f"  - Radiant patterns: {len(results['radiant_deep'].get('key_files', []))} files")
    print(f"  - Pocket patterns: {len(results['pocket_deep'].get('key_files', []))} files")
    print(f"  - Common classes: {len(results['common_patterns']['common_classes'])} patterns")
    print(f"  - Common hooks: {len(results['common_patterns']['common_hooks'])} hooks")
    print(f"  - Assets: {len(results['assets']['fonts'])} fonts, {len(results['assets']['images'])} images")

if __name__ == "__main__":
    main()
