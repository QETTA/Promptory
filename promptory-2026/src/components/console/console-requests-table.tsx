import Link from "next/link";

import { CatalystDataTable } from "@/components/console/template-foundation";
import type { ConsoleRequestRecord } from "@/lib/console/mock-data";

import { ConsoleToneBadge } from "./console-primitives";

export function ConsoleRequestsTable({ rows }: { rows: ConsoleRequestRecord[] }) {
  return (
    <CatalystDataTable
      rows={rows}
      getRowKey={(row) => row.id}
      columns={[
        {
          key: "title",
          header: "Request",
          render: (row) => (
            <div className="space-y-1">
              <Link href={`/console/requests/${row.id}`} className="font-semibold text-[var(--ink-primary)] hover:text-[var(--brand-700)]">
                {row.title}
              </Link>
              <p className="text-xs text-[var(--ink-tertiary)]">{row.pack} · {row.department}</p>
            </div>
          ),
        },
        {
          key: "requester",
          header: "Requester",
          render: (row) => (
            <div>
              <p className="font-medium text-[var(--ink-primary)]">{row.requester}</p>
              <p className="text-xs text-[var(--ink-tertiary)]">approver {row.approver}</p>
            </div>
          ),
        },
        {
          key: "status",
          header: "Status",
          render: (row) => <ConsoleToneBadge tone={row.statusTone}>{row.status}</ConsoleToneBadge>,
        },
        {
          key: "submittedAt",
          header: "Submitted",
          render: (row) => (
            <div>
              <p className="font-medium text-[var(--ink-primary)]">{row.submittedAt}</p>
              <p className="text-xs text-[var(--ink-tertiary)]">due {row.dueAt}</p>
            </div>
          ),
        },
        {
          key: "destination",
          header: "System write",
          render: (row) => (
            <div>
              <p className="font-medium text-[var(--ink-primary)]">{row.destination}</p>
              <p className="text-xs text-[var(--ink-tertiary)]">source links {row.sourceLinks}</p>
            </div>
          ),
        },
      ]}
    />
  );
}
