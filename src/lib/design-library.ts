import { fontPresets, palettePresets } from "@/lib/generator";
import { DESIGN_RECIPES, sectionStrategy, type DesignRecipe } from "@/lib/design-system";
import type {
  CommerceArchetype,
  DesignGenome,
  MotionPreset,
  StoreCategory,
} from "@/types/design";

export type DesignStyleFamily =
  | "Luxury"
  | "Editorial"
  | "Minimal"
  | "Premium Commerce"
  | "Tech"
  | "Bold"
  | "Street"
  | "Organic"
  | "Playful"
  | "Scandinavian"
  | "Dark"
  | "Magazine"
  | "Catalog"
  | "Storytelling"
  | "Sport"
  | "Conversion"
  | "Campaign"
  | "Modern";

export type LayoutFamily =
  | "Full-bleed Editorial"
  | "Split Hero"
  | "Product-first"
  | "Marketplace"
  | "Magazine"
  | "Luxury Sparse"
  | "Bento"
  | "Vertical Story"
  | "Horizontal Editorial"
  | "Sticky Retail"
  | "Mega-menu Retail"
  | "Catalog Heavy"
  | "Lookbook"
  | "Comparison-led"
  | "Launch Landing"
  | "Subscription"
  | "Deals"
  | "Story-first"
  | "Single Product"
  | "Mosaic Gallery";

export type MotionPackName =
  | "No Motion"
  | "Calm"
  | "Smooth"
  | "Editorial"
  | "Luxury"
  | "Cinematic"
  | "Snappy"
  | "Dynamic"
  | "Playful"
  | "Tech"
  | "Magnetic"
  | "Parallax"
  | "Scroll Reveal"
  | "Staggered Grid"
  | "Floating Products"
  | "Hover Rich"
  | "Kinetic Commerce"
  | "Editorial Loops"
  | "Hero Spotlight";

export type DesignLibraryDirection = {
  id: string;
  title: string;
  sourceCategory: StoreCategory;
  style: DesignStyleFamily;
  layoutFamily: LayoutFamily;
  motionPack: MotionPackName;
  density: DesignRecipe["density"];
  recipe: DesignRecipe;
  paletteName: string;
  fontName: string;
  tags: string[];
};

export type LibraryApplyMode =
  | "use"
  | "similar"
  | "remix"
  | "sameLayoutDifferentStyle"
  | "sameStyleDifferentLayout"
  | "differentMotion";

const CATEGORY_LABELS: Record<StoreCategory, string> = {
  fashion: "Fashion",
  shoes: "Shoes",
  accessories: "Accessories",
  home: "Home",
  beauty: "Beauty",
  food: "Food",
  outdoor: "Outdoor",
  kids: "Kids",
  tech: "Tech",
};

const archetypeStyle: Record<CommerceArchetype, DesignStyleFamily> = {
  editorial: "Editorial",
  luxury: "Luxury",
  minimal: "Minimal",
  streetwear: "Street",
  sport: "Sport",
  "tech-retail": "Tech",
  beauty: "Organic",
  playful: "Playful",
  scandinavian: "Scandinavian",
  campaign: "Campaign",
  "dark-premium": "Dark",
  magazine: "Magazine",
  catalog: "Catalog",
  storytelling: "Storytelling",
  conversion: "Conversion",
};

const stylePaletteNames: Record<DesignStyleFamily, readonly string[]> = {
  Luxury: ["Sandstone Luxury", "Stone Minimal", "Plum Noir", "Warm Editorial", "Mocha Silk", "Royal Plum", "Velvet Orchid", "Sand Rose", "Burgundy Pearl"],
  Editorial: ["Warm Editorial", "Editorial Lilac", "Monochrome", "Stone Minimal", "Sky Rose", "Coral Reef", "Powder Blue", "Ruby Sand", "Lavender Smoke"],
  Minimal: ["Stone Minimal", "Monochrome", "Pearl Teal", "Ice Charcoal", "Pine Fog", "Aurora Frost", "Arctic Slate", "Steel Mint", "Olive Canvas"],
  "Premium Commerce": ["Cobalt Studio", "Stone Minimal", "Warm Editorial", "Technical Blue", "Aurora Frost", "Mocha Silk", "Powder Blue", "Sand Rose", "Arctic Slate"],
  Tech: ["Technical Blue", "Digital Violet", "Electric Night", "Cobalt Studio", "Aurora Frost", "Amber Graphite", "Navy Current", "Cosmic Berry", "Powder Blue"],
  Bold: ["Digital Violet", "Graphite Lime", "Blush Peach", "Lime Pop", "Cherry Cream", "Sunset Citrus", "Tangerine Pop", "Ruby Sand", "Lemon Ice"],
  Street: ["Electric Night", "Graphite Lime", "Plum Noir", "Monochrome", "Carbon Copper", "Royal Plum", "Mint Graphite", "Copper Dust", "Cosmic Berry"],
  Organic: ["Nordic Sage", "Cream Forest", "Arctic Mint", "Pearl Teal", "Pine Fog", "Lagoon Glass", "Basil Cream", "Forest Ink", "Steel Mint"],
  Playful: ["Mint Candy", "Blush Peach", "Lime Pop", "Soft Lavender", "Cherry Cream", "Sunset Citrus", "Frost Pink", "Mango Cream", "Tangerine Pop"],
  Scandinavian: ["Nordic Sage", "Stone Minimal", "Pearl Teal", "Cream Forest", "Pine Fog", "Aurora Frost", "Arctic Slate", "Olive Canvas", "Powder Blue"],
  Dark: ["Midnight Glass", "Electric Night", "Deep Emerald", "Plum Noir", "Royal Plum", "Amber Graphite", "Navy Current", "Mint Graphite", "Copper Dust"],
  Magazine: ["Warm Editorial", "Monochrome", "Editorial Lilac", "Sandstone Luxury", "Coral Reef", "Sky Rose", "Frost Pink", "Lavender Smoke", "Mango Cream"],
  Catalog: ["Ice Charcoal", "Technical Blue", "Monochrome", "Cobalt Studio", "Aurora Frost", "Carbon Copper", "Arctic Slate", "Powder Blue", "Steel Mint"],
  Storytelling: ["Warm Editorial", "Cream Forest", "Rose Clay", "Ocean Mist", "Lagoon Glass", "Mocha Silk", "Sand Rose", "Aqua Silk", "Olive Canvas"],
  Sport: ["Graphite Lime", "Technical Blue", "Cobalt Studio", "Electric Night", "Aurora Frost", "Neon Mint", "Navy Current", "Lemon Ice", "Steel Mint"],
  Conversion: ["Cobalt Studio", "Blush Peach", "Technical Blue", "Lime Pop", "Coral Reef", "Neon Mint", "Mango Cream", "Powder Blue", "Basil Cream"],
  Campaign: ["Digital Violet", "Blush Peach", "Graphite Lime", "Editorial Lilac", "Cherry Cream", "Sunset Citrus", "Tangerine Pop", "Cosmic Berry", "Velvet Orchid"],
  Modern: ["Stone Minimal", "Cobalt Studio", "Pearl Teal", "Cloud Indigo", "Sky Rose", "Lagoon Glass", "Arctic Slate", "Lavender Smoke", "Aqua Silk"],
};

const styleFonts: Record<DesignStyleFamily, readonly string[]> = {
  Luxury: ["Cormorant Garamond", "Playfair Display", "Manrope"],
  Editorial: ["Playfair Display", "Libre Baskerville", "DM Sans"],
  Minimal: ["Geist", "Inter", "Manrope"],
  "Premium Commerce": ["Manrope", "Inter", "Plus Jakarta Sans"],
  Tech: ["Space Grotesk", "Geist", "Sora"],
  Bold: ["Bricolage Grotesque", "Space Grotesk", "Outfit"],
  Street: ["Archivo", "Space Grotesk", "Montserrat"],
  Organic: ["Lora", "Manrope", "DM Sans"],
  Playful: ["Poppins", "Nunito Sans", "Outfit"],
  Scandinavian: ["Manrope", "Inter", "Figtree"],
  Dark: ["Space Grotesk", "Geist", "Manrope"],
  Magazine: ["Playfair Display", "Cormorant Garamond", "DM Sans"],
  Catalog: ["Inter", "Roboto", "IBM Plex Sans"],
  Storytelling: ["Lora", "Playfair Display", "DM Sans"],
  Sport: ["Archivo", "Sora", "Inter"],
  Conversion: ["Inter", "Plus Jakarta Sans", "Manrope"],
  Campaign: ["Bricolage Grotesque", "Outfit", "Poppins"],
  Modern: ["Manrope", "Inter", "Figtree"],
};

const motionPackPresets: Record<MotionPackName, readonly MotionPreset[]> = {
  "No Motion": ["calm"],
  Calm: ["calm", "softReveal", "smooth"],
  Smooth: ["smooth", "glide", "softZoom"],
  Editorial: ["editorial", "editorialSlide", "clipReveal", "headlineSweep"],
  Luxury: ["luxuryFlow", "softZoom", "imageDrift", "headlineSweep"],
  Cinematic: ["cinematic", "spotlightReveal", "imageDrift"],
  Snappy: ["snappy", "reveal", "showcaseLift"],
  Dynamic: ["dynamic", "elasticRise", "showcaseLift", "marqueeFlow"],
  Playful: ["spring", "elasticRise", "float"],
  Tech: ["gridPulse", "magnetic", "snappy", "driftLoop"],
  Magnetic: ["magnetic", "elasticRise", "menuCascade"],
  Parallax: ["parallaxSoft", "imageDrift", "glide"],
  "Scroll Reveal": ["softReveal", "clipReveal", "reveal"],
  "Staggered Grid": ["staggerRise", "gridPulse", "menuCascade"],
  "Floating Products": ["float", "orbit", "showcaseLift"],
  "Hover Rich": ["magnetic", "showcaseLift", "spring", "marqueeFlow"],
  "Kinetic Commerce": ["kineticTicker", "showcaseLift", "headlineSweep", "gridPulse"],
  "Editorial Loops": ["ribbonWave", "luxuryFlow", "imageDrift", "depthFloat"],
  "Hero Spotlight": ["spotlightParallax", "cascadeZoom", "spotlightReveal", "softZoom"],
};

const motionPackSettings: Record<MotionPackName, Omit<DesignGenome["motion"], "preset">> = {
  "No Motion": { duration: 0.01, stagger: 0, hoverLift: 0, hoverScale: 1, sectionDistance: 0, mediaZoom: 1, loop: false },
  Calm: { duration: 0.64, stagger: 0.05, hoverLift: 2, hoverScale: 1.008, sectionDistance: 14, mediaZoom: 1.015, loop: false },
  Smooth: { duration: 0.48, stagger: 0.045, hoverLift: 4, hoverScale: 1.012, sectionDistance: 18, mediaZoom: 1.022, loop: false },
  Editorial: { duration: 0.58, stagger: 0.075, hoverLift: 5, hoverScale: 1.014, sectionDistance: 22, mediaZoom: 1.03, loop: false },
  Luxury: { duration: 0.7, stagger: 0.065, hoverLift: 4, hoverScale: 1.013, sectionDistance: 18, mediaZoom: 1.035, loop: false },
  Cinematic: { duration: 0.76, stagger: 0.08, hoverLift: 5, hoverScale: 1.012, sectionDistance: 28, mediaZoom: 1.055, loop: true },
  Snappy: { duration: 0.24, stagger: 0.02, hoverLift: 8, hoverScale: 1.026, sectionDistance: 16, mediaZoom: 1.03, loop: false },
  Dynamic: { duration: 0.32, stagger: 0.03, hoverLift: 9, hoverScale: 1.024, sectionDistance: 24, mediaZoom: 1.04, loop: false },
  Playful: { duration: 0.42, stagger: 0.04, hoverLift: 8, hoverScale: 1.024, sectionDistance: 20, mediaZoom: 1.03, loop: false },
  Tech: { duration: 0.3, stagger: 0.025, hoverLift: 7, hoverScale: 1.022, sectionDistance: 18, mediaZoom: 1.032, loop: false },
  Magnetic: { duration: 0.32, stagger: 0.025, hoverLift: 10, hoverScale: 1.03, sectionDistance: 16, mediaZoom: 1.035, loop: false },
  Parallax: { duration: 0.72, stagger: 0.055, hoverLift: 4, hoverScale: 1.012, sectionDistance: 20, mediaZoom: 1.045, loop: true },
  "Scroll Reveal": { duration: 0.55, stagger: 0.055, hoverLift: 3, hoverScale: 1.01, sectionDistance: 26, mediaZoom: 1.02, loop: false },
  "Staggered Grid": { duration: 0.44, stagger: 0.095, hoverLift: 6, hoverScale: 1.018, sectionDistance: 30, mediaZoom: 1.025, loop: false },
  "Floating Products": { duration: 0.58, stagger: 0.05, hoverLift: 5, hoverScale: 1.016, sectionDistance: 18, mediaZoom: 1.03, loop: true },
  "Hover Rich": { duration: 0.34, stagger: 0.03, hoverLift: 10, hoverScale: 1.032, sectionDistance: 18, mediaZoom: 1.04, loop: false },
  "Kinetic Commerce": { duration: 0.28, stagger: 0.022, hoverLift: 8, hoverScale: 1.026, sectionDistance: 18, mediaZoom: 1.035, loop: false },
  "Editorial Loops": { duration: 0.62, stagger: 0.06, hoverLift: 4, hoverScale: 1.013, sectionDistance: 24, mediaZoom: 1.038, loop: true },
  "Hero Spotlight": { duration: 0.68, stagger: 0.055, hoverLift: 6, hoverScale: 1.018, sectionDistance: 26, mediaZoom: 1.05, loop: true },
};

function hash(text: string) {
  let value = 2166136261;
  for (let index = 0; index < text.length; index += 1) {
    value ^= text.charCodeAt(index);
    value = Math.imul(value, 16777619);
  }
  return Math.abs(value >>> 0);
}

function pickDeterministic<T>(items: readonly T[], key: string, offset = 0): T {
  return items[(hash(key) + offset) % items.length];
}

function humanize(id: string) {
  return id
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function layoutFamilyFor(recipe: DesignRecipe): LayoutFamily {
  if (recipe.productGrid === "zigzagEditorial") return "Vertical Story";
  if (recipe.productGrid === "hoverPanels") return "Mosaic Gallery";
  if (recipe.productGrid === "stackedShowcase") return "Product-first";
  if (recipe.hero === "fullBleedEditorial") return "Full-bleed Editorial";
  if (["split", "splitMedia", "dualCampaign"].includes(recipe.hero)) return "Split Hero";
  if (["product", "cinematicProduct"].includes(recipe.hero) && ["spotlight", "featuredPlusRail"].includes(recipe.productGrid)) return "Single Product";
  if (recipe.productGrid === "comparison" || recipe.productGrid === "specGrid") return "Comparison-led";
  if (recipe.productGrid === "denseRetail") return recipe.nav === "megaMenu" || recipe.nav === "categoryBar" ? "Mega-menu Retail" : "Marketplace";
  if (recipe.productGrid === "catalog" || recipe.productGrid === "categoryTabs") return "Catalog Heavy";
  if (recipe.productGrid === "lookbook" || recipe.productGrid === "shopTheLook") return "Lookbook";
  if (recipe.productGrid === "luxurySparse") return "Luxury Sparse";
  if (recipe.productGrid === "horizontalEditorial" || recipe.productGrid === "editorialRail") return "Horizontal Editorial";
  if (recipe.productGrid === "mosaic" || recipe.hero === "imageCollage") return "Mosaic Gallery";
  if (recipe.productGrid === "bundleGrid") return "Subscription";
  if (recipe.productGrid === "deals") return "Deals";
  if (recipe.hero === "bento") return "Bento";
  if (recipe.hero === "launch" || recipe.hero === "megaTypography" || recipe.hero === "campaign") return "Launch Landing";
  if (recipe.archetype === "magazine" || recipe.hero === "magazine" || recipe.productGrid === "magazineGrid") return "Magazine";
  if (recipe.archetype === "storytelling" || recipe.archetype === "editorial") return "Story-first";
  if (recipe.nav === "compactSticky" || recipe.nav === "sideNav") return "Sticky Retail";
  if (recipe.nav === "megaMenu") return "Mega-menu Retail";
  if (["featuredPlusRail", "featureSplit", "spotlight"].includes(recipe.productGrid)) return "Product-first";
  if (recipe.sectionRhythm === "editorial") return "Vertical Story";
  return "Marketplace";
}

function motionPackFor(recipe: DesignRecipe): MotionPackName {
  if (recipe.productGrid === "tickerShowcase") return "Kinetic Commerce";
  if (recipe.hero === "cinematicProduct") return "Hero Spotlight";
  if (recipe.productGrid === "editorialDeck" || recipe.productGrid === "horizontalEditorial") return "Editorial Loops";
  if (recipe.archetype === "luxury") return "Luxury";
  if (recipe.archetype === "editorial" || recipe.archetype === "magazine") return "Editorial";
  if (recipe.archetype === "tech-retail") return "Tech";
  if (recipe.archetype === "playful") return "Playful";
  if (recipe.archetype === "dark-premium") return "Cinematic";
  if (recipe.archetype === "sport") return "Dynamic";
  if (recipe.archetype === "streetwear") return "Hover Rich";
  if (recipe.archetype === "minimal" || recipe.archetype === "scandinavian") return "Calm";
  if (recipe.archetype === "campaign") return "Staggered Grid";
  if (recipe.archetype === "conversion" || recipe.archetype === "catalog") return "Snappy";
  if (recipe.archetype === "storytelling") return "Parallax";
  return pickDeterministic<MotionPackName>(["Smooth", "Scroll Reveal", "Floating Products", "Magnetic", "Kinetic Commerce", "Editorial Loops", "Hero Spotlight"], recipe.id);
}

function deriveStyle(recipe: DesignRecipe): DesignStyleFamily {
  if (recipe.archetype === "conversion" && recipe.priceStyle === "luxuryInline") return "Premium Commerce";
  if (recipe.hero === "megaTypography" && recipe.archetype !== "streetwear") return "Bold";
  return archetypeStyle[recipe.archetype] ?? "Modern";
}

export const DESIGN_LIBRARY: readonly DesignLibraryDirection[] = (Object.entries(DESIGN_RECIPES) as [StoreCategory, readonly DesignRecipe[]][])
  .flatMap(([category, recipes]) => recipes.map((recipe) => {
    const style = deriveStyle(recipe);
    const motionPack = motionPackFor(recipe);
    const paletteName = pickDeterministic(stylePaletteNames[style], recipe.id, 7);
    const fontName = pickDeterministic(styleFonts[style], recipe.id, 13);
    const layoutFamily = layoutFamilyFor(recipe);
    return {
      id: `library-${recipe.id}`,
      title: humanize(recipe.id),
      sourceCategory: category,
      style,
      layoutFamily,
      motionPack,
      density: recipe.density,
      recipe,
      paletteName,
      fontName,
      tags: [CATEGORY_LABELS[category], style, layoutFamily, motionPack, recipe.hero, recipe.productGrid, recipe.nav],
    } satisfies DesignLibraryDirection;
  }));

export const DESIGN_LIBRARY_STYLES = [...new Set(DESIGN_LIBRARY.map((item) => item.style))].sort();
export const DESIGN_LIBRARY_LAYOUTS = [...new Set(DESIGN_LIBRARY.map((item) => item.layoutFamily))].sort();
export const DESIGN_LIBRARY_MOTION_PACKS: readonly MotionPackName[] = [
  "No Motion", "Calm", "Smooth", "Editorial", "Luxury", "Cinematic", "Snappy", "Dynamic", "Playful", "Tech", "Magnetic", "Parallax", "Scroll Reveal", "Staggered Grid", "Floating Products", "Hover Rich", "Kinetic Commerce", "Editorial Loops", "Hero Spotlight",
];
export const DESIGN_LIBRARY_CATEGORIES = (Object.keys(CATEGORY_LABELS) as StoreCategory[]).map((value) => ({ value, label: CATEGORY_LABELS[value] }));
export const TOTAL_DESIGN_LIBRARY_DIRECTIONS = DESIGN_LIBRARY.length;

function paletteByName(name: string) {
  return palettePresets.find((palette) => palette.name === name) ?? palettePresets[0];
}

function fontByName(name: string) {
  return fontPresets.find((font) => font.name === name) ?? fontPresets[0];
}

function motionFor(pack: MotionPackName, key: string): DesignGenome["motion"] {
  const preset = pickDeterministic(motionPackPresets[pack], key, 19);
  return { preset, ...motionPackSettings[pack] };
}

function pickAlternative(entry: DesignLibraryDirection, mode: LibraryApplyMode) {
  const pool = DESIGN_LIBRARY.filter((candidate) => candidate.id !== entry.id);
  if (!pool.length) return entry;
  if (mode === "similar") {
    const similar = pool.filter((candidate) => candidate.style === entry.style && candidate.layoutFamily === entry.layoutFamily);
    const relaxed = pool.filter((candidate) => candidate.style === entry.style || candidate.layoutFamily === entry.layoutFamily);
    return pickDeterministic(similar.length ? similar : relaxed.length ? relaxed : pool, `${entry.id}-${mode}-${Date.now()}`);
  }
  if (mode === "sameLayoutDifferentStyle") {
    const options = pool.filter((candidate) => candidate.layoutFamily === entry.layoutFamily && candidate.style !== entry.style);
    return pickDeterministic(options.length ? options : pool, `${entry.id}-${mode}-${Date.now()}`);
  }
  if (mode === "sameStyleDifferentLayout") {
    const options = pool.filter((candidate) => candidate.style === entry.style && candidate.layoutFamily !== entry.layoutFamily);
    return pickDeterministic(options.length ? options : pool, `${entry.id}-${mode}-${Date.now()}`);
  }
  if (mode === "remix") {
    const options = pool.filter((candidate) => candidate.sourceCategory === entry.sourceCategory || candidate.style === entry.style || candidate.density === entry.density);
    return pickDeterministic(options.length ? options : pool, `${entry.id}-${mode}-${Date.now()}`);
  }
  return entry;
}

export function applyDesignLibraryDirection(current: DesignGenome, entry: DesignLibraryDirection, mode: LibraryApplyMode): DesignGenome {
  const picked = pickAlternative(entry, mode);
  const recipe = picked.recipe;
  const styleSource = mode === "sameLayoutDifferentStyle" ? picked : entry;
  const layoutSource = mode === "sameStyleDifferentLayout" || mode === "similar" || mode === "remix" ? picked : entry;
  const motionSource = mode === "differentMotion" ? entry : picked;
  const palette = paletteByName(styleSource.paletteName);
  const font = fontByName(styleSource.fontName);
  let motionPack = motionSource.motionPack;

  if (mode === "differentMotion") {
    const currentPackIndex = DESIGN_LIBRARY_MOTION_PACKS.indexOf(entry.motionPack);
    motionPack = DESIGN_LIBRARY_MOTION_PACKS[(currentPackIndex + 3 + (Date.now() % 7)) % DESIGN_LIBRARY_MOTION_PACKS.length];
  }

  const next = structuredClone(current);
  next.id = crypto.randomUUID();
  next.seed = Math.floor(Math.random() * 999999) + 1;
  next.createdAt = new Date().toISOString();
  next.name = `${styleSource.style} · ${layoutSource.layoutFamily}`;
  next.description = `${styleSource.style} design · ${layoutSource.layoutFamily} · ${motionPack} motion · adapted to ${current.store.nicheLabel ?? current.store.category}`;
  next.archetype = styleSource.recipe.archetype;
  next.layout = {
    nav: layoutSource.recipe.nav,
    hero: layoutSource.recipe.hero,
    productGrid: layoutSource.recipe.productGrid,
    footer: layoutSource.recipe.footer,
    density: layoutSource.recipe.density,
    sectionRhythm: layoutSource.recipe.sectionRhythm,
  };
  next.commerce = {
    ...(next.commerce ?? {
      imageRatio: "portrait",
      showRatings: true,
      showSwatches: true,
      showBadges: true,
      quickView: true,
      wishlist: true,
      mediaBehavior: "hoverZoom",
      priceStyle: "standard",
      cardStyle: "softCard",
    }),
    priceStyle: recipe.priceStyle,
    cardStyle: recipe.cardStyle,
    mediaBehavior: recipe.archetype === "luxury" ? "gallery" : recipe.archetype === "dark-premium" ? "hoverVideo" : recipe.archetype === "tech-retail" ? "hoverSwap" : "hoverZoom",
  };
  next.palette = { ...palette };
  next.typography = {
    ...next.typography,
    fontName: font.name,
    heading: font.family,
    body: font.family,
    headingWeight: font.weight,
    headingTracking: font.tracking,
    scale: layoutSource.recipe.density === "compact" ? "compact" : layoutSource.recipe.sectionRhythm === "editorial" ? "large" : "balanced",
  };
  next.geometry = {
    radius: styleSource.style === "Minimal" || styleSource.style === "Luxury" ? 10 : styleSource.style === "Playful" ? 24 : 16,
    buttonRadius: ["Luxury", "Editorial", "Minimal"].includes(styleSource.style) ? 10 : 999,
  };
  next.surfaces = {
    glass: styleSource.style === "Dark" || styleSource.style === "Tech" ? 0.62 : styleSource.style === "Minimal" ? 0.08 : 0.24,
    blur: styleSource.style === "Dark" || styleSource.style === "Tech" ? 18 : 10,
    shadow: styleSource.style === "Minimal" ? "none" : styleSource.style === "Luxury" ? "soft" : "elevated",
  };
  next.motion = motionFor(motionPack, `${entry.id}-${next.seed}`);

  // Preserve the user's niche/content while making the section architecture fit the selected design system.
  if (mode !== "differentMotion") {
    next.sections = sectionStrategy(current.store.category, next.archetype ?? "minimal");
  }

  return next;
}

export function directionPreviewColors(entry: DesignLibraryDirection) {
  const palette = paletteByName(entry.paletteName);
  return {
    background: palette.background,
    surface: palette.surface,
    text: palette.text,
    muted: palette.muted,
    primary: palette.primary,
    accent: palette.accent,
    border: palette.border,
  };
}

export function findLibraryDirection(id: string) {
  return DESIGN_LIBRARY.find((item) => item.id === id);
}
