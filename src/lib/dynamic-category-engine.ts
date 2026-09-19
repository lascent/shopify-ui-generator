import { SHOPIFY_CATEGORY_GROUPS } from "@/lib/category-taxonomy";
import type { LayoutBias, PlannerContent } from "@/lib/design-planner";
import type { StoreCategory } from "@/types/design";

export type DynamicCategoryProfile = {
  id: string;
  label: string;
  category: StoreCategory;
  aliases: string[];
  layoutBias: LayoutBias;
  content: PlannerContent;
  filters: { label: string; options: string[] }[];
};

type DomainPreset = {
  test: RegExp;
  nav: string[];
  collections: string[];
  productNouns: string[];
  filters: { label: string; options: string[] }[];
  specKeys: string[];
  priceBase: number;
  mediaQuery: (label: string) => string;
  layoutBias: LayoutBias;
};

const DOMAIN_PRESETS: DomainPreset[] = [
  {
    test: /(car|vehicle|automotive|motorcycle|scooter|bike|bicycle|e-bike|atv|overland)/i,
    nav: ["Inventory", "New arrivals", "Compare", "Financing", "Service"],
    collections: ["Featured", "Performance", "Everyday", "Premium"],
    productNouns: ["Touring", "Sport", "Urban", "Adventure"],
    filters: [
      { label: "Brand", options: ["Apex", "Nova", "Terra", "Metro"] },
      { label: "Type", options: ["New", "Popular", "Performance", "Premium"] },
      { label: "Price", options: ["Under $30k", "$30k–$50k", "$50k–$80k", "$80k+"] },
    ],
    specKeys: ["Model year", "Power", "Range", "Transmission"],
    priceBase: 28900,
    mediaQuery: (label) => `premium ${label.toLowerCase()} product showroom editorial`,
    layoutBias: { navOptions: ["searchFirst", "megaMenu", "categoryBar"], heroOptions: ["product", "showcase", "collectionHero"], gridOptions: ["comparison", "specGrid", "featuredPlusRail"], footerOptions: ["supportHeavy", "columns"], density: "compact", archetype: "catalog", priceStyle: "installment", cardStyle: "retail", mediaBehavior: "gallery" },
  },
  {
    test: /(phone|phones|smartphone|smartphones|iphone|iphones|ios|android|samsung|galaxy phone|pixel phone|mobile phone|cell phone|cellphone|foldable phone|flip phone|refurbished phone)/i,
    nav: ["Phones", "Android", "iOS", "Compare", "Accessories"],
    collections: ["Flagship phones", "Android picks", "iOS picks", "Phone accessories"],
    productNouns: ["Ultra", "Pro", "Plus", "Fold"],
    filters: [
      { label: "OS", options: ["Android", "iOS", "Foldable", "Refurbished"] },
      { label: "Storage", options: ["128GB", "256GB", "512GB", "1TB"] },
      { label: "Price", options: ["Under $400", "$400–$700", "$700–$1,000", "$1,000+"] },
    ],
    specKeys: ["Display", "Storage", "Camera", "Battery"],
    priceBase: 699,
    mediaQuery: (label) => `premium ${label.toLowerCase()} smartphone product photography ios android`,
    layoutBias: { navOptions: ["searchFirst", "categoryBar", "utility"], heroOptions: ["product", "launch", "showcase"], gridOptions: ["specGrid", "comparison", "denseRetail"], footerOptions: ["supportHeavy", "legalHeavy"], density: "compact", archetype: "tech-retail", priceStyle: "techSpec", cardStyle: "retail", mediaBehavior: "gallery" },
  },
  {
    test: /(watch|watches|timepiece|timepieces|chronograph|automatic watch|smart watch|smartwatch)/i,
    nav: ["Watches", "New arrivals", "Collections", "Gift guide", "Journal"],
    collections: ["Dress watches", "Sport watches", "Automatic", "Limited editions"],
    productNouns: ["Classic", "Chrono", "Signature", "Heritage"],
    filters: [
      { label: "Movement", options: ["Quartz", "Automatic", "Chronograph", "Smart"] },
      { label: "Strap", options: ["Steel", "Leather", "Rubber", "Titanium"] },
      { label: "Price", options: ["Under $250", "$250–$800", "$800–$2,000", "$2,000+"] },
    ],
    specKeys: ["Movement", "Case size", "Strap", "Water resistance"],
    priceBase: 320,
    mediaQuery: (label) => `luxury ${label.toLowerCase()} watch product photography`,
    layoutBias: { navOptions: ["centered", "logoRail", "editorial"], heroOptions: ["cinematicProduct", "fullBleedEditorial", "magazine"], gridOptions: ["spotlight", "luxurySparse", "editorialRail"], footerOptions: ["oversizedBrand", "editorial"], density: "airy", rhythm: "editorial", archetype: "luxury", priceStyle: "luxuryInline", cardStyle: "imageFirst", mediaBehavior: "gallery" },
  },
  {
    test: /(eyewear|glasses|eyeglasses|sunglasses|optical frames|reading glasses|frames)/i,
    nav: ["Eyewear", "Optical", "Sunglasses", "New arrivals", "Fit guide"],
    collections: ["Optical frames", "Sunglasses", "Lightweight", "Statement styles"],
    productNouns: ["Optic", "Frame", "Studio", "Vision"],
    filters: [
      { label: "Type", options: ["Optical", "Sunglasses", "Blue light", "Reading"] },
      { label: "Frame", options: ["Acetate", "Metal", "Round", "Square"] },
      { label: "Price", options: ["Under $100", "$100–$200", "$200–$350", "$350+"] },
    ],
    specKeys: ["Frame", "Lens", "Fit", "Care"],
    priceBase: 145,
    mediaQuery: (label) => `premium ${label.toLowerCase()} eyewear editorial product`,
    layoutBias: { navOptions: ["centered", "editorial", "minimal"], heroOptions: ["fullBleedEditorial", "splitMedia", "magazine"], gridOptions: ["spotlight", "editorialRail", "luxurySparse"], footerOptions: ["oversizedBrand", "editorial"], density: "airy", rhythm: "editorial", archetype: "luxury", priceStyle: "luxuryInline", cardStyle: "imageFirst", mediaBehavior: "gallery" },
  },
  {
    test: /(phone|smartphone|tablet|laptop|computer|pc|monitor|tv|television|camera|audio|headphone|speaker|keyboard|gaming|smart ring|wearable|drone|router|network|nas|storage|electronic)/i,
    nav: ["Shop", "New releases", "Compare", "Accessories", "Support"],
    collections: ["Flagship", "Best value", "Creator picks", "Accessories"],
    productNouns: ["Pro", "Air", "Core", "Studio"],
    filters: [
      { label: "Brand", options: ["Nova", "Apex", "Pixel", "Studio"] },
      { label: "Performance", options: ["Essential", "Advanced", "Pro", "Ultra"] },
      { label: "Price", options: ["Under $300", "$300–$700", "$700–$1,200", "$1,200+"] },
    ],
    specKeys: ["Display", "Processor", "Memory", "Warranty"],
    priceBase: 399,
    mediaQuery: (label) => `premium ${label.toLowerCase()} technology product studio`,
    layoutBias: { navOptions: ["searchFirst", "categoryBar", "utility"], heroOptions: ["product", "launch", "showcase"], gridOptions: ["specGrid", "comparison", "denseRetail"], footerOptions: ["supportHeavy", "legalHeavy"], density: "compact", archetype: "tech-retail", priceStyle: "techSpec", cardStyle: "retail", mediaBehavior: "gallery" },
  },
  {
    test: /(watch|jewelry|jewellery|eyewear|glasses|sunglasses|handbag|wallet|leather|accessor)/i,
    nav: ["New", "Collections", "Best sellers", "Gifts", "Journal"],
    collections: ["New arrivals", "Signature", "Everyday", "Limited"],
    productNouns: ["Classic", "Studio", "Signature", "Noir"],
    filters: [
      { label: "Collection", options: ["Signature", "Classic", "Sport", "Limited"] },
      { label: "Material", options: ["Steel", "Leather", "Acetate", "Premium"] },
      { label: "Price", options: ["Under $200", "$200–$500", "$500–$1,000", "$1,000+"] },
    ],
    specKeys: ["Material", "Finish", "Dimensions", "Care"],
    priceBase: 180,
    mediaQuery: (label) => `luxury ${label.toLowerCase()} editorial product photography`,
    layoutBias: { navOptions: ["centered", "logoRail", "editorial"], heroOptions: ["fullBleedEditorial", "cinematicProduct", "magazine"], gridOptions: ["luxurySparse", "spotlight", "editorialRail"], footerOptions: ["oversizedBrand", "editorial"], density: "airy", rhythm: "editorial", archetype: "luxury", priceStyle: "luxuryInline", cardStyle: "imageFirst", mediaBehavior: "gallery" },
  },
  {
    test: /(sofa|sofas|couch|couches|sectional|loveseat|living room furniture)/i,
    nav: ["Sofas", "Living room", "New pieces", "Materials", "Design guide"],
    collections: ["Sectionals", "Loveseats", "Modular", "Small spaces"],
    productNouns: ["Lounge", "Forma", "Studio", "Nest"],
    filters: [
      { label: "Type", options: ["2-seater", "3-seater", "Sectional", "Modular"] },
      { label: "Material", options: ["Fabric", "Leather", "Performance", "Bouclé"] },
      { label: "Price", options: ["Under $700", "$700–$1,200", "$1,200–$2,500", "$2,500+"] },
    ],
    specKeys: ["Dimensions", "Material", "Seating", "Delivery"],
    priceBase: 899,
    mediaQuery: (label) => `modern ${label.toLowerCase()} sofa furniture editorial interior`,
    layoutBias: { navOptions: ["centered", "logoRail", "minimal"], heroOptions: ["splitMedia", "fullBleedEditorial", "imageCollage"], gridOptions: ["featureSplit", "magazineGrid", "luxurySparse"], footerOptions: ["imageSplit", "oversizedBrand"], density: "airy", rhythm: "editorial", archetype: "editorial", priceStyle: "luxuryInline", cardStyle: "imageFirst", mediaBehavior: "gallery" },
  },
  {
    test: /(bed|beds|mattress|mattresses|bed frame|bedroom furniture|bedding)/i,
    nav: ["Beds", "Mattresses", "Bedroom", "Comfort guide", "Bundles"],
    collections: ["Platform beds", "Upholstered", "Mattresses", "Bedroom sets"],
    productNouns: ["Dream", "Cloud", "Rest", "Calm"],
    filters: [
      { label: "Size", options: ["Twin", "Full", "Queen", "King"] },
      { label: "Comfort", options: ["Soft", "Medium", "Firm", "Hybrid"] },
      { label: "Price", options: ["Under $500", "$500–$1,000", "$1,000–$2,000", "$2,000+"] },
    ],
    specKeys: ["Size", "Comfort", "Material", "Delivery"],
    priceBase: 699,
    mediaQuery: (label) => `modern ${label.toLowerCase()} bed mattress bedroom interior`,
    layoutBias: { navOptions: ["centered", "logoRail", "minimal"], heroOptions: ["splitMedia", "fullBleedEditorial", "imageCollage"], gridOptions: ["featureSplit", "magazineGrid", "luxurySparse"], footerOptions: ["imageSplit", "oversizedBrand"], density: "airy", rhythm: "editorial", archetype: "editorial", priceStyle: "luxuryInline", cardStyle: "imageFirst", mediaBehavior: "gallery" },
  },
  {
    test: /(sofa|couch|bed|mattress|furniture|table|chair|desk|storage|lighting|lamp|rug|decor|bedding|home)/i,
    nav: ["Shop", "Rooms", "New pieces", "Materials", "Design guide"],
    collections: ["Living", "Bedroom", "Dining", "Small spaces"],
    productNouns: ["Studio", "Form", "Lounge", "Arc"],
    filters: [
      { label: "Room", options: ["Living", "Bedroom", "Dining", "Office"] },
      { label: "Material", options: ["Fabric", "Wood", "Metal", "Mixed"] },
      { label: "Size", options: ["Compact", "Medium", "Large", "Modular"] },
    ],
    specKeys: ["Dimensions", "Material", "Assembly", "Delivery"],
    priceBase: 549,
    mediaQuery: (label) => `modern ${label.toLowerCase()} interior furniture editorial`,
    layoutBias: { navOptions: ["centered", "logoRail", "minimal"], heroOptions: ["splitMedia", "fullBleedEditorial", "imageCollage"], gridOptions: ["magazineGrid", "featureSplit", "luxurySparse"], footerOptions: ["imageSplit", "oversizedBrand"], density: "airy", rhythm: "editorial", archetype: "editorial", priceStyle: "luxuryInline", cardStyle: "imageFirst", mediaBehavior: "gallery" },
  },
  {
    test: /(kitchen appliance|kitchen appliances|air fryer|microwave|coffee machine|coffee maker|blender|rice cooker|refrigerator|fridge|oven|toaster|stand mixer)/i,
    nav: ["Kitchen appliances", "Best sellers", "Compare", "Deals", "Support"],
    collections: ["Countertop", "Coffee", "Cooking", "Smart kitchen"],
    productNouns: ["Pro", "Smart", "Chef", "Compact"],
    filters: [
      { label: "Type", options: ["Countertop", "Built-in", "Coffee", "Cooking"] },
      { label: "Capacity", options: ["Small", "Medium", "Large", "Family"] },
      { label: "Price", options: ["Under $150", "$150–$400", "$400–$900", "$900+"] },
    ],
    specKeys: ["Capacity", "Power", "Programs", "Warranty"],
    priceBase: 229,
    mediaQuery: (label) => `modern ${label.toLowerCase()} kitchen appliance product photography`,
    layoutBias: { navOptions: ["searchFirst", "categoryBar", "stacked"], heroOptions: ["product", "showcase", "bento"], gridOptions: ["comparison", "specGrid", "denseRetail"], footerOptions: ["supportHeavy", "columns"], density: "compact", archetype: "tech-retail", priceStyle: "installment", cardStyle: "retail", mediaBehavior: "gallery" },
  },
  {
    test: /(seafood|fish|salmon|shrimp|prawn|oyster|lobster|crab|shellfish)/i,
    nav: ["Seafood", "Fresh picks", "Chef specials", "Bundles", "Delivery"],
    collections: ["Fresh today", "Shellfish", "Chef picks", "Bundles"],
    productNouns: ["Market", "Fresh", "Select", "Chef"],
    filters: [
      { label: "Type", options: ["Fish", "Shellfish", "Ready to cook", "Bundles"] },
      { label: "Origin", options: ["Local", "Imported", "Sashimi grade", "Seasonal"] },
      { label: "Price", options: ["Under $20", "$20–$40", "$40–$80", "$80+"] },
    ],
    specKeys: ["Origin", "Weight", "Storage", "Delivery"],
    priceBase: 22,
    mediaQuery: (label) => `premium ${label.toLowerCase()} seafood market food photography`,
    layoutBias: { navOptions: ["categoryBar", "centered", "promoHeavy"], heroOptions: ["showcase", "bento", "split"], gridOptions: ["cards", "bundleGrid", "categoryTabs"], footerOptions: ["newsletterHero", "columns"], density: "balanced", archetype: "conversion", priceStyle: "bundle", cardStyle: "softCard", mediaBehavior: "hoverZoom" },
  },
  {
    test: /(appliance|refrigerator|fridge|oven|microwave|air fryer|blender|rice cooker|coffee machine|washer|dryer|air conditioner|vacuum|cookware|kitchen)/i,
    nav: ["Appliances", "Compare", "Deals", "Buying guides", "Support"],
    collections: ["Best sellers", "Smart appliances", "Everyday essentials", "Premium"],
    productNouns: ["Pro", "Max", "Smart", "Compact"],
    filters: [
      { label: "Type", options: ["Countertop", "Built-in", "Smart", "Compact"] },
      { label: "Capacity", options: ["Small", "Medium", "Large", "Family"] },
      { label: "Price", options: ["Under $150", "$150–$500", "$500–$1,000", "$1,000+"] },
    ],
    specKeys: ["Capacity", "Power", "Dimensions", "Warranty"],
    priceBase: 199,
    mediaQuery: (label) => `modern ${label.toLowerCase()} appliance product kitchen`,
    layoutBias: { navOptions: ["searchFirst", "categoryBar", "stacked"], heroOptions: ["showcase", "product", "bento"], gridOptions: ["comparison", "specGrid", "denseRetail"], footerOptions: ["supportHeavy", "columns"], density: "compact", archetype: "tech-retail", priceStyle: "installment", cardStyle: "retail", mediaBehavior: "gallery" },
  },
  {
    test: /(seafood|fish|shrimp|prawn|meat|butcher|beef|chicken|grocery|produce|fruit|vegetable|bakery|coffee|tea|matcha|snack|food|dessert|ice cream|sauce|beverage)/i,
    nav: ["Shop", "Fresh picks", "Bundles", "Best sellers", "Delivery"],
    collections: ["Fresh picks", "Best sellers", "Bundles", "Seasonal"],
    productNouns: ["Market", "Select", "Daily", "Chef"],
    filters: [
      { label: "Type", options: ["Fresh", "Prepared", "Bundle", "Specialty"] },
      { label: "Delivery", options: ["Today", "Next day", "This week", "Pickup"] },
      { label: "Price", options: ["Under $15", "$15–$30", "$30–$60", "$60+"] },
    ],
    specKeys: ["Origin", "Weight", "Storage", "Delivery"],
    priceBase: 14,
    mediaQuery: (label) => `premium ${label.toLowerCase()} fresh market food photography`,
    layoutBias: { navOptions: ["categoryBar", "centered", "promoHeavy"], heroOptions: ["bento", "showcase", "split"], gridOptions: ["cards", "bundleGrid", "categoryTabs"], footerOptions: ["newsletterHero", "columns"], density: "balanced", archetype: "conversion", priceStyle: "bundle", cardStyle: "softCard", mediaBehavior: "hoverZoom" },
  },
  {
    test: /(skincare|beauty|cosmetic|makeup|perfume|fragrance|hair|groom|wellness|spa|nail)/i,
    nav: ["New", "Shop", "Routine", "Ingredients", "Sets"],
    collections: ["Daily routine", "Best sellers", "Treatment", "Sets"],
    productNouns: ["Daily", "Balance", "Studio", "Restore"],
    filters: [
      { label: "Concern", options: ["Hydration", "Brightening", "Repair", "Sensitive"] },
      { label: "Type", options: ["Cleanse", "Treat", "Moisturize", "Protect"] },
      { label: "Price", options: ["Under $30", "$30–$60", "$60–$100", "$100+"] },
    ],
    specKeys: ["Key ingredients", "Skin type", "How to use", "Size"],
    priceBase: 28,
    mediaQuery: (label) => `premium ${label.toLowerCase()} beauty editorial product`,
    layoutBias: { navOptions: ["centered", "editorial", "minimal"], heroOptions: ["beautyEditorial", "minimalCommerce", "splitMedia"], gridOptions: ["luxurySparse", "cards", "bundleGrid"], footerOptions: ["newsletterHero", "editorial"], density: "airy", archetype: "beauty", priceStyle: "subscription", cardStyle: "borderless", mediaBehavior: "gallery" },
  },
  {
    test: /(fashion|clothing|apparel|streetwear|dress|denim|activewear|swimwear|lingerie|outerwear|athleisure|shoe|sneaker|footwear)/i,
    nav: ["New", "Shop", "Collections", "Best sellers", "Journal"],
    collections: ["New arrivals", "Essentials", "Statement pieces", "Seasonal"],
    productNouns: ["Studio", "Essential", "Form", "Archive"],
    filters: [
      { label: "Size", options: ["XS", "S", "M", "L", "XL"] },
      { label: "Color", options: ["Black", "Neutral", "Blue", "Seasonal"] },
      { label: "Price", options: ["Under $50", "$50–$100", "$100–$200", "$200+"] },
    ],
    specKeys: ["Material", "Fit", "Care", "Origin"],
    priceBase: 69,
    mediaQuery: (label) => `premium ${label.toLowerCase()} fashion editorial campaign`,
    layoutBias: { navOptions: ["editorial", "centered", "transparent"], heroOptions: ["fullBleedEditorial", "campaign", "magazine"], gridOptions: ["editorialRail", "shopTheLook", "magazineGrid"], footerOptions: ["oversizedBrand", "editorial"], density: "airy", rhythm: "editorial", archetype: "editorial", priceStyle: "luxuryInline", cardStyle: "editorial", mediaBehavior: "hoverSwap" },
  },
  {
    test: /.*/,
    nav: ["Shop", "New", "Best sellers", "Collections", "About"],
    collections: ["New arrivals", "Best sellers", "Essentials", "Featured"],
    productNouns: ["Essential", "Studio", "Core", "Select"],
    filters: [
      { label: "Category", options: ["Featured", "New", "Popular", "Premium"] },
      { label: "Price", options: ["Value", "Mid-range", "Premium"] },
    ],
    specKeys: ["Details", "Materials", "Dimensions", "Warranty"],
    priceBase: 49,
    mediaQuery: (label) => `premium ${label.toLowerCase()} ecommerce product editorial`,
    layoutBias: { navOptions: ["minimal", "centered", "floating"], heroOptions: ["showcase", "splitMedia", "collectionHero"], gridOptions: ["cards", "featuredPlusRail", "editorialRail"], footerOptions: ["columns", "newsletterHero"], density: "balanced", archetype: "conversion", priceStyle: "standard", cardStyle: "softCard", mediaBehavior: "gallery" },
  },
];

function slugify(value: string) {
  return value.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function titleWords(label: string) {
  return label.replace(/\s*&\s*/g, " ").replace(/\s+/g, " ").trim();
}

function detectTaxonomyLabel(prompt: string) {
  const p = prompt.toLowerCase();
  let best: { label: string; category: StoreCategory; score: number } | null = null;
  for (const group of SHOPIFY_CATEGORY_GROUPS) {
    for (const label of group.categories) {
      const normalized = label.toLowerCase();
      const direct = p.includes(normalized);
      const words = normalized.split(/\s+/).filter((word) => word.length > 3);
      const wordMatches = words.filter((word) => p.includes(word)).length;
      const score = direct ? 100 + normalized.length : wordMatches ? wordMatches * 8 + normalized.length / 20 : 0;
      if (score && (!best || score > best.score)) best = { label, category: group.group, score };
    }
  }
  return best;
}

function makeSpecs(specKeys: string[], index: number, label: string) {
  const values = [
    ["Premium", "Optimized", "Standard", "Included"],
    ["Advanced", "Balanced", "Compact", "2-year"],
    ["Signature", "High performance", "Medium", "1-year"],
    ["Essential", "Everyday", "Large", "Included"],
  ];
  const selected = values[index % values.length];
  return Object.fromEntries(specKeys.map((key, i) => [key, selected[i] ?? `${titleWords(label)} detail`]));
}

function makeProducts(label: string, preset: DomainPreset) {
  const clean = titleWords(label)
    .replace(/\s*&\s*accessories\b/gi, "")
    .replace(/\b(accessories|products?|gear|equipment|supplies|essentials)\b/gi, "")
    .replace(/\s+/g, " ")
    .trim() || titleWords(label);
  return preset.productNouns.map((name, index) => {
    const amount = preset.priceBase * (1 + index * 0.45);
    const price = preset.priceBase >= 10000 ? `$${Math.round(amount / 100) * 100}` : preset.priceBase >= 1000 ? `$${Math.round(amount)}` : `$${amount < 100 ? amount.toFixed(0) : Math.round(amount)}`;
    return {
      name: `${name} ${clean}`.slice(0, 58),
      subtitle: /(phone|smartphone|iphone|android|mobile)/i.test(clean)
        ? `${index === 0 ? "Featured" : index === 1 ? "Best-selling" : index === 2 ? "Everyday" : "Premium"} ${clean.toLowerCase()} · iOS and Android ready`
        : `${index === 0 ? "Featured" : index === 1 ? "Best-selling" : index === 2 ? "Everyday" : "Premium"} ${clean.toLowerCase()} · designed for confident comparison`,
      price,
      tag: index === 0 ? "Featured" : index === 1 ? "Popular" : index === 2 ? "New" : "Premium",
      specs: makeSpecs(preset.specKeys, index, label),
    };
  });
}

export function buildDynamicCategoryProfile(prompt: string, fallbackCategory: StoreCategory): DynamicCategoryProfile | null {
  const match = detectTaxonomyLabel(prompt);
  if (!match) return null;
  const preset = DOMAIN_PRESETS.find((item) => item.test.test(match.label) || item.test.test(prompt)) ?? DOMAIN_PRESETS[DOMAIN_PRESETS.length - 1];
  const label = match.label;
  const category = match.category ?? fallbackCategory;
  const products = makeProducts(label, preset);
  return {
    id: `dynamic-${slugify(label)}`,
    label,
    category,
    aliases: [label, ...label.toLowerCase().split(/\s+&?\s+/).filter((part) => part.length > 3)],
    layoutBias: preset.layoutBias,
    filters: preset.filters,
    content: {
      brandVoice: /luxury|premium|designer/i.test(prompt) ? "Refined and selective" : "Clear, category-specific and useful",
      heroKicker: label.toUpperCase().slice(0, 40),
      heroTitle: `A better way to shop ${label.toLowerCase()}.`,
      heroBody: `Explore a focused ${label.toLowerCase()} selection with useful specifications, smarter filters and clearer product comparisons built into the storefront.`,
      cta: `Shop ${label.replace(/&.*/, "").trim()}`.slice(0, 38),
      announcement: `New ${label.toLowerCase()} arrivals now available`,
      navItems: preset.nav,
      mediaQuery: preset.mediaQuery(label),
      collectionTitles: preset.collections,
      products,
      filters: preset.filters,
    },
  };
}

export function dynamicCategoryDirectory() {
  return SHOPIFY_CATEGORY_GROUPS.flatMap((group) => group.categories.map((label) => ({
    id: `dynamic-${slugify(label)}`,
    label,
    category: group.group,
    aliases: [label],
  })));
}
