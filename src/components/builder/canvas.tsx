"use client";

import type React from "react";
import { AnimatePresence, motion } from "motion/react";
import { Monitor, Smartphone, Tablet, X } from "lucide-react";
import { StorefrontPreview } from "@/components/storefront/storefront-preview";
import { useEditorStore } from "@/store/editor-store";
import type { Device, StorePage } from "@/types/design";

const storePages: { value: StorePage; label: string }[] = [
  { value: "home", label: "Home" },
  { value: "collection", label: "Collection" },
  { value: "product", label: "Product" },
  { value: "search", label: "Search" },
  { value: "cart", label: "Cart" },
  { value: "about", label: "About" },
  { value: "contact", label: "Contact" },
  { value: "faq", label: "FAQ" },
];

const widths: Record<Device, string> = {
  desktop: "100%",
  tablet: "min(900px, 100%)",
  // Use a realistic modern-phone ceiling, but allow the preview to shrink all
  // the way down with the editor. Storefront CSS uses container/device rules,
  // so 320–430px phone widths remain valid rather than being a fixed 390px mock.
  mobile: "min(430px, 100%)",
};

export function Canvas() {
  const s = useEditorStore();
  const preset = s.design.motion.preset;
  // The canvas itself must never be an ambient/looping animation target.
  // A generated design may use floating or cinematic media, but the whole
  // storefront should enter once and then remain visually stable.
  const previewInitial = preset === "cinematic" ? { scale: 0.992, y: 12 } : preset === "snappy" ? { scale: 0.996, y: 5 } : preset === "layered" ? { x: 10, scale: 0.996 } : { scale: 0.997, y: 6 };
  const previewAnimate = { scale: 1, y: 0, x: 0 };
  const previewTransition = preset === "snappy" ? { duration: 0.18 } : preset === "cinematic" ? { duration: 0.42 } : { duration: 0.26 };
  const devices: { key: Device; icon: React.ReactNode }[] = [
    { key: "desktop", icon: <Monitor size={14} /> },
    { key: "tablet", icon: <Tablet size={14} /> },
    { key: "mobile", icon: <Smartphone size={14} /> },
  ];

  return (
    <main className="checkerboard relative flex h-full min-w-0 flex-col overflow-hidden">
      <div className="flex h-12 shrink-0 items-center justify-between border-b border-white/[.06] bg-black/20 px-3">
        <div className="flex min-w-0 items-center gap-2">
          <div className="flex items-center gap-1 rounded-lg border border-white/[.07] bg-black/25 p-1">
            {devices.map(({ key, icon }) => (
              <button key={key} onClick={() => s.setDevice(key)} aria-label={`Preview ${key}`} className={`flex h-7 w-8 items-center justify-center rounded-md transition ${s.device === key ? "bg-white text-black" : "text-white/38 hover:text-white"}`}>
                {icon}
              </button>
            ))}
          </div>
          <select value={s.storePage} onChange={(event) => s.setStorePage(event.target.value as StorePage)} aria-label="Preview store page" className="max-w-[130px] rounded-lg border border-white/[.07] bg-black/25 px-2.5 py-2 text-[10px] font-medium text-white/65 outline-none sm:max-w-none">
            {storePages.map((page) => <option key={page.value} value={page.value}>{page.label}</option>)}
          </select>
        </div>
        <div className="hidden text-[10px] text-white/28 sm:block">Live preview · {s.design.name}</div>
        <button onClick={() => { if (s.variantMode) { s.setVariantMode(false); } else { s.setCompare(!s.compare); } }} className={`rounded-lg border px-3 py-1.5 text-[10px] font-medium transition ${s.compare ? "border-violet-400/25 bg-violet-400/10 text-violet-200" : "border-white/[.07] bg-white/[.03] text-white/45 hover:text-white"}`}>
          {s.variantMode ? "Exit variants" : s.compare ? "Exit compare" : "Compare"}
        </button>
      </div>

      <div className="preview-scroll flex-1 overflow-auto p-2 sm:p-4 md:p-6">
        <AnimatePresence mode="popLayout">
          {s.variantMode && s.variants.length ? (
            <motion.div key="variants" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid min-h-full gap-4 2xl:grid-cols-3">
              {s.variants.slice(0, 3).map((variant, index) => (
                <VariantPane key={variant.id} label={`Variant ${String.fromCharCode(65 + index)}`} designName={variant.name} onSelect={() => { s.selectVariant(index); s.addVersion(variant); }}>
                  <StorefrontPreview design={variant} compact device="desktop" page={s.storePage} />
                </VariantPane>
              ))}
            </motion.div>
          ) : s.compare && s.previousDesign ? (
            <motion.div key="compare" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid min-h-full gap-4 xl:grid-cols-2">
              <ComparePane label="Previous" designName={s.previousDesign.name}><StorefrontPreview design={s.previousDesign} compact device="desktop" page={s.storePage} /></ComparePane>
              <ComparePane label="Current" designName={s.design.name}><StorefrontPreview design={s.design} compact device="desktop" page={s.storePage} /></ComparePane>
            </motion.div>
          ) : (
            <motion.div
              key={`${s.device}-${s.design.id}`}
              initial={previewInitial}
              animate={previewAnimate}
              transition={previewTransition}
              className="mx-auto min-h-full overflow-hidden border border-white/[.08] bg-white shadow-2xl shadow-black/30"
              style={{ width: widths[s.device], maxWidth: "100%", borderRadius: s.device === "mobile" ? 30 : 18 }}
            >
              {s.device === "mobile" && <div className="flex h-6 items-center justify-center bg-black"><div className="h-1 w-16 rounded-full bg-white/30" /></div>}
              <StorefrontPreview design={s.design} device={s.device} page={s.storePage} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {s.generating && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pointer-events-none absolute inset-12 top-12 flex items-center justify-center bg-black/25 backdrop-blur-[2px]">
            <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="glass rounded-2xl px-5 py-4 text-center shadow-2xl">
              <motion.div animate={{ scale: [1, 1.15, 1], rotate: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.1 }} className="mx-auto mb-2 h-7 w-7 rounded-full bg-violet-400/20" />
              <div className="text-xs font-semibold">Exploring a new direction</div>
              <div className="mt-1 text-[10px] text-white/38">Balancing palette, typography and motion…</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

function VariantPane({ label, designName, onSelect, children }: { label: string; designName: string; onSelect: () => void; children: React.ReactNode }) {
  return <div className="overflow-hidden rounded-2xl border border-violet-300/[.12] bg-white"><div className="sticky top-0 z-20 flex items-center justify-between gap-3 bg-[#111217]/95 px-3 py-2 text-white backdrop-blur"><div className="min-w-0"><div className="text-[9px] uppercase tracking-[.16em] text-violet-200/70">{label}</div><div className="truncate text-xs font-medium">{designName}</div></div><button onClick={onSelect} className="rounded-lg bg-white px-2.5 py-1.5 text-[9px] font-semibold text-black">Use this</button></div>{children}</div>;
}

function ComparePane({ label, designName, children }: { label: string; designName: string; children: React.ReactNode }) {
  return <div className="overflow-hidden rounded-2xl border border-white/[.08] bg-white"><div className="sticky top-0 z-20 flex items-center justify-between bg-[#111217]/95 px-3 py-2 text-white backdrop-blur"><div><div className="text-[9px] uppercase tracking-[.16em] text-white/30">{label}</div><div className="text-xs font-medium">{designName}</div></div><X size={13} className="text-white/20" /></div>{children}</div>;
}
