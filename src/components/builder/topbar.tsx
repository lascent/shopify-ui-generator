"use client";

import { Box, Download, Eye, Grid2X2, Heart, PanelLeft, Sparkles } from "lucide-react";
import { useEditorStore } from "@/store/editor-store";
import { downloadShopifyTheme } from "@/lib/project-export";

export function Topbar() {
  const s = useEditorStore();
  const current = s.history.find((v) => v.design.id === s.design.id);

  return (
    <header className="glass z-30 flex h-16 items-center justify-between border-x-0 border-t-0 px-3 md:px-5">
      <div className="flex min-w-0 items-center gap-3.5">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[13px] bg-white text-black shadow-[0_8px_28px_rgba(255,255,255,.08)]">
          <Box size={19} strokeWidth={2.2} />
        </div>
        <div className="hidden sm:block">
          <div className="text-[13px] font-semibold tracking-[-.025em]">Shopify <span className="text-violet-300">Generator</span></div>
          <div className="text-[9px] text-white/30">Generative storefront design workspace</div>
        </div>
      </div>

      <div className="hidden items-center gap-1 rounded-xl border border-white/[.06] bg-black/20 p-1 lg:flex">
        <span className="rounded-lg bg-white/[.05] px-3 py-1.5 text-[10px] text-white/60">Version {s.history.length}</span>
        <span className="px-3 py-1.5 text-[10px] text-white/28">Seed {s.design.seed}</span>
      </div>

      <div className="flex items-center gap-2">
        <button onClick={() => { if (current) s.toggleFavorite(current.id); }} className={`flex h-8 w-8 items-center justify-center rounded-lg border border-white/[.07] ${current?.favorite ? "text-rose-300" : "text-white/40"}`}>
          <Heart size={13} fill={current?.favorite ? "currentColor" : "none"} />
        </button>
        <button onClick={() => s.setDesignLibraryOpen(true)} className="flex items-center gap-2 rounded-lg border border-violet-300/15 bg-violet-300/[.055] px-2.5 py-2 text-[10px] font-medium text-violet-100 transition hover:bg-violet-300/[.1]">
          <Grid2X2 size={12} /><span className="hidden md:inline">Design Library</span>
        </button>
        <button onClick={() => s.setCompare(!s.compare)} className="hidden items-center gap-2 rounded-lg border border-white/[.07] px-3 py-2 text-[10px] text-white/55 hover:text-white sm:flex">
          <Eye size={12} />Compare
        </button>
        <button onClick={() => downloadShopifyTheme(s.design)} className="hidden items-center gap-2 rounded-lg bg-white px-3 py-2 text-[10px] font-semibold text-black sm:flex">
          <Download size={12} />Export Shopify ZIP
        </button>
        <Sparkles size={15} className="text-violet-300 sm:hidden" />
      </div>

      <div className="fixed bottom-3 left-1/2 z-50 flex -translate-x-1/2 gap-1 rounded-2xl border border-white/[.09] bg-[#111217]/95 p-1.5 shadow-2xl backdrop-blur-xl xl:hidden">
        <button onClick={() => s.setMobilePanel("design")} className={`flex h-9 items-center gap-1.5 rounded-xl px-3 text-[10px] ${s.mobilePanel === "design" ? "bg-white text-black" : "text-white/45"}`}>
          <PanelLeft size={13} />Design
        </button>
        <button onClick={() => s.setMobilePanel("canvas")} className={`flex h-9 items-center gap-1.5 rounded-xl px-3 text-[10px] ${s.mobilePanel === "canvas" ? "bg-white text-black" : "text-white/45"}`}>
          <Eye size={13} />Canvas
        </button>
      </div>
    </header>
  );
}
