"use client";

import { AnimatePresence, motion } from "motion/react";
import {
  Check,
  ChevronRight,
  Clock3,
  Grid2X2,
  Heart,
  Layers3,
  RefreshCw,
  Search,
  Shuffle,
  Sparkles,
  WandSparkles,
  X,
  Zap,
} from "lucide-react";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import {
  DESIGN_LIBRARY,
  DESIGN_LIBRARY_CATEGORIES,
  DESIGN_LIBRARY_LAYOUTS,
  DESIGN_LIBRARY_MOTION_PACKS,
  DESIGN_LIBRARY_STYLES,
  applyDesignLibraryDirection,
  directionPreviewColors,
  type DesignLibraryDirection,
  type LibraryApplyMode,
} from "@/lib/design-library";
import { useEditorStore } from "@/store/editor-store";

// Legacy storage keys are retained so existing users keep favorites and recent designs after the public repo rename.
const STORAGE_FAVORITES = "shopify-generator:design-library-favorites";
const STORAGE_RECENT = "shopify-generator:design-library-recent";

type LibraryTab = "all" | "favorites" | "recent";

export function DesignLibrary() {
  const s = useEditorStore();
  const [query, setQuery] = useState("");
  const [style, setStyle] = useState("All styles");
  const [layout, setLayout] = useState("All layouts");
  const [motionPack, setMotionPack] = useState("All motion");
  const [density, setDensity] = useState("All density");
  const [category, setCategory] = useState("All categories");
  const [tab, setTab] = useState<LibraryTab>("all");
  const [selectedId, setSelectedId] = useState(DESIGN_LIBRARY[0]?.id ?? "");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const favorites = JSON.parse(window.localStorage.getItem(STORAGE_FAVORITES) ?? "[]");
      const recent = JSON.parse(window.localStorage.getItem(STORAGE_RECENT) ?? "[]");
      s.hydrateLibraryState(Array.isArray(favorites) ? favorites : [], Array.isArray(recent) ? recent : []);
    } catch {
      s.hydrateLibraryState([], []);
    }
    setHydrated(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_FAVORITES, JSON.stringify(s.libraryFavorites));
    window.localStorage.setItem(STORAGE_RECENT, JSON.stringify(s.libraryRecent));
  }, [hydrated, s.libraryFavorites, s.libraryRecent]);

  useEffect(() => {
    if (!s.designLibraryOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") s.setDesignLibraryOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [s.designLibraryOpen, s]);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const recentOrder = new Map(s.libraryRecent.map((id, index) => [id, index]));
    return DESIGN_LIBRARY
      .filter((item) => {
        if (tab === "favorites" && !s.libraryFavorites.includes(item.id)) return false;
        if (tab === "recent" && !recentOrder.has(item.id)) return false;
        if (style !== "All styles" && item.style !== style) return false;
        if (layout !== "All layouts" && item.layoutFamily !== layout) return false;
        if (motionPack !== "All motion" && item.motionPack !== motionPack) return false;
        if (density !== "All density" && item.density !== density) return false;
        if (category !== "All categories" && item.sourceCategory !== category) return false;
        if (!normalized) return true;
        return [item.title, item.style, item.layoutFamily, item.motionPack, ...item.tags]
          .some((value) => value.toLowerCase().includes(normalized));
      })
      .sort((a, b) => {
        if (tab !== "recent") return a.title.localeCompare(b.title);
        return (recentOrder.get(a.id) ?? 999) - (recentOrder.get(b.id) ?? 999);
      });
  }, [query, style, layout, motionPack, density, category, tab, s.libraryFavorites, s.libraryRecent]);

  const selected = DESIGN_LIBRARY.find((item) => item.id === selectedId) ?? filtered[0] ?? DESIGN_LIBRARY[0];

  useEffect(() => {
    if (filtered.length && !filtered.some((item) => item.id === selectedId)) setSelectedId(filtered[0].id);
  }, [filtered, selectedId]);

  function apply(entry: DesignLibraryDirection, mode: LibraryApplyMode) {
    const design = applyDesignLibraryDirection(s.design, entry, mode);
    s.rememberLibraryDirection(entry.id);
    s.setVariants([]);
    s.setVariantMode(false);
    s.setDesign(design);
    s.addVersion(design);
    s.setDesignLibraryOpen(false);
  }

  function resetFilters() {
    setQuery("");
    setStyle("All styles");
    setLayout("All layouts");
    setMotionPack("All motion");
    setDensity("All density");
    setCategory("All categories");
    setTab("all");
  }

  return (
    <AnimatePresence>
      {s.designLibraryOpen ? (
        <motion.div
          className="fixed inset-0 z-[100] bg-black/75 p-2 backdrop-blur-md sm:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label="Design Library"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) s.setDesignLibraryOpen(false);
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.99 }}
            transition={{ duration: 0.2 }}
            className="mx-auto flex h-full max-h-[980px] max-w-[1600px] flex-col overflow-hidden rounded-2xl border border-white/[.09] bg-[#0c0d11] shadow-2xl"
          >
            <header className="flex shrink-0 items-center justify-between gap-4 border-b border-white/[.07] px-4 py-3 sm:px-5">
              <div className="min-w-0">
                <div className="flex items-center gap-2 text-sm font-semibold text-white"><Grid2X2 size={16} className="text-violet-300" />Professional Design Library</div>
                <div className="mt-1 text-[10px] text-white/34">Browse all {DESIGN_LIBRARY.length} curated directions by style, layout, motion, density, and industry.</div>
              </div>
              <button onClick={() => s.setDesignLibraryOpen(false)} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/[.07] bg-white/[.03] text-white/45 transition hover:bg-white/[.07] hover:text-white" aria-label="Close design library">
                <X size={15} />
              </button>
            </header>

            <div className="flex min-h-0 flex-1 flex-col lg:grid lg:grid-cols-[220px_minmax(0,1fr)_300px]">
              <aside className="panel-scroll shrink-0 overflow-y-auto border-b border-white/[.07] p-3 lg:border-b-0 lg:border-r lg:p-4">
                <div className="relative">
                  <Search size={13} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/28" />
                  <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search designs..." className="w-full rounded-xl border border-white/[.07] bg-white/[.035] py-2.5 pl-9 pr-3 text-xs text-white outline-none placeholder:text-white/25 focus:border-violet-300/30" />
                </div>

                <div className="mt-3 grid grid-cols-3 gap-1 rounded-xl border border-white/[.06] bg-black/20 p-1 lg:grid-cols-1">
                  <TabButton active={tab === "all"} onClick={() => setTab("all")} icon={<Layers3 size={12} />} label="All" count={DESIGN_LIBRARY.length} />
                  <TabButton active={tab === "favorites"} onClick={() => setTab("favorites")} icon={<Heart size={12} />} label="Favorites" count={s.libraryFavorites.length} />
                  <TabButton active={tab === "recent"} onClick={() => setTab("recent")} icon={<Clock3 size={12} />} label="Recent" count={s.libraryRecent.length} />
                </div>

                <div className="mt-4 hidden space-y-3 lg:block">
                  <Filter label="Style" value={style} onChange={setStyle} options={["All styles", ...DESIGN_LIBRARY_STYLES]} />
                  <Filter label="Layout family" value={layout} onChange={setLayout} options={["All layouts", ...DESIGN_LIBRARY_LAYOUTS]} />
                  <Filter label="Motion pack" value={motionPack} onChange={setMotionPack} options={["All motion", ...DESIGN_LIBRARY_MOTION_PACKS]} />
                  <Filter label="Density" value={density} onChange={setDensity} options={["All density", "compact", "balanced", "airy"]} />
                  <Filter label="Industry" value={category} onChange={setCategory} options={["All categories", ...DESIGN_LIBRARY_CATEGORIES.map((item) => item.value)]} labelFor={(value) => DESIGN_LIBRARY_CATEGORIES.find((item) => item.value === value)?.label ?? value} />
                  <button onClick={resetFilters} className="w-full rounded-xl border border-white/[.06] px-3 py-2.5 text-[10px] font-medium text-white/40 transition hover:bg-white/[.04] hover:text-white/70">Reset filters</button>
                </div>
              </aside>

              <main className="panel-scroll min-h-0 overflow-y-auto p-3 sm:p-4">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <div>
                    <div className="text-xs font-semibold text-white/78">{filtered.length} matching directions</div>
                    <div className="mt-0.5 text-[10px] text-white/30">Each card is a real layout + commerce + typography + motion recipe.</div>
                  </div>
                  <button onClick={() => {
                    const pool = filtered.length ? filtered : DESIGN_LIBRARY;
                    const item = pool[Math.floor(Math.random() * pool.length)];
                    setSelectedId(item.id);
                  }} className="flex items-center gap-1.5 rounded-lg border border-white/[.07] bg-white/[.025] px-2.5 py-2 text-[10px] text-white/48 transition hover:text-white">
                    <Shuffle size={11} />Surprise me
                  </button>
                </div>

                <div className="mb-3 grid grid-cols-2 gap-2 lg:hidden">
                  <Filter label="Style" value={style} onChange={setStyle} options={["All styles", ...DESIGN_LIBRARY_STYLES]} />
                  <Filter label="Layout" value={layout} onChange={setLayout} options={["All layouts", ...DESIGN_LIBRARY_LAYOUTS]} />
                  <Filter label="Motion" value={motionPack} onChange={setMotionPack} options={["All motion", ...DESIGN_LIBRARY_MOTION_PACKS]} />
                  <Filter label="Density" value={density} onChange={setDensity} options={["All density", "compact", "balanced", "airy"]} />
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 2xl:grid-cols-3">
                  {filtered.map((item) => (
                    <DirectionCard
                      key={item.id}
                      item={item}
                      active={selected?.id === item.id}
                      favorite={s.libraryFavorites.includes(item.id)}
                      onSelect={() => setSelectedId(item.id)}
                      onFavorite={() => s.toggleLibraryFavorite(item.id)}
                      onUse={() => apply(item, "use")}
                    />
                  ))}
                </div>

                {!filtered.length ? (
                  <div className="flex min-h-[320px] flex-col items-center justify-center rounded-2xl border border-dashed border-white/[.08] bg-white/[.02] px-6 text-center">
                    <Search size={24} className="text-white/18" />
                    <div className="mt-3 text-sm font-semibold text-white/70">No design directions match those filters</div>
                    <div className="mt-1 max-w-sm text-xs leading-5 text-white/34">Try a broader style, layout or motion pack. All {DESIGN_LIBRARY.length} curated directions are still available.</div>
                    <button onClick={resetFilters} className="mt-4 rounded-xl bg-white px-4 py-2 text-[10px] font-semibold text-black">Show all designs</button>
                  </div>
                ) : null}
              </main>

              {selected ? (
                <aside className="panel-scroll min-h-0 overflow-y-auto border-t border-white/[.07] bg-white/[.018] p-4 lg:border-l lg:border-t-0">
                  <div className="text-[9px] font-semibold uppercase tracking-[.18em] text-violet-200/70">Selected direction</div>
                  <div className="mt-1 text-lg font-semibold tracking-[-.03em] text-white/92">{selected.title}</div>
                  <div className="mt-1 text-[11px] text-white/34">{selected.style} · {selected.layoutFamily}</div>

                  <div className="mt-4 overflow-hidden rounded-2xl border border-white/[.07] bg-black/20 p-2">
                    <DirectionPreview item={selected} large />
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <Meta label="Style" value={selected.style} />
                    <Meta label="Layout" value={selected.layoutFamily} />
                    <Meta label="Motion" value={selected.motionPack} />
                    <Meta label="Density" value={selected.density} />
                    <Meta label="Hero" value={selected.recipe.hero} />
                    <Meta label="Products" value={selected.recipe.productGrid} />
                  </div>

                  <button onClick={() => apply(selected, "use")} className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-xs font-semibold text-black transition hover:bg-white/90">
                    <Check size={13} />Use this design
                  </button>

                  <div className="mt-2 grid gap-2">
                    <ActionButton icon={<Sparkles size={12} />} label="Generate similar" sub="Same visual DNA, nearby recipe" onClick={() => apply(selected, "similar")} />
                    <ActionButton icon={<Shuffle size={12} />} label="Remix this" sub="Blend the direction with a related system" onClick={() => apply(selected, "remix")} />
                    <ActionButton icon={<Layers3 size={12} />} label="Same layout, different style" sub="Keep composition, change visual language" onClick={() => apply(selected, "sameLayoutDifferentStyle")} />
                    <ActionButton icon={<WandSparkles size={12} />} label="Same style, different layout" sub="Keep art direction, change composition" onClick={() => apply(selected, "sameStyleDifferentLayout")} />
                    <ActionButton icon={<Zap size={12} />} label="Different animation" sub="Keep the design, swap motion pack" onClick={() => apply(selected, "differentMotion")} />
                  </div>

                  <div className="mt-4 rounded-xl border border-emerald-400/10 bg-emerald-400/[.04] p-3 text-[10px] leading-5 text-white/42">
                    Applying a library direction keeps your current shop niche, products and generated content. It replaces the design system around them: hierarchy, hero, product presentation, typography, palette, surface treatment and motion.
                  </div>
                </aside>
              ) : null}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function DirectionCard({ item, active, favorite, onSelect, onFavorite, onUse }: { item: DesignLibraryDirection; active: boolean; favorite: boolean; onSelect: () => void; onFavorite: () => void; onUse: () => void }) {
  return (
    <motion.article layout className={`group overflow-hidden rounded-2xl border bg-white/[.025] transition ${active ? "border-violet-300/40 ring-1 ring-violet-300/10" : "border-white/[.07] hover:border-white/[.14]"}`}>
      <button onClick={onSelect} className="block w-full p-2 text-left">
        <DirectionPreview item={item} />
      </button>
      <div className="px-3 pb-3 pt-1">
        <div className="flex items-start justify-between gap-2">
          <button onClick={onSelect} className="min-w-0 flex-1 text-left">
            <div className="truncate text-xs font-semibold text-white/84">{item.title}</div>
            <div className="mt-1 truncate text-[9px] text-white/30">{item.style} · {item.layoutFamily}</div>
          </button>
          <button onClick={onFavorite} aria-label={favorite ? "Remove from favorites" : "Add to favorites"} className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-white/[.06] ${favorite ? "bg-rose-400/10 text-rose-300" : "text-white/25 hover:text-white/60"}`}>
            <Heart size={12} fill={favorite ? "currentColor" : "none"} />
          </button>
        </div>
        <div className="mt-2 flex items-center justify-between gap-2">
          <div className="flex min-w-0 gap-1">
            <span className="truncate rounded-md bg-white/[.04] px-1.5 py-1 text-[8px] text-white/35">{item.motionPack}</span>
            <span className="rounded-md bg-white/[.04] px-1.5 py-1 text-[8px] capitalize text-white/35">{item.density}</span>
          </div>
          <button onClick={onUse} className="flex shrink-0 items-center gap-1 rounded-lg bg-white px-2 py-1.5 text-[9px] font-semibold text-black opacity-90 transition hover:opacity-100">Use <ChevronRight size={10} /></button>
        </div>
      </div>
    </motion.article>
  );
}

function DirectionPreview({ item, large = false }: { item: DesignLibraryDirection; large?: boolean }) {
  const c = directionPreviewColors(item);
  const split = ["Split Hero", "Product-first", "Single Product"].includes(item.layoutFamily);
  const mosaic = ["Bento", "Mosaic Gallery", "Magazine", "Lookbook"].includes(item.layoutFamily);
  const dense = ["Marketplace", "Catalog Heavy", "Deals", "Mega-menu Retail", "Comparison-led"].includes(item.layoutFamily);
  const editorial = ["Full-bleed Editorial", "Vertical Story", "Story-first", "Luxury Sparse", "Horizontal Editorial"].includes(item.layoutFamily);

  return (
    <div className={`relative overflow-hidden rounded-xl ${large ? "h-52" : "h-36"}`} style={{ background: c.background, color: c.text }}>
      <div className="flex h-7 items-center justify-between border-b px-2" style={{ borderColor: c.border }}>
        <div className="h-1.5 w-8 rounded-full" style={{ background: c.text }} />
        <div className="flex gap-1.5 opacity-50"><i className="h-1 w-4 rounded-full" style={{ background: c.muted }} /><i className="h-1 w-3 rounded-full" style={{ background: c.muted }} /><i className="h-1 w-4 rounded-full" style={{ background: c.muted }} /></div>
        <div className="h-3 w-3 rounded-full" style={{ background: c.primary }} />
      </div>

      {mosaic ? (
        <div className="grid h-[58%] grid-cols-5 gap-1 p-2">
          <div className="col-span-3 row-span-2 rounded-md" style={{ background: `linear-gradient(135deg, ${c.primary}, ${c.accent})` }} />
          <div className="col-span-2 rounded-md" style={{ background: c.surface }} />
          <div className="col-span-1 rounded-md" style={{ background: c.accent }} />
          <div className="col-span-1 rounded-md opacity-70" style={{ background: c.primary }} />
        </div>
      ) : split ? (
        <div className="grid h-[58%] grid-cols-2 gap-2 p-2">
          <div className="flex flex-col justify-center gap-2 px-1"><i className="h-2 w-10 rounded" style={{ background: c.accent }} /><i className="h-3 w-full rounded" style={{ background: c.text }} /><i className="h-1.5 w-4/5 rounded opacity-40" style={{ background: c.muted }} /><i className="h-4 w-12 rounded-full" style={{ background: c.primary }} /></div>
          <div className="rounded-lg" style={{ background: `linear-gradient(145deg, ${c.surface}, ${c.primary})` }} />
        </div>
      ) : editorial ? (
        <div className="relative h-[58%] p-2">
          <div className="absolute inset-2 rounded-lg opacity-90" style={{ background: `linear-gradient(120deg, ${c.primary}, ${c.surface})` }} />
          <div className="absolute bottom-4 left-4 right-4"><i className="block h-2 w-12 rounded bg-white/55" /><i className="mt-1.5 block h-3 w-3/4 rounded bg-white/90" /></div>
        </div>
      ) : (
        <div className="h-[58%] p-2"><div className="flex h-full flex-col items-center justify-center rounded-lg" style={{ background: c.surface }}><i className="h-2 w-12 rounded" style={{ background: c.primary }} /><i className="mt-2 h-3 w-3/5 rounded" style={{ background: c.text }} /><i className="mt-2 h-1.5 w-2/5 rounded opacity-40" style={{ background: c.muted }} /></div></div>
      )}

      <div className={`grid gap-1.5 px-2 pb-2 ${dense ? "grid-cols-4" : item.layoutFamily === "Horizontal Editorial" ? "grid-cols-3" : "grid-cols-3"}`}>
        {[0, 1, 2, ...(dense ? [3] : [])].map((index) => <div key={index} className="overflow-hidden rounded-md" style={{ background: c.surface }}><div className="h-6" style={{ background: index % 2 ? `${c.primary}55` : `${c.accent}55` }} /><div className="m-1 h-1 w-3/5 rounded opacity-50" style={{ background: c.text }} /></div>)}
      </div>
      <div className="absolute bottom-1 right-1 rounded bg-black/45 px-1.5 py-0.5 text-[7px] font-medium text-white/80 backdrop-blur">{item.motionPack}</div>
    </div>
  );
}

function Filter({ label, value, onChange, options, labelFor }: { label: string; value: string; onChange: (value: string) => void; options: readonly string[]; labelFor?: (value: string) => string }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[9px] font-semibold uppercase tracking-[.15em] text-white/28">{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)} className="w-full rounded-xl border border-white/[.07] bg-[#111218] px-2.5 py-2.5 text-[10px] text-white/62 outline-none focus:border-violet-300/25">
        {options.map((option) => <option key={option} value={option}>{labelFor ? labelFor(option) : option}</option>)}
      </select>
    </label>
  );
}

function TabButton({ active, onClick, icon, label, count }: { active: boolean; onClick: () => void; icon: ReactNode; label: string; count: number }) {
  return <button onClick={onClick} className={`flex items-center justify-between gap-2 rounded-lg px-2.5 py-2 text-[10px] transition ${active ? "bg-white text-black" : "text-white/42 hover:bg-white/[.04] hover:text-white/70"}`}><span className="flex items-center gap-1.5">{icon}{label}</span><span className={active ? "text-black/45" : "text-white/22"}>{count}</span></button>;
}

function Meta({ label, value }: { label: string; value: string }) {
  return <div className="rounded-xl border border-white/[.06] bg-white/[.025] p-2.5"><div className="text-[8px] uppercase tracking-[.13em] text-white/25">{label}</div><div className="mt-1 truncate text-[10px] font-medium capitalize text-white/64">{value}</div></div>;
}

function ActionButton({ icon, label, sub, onClick }: { icon: ReactNode; label: string; sub: string; onClick: () => void }) {
  return <button onClick={onClick} className="flex w-full items-center gap-3 rounded-xl border border-white/[.06] bg-white/[.02] px-3 py-2.5 text-left transition hover:border-violet-300/20 hover:bg-violet-300/[.045]"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/[.05] text-violet-200">{icon}</span><span className="min-w-0 flex-1"><span className="block text-[10px] font-semibold text-white/70">{label}</span><span className="mt-0.5 block truncate text-[9px] text-white/28">{sub}</span></span><RefreshCw size={10} className="text-white/20" /></button>;
}
