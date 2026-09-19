"use client";

import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, Dice5, Grid2X2, Heart, History, Lock, Palette, ScanLine, Sparkles, Type } from "lucide-react";
import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import { ALL_SHOPIFY_CATEGORIES, TOTAL_SHOPIFY_CATEGORIES } from "@/lib/category-taxonomy";
import { fontPresets, generateDesign, palettePresets } from "@/lib/generator";
import { TOTAL_IMAGE_CANDIDATES, TOTAL_VIDEO_CANDIDATES } from "@/lib/image-library";
import { autoRepairDesignV2, qualityAuditV2, similarityScore } from "@/lib/design-quality";
import { NICHE_DIRECTORY, NICHE_PROFILES, requestDesignPlan, type DesignPlan } from "@/lib/design-planner";
import { FOOTER_SYSTEMS, HEADER_SYSTEMS, HERO_SYSTEMS, DESIGN_RECIPES, PRODUCT_SYSTEMS, PRICE_STYLES } from "@/lib/design-system";
import { TOTAL_DESIGN_LIBRARY_DIRECTIONS } from "@/lib/design-library";
import { smartDirectionSuggestionsV2 } from "@/lib/intelligence/art-direction-engine";
import { useEditorStore } from "@/store/editor-store";
import type { Creativity, DesignGenome, GenerateScope } from "@/types/design";
import { LockButton, Pill, SectionTitle } from "@/components/ui/control";
import { VisualCritic } from "@/components/builder/visual-critic";
import { AdvancedEditor } from "@/components/builder/advanced-editor";

const scopes: { value: GenerateScope; label: string }[] = [
  { value: "all", label: "Entire design" },
  { value: "palette", label: "Color palette" },
  { value: "typography", label: "Typography" },
  { value: "layout", label: "Layout" },
  { value: "surfaces", label: "Surfaces" },
  { value: "motion", label: "Animations" },
];

const lockKeys = ["palette", "typography", "layout", "surfaces", "motion", "hero", "products"] as const;

const SMART_DIRECTION_MODIFIERS = [
  { label: "Modern", keywords: ["modern", "clean", "current", "sleek"] },
  { label: "Premium", keywords: ["premium", "luxury", "high end", "high-end", "designer"] },
  { label: "Minimal", keywords: ["minimal", "simple", "quiet", "clean"] },
  { label: "Editorial", keywords: ["editorial", "magazine", "lookbook", "story"] },
  { label: "Cinematic", keywords: ["cinematic", "immersive", "dramatic", "campaign"] },
  { label: "Conversion-focused", keywords: ["conversion", "sales", "selling", "retail", "commerce"] },
  { label: "Motion-led", keywords: ["motion", "moving", "animated", "marquee", "ticker"] },
  { label: "Bold", keywords: ["bold", "vibrant", "graphic", "statement"] },
] as const;

function normalizeDirectionValue(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function directionMatchScore(query: string, candidates: string[]) {
  const q = normalizeDirectionValue(query);
  if (!q) return 0;
  const qTokens = q.split(" ").filter(Boolean);
  let best = 0;

  for (const candidate of candidates) {
    const value = normalizeDirectionValue(candidate);
    if (!value) continue;
    if (value === q) best = Math.max(best, 220);
    if (value.startsWith(q)) best = Math.max(best, 165);
    if (value.includes(q)) best = Math.max(best, 130);
    if (q.includes(value) && value.length >= 4) best = Math.max(best, 112);

    const valueTokens = value.split(" ").filter(Boolean);
    const exactTokenHits = qTokens.filter((token) => valueTokens.includes(token)).length;
    const prefixTokenHits = qTokens.filter((token) => valueTokens.some((item) => item.startsWith(token) || token.startsWith(item))).length;
    const allTokensHit = qTokens.length > 0 && qTokens.every((token) => valueTokens.some((item) => item.includes(token) || token.includes(item)));

    if (allTokensHit) best = Math.max(best, 118 + qTokens.length * 8);
    best = Math.max(best, exactTokenHits * 28 + prefixTokenHits * 13);
  }

  return best;
}

export function LeftPanel() {
  const s = useEditorStore();
  const [historyOpen, setHistoryOpen] = useState(false);
  const [plannerMeta, setPlannerMeta] = useState<DesignPlan | null>(null);
  const [directionFocused, setDirectionFocused] = useState(false);
  const [variantGenerating, setVariantGenerating] = useState(false);
  const favorites = useMemo(() => s.history.filter((v) => v.favorite).length, [s.history]);


  const directionSuggestions = useMemo(() => {
    const rawQuery = s.prompt.trim();
    const query = normalizeDirectionValue(rawQuery);
    if (!query) return [];

    const dedicatedIds = new Set(NICHE_PROFILES.map((item) => item.id));
    const dedicated = NICHE_DIRECTORY
      .map((item) => {
        const candidates = [item.label, ...item.aliases];
        const baseScore = directionMatchScore(rawQuery, candidates);
        const dedicatedBonus = dedicatedIds.has(item.id) ? 18 : 0;
        return {
          label: item.label,
          meta: dedicatedIds.has(item.id) ? "Dedicated niche" : "Dynamic category",
          aliases: item.aliases,
          score: baseScore + dedicatedBonus,
        };
      })
      .filter((item) => item.score > 0);

    const broad = ALL_SHOPIFY_CATEGORIES
      .map((label) => ({
        label,
        meta: "Prompt-ready category",
        aliases: [label],
        score: directionMatchScore(rawQuery, [label]),
      }))
      .filter((item) => item.score > 0);

    const baseMatches = [...dedicated, ...broad]
      .sort((a, b) => b.score - a.score || a.label.localeCompare(b.label));

    const bestBase = baseMatches[0];
    const matchedModifiers = SMART_DIRECTION_MODIFIERS.filter((modifier) =>
      modifier.keywords.some((keyword) => query.includes(normalizeDirectionValue(keyword))),
    );
    const modifierPool = matchedModifiers.length
      ? matchedModifiers
      : SMART_DIRECTION_MODIFIERS.filter((modifier) => ["Modern", "Premium", "Minimal", "Editorial", "Cinematic", "Motion-led"].includes(modifier.label));

    const smartDirections = bestBase
      ? modifierPool.map((modifier, index) => ({
          label: `${modifier.label} ${bestBase.label}`,
          meta: "Smart direction",
          aliases: [rawQuery, bestBase.label, ...bestBase.aliases, ...modifier.keywords],
          score: bestBase.score + (matchedModifiers.includes(modifier) ? 42 : 14) - index,
        }))
      : matchedModifiers.map((modifier, index) => ({
          label: `${modifier.label} Storefront`,
          meta: "Style direction",
          aliases: [rawQuery, ...modifier.keywords],
          score: 120 - index,
        }));

    const intelligentSuggestions = smartDirectionSuggestionsV2(rawQuery).map((item) => ({
      label: item.label,
      meta: item.meta,
      aliases: [rawQuery, item.label],
      score: item.score,
    }));

    const seen = new Set<string>();
    return [...intelligentSuggestions, ...smartDirections, ...baseMatches]
      .sort((a, b) => b.score - a.score || a.label.localeCompare(b.label))
      .filter((item) => {
        const key = normalizeDirectionValue(item.label);
        if (!key || seen.has(key)) return false;
        seen.add(key);
        return true;
      })
      .slice(0, 16);
  }, [s.prompt]);

  function applyDirectionSuggestion(label: string, aliases: string[] = []) {
    const current = s.prompt.trim();
    const normalized = normalizeDirectionValue(current);
    const isOnlySearchTerm = !current || normalized === normalizeDirectionValue(label) || aliases.some((alias) => normalizeDirectionValue(alias) === normalized);
    s.setPrompt(isOnlySearchTerm ? label : `${label} — ${current}`);
    setDirectionFocused(false);
  }

  function generateBestCandidate(planner: DesignPlan, noveltyPool: DesignGenome[], attempts = 14) {
    const maxSimilarity = s.creativity === "experimental" ? 0.56 : s.creativity === "balanced" ? 0.7 : 0.86;
    const minQuality = s.creativity === "experimental" ? 86 : s.creativity === "balanced" ? 82 : 76;
    let best = s.design;
    let bestScore = -Infinity;

    for (let attempt = 0; attempt < attempts; attempt += 1) {
      const candidate = autoRepairDesignV2(generateDesign({
        current: attempt === 0 ? s.design : best,
        locks: s.locks,
        scope: s.scope,
        creativity: s.creativity,
        prompt: s.prompt,
        shopTitle: s.shopTitle,
        planner,
      }));
      const audit = qualityAuditV2(candidate);
      const similarity = noveltyPool.length ? Math.max(...noveltyPool.map((item) => similarityScore(item, candidate))) : 0;
      const candidateScore = audit.score - similarity * 42 - audit.blocking.length * 20 - audit.warnings.length * 1.5 + audit.mediaScore * 0.04 + audit.coherenceScore * 0.03 + audit.structuralNoveltyScore * 0.045 + audit.sectionDiversityScore * 0.035 + audit.antiAIRepetitionScore * 0.04 + audit.artDirectionCoherenceScore * 0.04 + audit.interactionConsistencyScore * 0.025;
      if (candidateScore > bestScore) {
        best = candidate;
        bestScore = candidateScore;
      }
      if (audit.score >= minQuality && similarity <= maxSimilarity && audit.blocking.length === 0) break;
    }
    return best;
  }

  async function generate() {
    s.setGenerating(true);
    s.setVariantMode(false);
    try {
      const planner = await requestDesignPlan({
        prompt: s.prompt,
        currentCategory: s.design.store.category,
        creativity: s.creativity,
        shopTitle: s.shopTitle,
      });
      setPlannerMeta(planner);
      await new Promise((resolve) => setTimeout(resolve, 140));
      const recent = s.history.slice(0, 10).map((item) => item.design);
      const best = generateBestCandidate(planner, recent);
      s.setVariants([]);
      s.setDesign(best);
      s.addVersion(best);
    } finally {
      s.setGenerating(false);
    }
  }

  async function generateVariants() {
    s.setGenerating(true);
    setVariantGenerating(true);
    try {
      const planner = await requestDesignPlan({
        prompt: s.prompt,
        currentCategory: s.design.store.category,
        creativity: s.creativity,
        shopTitle: s.shopTitle,
      });
      setPlannerMeta(planner);
      const recent = s.history.slice(0, 8).map((item) => item.design);
      const variants: DesignGenome[] = [];
      for (let index = 0; index < 3; index += 1) {
        const candidate = generateBestCandidate(planner, [...recent, ...variants], 12);
        variants.push({ ...candidate, id: crypto.randomUUID(), name: `${candidate.name} · ${String.fromCharCode(65 + index)}` });
      }
      s.setVariants(variants);
      s.setVariantMode(true);
      s.setCompare(false);
    } finally {
      setVariantGenerating(false);
      s.setGenerating(false);
    }
  }

  const d = s.design;

  return (
    <aside className="builder-panel panel-scroll h-full overflow-y-auto border-r border-white/[.06] bg-[#0d0e12]/90 p-4 backdrop-blur-xl xl:p-5">
      <div className="space-y-6">
        <section>
          <div className="mb-3 flex items-center justify-between gap-3">
            <SectionTitle>Workspace</SectionTitle>
            <button type="button" onClick={() => s.setDesignLibraryOpen(true)} className="mb-3 flex items-center gap-1.5 rounded-lg border border-violet-300/15 bg-violet-300/[.055] px-2.5 py-1.5 text-[9px] font-semibold text-violet-100 transition hover:bg-violet-300/[.1]">
              <Grid2X2 size={11} /> Browse {TOTAL_DESIGN_LIBRARY_DIRECTIONS.toLocaleString()} designs
            </button>
          </div>
          <div className="rounded-2xl border border-white/[.08] bg-white/[.035] p-3.5">
            <div>
              <div className="mb-2 flex items-center justify-between gap-3">
                <div className="text-[11px] font-semibold uppercase tracking-[.16em] text-white/42">Shop title</div>
                <div className="text-[10px] text-white/25">Applied when you generate</div>
              </div>
              <input
                value={s.shopTitle}
                onChange={(e) => s.setShopTitle(e.target.value)}
                maxLength={48}
                placeholder="e.g. NOVA, Zense Studio, North & Co."
                className="w-full rounded-xl border border-white/[.08] bg-black/15 px-3 py-3 text-sm font-semibold text-white outline-none transition placeholder:font-normal placeholder:text-white/28 focus:border-violet-300/35 focus:bg-white/[.035]"
              />
            </div>

            <div className="mt-4">
              <div className="mb-2 flex items-center justify-between gap-3">
                <div className="text-[11px] font-semibold uppercase tracking-[.16em] text-white/42">Design direction</div>
                <div className="text-[10px] text-white/28">Search {TOTAL_SHOPIFY_CATEGORIES} categories</div>
              </div>
              <textarea
                value={s.prompt}
                onChange={(e) => s.setPrompt(e.target.value)}
                onFocus={() => setDirectionFocused(true)}
                onBlur={() => window.setTimeout(() => setDirectionFocused(false), 120)}
                placeholder="Search a store type or describe the direction — cars, phones, seafood, watches, glasses, kitchen appliances, sofas, beds, cameras, gaming, skincare, tools, groceries, and more."
                className="h-28 w-full resize-none rounded-xl border border-white/[.06] bg-black/15 px-3 py-3 text-sm leading-6 text-white outline-none placeholder:text-white/28 focus:border-violet-300/30"
              />

              {directionFocused && s.prompt.trim() ? (
                <div className="mt-2 overflow-hidden rounded-xl border border-white/[.09] bg-[#121319] shadow-2xl">
                  <div className="flex items-center justify-between gap-3 border-b border-white/[.06] px-3 py-2">
                    <div className="text-[10px] font-semibold uppercase tracking-[.16em] text-white/32">Matching directions</div>
                    <div className="text-[10px] text-white/24">{directionSuggestions.length} smart matches</div>
                  </div>
                  {directionSuggestions.length ? (
                    <div className="max-h-80 overflow-y-auto p-1.5">
                      {directionSuggestions.map((item) => (
                        <button
                          key={`${item.meta}:${item.label}`}
                          type="button"
                          onMouseDown={(event) => event.preventDefault()}
                          onClick={() => applyDirectionSuggestion(item.label, item.aliases)}
                          className="flex w-full min-w-0 items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-left transition hover:bg-white/[.055]"
                        >
                          <span className="min-w-0 flex-1 break-words text-sm font-medium leading-5 text-white/82">{item.label}</span>
                          <span className="shrink-0 rounded-full border border-white/[.06] bg-white/[.025] px-2 py-1 text-[9px] text-white/32">{item.meta}</span>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="px-3 py-4 text-xs leading-5 text-white/34">Keep typing — the matcher uses category names, niche aliases, and design-style words such as modern, premium, editorial, cinematic, minimal, and motion.</div>
                  )}
                </div>
              ) : (
                <div className="mt-2 text-[10px] leading-4 text-white/25">Type a store category or a style direction to see smarter matching directions.</div>
              )}
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2">
            <motion.button
              onClick={generate}
              disabled={s.generating}
              whileTap={{ scale: 0.985 }}
              className="flex min-h-12 min-w-0 items-center justify-center gap-2 rounded-xl bg-white px-3 py-3 text-sm font-bold text-black disabled:opacity-60"
            >
              {s.generating ? (
                <motion.span animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                  <Sparkles size={15} />
                </motion.span>
              ) : (
                <Dice5 size={15} />
              )}
              {s.generating ? "Generating..." : "Generate"}
            </motion.button>
            <button
              type="button"
              aria-label="Generate 3 A/B/C variants"
              onClick={generateVariants}
              disabled={s.generating || variantGenerating}
              className="flex min-h-12 min-w-0 items-center justify-center gap-2 rounded-xl border border-violet-300/15 bg-violet-300/[.06] px-3 py-3 text-xs font-semibold text-violet-100 transition hover:bg-violet-300/[.10] disabled:opacity-50"
            >
              <Sparkles size={13} className="shrink-0" /> <span className="min-w-0 text-center leading-4">{variantGenerating ? "Building 3..." : "Generate 3"}</span>
            </button>
            </div>

            <div className="mt-3 grid gap-3">
              <div>
                <div className="mb-2 text-[11px] font-semibold uppercase tracking-[.16em] text-white/42">Generate scope</div>
                <select
                  value={s.scope}
                  onChange={(e) => s.setScope(e.target.value as GenerateScope)}
                  className="w-full min-w-0 truncate rounded-xl border border-white/[.08] bg-white/[.04] px-3 py-3 text-sm text-white outline-none"
                >
                  {scopes.map((scope) => (
                    <option className="bg-[#15161b]" value={scope.value} key={scope.value}>
                      {scope.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <div className="mb-2 text-[11px] font-semibold uppercase tracking-[.16em] text-white/42">Exploration</div>
                <div className="grid grid-cols-3 gap-2 rounded-xl border border-white/[.07] bg-black/20 p-1.5">
                  {(["safe", "balanced", "experimental"] as Creativity[]).map((c) => (
                    <Pill key={c} active={s.creativity === c} onClick={() => s.setCreativity(c)}>
                      {c === "experimental" ? "Create New Design" : c === "balanced" ? "Try Variations" : "Keep Current"}
                    </Pill>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-3 rounded-xl border border-emerald-400/10 bg-emerald-400/[.04] px-3 py-2.5 text-[11px] leading-5 text-white/52">
              Keep Current keeps the current layout and style and makes only small improvements. Try Variations creates noticeable changes while keeping some of the current design. Create New Design generates a very different layout, structure, style, product presentation, footer, and animation direction. The direction parser also weighs niche, tone, layout intent, promotional language, media intent, and category keywords.
            </div>
            {plannerMeta ? (
              <div className="mt-3 rounded-xl border border-violet-400/15 bg-violet-400/[.05] px-3 py-2.5 text-[11px] leading-5 text-white/58">
                <div className="flex items-center justify-between gap-3"><span className="font-semibold text-violet-200">{plannerMeta.source === "openai" ? "AI Design Planner" : "Smart Design Planner"}</span><span>{plannerMeta.confidence}% confidence</span></div>
                <div className="mt-1">{plannerMeta.summary}</div>
              </div>
            ) : null}

            {s.variants.length ? (
              <div className="mt-3 grid grid-cols-3 gap-2">
                {s.variants.map((variant, index) => {
                  const audit = qualityAuditV2(variant);
                  return (
                    <button key={variant.id} type="button" onClick={() => { s.selectVariant(index); s.addVersion(variant); }} className="rounded-xl border border-white/[.07] bg-black/15 p-2 text-left transition hover:border-violet-300/25 hover:bg-violet-300/[.05]">
                      <div className="text-[9px] font-semibold uppercase tracking-[.16em] text-violet-200">Variant {String.fromCharCode(65 + index)}</div>
                      <div className="mt-1 truncate text-[10px] text-white/65">{variant.layout.hero} · {variant.layout.productGrid}</div>
                      <div className="mt-1 text-[9px] text-white/32">QA {audit.score}/100</div>
                    </button>
                  );
                })}
              </div>
            ) : null}
          </div>
        </section>

        <section>
          <SectionTitle>Live design summary</SectionTitle>
          <div className="rounded-2xl border border-white/[.08] bg-white/[.035] p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h2 className="truncate text-sm font-semibold text-white">{d.name}</h2>
                <p className="mt-1 text-[11px] leading-5 text-white/42">{d.description}</p>
              </div>
              <Sparkles size={14} className="shrink-0 text-violet-300" />
            </div>
            <div className="mt-4 flex gap-1.5">{Object.values(d.palette).slice(0, 6).map((c, i) => <div key={i} className="h-8 flex-1 rounded-md border border-white/10" style={{ background: c }} />)}</div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <SnapshotCard label="Brand" value={d.store.brandName} />
              <SnapshotCard label="Direction" value={d.archetype ?? "modern"} />
              <SnapshotCard label="Header" value={d.layout.nav} />
              <SnapshotCard label="Hero" value={d.layout.hero} />
              <SnapshotCard label="Products" value={d.layout.productGrid} />
              <SnapshotCard label="Footer" value={d.layout.footer ?? "columns"} />
              <SnapshotCard label="Pricing" value={d.commerce?.priceStyle ?? "standard"} />
              <SnapshotCard label="Motion" value={d.motion.preset} />
            </div>
          </div>
        </section>

        <section>
          <SectionTitle>Resources</SectionTitle>
          <div className="grid grid-cols-2 gap-2">
            <StatCard label="Typography pool" value={`${fontPresets.length} modern fonts`} />
            <StatCard label="Palette pool" value={`${palettePresets.length} palettes`} />
            <StatCard label="Store types" value={`9 base / ${TOTAL_SHOPIFY_CATEGORIES} prompt-ready`} />
            <StatCard label="Dedicated niches" value={`${NICHE_PROFILES.length} dedicated profiles`} />
            <StatCard label="HD image library" value={`${TOTAL_IMAGE_CANDIDATES.toLocaleString()} candidates`} />
            <StatCard label="Motion media" value={`${TOTAL_VIDEO_CANDIDATES} video loops`} />
            <StatCard label="Animation styles" value={`26 motion presets`} />
            <StatCard label="Design recipes" value={`${Object.values(DESIGN_RECIPES).reduce((total, recipes) => total + recipes.length, 0)} curated directions`} />
            <StatCard label="Header systems" value={`${HEADER_SYSTEMS.length} architectures`} />
            <StatCard label="Hero systems" value={`${HERO_SYSTEMS.length} architectures`} />
            <StatCard label="Product systems" value={`${PRODUCT_SYSTEMS.length} layouts`} />
            <StatCard label="Footer systems" value={`${FOOTER_SYSTEMS.length} architectures`} />
            <StatCard label="Price formats" value={`${PRICE_STYLES.length} systems`} />
          </div>
        </section>

        <section>
          <SectionTitle>Visual quality</SectionTitle>
          <VisualCritic />
        </section>

        <section>
          <SectionTitle>Advanced live editor</SectionTitle>
          <AdvancedEditor />
        </section>

        <section>
          <SectionTitle>Generation locks <span className="normal-case tracking-normal text-white/22">preserve what works</span></SectionTitle>
          <div className="space-y-1.5 rounded-2xl border border-white/[.08] bg-white/[.03] p-2">
            {lockKeys.map((key) => (
              <div key={key} className="flex items-center justify-between rounded-xl border border-transparent px-2 py-2 hover:border-white/[.05] hover:bg-white/[.025]">
                <div className="flex min-w-0 items-center gap-2.5">
                  <Lock size={11} className={s.locks[key] ? "text-violet-300" : "text-white/22"} />
                  <span className="text-sm capitalize text-white/68">{key}</span>
                </div>
                <LockButton locked={s.locks[key]} onClick={() => s.toggleLock(key)} label={key} />
              </div>
            ))}
          </div>
        </section>

        <section>
          <SectionTitle>Design genome</SectionTitle>
          <div className="space-y-5">
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

            <Property title="Commerce" icon={<Sparkles size={13} />} locked={s.locks.products} onLock={() => s.toggleLock("products")}>
              <Row label="Direction" value={d.archetype ?? "modern"} />
              <Row label="Card style" value={d.commerce?.cardStyle ?? "softCard"} />
              <Row label="Price style" value={d.commerce?.priceStyle ?? "standard"} />
              <Row label="Footer" value={d.layout.footer ?? "columns"} />
            </Property>

            <Property title="Motion" icon={<Sparkles size={13} />} locked={s.locks.motion} onLock={() => s.toggleLock("motion")}>
              <Row label="Preset" value={d.motion.preset} />
              <Row label="Duration" value={`${d.motion.duration}s`} />
              <Row label="Hover lift" value={`${d.motion.hoverLift}px`} />
              <Row label="Hover scale" value={`${d.motion.hoverScale}x`} />
            </Property>
          </div>
        </section>

        <section>
          <button onClick={() => setHistoryOpen((v) => !v)} className="flex w-full items-center justify-between">
            <SectionTitle>History</SectionTitle>
            <ChevronDown size={14} className={`mb-3 text-white/35 transition ${historyOpen ? "rotate-180" : ""}`} />
          </button>
          <div className="grid grid-cols-2 gap-2">
            <StatCard icon={<History size={14} className="text-white/35" />} label="Directions" value={String(s.history.length)} compact />
            <StatCard icon={<Heart size={14} className="text-white/35" />} label="Favorites" value={String(favorites)} compact />
          </div>
          <AnimatePresence initial={false}>
            {historyOpen && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="mt-3 space-y-2 overflow-hidden">
                {s.history.slice(0, 8).map((v, i) => (
                  <div key={v.id} className="flex items-center gap-2 rounded-xl border border-white/[.06] bg-white/[.025] p-2.5">
                    <button onClick={() => s.restoreVersion(v.id)} className="min-w-0 flex-1 text-left">
                      <div className="truncate text-sm font-medium text-white/86">{v.label}</div>
                      <div className="mt-1 text-[10px] text-white/34">#{s.history.length - i} · seed {v.design.seed}</div>
                    </button>
                    <button onClick={() => s.toggleFavorite(v.id)} className={v.favorite ? "text-rose-300" : "text-white/25"}>
                      <Heart size={14} fill={v.favorite ? "currentColor" : "none"} />
                    </button>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </div>
    </aside>
  );
}

function designSignature(design: DesignGenome) {
  return [
    design.store.category,
    design.archetype ?? "modern",
    design.layout.nav,
    design.layout.hero,
    design.layout.productGrid,
    design.layout.footer ?? "columns",
    design.commerce?.priceStyle ?? "standard",
    design.commerce?.cardStyle ?? "softCard",
    design.motion.preset,
    design.typography.fontName,
    design.palette.primary,
    design.sections.map((section) => section.type).join(","),
  ].join("|");
}

function StatCard({ label, value, icon, compact = false }: { label: string; value: string; icon?: ReactNode; compact?: boolean }) {
  return (
    <div className={`rounded-xl border border-white/[.07] bg-white/[.025] ${compact ? "p-3" : "px-3 py-2.5"}`}>
      {icon ? <div className="mb-2">{icon}</div> : null}
      <div className="text-[10px] uppercase tracking-[.14em] text-white/28">{label}</div>
      <div className={`mt-1 ${compact ? "text-lg" : "text-xs"} font-semibold text-white/78`}>{value}</div>
    </div>
  );
}

function SnapshotCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/[.07] bg-black/15 px-3 py-2.5">
      <div className="text-[10px] uppercase tracking-[.14em] text-white/30">{label}</div>
      <div className="mt-1 truncate text-sm font-medium capitalize text-white/78">{value}</div>
    </div>
  );
}

function Property({ title, icon, locked, onLock, children }: { title: string; icon: ReactNode; locked: boolean; onLock: () => void; children: ReactNode }) {
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
  return <div className="flex items-center justify-between gap-3 border-b border-white/[.05] px-3 py-2.5 last:border-0"><span className="text-[11px] text-white/34">{label}</span><span className="max-w-[160px] truncate text-[11px] capitalize text-white/72">{value}</span></div>;
}
