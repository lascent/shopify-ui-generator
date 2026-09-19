import type { ArtDirectionName, StoreCategory, TypographyPairSelection } from "@/types/design";

const sans = {
  Inter: "var(--font-inter), ui-sans-serif, system-ui, sans-serif",
  Manrope: "var(--font-manrope), ui-sans-serif, system-ui, sans-serif",
  Poppins: "var(--font-poppins), ui-sans-serif, system-ui, sans-serif",
  DMSans: "var(--font-dm-sans), ui-sans-serif, system-ui, sans-serif",
  PlusJakarta: "var(--font-plus-jakarta), ui-sans-serif, system-ui, sans-serif",
  Geist: "var(--font-geist), ui-sans-serif, system-ui, sans-serif",
  IBMPlex: "var(--font-ibm-plex-sans), ui-sans-serif, system-ui, sans-serif",
  SourceSans: "var(--font-source-sans-3), ui-sans-serif, system-ui, sans-serif",
  Nunito: "var(--font-nunito-sans), ui-sans-serif, system-ui, sans-serif",
  Outfit: "var(--font-outfit), ui-sans-serif, system-ui, sans-serif",
  Urbanist: "var(--font-urbanist), ui-sans-serif, system-ui, sans-serif",
  Sora: "var(--font-sora), ui-sans-serif, system-ui, sans-serif",
  Figtree: "var(--font-figtree), ui-sans-serif, system-ui, sans-serif",
  Archivo: "var(--font-archivo), ui-sans-serif, system-ui, sans-serif",
  Space: "var(--font-space-grotesk), ui-sans-serif, system-ui, sans-serif",
  WorkSans: "var(--font-work-sans), ui-sans-serif, system-ui, sans-serif",
  Montserrat: "var(--font-montserrat), ui-sans-serif, system-ui, sans-serif",
  Bricolage: "var(--font-bricolage-grotesque), ui-sans-serif, system-ui, sans-serif",
  Rubik: "var(--font-rubik), ui-sans-serif, system-ui, sans-serif",
  Raleway: "var(--font-raleway), ui-sans-serif, system-ui, sans-serif",
  Karla: "var(--font-karla), ui-sans-serif, system-ui, sans-serif",
  Mulish: "var(--font-mulish), ui-sans-serif, system-ui, sans-serif",
  Josefin: "var(--font-josefin-sans), ui-sans-serif, system-ui, sans-serif",
  Bebas: "var(--font-bebas-neue), ui-sans-serif, system-ui, sans-serif",
  Cabin: "var(--font-cabin), ui-sans-serif, system-ui, sans-serif",
  Quicksand: "var(--font-quicksand), ui-sans-serif, system-ui, sans-serif",
  Exo: "var(--font-exo-2), ui-sans-serif, system-ui, sans-serif",
};
const serif = {
  Playfair: "var(--font-playfair-display), ui-serif, Georgia, serif",
  Libre: "var(--font-libre-baskerville), ui-serif, Georgia, serif",
  Cormorant: "var(--font-cormorant-garamond), ui-serif, Georgia, serif",
  Lora: "var(--font-lora), ui-serif, Georgia, serif",
  Noto: "var(--font-noto-serif), ui-serif, Georgia, serif",
  Merriweather: "var(--font-merriweather), ui-serif, Georgia, serif",
  Crimson: "var(--font-crimson-pro), ui-serif, Georgia, serif",
};

const pair = (
  name: string,
  headingFamily: string,
  bodyFamily: string,
  opts: Partial<TypographyPairSelection> = {},
): TypographyPairSelection => ({
  name,
  headingFamily,
  bodyFamily,
  displayFamily: opts.displayFamily ?? headingFamily,
  labelFamily: opts.labelFamily ?? bodyFamily,
  priceFamily: opts.priceFamily ?? bodyFamily,
  headingWeight: opts.headingWeight ?? 700,
  bodyWeight: opts.bodyWeight ?? 450,
  headingTracking: opts.headingTracking ?? -0.045,
  bodyTracking: opts.bodyTracking ?? -0.01,
  labelTracking: opts.labelTracking ?? 0.16,
  displayScale: opts.displayScale ?? 1.16,
  headingScale: opts.headingScale ?? 1,
  bodyScale: opts.bodyScale ?? 1,
  priceScale: opts.priceScale ?? 1,
  lineHeight: opts.lineHeight ?? 1.55,
  uppercaseLabels: opts.uppercaseLabels ?? true,
});

export const TYPOGRAPHY_PAIRS: readonly TypographyPairSelection[] = [
  pair("Quiet Luxury", serif.Cormorant, sans.Manrope, { headingWeight: 600, headingTracking: -0.025, displayScale: 1.26, uppercaseLabels: false }),
  pair("Editorial Classic", serif.Playfair, sans.SourceSans, { headingWeight: 600, headingTracking: -0.03, displayScale: 1.2 }),
  pair("Premium Heritage", serif.Libre, sans.DMSans, { headingWeight: 700, headingTracking: -0.018, displayScale: 1.12, uppercaseLabels: false }),
  pair("Modern Grid", sans.Space, sans.Inter, { headingWeight: 700, headingTracking: -0.055, displayScale: 1.2 }),
  pair("Technical System", sans.IBMPlex, sans.Inter, { headingWeight: 600, headingTracking: -0.03, priceFamily: sans.IBMPlex }),
  pair("Futuristic Hardware", sans.Exo, sans.Manrope, { headingWeight: 650, headingTracking: -0.035, displayScale: 1.16 }),
  pair("Street Drop", sans.Bebas, sans.Inter, { headingWeight: 400, headingTracking: 0.01, displayScale: 1.32, labelTracking: 0.2 }),
  pair("Contemporary Studio", sans.Bricolage, sans.Manrope, { headingWeight: 700, headingTracking: -0.045, displayScale: 1.18 }),
  pair("Playful Commerce", sans.Poppins, sans.Nunito, { headingWeight: 650, headingTracking: -0.025, displayScale: 1.08 }),
  pair("Soft Retail", sans.Quicksand, sans.DMSans, { headingWeight: 700, headingTracking: -0.025, uppercaseLabels: false }),
  pair("Magazine Modern", serif.Crimson, sans.Figtree, { headingWeight: 600, headingTracking: -0.02, displayScale: 1.24, uppercaseLabels: false }),
  pair("Scandinavian Utility", sans.Manrope, sans.Inter, { headingWeight: 650, headingTracking: -0.045, displayScale: 1.08 }),
  pair("Fashion Contrast", serif.Cormorant, sans.Figtree, { headingWeight: 600, displayScale: 1.28, uppercaseLabels: true }),
  pair("Boutique Serif", serif.Lora, sans.Karla, { headingWeight: 600, headingTracking: -0.02, displayScale: 1.16, uppercaseLabels: false }),
  pair("Gallery Neutral", sans.Geist, sans.Inter, { headingWeight: 600, headingTracking: -0.055, displayScale: 1.12 }),
  pair("Creator Bold", sans.Archivo, sans.Figtree, { headingWeight: 750, headingTracking: -0.05, displayScale: 1.14 }),
  pair("Product Launch", sans.Sora, sans.Inter, { headingWeight: 700, headingTracking: -0.055, displayScale: 1.18, priceScale: 1.12 }),
  pair("Organic Editorial", serif.Lora, sans.Manrope, { headingWeight: 600, headingTracking: -0.018, uppercaseLabels: false }),
  pair("Clinical Precision", sans.Geist, sans.SourceSans, { headingWeight: 650, headingTracking: -0.045, displayScale: 1.04 }),
  pair("Beauty Journal", serif.Playfair, sans.DMSans, { headingWeight: 600, headingTracking: -0.025, displayScale: 1.2, uppercaseLabels: false }),
  pair("Minimal Product", sans.Figtree, sans.Inter, { headingWeight: 650, headingTracking: -0.045, displayScale: 1.04 }),
  pair("Brutalist Retail", sans.Archivo, sans.WorkSans, { headingWeight: 800, headingTracking: -0.055, displayScale: 1.2, labelTracking: 0.12 }),
  pair("Neo Minimal", sans.Geist, sans.Manrope, { headingWeight: 600, headingTracking: -0.05, displayScale: 1.08 }),
  pair("Japanese Quiet", sans.Josefin, sans.Noto, { headingWeight: 600, headingTracking: -0.02, displayScale: 1.1, uppercaseLabels: false }),
  pair("Furniture Editorial", serif.Crimson, sans.Manrope, { headingWeight: 600, displayScale: 1.24, uppercaseLabels: false }),
  pair("Watch Heritage", serif.Merriweather, sans.Inter, { headingWeight: 700, headingTracking: -0.018, priceFamily: sans.Manrope, uppercaseLabels: false }),
  pair("Watch Technical", sans.IBMPlex, sans.Manrope, { headingWeight: 600, headingTracking: -0.035, priceFamily: sans.IBMPlex, priceScale: 1.08 }),
  pair("Gaming Precision", sans.Exo, sans.Inter, { headingWeight: 700, headingTracking: -0.04, displayScale: 1.22, priceScale: 1.12 }),
  pair("Performance Sport", sans.Sora, sans.Inter, { headingWeight: 750, headingTracking: -0.05, displayScale: 1.14 }),
  pair("Grocery Friendly", sans.Cabin, sans.Inter, { headingWeight: 700, headingTracking: -0.025, uppercaseLabels: false }),
  pair("Artisan Food", serif.Lora, sans.Cabin, { headingWeight: 600, headingTracking: -0.015, uppercaseLabels: false }),
  pair("Luxury Jewelry", serif.Cormorant, sans.DMSans, { headingWeight: 600, headingTracking: -0.02, displayScale: 1.26, uppercaseLabels: false }),
  pair("Dark Cinematic", sans.Space, sans.Manrope, { headingWeight: 650, headingTracking: -0.06, displayScale: 1.22 }),
  pair("Maximal Color", sans.Bricolage, sans.Figtree, { headingWeight: 750, headingTracking: -0.05, displayScale: 1.2 }),
  pair("Marketplace Clear", sans.PlusJakarta, sans.Inter, { headingWeight: 700, headingTracking: -0.04, priceFamily: sans.PlusJakarta, priceScale: 1.08 }),
  pair("Soft Pastel", sans.Raleway, sans.Nunito, { headingWeight: 650, headingTracking: -0.035, uppercaseLabels: false }),
  pair("Fragrance Editorial", serif.Playfair, sans.Figtree, { headingWeight: 600, displayScale: 1.3, uppercaseLabels: false }),
  pair("Anime Kinetic", sans.Bebas, sans.DMSans, { headingWeight: 400, headingTracking: 0.005, displayScale: 1.35, labelTracking: 0.22 }),
  pair("Catalog Rational", sans.Rubik, sans.Inter, { headingWeight: 650, headingTracking: -0.035, priceFamily: sans.Rubik }),
  pair("Conversion Modern", sans.Outfit, sans.Inter, { headingWeight: 700, headingTracking: -0.045, priceFamily: sans.Outfit, priceScale: 1.1 }),
  pair("Editorial Sans", sans.Josefin, sans.Karla, { headingWeight: 650, headingTracking: -0.025, displayScale: 1.2 }),
  pair("Premium Modern", sans.Urbanist, sans.Manrope, { headingWeight: 700, headingTracking: -0.05, displayScale: 1.14 }),
] as const;

const categoryNames: Record<StoreCategory, string[]> = {
  fashion: ["Fashion Contrast", "Street Drop", "Contemporary Studio", "Anime Kinetic", "Magazine Modern", "Editorial Sans"],
  shoes: ["Performance Sport", "Street Drop", "Modern Grid", "Conversion Modern"],
  accessories: ["Luxury Jewelry", "Quiet Luxury", "Boutique Serif", "Premium Modern"],
  home: ["Furniture Editorial", "Japanese Quiet", "Scandinavian Utility", "Organic Editorial", "Neo Minimal"],
  beauty: ["Beauty Journal", "Clinical Precision", "Soft Pastel", "Fragrance Editorial", "Quiet Luxury"],
  food: ["Artisan Food", "Grocery Friendly", "Organic Editorial", "Playful Commerce"],
  outdoor: ["Performance Sport", "Technical System", "Modern Grid", "Catalog Rational"],
  kids: ["Playful Commerce", "Soft Retail", "Soft Pastel", "Maximal Color"],
  tech: ["Technical System", "Gaming Precision", "Futuristic Hardware", "Product Launch", "Marketplace Clear"],
};

const directionPair: Partial<Record<ArtDirectionName, string[]>> = {
  "Quiet Luxury": ["Quiet Luxury", "Premium Heritage", "Boutique Serif"],
  "High Fashion Editorial": ["Fashion Contrast", "Magazine Modern", "Editorial Classic"],
  "Japanese Minimal": ["Japanese Quiet", "Neo Minimal", "Scandinavian Utility"],
  "Technical Marketplace": ["Technical System", "Marketplace Clear", "Catalog Rational"],
  "Gaming Hardware": ["Gaming Precision", "Futuristic Hardware", "Product Launch"],
  "Luxury Jewelry": ["Luxury Jewelry", "Quiet Luxury", "Premium Heritage"],
  "Premium Furniture": ["Furniture Editorial", "Japanese Quiet", "Scandinavian Utility"],
  "Streetwear Drop": ["Street Drop", "Anime Kinetic", "Contemporary Studio"],
  "Clinical Beauty": ["Clinical Precision", "Beauty Journal", "Minimal Product"],
  "Editorial Fragrance": ["Fragrance Editorial", "Quiet Luxury", "Beauty Journal"],
};

const hash = (value: string) => Array.from(value).reduce((acc, char) => ((acc << 5) - acc + char.charCodeAt(0)) | 0, 0);

export function selectTypographyPair(category: StoreCategory, direction: ArtDirectionName, seed: number, prompt = "", currentPair?: string) {
  const names = [...(directionPair[direction] ?? []), ...categoryNames[category]];
  if (/serif|heritage|editorial|luxury/.test(prompt.toLowerCase())) names.unshift("Quiet Luxury", "Editorial Classic", "Magazine Modern");
  if (/tech|gaming|futuristic|spec/.test(prompt.toLowerCase())) names.unshift("Technical System", "Gaming Precision", "Futuristic Hardware");
  const unique = [...new Set(names)].filter((name) => name !== currentPair);
  const candidates = unique.map((name) => TYPOGRAPHY_PAIRS.find((item) => item.name === name)).filter(Boolean) as TypographyPairSelection[];
  const pool = candidates.length ? candidates : [...TYPOGRAPHY_PAIRS];
  return pool[Math.abs(seed + hash(prompt)) % pool.length];
}
