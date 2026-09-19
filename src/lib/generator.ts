import { categoryVideoUrl, refreshStoreImages } from "@/lib/image-library";
import { analyzePrompt, buildLocalDesignPlan, inferLayoutBias, type DesignPlan, type PromptSignals } from "@/lib/design-planner";
import { storePresets } from "@/lib/presets";
import { parsePromptIntentV2, selectArtDirection } from "@/lib/intelligence/art-direction-engine";
import { buildCompositionGenome, buildSectionsFromComposition, layoutChoicesForComposition, selectCompositionFamily } from "@/lib/intelligence/composition-engine";
import { selectTypographyPair } from "@/lib/intelligence/typography-engine";
import { selectProductAnatomy, selectPricingComposition } from "@/lib/intelligence/product-engine";
import { selectInteractionProfile } from "@/lib/intelligence/interaction-engine";
import { motionPresetForLanguage, selectMotionLanguage } from "@/lib/intelligence/motion-language";
import { majorAxisDifferenceCount, noveltyScore, requiredNovelty } from "@/lib/intelligence/novelty-engine";
import {
  CARD_STYLES, FOOTER_SYSTEMS, HEADER_SYSTEMS, HERO_SYSTEMS, DESIGN_RECIPES, PRICE_STYLES, PRODUCT_SYSTEMS, defaultCommerceSettings, sectionStrategy,
} from "@/lib/design-system";
import type {
  Creativity,
  DesignGenome,
  DesignLocks,
  GenerateScope,
  HeaderLayout,
  HeroLayout,
  MotionPreset,
  ProductGridLayout,
  SectionSpec,
  StoreCategory,
} from "@/types/design";

export const palettePresets = [
  { name: "Midnight Glass", background: "#0C0E13", surface: "#141720", elevated: "#1A1E28", text: "#F6F7FA", muted: "#949AA8", primary: "#8B7CFF", primaryText: "#FFFFFF", accent: "#63D7B1", border: "rgba(255,255,255,.10)" },
  { name: "Nordic Sage", background: "#EEF0EA", surface: "#F9FAF6", elevated: "#FFFFFF", text: "#18201A", muted: "#687269", primary: "#274C3B", primaryText: "#FFFFFF", accent: "#9BAF88", border: "rgba(24,32,26,.12)" },
  { name: "Soft Lavender", background: "#F3F0FA", surface: "#FBFAFF", elevated: "#FFFFFF", text: "#201B2A", muted: "#756E82", primary: "#6553A6", primaryText: "#FFFFFF", accent: "#B6A5EA", border: "rgba(32,27,42,.11)" },
  { name: "Warm Editorial", background: "#F5EFE7", surface: "#FFF9F2", elevated: "#FFFFFF", text: "#211A15", muted: "#7F746A", primary: "#6B3F28", primaryText: "#FFFFFF", accent: "#C99167", border: "rgba(33,26,21,.12)" },
  { name: "Technical Blue", background: "#EAF1F8", surface: "#F7FAFE", elevated: "#FFFFFF", text: "#102031", muted: "#617184", primary: "#195FA7", primaryText: "#FFFFFF", accent: "#58A9E8", border: "rgba(16,32,49,.12)" },
  { name: "Monochrome", background: "#F2F2F0", surface: "#FBFBF9", elevated: "#FFFFFF", text: "#111111", muted: "#666666", primary: "#111111", primaryText: "#FFFFFF", accent: "#898989", border: "rgba(17,17,17,.13)" },
  { name: "Electric Night", background: "#090B12", surface: "#111522", elevated: "#181D2D", text: "#F7F8FD", muted: "#8D95A8", primary: "#7C66FF", primaryText: "#FFFFFF", accent: "#4CD7FF", border: "rgba(255,255,255,.09)" },
  { name: "Cream Forest", background: "#F6F2E8", surface: "#FFFDF8", elevated: "#FFFFFF", text: "#172019", muted: "#6F776F", primary: "#173E2A", primaryText: "#FFFFFF", accent: "#A4B98A", border: "rgba(23,32,25,.12)" },
  { name: "Sandstone Luxury", background: "#EEE7DC", surface: "#FAF6F0", elevated: "#FFFFFF", text: "#211D1A", muted: "#786F68", primary: "#352C26", primaryText: "#FFFFFF", accent: "#B98B63", border: "rgba(33,29,26,.12)" },
  { name: "Deep Emerald", background: "#091713", surface: "#10231D", elevated: "#173029", text: "#F2F8F5", muted: "#91A49B", primary: "#60D6A3", primaryText: "#092019", accent: "#B8E36B", border: "rgba(255,255,255,.10)" },
  { name: "Cobalt Studio", background: "#EEF3FF", surface: "#F8FAFF", elevated: "#FFFFFF", text: "#111A33", muted: "#65708A", primary: "#264FD9", primaryText: "#FFFFFF", accent: "#7793F8", border: "rgba(17,26,51,.11)" },
  { name: "Rose Clay", background: "#F7EEEC", surface: "#FFF9F7", elevated: "#FFFFFF", text: "#2B1E1E", muted: "#806D6C", primary: "#8C4C52", primaryText: "#FFFFFF", accent: "#D99B91", border: "rgba(43,30,30,.11)" },
  { name: "Arctic Mint", background: "#EDF7F4", surface: "#F8FEFC", elevated: "#FFFFFF", text: "#12332F", muted: "#627D78", primary: "#1F766B", primaryText: "#FFFFFF", accent: "#79D5C5", border: "rgba(18,51,47,.11)" },
  { name: "Graphite Lime", background: "#101211", surface: "#181B19", elevated: "#202420", text: "#F7FAF6", muted: "#999F99", primary: "#C5F46A", primaryText: "#17200D", accent: "#7CCB77", border: "rgba(255,255,255,.10)" },
  { name: "Cocoa Blush", background: "#F4EBE6", surface: "#FCF7F4", elevated: "#FFFFFF", text: "#2C201D", muted: "#7E6D68", primary: "#69453C", primaryText: "#FFFFFF", accent: "#D79B93", border: "rgba(44,32,29,.11)" },
  { name: "Ocean Mist", background: "#EAF4F6", surface: "#F7FCFD", elevated: "#FFFFFF", text: "#122C35", muted: "#647E86", primary: "#17667B", primaryText: "#FFFFFF", accent: "#6AB7C6", border: "rgba(18,44,53,.11)" },
  { name: "Plum Noir", background: "#130E16", surface: "#1E1622", elevated: "#281D2D", text: "#FBF7FD", muted: "#AA98B0", primary: "#C58BDA", primaryText: "#24102B", accent: "#F0A0B5", border: "rgba(255,255,255,.10)" },
  { name: "Solar Ochre", background: "#F7F0DF", surface: "#FFF9EB", elevated: "#FFFFFF", text: "#2B2517", muted: "#7C735C", primary: "#846110", primaryText: "#FFFFFF", accent: "#D7A72D", border: "rgba(43,37,23,.12)" },
  { name: "Cloud Indigo", background: "#F0F1F8", surface: "#FAFAFE", elevated: "#FFFFFF", text: "#1C2033", muted: "#6F7488", primary: "#4E5B9C", primaryText: "#FFFFFF", accent: "#9CA8E8", border: "rgba(28,32,51,.11)" },
  { name: "Terracotta Stone", background: "#F2ECE7", surface: "#FBF7F3", elevated: "#FFFFFF", text: "#29211D", muted: "#776C65", primary: "#9A533C", primaryText: "#FFFFFF", accent: "#D48A68", border: "rgba(41,33,29,.11)" },
  { name: "Ice Charcoal", background: "#EDEFF0", surface: "#F8F9F9", elevated: "#FFFFFF", text: "#171A1C", muted: "#696F73", primary: "#30383D", primaryText: "#FFFFFF", accent: "#8DA6B2", border: "rgba(23,26,28,.12)" },
  { name: "Pearl Teal", background: "#F2F5F3", surface: "#FBFDFC", elevated: "#FFFFFF", text: "#142A28", muted: "#687C79", primary: "#24665F", primaryText: "#FFFFFF", accent: "#86B7AB", border: "rgba(20,42,40,.11)" },
  { name: "Lime Pop", background: "#F7FBEA", surface: "#FCFFF4", elevated: "#FFFFFF", text: "#1D2411", muted: "#6E7761", primary: "#7AB420", primaryText: "#FFFFFF", accent: "#C8F26A", border: "rgba(29,36,17,.10)" },
  { name: "Blush Peach", background: "#FFF0EC", surface: "#FFF8F5", elevated: "#FFFFFF", text: "#311F1C", muted: "#8C7068", primary: "#F06649", primaryText: "#FFFFFF", accent: "#F4BAA6", border: "rgba(49,31,28,.10)" },
  { name: "Digital Violet", background: "#121125", surface: "#1A1A35", elevated: "#222243", text: "#F8F7FF", muted: "#A6A4C9", primary: "#6D5EF6", primaryText: "#FFFFFF", accent: "#35D6FF", border: "rgba(255,255,255,.10)" },
  { name: "Stone Minimal", background: "#F7F5F1", surface: "#FFFDFA", elevated: "#FFFFFF", text: "#1E1B18", muted: "#77716A", primary: "#38322D", primaryText: "#FFFFFF", accent: "#C7BAAE", border: "rgba(30,27,24,.09)" },
  { name: "Mint Candy", background: "#ECFFF7", surface: "#F7FFFB", elevated: "#FFFFFF", text: "#143229", muted: "#5E7D73", primary: "#16A472", primaryText: "#FFFFFF", accent: "#9FF0D1", border: "rgba(20,50,41,.09)" },
  { name: "Editorial Lilac", background: "#F5F1FF", surface: "#FBFAFF", elevated: "#FFFFFF", text: "#251D35", muted: "#756B8F", primary: "#8161DA", primaryText: "#FFFFFF", accent: "#CAB8FF", border: "rgba(37,29,53,.10)" },

  { name: "Coral Reef", background: "#FFF4EF", surface: "#FFF9F6", elevated: "#FFFFFF", text: "#2D1D18", muted: "#8C6F67", primary: "#E65F4A", primaryText: "#FFFFFF", accent: "#FFB38A", border: "rgba(45,29,24,.10)" },
  { name: "Aurora Frost", background: "#EEF7FF", surface: "#F8FCFF", elevated: "#FFFFFF", text: "#10283A", muted: "#6A8292", primary: "#3A7BFA", primaryText: "#FFFFFF", accent: "#8ED4FF", border: "rgba(16,40,58,.10)" },
  { name: "Mocha Silk", background: "#F6EEE8", surface: "#FDF8F4", elevated: "#FFFFFF", text: "#2A1F1A", muted: "#7E6B64", primary: "#7F5647", primaryText: "#FFFFFF", accent: "#D7A58E", border: "rgba(42,31,26,.10)" },
  { name: "Neon Mint", background: "#F2FFF9", surface: "#FBFFFD", elevated: "#FFFFFF", text: "#103026", muted: "#5C7B70", primary: "#16BF83", primaryText: "#FFFFFF", accent: "#A1F5D1", border: "rgba(16,48,38,.09)" },
  { name: "Royal Plum", background: "#161220", surface: "#20182A", elevated: "#2A2035", text: "#FBF7FF", muted: "#AA9AB6", primary: "#A06BF2", primaryText: "#FFFFFF", accent: "#F2A6C8", border: "rgba(255,255,255,.10)" },
  { name: "Sunset Citrus", background: "#FFF5E8", surface: "#FFFBF4", elevated: "#FFFFFF", text: "#332413", muted: "#8B7353", primary: "#E38D1C", primaryText: "#FFFFFF", accent: "#FFD36F", border: "rgba(51,36,19,.10)" },
  { name: "Lagoon Glass", background: "#E9F7F7", surface: "#F6FDFD", elevated: "#FFFFFF", text: "#133033", muted: "#648084", primary: "#1A8C93", primaryText: "#FFFFFF", accent: "#7EDDE2", border: "rgba(19,48,51,.10)" },
  { name: "Carbon Copper", background: "#131416", surface: "#1B1D20", elevated: "#23262A", text: "#FAFBFC", muted: "#9CA0A7", primary: "#D47B46", primaryText: "#FFFFFF", accent: "#E6B08A", border: "rgba(255,255,255,.10)" },
  { name: "Cherry Cream", background: "#FFF1F3", surface: "#FFF8F9", elevated: "#FFFFFF", text: "#331E22", muted: "#8A6870", primary: "#D54B67", primaryText: "#FFFFFF", accent: "#F2A7B8", border: "rgba(51,30,34,.10)" },
  { name: "Pine Fog", background: "#F0F5F2", surface: "#FBFDFC", elevated: "#FFFFFF", text: "#172620", muted: "#6A7A73", primary: "#2E6B57", primaryText: "#FFFFFF", accent: "#9DC6B5", border: "rgba(23,38,32,.10)" },
  { name: "Sky Rose", background: "#F3F5FF", surface: "#FBFBFF", elevated: "#FFFFFF", text: "#232741", muted: "#787E9B", primary: "#6B78E8", primaryText: "#FFFFFF", accent: "#F1B0CC", border: "rgba(35,39,65,.10)" },
  { name: "Amber Graphite", background: "#171717", surface: "#202020", elevated: "#282828", text: "#FAFAF7", muted: "#A3A39C", primary: "#F0A72D", primaryText: "#171717", accent: "#FFD783", border: "rgba(255,255,255,.10)" },

  { name: "Velvet Orchid", background: "#17111B", surface: "#21162A", elevated: "#2A1D36", text: "#FCF7FF", muted: "#B09AC0", primary: "#B06AF3", primaryText: "#FFFFFF", accent: "#FFB4D8", border: "rgba(255,255,255,.10)" },
  { name: "Arctic Slate", background: "#EEF2F5", surface: "#F8FAFB", elevated: "#FFFFFF", text: "#17242E", muted: "#6F818E", primary: "#32556D", primaryText: "#FFFFFF", accent: "#8DB2C8", border: "rgba(23,36,46,.10)" },
  { name: "Tangerine Pop", background: "#FFF4EC", surface: "#FFF9F4", elevated: "#FFFFFF", text: "#322116", muted: "#8D715D", primary: "#F06B2F", primaryText: "#FFFFFF", accent: "#FFC08E", border: "rgba(50,33,22,.10)" },
  { name: "Basil Cream", background: "#F4F8F0", surface: "#FBFDF9", elevated: "#FFFFFF", text: "#1D2C1B", muted: "#71806E", primary: "#50753A", primaryText: "#FFFFFF", accent: "#B8D59D", border: "rgba(29,44,27,.10)" },
  { name: "Frost Pink", background: "#FFF3F8", surface: "#FFF9FC", elevated: "#FFFFFF", text: "#331F2A", muted: "#8A6E7C", primary: "#D45B8C", primaryText: "#FFFFFF", accent: "#F6B6D0", border: "rgba(51,31,42,.10)" },
  { name: "Navy Current", background: "#0F1625", surface: "#172033", elevated: "#1F2B42", text: "#F5F8FF", muted: "#97A4BF", primary: "#4E80F7", primaryText: "#FFFFFF", accent: "#78CFF0", border: "rgba(255,255,255,.10)" },
  { name: "Sand Rose", background: "#F6EDE8", surface: "#FDF8F5", elevated: "#FFFFFF", text: "#2F211E", muted: "#866B64", primary: "#BF6C61", primaryText: "#FFFFFF", accent: "#E5AEA5", border: "rgba(47,33,30,.10)" },
  { name: "Mint Graphite", background: "#121717", surface: "#1B2323", elevated: "#243030", text: "#F7FBFB", muted: "#97A7A7", primary: "#59D0BE", primaryText: "#0E2421", accent: "#A4F2E3", border: "rgba(255,255,255,.10)" },
  { name: "Lemon Ice", background: "#FBFDEB", surface: "#FEFFF7", elevated: "#FFFFFF", text: "#2A3115", muted: "#7F865E", primary: "#B7C92D", primaryText: "#253108", accent: "#E5F38A", border: "rgba(42,49,21,.10)" },
  { name: "Copper Dust", background: "#1A1715", surface: "#23201E", elevated: "#2F2A27", text: "#FAF7F4", muted: "#AA9A90", primary: "#C97A52", primaryText: "#FFFFFF", accent: "#E4B595", border: "rgba(255,255,255,.10)" },
  { name: "Aqua Silk", background: "#EEF9FA", surface: "#F7FDFD", elevated: "#FFFFFF", text: "#163438", muted: "#698589", primary: "#2B98A5", primaryText: "#FFFFFF", accent: "#8CE1E8", border: "rgba(22,52,56,.10)" },
  { name: "Burgundy Pearl", background: "#201316", surface: "#2A1A1E", elevated: "#352126", text: "#FEF7F8", muted: "#B29AA1", primary: "#C0526D", primaryText: "#FFFFFF", accent: "#F4AAB9", border: "rgba(255,255,255,.10)" },
  { name: "Powder Blue", background: "#EFF5FF", surface: "#F8FBFF", elevated: "#FFFFFF", text: "#1A2740", muted: "#73829D", primary: "#5B7EEB", primaryText: "#FFFFFF", accent: "#B4C7FF", border: "rgba(26,39,64,.10)" },
  { name: "Mango Cream", background: "#FFF6EA", surface: "#FFFBF4", elevated: "#FFFFFF", text: "#302315", muted: "#8B7456", primary: "#E89A32", primaryText: "#FFFFFF", accent: "#FFD28E", border: "rgba(48,35,21,.10)" },
  { name: "Forest Ink", background: "#0F1A16", surface: "#162520", elevated: "#1E3029", text: "#F5FBF8", muted: "#97AAA3", primary: "#4CAE81", primaryText: "#FFFFFF", accent: "#9BE0C0", border: "rgba(255,255,255,.10)" },
  { name: "Lavender Smoke", background: "#F3F1F8", surface: "#FBFAFD", elevated: "#FFFFFF", text: "#261F33", muted: "#7A728A", primary: "#8C72C9", primaryText: "#FFFFFF", accent: "#CDBCF0", border: "rgba(38,31,51,.10)" },
  { name: "Ruby Sand", background: "#FFF1EE", surface: "#FFF8F6", elevated: "#FFFFFF", text: "#341F1A", muted: "#8B6C63", primary: "#D95B48", primaryText: "#FFFFFF", accent: "#F4AE9F", border: "rgba(52,31,26,.10)" },
  { name: "Steel Mint", background: "#EDF3F1", surface: "#F8FBFA", elevated: "#FFFFFF", text: "#1C2B28", muted: "#6E807C", primary: "#45756C", primaryText: "#FFFFFF", accent: "#9BC8BE", border: "rgba(28,43,40,.10)" },
  { name: "Cosmic Berry", background: "#130F22", surface: "#1C1730", elevated: "#241F3E", text: "#F9F8FF", muted: "#AAA6C0", primary: "#7A63F5", primaryText: "#FFFFFF", accent: "#D19BFF", border: "rgba(255,255,255,.10)" },
  { name: "Olive Canvas", background: "#F5F4E8", surface: "#FBFBF5", elevated: "#FFFFFF", text: "#2B2D1D", muted: "#7F8067", primary: "#7A8450", primaryText: "#FFFFFF", accent: "#C8D09A", border: "rgba(43,45,29,.10)" },
] as const;

export const fontPresets = [
  { name: "Inter", family: "var(--font-inter), ui-sans-serif, system-ui, sans-serif", weight: 700, tracking: -0.045 },
  { name: "Manrope", family: "var(--font-manrope), ui-sans-serif, system-ui, sans-serif", weight: 700, tracking: -0.045 },
  { name: "Poppins", family: "var(--font-poppins), ui-sans-serif, system-ui, sans-serif", weight: 600, tracking: -0.035 },
  { name: "DM Sans", family: "var(--font-dm-sans), ui-sans-serif, system-ui, sans-serif", weight: 700, tracking: -0.045 },
  { name: "Plus Jakarta Sans", family: "var(--font-plus-jakarta), ui-sans-serif, system-ui, sans-serif", weight: 700, tracking: -0.045 },
  { name: "Geist", family: "var(--font-geist), ui-sans-serif, system-ui, sans-serif", weight: 600, tracking: -0.05 },
  { name: "IBM Plex Sans", family: "var(--font-ibm-plex-sans), ui-sans-serif, system-ui, sans-serif", weight: 600, tracking: -0.035 },
  { name: "Roboto", family: "var(--font-roboto), ui-sans-serif, system-ui, sans-serif", weight: 700, tracking: -0.035 },
  { name: "Source Sans 3", family: "var(--font-source-sans-3), ui-sans-serif, system-ui, sans-serif", weight: 700, tracking: -0.035 },
  { name: "Nunito Sans", family: "var(--font-nunito-sans), ui-sans-serif, system-ui, sans-serif", weight: 700, tracking: -0.03 },
  { name: "Outfit", family: "var(--font-outfit), ui-sans-serif, system-ui, sans-serif", weight: 700, tracking: -0.04 },
  { name: "Urbanist", family: "var(--font-urbanist), ui-sans-serif, system-ui, sans-serif", weight: 700, tracking: -0.045 },
  { name: "Sora", family: "var(--font-sora), ui-sans-serif, system-ui, sans-serif", weight: 700, tracking: -0.045 },
  { name: "Figtree", family: "var(--font-figtree), ui-sans-serif, system-ui, sans-serif", weight: 700, tracking: -0.04 },
  { name: "Archivo", family: "var(--font-archivo), ui-sans-serif, system-ui, sans-serif", weight: 700, tracking: -0.04 },
  { name: "Space Grotesk", family: "var(--font-space-grotesk), ui-sans-serif, system-ui, sans-serif", weight: 700, tracking: -0.05 },
  { name: "Work Sans", family: "var(--font-work-sans), ui-sans-serif, system-ui, sans-serif", weight: 700, tracking: -0.035 },
  { name: "Montserrat", family: "var(--font-montserrat), ui-sans-serif, system-ui, sans-serif", weight: 700, tracking: -0.045 },
  { name: "Playfair Display", family: "var(--font-playfair-display), ui-serif, Georgia, serif", weight: 700, tracking: -0.03 },
  { name: "Libre Baskerville", family: "var(--font-libre-baskerville), ui-serif, Georgia, serif", weight: 700, tracking: -0.02 },
  { name: "Cormorant Garamond", family: "var(--font-cormorant-garamond), ui-serif, Georgia, serif", weight: 700, tracking: -0.02 },
  { name: "Lora", family: "var(--font-lora), ui-serif, Georgia, serif", weight: 700, tracking: -0.02 },
  { name: "Bricolage Grotesque", family: "var(--font-bricolage-grotesque), ui-sans-serif, system-ui, sans-serif", weight: 700, tracking: -0.04 },
  { name: "Rubik", family: "var(--font-rubik), ui-sans-serif, system-ui, sans-serif", weight: 700, tracking: -0.04 },
  { name: "Raleway", family: "var(--font-raleway), ui-sans-serif, system-ui, sans-serif", weight: 700, tracking: -0.045 },
  { name: "Karla", family: "var(--font-karla), ui-sans-serif, system-ui, sans-serif", weight: 700, tracking: -0.035 },
  { name: "Mulish", family: "var(--font-mulish), ui-sans-serif, system-ui, sans-serif", weight: 700, tracking: -0.04 },
  { name: "Noto Sans", family: "var(--font-noto-sans), ui-sans-serif, system-ui, sans-serif", weight: 700, tracking: -0.035 },
  { name: "Noto Serif", family: "var(--font-noto-serif), ui-serif, Georgia, serif", weight: 700, tracking: -0.018 },
  { name: "PT Sans", family: "var(--font-pt-sans), ui-sans-serif, system-ui, sans-serif", weight: 700, tracking: -0.035 },
  { name: "Merriweather", family: "var(--font-merriweather), ui-serif, Georgia, serif", weight: 700, tracking: -0.018 },
  { name: "Crimson Pro", family: "var(--font-crimson-pro), ui-serif, Georgia, serif", weight: 700, tracking: -0.018 },
  { name: "Josefin Sans", family: "var(--font-josefin-sans), ui-sans-serif, system-ui, sans-serif", weight: 700, tracking: -0.025 },
  { name: "Bebas Neue", family: "var(--font-bebas-neue), ui-sans-serif, system-ui, sans-serif", weight: 400, tracking: 0.01 },
  { name: "Cabin", family: "var(--font-cabin), ui-sans-serif, system-ui, sans-serif", weight: 700, tracking: -0.035 },
  { name: "Quicksand", family: "var(--font-quicksand), ui-sans-serif, system-ui, sans-serif", weight: 700, tracking: -0.025 },
  { name: "Exo 2", family: "var(--font-exo-2), ui-sans-serif, system-ui, sans-serif", weight: 700, tracking: -0.035 },
] as const;

const categories = Object.keys(storePresets) as StoreCategory[];
const pick = <T,>(items: readonly T[]) => items[Math.floor(Math.random() * items.length)];
const chance = (n: number) => Math.random() < n;
const pickDifferent = <T,>(items: readonly T[], isCurrent: (item: T) => boolean) => {
  const alternatives = items.filter((item) => !isCurrent(item));
  return pick(alternatives.length ? alternatives : items);
};

function dedupeStrings(items: readonly string[]) {
  const seen = new Set<string>();
  return items
    .map((item) => item.trim())
    .filter(Boolean)
    .filter((item) => {
      const key = item.toLocaleLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
}

function applyUniqueCollectionTitles(
  collections: DesignGenome["store"]["collections"],
  plannedTitles?: readonly string[],
) {
  const planned = plannedTitles ? dedupeStrings(plannedTitles) : [];
  const used = new Set<string>();
  return collections.map((collection, index) => {
    const preferred = planned[index] ?? (collection.title.trim() || `Collection ${index + 1}`);
    let title = preferred;
    let suffix = 2;
    while (used.has(title.toLocaleLowerCase())) {
      title = `${preferred} ${suffix}`;
      suffix += 1;
    }
    used.add(title.toLocaleLowerCase());
    return { ...collection, title };
  });
}

const heroLayouts: HeroLayout[] = HERO_SYSTEMS;
const productLayouts: ProductGridLayout[] = PRODUCT_SYSTEMS;
const headerLayouts: HeaderLayout[] = HEADER_SYSTEMS;

type LayoutRecipe = {
  nav: HeaderLayout;
  hero: HeroLayout;
  productGrid: ProductGridLayout;
  density: DesignGenome["layout"]["density"];
};

const layoutRecipes: Record<StoreCategory, readonly LayoutRecipe[]> = {
  fashion: [
    { nav: "editorial", hero: "magazine", productGrid: "editorialRail", density: "airy" },
    { nav: "transparent", hero: "campaign", productGrid: "asymmetric", density: "airy" },
    { nav: "split", hero: "launch", productGrid: "featureSplit", density: "balanced" },
    { nav: "floating", hero: "statement", productGrid: "magazineGrid", density: "balanced" },
    { nav: "editorial", hero: "statement", productGrid: "spotlight", density: "airy" },
    { nav: "centered", hero: "statement", productGrid: "magazineGrid", density: "balanced" },
  ],
  shoes: [
    { nav: "transparent", hero: "showcase", productGrid: "spotlight", density: "balanced" },
    { nav: "split", hero: "product", productGrid: "stackedCards", density: "compact" },
    { nav: "utility", hero: "launch", productGrid: "carousel", density: "compact" },
  ],
  accessories: [
    { nav: "floating", hero: "editorial", productGrid: "cards", density: "balanced" },
    { nav: "editorial", hero: "showcase", productGrid: "stackedCards", density: "airy" },
    { nav: "minimal", hero: "splitMedia", productGrid: "featureSplit", density: "balanced" },
  ],
  home: [
    { nav: "centered", hero: "minimalCommerce", productGrid: "minimalList", density: "airy" },
    { nav: "stacked", hero: "splitMedia", productGrid: "magazineGrid", density: "balanced" },
    { nav: "minimal", hero: "editorial", productGrid: "cards", density: "airy" },
  ],
  beauty: [
    { nav: "centered", hero: "beautyEditorial", productGrid: "asymmetric", density: "airy" },
    { nav: "editorial", hero: "magazine", productGrid: "spotlight", density: "balanced" },
    { nav: "minimal", hero: "minimalCommerce", productGrid: "mosaic", density: "balanced" },
  ],
  food: [
    { nav: "editorial", hero: "bento", productGrid: "cards", density: "compact" },
    { nav: "floating", hero: "split", productGrid: "featureSplit", density: "balanced" },
    { nav: "centered", hero: "showcase", productGrid: "minimalList", density: "compact" },
  ],
  outdoor: [
    { nav: "transparent", hero: "immersive", productGrid: "catalog", density: "balanced" },
    { nav: "utility", hero: "campaign", productGrid: "spotlight", density: "compact" },
    { nav: "split", hero: "hotspot", productGrid: "featureSplit", density: "balanced" },
  ],
  kids: [
    { nav: "centered", hero: "bento", productGrid: "cards", density: "balanced" },
    { nav: "floating", hero: "showcase", productGrid: "carousel", density: "compact" },
    { nav: "split", hero: "centered", productGrid: "stackedCards", density: "balanced" },
  ],
  tech: [
    { nav: "searchFirst", hero: "launch", productGrid: "comparison", density: "compact" },
    { nav: "stacked", hero: "showcase", productGrid: "catalog", density: "balanced" },
    { nav: "utility", hero: "splitMedia", productGrid: "deals", density: "compact" },
    { nav: "minimal", hero: "product", productGrid: "spotlight", density: "balanced" },
  ],
};

function promptPalette(prompt: string) {
  const p = prompt.toLowerCase();
  if (p.includes("dark") || p.includes("midnight") || p.includes("black") || p.includes("noir")) return palettePresets.filter((x) => ["Midnight Glass", "Electric Night", "Graphite Lime", "Plum Noir", "Deep Emerald", "Digital Violet"].includes(x.name));
  if (p.includes("luxury") || p.includes("warm") || p.includes("fashion") || p.includes("premium")) return palettePresets.filter((x) => ["Warm Editorial", "Monochrome", "Sandstone Luxury", "Cocoa Blush", "Terracotta Stone", "Stone Minimal"].includes(x.name));
  if (p.includes("nature") || p.includes("organic") || p.includes("sage") || p.includes("wellness")) return palettePresets.filter((x) => ["Nordic Sage", "Cream Forest", "Arctic Mint", "Pearl Teal", "Mint Candy"].includes(x.name));
  if (p.includes("tech") || p.includes("blue") || p.includes("saas") || p.includes("electronics")) return palettePresets.filter((x) => ["Technical Blue", "Electric Night", "Cobalt Studio", "Cloud Indigo", "Ice Charcoal", "Digital Violet"].includes(x.name));
  if (p.includes("soft") || p.includes("lavender") || p.includes("beauty") || p.includes("pastel")) return palettePresets.filter((x) => ["Soft Lavender", "Rose Clay", "Cocoa Blush", "Cloud Indigo", "Editorial Lilac", "Blush Peach"].includes(x.name));
  if (p.includes("green") || p.includes("emerald") || p.includes("mint")) return palettePresets.filter((x) => ["Nordic Sage", "Deep Emerald", "Arctic Mint", "Cream Forest", "Pearl Teal", "Mint Candy"].includes(x.name));
  if (p.includes("ocean") || p.includes("teal")) return palettePresets.filter((x) => ["Ocean Mist", "Pearl Teal", "Arctic Mint"].includes(x.name));
  if (p.includes("earth") || p.includes("terracotta") || p.includes("brown")) return palettePresets.filter((x) => ["Warm Editorial", "Terracotta Stone", "Cocoa Blush", "Solar Ochre", "Stone Minimal"].includes(x.name));
  if (p.includes("red") || p.includes("food") || p.includes("sauce")) return palettePresets.filter((x) => ["Warm Editorial", "Terracotta Stone", "Solar Ochre", "Rose Clay", "Blush Peach"].includes(x.name));
  return palettePresets;
}

function directionKeywords(signals: PromptSignals) {
  return [
    signals.luxury ? "luxury" : null,
    signals.editorial ? "editorial" : null,
    signals.minimal ? "minimal" : null,
    signals.bold ? "bold" : null,
    signals.dark ? "dark" : null,
    signals.playful ? "playful" : null,
    signals.technical ? "technical" : null,
    signals.organic ? "organic" : null,
    signals.performance ? "performance" : null,
    signals.conversion ? "conversion-focused" : null,
    signals.promo ? "promotion-ready" : null,
    signals.gallery ? "gallery-led" : null,
    signals.comparison ? "comparison-led" : null,
    signals.subscription ? "membership-ready" : null,
    signals.video ? "motion-led" : null,
  ].filter(Boolean) as string[];
}

function describeDesignDirection(design: DesignGenome, prompt: string) {
  const signals = analyzePrompt(prompt);
  const keywords = directionKeywords(signals);
  const lead = keywords.length
    ? `${keywords.slice(0, 3).join(", ")} ${design.store.category}`
    : `${design.archetype ?? "modern"} ${design.store.category}`;
  const parts = [
    `${lead} direction`,
    `${design.layout.nav} header`,
    `${design.layout.hero} hero`,
    `${design.layout.productGrid} product layout`,
    `${design.layout.footer ?? "minimal"} footer`,
    `${design.commerce?.priceStyle ?? "standard"} pricing`,
    `${design.motion.preset} motion`,
    `${design.typography.fontName} typography`,
  ];
  return parts.join(" · ");
}

function generateSectionPlan(category: StoreCategory, creativity: Creativity, prompt: string): SectionSpec[] {
  const p = prompt.toLowerCase();
  const mandatory: SectionSpec[] = [
    { id: crypto.randomUUID(), type: "collections", eyebrow: "Shop by collection", variant: category === "fashion" || category === "beauty" ? "editorial" : "clean" },
    { id: crypto.randomUUID(), type: "products", eyebrow: category === "tech" ? "Popular devices" : category === "kids" ? "Playtime picks" : "Featured products", variant: category === "tech" ? "rail" : category === "fashion" ? "editorial" : "cards" },
  ];

  const categoryOptionals: Record<StoreCategory, SectionSpec[]> = {
    fashion: [
      { id: crypto.randomUUID(), type: "story", eyebrow: "Editorial feature", variant: "editorial" },
      { id: crypto.randomUUID(), type: "testimonials", eyebrow: "Customer notes", variant: "cards" },
      { id: crypto.randomUUID(), type: "newsletter", eyebrow: "Private list", variant: "clean" },
      { id: crypto.randomUUID(), type: "faq", eyebrow: "Fit & shipping", variant: "minimal" },
    ],
    shoes: [
      { id: crypto.randomUUID(), type: "story", eyebrow: "Performance story", variant: "split" },
      { id: crypto.randomUUID(), type: "testimonials", eyebrow: "Runner reviews", variant: "cards" },
      { id: crypto.randomUUID(), type: "faq", eyebrow: "Sizing notes", variant: "minimal" },
      { id: crypto.randomUUID(), type: "newsletter", eyebrow: "Drop alerts", variant: "clean" },
    ],
    accessories: [
      { id: crypto.randomUUID(), type: "story", eyebrow: "Material focus", variant: "split" },
      { id: crypto.randomUUID(), type: "newsletter", eyebrow: "Members access", variant: "clean" },
      { id: crypto.randomUUID(), type: "testimonials", eyebrow: "Collector notes", variant: "cards" },
      { id: crypto.randomUUID(), type: "faq", eyebrow: "Care details", variant: "minimal" },
    ],
    home: [
      { id: crypto.randomUUID(), type: "story", eyebrow: "Room styling", variant: "split" },
      { id: crypto.randomUUID(), type: "testimonials", eyebrow: "Customer homes", variant: "cards" },
      { id: crypto.randomUUID(), type: "faq", eyebrow: "Materials & care", variant: "minimal" },
      { id: crypto.randomUUID(), type: "newsletter", eyebrow: "Design letters", variant: "clean" },
    ],
    beauty: [
      { id: crypto.randomUUID(), type: "story", eyebrow: "Routine spotlight", variant: "split" },
      { id: crypto.randomUUID(), type: "testimonials", eyebrow: "Community notes", variant: "cards" },
      { id: crypto.randomUUID(), type: "newsletter", eyebrow: "Glow updates", variant: "clean" },
      { id: crypto.randomUUID(), type: "faq", eyebrow: "Usage guide", variant: "minimal" },
    ],
    food: [
      { id: crypto.randomUUID(), type: "story", eyebrow: "Flavor story", variant: "split" },
      { id: crypto.randomUUID(), type: "testimonials", eyebrow: "Tasting notes", variant: "cards" },
      { id: crypto.randomUUID(), type: "faq", eyebrow: "Delivery & storage", variant: "minimal" },
      { id: crypto.randomUUID(), type: "newsletter", eyebrow: "Kitchen list", variant: "clean" },
    ],
    outdoor: [
      { id: crypto.randomUUID(), type: "story", eyebrow: "Field notes", variant: "split" },
      { id: crypto.randomUUID(), type: "testimonials", eyebrow: "Trail feedback", variant: "cards" },
      { id: crypto.randomUUID(), type: "faq", eyebrow: "Gear guide", variant: "minimal" },
      { id: crypto.randomUUID(), type: "newsletter", eyebrow: "Expedition updates", variant: "clean" },
    ],
    kids: [
      { id: crypto.randomUUID(), type: "story", eyebrow: "Playful story", variant: "split" },
      { id: crypto.randomUUID(), type: "testimonials", eyebrow: "Parent notes", variant: "cards" },
      { id: crypto.randomUUID(), type: "faq", eyebrow: "Sizing help", variant: "minimal" },
      { id: crypto.randomUUID(), type: "newsletter", eyebrow: "Family updates", variant: "clean" },
    ],
    tech: [
      { id: crypto.randomUUID(), type: "story", eyebrow: "Setup guide", variant: "split" },
      { id: crypto.randomUUID(), type: "testimonials", eyebrow: "Verified feedback", variant: "cards" },
      { id: crypto.randomUUID(), type: "faq", eyebrow: "Compatibility help", variant: "minimal" },
      { id: crypto.randomUUID(), type: "newsletter", eyebrow: "Launch alerts", variant: "clean" },
    ],
  };

  const optional = [...categoryOptionals[category]];
  if (/(faq|questions|shipping|returns)/.test(p)) optional.unshift({ id: crypto.randomUUID(), type: "faq", eyebrow: "Questions answered", variant: "minimal" });
  if (/(testimonial|reviews|social proof|community)/.test(p)) optional.unshift({ id: crypto.randomUUID(), type: "testimonials", eyebrow: "Loved by customers", variant: "cards" });
  if (/(story|journal|editorial|about)/.test(p)) optional.unshift({ id: crypto.randomUUID(), type: "story", eyebrow: "Brand story", variant: "split" });
  if (/(newsletter|email|signup|launches|drops)/.test(p)) optional.unshift({ id: crypto.randomUUID(), type: "newsletter", eyebrow: "Join the list", variant: "clean" });
  if (/(video|gif|motion|moving|reel|cinematic)/.test(p)) optional.unshift({ id: crypto.randomUUID(), type: "videoStory", eyebrow: "See it in motion", variant: "immersive" });
  if (/(compare|comparison|tiers|spec)/.test(p)) optional.unshift({ id: crypto.randomUUID(), type: "comparison", eyebrow: "Compare the options", variant: "cards" });
  if (/(instagram|social|ugc|community style)/.test(p)) optional.unshift({ id: crypto.randomUUID(), type: "socialProof", eyebrow: "Community moments", variant: "rail" });
  if (/(campaign|drop|launch|promotion|sale)/.test(p)) optional.unshift({ id: crypto.randomUUID(), type: "campaign", eyebrow: "Current campaign", variant: "contrast" });

  const optionalCount = creativity === "safe" ? 3 : creativity === "balanced" ? 4 : 5;
  const shuffled = [...optional].sort(() => Math.random() - 0.5).slice(0, optionalCount);
  const plan = [...mandatory, ...shuffled];
  if (creativity === "experimental") plan.sort(() => Math.random() - 0.5);
  return plan;
}

function nextStore(current: DesignGenome, category: StoreCategory, scope: GenerateScope) {
  if (scope === "all" || scope === "layout") return structuredClone(storePresets[category]);
  return current.store;
}


function normalizeShopTitle(value?: string) {
  if (!value) return "";
  return value.trim().replace(/\s+/g, " ").slice(0, 48);
}

export function generateDesign(args: {
  current: DesignGenome;
  locks: DesignLocks;
  scope: GenerateScope;
  creativity: Creativity;
  prompt: string;
  shopTitle?: string;
  planner?: DesignPlan;
}): DesignGenome {
  const { current, locks, scope, creativity, prompt, shopTitle } = args;
  const all = scope === "all";
  const intensity = creativity === "safe" ? 0.32 : creativity === "balanced" ? 0.7 : 1;
  const next: DesignGenome = structuredClone(current);
  const nextSeed = Math.floor(Math.random() * 999999);
  const palette = pickDifferent(promptPalette(prompt), (item) => item.background === current.palette.background && item.primary === current.palette.primary);
  const planner = args.planner ?? buildLocalDesignPlan(prompt, current.store.category, creativity);
  const category = planner.category;
  const promptSignals = planner.signals ?? analyzePrompt(prompt);
  const layoutBias = planner.layoutBias ?? inferLayoutBias(prompt, category, promptSignals);
  const promptIntentV2 = parsePromptIntentV2(prompt);
  const proposedArtDirection = selectArtDirection(category, prompt, nextSeed, current.artDirection?.name);
  const artDirection = creativity === "safe" && current.artDirection ? current.artDirection : proposedArtDirection;
  const compositionDefinition = selectCompositionFamily(artDirection, category, prompt, nextSeed, current.composition?.pageFamily);
  const proposedComposition = buildCompositionGenome(compositionDefinition, nextSeed);
  const compositionGenome = creativity === "safe" && current.composition ? structuredClone(current.composition) : proposedComposition;
  const typographyPair = creativity === "safe" && current.typographyPair
    ? current.typographyPair
    : selectTypographyPair(category, artDirection.name, nextSeed, prompt, current.typographyPair?.name ?? current.typography.pairName);
  const productAnatomy = creativity === "safe" && current.productAnatomy
    ? current.productAnatomy
    : selectProductAnatomy(category, artDirection.name, prompt, nextSeed);
  const interactionProfile = creativity === "safe" && current.interactionProfile
    ? current.interactionProfile
    : selectInteractionProfile(category, artDirection.name, productAnatomy, prompt, nextSeed);
  const pricingComposition = creativity === "safe" && current.pricingComposition
    ? current.pricingComposition
    : selectPricingComposition(category, productAnatomy, artDirection.name, prompt, nextSeed);
  const motionLanguage = creativity === "safe" && current.motionLanguage
    ? current.motionLanguage
    : selectMotionLanguage(category, artDirection.name, promptIntentV2.interactionDensity ?? interactionProfile.density, prompt);
  const categoryRecipes = DESIGN_RECIPES[category];
  const promptMatchedRecipes = categoryRecipes.filter((item) => {
    const navOk = !layoutBias.navOptions?.length || layoutBias.navOptions.includes(item.nav);
    const heroOk = !layoutBias.heroOptions?.length || layoutBias.heroOptions.includes(item.hero);
    const gridOk = !layoutBias.gridOptions?.length || layoutBias.gridOptions.includes(item.productGrid);
    const footerOk = !layoutBias.footerOptions?.length || layoutBias.footerOptions.includes(item.footer);
    return navOk && heroOk && gridOk && footerOk;
  });
  const recipePool = promptMatchedRecipes.length ? promptMatchedRecipes : categoryRecipes;
  const designRecipe = pickDifferent(recipePool, (item) =>
    item.nav === current.layout.nav && item.hero === current.layout.hero && item.productGrid === current.layout.productGrid && item.footer === current.layout.footer,
  );
  const hybridPool = recipePool.filter((item) => item.id !== designRecipe.id);
  const hybridRecipe = pickDifferent(hybridPool.length ? hybridPool : categoryRecipes, (item) => item.id === designRecipe.id);
  if (!next.commerce) next.commerce = defaultCommerceSettings(category);
  if (!next.archetype) next.archetype = designRecipe.archetype;
  if (!next.layout.footer) next.layout.footer = designRecipe.footer;
  if (!next.layout.sectionRhythm) next.layout.sectionRhythm = "balanced";

  if ((all || scope === "palette") && !locks.palette) {
    const { name: _name, ...paletteValues } = palette;
    next.palette = paletteValues;
  }

  if ((all || scope === "typography") && !locks.typography && (scope === "typography" || chance(intensity))) {
    const f = pickDifferent(fontPresets, (item) => item.name === current.typography.fontName);
    next.typography = {
      fontName: f.name,
      heading: f.family,
      body: f.family,
      headingWeight: f.weight,
      headingTracking: f.tracking,
      scale: pick(creativity === "safe" ? [current.typography.scale, "balanced"] : ["compact", "balanced", "large"]),
    };
  }

  if ((all || scope === "layout") && !locks.layout) {
    next.layout.nav = pickDifferent(creativity === "safe" ? [current.layout.nav, "floating", "minimal", "compactSticky"] : headerLayouts, (item) => item === current.layout.nav);
    if (!locks.hero) next.layout.hero = pickDifferent(creativity === "safe" ? [current.layout.hero, "split", "immersive", "showcase", "collectionHero"] : heroLayouts, (item) => item === current.layout.hero);
    if (!locks.products) next.layout.productGrid = pickDifferent(creativity === "safe" ? [current.layout.productGrid, "classic", "deals", "featuredPlusRail"] : productLayouts, (item) => item === current.layout.productGrid);
    next.layout.footer = pickDifferent(creativity === "safe" ? [current.layout.footer ?? "minimal", "columns", "compact"] : FOOTER_SYSTEMS, (item) => item === current.layout.footer);
    next.layout.density = pick(creativity === "safe" ? [current.layout.density, "balanced"] : ["compact", "balanced", "airy"]);
    next.layout.sectionRhythm = pick(creativity === "safe" ? [current.layout.sectionRhythm ?? "balanced", "balanced"] : ["tight", "balanced", "editorial"]);
    next.archetype = creativity === "safe" ? (current.archetype ?? designRecipe.archetype) : designRecipe.archetype;
    next.commerce = {
      ...(next.commerce ?? defaultCommerceSettings(category)),
      priceStyle: pickDifferent(creativity === "safe" ? [next.commerce?.priceStyle ?? "standard", "standard", "minimal"] : PRICE_STYLES, (item) => item === current.commerce?.priceStyle),
      cardStyle: pickDifferent(creativity === "safe" ? [next.commerce?.cardStyle ?? "softCard", "softCard", "outlined"] : CARD_STYLES, (item) => item === current.commerce?.cardStyle),
      imageRatio: pick(creativity === "safe" ? [next.commerce?.imageRatio ?? "portrait", "portrait", "square"] : ["square", "portrait", "editorial", "landscape", "mixed"]),
      showRatings: chance(category === "tech" || category === "beauty" || category === "food" ? 0.78 : 0.38),
      showSwatches: chance(category === "fashion" || category === "shoes" || category === "accessories" ? 0.8 : 0.24),
      showBadges: chance(0.78),
      quickView: chance(0.76),
      wishlist: chance(category === "fashion" || category === "beauty" || category === "accessories" ? 0.72 : 0.35),
      mediaBehavior: layoutBias.mediaBehavior ?? (promptSignals.video ? (/gif|animated loop|autoplay/.test(prompt.toLowerCase()) ? "autoplayVideo" : "hoverVideo") : pick(["static", "hoverZoom", "hoverSwap", "parallax", "maskedReveal", "gallery"] as const)),
    };

    if (layoutBias.navOptions?.length) next.layout.nav = pickDifferent(layoutBias.navOptions, (item) => item === current.layout.nav);
    if (!locks.hero && layoutBias.heroOptions?.length) next.layout.hero = pick(layoutBias.heroOptions);
    if (!locks.products && layoutBias.gridOptions?.length) next.layout.productGrid = pickDifferent(layoutBias.gridOptions, (item) => item === current.layout.productGrid);
    if (layoutBias.footerOptions?.length) next.layout.footer = pickDifferent(layoutBias.footerOptions, (item) => item === current.layout.footer);
    if (layoutBias.density) next.layout.density = layoutBias.density;
    if (layoutBias.rhythm) next.layout.sectionRhythm = layoutBias.rhythm;
    if (layoutBias.archetype) next.archetype = layoutBias.archetype;
    next.commerce = {
      ...(next.commerce ?? defaultCommerceSettings(category)),
      ...(layoutBias.priceStyle ? { priceStyle: layoutBias.priceStyle } : {}),
      ...(layoutBias.cardStyle ? { cardStyle: layoutBias.cardStyle } : {}),
      ...(layoutBias.mediaBehavior ? { mediaBehavior: layoutBias.mediaBehavior } : {}),
    };
  }

  if ((all || scope === "layout") && !locks.layout) {
    const p = prompt.toLowerCase();

    // Header architecture is category-aware so generation changes actual structure, not only styling.
    if (category === "tech" || /(electronics|device|smartphone|laptop|monitor|components|search-first|marketplace)/.test(p)) {
      next.layout.nav = pickDifferent(["searchFirst", "stacked", "utility"] as const, (item) => item === current.layout.nav);
    } else if (category === "fashion" || /(fashion|luxury|lookbook|editorial|streetwear|minimalist)/.test(p)) {
      next.layout.nav = pickDifferent(["split", "editorial", "transparent", "centered", "floating"] as const, (item) => item === current.layout.nav);
    } else if (category === "beauty" || /(beauty|skincare|salon|cosmetics|perfume)/.test(p)) {
      next.layout.nav = pickDifferent(["centered", "editorial", "minimal", "stacked"] as const, (item) => item === current.layout.nav);
    } else if (category === "home" || /(home|decor|furniture|bedding|interior)/.test(p)) {
      next.layout.nav = pickDifferent(["centered", "stacked", "utility", "minimal"] as const, (item) => item === current.layout.nav);
    } else if (category === "kids" || /(kids|baby|children|playful)/.test(p)) {
      next.layout.nav = pickDifferent(["floating", "centered", "split", "minimal"] as const, (item) => item === current.layout.nav);
    } else if (category === "shoes" || /(shoes|sneakers|running|footwear)/.test(p)) {
      next.layout.nav = pickDifferent(["transparent", "split", "floating", "utility"] as const, (item) => item === current.layout.nav);
    } else if (category === "outdoor" || /(outdoor|camping|ski|sport|technical)/.test(p)) {
      next.layout.nav = pickDifferent(["transparent", "utility", "split", "minimal"] as const, (item) => item === current.layout.nav);
    } else if (category === "food" || /(food|restaurant|coffee|bakery|snack)/.test(p)) {
      next.layout.nav = pickDifferent(["editorial", "centered", "minimal", "floating"] as const, (item) => item === current.layout.nav);
    }

    if (/(centered logo|center logo)/.test(p)) next.layout.nav = "centered";
    if (/(search header|large search|search-first)/.test(p)) next.layout.nav = "searchFirst";
    if (/(transparent header|overlay header|dark header)/.test(p)) next.layout.nav = "transparent";
    if (/(stacked header|two row header)/.test(p)) next.layout.nav = "stacked";
    if (/(editorial header|magazine header)/.test(p)) next.layout.nav = "editorial";
    if (/(minimal header|simple header)/.test(p)) next.layout.nav = "minimal";

    if (!locks.hero) {
      if (category === "tech" || /(electronics|device|smartphone|laptop|monitor|spec)/.test(p)) next.layout.hero = pick(["showcase", "launch", "splitMedia", "product", "bento"] as const);
      if (category === "kids" || /(kids|children|playful|soft|pastel)/.test(p)) next.layout.hero = pick(["split", "bento", "showcase", "centered"] as const);
      if (category === "outdoor" || /(techwear|campaign|dark fashion|performance|sport|running)/.test(p)) next.layout.hero = pick(["campaign", "immersive", "hotspot"] as const);
      if (category === "beauty" || /(beauty editorial|skincare editorial|serum|salon|hair|stylist)/.test(p)) next.layout.hero = pick(["beautyEditorial", "magazine", "editorial", "minimalCommerce"] as const);
      if (category === "home" || /(bedding|bedroom|linen|dwell|interior)/.test(p)) next.layout.hero = pick(["editorial", "splitMedia", "minimalCommerce", "centered"] as const);
      if (category === "fashion" && /(editorial|luxury|model|lookbook)/.test(p)) next.layout.hero = pick(["hotspot", "campaign", "immersive", "statement", "magazine", "launch"] as const);
    }
    if (!locks.products) {
      if (category === "tech") next.layout.productGrid = pickDifferent(["catalog", "deals", "comparison", "carousel", "minimalList", "spotlight", "priceSpotlight", "tickerShowcase"] as const, (item) => item === current.layout.productGrid);
      if (category === "kids") next.layout.productGrid = pickDifferent(["classic", "cards", "carousel", "compact", "featureSplit", "stackedCards", "floatingRail"] as const, (item) => item === current.layout.productGrid);
      if (category === "outdoor") next.layout.productGrid = pickDifferent(["catalog", "mosaic", "lookbook", "featureSplit", "spotlight", "staggeredGallery", "floatingRail"] as const, (item) => item === current.layout.productGrid);
      if (category === "beauty") next.layout.productGrid = pickDifferent(["mosaic", "editorial", "editorialRail", "cards", "asymmetric", "spotlight", "editorialDeck", "staggeredGallery"] as const, (item) => item === current.layout.productGrid);
      if (category === "home") next.layout.productGrid = pickDifferent(["editorial", "classic", "carousel", "cards", "magazineGrid", "minimalList", "editorialDeck", "staggeredGallery", "floatingRail"] as const, (item) => item === current.layout.productGrid);
      if (category === "fashion") next.layout.productGrid = pickDifferent(["catalog", "lookbook", "editorial", "editorialRail", "carousel", "featureSplit", "magazineGrid", "asymmetric", "staggeredGallery", "tickerShowcase", "editorialDeck"] as const, (item) => item === current.layout.productGrid);
      if (category === "food") next.layout.productGrid = pickDifferent(["cards", "featureSplit", "editorial", "spotlight", "minimalList", "tickerShowcase", "priceSpotlight"] as const, (item) => item === current.layout.productGrid);
      if (category === "accessories" || category === "shoes") next.layout.productGrid = pickDifferent(["lookbook", "cards", "editorialRail", "featureSplit", "stackedCards", "carousel", "priceSpotlight", "editorialDeck"] as const, (item) => item === current.layout.productGrid);
    }

    if (/(mega menu|large menu|catalog nav)/.test(p)) next.layout.nav = "megaMenu";
    if (/(side navigation|sidebar nav|left nav)/.test(p)) next.layout.nav = "sideNav";
    if (/(lookbook|gallery layout|masonry grid)/.test(p) && !locks.products) next.layout.productGrid = pick(["mosaic", "magazineGrid", "editorialRail", "staggeredGallery"] as const);
    if (/(comparison grid|comparison table|spec grid)/.test(p) && !locks.products) next.layout.productGrid = pick(["comparison", "specGrid"] as const);
    if (/(bundle|kit|set|subscription)/.test(p) && !locks.products) next.layout.productGrid = pick(["bundleGrid", "featuredPlusRail", "cards", "floatingRail"] as const);
    if (/(different product layout|unique product layout|varied product layout|unique products grid)/.test(p) && !locks.products) next.layout.productGrid = pick(["staggeredGallery", "tickerShowcase", "floatingRail", "editorialDeck", "priceSpotlight"] as const);
    if (/(moving text|scrolling text|marquee|ticker|animated text|modern moving text)/.test(p) && !locks.products) next.layout.productGrid = pick(["tickerShowcase", "editorialDeck", "floatingRail"] as const);
    if (/(car|cars|automotive|vehicle|vehicles|suv|sedan|coupe|supercar|electric vehicle|ev)/.test(p) && !locks.products) next.layout.productGrid = pick(["spotlight", "featureSplit", "comparison", "floatingRail", "tickerShowcase"] as const);
    if (/(phone|phones|smartphone|smartphones|iphone|android|mobile phone|cellphone)/.test(p) && !locks.products) next.layout.productGrid = pick(["comparison", "specGrid", "priceSpotlight", "tickerShowcase", "featuredPlusRail"] as const);
    if (/(watch|watches|timepiece|chronograph|smartwatch)/.test(p) && !locks.products) next.layout.productGrid = pick(["spotlight", "luxurySparse", "featuredPlusRail", "editorialDeck"] as const);
    if (/(seafood|fish|salmon|shrimp|lobster|oyster|shellfish)/.test(p) && !locks.products) next.layout.productGrid = pick(["cards", "featureSplit", "spotlight", "priceSpotlight"] as const);
    if (/(glasses|eyewear|sunglasses|frames|optical)/.test(p) && !locks.products) next.layout.productGrid = pick(["editorialRail", "featuredPlusRail", "priceSpotlight", "lookbook"] as const);
    if (/(kitchen appliance|air fryer|blender|coffee machine|refrigerator|fridge|oven|toaster|stand mixer)/.test(p) && !locks.products) next.layout.productGrid = pick(["comparison", "specGrid", "cards", "featuredPlusRail"] as const);
    if (/(sofa|sofas|couch|couches|sectional|loveseat)/.test(p) && !locks.products) next.layout.productGrid = pick(["featuredPlusRail", "editorialDeck", "staggeredGallery", "spotlight"] as const);
    if (/(bed|beds|mattress|mattresses|bedding|bed frame)/.test(p) && !locks.products) next.layout.productGrid = pick(["editorialDeck", "featureSplit", "spotlight", "minimalList"] as const);
    if (/(bigger price|pricing focus|strong pricing|modern pricing|price callout)/.test(p)) next.commerce = { ...(next.commerce ?? defaultCommerceSettings(category)), priceStyle: pick(["pricePill", "compareStrong", "saleCallout"] as const) };
    if (/(phone|phones|smartphone|smartphones|iphone|android|spec|electronics)/.test(p)) next.commerce = { ...(next.commerce ?? defaultCommerceSettings(category)), priceStyle: pick(["techSpec", "pricePill", "compareStrong"] as const) };
    if (/(watch|watches|timepiece|chronograph|luxury watch)/.test(p)) next.commerce = { ...(next.commerce ?? defaultCommerceSettings(category)), priceStyle: pick(["luxuryInline", "pricePill", "compareStrong"] as const) };
    if (/(kitchen appliance|air fryer|blender|coffee machine|refrigerator|fridge|oven|toaster|stand mixer)/.test(p)) next.commerce = { ...(next.commerce ?? defaultCommerceSettings(category)), priceStyle: pick(["installment", "techSpec", "compareStrong"] as const) };
    if (/(newsletter footer|email footer|strong footer)/.test(p)) next.layout.footer = pick(["newsletterHero", "supportHeavy", "columns"] as const);
    if (/(editorial footer|brand footer|oversized footer)/.test(p)) next.layout.footer = pick(["editorial", "oversizedBrand", "imageSplit"] as const);
    if (/(support footer|legal footer|trust footer)/.test(p)) next.layout.footer = pick(["supportHeavy", "legalHeavy", "columns"] as const);

    if (creativity !== "safe" && chance(creativity === "experimental" ? 0.9 : 0.72)) {
      next.archetype = designRecipe.archetype;
      next.layout.nav = designRecipe.nav;
      if (!locks.hero) next.layout.hero = designRecipe.hero;
      if (!locks.products) next.layout.productGrid = designRecipe.productGrid;
      next.layout.footer = designRecipe.footer;
      next.layout.density = designRecipe.density;
      next.layout.sectionRhythm = designRecipe.sectionRhythm;
      next.commerce = {
        ...(next.commerce ?? defaultCommerceSettings(category)),
        priceStyle: designRecipe.priceStyle,
        cardStyle: designRecipe.cardStyle,
      };
    }

    if (creativity !== "safe" && chance(creativity === "experimental" ? 0.62 : 0.34)) {
      next.archetype = chance(0.55) ? designRecipe.archetype : hybridRecipe.archetype;
      next.layout.nav = chance(0.5) ? designRecipe.nav : hybridRecipe.nav;
      if (!locks.hero) next.layout.hero = chance(0.5) ? designRecipe.hero : hybridRecipe.hero;
      if (!locks.products) next.layout.productGrid = chance(0.5) ? designRecipe.productGrid : hybridRecipe.productGrid;
      next.layout.footer = chance(0.5) ? designRecipe.footer : hybridRecipe.footer;
      next.layout.density = chance(0.5) ? designRecipe.density : hybridRecipe.density;
      next.layout.sectionRhythm = chance(0.5) ? designRecipe.sectionRhythm : hybridRecipe.sectionRhythm;
      next.commerce = {
        ...(next.commerce ?? defaultCommerceSettings(category)),
        priceStyle: chance(0.5) ? designRecipe.priceStyle : hybridRecipe.priceStyle,
        cardStyle: chance(0.5) ? designRecipe.cardStyle : hybridRecipe.cardStyle,
      };
    }

    if (layoutBias.navOptions?.length && chance(0.82)) next.layout.nav = pick(layoutBias.navOptions);
    if (!locks.hero && layoutBias.heroOptions?.length && chance(0.82)) next.layout.hero = pick(layoutBias.heroOptions);
    if (!locks.products && layoutBias.gridOptions?.length && chance(0.82)) next.layout.productGrid = pick(layoutBias.gridOptions);
    if (layoutBias.footerOptions?.length && chance(0.82)) next.layout.footer = pick(layoutBias.footerOptions);
    if (layoutBias.priceStyle && chance(0.78)) next.commerce = { ...(next.commerce ?? defaultCommerceSettings(category)), priceStyle: layoutBias.priceStyle };
    if (layoutBias.cardStyle && chance(0.68)) next.commerce = { ...(next.commerce ?? defaultCommerceSettings(category)), cardStyle: layoutBias.cardStyle };
    if (layoutBias.mediaBehavior && chance(0.78)) next.commerce = { ...(next.commerce ?? defaultCommerceSettings(category)), mediaBehavior: layoutBias.mediaBehavior };
  }

  if ((all || scope === "surfaces") && !locks.surfaces) {
    const glass = creativity === "safe" ? Math.max(0, Math.min(0.85, current.surfaces.glass + (Math.random() - 0.5) * 0.12)) : Math.random() * 0.82;
    next.surfaces = {
      glass: Number(glass.toFixed(2)),
      blur: Math.round(8 + Math.random() * (creativity === "experimental" ? 28 : 18)),
      shadow: pick(["none", "soft", "elevated"] as const),
    };
    next.geometry = {
      radius: Math.round(creativity === "safe" ? Math.max(8, Math.min(28, current.geometry.radius + (Math.random() - 0.5) * 8)) : 6 + Math.random() * 26),
      buttonRadius: chance(0.55) ? 999 : Math.round(8 + Math.random() * 16),
    };
  }

  if ((all || scope === "motion") && !locks.motion) {
    const signals = promptSignals;
    const motionMap: Record<MotionPreset, DesignGenome["motion"]> = {
      calm: { preset: "calm", duration: 0.62, stagger: 0.05, hoverLift: 2, hoverScale: 1.008, sectionDistance: 14, mediaZoom: 1.015, loop: false },
      smooth: { preset: "smooth", duration: 0.45, stagger: 0.045, hoverLift: 4, hoverScale: 1.012, sectionDistance: 18, mediaZoom: 1.02, loop: false },
      editorial: { preset: "editorial", duration: 0.56, stagger: 0.075, hoverLift: 6, hoverScale: 1.015, sectionDistance: 20, mediaZoom: 1.03, loop: false },
      spring: { preset: "spring", duration: 0.4, stagger: 0.04, hoverLift: 7, hoverScale: 1.018, sectionDistance: 18, mediaZoom: 1.025, loop: false },
      dynamic: { preset: "dynamic", duration: 0.3, stagger: 0.03, hoverLift: 9, hoverScale: 1.024, sectionDistance: 24, mediaZoom: 1.04, loop: false },
      cinematic: { preset: "cinematic", duration: 0.72, stagger: 0.08, hoverLift: 5, hoverScale: 1.01, sectionDistance: 26, mediaZoom: 1.055, loop: true },
      float: { preset: "float", duration: 0.5, stagger: 0.05, hoverLift: 5, hoverScale: 1.016, sectionDistance: 18, mediaZoom: 1.03, loop: true },
      snappy: { preset: "snappy", duration: 0.24, stagger: 0.02, hoverLift: 8, hoverScale: 1.028, sectionDistance: 16, mediaZoom: 1.03, loop: false },
      layered: { preset: "layered", duration: 0.48, stagger: 0.06, hoverLift: 6, hoverScale: 1.014, sectionDistance: 22, mediaZoom: 1.032, loop: false },
      reveal: { preset: "reveal", duration: 0.38, stagger: 0.03, hoverLift: 3, hoverScale: 1.008, sectionDistance: 28, mediaZoom: 1.018, loop: false },
      glide: { preset: "glide", duration: 0.52, stagger: 0.055, hoverLift: 6, hoverScale: 1.017, sectionDistance: 16, mediaZoom: 1.024, loop: true },
      orbit: { preset: "orbit", duration: 0.66, stagger: 0.07, hoverLift: 4, hoverScale: 1.01, sectionDistance: 20, mediaZoom: 1.018, loop: true },
      softReveal: { preset: "softReveal", duration: 0.68, stagger: 0.06, hoverLift: 3, hoverScale: 1.01, sectionDistance: 18, mediaZoom: 1.02, loop: false },
      clipReveal: { preset: "clipReveal", duration: 0.52, stagger: 0.045, hoverLift: 5, hoverScale: 1.014, sectionDistance: 24, mediaZoom: 1.025, loop: false },
      staggerRise: { preset: "staggerRise", duration: 0.44, stagger: 0.095, hoverLift: 6, hoverScale: 1.018, sectionDistance: 30, mediaZoom: 1.022, loop: false },
      editorialSlide: { preset: "editorialSlide", duration: 0.58, stagger: 0.07, hoverLift: 4, hoverScale: 1.012, sectionDistance: 22, mediaZoom: 1.028, loop: false },
      magnetic: { preset: "magnetic", duration: 0.32, stagger: 0.025, hoverLift: 10, hoverScale: 1.03, sectionDistance: 16, mediaZoom: 1.035, loop: false },
      parallaxSoft: { preset: "parallaxSoft", duration: 0.7, stagger: 0.055, hoverLift: 4, hoverScale: 1.012, sectionDistance: 20, mediaZoom: 1.04, loop: true },
      imageDrift: { preset: "imageDrift", duration: 0.74, stagger: 0.05, hoverLift: 3, hoverScale: 1.014, sectionDistance: 16, mediaZoom: 1.035, loop: true },
      menuCascade: { preset: "menuCascade", duration: 0.36, stagger: 0.11, hoverLift: 5, hoverScale: 1.016, sectionDistance: 26, mediaZoom: 1.018, loop: false },
      luxuryFlow: { preset: "luxuryFlow", duration: 0.68, stagger: 0.065, hoverLift: 4, hoverScale: 1.014, sectionDistance: 19, mediaZoom: 1.032, loop: true },
      gridPulse: { preset: "gridPulse", duration: 0.34, stagger: 0.03, hoverLift: 7, hoverScale: 1.024, sectionDistance: 18, mediaZoom: 1.03, loop: false },
      spotlightReveal: { preset: "spotlightReveal", duration: 0.54, stagger: 0.045, hoverLift: 6, hoverScale: 1.018, sectionDistance: 26, mediaZoom: 1.045, loop: true },
      elasticRise: { preset: "elasticRise", duration: 0.42, stagger: 0.038, hoverLift: 9, hoverScale: 1.022, sectionDistance: 20, mediaZoom: 1.03, loop: false },
      softZoom: { preset: "softZoom", duration: 0.6, stagger: 0.05, hoverLift: 3, hoverScale: 1.012, sectionDistance: 16, mediaZoom: 1.06, loop: true },
      showcaseLift: { preset: "showcaseLift", duration: 0.48, stagger: 0.04, hoverLift: 8, hoverScale: 1.02, sectionDistance: 22, mediaZoom: 1.04, loop: false },
      marqueeFlow: { preset: "marqueeFlow", duration: 0.42, stagger: 0.03, hoverLift: 5, hoverScale: 1.014, sectionDistance: 20, mediaZoom: 1.03, loop: true },
      headlineSweep: { preset: "headlineSweep", duration: 0.5, stagger: 0.045, hoverLift: 6, hoverScale: 1.018, sectionDistance: 24, mediaZoom: 1.035, loop: true },
      driftLoop: { preset: "driftLoop", duration: 0.66, stagger: 0.05, hoverLift: 4, hoverScale: 1.012, sectionDistance: 18, mediaZoom: 1.05, loop: true },
      kineticTicker: { preset: "kineticTicker", duration: 0.3, stagger: 0.024, hoverLift: 7, hoverScale: 1.022, sectionDistance: 18, mediaZoom: 1.038, loop: false },
      ribbonWave: { preset: "ribbonWave", duration: 0.62, stagger: 0.055, hoverLift: 4, hoverScale: 1.014, sectionDistance: 22, mediaZoom: 1.036, loop: true },
      depthFloat: { preset: "depthFloat", duration: 0.68, stagger: 0.05, hoverLift: 4, hoverScale: 1.016, sectionDistance: 20, mediaZoom: 1.042, loop: true },
      cascadeZoom: { preset: "cascadeZoom", duration: 0.52, stagger: 0.075, hoverLift: 6, hoverScale: 1.02, sectionDistance: 24, mediaZoom: 1.055, loop: false },
      spotlightParallax: { preset: "spotlightParallax", duration: 0.72, stagger: 0.05, hoverLift: 5, hoverScale: 1.018, sectionDistance: 26, mediaZoom: 1.05, loop: true },
    };

    const safePresets: MotionPreset[] = [current.motion.preset, "smooth", "calm", "softReveal", "softZoom", "float", "driftLoop"];
    let presets: MotionPreset[] = [
      "calm", "smooth", "editorial", "spring", "dynamic", "cinematic", "float", "snappy", "layered", "reveal", "glide", "orbit",
      "softReveal", "clipReveal", "staggerRise", "editorialSlide", "magnetic", "parallaxSoft", "imageDrift", "menuCascade",
      "luxuryFlow", "gridPulse", "spotlightReveal", "elasticRise", "softZoom", "showcaseLift",
      "marqueeFlow", "headlineSweep", "driftLoop", "kineticTicker", "ribbonWave", "depthFloat", "cascadeZoom", "spotlightParallax",
    ];

    if (creativity === "safe") presets = safePresets;
    if (signals.luxury || signals.editorial) presets = [...presets, "luxuryFlow", "editorial", "editorialSlide", "softZoom", "headlineSweep"];
    if (signals.technical || category === "tech") presets = [...presets, "gridPulse", "magnetic", "snappy", "showcaseLift", "driftLoop"];
    if (signals.performance || category === "outdoor" || category === "shoes") presets = [...presets, "showcaseLift", "spotlightReveal", "dynamic", "elasticRise"];
    if (signals.playful || category === "kids") presets = [...presets, "spring", "elasticRise", "float", "marqueeFlow"];
    if (signals.minimal || category === "home" || category === "beauty") presets = [...presets, "softReveal", "softZoom", "smooth"];
    if (/moving text|marquee|ticker|scrolling text/.test(prompt.toLowerCase())) presets = [...presets, "marqueeFlow", "headlineSweep"];
    if (/moving image|floating image|animated image/.test(prompt.toLowerCase())) presets = [...presets, "driftLoop", "showcaseLift", "softZoom"];
    if (signals.dark || category === "fashion") presets = [...presets, "cinematic", "imageDrift", "luxuryFlow", "headlineSweep"];

    const preset = creativity === "safe" ? pick(presets) : pickDifferent(presets, (item) => item === current.motion.preset);
    next.motion = motionMap[preset];
  }

  // priority pass. This runs after legacy recipe/random exploration so
  // explicit prompt intent and coherent composition win over late randomization.
  if ((all || scope === "layout") && !locks.layout) {
    const compositionChoices = layoutChoicesForComposition(compositionGenome.pageFamily);
    const shouldRecompose = creativity !== "safe" || !current.composition;
    if (shouldRecompose) {
      next.layout.nav = pickDifferent(compositionChoices.nav as HeaderLayout[], (item) => item === current.layout.nav);
      if (!locks.hero) next.layout.hero = pickDifferent(compositionChoices.hero as HeroLayout[], (item) => item === current.layout.hero);
      if (!locks.products) next.layout.productGrid = pickDifferent(compositionChoices.grid as ProductGridLayout[], (item) => item === current.layout.productGrid);
      next.layout.footer = pickDifferent(compositionChoices.footer as NonNullable<DesignGenome["layout"]["footer"]>[], (item) => item === current.layout.footer);
    }
    next.layout.sectionRhythm = compositionGenome.sectionRhythm === "cinematic" ? "editorial" : compositionGenome.sectionRhythm;
    next.layout.density = compositionGenome.merchandisingDensity === "sparse" ? "airy" : compositionGenome.merchandisingDensity === "balanced" ? "balanced" : "compact";
    next.archetype = artDirection.compatibleArchetypes[Math.abs(nextSeed) % artDirection.compatibleArchetypes.length] ?? next.archetype;
    next.artDirection = artDirection;
    next.composition = compositionGenome;
    next.productAnatomy = productAnatomy;
    next.pricingComposition = pricingComposition;
    next.interactionProfile = interactionProfile;
  }

  if ((all || scope === "typography") && !locks.typography) {
    next.typographyPair = typographyPair;
    next.typography = {
      ...next.typography,
      fontName: typographyPair.name,
      pairName: typographyPair.name,
      heading: typographyPair.headingFamily,
      body: typographyPair.bodyFamily,
      display: typographyPair.displayFamily,
      label: typographyPair.labelFamily,
      price: typographyPair.priceFamily,
      headingWeight: typographyPair.headingWeight,
      bodyWeight: typographyPair.bodyWeight,
      headingTracking: typographyPair.headingTracking,
      bodyTracking: typographyPair.bodyTracking,
      scale: typographyPair.displayScale >= 1.2 ? "large" : typographyPair.displayScale <= 1.06 ? "compact" : "balanced",
    };
  }

  if ((all || scope === "motion") && !locks.motion) {
    next.motionLanguage = motionLanguage;
    if (creativity !== "safe" || !current.motionLanguage) {
      const composedPreset = motionPresetForLanguage(motionLanguage, nextSeed);
      next.motion = {
        ...next.motion,
        preset: composedPreset,
        duration: interactionProfile.feedbackSpeed === "micro" ? Math.min(next.motion.duration, 0.34) : interactionProfile.feedbackSpeed === "editorial" ? Math.max(next.motion.duration, 0.52) : next.motion.duration,
        loop: motionLanguage.ambient !== "none" && !["dynamic", "snappy", "elasticRise", "gridPulse"].includes(composedPreset),
      };
    }
  }

  if (all || scope === "layout") {
    const shouldSwapStore = !(locks.hero && locks.products && locks.layout);
    if (shouldSwapStore) {
      const baseStore = nextStore(current, category, scope);
      const scopedShopTitle = normalizeShopTitle(shopTitle);
      if (scopedShopTitle) baseStore.brandName = scopedShopTitle;
      if (prompt.trim() && planner.content) {
        if (planner.content.heroKicker) baseStore.heroKicker = planner.content.heroKicker;
        if (planner.content.heroTitle) baseStore.heroTitle = planner.content.heroTitle;
        if (planner.content.heroBody) baseStore.heroBody = planner.content.heroBody;
        if (planner.content.cta) baseStore.cta = planner.content.cta;
        if (planner.content.announcement) baseStore.announcement = planner.content.announcement;
        if (planner.content.navItems?.length) baseStore.navItems = dedupeStrings(planner.content.navItems);
        if (planner.content.collectionTitles?.length) baseStore.collections = applyUniqueCollectionTitles(baseStore.collections, planner.content.collectionTitles);
        else baseStore.collections = applyUniqueCollectionTitles(baseStore.collections);
        if (planner.content.products?.length) {
          baseStore.products = baseStore.products.map((product, index) => {
            const planned = planner.content.products?.[index];
            return planned ? { ...product, name: planned.name, subtitle: planned.subtitle, price: planned.price ?? product.price, tag: planned.tag ?? product.tag, specs: planned.specs ?? product.specs } : product;
          });
        }
        baseStore.nicheLabel = planner.niche;
        if (planner.content.filters?.length) baseStore.filters = planner.content.filters;
      }

      next.store = refreshStoreImages(baseStore, nextSeed, {
        keepHero: locks.hero,
        keepProducts: locks.products,
        previous: current.store,
        searchContext: `${planner.content?.mediaQuery ?? planner.niche ?? prompt.slice(0, 80)} ${artDirection.mediaDirection}`.slice(0, 80),
      });
      if (prompt.trim() && planner.content) {
        if (planner.content.heroKicker) next.store.heroKicker = planner.content.heroKicker;
        if (planner.content.heroTitle) next.store.heroTitle = planner.content.heroTitle;
        if (planner.content.heroBody) next.store.heroBody = planner.content.heroBody;
        if (planner.content.cta) next.store.cta = planner.content.cta;
        if (planner.content.announcement) next.store.announcement = planner.content.announcement;
        if (planner.content.navItems?.length) next.store.navItems = dedupeStrings(planner.content.navItems);
        if (planner.content.filters?.length) next.store.filters = planner.content.filters;
        if (planner.niche) next.store.nicheLabel = planner.niche;
      }
      next.store.navItems = dedupeStrings(next.store.navItems);
      next.store.collections = applyUniqueCollectionTitles(next.store.collections, planner.content?.collectionTitles);
      next.sections = creativity === "safe" && current.composition
        ? structuredClone(current.sections)
        : buildSectionsFromComposition(compositionDefinition, creativity, nextSeed);

      const mediaPrompt = prompt.toLowerCase();
      if (promptSignals.video || /(gif|reel|cinematic clip|motion banner|animated banner)/.test(mediaPrompt)) {
        next.store.heroMediaMode = "video";
        next.store.heroVideoUrl = categoryVideoUrl(next.store.category, nextSeed);
        if (next.commerce) next.commerce.mediaBehavior = /(gif|autoplay|loop)/.test(mediaPrompt) ? "autoplayVideo" : "hoverVideo";
        if (!next.sections.some((section) => section.type === "videoStory")) {
          next.sections.splice(Math.min(3, next.sections.length), 0, { id: crypto.randomUUID(), type: "videoStory", eyebrow: "In motion", variant: "immersive" });
        }
      }
      if (/(static image|no video|image only|still photography)/.test(mediaPrompt)) {
        next.store.heroMediaMode = "image";
        next.store.heroVideoUrl = undefined;
        if (next.commerce) next.commerce.mediaBehavior = "hoverZoom";
      }
    }
  }

  // Novelty validation runs after store/composition generation. New Design must
  // differ across structural axes, while Try Variations keeps more recognizable DNA.
  if ((all || scope === "layout") && !locks.layout && creativity !== "safe") {
    const minNovelty = requiredNovelty(creativity);
    const axisDiff = majorAxisDifferenceCount(next, current);
    const currentNovelty = noveltyScore(next, current);
    const needsReroll = creativity === "experimental" ? axisDiff < 5 || currentNovelty < minNovelty : axisDiff < 3 || currentNovelty < minNovelty;
    if (needsReroll) {
      const rerollArt = selectArtDirection(category, prompt, nextSeed + 97, next.artDirection?.name);
      const rerollDef = selectCompositionFamily(rerollArt, category, prompt, nextSeed + 131, next.composition?.pageFamily);
      const rerollComposition = buildCompositionGenome(rerollDef, nextSeed + 149);
      const choices = layoutChoicesForComposition(rerollComposition.pageFamily);
      next.artDirection = rerollArt;
      next.composition = rerollComposition;
      next.layout.nav = pickDifferent(choices.nav as HeaderLayout[], (item) => item === current.layout.nav);
      if (!locks.hero) next.layout.hero = pickDifferent(choices.hero as HeroLayout[], (item) => item === current.layout.hero);
      if (!locks.products) next.layout.productGrid = pickDifferent(choices.grid as ProductGridLayout[], (item) => item === current.layout.productGrid);
      next.layout.footer = pickDifferent(choices.footer as NonNullable<DesignGenome["layout"]["footer"]>[], (item) => item === current.layout.footer);
      next.sections = buildSectionsFromComposition(rerollDef, creativity, nextSeed + 173);
      next.productAnatomy = selectProductAnatomy(category, rerollArt.name, prompt, nextSeed + 191);
      next.pricingComposition = selectPricingComposition(category, next.productAnatomy, rerollArt.name, prompt, nextSeed + 211);
      next.interactionProfile = selectInteractionProfile(category, rerollArt.name, next.productAnatomy, prompt, nextSeed + 229);
      if (!locks.typography) {
        const rerollPair = selectTypographyPair(category, rerollArt.name, nextSeed + 251, prompt, current.typographyPair?.name ?? current.typography.pairName);
        next.typographyPair = rerollPair;
        next.typography = { ...next.typography, fontName: rerollPair.name, pairName: rerollPair.name, heading: rerollPair.headingFamily, body: rerollPair.bodyFamily, display: rerollPair.displayFamily, label: rerollPair.labelFamily, price: rerollPair.priceFamily, headingWeight: rerollPair.headingWeight, bodyWeight: rerollPair.bodyWeight, headingTracking: rerollPair.headingTracking, bodyTracking: rerollPair.bodyTracking };
      }
      if (!locks.motion) {
        const rerollLanguage = selectMotionLanguage(category, rerollArt.name, next.interactionProfile?.density ?? "balanced", prompt);
        next.motionLanguage = rerollLanguage;
        next.motion = { ...next.motion, preset: motionPresetForLanguage(rerollLanguage, nextSeed + 271) };
      }
    }
  }

  // hard locks retained. Final lock pass protects explicit editor locks from planner, novelty and media changes.
  if (locks.palette) next.palette = structuredClone(current.palette);
  if (locks.typography) {
    next.typography = structuredClone(current.typography);
    next.typographyPair = current.typographyPair ? structuredClone(current.typographyPair) : undefined;
  }
  if (locks.surfaces) {
    next.surfaces = structuredClone(current.surfaces);
    next.geometry = structuredClone(current.geometry);
  }
  if (locks.motion) {
    next.motion = structuredClone(current.motion);
    next.motionLanguage = current.motionLanguage ? structuredClone(current.motionLanguage) : undefined;
  }
  if (locks.layout) {
    next.layout = structuredClone(current.layout);
    next.sections = structuredClone(current.sections);
    next.composition = current.composition ? structuredClone(current.composition) : undefined;
    next.artDirection = current.artDirection ? structuredClone(current.artDirection) : undefined;
    next.productAnatomy = current.productAnatomy;
    next.pricingComposition = current.pricingComposition;
    next.interactionProfile = current.interactionProfile ? structuredClone(current.interactionProfile) : undefined;
  }
  if (locks.hero) {
    next.store.heroKicker = current.store.heroKicker;
    next.store.heroTitle = current.store.heroTitle;
    next.store.heroBody = current.store.heroBody;
    next.store.cta = current.store.cta;
    next.store.heroImage = current.store.heroImage;
    next.store.heroMediaMode = current.store.heroMediaMode;
    next.store.heroVideoUrl = current.store.heroVideoUrl;
    next.store.secondaryImage = current.store.secondaryImage;
  }
  if (locks.products) {
    next.store.products = structuredClone(current.store.products);
    next.store.collections = structuredClone(current.store.collections);
    next.store.filters = structuredClone(current.store.filters);
  }

  if ((all || scope === "layout") && creativity === "experimental" && next.store.category === "food" && !locks.palette) {
    next.palette = { background: "#F2F0EE", surface: "#FFFFFF", elevated: "#FFFFFF", text: "#160B0C", muted: "#7D696C", primary: "#C70B23", primaryText: "#FFFFFF", accent: "#FFB85A", border: "rgba(22,11,12,.11)" };
  }

  const normalizedShopTitle = normalizeShopTitle(shopTitle);
  if (normalizedShopTitle) next.store.brandName = normalizedShopTitle;

  const promptName = prompt.trim() ? prompt.trim().split(/\s+/).slice(0, 3).join(" ") : next.store.brandName;
  next.id = crypto.randomUUID();
  next.seed = nextSeed;
  next.createdAt = new Date().toISOString();
  next.name = `${next.store.brandName} / ${next.artDirection?.name ?? palette.name}`;
  next.description = `${planner.summary || describeDesignDirection(next, prompt)} · ${next.artDirection?.name ?? "modern"} art direction · ${next.composition?.pageFamily ?? "balanced"} composition · ${next.layout.nav} header · ${next.layout.hero} hero · ${next.layout.productGrid} products · ${next.productAnatomy ?? "standard"} card anatomy · ${next.motionLanguage?.name ?? next.motion.preset} motion · ${promptName}`;
  return next;
}
