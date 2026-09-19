import type {
  ArtDirectionName,
  ArtDirectionSelection,
  CommerceArchetype,
  CompositionPageFamily,
  StoreCategory,
} from "@/types/design";

export type PromptIntentV2 = {
  categoryTerms: string[];
  nicheTerms: string[];
  hardAesthetics: string[];
  softAesthetics: string[];
  layoutIntent: string[];
  compositionIntent: string[];
  typographyIntent: string[];
  colorIntent: string[];
  motionIntent: string[];
  hoverIntent: string[];
  interactionDensity?: "minimal" | "restrained" | "balanced" | "expressive" | "kinetic";
  productDensity?: "sparse" | "balanced" | "dense" | "marketplace";
  merchandisingIntent: string[];
  conversionIntent: string[];
  mediaIntent: string[];
  audience: string[];
  pricePosition?: "value" | "mid" | "premium" | "luxury";
};

const archetypes = (...values: CommerceArchetype[]) => values;
const direction = (
  name: ArtDirectionName,
  family: CompositionPageFamily,
  mood: string,
  compatibleArchetypes: CommerceArchetype[],
  mediaDirection: string,
  keywords: string[],
  categories: StoreCategory[] = [],
) => ({ name, family, mood, compatibleArchetypes, mediaDirection, keywords, categories });

export const ART_DIRECTIONS = [
  direction("Quiet Luxury", "luxury", "restrained, tactile, premium", archetypes("luxury", "minimal", "editorial"), "soft directional product photography, natural materials, clean negative space", ["quiet luxury", "premium", "restrained", "timeless", "minimal luxury"]),
  direction("High Fashion Editorial", "editorial", "editorial, directional, image-led", archetypes("editorial", "magazine", "campaign"), "fashion campaign imagery, cropped compositions, editorial portraiture", ["high fashion", "editorial", "lookbook", "magazine"], ["fashion"]),
  direction("Brutalist Commerce", "experimental", "raw, graphic, high contrast", archetypes("catalog", "conversion", "streetwear"), "hard flash product photography, bold crops, utilitarian detail", ["brutalist", "raw", "hard contrast", "graphic"]),
  direction("Japanese Minimal", "japaneseMinimal", "quiet, precise, sparse", archetypes("minimal", "scandinavian", "editorial"), "calm interior/product imagery, material detail, gentle daylight", ["japanese", "wabi sabi", "quiet", "zen", "minimal furniture"]),
  direction("Scandinavian Retail", "minimal", "clean, soft, functional", archetypes("scandinavian", "minimal", "catalog"), "natural light, pale materials, practical lifestyle photography", ["scandinavian", "nordic", "soft minimal"]),
  direction("Contemporary Magazine", "magazine", "editorial, cultured, varied rhythm", archetypes("magazine", "editorial", "storytelling"), "mixed editorial imagery, large crops, image-led storytelling", ["magazine", "journal", "editorial story"]),
  direction("Technical Marketplace", "marketplace", "dense, clear, comparison-led", archetypes("tech-retail", "catalog", "conversion"), "front-view product imagery, clear detail shots, setup photography", ["marketplace", "technical", "compare", "many products"], ["tech"]),
  direction("Luxury Product Launch", "productLaunch", "dramatic, premium, focused", archetypes("luxury", "campaign", "dark-premium"), "hero product spotlight, premium macro detail, controlled dark studio", ["product launch", "launch", "premium launch"]),
  direction("Streetwear Drop", "streetwearDrop", "kinetic, graphic, youthful", archetypes("streetwear", "campaign", "dark-premium"), "model imagery, alternate angles, street campaign frames", ["streetwear", "drop", "anime streetwear", "hype"]),
  direction("Y2K Commerce", "experimental", "playful, glossy, nostalgic", archetypes("playful", "streetwear", "campaign"), "flash photography, bold product crops, playful reflective surfaces", ["y2k", "2000s", "cyber", "retro futurist"]),
  direction("Organic Wellness", "organicWellness", "soft, natural, trustworthy", archetypes("minimal", "storytelling", "beauty"), "natural textures, ingredients, soft daylight lifestyle", ["organic", "wellness", "natural", "clean beauty"]),
  direction("Clinical Beauty", "beautyClinical", "clean, credible, ingredient-led", archetypes("beauty", "minimal", "conversion"), "clinical packaging, ingredient macro, clean studio photography", ["clinical", "dermatology", "skincare", "science beauty"], ["beauty"]),
  direction("Playful Kids", "socialCommerce", "bright, friendly, energetic", archetypes("playful", "conversion", "campaign"), "playful lifestyle imagery, safe product detail, bright backgrounds", ["kids", "playful", "toy", "children"]),
  direction("Premium Furniture", "furnitureEditorial", "spacious, tactile, interior-led", archetypes("editorial", "luxury", "scandinavian"), "room scenes, material close-ups, furniture in context", ["furniture", "sofa", "bed", "interior", "home editorial"], ["home"]),
  direction("Sports Performance", "sportsPerformance", "energetic, technical, benefit-led", archetypes("sport", "conversion", "campaign"), "athlete action imagery, material detail, technical product views", ["sports", "performance", "running", "training"], ["shoes", "outdoor"]),
  direction("Gaming Hardware", "gamingLaunch", "dark, precise, high performance", archetypes("tech-retail", "dark-premium", "campaign"), "gaming setup, RGB detail, hardware macro, dark studio product photography", ["gaming", "gaming laptop", "hardware", "rgb"], ["tech"]),
  direction("Modern Grocery", "modernGrocery", "clean, useful, abundant", archetypes("conversion", "catalog", "playful"), "fresh product photography, pantry organization, clean food styling", ["grocery", "market", "produce", "food marketplace"], ["food"]),
  direction("Artisan Food", "artisanFood", "crafted, warm, sensory", archetypes("storytelling", "editorial", "conversion"), "handmade food detail, warm kitchen scenes, ingredient storytelling", ["artisan", "coffee", "bakery", "seafood", "craft food"], ["food"]),
  direction("Luxury Jewelry", "luxury", "precious, restrained, detailed", archetypes("luxury", "editorial", "minimal"), "jewelry macro, soft reflection, premium studio close-up", ["jewelry", "gold", "diamond", "fine jewelry"], ["accessories"]),
  direction("Creator Brand", "creatorBrand", "personal, expressive, social", archetypes("campaign", "storytelling", "conversion"), "creator lifestyle, behind-the-scenes, social-first product content", ["creator", "influencer", "personal brand"]),
  direction("Dark Cinematic", "darkCinematic", "dramatic, immersive, atmospheric", archetypes("dark-premium", "campaign", "luxury"), "low-key lighting, spotlight product imagery, cinematic crops", ["dark", "cinematic", "moody", "black"]),
  direction("Colorful Maximalist", "experimental", "bold, colorful, energetic", archetypes("playful", "campaign", "streetwear"), "high-color product imagery, collage, graphic backgrounds", ["maximalist", "colorful", "bold", "vibrant"]),
  direction("Neo Minimal", "neoMinimal", "minimal, modern, precise", archetypes("minimal", "catalog", "conversion"), "clean studio, subtle shadow, balanced product crops", ["neo minimal", "modern minimal", "clean modern"]),
  direction("Gallery Commerce", "gallery", "visual, spacious, art-directed", archetypes("editorial", "luxury", "magazine"), "gallery-style imagery, large editorial crops, visual sequencing", ["gallery", "image led", "photographic"]),
  direction("Catalog Retail", "catalog", "clear, systematic, product-led", archetypes("catalog", "conversion", "tech-retail"), "consistent product angles, high clarity, category imagery", ["catalog", "retail", "product grid", "dense products"]),
  direction("Conversion Heavy", "conversion", "direct, clear, trust-first", archetypes("conversion", "catalog", "tech-retail"), "product proof, benefit imagery, trust cues", ["conversion", "sales", "trust", "high converting"]),
  direction("Boutique Editorial", "boutiqueEditorial", "curated, warm, intimate", archetypes("editorial", "luxury", "storytelling"), "boutique lifestyle imagery, crafted details, selective products", ["boutique", "curated", "editorial boutique"]),
  direction("Experimental Typography", "experimental", "type-led, graphic, unconventional", archetypes("campaign", "streetwear", "magazine"), "bold type compositions, graphic media crops, poster imagery", ["experimental typography", "huge typography", "type led"]),
  direction("Monochrome Luxury", "luxury", "monochrome, severe, premium", archetypes("luxury", "dark-premium", "minimal"), "monochrome product photography, sharp shadow, premium close-up", ["monochrome", "black and white", "monochrome luxury"]),
  direction("Soft Pastel Commerce", "minimal", "soft, pastel, approachable", archetypes("beauty", "playful", "minimal"), "soft pastel product imagery, diffused daylight, gentle lifestyle", ["pastel", "soft", "gentle"]),
  direction("Heritage Watchmaker", "luxuryWatch", "heritage, mechanical, precise", archetypes("luxury", "editorial", "storytelling"), "watch macro, movement detail, leather and steel, heritage workshop", ["heritage watch", "watchmaker", "chronograph", "swiss watch"], ["accessories"]),
  direction("Technical Luxury", "technical", "premium, precise, specification-led", archetypes("luxury", "tech-retail", "minimal"), "premium studio product imagery with technical detail views", ["technical luxury", "premium specs", "luxury tech"]),
  direction("Modern Gallery", "gallery", "minimal, photographic, modern", archetypes("minimal", "editorial", "magazine"), "clean gallery photography, full-bleed imagery, varied crops", ["modern gallery", "gallery store"]),
  direction("Premium Hardware", "technical", "premium, industrial, controlled", archetypes("tech-retail", "dark-premium", "conversion"), "hardware studio imagery, detail macro, technical lifestyle", ["premium hardware", "laptop", "computer", "electronics"], ["tech"]),
  direction("Editorial Fragrance", "editorial", "sensory, luxurious, poetic", archetypes("beauty", "luxury", "editorial"), "perfume bottle studio, ingredients, atmospheric editorial imagery", ["perfume", "fragrance", "scent"], ["beauty"]),
] as const;

const normalize = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
const hitScore = (prompt: string, keywords: readonly string[]) => keywords.reduce((score, keyword) => prompt.includes(keyword) ? score + (keyword.includes(" ") ? 6 : 3) : score, 0);

export function parsePromptIntentV2(prompt: string): PromptIntentV2 {
  const p = normalize(prompt);
  const hardAesthetics = ["minimal", "japanese", "luxury", "dark", "streetwear", "clinical", "brutalist", "scandinavian", "editorial", "gaming", "organic", "maximalist"].filter((item) => p.includes(item));
  const softAesthetics = ["premium", "modern", "soft", "warm", "bold", "playful", "cinematic", "quiet", "heritage", "technical", "colorful"].filter((item) => p.includes(item));
  const density = /kinetic|high movement/.test(p) ? "kinetic" : /interactive|expressive/.test(p) ? "expressive" : /restrained|quiet/.test(p) ? "restrained" : /minimal motion|no animation/.test(p) ? "minimal" : undefined;
  const productDensity = /marketplace|many products|dense products/.test(p) ? "marketplace" : /dense|catalog heavy/.test(p) ? "dense" : /sparse|minimal products/.test(p) ? "sparse" : undefined;
  const pricePosition = /luxury|high end|exclusive/.test(p) ? "luxury" : /premium/.test(p) ? "premium" : /budget|value|affordable/.test(p) ? "value" : undefined;
  return {
    categoryTerms: p.split(" ").filter((word) => ["fashion", "shoes", "beauty", "food", "home", "tech", "kids", "outdoor", "accessories"].includes(word)),
    nicheTerms: p.split(" ").filter((word) => /watch|phone|gaming|sofa|bed|jewelry|seafood|coffee|perfume|skincare|laptop|streetwear/.test(word)),
    hardAesthetics,
    softAesthetics,
    layoutIntent: ["asymmetric", "split", "masonry", "rail", "catalog", "gallery", "comparison", "product first"].filter((item) => p.includes(item)),
    compositionIntent: ["campaign", "editorial", "marketplace", "magazine", "story", "launch", "gallery", "product first"].filter((item) => p.includes(item)),
    typographyIntent: ["huge typography", "serif", "sans serif", "condensed", "editorial type", "minimal type"].filter((item) => p.includes(item)),
    colorIntent: ["dark", "monochrome", "pastel", "bright", "colorful", "neutral", "warm", "cool"].filter((item) => p.includes(item)),
    motionIntent: ["moving text", "marquee", "kinetic", "cinematic", "parallax", "subtle motion", "no animation"].filter((item) => p.includes(item)),
    hoverIntent: ["interactive products", "alternate image", "image zoom", "quick add", "tilt", "subtle hover"].filter((item) => p.includes(item)),
    interactionDensity: density,
    productDensity,
    merchandisingIntent: ["many products", "featured product", "bundles", "compare", "shop the look", "drop"].filter((item) => p.includes(item)),
    conversionIntent: ["conversion", "trust", "reviews", "faq", "shipping", "quick add"].filter((item) => p.includes(item)),
    mediaIntent: ["campaign", "product photography", "lifestyle", "studio", "ugc", "video", "cinematic"].filter((item) => p.includes(item)),
    audience: ["men", "women", "kids", "families", "gamers", "creators", "athletes"].filter((item) => p.includes(item)),
    pricePosition,
  };
}

export function selectArtDirection(category: StoreCategory, prompt: string, seed: number, currentName?: ArtDirectionName): ArtDirectionSelection {
  const p = normalize(prompt);
  const intent = parsePromptIntentV2(prompt);
  const scored = ART_DIRECTIONS.map((item) => {
    let score = hitScore(p, item.keywords);
    if (item.categories.includes(category)) score += 4;
    if (intent.pricePosition === "luxury" && /Luxury|Heritage|Boutique/.test(item.name)) score += 5;
    if (intent.hardAesthetics.some((hard) => item.mood.includes(hard) || item.keywords.some((keyword) => keyword.includes(hard)))) score += 8;
    if (item.name === currentName) score -= 3;
    return { item, score };
  }).sort((a, b) => b.score - a.score);
  const strong = scored.filter((item) => item.score >= Math.max(5, scored[0]?.score - 5));
  const pool = strong.length ? strong : scored.filter((item) => item.item.categories.length === 0 || item.item.categories.includes(category));
  const chosen = pool[Math.abs(seed) % Math.max(1, pool.length)]?.item ?? ART_DIRECTIONS[0];
  return { name: chosen.name, family: chosen.family, mood: chosen.mood, compatibleArchetypes: [...chosen.compatibleArchetypes], mediaDirection: chosen.mediaDirection };
}

export type SmartDirectionSuggestion = {
  label: string;
  meta: string;
  score: number;
};

const DIRECTION_SUGGESTION_SETS: readonly { test: RegExp; labels: readonly string[] }[] = [
  { test: /anime.*streetwear|streetwear.*anime/i, labels: ["Dark Anime Streetwear", "Kinetic Anime Drop", "Editorial Anime Fashion", "Japanese Streetwear Campaign", "Minimal Anime Apparel", "High-Contrast Anime Collection"] },
  { test: /gaming.*laptop|laptop.*gaming/i, labels: ["Premium Gaming Hardware", "Dark Technical Gaming", "RGB Gaming Launch", "Minimal Performance Hardware", "Gaming Marketplace", "Futuristic Gaming Editorial"] },
  { test: /luxury.*watch|watch.*luxury|chronograph/i, labels: ["Swiss Minimal Watch", "Dark Chronograph Luxury", "Editorial Watch House", "Heritage Watchmaker", "Modern Timepiece Gallery", "Technical Luxury Watch"] },
  { test: /japanese.*furniture|furniture.*japanese/i, labels: ["Japanese Minimal Furniture", "Wabi-Sabi Interior Retail", "Quiet Material Furniture", "Japanese Furniture Editorial", "Gallery Furniture House", "Soft Minimal Home"] },
  { test: /skincare|skin care/i, labels: ["Clinical Skincare Lab", "Organic Wellness Skincare", "Soft Editorial Beauty", "Ingredient-First Skincare", "Minimal Dermatology Commerce", "Premium Skincare Campaign"] },
  { test: /perfume|fragrance/i, labels: ["Editorial Fragrance House", "Dark Perfume Campaign", "Quiet Luxury Fragrance", "Sensory Perfume Gallery", "Modern Scent Boutique", "Minimal Fragrance Launch"] },
  { test: /smartphone|mobile phone|iphone|android/i, labels: ["Premium Mobile Launch", "Technical Smartphone Retail", "Minimal Phone Gallery", "Dark Mobile Hardware", "Smartphone Comparison Store", "Editorial Device Campaign"] },
  { test: /sofa|couch|furniture/i, labels: ["Premium Furniture Editorial", "Scandinavian Living Room", "Modern Sofa Gallery", "Quiet Interior Retail", "Material-Led Furniture", "Furniture Collection House"] },
  { test: /seafood|fresh fish|salmon|shellfish/i, labels: ["Premium Seafood Market", "Editorial Fresh Fish", "Modern Seafood Grocery", "Chef-Led Seafood", "Coastal Seafood Commerce", "Fresh Market Collection"] },
];

export function smartDirectionSuggestionsV2(prompt: string, category?: StoreCategory): SmartDirectionSuggestion[] {
  const p = normalize(prompt);
  if (!p) return [];
  const exact = DIRECTION_SUGGESTION_SETS.find((set) => set.test.test(prompt));
  const curated = exact?.labels.map((label, index) => ({ label, meta: "Curated direction", score: 260 - index * 4 })) ?? [];
  const scored = ART_DIRECTIONS.map((item) => {
    let score = hitScore(p, item.keywords) * 12;
    if (category && item.categories.includes(category)) score += 36;
    if (item.name.toLowerCase().split(" ").some((word) => word.length > 3 && p.includes(word))) score += 28;
    return { label: item.name, meta: `${item.family} art direction`, score };
  }).filter((item) => item.score > 0);
  const seen = new Set<string>();
  return [...curated, ...scored]
    .sort((a, b) => b.score - a.score || a.label.localeCompare(b.label))
    .filter((item) => {
      const key = item.label.toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .slice(0, 10);
}
