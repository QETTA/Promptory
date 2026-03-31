export const fullBleedHeroClass =
  "relative w-full overflow-hidden border-b border-[rgba(15,23,42,0.08)] text-white";

export const heroToneClass = {
  auth: "bg-[linear-gradient(135deg,#07111d_0%,#10233c_46%,#1f4f84_100%)]",
  catalog: "bg-[linear-gradient(135deg,#07111d_0%,#0f2743_46%,#215692_100%)]",
  detail: "bg-[linear-gradient(135deg,#07111d_0%,#10283f_46%,#1f6a8c_100%)]",
  library: "bg-[linear-gradient(135deg,#07111d_0%,#10263f_46%,#255d8d_100%)]",
  market: "bg-[linear-gradient(135deg,#07111d_0%,#0f2340_46%,#1e4e84_100%)]",
  orders: "bg-[linear-gradient(135deg,#07111d_0%,#102841_46%,#225f88_100%)]",
  payment: "bg-[linear-gradient(135deg,#07111d_0%,#102540_46%,#1f678b_100%)]",
  workspace: "bg-[linear-gradient(135deg,#07111d_0%,#102742_46%,#215788_100%)]",
} as const;

export const chipClass =
  "rounded-full border border-[var(--line)] bg-white px-4 py-2.5 text-[0.9rem] font-medium text-[var(--slate-700)] shadow-[0_10px_22px_-20px_rgba(15,23,42,0.16)] transition hover:-translate-y-px hover:border-[var(--line-strong)] hover:bg-[var(--surface-2)] hover:text-[var(--slate-950)]";
