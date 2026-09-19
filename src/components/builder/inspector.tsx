"use client";

import type React from "react";
import { motion } from "motion/react";
import { Copy, Download, FileArchive, LockKeyhole, Palette, ScanLine, Sparkles, Type } from "lucide-react";
import { useEditorStore } from "@/store/editor-store";
import { AdvancedEditor } from "@/components/builder/advanced-editor";
import { VisualCritic } from "@/components/builder/visual-critic";
import { downloadProjectExport, downloadShopifyTheme } from "@/lib/project-export";
import { LockButton, SectionTitle } from "@/components/ui/control";

export function Inspector() {
  const s = useEditorStore();
  const d = s.design;

  function exportGenome() {
    const blob = new Blob([JSON.stringify(d, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `shopify-ui-generator-${d.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <aside className="panel-scroll h-full overflow-y-auto border-l border-white/[.06] bg-[#0d0e12]/85 p-4 backdrop-blur-xl">
      <SectionTitle>
        Design genome <span className="rounded-full bg-emerald-400/10 px-2 py-1 text-[9px] normal-case tracking-normal text-emerald-300">Live</span>
      </SectionTitle>
      <div className="rounded-2xl border border-white/[.08] bg-white/[.035] p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-sm font-semibold">{d.name}</h2>
            <p className="mt-1 text-[10px] leading-4 text-white/35">{d.description}</p>
          </div>
          <Sparkles size={14} className="text-violet-300" />
        </div>
        <div className="mt-4 flex gap-1.5">{Object.values(d.palette).slice(0, 6).map((c, i) => <div key={i} className="h-7 flex-1 rounded-md border border-white/10" style={{ background: c }} />)}</div>
      </div>

      <div className="mt-6 space-y-5">
        <Property title="Store" icon={<Sparkles size={13} />} locked={s.locks.layout} onLock={() => s.toggleLock("layout")}>
          <Row label="Brand" value={d.store.brandName} />
          <Row label="Category" value={d.store.category} />
          <Row label="Collections" value={String(d.store.collections.length)} />
          <Row label="Products" value={String(d.store.products.length)} />
        </Property>

        <Property title="Palette" icon={<Palette size={13} />} locked={s.locks.palette} onLock={() => s.toggleLock("palette")}>
          <Row label="Primary" value={d.palette.primary} />
          <Row label="Accent" value={d.palette.accent} />
          <Row label="Background" value={d.palette.background} />
        </Property>

        <Property title="Typography" icon={<Type size={13} />} locked={s.locks.typography} onLock={() => s.toggleLock("typography")}>
          <Row label="Font" value={d.typography.fontName} />
          <Row label="Scale" value={d.typography.scale} />
          <Row label="Weight" value={String(d.typography.headingWeight)} />
          <Row label="Tracking" value={`${d.typography.headingTracking}em`} />
        </Property>

        <Property title="Layout" icon={<ScanLine size={13} />} locked={s.locks.layout} onLock={() => s.toggleLock("layout")}>
          <Row label="Navigation" value={d.layout.nav} />
          <Row label="Hero" value={d.layout.hero} />
          <Row label="Products" value={d.layout.productGrid} />
          <Row label="Density" value={d.layout.density} />
        </Property>

        <Property title="AI sections" icon={<Sparkles size={13} />} locked={s.locks.layout} onLock={() => s.toggleLock("layout")}>
          <Row label="Count" value={String(d.sections?.length ?? 0)} />
          <Row label="Order" value={(d.sections ?? []).map((section) => section.type).join(" → ") || "default"} />
        </Property>

        <Property title="Motion" icon={<Sparkles size={13} />} locked={s.locks.motion} onLock={() => s.toggleLock("motion")}>
          <Row label="Preset" value={d.motion.preset} />
          <Row label="Duration" value={`${d.motion.duration}s`} />
          <Row label="Hover lift" value={`${d.motion.hoverLift}px`} />
          <Row label="Hover scale" value={`${d.motion.hoverScale}x`} />
          <Row label="Section offset" value={`${d.motion.sectionDistance}px`} />
          <Row label="Media zoom" value={`${d.motion.mediaZoom}x`} />
        </Property>

        <Property title="Surfaces" icon={<Copy size={13} />} locked={s.locks.surfaces} onLock={() => s.toggleLock("surfaces")}>
          <Row label="Radius" value={`${d.geometry.radius}px`} />
          <Row label="Glass" value={`${Math.round(d.surfaces.glass * 100)}%`} />
          <Row label="Blur" value={`${d.surfaces.blur}px`} />
          <Row label="Shadow" value={d.surfaces.shadow} />
        </Property>
      </div>

      <div className="mt-6">
        <VisualCritic />
      </div>

      <div className="mt-6">
        <SectionTitle>Advanced editor</SectionTitle>
        <AdvancedEditor />
      </div>

      <motion.button whileTap={{ scale: 0.98 }} onClick={exportGenome} className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-white/[.09] bg-white/[.04] px-4 py-3 text-xs font-medium text-white/75 hover:bg-white/[.07]">
        <Download size={13} /> Export design JSON
      </motion.button>
      <motion.button whileTap={{ scale: 0.98 }} onClick={() => downloadProjectExport(d)} className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl border border-violet-300/[.15] bg-violet-300/[.06] px-4 py-3 text-xs font-medium text-violet-100 hover:bg-violet-300/[.10]">
        <FileArchive size={13} /> Export project bundle
      </motion.button>
      <motion.button whileTap={{ scale: 0.98 }} onClick={() => downloadShopifyTheme(d)} className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-xs font-semibold text-black hover:bg-white/90">
        <FileArchive size={13} /> Export Shopify OS 2.0 ZIP
      </motion.button>
      <div className="mt-3 flex items-start gap-2 rounded-xl border border-violet-400/10 bg-violet-400/[.05] p-3 text-[10px] leading-4 text-white/42">
        <LockKeyhole size={12} className="mt-0.5 shrink-0 text-violet-300" /> Locked properties remain unchanged when the generator creates a new direction.
      </div>
    </aside>
  );
}

function Property({ title, icon, locked, onLock, children }: { title: string; icon: React.ReactNode; locked: boolean; onLock: () => void; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-medium text-white/65">{icon}{title}</div>
        <LockButton locked={locked} onClick={onLock} label={title} />
      </div>
      <div className="overflow-hidden rounded-xl border border-white/[.06]">{children}</div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return <div className="flex items-center justify-between border-b border-white/[.05] px-3 py-2.5 last:border-0"><span className="text-[10px] text-white/34">{label}</span><span className="max-w-[145px] truncate text-[10px] capitalize text-white/68">{value}</span></div>;
}
