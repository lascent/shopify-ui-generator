"use client";

import { AlertTriangle, CheckCircle2, ShieldAlert, WandSparkles } from "lucide-react";
import { autoRepairDesignV2, qualityAuditV2 } from "@/lib/design-quality";
import { useEditorStore } from "@/store/editor-store";

export function VisualCritic() {
  const s = useEditorStore();
  const audit = qualityAuditV2(s.design);
  const topIssues = audit.issues.filter((issue) => issue.severity !== "pass").slice(0, 6);

  return (
    <div className="rounded-2xl border border-white/[.07] bg-white/[.025] p-3.5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-[.16em] text-white/35">Visual QA V2</div>
          <div className="mt-1 flex items-end gap-2"><span className="text-2xl font-semibold text-white/90">{audit.score}</span><span className="pb-1 text-[10px] text-white/30">/ 100 · {audit.readiness}</span></div>
          <div className="mt-1 text-[9px] capitalize text-white/28">Weakest area: {audit.weakestArea}</div>
        </div>
        <button
          onClick={() => s.setDesign(autoRepairDesignV2(s.design))}
          className="flex items-center gap-1.5 rounded-xl border border-emerald-400/15 bg-emerald-400/[.07] px-3 py-2 text-[10px] font-medium text-emerald-200 hover:bg-emerald-400/10"
        >
          <WandSparkles size={12} /> Auto fix V2
        </button>
      </div>

      <div className="mt-3 grid grid-cols-3 gap-2">
        <Metric label="Access" value={audit.breakdown.accessibility} />
        <Metric label="Layout" value={audit.breakdown.layout} />
        <Metric label="Mobile" value={audit.breakdown.responsive} />
        <Metric label="Media" value={audit.mediaScore} />
        <Metric label="Commerce" value={audit.breakdown.commerce} />
        <Metric label="Coherence" value={audit.coherenceScore} />
      </div>

      <div className="mt-3 space-y-2">
        {topIssues.length ? topIssues.map((issue) => (
          <div key={issue.id} className="flex items-start gap-2 rounded-xl border border-white/[.05] bg-black/10 p-2.5">
            {issue.severity === "blocking" ? <ShieldAlert size={13} className="mt-0.5 shrink-0 text-rose-300" /> : <AlertTriangle size={13} className="mt-0.5 shrink-0 text-amber-300" />}
            <div className="min-w-0">
              <div className="text-[9px] uppercase tracking-[.12em] text-white/28">{issue.area}</div>
              <div className="mt-0.5 text-[10px] leading-4 text-white/62">{issue.message}</div>
            </div>
          </div>
        )) : (
          <div className="flex items-center gap-2 rounded-xl border border-emerald-400/10 bg-emerald-400/[.05] p-2.5 text-[10px] text-emerald-200/80"><CheckCircle2 size={13} /> No blocking visual issues detected.</div>
        )}
      </div>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return <div className="rounded-xl border border-white/[.05] bg-black/10 px-2.5 py-2"><div className="text-[9px] uppercase tracking-[.1em] text-white/25">{label}</div><div className="mt-1 text-sm font-semibold text-white/75">{Math.round(value)}</div></div>;
}
