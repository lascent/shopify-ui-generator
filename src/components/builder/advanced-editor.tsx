"use client";

import { ArrowDown, ArrowUp, Copy, Eye, EyeOff, ImagePlus, Plus, RefreshCw, Sparkles, Trash2 } from "lucide-react";
import { useState } from "react";
import type { ReactNode } from "react";
import { useEditorStore } from "@/store/editor-store";
import { auditStoreMedia, refreshStoreImages } from "@/lib/image-library";
import { regenerateHero, regenerateSection, type SectionRegenerationIntent } from "@/lib/section-regenerator";
import type { SectionSpec, SectionType } from "@/types/design";

const sectionTypes: SectionType[] = [
  "collections", "products", "story", "features", "testimonials", "comparison",
  "campaign", "socialProof", "videoStory", "quote", "faq", "newsletter",
];

const regenerationIntents: { value: SectionRegenerationIntent; label: string }[] = [
  { value: "fresh", label: "Regenerate" },
  { value: "premium", label: "Make premium" },
  { value: "simpler", label: "Make simpler" },
  { value: "conversion", label: "More conversion-focused" },
  { value: "layout", label: "Try another layout" },
];

const defaultVariant: Record<SectionType, SectionSpec["variant"]> = {
  collections: "clean",
  products: "cards",
  story: "split",
  testimonials: "cards",
  faq: "minimal",
  newsletter: "clean",
  features: "cards",
  quote: "editorial",
  campaign: "contrast",
  comparison: "cards",
  socialProof: "rail",
  videoStory: "immersive",
};

export function AdvancedEditor() {
  const s = useEditorStore();
  const [newType, setNewType] = useState<SectionType>("story");
  const d = s.design;
  const mediaAudit = auditStoreMedia(d.store);

  const regenerateHeroDirection = (intent: SectionRegenerationIntent) => {
    s.setDesign(regenerateHero(s.design, intent));
  };

  const regenerateSectionDirection = (id: string, intent: SectionRegenerationIntent) => {
    s.setDesign(regenerateSection(s.design, id, intent));
  };

  const refreshMedia = () => {
    s.editDesign((design) => {
      design.store = refreshStoreImages(design.store, design.seed + 104729, {
        searchContext: `${design.store.nicheLabel ?? design.store.brandName} premium storefront product photography`,
      });
      return design;
    });
  };

  const editStore = <K extends keyof typeof d.store>(key: K, value: (typeof d.store)[K]) => {
    s.editDesign((design) => {
      design.store[key] = value;
      return design;
    });
  };

  const updateSection = (id: string, patch: Partial<SectionSpec>) => {
    s.editDesign((design) => {
      design.sections = design.sections.map((section) => section.id === id ? { ...section, ...patch } : section);
      return design;
    });
  };

  const moveSection = (id: string, direction: -1 | 1) => {
    s.editDesign((design) => {
      const index = design.sections.findIndex((section) => section.id === id);
      const target = index + direction;
      if (index < 0 || target < 0 || target >= design.sections.length) return design;
      const sections = [...design.sections];
      [sections[index], sections[target]] = [sections[target], sections[index]];
      design.sections = sections;
      return design;
    });
  };

  const duplicateSection = (id: string) => {
    s.editDesign((design) => {
      const index = design.sections.findIndex((section) => section.id === id);
      if (index < 0) return design;
      const original = design.sections[index];
      const clone: SectionSpec = { ...original, id: crypto.randomUUID(), eyebrow: original.eyebrow ? `${original.eyebrow} variation` : undefined };
      design.sections.splice(index + 1, 0, clone);
      return design;
    });
  };

  const removeSection = (id: string) => {
    s.editDesign((design) => {
      const section = design.sections.find((item) => item.id === id);
      if (!section || section.type === "products") return design;
      design.sections = design.sections.filter((item) => item.id !== id);
      return design;
    });
  };

  const addSection = () => {
    s.editDesign((design) => {
      design.sections.push({ id: crypto.randomUUID(), type: newType, variant: defaultVariant[newType], eyebrow: sectionLabel(newType) });
      return design;
    });
  };

  return (
    <div className="space-y-5">
      <div>
        <div className="mb-2 text-[10px] font-semibold uppercase tracking-[.16em] text-white/35">Store generation tools</div>
        <div className="space-y-3 rounded-xl border border-white/[.06] bg-black/10 p-3">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="text-[11px] font-medium text-white/75">Media intelligence</div>
              <div className="mt-0.5 text-[9px] text-white/35">{mediaAudit.score}/100 · {mediaAudit.uniqueAssets}/{mediaAudit.totalAssets} unique assets</div>
            </div>
            <button onClick={refreshMedia} className="flex items-center gap-1.5 rounded-lg border border-white/[.07] bg-white/[.03] px-2.5 py-2 text-[9px] font-medium text-white/60 hover:bg-white/[.06] hover:text-white"><ImagePlus size={12} /> Refresh media</button>
          </div>
          {mediaAudit.issues.length ? <div className="rounded-lg border border-amber-300/10 bg-amber-300/[.04] px-2.5 py-2 text-[9px] leading-4 text-amber-100/55">{mediaAudit.issues.join(" · ")}</div> : <div className="text-[9px] text-emerald-200/45">Media set is unique, contextual, and gallery-ready.</div>}
          <label className="block text-[9px] text-white/35">
            <span className="flex items-center gap-1.5"><Sparkles size={11} /> Hero regeneration</span>
            <select defaultValue="" onChange={(event) => { const value = event.target.value as SectionRegenerationIntent; if (value) regenerateHeroDirection(value); event.currentTarget.value = ""; }} className="mt-1.5 w-full rounded-lg border border-white/[.06] bg-[#111217] px-2.5 py-2 text-[10px] text-white/65 outline-none">
              <option value="" disabled>Choose hero action…</option>
              {regenerationIntents.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
            </select>
          </label>
        </div>
      </div>

      <div>
        <div className="mb-2 text-[10px] font-semibold uppercase tracking-[.16em] text-white/35">Live store copy</div>
        <div className="space-y-2 rounded-xl border border-white/[.06] bg-black/10 p-3">
          <EditorInput label="Hero kicker" value={d.store.heroKicker} onChange={(value) => editStore("heroKicker", value)} />
          <EditorInput label="Hero title" value={d.store.heroTitle} onChange={(value) => editStore("heroTitle", value)} />
          <EditorTextArea label="Hero body" value={d.store.heroBody} onChange={(value) => editStore("heroBody", value)} />
          <EditorInput label="CTA" value={d.store.cta} onChange={(value) => editStore("cta", value)} />
          <EditorInput label="Announcement" value={d.store.announcement} onChange={(value) => editStore("announcement", value)} />
        </div>
      </div>

      <div>
        <div className="mb-2 text-[10px] font-semibold uppercase tracking-[.16em] text-white/35">Quick styling</div>
        <div className="grid grid-cols-2 gap-2 rounded-xl border border-white/[.06] bg-black/10 p-3">
          <ColorEditor label="Primary" value={d.palette.primary} onChange={(value) => s.editDesign((design) => ({ ...design, palette: { ...design.palette, primary: value } }))} />
          <ColorEditor label="Accent" value={d.palette.accent} onChange={(value) => s.editDesign((design) => ({ ...design, palette: { ...design.palette, accent: value } }))} />
          <ColorEditor label="Background" value={d.palette.background} onChange={(value) => s.editDesign((design) => ({ ...design, palette: { ...design.palette, background: value } }))} />
          <ColorEditor label="Surface" value={d.palette.surface} onChange={(value) => s.editDesign((design) => ({ ...design, palette: { ...design.palette, surface: value } }))} />
          <label className="col-span-2 text-[10px] text-white/40">
            Corner radius · {d.geometry.radius}px
            <input
              type="range"
              min={0}
              max={32}
              value={d.geometry.radius}
              onChange={(e) => s.editDesign((design) => ({ ...design, geometry: { ...design.geometry, radius: Number(e.target.value) } }))}
              className="mt-2 w-full"
            />
          </label>
        </div>
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between gap-2">
          <div className="text-[10px] font-semibold uppercase tracking-[.16em] text-white/35">Section builder</div>
          <div className="text-[9px] text-white/25">Drag-style controls</div>
        </div>
        <div className="space-y-2">
          {d.sections.map((section, index) => (
            <div key={section.id} className="rounded-xl border border-white/[.06] bg-black/10 p-2.5">
              <div className="flex items-center gap-2">
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[11px] font-medium capitalize text-white/75">{sectionLabel(section.type)}</div>
                  <div className="text-[9px] capitalize text-white/30">{section.variant} · {section.spacing ?? "balanced"}</div>
                </div>
                <MiniButton label="Move up" disabled={index === 0} onClick={() => moveSection(section.id, -1)}><ArrowUp size={12} /></MiniButton>
                <MiniButton label="Move down" disabled={index === d.sections.length - 1} onClick={() => moveSection(section.id, 1)}><ArrowDown size={12} /></MiniButton>
                <MiniButton label={section.hidden ? "Show section" : "Hide section"} onClick={() => updateSection(section.id, { hidden: !section.hidden })}>{section.hidden ? <Eye size={12} /> : <EyeOff size={12} />}</MiniButton>
                <MiniButton label="Duplicate" onClick={() => duplicateSection(section.id)}><Copy size={12} /></MiniButton>
                <MiniButton label="Delete" disabled={section.type === "products"} onClick={() => removeSection(section.id)}><Trash2 size={12} /></MiniButton>
              </div>
              <div className="mt-2 flex items-center gap-2">
                <RefreshCw size={11} className="shrink-0 text-white/25" />
                <select defaultValue="" onChange={(event) => { const value = event.target.value as SectionRegenerationIntent; if (value) regenerateSectionDirection(section.id, value); event.currentTarget.value = ""; }} className="min-w-0 flex-1 rounded-lg border border-white/[.06] bg-[#111217] px-2 py-1.5 text-[10px] text-white/60 outline-none">
                  <option value="" disabled>Regenerate this section…</option>
                  {regenerationIntents.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
                </select>
              </div>
              <div className="mt-2 grid grid-cols-2 gap-2">
                <select value={section.spacing ?? "balanced"} onChange={(e) => updateSection(section.id, { spacing: e.target.value as SectionSpec["spacing"] })} className="rounded-lg border border-white/[.06] bg-[#111217] px-2 py-1.5 text-[10px] text-white/65 outline-none">
                  <option value="compact">Compact spacing</option>
                  <option value="balanced">Balanced spacing</option>
                  <option value="airy">Airy spacing</option>
                </select>
                <select value={section.alignment ?? "left"} onChange={(e) => updateSection(section.id, { alignment: e.target.value as SectionSpec["alignment"] })} className="rounded-lg border border-white/[.06] bg-[#111217] px-2 py-1.5 text-[10px] text-white/65 outline-none">
                  <option value="left">Left align</option>
                  <option value="center">Center align</option>
                  <option value="right">Right align</option>
                </select>
              </div>
              <label className="mt-2 flex items-center gap-2 text-[9px] text-white/35">
                <input type="checkbox" checked={Boolean(section.mobileHidden)} onChange={(e) => updateSection(section.id, { mobileHidden: e.target.checked })} /> Hide on mobile
              </label>
            </div>
          ))}
        </div>
        <div className="mt-2 flex gap-2">
          <select value={newType} onChange={(e) => setNewType(e.target.value as SectionType)} className="min-w-0 flex-1 rounded-xl border border-white/[.07] bg-[#111217] px-3 py-2 text-[10px] capitalize text-white/65 outline-none">
            {sectionTypes.map((type) => <option key={type} value={type}>{sectionLabel(type)}</option>)}
          </select>
          <button onClick={addSection} className="flex items-center gap-1.5 rounded-xl border border-violet-400/20 bg-violet-400/10 px-3 py-2 text-[10px] font-medium text-violet-200 hover:bg-violet-400/15"><Plus size={12} /> Add</button>
        </div>
      </div>
    </div>
  );
}

function sectionLabel(type: SectionType) {
  return type.replace(/([A-Z])/g, " $1").replace(/^./, (value) => value.toUpperCase());
}

function EditorInput({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return <label className="block text-[9px] text-white/35"><span>{label}</span><input value={value} onChange={(e) => onChange(e.target.value)} className="mt-1 w-full rounded-lg border border-white/[.06] bg-white/[.025] px-2.5 py-2 text-[11px] text-white/75 outline-none focus:border-violet-300/30" /></label>;
}

function EditorTextArea({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return <label className="block text-[9px] text-white/35"><span>{label}</span><textarea value={value} onChange={(e) => onChange(e.target.value)} className="mt-1 h-20 w-full resize-none rounded-lg border border-white/[.06] bg-white/[.025] px-2.5 py-2 text-[11px] leading-5 text-white/75 outline-none focus:border-violet-300/30" /></label>;
}

function ColorEditor({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  const colorValue = /^#[0-9a-f]{6}$/i.test(value) ? value : "#000000";
  return <label className="text-[9px] text-white/35"><span>{label}</span><div className="mt-1 flex items-center gap-2 rounded-lg border border-white/[.06] bg-white/[.025] px-2 py-1.5"><input type="color" value={colorValue} onChange={(e) => onChange(e.target.value)} className="h-5 w-6 bg-transparent" /><span className="truncate text-[10px] text-white/60">{value}</span></div></label>;
}

function MiniButton({ label, onClick, disabled = false, children }: { label: string; onClick: () => void; disabled?: boolean; children: ReactNode }) {
  return <button aria-label={label} title={label} disabled={disabled} onClick={onClick} className="rounded-lg border border-white/[.06] bg-white/[.025] p-1.5 text-white/45 transition hover:bg-white/[.06] hover:text-white/80 disabled:cursor-not-allowed disabled:opacity-20">{children}</button>;
}
