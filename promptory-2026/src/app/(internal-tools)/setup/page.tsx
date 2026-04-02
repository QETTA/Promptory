import { Hero } from "@/components/marketplace/hero";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { getPublicEnvStatus } from "@/lib/env/public";
import { getServerEnvStatus } from "@/lib/env/server";

const setupSteps = [
  "루트에서 `npm.cmd run setup:promptory-web`를 실행해 `.env.local`을 만듭니다.",
  "Supabase 프로젝트를 만들고 `schema.sql`을 적용합니다.",
  "Storage bucket `product-thumbnails`, `product-files`를 만듭니다.",
  "이메일/비밀번호 로그인을 켭니다.",
  "`PAYMENTS_MODE=dev_stub`로 두고 먼저 상품 공개까지 확인합니다.",
  "상품 공개 후 주문, checkout, success, library, download 흐름까지 한 번 이어서 확인합니다.",
  "마지막으로 `npm.cmd run doctor:promptory-web`로 빠진 값이 없는지 점검합니다.",
];

const requiredEnvRows = [
  {
    key: "NEXT_PUBLIC_APP_URL",
    description: "브라우저가 현재 앱의 기본 주소를 알기 위해 필요합니다.",
  },
  {
    key: "NEXT_PUBLIC_SUPABASE_URL",
    description: "클라이언트와 서버가 같은 Supabase 프로젝트에 연결할 때 사용합니다.",
  },
  {
    key: "NEXT_PUBLIC_SUPABASE_ANON_KEY",
    description: "브라우저 로그인과 공개 데이터 조회에 필요한 Supabase 공개 키입니다.",
  },
  {
    key: "SUPABASE_SERVICE_ROLE_KEY",
    description: "서버에서 파일 업로드와 권한 검증을 안전하게 처리할 때 사용합니다.",
  },
  {
    key: "PAYMENTS_MODE",
    description: "결제 흐름을 `disabled`, `dev_stub`, `toss` 중 어떤 모드로 열지 결정합니다. 기본값은 dev_stub입니다.",
  },
];

const optionalEnvRows = [
  {
    key: "NEXT_PUBLIC_TOSS_CLIENT_KEY",
    description: "토스 결제 SDK를 브라우저에서 초기화할 때 사용하는 공개 클라이언트 키입니다. PAYMENTS_MODE=toss일 때 함께 필요합니다.",
  },
  {
    key: "TOSS_SECRET_KEY",
    description: "결제 성공 후 서버에서 결제를 승인할 때 사용하는 Toss 시크릿 키입니다. PAYMENTS_MODE=toss일 때 함께 필요합니다.",
  },
];

const quickCommands = [
  {
    title: "env 파일 만들기",
    command: "npm.cmd run setup:promptory-web",
    description: ".env.example을 복사해 apps/promptory-web/.env.local을 만듭니다.",
  },
  {
    title: "설정 상태 점검",
    command: "npm.cmd run doctor:promptory-web",
    description: "지금 빠진 환경변수가 무엇인지 로컬에서 바로 확인합니다.",
  },
  {
    title: "로컬 실행",
    command: "npm.cmd run dev:promptory-web",
    description: "환경변수를 채운 뒤 Promptory를 로컬에서 띄웁니다.",
  },
  {
    title: "전체 점검",
    command: "npm.cmd run verify:promptory-web",
    description: "doctor, typecheck, test, build를 한 번에 확인합니다. Toss 없이도 dev_stub 기준 점검이 가능합니다.",
  },
  {
    title: "Supabase 점검",
    command: "npm.cmd run check:supabase:promptory-web",
    description: "키를 넣은 뒤 테이블과 storage bucket 연결 상태를 확인합니다.",
  },
];

export default function SetupPage() {
  const publicStatus = getPublicEnvStatus();
  const serverStatus = getServerEnvStatus();

  const setupReadyCount = [
    publicStatus.hasPublicEnv,
    publicStatus.hasPublicUrl,
    publicStatus.hasSupabaseUrl,
    publicStatus.hasSupabaseAnonKey,
    serverStatus.hasSupabaseServiceRole,
  ].filter(Boolean).length;

  const statusRows = [
    { label: "공개 env 묶음", value: publicStatus.hasPublicEnv },
    { label: "NEXT_PUBLIC_APP_URL", value: publicStatus.hasPublicUrl },
    { label: "NEXT_PUBLIC_SUPABASE_URL", value: publicStatus.hasSupabaseUrl },
    { label: "NEXT_PUBLIC_SUPABASE_ANON_KEY", value: publicStatus.hasSupabaseAnonKey },
    { label: "SUPABASE_SERVICE_ROLE_KEY", value: serverStatus.hasSupabaseServiceRole },
    { label: "PAYMENTS_MODE", value: serverStatus.paymentMode },
    { label: "NEXT_PUBLIC_TOSS_CLIENT_KEY", value: publicStatus.hasTossClientKey },
    { label: "TOSS_SECRET_KEY", value: serverStatus.hasTossSecret },
  ];

  return (
    <div className="pb-16">
      <Hero
        eyebrow="설정"
        title="Promptory 연결 상태와 다음 점검 순서를 한 번에 봅니다"
        body="먼저 Supabase와 앱 URL을 맞추고, `PAYMENTS_MODE=dev_stub`로 구매 후 흐름을 검증한 뒤 Toss 실결제를 붙이는 순서가 가장 빠릅니다."
        tone="light"
        aside={
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            <Card variant="strong" className="p-4">
              <p className="section-kicker text-[var(--slate-500)]">연결 상태</p>
              <p className="mt-2 text-2xl font-semibold text-[var(--slate-950)]">{setupReadyCount}/5</p>
              <p className="mt-2 text-sm leading-6 text-[var(--slate-600)]">핵심 연결 항목 기준 현재 준비된 수입니다.</p>
            </Card>
            <Card variant="strong" className="p-4">
              <p className="section-kicker text-[var(--slate-500)]">결제 모드</p>
              <p className="mt-2 text-xl font-semibold text-[var(--slate-950)]">{serverStatus.paymentMode}</p>
              <p className="mt-2 text-sm leading-6 text-[var(--slate-600)]">로컬 기본 검증은 dev_stub이 가장 빠릅니다.</p>
            </Card>
          </div>
        }
      />

      <div className="mx-auto max-w-6xl px-5 py-8 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <Card className="p-6">
            <div className="flex flex-wrap items-center gap-3">
              <Badge>현재 연결 상태</Badge>
              <p className="text-sm text-[var(--slate-500)]">가장 먼저 확인해야 하는 블록입니다.</p>
            </div>
            <div className="mt-5 grid gap-3 border-t border-[var(--line)] pt-5">
              {statusRows.map((row) => (
                <div
                  key={row.label}
                  className="flex items-center justify-between rounded-xl bg-[var(--surface-2)] px-4 py-3"
                >
                  <span className="text-sm text-[var(--slate-700)]">{row.label}</span>
                  <span className="text-sm font-semibold text-[var(--slate-950)]">
                    {typeof row.value === "string" ? row.value : row.value ? "설정됨" : "미설정"}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          <Card variant="tint" className="p-6">
            <h2 className="text-xl font-semibold text-[var(--slate-950)]">가장 빠른 검증 경로</h2>
            <div className="mt-5 space-y-4 border-t border-[var(--line)] pt-5 text-sm leading-7 text-[var(--slate-700)]">
              <p>1. `NEXT_PUBLIC_APP_URL`, Supabase URL, anon key, service role key를 먼저 채웁니다.</p>
              <p>2. `PAYMENTS_MODE=dev_stub`로 두고 회원가입, 상품 공개, 주문, success, library 흐름을 확인합니다.</p>
              <p>3. 로컬에서 확인 가능한 구매 후 흐름이 안정적이면 Toss 키를 넣고 `PAYMENTS_MODE=toss`로 전환합니다.</p>
              <p className="rounded-xl border border-[var(--line)] bg-white px-4 py-3">
                Toss 키가 없으면 실결제는 미검증 상태가 정상입니다. 현재 로컬 기준 진실은 dev_stub 구매 후 흐름 검증입니다.
              </p>
            </div>
          </Card>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-[var(--slate-950)]">준비 순서</h2>
            <ol className="mt-5 space-y-4 border-t border-[var(--line)] pt-5">
              {setupSteps.map((step, index) => (
                <li key={step} className="flex gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[var(--line-strong)] bg-white text-sm font-semibold text-[var(--slate-950)]">
                    {index + 1}
                  </span>
                  <p className="pt-1 text-sm leading-7 text-[var(--slate-700)]">{step}</p>
                </li>
              ))}
            </ol>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold text-[var(--slate-950)]">바로 실행할 커맨드</h2>
            <div className="mt-5 grid gap-4 border-t border-[var(--line)] pt-5 sm:grid-cols-2">
              {quickCommands.map((item) => (
                <div key={item.command} className="rounded-2xl border border-[var(--line)] bg-[var(--surface-2)] p-4">
                  <p className="text-sm font-semibold text-[var(--slate-950)]">{item.title}</p>
                  <p className="mt-3 rounded-xl bg-[var(--slate-950)] px-3 py-2 font-mono text-xs text-white">
                    {item.command}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-[var(--slate-600)]">{item.description}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-[var(--slate-950)]">필수 환경변수</h2>
            <div className="mt-5 space-y-4 border-t border-[var(--line)] pt-5">
              {requiredEnvRows.map((row) => (
                <div key={row.key}>
                  <p className="font-mono text-sm font-semibold text-[var(--slate-950)]">{row.key}</p>
                  <p className="mt-2 text-sm leading-7 text-[var(--slate-600)]">{row.description}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold text-[var(--slate-950)]">선택 환경변수와 실결제 전환</h2>
            <div className="mt-5 space-y-4 border-t border-[var(--line)] pt-5">
              {optionalEnvRows.map((row) => (
                <div key={row.key}>
                  <p className="font-mono text-sm font-semibold text-[var(--slate-950)]">{row.key}</p>
                  <p className="mt-2 text-sm leading-7 text-[var(--slate-600)]">{row.description}</p>
                </div>
              ))}
              <div className="rounded-xl border border-[var(--line)] bg-[var(--surface-2)] px-4 py-4 text-sm leading-7 text-[var(--slate-700)]">
                <p>먼저 dev_stub으로 구매 후 흐름을 끝까지 확인한 뒤 Toss 키를 넣는 편이 가장 안전합니다.</p>
                <p>실결제 전환 뒤에는 같은 흐름을 다시 확인해 success / fail 복귀와 라이브러리 연결을 재검증하면 됩니다.</p>
              </div>
            </div>
          </Card>
        </div>

        <Card className="mt-6 p-6">
          <h2 className="text-xl font-semibold text-[var(--slate-950)]">Windows 실행 메모</h2>
          <div className="mt-5 space-y-3 border-t border-[var(--line)] pt-5 text-sm leading-7 text-[var(--slate-700)]">
            <p>OneDrive 동기화 중인 폴더에서는 `.next` 파일 잠금으로 build가 막힐 수 있습니다.</p>
            <p>build 전 기존 Next dev 프로세스가 남아 있는지 먼저 확인하세요.</p>
            <p>잠금이 반복되면 동기화 충돌이 적은 로컬 작업 폴더로 복사해 실행하는 편이 안정적입니다.</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
