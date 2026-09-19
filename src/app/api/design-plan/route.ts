import { buildLocalDesignPlan, mergeExternalDesignPlan } from "@/lib/design-planner";
import type { Creativity, StoreCategory } from "@/types/design";

function extractText(response: unknown) {
  if (!response || typeof response !== "object") return "";
  const obj = response as Record<string, unknown>;
  if (typeof obj.output_text === "string") return obj.output_text;
  if (!Array.isArray(obj.output)) return "";
  const parts: string[] = [];
  for (const item of obj.output) {
    if (!item || typeof item !== "object") continue;
    const content = (item as Record<string, unknown>).content;
    if (!Array.isArray(content)) continue;
    for (const part of content) {
      if (!part || typeof part !== "object") continue;
      const text = (part as Record<string, unknown>).text;
      if (typeof text === "string") parts.push(text);
    }
  }
  return parts.join("\n");
}

function parseJson(text: string) {
  const cleaned = text.trim().replace(/^```(?:json)?/i, "").replace(/```$/, "").trim();
  try { return JSON.parse(cleaned); } catch {}
  const first = cleaned.indexOf("{");
  const last = cleaned.lastIndexOf("}");
  if (first >= 0 && last > first) {
    try { return JSON.parse(cleaned.slice(first, last + 1)); } catch {}
  }
  return null;
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const prompt = typeof body.prompt === "string" ? body.prompt.slice(0, 3000) : "";
  const currentCategory = (typeof body.currentCategory === "string" ? body.currentCategory : "fashion") as StoreCategory;
  const creativity = (typeof body.creativity === "string" ? body.creativity : "balanced") as Creativity;
  const shopTitle = typeof body.shopTitle === "string" ? body.shopTitle.slice(0, 80) : "";
  const fallback = buildLocalDesignPlan(prompt, currentCategory, creativity);
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey || !prompt.trim()) return Response.json(fallback);

  const allowed = {
    category: ["fashion", "shoes", "accessories", "home", "beauty", "food", "outdoor", "kids", "tech"],
    nav: ["minimal", "floating", "centered", "split", "stacked", "searchFirst", "editorial", "utility", "transparent", "megaMenu", "logoRail", "categoryBar", "compactSticky", "promoHeavy", "sideNav"],
    hero: ["split", "editorial", "centered", "product", "immersive", "statement", "hotspot", "campaign", "beautyEditorial", "showcase", "bento", "splitMedia", "minimalCommerce", "launch", "magazine", "fullBleedEditorial", "dualCampaign", "floatingProducts", "megaTypography", "imageCollage", "collectionHero", "cinematicProduct"],
    productGrid: ["classic", "editorial", "compact", "lookbook", "catalog", "mosaic", "deals", "carousel", "editorialRail", "comparison", "cards", "featureSplit", "asymmetric", "stackedCards", "minimalList", "spotlight", "magazineGrid", "shopTheLook", "featuredPlusRail", "horizontalEditorial", "denseRetail", "luxurySparse", "categoryTabs", "bundleGrid", "specGrid"],
    footer: ["minimal", "columns", "oversizedBrand", "editorial", "imageSplit", "newsletterHero", "supportHeavy", "socialFirst", "storeLocator", "darkCommerce", "compact", "legalHeavy"],
    archetype: ["editorial", "luxury", "minimal", "streetwear", "sport", "tech-retail", "beauty", "playful", "scandinavian", "campaign", "dark-premium", "magazine", "catalog", "storytelling", "conversion"],
    priceStyle: ["minimal", "standard", "sale", "discountBadge", "saveAmount", "percentage", "installment", "subscription", "bundle", "tiered", "techSpec", "luxuryInline"],
    cardStyle: ["borderless", "outlined", "softCard", "imageFirst", "textOverlay", "editorial", "retail", "glass", "flat", "split"],
    mediaBehavior: ["static", "hoverZoom", "hoverSwap", "hoverVideo", "autoplayVideo", "parallax", "maskedReveal", "gallery"],
  };

  const instruction = `You are the design-planning layer for a Shopify-style storefront generator. Convert the user's request into a coherent commerce design plan. Return ONLY valid JSON, no markdown. Use only allowed enum values. Do not copy existing brand names.\n\nAllowed values: ${JSON.stringify(allowed)}\n\nReturn this shape:\n{\n  "category": "...",\n  "confidence": 0-100,\n  "intent": "short commerce intent",\n  "summary": "one sentence design direction",\n  "layout": {\n    "navOptions": ["..."],\n    "heroOptions": ["..."],\n    "gridOptions": ["..."],\n    "footerOptions": ["..."],\n    "density": "compact|balanced|airy",\n    "rhythm": "tight|balanced|editorial",\n    "archetype": "...",\n    "priceStyle": "...",\n    "cardStyle": "...",\n    "mediaBehavior": "..."\n  },\n  "content": {\n    "brandVoice": "...",\n    "heroKicker": "...",\n    "heroTitle": "...",\n    "heroBody": "...",\n    "cta": "...",\n    "announcement": "...",\n    "navItems": ["..."],\n    "mediaQuery": "short visual search phrase for the exact niche",\n    "collectionTitles": ["3-6 niche-specific collection names"],\n    "products": [\n      {"name":"niche-specific product", "subtitle":"short realistic product detail", "price":"$99", "tag":"New"}\n    ]\n  }\n}\n\nUser shop title: ${shopTitle || "not provided"}\nCurrent category fallback: ${currentCategory}\nExploration mode: ${creativity}\nUser direction: ${prompt}`;

  try {
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-5.6-luna",
        input: instruction,
        reasoning: { effort: "low" },
      }),
    });
    if (!response.ok) return Response.json(fallback);
    const data = await response.json();
    const parsed = parseJson(extractText(data));
    return Response.json(mergeExternalDesignPlan(parsed, fallback));
  } catch {
    return Response.json(fallback);
  }
}
