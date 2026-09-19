import type { DesignGenome } from "@/types/design";
import { interactionDuration, interactionEase } from "@/lib/intelligence/interaction-engine";

export function productCardHoverInteraction(design: DesignGenome, index: number) {
  const profile = design.interactionProfile;
  if (!profile) return { y: -Math.min(5, design.motion.hoverLift), scale: Math.min(design.motion.hoverScale, 1.018) };
  if (profile.density === "minimal") return {};
  switch (profile.cardBehavior) {
    case "cardLift": return { y: -5, scale: 1.008 };
    case "borderReveal": return { y: -1, scale: 1.002 };
    case "shadowRise": return { y: -3, scale: 1.004 };
    case "productTitleShift": return { x: index % 2 ? -2 : 2 };
    case "cursorTilt": return { rotateZ: index % 2 ? -0.35 : 0.35, scale: 1.006 };
    case "spotlightFollow": return { y: -2, scale: 1.005 };
    case "minimalUnderline":
    case "quickAddReveal":
    case "wishlistReveal":
    case "swatchesReveal":
    case "priceReveal":
    case "infoFadeIn":
      return {};
    case "infoSlideUp": return { y: -2 };
    case "imageCurtain": return { scale: 1.002 };
    default: return { y: profile.density === "kinetic" ? -4 : -2, scale: profile.density === "expressive" || profile.density === "kinetic" ? 1.008 : 1.003 };
  }
}

export function productImageInteraction(design: DesignGenome, index: number) {
  const behavior = design.interactionProfile?.imageBehavior;
  const direction = index % 2 === 0 ? 1 : -1;
  if (!behavior) return { scale: Math.min(Math.max(1.01, design.motion.mediaZoom), 1.055), y: -Math.min(4, design.motion.hoverLift * .45) };
  if (behavior === "zoomAndPan") return { scale: 1.045, x: direction * 5 };
  if (behavior === "cropShift") return { scale: 1.025, x: direction * 7, y: -2 };
  if (behavior === "alternateImage" || behavior === "crossfade") return { scale: 1.018 };
  if (behavior === "softBrightness") return { scale: 1.016, filter: "brightness(1.04)" };
  if (behavior === "grayscaleToColor") return { scale: 1.012, filter: "grayscale(0)" };
  if (behavior === "perspectiveTilt") return { scale: 1.02, rotateZ: direction * 0.35, x: direction * 3 };
  if (behavior === "parallaxPointer") return { scale: 1.03, x: direction * 4, y: -4 };
  if (behavior === "directionalReveal") return { scale: 1.028, x: direction * 4 };
  if (behavior === "overlayReveal" || behavior === "captionReveal") return { scale: 1.018 };
  return { scale: 1.025 };
}

export function productInteractionTransition(design: DesignGenome) {
  return design.interactionProfile
    ? { duration: interactionDuration(design.interactionProfile), ease: interactionEase(design.interactionProfile) }
    : { duration: Math.min(.42, design.motion.duration), ease: [0.22, 1, 0.36, 1] as [number, number, number, number] };
}
