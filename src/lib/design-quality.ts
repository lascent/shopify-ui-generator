import type { DesignGenome } from "@/types/design";

export function designFingerprint(design: DesignGenome) {
  return [
    design.store.category,
    design.archetype ?? "none",
    design.layout.nav,
    design.layout.hero,
    design.layout.productGrid,
    design.layout.footer ?? "none",
    design.commerce?.priceStyle ?? "standard",
    design.commerce?.cardStyle ?? "softCard",
    design.motion.preset,
    design.motionLanguage?.name ?? "legacy-motion",
    design.typographyPair?.name ?? design.typography.fontName,
    design.palette.primary,
    design.artDirection?.name ?? "legacy-direction",
    design.composition?.pageFamily ?? "legacy-composition",
    design.productAnatomy ?? "legacy-card",
    design.pricingComposition ?? "legacy-pricing",
    design.interactionProfile?.name ?? "legacy-interaction",
    design.sections.filter((s) => !s.hidden).map((s) => `${s.type}:${s.variant}`).join(","),
  ];
}

export function similarityScore(a: DesignGenome, b: DesignGenome) {
  const aa = designFingerprint(a);
  const bb = designFingerprint(b);
  let same = 0;
  for (let i = 0; i < Math.min(aa.length, bb.length); i += 1) if (aa[i] === bb[i]) same += 1;
  return same / aa.length;
}

function hexToRgb(value: string) {
  const hex = value.trim().replace("#", "");
  if (!/^[0-9a-f]{6}$/i.test(hex)) return null;
  return {
    r: parseInt(hex.slice(0, 2), 16),
    g: parseInt(hex.slice(2, 4), 16),
    b: parseInt(hex.slice(4, 6), 16),
  };
}

function luminance(value: string) {
  const rgb = hexToRgb(value);
  if (!rgb) return null;
  const channels = [rgb.r, rgb.g, rgb.b].map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
}

function contrast(a: string, b: string) {
  const aa = luminance(a);
  const bb = luminance(b);
  if (aa == null || bb == null) return null;
  const bright = Math.max(aa, bb);
  const dark = Math.min(aa, bb);
  return (bright + 0.05) / (dark + 0.05);
}

function bestTextColor(background: string) {
  const white = contrast("#FFFFFF", background) ?? 0;
  const black = contrast("#111111", background) ?? 0;
  return white >= black ? "#FFFFFF" : "#111111";
}

export type QualityIssue = {
  id: string;
  area: "content" | "layout" | "accessibility" | "motion" | "commerce" | "responsive" | "performance";
  severity: "blocking" | "warning" | "pass";
  message: string;
};

export type QualityAudit = {
  score: number;
  warnings: string[];
  blocking: string[];
  issues: QualityIssue[];
  breakdown: Record<QualityIssue["area"], number>;
};

export function qualityAudit(design: DesignGenome): QualityAudit {
  let score = 80;
  const warnings: string[] = [];
  const blocking: string[] = [];
  const issues: QualityIssue[] = [];
  const breakdown: QualityAudit["breakdown"] = {
    content: 100,
    layout: 100,
    accessibility: 100,
    motion: 100,
    commerce: 100,
    responsive: 100,
    performance: 100,
  };

  const add = (area: QualityIssue["area"], severity: QualityIssue["severity"], id: string, message: string, penalty = 0, bonus = 0) => {
    issues.push({ area, severity, id, message });
    if (severity === "blocking") blocking.push(message);
    if (severity === "warning") warnings.push(message);
    if (penalty) {
      score -= penalty;
      breakdown[area] = Math.max(0, breakdown[area] - penalty * 4);
    }
    if (bonus) score += bonus;
  };

  const visibleSections = design.sections.filter((section) => !section.hidden);
  if (visibleSections.length >= 5 && visibleSections.length <= 8) add("content", "pass", "section-count", "Section count is balanced", 0, 4);
  else if (visibleSections.length < 4) add("content", "blocking", "section-count-low", "Too few visible content sections", 14);
  else if (visibleSections.length > 9) add("content", "warning", "section-count-high", "Page is content-heavy", 5);

  const counts = new Map<string, number>();
  visibleSections.forEach((section) => counts.set(section.type, (counts.get(section.type) ?? 0) + 1));
  if ([...counts.values()].some((count) => count > 2)) add("content", "warning", "section-repeat", "Too many repeated section types", 4);

  if (design.layout.footer) add("layout", "pass", "footer", "Footer architecture is defined", 0, 2);
  if (design.archetype) add("layout", "pass", "archetype", "Commerce archetype is defined", 0, 2);
  if (design.commerce) add("commerce", "pass", "commerce", "Commerce styling is configured", 0, 3);

  if (design.store.products.length < 4) add("commerce", "blocking", "product-count", "At least four products are needed for a believable storefront", 16);
  else add("commerce", "pass", "product-count", "Product count supports merchandising", 0, 2);

  if (design.store.collections.length < 3) add("commerce", "warning", "collection-count", "Collection navigation is too sparse", 4);
  if (!design.store.cta.trim()) add("content", "blocking", "cta-empty", "Hero CTA is missing", 10);
  if (design.store.navItems.length < 3) add("content", "warning", "nav-short", "Navigation has too few destinations", 3);
  if (design.store.navItems.length > 8) add("content", "warning", "nav-long", "Navigation is crowded", 3);

  const bodyContrast = contrast(design.palette.text, design.palette.background);
  if (bodyContrast != null) {
    if (bodyContrast < 3) add("accessibility", "blocking", "body-contrast", "Body text contrast is too low", 20);
    else if (bodyContrast < 4.5) add("accessibility", "warning", "body-contrast", "Body text contrast is marginal", 6);
    else add("accessibility", "pass", "body-contrast", "Body text contrast is strong", 0, 3);
  }

  const buttonContrast = contrast(design.palette.primaryText, design.palette.primary);
  if (buttonContrast != null) {
    if (buttonContrast < 3) add("accessibility", "blocking", "button-contrast", "Primary button contrast is too low", 16);
    else if (buttonContrast < 4.5) add("accessibility", "warning", "button-contrast", "Primary button contrast could improve", 5);
    else add("accessibility", "pass", "button-contrast", "Primary button contrast is strong", 0, 2);
  }

  if (design.motion.loop && ["dynamic", "snappy", "elasticRise", "gridPulse"].includes(design.motion.preset)) {
    add("motion", "warning", "loop-energy", "High-energy motion should not loop continuously", 6);
  }
  if (design.motion.duration < 0.2) add("motion", "warning", "motion-fast", "Motion is unusually fast", 3);
  if (design.motion.duration > 0.9) add("motion", "warning", "motion-slow", "Motion is unusually slow", 3);
  if (design.motion.sectionDistance > 34) add("motion", "warning", "motion-distance", "Section motion travels too far", 3);

  if (design.layout.productGrid === "denseRetail" && design.layout.density === "airy") {
    add("layout", "warning", "density-conflict", "Dense product grid conflicts with airy density", 4);
  }
  if (design.layout.hero === "megaTypography" && design.typography.scale === "large" && design.store.heroTitle.length > 78) {
    add("responsive", "warning", "hero-wrap", "Hero title may wrap excessively on smaller screens", 5);
  }
  if (["megaMenu", "sideNav"].includes(design.layout.nav) && design.store.navItems.length > 7) {
    add("responsive", "warning", "mobile-nav", "Navigation may feel heavy on mobile", 3);
  }
  if (design.commerce?.mediaBehavior === "autoplayVideo" && design.motion.loop) {
    add("performance", "warning", "autoplay-loop", "Autoplay media plus looping motion can feel busy", 5);
  }
  if (design.surfaces.blur > 26 && design.surfaces.glass > 0.55) {
    add("performance", "warning", "heavy-glass", "Heavy glass blur may reduce scrolling performance", 4);
  }

  const productImages = design.store.products.map((item) => item.image).filter(Boolean);
  if (new Set(productImages).size < Math.max(2, productImages.length - 1)) {
    add("content", "warning", "duplicate-media", "Product media repeats too often", 5);
  }
  const names = design.store.products.map((item) => item.name.trim().toLowerCase());
  if (new Set(names).size !== names.length) add("content", "warning", "duplicate-product-names", "Product names repeat", 4);

  const mobileHidden = visibleSections.filter((section) => section.mobileHidden).length;
  if (mobileHidden > 2) add("responsive", "warning", "mobile-hidden", "Too much content is hidden on mobile", 4);

  return {
    score: Math.max(0, Math.min(100, Math.round(score))),
    warnings,
    blocking,
    issues,
    breakdown,
  };
}

export function autoRepairDesign(input: DesignGenome): DesignGenome {
  const design = structuredClone(input);
  const audit = qualityAudit(design);

  if (audit.issues.some((issue) => issue.id === "body-contrast" && issue.severity !== "pass")) {
    design.palette.text = bestTextColor(design.palette.background);
  }
  if (audit.issues.some((issue) => issue.id === "button-contrast" && issue.severity !== "pass")) {
    design.palette.primaryText = bestTextColor(design.palette.primary);
  }
  if (audit.issues.some((issue) => issue.id === "loop-energy") || audit.issues.some((issue) => issue.id === "autoplay-loop")) {
    design.motion.loop = false;
  }
  design.motion.duration = Math.max(0.24, Math.min(0.82, design.motion.duration));
  design.motion.sectionDistance = Math.min(30, design.motion.sectionDistance);
  if (design.layout.productGrid === "denseRetail" && design.layout.density === "airy") design.layout.density = "balanced";
  if (design.layout.hero === "megaTypography" && design.store.heroTitle.length > 78) design.typography.scale = "balanced";
  if (design.store.navItems.length > 8) design.store.navItems = design.store.navItems.slice(0, 8);
  if (design.surfaces.blur > 26 && design.surfaces.glass > 0.55) design.surfaces.blur = 24;

  const visible = design.sections.filter((section) => !section.hidden);
  if (visible.length > 9) {
    const required = visible.filter((section) => section.type === "products" || section.type === "collections");
    const optional = visible.filter((section) => section.type !== "products" && section.type !== "collections").slice(0, Math.max(0, 8 - required.length));
    design.sections = [...required, ...optional];
  }

  return design;
}

export function qualityScore(design: DesignGenome) {
  return qualityAudit(design).score;
}

export type QualityAuditV2 = QualityAudit & {
  readiness: "ready" | "review" | "blocked";
  weakestArea: QualityIssue["area"];
  recommendations: string[];
  mediaScore: number;
  coherenceScore: number;
  structuralNoveltyScore: number;
  typographyPairingScore: number;
  sectionDiversityScore: number;
  interactionConsistencyScore: number;
  interactionResponsivenessScore: number;
  hoverVarietyScore: number;
  productAnatomyScore: number;
  pricingHierarchyScore: number;
  mediaRoleAccuracyScore: number;
  mobileCompositionScore: number;
  antiAIRepetitionScore: number;
  artDirectionCoherenceScore: number;
};

function uniqueNormalized(values: string[]) {
  return new Set(values.map((value) => value.trim().toLowerCase()).filter(Boolean)).size;
}

export function qualityAuditV2(design: DesignGenome): QualityAuditV2 {
  const base = qualityAudit(design);
  const issues = [...base.issues];
  const warnings = [...base.warnings];
  const blocking = [...base.blocking];
  const breakdown = { ...base.breakdown };
  let score = base.score;

  const add = (area: QualityIssue["area"], severity: QualityIssue["severity"], id: string, message: string, penalty = 0) => {
    if (issues.some((issue) => issue.id === id)) return;
    issues.push({ area, severity, id, message });
    if (severity === "blocking") blocking.push(message);
    if (severity === "warning") warnings.push(message);
    score -= penalty;
    breakdown[area] = Math.max(0, breakdown[area] - penalty * 3);
  };

  const heroLength = design.store.heroTitle.trim().length;
  if (heroLength < 14) add("content", "warning", "hero-too-short", "Hero headline is too short to establish a clear value proposition", 4);
  if (heroLength > 112) add("responsive", "warning", "hero-too-long", "Hero headline is likely to wrap excessively on tablet and mobile", 6);
  if (design.store.heroBody.trim().length > 260) add("content", "warning", "hero-body-long", "Hero supporting copy is too long for fast storefront scanning", 4);

  if (uniqueNormalized(design.store.navItems) !== design.store.navItems.length) add("content", "blocking", "duplicate-nav", "Navigation contains duplicate destinations", 9);
  if (uniqueNormalized(design.store.collections.map((item) => item.title)) !== design.store.collections.length) add("commerce", "blocking", "duplicate-collections", "Collection labels repeat", 9);

  const sectionIds = design.sections.map((section) => section.id);
  if (new Set(sectionIds).size !== sectionIds.length) add("layout", "blocking", "duplicate-section-ids", "Section identities collide and can cause unstable editing", 12);

  const visible = design.sections.filter((section) => !section.hidden);
  if (visible.length >= 5 && new Set(visible.map((section) => section.variant)).size === 1) {
    add("layout", "warning", "section-monotony", "All visible sections use the same composition style", 5);
  }

  const productsWithRichGallery = design.store.products.filter((product) => (product.gallery?.filter(Boolean).length ?? 0) >= 3).length;
  const galleryCoverage = design.store.products.length ? productsWithRichGallery / design.store.products.length : 0;
  const repeatedMediaPenalty = uniqueNormalized(design.store.products.map((p) => p.image)) < Math.max(2, design.store.products.length - 1) ? 18 : 0;
  const mediaScore = Math.round(Math.max(0, Math.min(100, 55 + galleryCoverage * 45 - repeatedMediaPenalty)));
  if (galleryCoverage < 0.75) add("commerce", "warning", "gallery-coverage", "Most products should have at least three distinct gallery views", 6);

  const nicheNeedsFilters = Boolean(design.store.nicheLabel) && !["editorial", "luxury", "storytelling"].includes(design.archetype ?? "");
  if (nicheNeedsFilters && (design.store.filters?.length ?? 0) < 2) add("commerce", "warning", "filter-depth", "This niche would benefit from richer collection filters", 5);

  const productTextUnique = uniqueNormalized(design.store.products.flatMap((product) => [product.name, product.subtitle]));
  const productTextTotal = design.store.products.length * 2;
  if (productTextTotal && productTextUnique < productTextTotal - 1) add("content", "warning", "product-copy-repeat", "Product merchandising copy repeats too often", 4);

  if (design.layout.nav === "sideNav" && design.store.navItems.length > 6) add("responsive", "warning", "side-nav-mobile", "Side navigation is too dense for a compact mobile adaptation", 4);
  if (["imageCollage", "floatingProducts", "dualCampaign"].includes(design.layout.hero) && design.typography.scale === "large") {
    add("responsive", "warning", "complex-hero-mobile", "Complex hero composition plus large type may crowd smaller screens", 5);
  }

  const coherenceSignals = [
    design.archetype ? 1 : 0,
    design.layout.footer ? 1 : 0,
    design.commerce ? 1 : 0,
    design.store.nicheLabel ? 1 : 0,
    design.store.filters?.length ? 1 : 0,
    design.store.products.every((p) => Boolean(p.subtitle)) ? 1 : 0,
  ];
  const coherenceScore = Math.round((coherenceSignals.reduce((sum, value) => sum + Number(value), 0) / coherenceSignals.length) * 100);

  const variantCount = new Set(visible.map((section) => section.variant)).size;
  const typeCount = new Set(visible.map((section) => section.type)).size;
  const centeredCount = visible.filter((section) => section.alignment === "center").length;
  const structuralNoveltyScore = Math.round(Math.min(100, 48 + variantCount * 7 + typeCount * 3 + (design.composition ? 12 : 0)));
  const typographyPairingScore = design.typographyPair
    ? Math.round(Math.min(100, 82 + (design.typographyPair.headingFamily !== design.typographyPair.bodyFamily ? 12 : 0) + (design.typographyPair.priceFamily !== design.typographyPair.bodyFamily ? 6 : 0)))
    : design.typography.heading !== design.typography.body ? 68 : 52;
  const sectionDiversityScore = visible.length ? Math.round(Math.min(100, 45 + (variantCount / visible.length) * 40 + (typeCount / visible.length) * 25)) : 0;
  const interactionConsistencyScore = design.interactionProfile && design.motionLanguage ? 94 : design.interactionProfile || design.motionLanguage ? 74 : 58;
  const interactionResponsivenessScore = design.interactionProfile
    ? ({ micro: 100, fast: 98, normal: 92, editorial: 82 }[design.interactionProfile.feedbackSpeed])
    : 70;
  const hoverVarietyScore = design.interactionProfile ? Math.min(100, 76 + variantCount * 3) : 56;
  const productAnatomyScore = design.productAnatomy ? 96 : 60;
  const pricingHierarchyScore = design.pricingComposition ? 94 : design.commerce?.priceStyle ? 72 : 50;
  const mediaRoleAccuracyScore = Math.round(Math.max(0, Math.min(100, mediaScore + (design.store.nicheLabel ? 7 : 0) + (galleryCoverage >= .75 ? 5 : 0))));
  const mobileCompositionScore = design.composition ? 92 : 70;

  let antiAIPenalty = 0;
  if (design.geometry.radius >= 28) antiAIPenalty += 10;
  if (design.geometry.buttonRadius >= 999) antiAIPenalty += 6;
  if (design.surfaces.glass > .6) antiAIPenalty += 10;
  if (visible.length >= 5 && variantCount <= 2) antiAIPenalty += 16;
  if (visible.length && centeredCount / visible.length > .72) antiAIPenalty += 12;
  if (repeatedMediaPenalty) antiAIPenalty += 10;
  const badgeCount = design.store.products.filter((product) => Boolean(product.badge || product.tag)).length;
  if (badgeCount === design.store.products.length && design.store.products.length >= 6) antiAIPenalty += 5;
  const antiAIRepetitionScore = Math.max(0, 100 - antiAIPenalty);
  const artDirectionCoherenceScore = design.artDirection && design.composition
    ? Math.round(Math.min(100, 84 + (design.artDirection.family === design.composition.pageFamily ? 10 : 2) + (design.productAnatomy ? 4 : 0)))
    : 64;

  if (antiAIRepetitionScore < 72) add("layout", "warning", "anti-ai-repetition", "The page repeats generic card, radius, alignment, or media patterns too often", 6);
  if (typographyPairingScore < 65) add("layout", "warning", "typography-pairing", "Typography hierarchy is too uniform for the selected art direction", 4);
  if (sectionDiversityScore < 68) add("layout", "warning", "section-architecture-repeat", "Secondary section architecture is not varied enough", 5);
  if (interactionConsistencyScore < 70) add("motion", "warning", "interaction-language", "Interactions do not yet share a coherent motion and hover language", 4);

  const weakestArea = (Object.entries(breakdown) as [QualityIssue["area"], number][]).sort((a, b) => a[1] - b[1])[0]?.[0] ?? "layout";
  const finalScore = Math.max(0, Math.min(100, Math.round(score)));
  const readiness: QualityAuditV2["readiness"] = blocking.length ? "blocked" : finalScore >= 88 && warnings.length <= 3 ? "ready" : "review";
  const recommendations = issues
    .filter((issue) => issue.severity !== "pass")
    .sort((a, b) => (a.severity === "blocking" ? -1 : 1) - (b.severity === "blocking" ? -1 : 1))
    .slice(0, 6)
    .map((issue) => issue.message);

  return {
    ...base, score: finalScore, warnings, blocking, issues, breakdown, readiness, weakestArea, recommendations, mediaScore, coherenceScore,
    structuralNoveltyScore, typographyPairingScore, sectionDiversityScore, interactionConsistencyScore, interactionResponsivenessScore,
    hoverVarietyScore, productAnatomyScore, pricingHierarchyScore, mediaRoleAccuracyScore, mobileCompositionScore, antiAIRepetitionScore, artDirectionCoherenceScore,
  };
}

function trimAtWord(value: string, max: number) {
  if (value.length <= max) return value;
  const clipped = value.slice(0, max - 1).replace(/\s+\S*$/, "").trim();
  return `${clipped || value.slice(0, max - 1)}…`;
}

export function autoRepairDesignV2(input: DesignGenome): DesignGenome {
  const design = autoRepairDesign(input);
  design.store.heroTitle = trimAtWord(design.store.heroTitle.trim(), 108);
  design.store.heroBody = trimAtWord(design.store.heroBody.trim(), 250);

  const dedupe = (values: string[]) => {
    const seen = new Set<string>();
    return values.filter((value) => {
      const key = value.trim().toLowerCase();
      if (!key || seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  };
  design.store.navItems = dedupe(design.store.navItems).slice(0, 8);

  const collectionSeen = new Set<string>();
  design.store.collections = design.store.collections.filter((item) => {
    const key = item.title.trim().toLowerCase();
    if (!key || collectionSeen.has(key)) return false;
    collectionSeen.add(key);
    return true;
  });

  const productSeen = new Map<string, number>();
  design.store.products = design.store.products.map((product) => {
    const base = product.name.trim() || "Product";
    const key = base.toLowerCase();
    const count = productSeen.get(key) ?? 0;
    productSeen.set(key, count + 1);
    return { ...product, name: count ? `${base} ${count + 1}` : base, subtitle: trimAtWord(product.subtitle.trim(), 118) };
  });

  const sectionIds = new Set<string>();
  design.sections = design.sections.map((section, index) => {
    let id = section.id || `section-${design.seed}-${index}`;
    if (sectionIds.has(id)) id = `${id}-${index + 1}`;
    sectionIds.add(id);
    return { ...section, id };
  });

  const visible = design.sections.filter((section) => !section.hidden);
  if (visible.length >= 5 && new Set(visible.map((section) => section.variant)).size === 1) {
    const variants: DesignGenome["sections"][number]["variant"][] = ["clean", "editorial", "split", "cards", "rail", "minimal"];
    design.sections = design.sections.map((section, index) => section.hidden ? section : { ...section, variant: variants[index % variants.length] });
  }

  let hiddenOnMobile = 0;
  design.sections = design.sections.map((section) => {
    if (!section.mobileHidden) return section;
    hiddenOnMobile += 1;
    return hiddenOnMobile > 2 ? { ...section, mobileHidden: false } : section;
  });

  if (design.geometry.radius > 30 && design.artDirection?.name !== "Soft Pastel Commerce") design.geometry.radius = 22;
  if (design.geometry.buttonRadius > 999) design.geometry.buttonRadius = 999;
  if (design.surfaces.glass > .65 && design.artDirection?.name !== "Y2K Commerce") design.surfaces.glass = .42;
  const visibleSections = design.sections.filter((section) => !section.hidden);
  if (visibleSections.length && visibleSections.filter((section) => section.alignment === "center").length / visibleSections.length > .75) {
    let visibleIndex = 0;
    design.sections = design.sections.map((section) => section.hidden ? section : { ...section, alignment: visibleIndex++ % 2 ? "left" : section.alignment });
  }

  if (design.commerce) {
    design.commerce.quickView = true;
    design.commerce.wishlist = true;
  }
  return design;
}
