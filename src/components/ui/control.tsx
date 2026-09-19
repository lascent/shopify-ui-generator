"use client";

import { Lock, Unlock } from "lucide-react";
import type { ReactNode } from "react";

export function SectionTitle({ children, action }: { children: ReactNode; action?: ReactNode }) {
  return <div className="mb-3 flex items-center justify-between"><p className="text-[11px] font-semibold uppercase tracking-[.18em] text-white/45">{children}</p>{action}</div>;
}

export function LockButton({ locked, onClick, label }: { locked: boolean; onClick: () => void; label: string }) {
  return (
    <button onClick={onClick} aria-label={`${locked ? "Unlock" : "Lock"} ${label}`} className={`flex h-8 w-8 items-center justify-center rounded-lg border transition ${locked ? "border-violet-400/25 bg-violet-400/10 text-violet-300" : "border-white/8 bg-white/[.03] text-white/40 hover:text-white"}`}>
      {locked ? <Lock size={13} /> : <Unlock size={13} />}
    </button>
  );
}

export function Pill({ active, children, onClick }: { active: boolean; children: ReactNode; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex min-h-12 min-w-0 w-full items-center justify-center rounded-xl px-2.5 py-2.5 text-center text-[13px] font-medium leading-[1.15] whitespace-normal break-words transition ${active ? "bg-white text-black shadow-[0_8px_24px_rgba(255,255,255,.10)]" : "bg-white/[.04] text-white/75 hover:bg-white/[.07] hover:text-white"}`}
    >
      <span className="min-w-0 max-w-full">{children}</span>
    </button>
  );
}
