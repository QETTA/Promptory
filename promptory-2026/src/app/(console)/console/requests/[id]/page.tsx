import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CatalystPageHeader, CatalystShellCard } from "@/components/console/template-foundation";
import {
  ConsoleBulletList,
  ConsoleKvGrid,
  ConsoleLinkButton,
  ConsoleTimeline,
  ConsoleToneBadge,
} from "@/components/console/console-primitives";
import {
  getApprovalsForRequest,
  getConsoleRequestById,
  getRunsForRequest,
} from "@/lib/console/mock-data";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const request = getConsoleRequestById(id);

  return {
    title: request ? `${request.title} — Promptory Console` : "Request — Promptory Console",
  };
}

export default async function ConsoleRequestDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const request = getConsoleRequestById(id);

  if (!request) {
    notFound();
  }

  const approvals = getApprovalsForRequest(request.id);
  const runs = getRunsForRequest(request.id);

  return (
    <div className="space-y-8">
      <CatalystPageHeader
        eyebrow="Request detail"
        title={request.title}
        description={request.summary}
        actions={(
          <>
            <ConsoleToneBadge tone={request.statusTone}>{request.status}</ConsoleToneBadge>
            <ConsoleLinkButton href="/console/requests" tone="secondary">queue로 돌아가기</ConsoleLinkButton>
          </>
        )}
      />

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.35fr)_340px]">
        <div className="space-y-6">
          <CatalystShellCard title="Request overview" description="누가 요청했고, 어떤 pack과 system write가 연결되는지 한 번에 보이도록 구성했습니다.">
            <ConsoleKvGrid
              items={[
                { label: "Requester", value: request.requester },
                { label: "Pack", value: `${request.pack} · ${request.department}` },
                { label: "Approver", value: request.approver },
                { label: "Destination", value: request.destination },
                { label: "Submitted", value: request.submittedAt },
                { label: "Due", value: request.dueAt },
              ]}
              columns={3}
            />
          </CatalystShellCard>

          <CatalystShellCard title="Status timeline" description="Slack 안에서 보이는 상태와 외부 workflow 실행 순서를 분리해 보여줍니다.">
            <ConsoleTimeline items={request.timeline} />
          </CatalystShellCard>

          <div className="grid gap-6 lg:grid-cols-2">
            <CatalystShellCard title="Policy notes" description="승인 판단을 위해 surfaced된 정책 근거입니다.">
              <ConsoleBulletList items={request.policyNotes} />
            </CatalystShellCard>

            <CatalystShellCard title="Evidence pack" description="source links와 supporting context를 함께 묶습니다.">
              <ConsoleBulletList items={request.evidence} />
            </CatalystShellCard>
          </div>

          <CatalystShellCard title="System writes" description="실행 이후 어떤 system of record가 갱신되는지 명시합니다.">
            <ConsoleBulletList items={request.systemWrites} />
          </CatalystShellCard>
        </div>

        <div className="space-y-6">
          <CatalystShellCard title="Approval snapshot" description="approval card에 들어가는 핵심 요약만 압축해 둡니다.">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-[var(--ink-secondary)]">risk</span>
                <ConsoleToneBadge tone={request.risk === "high" ? "danger" : request.risk === "medium" ? "warning" : "success"}>
                  {request.risk}
                </ConsoleToneBadge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-[var(--ink-secondary)]">source links</span>
                <span className="text-sm font-semibold text-[var(--ink-primary)]">{request.sourceLinks}개</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-[var(--ink-secondary)]">approver</span>
                <span className="text-sm font-semibold text-[var(--ink-primary)]">{request.approver}</span>
              </div>
            </div>

            {approvals.length > 0 ? (
              <div className="mt-5 space-y-3 border-t border-[var(--line)] pt-4">
                {approvals.map((approval) => (
                  <div key={approval.id} className="rounded-2xl border border-[var(--line)] bg-[var(--surface-2)] p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-semibold text-[var(--ink-primary)]">{approval.recommendation}</p>
                        <p className="mt-1 text-sm text-[var(--ink-secondary)]">{approval.detail}</p>
                      </div>
                      <ConsoleToneBadge tone={approval.risk === "high" ? "danger" : approval.risk === "medium" ? "warning" : "success"}>
                        {approval.risk}
                      </ConsoleToneBadge>
                    </div>
                    <p className="mt-3 text-xs font-medium text-[var(--ink-tertiary)]">due {approval.dueAt}</p>
                  </div>
                ))}
              </div>
            ) : null}
          </CatalystShellCard>

          <CatalystShellCard title="Workflow runs" description="Temporal / retry / replay 관점에서 본 request 실행 상태입니다.">
            <div className="space-y-3">
              {runs.length > 0 ? (
                runs.map((run) => (
                  <div key={run.id} className="rounded-2xl border border-[var(--line)] bg-[var(--surface-2)] p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-semibold text-[var(--ink-primary)]">{run.workflow}</p>
                        <p className="mt-1 text-sm text-[var(--ink-secondary)]">{run.note}</p>
                      </div>
                      <ConsoleToneBadge tone={run.statusTone}>{run.status}</ConsoleToneBadge>
                    </div>
                    <p className="mt-3 text-xs font-medium text-[var(--ink-tertiary)]">{run.duration} · {run.retryPolicy}</p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-[var(--ink-secondary)]">아직 실행 기록이 없습니다.</p>
              )}
            </div>
          </CatalystShellCard>

          <CatalystShellCard title="Next actions" description="운영자와 승인자가 지금 취해야 할 액션입니다.">
            <ul className="space-y-2 text-sm leading-6 text-[var(--ink-secondary)]">
              <li>• approver와 due를 보고 follow-up 여부를 결정합니다.</li>
              <li>• 실패 또는 지연이면 connector 상태와 policy rule을 함께 확인합니다.</li>
              <li>• 실행 후에는 Slack 결과 보고와 system write를 함께 검증합니다.</li>
            </ul>
            <div className="mt-5 border-t border-[var(--line)] pt-4">
              <Link href="/console/runs" className="text-sm font-semibold text-[var(--brand-700)] hover:text-[var(--brand-800)]">
                관련 run triage 보기
              </Link>
            </div>
          </CatalystShellCard>
        </div>
      </div>
    </div>
  );
}
