import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

export interface CatalystColumn<Row> {
  key: keyof Row | string;
  header: ReactNode;
  render?: (row: Row) => ReactNode;
  className?: string;
}

export interface CatalystDataTableProps<Row> {
  columns: CatalystColumn<Row>[];
  rows: Row[];
  getRowKey: (row: Row, index: number) => string;
  emptyState?: ReactNode;
}

export function CatalystDataTable<Row>({
  columns,
  rows,
  getRowKey,
  emptyState = "No rows yet.",
}: CatalystDataTableProps<Row>) {
  return (
    <div className="overflow-hidden rounded-2xl border border-[var(--line)] bg-white">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-[var(--line)] text-left">
          <thead className="bg-[var(--surface-2)]">
            <tr>
              {columns.map((column) => (
                <th
                  key={String(column.key)}
                  className={cn(
                    "px-4 py-3 text-sm font-semibold text-[var(--ink-secondary)]",
                    column.className,
                  )}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--line)]">
            {rows.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-4 py-8 text-center text-sm text-[var(--ink-secondary)]">
                  {emptyState}
                </td>
              </tr>
            ) : (
              rows.map((row, index) => (
                <tr key={getRowKey(row, index)} className="align-top">
                  {columns.map((column) => {
                    const value = row[column.key as keyof Row] as ReactNode;
                    return (
                      <td key={String(column.key)} className={cn("px-4 py-3 text-sm text-[var(--ink-primary)]", column.className)}>
                        {column.render ? column.render(row) : value}
                      </td>
                    );
                  })}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
