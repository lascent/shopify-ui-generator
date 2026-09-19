import type { Creativity, DesignGenome } from "@/types/design";

export type DesignFingerprint = {
  header: string;
  hero: string;
  heroAlignment: string;
  heroMediaPosition: string;
  compositionFamily: string;
  sectionOrder: string;
  sectionVariants: string;
  productGrid: string;
  productAnatomy: string;
  pricingComposition: string;
  fontPairing: string;
  paletteFamily: string;
  motionLanguage: string;
  interactionProfile: string;
  footer: string;
  spacingRhythm: string;
  imageRhythm: string;
};

export function designFingerprint(design: DesignGenome): DesignFingerprint {
  return {
    header: design.layout.nav,
    hero: design.layout.hero,
    heroAlignment: design.composition?.heroAlignment ?? "left",
    heroMediaPosition: design.composition?.heroMediaPlacement ?? "background",
    compositionFamily: design.composition?.pageFamily ?? design.archetype ?? "editorial",
    sectionOrder: design.sections.map((section) => section.type).join("|"),
    sectionVariants: design.sections.map((section) => section.variant).join("|"),
    productGrid: design.layout.productGrid,
    productAnatomy: design.productAnatomy ?? design.commerce?.cardStyle ?? "minimal",
    pricingComposition: design.pricingComposition ?? design.commerce?.priceStyle ?? "standard",
    fontPairing: design.typographyPair?.name ?? design.typography.pairName ?? design.typography.fontName,
    paletteFamily: `${design.palette.background}:${design.palette.primary}:${design.palette.accent}`,
    motionLanguage: design.motionLanguage?.name ?? design.motion.preset,
    interactionProfile: design.interactionProfile?.name ?? "legacy",
    footer: design.layout.footer ?? "minimal",
    spacingRhythm: design.composition?.whitespaceProfile ?? design.layout.sectionRhythm ?? "balanced",
    imageRhythm: design.composition?.imageRhythm ?? design.commerce?.imageRatio ?? "uniform",
  };
}

export function structuralSimilarityScore(a: DesignGenome, b: DesignGenome) {
  const fa = designFingerprint(a);
  const fb = designFingerprint(b);
  const structuralKeys: (keyof DesignFingerprint)[] = ["header","hero","heroAlignment","heroMediaPosition","compositionFamily","sectionOrder","sectionVariants","productGrid","productAnatomy","footer","spacingRhythm","imageRhythm"];
  const matches = structuralKeys.filter((key) => fa[key] === fb[key]).length;
  return matches / structuralKeys.length;
}

export function visualDNASimilarity(a: DesignGenome, b: DesignGenome) {
  const fa = designFingerprint(a);
  const fb = designFingerprint(b);
  const keys = Object.keys(fa) as (keyof DesignFingerprint)[];
  return keys.filter((key) => fa[key] === fb[key]).length / keys.length;
}

export const noveltyScore = (a: DesignGenome, b: DesignGenome) => Math.round((1 - visualDNASimilarity(a, b)) * 100);

export function requiredNovelty(creativity: Creativity) {
  if (creativity === "experimental") return 58;
  if (creativity === "balanced") return 38;
  return 10;
}

export function majorAxisDifferenceCount(a: DesignGenome, b: DesignGenome) {
  const fa = designFingerprint(a);
  const fb = designFingerprint(b);
  const axes: (keyof DesignFingerprint)[] = ["header","hero","compositionFamily","sectionOrder","sectionVariants","productGrid","productAnatomy","fontPairing","motionLanguage","interactionProfile","pricingComposition","footer"];
  return axes.filter((key) => fa[key] !== fb[key]).length;
}
