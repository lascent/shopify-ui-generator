import type { ArtDirectionName, PricingComposition, ProductCardAnatomy, StoreCategory } from "@/types/design";

export function selectProductAnatomy(category: StoreCategory, direction: ArtDirectionName, prompt: string, seed: number): ProductCardAnatomy {
  const p = prompt.toLowerCase();
  if (/marketplace|dense|many products/.test(p) || direction === "Technical Marketplace") return "marketplace";
  if (/streetwear|anime/.test(p) || direction === "Streetwear Drop") return "streetwear";
  if (/launch|campaign/.test(p) || direction === "Luxury Product Launch") return "launch";
  if (/compare|comparison/.test(p)) return "comparison";
  if (category === "tech") return ["technical", "comparison", "compactRetail"][Math.abs(seed) % 3] as ProductCardAnatomy;
  if (category === "beauty") return ["beauty", "luxury", "imageDominant"][Math.abs(seed) % 3] as ProductCardAnatomy;
  if (category === "home") return ["furniture", "imageDominant", "minimal"][Math.abs(seed) % 3] as ProductCardAnatomy;
  if (category === "food") return ["food", "compactRetail", "imageDominant"][Math.abs(seed) % 3] as ProductCardAnatomy;
  if (category === "fashion") return ["fashionEditorial", "streetwear", "imageDominant"][Math.abs(seed) % 3] as ProductCardAnatomy;
  if (category === "accessories") return ["luxury", "imageDominant", "minimal"][Math.abs(seed) % 3] as ProductCardAnatomy;
  if (category === "kids") return ["compactRetail", "imageDominant", "marketplace"][Math.abs(seed) % 3] as ProductCardAnatomy;
  return ["imageDominant", "minimal", "compactRetail"][Math.abs(seed) % 3] as ProductCardAnatomy;
}

export function selectPricingComposition(category: StoreCategory, anatomy: ProductCardAnatomy, direction: ArtDirectionName, prompt: string, seed: number): PricingComposition {
  const p = prompt.toLowerCase();
  if (/subscription|monthly/.test(p)) return "subscriptionPrice";
  if (/bundle|kit|set/.test(p)) return "bundlePrice";
  if (/member|membership/.test(p)) return "memberPrice";
  if (/per kg|per weight|per unit/.test(p) || category === "food") return "pricePerUnit";
  if (/financing|installment|monthly payment/.test(p) || category === "tech") return ["technicalPricePanel", "installmentBlock", "largePrice"][Math.abs(seed) % 3] as PricingComposition;
  if (anatomy === "luxury" || direction === "Quiet Luxury" || direction === "Luxury Jewelry" || direction === "Heritage Watchmaker") return "inlineMinimal";
  if (anatomy === "marketplace") return ["oldNewPrice", "percentageBadge", "priceStack"][Math.abs(seed) % 3] as PricingComposition;
  if (anatomy === "launch") return ["floatingPrice", "priceOverlay", "largePrice"][Math.abs(seed) % 3] as PricingComposition;
  return ["inlineMinimal", "priceStack", "priceCorner"][Math.abs(seed) % 3] as PricingComposition;
}
