import { refreshStoreImages } from "@/lib/image-library";
import type { DesignGenome, HeroLayout, ProductGridLayout, SectionSpec, StoreCategory } from "@/types/design";

export type SectionRegenerationIntent = "fresh" | "premium" | "simpler" | "conversion" | "layout";

const variants: SectionSpec["variant"][] = ["clean", "editorial", "split", "cards", "rail", "minimal", "immersive", "compact", "contrast"];

const productLayouts: Record<SectionRegenerationIntent, ProductGridLayout[]> = {
  fresh: ["cards", "featuredPlusRail", "carousel", "editorialRail", "categoryTabs"],
  premium: ["luxurySparse", "editorialRail", "magazineGrid", "spotlight", "horizontalEditorial"],
  simpler: ["minimalList", "classic", "cards", "compact"],
  conversion: ["denseRetail", "featuredPlusRail", "deals", "bundleGrid", "comparison"],
  layout: ["asymmetric", "mosaic", "featureSplit", "stackedCards", "carousel"],
};

const heroLayouts: Record<SectionRegenerationIntent, HeroLayout[]> = {
  fresh: ["showcase", "splitMedia", "collectionHero", "launch", "bento"],
  premium: ["fullBleedEditorial", "cinematicProduct", "magazine", "floatingProducts", "imageCollage"],
  simpler: ["minimalCommerce", "centered", "split", "product"],
  conversion: ["collectionHero", "showcase", "launch", "product", "campaign"],
  layout: ["dualCampaign", "megaTypography", "hotspot", "imageCollage", "floatingProducts"],
};

const eyebrowByType: Record<SectionSpec["type"], string[]> = {
  collections: ["Shop by collection", "Explore the range", "Curated for you", "Browse by category"],
  products: ["Featured products", "Most wanted", "Shop the edit", "Popular right now"],
  story: ["Inside the brand", "Designed with intention", "Our point of view", "Behind the product"],
  testimonials: ["Customer notes", "Loved by the community", "Verified feedback", "What shoppers say"],
  faq: ["Good to know", "Questions answered", "Before you order", "Help center"],
  newsletter: ["Stay connected", "Join the list", "Get first access", "Members get more"],
  features: ["Why shop with us", "What makes it better", "Built around you", "The details matter"],
  quote: ["Point of view", "Our philosophy", "A note from the studio", "Designed differently"],
  campaign: ["Current campaign", "Limited release", "Seasonal feature", "New this week"],
  comparison: ["Compare the options", "Find your fit", "Choose your version", "Side by side"],
  socialProof: ["Seen in the wild", "Community favorites", "Styled by you", "Real customer moments"],
  videoStory: ["See it in motion", "Watch the story", "A closer look", "Experience the collection"],
};

function hash(value: string) {
  let result = 0;
  for (let i = 0; i < value.length; i += 1) result = ((result << 5) - result + value.charCodeAt(i)) | 0;
  return Math.abs(result);
}

function nextFrom<T>(items: readonly T[], current: T | undefined, salt: string) {
  const candidates = items.filter((item) => item !== current);
  const pool = candidates.length ? candidates : [...items];
  return pool[hash(salt) % pool.length];
}

function categoryLabel(category: StoreCategory) {
  const labels: Record<StoreCategory, string> = {
    fashion: "style",
    shoes: "footwear",
    accessories: "accessories",
    home: "home",
    beauty: "beauty",
    food: "market",
    outdoor: "outdoor",
    kids: "kids",
    tech: "technology",
  };
  return labels[category];
}

export function regenerateSection(design: DesignGenome, sectionId: string, intent: SectionRegenerationIntent): DesignGenome {
  const next = structuredClone(design);
  const index = next.sections.findIndex((section) => section.id === sectionId);
  if (index < 0) return next;

  const current = next.sections[index];
  const salt = `${next.seed}:${sectionId}:${intent}:${current.variant}`;
  const eyebrowPool = eyebrowByType[current.type];
  const regenerated: SectionSpec = {
    ...current,
    variant: nextFrom(variants, current.variant, `${salt}:variant`),
    eyebrow: nextFrom(eyebrowPool, current.eyebrow, `${salt}:eyebrow`),
    lastRegeneratedAt: new Date().toISOString(),
    regenerationNote: intent,
  };

  if (intent === "premium") {
    regenerated.variant = current.type === "videoStory" ? "immersive" : current.type === "story" || current.type === "quote" ? "editorial" : "clean";
    regenerated.spacing = "airy";
    regenerated.alignment = current.type === "newsletter" || current.type === "quote" ? "center" : "left";
  } else if (intent === "simpler") {
    regenerated.variant = current.type === "faq" ? "minimal" : "clean";
    regenerated.spacing = "compact";
    regenerated.alignment = "left";
  } else if (intent === "conversion") {
    regenerated.variant = current.type === "campaign" ? "contrast" : current.type === "products" ? "rail" : "cards";
    regenerated.spacing = "balanced";
  } else if (intent === "layout") {
    regenerated.spacing = nextFrom(["compact", "balanced", "airy"] as const, current.spacing, `${salt}:spacing`);
    regenerated.alignment = nextFrom(["left", "center", "right"] as const, current.alignment, `${salt}:align`);
  }

  next.sections[index] = regenerated;

  if (current.type === "products") {
    next.layout.productGrid = nextFrom(productLayouts[intent], next.layout.productGrid, `${salt}:products`);
    if (next.commerce) {
      if (intent === "premium") {
        next.commerce.cardStyle = "imageFirst";
        next.commerce.priceStyle = "luxuryInline";
        next.commerce.mediaBehavior = "gallery";
      } else if (intent === "simpler") {
        next.commerce.cardStyle = "borderless";
        next.commerce.priceStyle = "minimal";
        next.commerce.mediaBehavior = "hoverZoom";
      } else if (intent === "conversion") {
        next.commerce.cardStyle = "retail";
        next.commerce.priceStyle = next.store.category === "tech" ? "installment" : "discountBadge";
        next.commerce.quickView = true;
      }
    }
  }

  if (current.type === "collections" || current.type === "products" || current.type === "story" || current.type === "campaign") {
    next.store = refreshStoreImages(next.store, next.seed + hash(`${sectionId}:${intent}`), {
      searchContext: `${next.store.nicheLabel ?? categoryLabel(next.store.category)} ${intent} ${current.type}`,
    });
  }

  next.id = crypto.randomUUID();
  next.createdAt = new Date().toISOString();
  next.description = `${next.description.split(" · section refresh")[0]} · section refresh: ${current.type}/${intent}`;
  return next;
}

export function regenerateHero(design: DesignGenome, intent: SectionRegenerationIntent): DesignGenome {
  const next = structuredClone(design);
  const salt = `${next.seed}:${next.layout.hero}:${intent}:hero`;
  next.layout.hero = nextFrom(heroLayouts[intent], next.layout.hero, salt);

  if (intent === "premium") {
    next.layout.density = "airy";
    next.layout.sectionRhythm = "editorial";
  } else if (intent === "simpler") {
    next.layout.density = "balanced";
  } else if (intent === "conversion") {
    next.layout.density = "compact";
  }

  next.store = refreshStoreImages(next.store, next.seed + hash(salt), {
    searchContext: `${next.store.nicheLabel ?? categoryLabel(next.store.category)} ${intent} hero campaign`,
  });
  next.id = crypto.randomUUID();
  next.createdAt = new Date().toISOString();
  next.description = `${next.description.split(" · hero refresh")[0]} · hero refresh: ${intent}`;
  return next;
}
