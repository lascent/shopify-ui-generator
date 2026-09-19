import type { ArtDirectionName, InteractionDensity, MotionLanguageSelection, MotionPreset, StoreCategory } from "@/types/design";

const languages: Record<MotionLanguageSelection["name"], MotionLanguageSelection> = {
  QuietLuxuryMotion: { name: "QuietLuxuryMotion", primary: "softReveal", text: "clipReveal", media: "softZoom", hover: "restrained", ambient: "none" },
  StreetwearMotion: { name: "StreetwearMotion", primary: "editorialSlide", text: "kineticTicker", media: "imageDrift", hover: "expressive", ambient: "marquee" },
  TechnicalMotion: { name: "TechnicalMotion", primary: "staggerRise", text: "softReveal", media: "gridPulse", hover: "balanced", ambient: "none" },
  EditorialMotion: { name: "EditorialMotion", primary: "clipReveal", text: "headlineSweep", media: "ribbonWave", hover: "restrained", ambient: "drift" },
  PlayfulMotion: { name: "PlayfulMotion", primary: "elasticRise", text: "staggerRise", media: "depthFloat", hover: "expressive", ambient: "drift" },
  CampaignMotion: { name: "CampaignMotion", primary: "spotlightParallax", text: "headlineSweep", media: "cascadeZoom", hover: "expressive", ambient: "ticker" },
  MinimalMotion: { name: "MinimalMotion", primary: "softReveal", text: "softReveal", media: "softZoom", hover: "restrained", ambient: "none" },
};

export function selectMotionLanguage(category: StoreCategory, direction: ArtDirectionName, density: InteractionDensity, prompt: string): MotionLanguageSelection {
  const p = prompt.toLowerCase();
  if (direction === "Quiet Luxury" || direction === "Luxury Jewelry" || direction === "Heritage Watchmaker") return languages.QuietLuxuryMotion;
  if (direction === "Streetwear Drop" || /streetwear|anime|marquee/.test(p)) return languages.StreetwearMotion;
  if (direction === "Gaming Hardware" || direction === "Technical Marketplace" || category === "tech") return languages.TechnicalMotion;
  if (direction === "High Fashion Editorial" || direction === "Contemporary Magazine" || /editorial|magazine/.test(p)) return languages.EditorialMotion;
  if (direction === "Playful Kids" || category === "kids") return languages.PlayfulMotion;
  if (direction === "Dark Cinematic" || direction === "Luxury Product Launch" || density === "kinetic" || /campaign|cinematic/.test(p)) return languages.CampaignMotion;
  return languages.MinimalMotion;
}

export function motionPresetForLanguage(language: MotionLanguageSelection, seed: number): MotionPreset {
  return [language.primary, language.text, language.media][Math.abs(seed) % 3];
}
