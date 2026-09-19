import type { ArtDirectionName, InteractionProfileSelection, ProductCardAnatomy, StoreCategory } from "@/types/design";

const profile = (value: InteractionProfileSelection) => value;

export const INTERACTION_PROFILES: readonly InteractionProfileSelection[] = [
  profile({ name: "Quiet Luxury", density: "restrained", responsiveness: "smooth", cardBehavior: "minimalUnderline", imageBehavior: "crossfade", textBehavior: "underline", buttonBehavior: "arrowSlide", navBehavior: "slidingUnderline", iconBehavior: "shift", priceBehavior: "static", quickActionBehavior: "compact", focusBehavior: "outline", touchBehavior: "persistentActions", easingFamily: "editorial", feedbackSpeed: "normal" }),
  profile({ name: "Editorial Crop", density: "balanced", responsiveness: "editorial", cardBehavior: "mediaCropShift", imageBehavior: "cropShift", textBehavior: "shift", buttonBehavior: "underlineGrow", navBehavior: "expandingUnderline", iconBehavior: "shift", priceBehavior: "static", quickActionBehavior: "hover", focusBehavior: "underline", touchBehavior: "tapAndReveal", easingFamily: "editorial", feedbackSpeed: "editorial" }),
  profile({ name: "Technical Precision", density: "balanced", responsiveness: "fast", cardBehavior: "borderReveal", imageBehavior: "subtleZoom", textBehavior: "fade", buttonBehavior: "borderFill", navBehavior: "activeIndicator", iconBehavior: "shift", priceBehavior: "emphasize", quickActionBehavior: "overlay", focusBehavior: "ring", touchBehavior: "persistentActions", easingFamily: "snappy", feedbackSpeed: "fast" }),
  profile({ name: "Marketplace Fast", density: "expressive", responsiveness: "instant", cardBehavior: "quickAddReveal", imageBehavior: "subtleZoom", textBehavior: "none", buttonBehavior: "fillSweep", navBehavior: "backgroundHighlight", iconBehavior: "shift", priceBehavior: "badge", quickActionBehavior: "always", focusBehavior: "ring", touchBehavior: "persistentActions", easingFamily: "standard", feedbackSpeed: "micro" }),
  profile({ name: "Streetwear Swap", density: "expressive", responsiveness: "fast", cardBehavior: "alternateImage", imageBehavior: "alternateImage", textBehavior: "shift", buttonBehavior: "textSwap", navBehavior: "arrowReveal", iconBehavior: "shift", priceBehavior: "reveal", quickActionBehavior: "hover", focusBehavior: "outline", touchBehavior: "tapAndReveal", easingFamily: "snappy", feedbackSpeed: "fast" }),
  profile({ name: "Furniture Detail", density: "restrained", responsiveness: "smooth", cardBehavior: "productGalleryPreview", imageBehavior: "crossfade", textBehavior: "underline", buttonBehavior: "softPress", navBehavior: "slidingUnderline", iconBehavior: "none", priceBehavior: "static", quickActionBehavior: "compact", focusBehavior: "outline", touchBehavior: "swipe", easingFamily: "smooth", feedbackSpeed: "normal" }),
  profile({ name: "Beauty Soft", density: "balanced", responsiveness: "smooth", cardBehavior: "swatchesReveal", imageBehavior: "softBrightness", textBehavior: "fade", buttonBehavior: "backgroundSlide", navBehavior: "pillHighlight", iconBehavior: "fade", priceBehavior: "static", quickActionBehavior: "hover", focusBehavior: "ring", touchBehavior: "tapAndReveal", easingFamily: "smooth", feedbackSpeed: "normal" }),
  profile({ name: "Food Quick Add", density: "balanced", responsiveness: "fast", cardBehavior: "quickAddReveal", imageBehavior: "subtleZoom", textBehavior: "none", buttonBehavior: "fillSweep", navBehavior: "backgroundHighlight", iconBehavior: "shift", priceBehavior: "emphasize", quickActionBehavior: "always", focusBehavior: "ring", touchBehavior: "persistentActions", easingFamily: "standard", feedbackSpeed: "fast" }),
  profile({ name: "Gaming Spotlight", density: "kinetic", responsiveness: "fast", cardBehavior: "spotlightFollow", imageBehavior: "perspectiveTilt", textBehavior: "reveal", buttonBehavior: "splitFill", navBehavior: "megaMenuReveal", iconBehavior: "rotateSoft", priceBehavior: "emphasize", quickActionBehavior: "overlay", focusBehavior: "ring", touchBehavior: "tapAndReveal", easingFamily: "snappy", feedbackSpeed: "fast" }),
  profile({ name: "Minimal Commerce", density: "minimal", responsiveness: "instant", cardBehavior: "minimalUnderline", imageBehavior: "subtleZoom", textBehavior: "underline", buttonBehavior: "softPress", navBehavior: "slidingUnderline", iconBehavior: "none", priceBehavior: "static", quickActionBehavior: "compact", focusBehavior: "outline", touchBehavior: "persistentActions", easingFamily: "standard", feedbackSpeed: "micro" }),
  profile({ name: "Playful Spring", density: "expressive", responsiveness: "fast", cardBehavior: "cardLift", imageBehavior: "zoomAndPan", textBehavior: "shift", buttonBehavior: "iconShift", navBehavior: "pillHighlight", iconBehavior: "rotateSoft", priceBehavior: "badge", quickActionBehavior: "always", focusBehavior: "ring", touchBehavior: "tap", easingFamily: "smooth", feedbackSpeed: "fast" }),
  profile({ name: "Campaign Reveal", density: "expressive", responsiveness: "smooth", cardBehavior: "imageCurtain", imageBehavior: "directionalReveal", textBehavior: "reveal", buttonBehavior: "arrowSlide", navBehavior: "textFade", iconBehavior: "shift", priceBehavior: "reveal", quickActionBehavior: "hover", focusBehavior: "outline", touchBehavior: "tapAndReveal", easingFamily: "editorial", feedbackSpeed: "normal" }),
] as const;

const byName = (name: string) => INTERACTION_PROFILES.find((item) => item.name === name) ?? INTERACTION_PROFILES[0];

export function selectInteractionProfile(category: StoreCategory, direction: ArtDirectionName, anatomy: ProductCardAnatomy, prompt: string, seed: number) {
  const p = prompt.toLowerCase();
  let names: string[] = [];
  if (direction === "Quiet Luxury" || direction === "Luxury Jewelry" || direction === "Heritage Watchmaker") names = ["Quiet Luxury", "Editorial Crop", "Minimal Commerce"];
  else if (direction === "Gaming Hardware" || /gaming|rgb|kinetic/.test(p)) names = ["Gaming Spotlight", "Technical Precision", "Campaign Reveal"];
  else if (direction === "Streetwear Drop" || /streetwear|anime|drop/.test(p)) names = ["Streetwear Swap", "Campaign Reveal", "Editorial Crop"];
  else if (category === "home" || anatomy === "furniture") names = ["Furniture Detail", "Minimal Commerce", "Editorial Crop"];
  else if (category === "beauty" || anatomy === "beauty") names = ["Beauty Soft", "Quiet Luxury", "Editorial Crop"];
  else if (category === "food" || anatomy === "food") names = ["Food Quick Add", "Minimal Commerce", "Playful Spring"];
  else if (category === "tech" || anatomy === "technical") names = ["Technical Precision", "Marketplace Fast", "Gaming Spotlight"];
  else if (category === "kids") names = ["Playful Spring", "Marketplace Fast", "Minimal Commerce"];
  else names = ["Editorial Crop", "Minimal Commerce", "Campaign Reveal", "Marketplace Fast"];
  if (/minimal|quiet|restrained/.test(p)) names.unshift("Minimal Commerce", "Quiet Luxury");
  if (/interactive|expressive|kinetic|moving/.test(p)) names.unshift("Campaign Reveal", "Streetwear Swap", "Gaming Spotlight");
  return byName(names[Math.abs(seed) % names.length]);
}

export const interactionDuration = (profile: InteractionProfileSelection) => ({
  micro: 0.11,
  fast: 0.16,
  normal: 0.22,
  editorial: 0.42,
})[profile.feedbackSpeed];

export const interactionEase = (profile: InteractionProfileSelection): [number, number, number, number] => ({
  standard: [0.2, 0.8, 0.2, 1],
  smooth: [0.22, 1, 0.36, 1],
  snappy: [0.16, 1, 0.3, 1],
  editorial: [0.19, 1, 0.22, 1],
})[profile.easingFamily] as [number, number, number, number];
