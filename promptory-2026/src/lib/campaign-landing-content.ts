import {
  industryPlaybooks,
  solutionPacks,
  workflowStages,
  type IndustryPlaybook,
  type IndustrySlug,
  type SolutionPack,
  type SolutionSlug,
} from "@/lib/request-to-resolution-content";

const solutionAliases = {
  "deal-desk": ["discount", "renewal", "sales", "revops", "quote"],
  "people-ops": ["people", "hr", "travel", "onboarding", "workplace", "equipment"],
  "it-access": ["access", "security", "okta", "iam", "it", "incident"],
  "finance-procurement": ["finance", "procurement", "vendor", "expense", "purchase", "budget"],
} as const satisfies Record<SolutionSlug, readonly string[]>;

const industryAliases = {
  investment: ["vc", "fund", "lp", "ic", "investor", "dataroom"],
  healthcare: ["clinic", "hospital", "payer", "denial", "referral", "patient"],
  "saas-it": ["saas", "software", "support", "b2b", "customer-success"],
  manufacturing: ["plant", "factory", "quality", "supplier", "capa"],
  "retail-ecommerce": ["retail", "ecommerce", "commerce", "refund", "promo", "chargeback"],
  "logistics-distribution": ["logistics", "distribution", "warehouse", "dispatch", "claim", "shipment"],
} as const satisfies Record<IndustrySlug, readonly string[]>;

type CampaignCta = {
  href: string;
  label: string;
};

type CampaignRelatedLink = {
  href: string;
  label: string;
};

export type CampaignLandingContent = {
  slug: string;
  label: string;
  eyebrow: string;
  title: string;
  description: string;
  audience: string;
  goal: string;
  firstWorkflow: string;
  proofMetric: string;
  fitSignals: string[];
  proofPoints: string[];
  workflowSteps: string[];
  landingChecklist: string[];
  primaryCta: CampaignCta;
  secondaryCta: CampaignCta;
  relatedLinks: CampaignRelatedLink[];
  note: string;
  solutionSlug: SolutionSlug | null;
  industrySlug: IndustrySlug | null;
};

function includesAlias(slug: string, aliases: readonly string[]) {
  const slugTokens = slug.split("-").filter(Boolean);

  return aliases.some((alias) => {
    if (slug === alias) {
      return true;
    }

    const aliasTokens = alias.split("-").filter(Boolean);

    for (let index = 0; index <= slugTokens.length - aliasTokens.length; index += 1) {
      const matches = aliasTokens.every((token, offset) => slugTokens[index + offset] === token);

      if (matches) {
        return true;
      }
    }

    return false;
  });
}

function resolveSolutionPack(slug: string): SolutionPack | null {
  return (
    solutionPacks.find((pack) => pack.slug === slug) ??
    solutionPacks.find((pack) => includesAlias(slug, solutionAliases[pack.slug])) ??
    null
  );
}

function resolveIndustryPlaybook(slug: string): IndustryPlaybook | null {
  return (
    industryPlaybooks.find((playbook) => playbook.slug === slug) ??
    industryPlaybooks.find((playbook) => includesAlias(slug, industryAliases[playbook.slug])) ??
    null
  );
}

export function humanizeCampaignSlug(slug: string) {
  return slug
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function buildTitle(label: string, solution: SolutionPack | null, industry: IndustryPlaybook | null) {
  if (solution && industry) {
    return `${industry.shortTitle} 팀을 위한 ${solution.shortTitle} campaign landing`;
  }

  if (solution) {
    return `${solution.shortTitle} pack 도입을 빠르게 설명하는 campaign landing`;
  }

  if (industry) {
    return `${industry.shortTitle} vertical 파일럿을 여는 campaign landing`;
  }

  return `${label} request-to-resolution campaign landing`;
}

function buildDescription(label: string, solution: SolutionPack | null, industry: IndustryPlaybook | null) {
  if (solution && industry) {
    return `${industry.title} buyer에게 ${solution.shortTitle} pack을 제안할 때는 기능 목록보다 첫 요청 흐름과 승인 근거, proof KPI를 먼저 보여주는 편이 전환에 유리합니다.`;
  }

  if (solution) {
    return `이 landing은 ${solution.summary}를 30초 안에 이해시키고, 바로 pilot 또는 department 상담으로 이어지게 만드는 용도입니다.`;
  }

  if (industry) {
    return `이 landing은 ${industry.title} buyer에게 first pack, champion, gate, KPI를 빠르게 설명해 파일럿 대화를 여는 용도입니다.`;
  }

  return `${label} 유입에서 범용 챗봇이 아니라 승인·실행형 request-to-resolution 제품이라는 점을 짧고 선명하게 설명하는 landing입니다.`;
}

function buildPrimaryCta(solution: SolutionPack | null, industry: IndustryPlaybook | null): CampaignCta {
  if (solution) {
    return {
      href: `/contact?type=department&slug=${solution.slug}&plan=department`,
      label: `${solution.shortTitle} 상담 요청`,
    };
  }

  if (industry) {
    return {
      href: `/contact?type=pilot&slug=${industry.slug}`,
      label: `${industry.shortTitle} 파일럿 논의하기`,
    };
  }

  return {
    href: "/contact?type=starter&plan=starter",
    label: "Starter 범위 논의하기",
  };
}

function buildSecondaryCta(solution: SolutionPack | null, industry: IndustryPlaybook | null): CampaignCta {
  if (industry) {
    return {
      href: `/industries/${industry.slug}`,
      label: `${industry.shortTitle} playbook 보기`,
    };
  }

  if (solution) {
    return {
      href: `/solutions/${solution.slug}`,
      label: `${solution.shortTitle} 상세 보기`,
    };
  }

  return {
    href: "/pilot",
    label: "공통 파일럿 구조 보기",
  };
}

function buildFitSignals(solution: SolutionPack | null, industry: IndustryPlaybook | null) {
  const signals: string[] = [];

  if (industry) {
    signals.push(`${industry.champion} buyer가 이미 보이고, ${industry.firstPack}처럼 첫 workflow를 한 줄로 말할 수 있을 때 잘 맞습니다.`);
  }

  if (solution) {
    signals.push(`${solution.entryPoint} 같은 요청 장면이 실제로 자주 반복되고, 승인자가 분명할수록 전환이 잘 납니다.`);
    signals.push(`${solution.systems.slice(0, 3).join(", ")} 정도의 핵심 시스템만 연결해도 proof가 나는 범위여야 합니다.`);
  } else {
    signals.push("검색보다 요청 접수, 승인, 시스템 반영까지 한 흐름으로 닫아야 하는 팀일수록 메시지가 선명해집니다.");
  }

  signals.push("좋은 campaign landing은 feature list보다 buyer, 병목, approval gate, proof KPI를 먼저 말합니다.");
  return signals;
}

function buildProofPoints(solution: SolutionPack | null, industry: IndustryPlaybook | null) {
  if (solution && industry) {
    return [
      `${solution.proofPoint}`,
      `${industry.kpis[0]}와 ${solution.kpis[0]}를 첫 proof metric으로 제안`,
      `${industry.systems.slice(0, 3).join(", ")} 범위로 connector scope를 작게 고정`,
    ];
  }

  if (solution) {
    return [
      `${solution.proofPoint}`,
      `${solution.kpis.slice(0, 2).join(" / ")}를 headline 아래 proof block에 배치`,
      `${solution.useCases.slice(0, 3).join(", ")} 중 하나를 대표 workflow로 고정`,
    ];
  }

  if (industry) {
    return [
      `${industry.firstPack}을 첫 offer로 두고 buyer 언어를 산업에 맞춰 설명`,
      `${industry.kpis.slice(0, 2).join(" / ")} 같은 현업 지표를 front door proof로 사용`,
      `${industry.recommendedSolutions.join(" + ")} 조합으로 확장 path를 짧게 보여주기`,
    ];
  }

  return [
    "Slack 안에서 요청을 받고 approval card로 판단을 압축한다는 구조를 hero에서 바로 설명",
    "source-of-truth 조회와 system write 반영이 같은 flow 안에 있다는 점을 proof block으로 제시",
    "Starter 범위의 작은 MVP와 4-6주 proof cadence를 CTA 근처에서 다시 상기",
  ];
}

function buildWorkflowSteps(solution: SolutionPack | null, industry: IndustryPlaybook | null) {
  if (solution) {
    return solution.steps;
  }

  if (industry) {
    return industry.flagshipFlow;
  }

  return workflowStages.map((stage) => `${stage.title}: ${stage.description}`);
}

function buildLandingChecklist(solution: SolutionPack | null, industry: IndustryPlaybook | null) {
  return [
    "headline은 도구 이름보다 어떤 요청 병목을 닫는지 먼저 말하기",
    solution
      ? `primary CTA는 demo request가 아니라 ${solution.shortTitle} 범위 상담으로 닫기`
      : "primary CTA는 generic 문의보다 pilot scoping으로 닫기",
    industry
      ? `${industry.shortTitle} buyer가 바로 이해할 수 있는 용어와 proof metric만 남기기`
      : "proof block은 before / after와 승인 리드타임 같은 운영 숫자로 구성하기",
  ];
}

function buildRelatedLinks(solution: SolutionPack | null, industry: IndustryPlaybook | null): CampaignRelatedLink[] {
  const links: CampaignRelatedLink[] = [];

  if (solution) {
    links.push({ href: `/solutions/${solution.slug}`, label: `${solution.shortTitle} pack 보기` });
  }

  if (industry) {
    links.push({ href: `/industries/${industry.slug}`, label: `${industry.shortTitle} playbook 보기` });
  }

  links.push({ href: "/pricing", label: "패키징 보기" });
  links.push({ href: "/pilot", label: "파일럿 구조 보기" });
  return links;
}

function buildNote(solution: SolutionPack | null, industry: IndustryPlaybook | null) {
  if (solution && industry) {
    return `${industry.shortTitle} buyer에게 ${solution.shortTitle} pack을 팔 때는 검색·요약보다 approval turnaround와 request-to-resolution time 개선을 먼저 약속하는 편이 훨씬 설득력 있습니다.`;
  }

  if (solution) {
    return `${solution.shortTitle} campaign은 기능 설명보다 첫 workflow, approval gate, system reflection을 한 화면에서 보여줘야 좋은 리드가 들어옵니다.`;
  }

  if (industry) {
    return `${industry.shortTitle} vertical landing은 범용 agent 설명보다 champion, first pack, KPI를 먼저 압축해야 buyer가 빠르게 반응합니다.`;
  }

  return "좋은 campaign landing은 범용 AI 메시지 대신, 어떤 요청을 어떤 승인 구조로 닫는지 한 줄로 말할 수 있어야 합니다.";
}

export function resolveCampaignLandingContent(rawSlug: string): CampaignLandingContent {
  const slug = rawSlug.trim().toLowerCase();
  const label = humanizeCampaignSlug(slug);
  const solution = resolveSolutionPack(slug);
  const industry = resolveIndustryPlaybook(slug);

  return {
    slug,
    label,
    eyebrow: solution ? `${solution.shortTitle} campaign` : industry ? `${industry.shortTitle} campaign` : "Campaign landing",
    title: buildTitle(label, solution, industry),
    description: buildDescription(label, solution, industry),
    audience: solution?.audience ?? industry?.champion ?? "Slack-first internal operations team",
    goal: solution ? `${solution.shortTitle} pack 상담 전환` : industry ? `${industry.shortTitle} 파일럿 범위 상담` : "Starter 파일럿 범위 확인",
    firstWorkflow: solution?.firstWorkflow ?? industry?.firstPack ?? "Slack request -> evidence pack -> approval card -> system update",
    proofMetric: solution?.kpis[0] ?? industry?.kpis[0] ?? "request-to-resolution time",
    fitSignals: buildFitSignals(solution, industry),
    proofPoints: buildProofPoints(solution, industry),
    workflowSteps: buildWorkflowSteps(solution, industry),
    landingChecklist: buildLandingChecklist(solution, industry),
    primaryCta: buildPrimaryCta(solution, industry),
    secondaryCta: buildSecondaryCta(solution, industry),
    relatedLinks: buildRelatedLinks(solution, industry),
    note: buildNote(solution, industry),
    solutionSlug: solution?.slug ?? null,
    industrySlug: industry?.slug ?? null,
  };
}
