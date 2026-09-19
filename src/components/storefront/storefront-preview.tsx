"use client";

import { motion } from "motion/react";
import { ArrowRight, ChevronDown, ChevronLeft, Facebook, Globe, Heart, Instagram, MapPin, Menu, Search, ShoppingBag, Sparkles, UserRound, Youtube } from "lucide-react";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import type { DesignGenome, Device, SectionSpec, StorePage, StoreProduct } from "@/types/design";
import { getResponsiveDesign } from "@/lib/responsive-engine";
import { CommerceProvider, useCommerce } from "@/components/storefront/commerce/commerce-provider";
import { IntelligentSectionRenderer } from "@/components/storefront/sections/intelligent-section-renderer";
import { productCardHoverInteraction, productImageInteraction, productInteractionTransition } from "@/components/storefront/interactions/product-interactions";
import { interactionDuration, interactionEase } from "@/lib/intelligence/interaction-engine";

const shadow = {
  none: "none",
  soft: "0 14px 40px rgba(0,0,0,.08)",
  elevated: "0 24px 70px rgba(0,0,0,.15)",
};

const motionEaseMap = {
  calm: [0.22, 1, 0.36, 1] as [number, number, number, number],
  smooth: [0.22, 1, 0.36, 1] as [number, number, number, number],
  editorial: [0.16, 1, 0.3, 1] as [number, number, number, number],
  spring: [0.175, 0.885, 0.32, 1.1] as [number, number, number, number],
  dynamic: [0.2, 0.9, 0.2, 1] as [number, number, number, number],
  cinematic: [0.18, 1, 0.28, 1] as [number, number, number, number],
  float: [0.22, 1, 0.36, 1] as [number, number, number, number],
  snappy: [0.25, 0.8, 0.25, 1] as [number, number, number, number],
  layered: [0.17, 1, 0.32, 1] as [number, number, number, number],
  reveal: [0.14, 1, 0.3, 1] as [number, number, number, number],
  glide: [0.22, 1, 0.36, 1] as [number, number, number, number],
  orbit: [0.2, 1, 0.28, 1] as [number, number, number, number],
  softReveal: [0.2, 1, 0.3, 1] as [number, number, number, number],
  clipReveal: [0.16, 1, 0.3, 1] as [number, number, number, number],
  staggerRise: [0.22, 1, 0.36, 1] as [number, number, number, number],
  editorialSlide: [0.16, 1, 0.3, 1] as [number, number, number, number],
  magnetic: [0.2, 0.9, 0.2, 1] as [number, number, number, number],
  parallaxSoft: [0.22, 1, 0.36, 1] as [number, number, number, number],
  imageDrift: [0.22, 1, 0.36, 1] as [number, number, number, number],
  menuCascade: [0.16, 1, 0.3, 1] as [number, number, number, number],
  luxuryFlow: [0.18, 1, 0.28, 1] as [number, number, number, number],
  gridPulse: [0.21, 0.9, 0.22, 1] as [number, number, number, number],
  spotlightReveal: [0.16, 1, 0.26, 1] as [number, number, number, number],
  elasticRise: [0.19, 0.98, 0.24, 1.02] as [number, number, number, number],
  softZoom: [0.2, 1, 0.3, 1] as [number, number, number, number],
  showcaseLift: [0.18, 0.95, 0.24, 1] as [number, number, number, number],
  marqueeFlow: [0.16, 1, 0.28, 1] as [number, number, number, number],
  headlineSweep: [0.14, 1, 0.24, 1] as [number, number, number, number],
  driftLoop: [0.2, 1, 0.28, 1] as [number, number, number, number],
  kineticTicker: [0.15, 0.96, 0.22, 1] as [number, number, number, number],
  ribbonWave: [0.2, 1, 0.32, 1] as [number, number, number, number],
  depthFloat: [0.22, 1, 0.34, 1] as [number, number, number, number],
  cascadeZoom: [0.16, 1, 0.28, 1] as [number, number, number, number],
  spotlightParallax: [0.17, 1, 0.27, 1] as [number, number, number, number],
};

function motionTransition(design: DesignGenome) {
  return { duration: design.motion.duration, ease: motionEaseMap[design.motion.preset] };
}

function sectionReveal(design: DesignGenome, index = 0) {
  const distance = design.motion.sectionDistance;
  const preset = design.motion.preset;
  const axisX = preset === "editorial" || preset === "editorialSlide" || preset === "luxuryFlow" || preset === "headlineSweep" || preset === "kineticTicker" || preset === "ribbonWave"
    ? (index % 2 === 0 ? -distance : distance)
    : preset === "layered"
      ? (index % 2 === 0 ? -distance * 0.65 : distance * 0.65)
      : preset === "glide" || preset === "showcaseLift"
        ? (index % 2 === 0 ? -distance * 0.5 : distance * 0.5)
        : preset === "orbit"
          ? (index % 2 === 0 ? -distance * 0.35 : distance * 0.35)
          : preset === "depthFloat"
            ? (index % 2 === 0 ? -distance * 0.28 : distance * 0.28)
            : preset === "gridPulse"
            ? (index % 2 === 0 ? -distance * 0.22 : distance * 0.22)
            : preset === "spotlightReveal"
              ? (index % 2 === 0 ? -distance * 0.18 : distance * 0.18)
              : 0;
  const axisY = preset === "cinematic" || preset === "spotlightReveal" || preset === "spotlightParallax"
    ? distance * 1.15
    : preset === "snappy" || preset === "gridPulse"
      ? distance * 0.75
      : preset === "reveal" || preset === "staggerRise" || preset === "menuCascade"
        ? distance * 1.35
        : preset === "softReveal" || preset === "softZoom" || preset === "driftLoop" || preset === "cascadeZoom"
          ? distance * 0.6
          : preset === "imageDrift"
            ? distance * 0.35
            : preset === "elasticRise"
              ? distance * 0.95
              : distance;
  const scale = preset === "cinematic"
    ? 0.985
    : preset === "dynamic" || preset === "magnetic" || preset === "elasticRise"
      ? 0.982
      : preset === "reveal" || preset === "clipReveal"
        ? 0.98
        : preset === "orbit" || preset === "softZoom" || preset === "driftLoop"
          ? 0.989
          : preset === "spotlightReveal" || preset === "spotlightParallax"
            ? 0.984
            : preset === "depthFloat" || preset === "cascadeZoom"
              ? 0.987
              : 0.992;
  return {
    initial: { opacity: 1, x: axisX, y: axisY, scale },
    whileInView: { opacity: 1, x: 0, y: 0, scale: 1 },
    viewport: { once: true, amount: 0.14 },
    transition: { ...motionTransition(design), delay: index * design.motion.stagger },
  };
}

function hoverAnimation(design: DesignGenome) {
  const preset = design.motion.preset;
  if (preset === "luxuryFlow") return { y: -Math.max(4, design.motion.hoverLift), scale: Math.max(design.motion.hoverScale, 1.014), x: 2 };
  if (preset === "gridPulse") return { y: -Math.max(5, design.motion.hoverLift), scale: Math.max(design.motion.hoverScale, 1.02) };
  if (preset === "spotlightReveal") return { y: -Math.max(6, design.motion.hoverLift), scale: Math.max(design.motion.hoverScale, 1.018), rotateZ: -0.4 };
  if (preset === "elasticRise") return { y: -Math.max(8, design.motion.hoverLift), scale: Math.max(design.motion.hoverScale, 1.022) };
  if (preset === "softZoom") return { y: -Math.max(2, design.motion.hoverLift * 0.6), scale: Math.max(design.motion.hoverScale, 1.015) };
  if (preset === "showcaseLift") return { y: -Math.max(7, design.motion.hoverLift), scale: Math.max(design.motion.hoverScale, 1.02), x: 1.5 };
  if (preset === "marqueeFlow") return { y: -Math.max(4, design.motion.hoverLift), scale: Math.max(design.motion.hoverScale, 1.014), x: 3 };
  if (preset === "headlineSweep") return { y: -Math.max(5, design.motion.hoverLift), scale: Math.max(design.motion.hoverScale, 1.018), x: 4 };
  if (preset === "kineticTicker") return { y: -Math.max(5, design.motion.hoverLift), scale: Math.max(design.motion.hoverScale, 1.02), x: 5 };
  if (preset === "ribbonWave") return { y: -Math.max(4, design.motion.hoverLift * 0.85), scale: Math.max(design.motion.hoverScale, 1.015), x: 2 };
  if (preset === "depthFloat") return { y: -Math.max(4, design.motion.hoverLift * 0.8), scale: Math.max(design.motion.hoverScale, 1.017), rotateZ: 0.25 };
  if (preset === "cascadeZoom") return { y: -Math.max(5, design.motion.hoverLift), scale: Math.max(design.motion.hoverScale, 1.022) };
  if (preset === "spotlightParallax") return { y: -Math.max(6, design.motion.hoverLift), scale: Math.max(design.motion.hoverScale, 1.02), x: 2 };
  if (preset === "driftLoop") return { y: -Math.max(3, design.motion.hoverLift * 0.8), scale: Math.max(design.motion.hoverScale, 1.013) };
  return { y: -design.motion.hoverLift, scale: design.motion.hoverScale };
}

function mediaHoverAnimation(design: DesignGenome, index = 0) {
  const preset = design.motion.preset;
  const horizontal = index % 2 === 0 ? -1 : 1;
  if (preset === "luxuryFlow") return { scale: Math.max(1.035, design.motion.mediaZoom), y: -4, x: horizontal * 3 };
  if (preset === "gridPulse") return { scale: Math.max(1.03, design.motion.mediaZoom), y: -6 };
  if (preset === "spotlightReveal") return { scale: Math.max(1.04, design.motion.mediaZoom), y: -8, rotateZ: horizontal * 0.6 };
  if (preset === "elasticRise") return { scale: Math.max(1.03, design.motion.mediaZoom), y: -8 };
  if (preset === "softZoom") return { scale: Math.max(1.06, design.motion.mediaZoom) };
  if (preset === "showcaseLift") return { scale: Math.max(1.045, design.motion.mediaZoom), y: -10, x: horizontal * 2 };
  if (preset === "editorialSlide") return { scale: Math.max(1.03, design.motion.mediaZoom), x: horizontal * 4 };
  if (preset === "imageDrift") return { scale: Math.max(1.04, design.motion.mediaZoom), x: horizontal * 5, y: -4 };
  if (preset === "marqueeFlow") return { scale: Math.max(1.03, design.motion.mediaZoom), x: horizontal * 3, y: -3 };
  if (preset === "headlineSweep") return { scale: Math.max(1.038, design.motion.mediaZoom), x: horizontal * 6, y: -6 };
  if (preset === "kineticTicker") return { scale: Math.max(1.04, design.motion.mediaZoom), x: horizontal * 7, y: -4 };
  if (preset === "ribbonWave") return { scale: Math.max(1.036, design.motion.mediaZoom), x: horizontal * 4, y: -5 };
  if (preset === "depthFloat") return { scale: Math.max(1.042, design.motion.mediaZoom), y: -7, x: horizontal * 2 };
  if (preset === "cascadeZoom") return { scale: Math.max(1.055, design.motion.mediaZoom), y: -7 };
  if (preset === "spotlightParallax") return { scale: Math.max(1.05, design.motion.mediaZoom), y: -9, x: horizontal * 4, rotateZ: horizontal * 0.35 };
  if (preset === "driftLoop") return { scale: Math.max(1.05, design.motion.mediaZoom), y: -5, x: horizontal * 2 };
  return { scale: design.motion.mediaZoom, y: -Math.max(2, design.motion.hoverLift * 0.45) };
}

function loopAnimation(design: DesignGenome) {
  if (!design.motion.loop) return undefined;
  // Ambient loops are deliberately transform-only. Never loop opacity or
  // visibility, otherwise the generated storefront appears to fade forever.
  if (design.motion.preset === "cinematic" || design.motion.preset === "spotlightReveal") return { scale: [1, design.motion.mediaZoom, 1], y: [0, -4, 0] };
  if (design.motion.preset === "orbit") return { y: [0, -3, 0], rotate: [0, 1.2, 0], scale: [1, Math.min(design.motion.mediaZoom, 1.012), 1] };
  if (design.motion.preset === "glide") return { x: [0, 3, 0], y: [0, -2, 0], scale: [1, Math.min(design.motion.mediaZoom, 1.014), 1] };
  if (design.motion.preset === "parallaxSoft") return { y: [0, -6, 0], scale: [1, Math.min(design.motion.mediaZoom, 1.025), 1] };
  if (design.motion.preset === "imageDrift") return { x: [0, 5, -3, 0], y: [0, -3, 2, 0], scale: [1, Math.min(design.motion.mediaZoom, 1.03), 1] };
  if (design.motion.preset === "luxuryFlow") return { x: [0, 4, -2, 0], y: [0, -3, 0], scale: [1, Math.min(design.motion.mediaZoom, 1.026), 1] };
  if (design.motion.preset === "softZoom") return { scale: [1, Math.min(design.motion.mediaZoom, 1.04), 1], y: [0, -2, 0] };
  if (design.motion.preset === "kineticTicker") return { x: [0, 6, -3, 0], y: [0, -2, 0], scale: [1, Math.min(design.motion.mediaZoom, 1.026), 1] };
  if (design.motion.preset === "ribbonWave") return { x: [0, 3, -3, 0], y: [0, -4, 0], scale: [1, Math.min(design.motion.mediaZoom, 1.028), 1] };
  if (design.motion.preset === "depthFloat") return { y: [0, -5, 0], scale: [1, Math.min(design.motion.mediaZoom, 1.032), 1] };
  if (design.motion.preset === "cascadeZoom") return { scale: [1, Math.min(design.motion.mediaZoom, 1.045), 1], y: [0, -4, 0] };
  if (design.motion.preset === "spotlightParallax") return { x: [0, 4, -2, 0], y: [0, -6, 0], scale: [1, Math.min(design.motion.mediaZoom, 1.04), 1] };
  if (design.motion.preset === "marqueeFlow") return { x: [0, 4, -2, 0], y: [0, -2, 0], scale: [1, Math.min(design.motion.mediaZoom, 1.022), 1] };
  if (design.motion.preset === "headlineSweep") return { x: [0, 7, -4, 0], y: [0, -3, 0], scale: [1, Math.min(design.motion.mediaZoom, 1.028), 1] };
  if (design.motion.preset === "driftLoop") return { x: [0, 2, -2, 0], y: [0, -5, 0], scale: [1, Math.min(design.motion.mediaZoom, 1.04), 1] };
  return { y: [0, -3, 0], scale: [1, Math.min(design.motion.mediaZoom, 1.015), 1] };
}

function findScrollParent(node: HTMLElement | null): HTMLElement | Window {
  let current = node?.parentElement ?? null;
  while (current) {
    const style = window.getComputedStyle(current);
    const overflowY = style.overflowY;
    if ((overflowY === "auto" || overflowY === "scroll" || overflowY === "overlay") && current.scrollHeight > current.clientHeight) {
      return current;
    }
    current = current.parentElement;
  }
  return window;
}

function useAutoHideHeader() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const scroller = findScrollParent(node);
    const getScrollY = () => scroller === window ? window.scrollY : (scroller as HTMLElement).scrollTop;
    let lastY = getScrollY();
    let raf = 0;

    const update = () => {
      const currentY = getScrollY();
      const delta = currentY - lastY;

      if (currentY <= 28) {
        setHidden(false);
      } else if (Math.abs(delta) >= 8) {
        setHidden(delta > 0);
      }

      lastY = currentY;
      raf = 0;
    };

    const onScroll = () => {
      if (!raf) raf = window.requestAnimationFrame(update);
    };

    const target: Window | HTMLElement = scroller === window ? window : (scroller as HTMLElement);
    target.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      target.removeEventListener("scroll", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  return { ref, hidden };
}

export function StorefrontPreview({ design, compact = false, device = "desktop", page = "home" }: { design: DesignGenome; compact?: boolean; device?: Device; page?: StorePage }) {
  const d = getResponsiveDesign(design, device);
  const store = d.store;
  const mobile = device === "mobile";
  const tablet = device === "tablet";
  const sectionPad = mobile ? "48px" : tablet ? "clamp(48px,6vw,76px)" : d.layout.density === "airy" ? "clamp(70px,9vw,128px)" : d.layout.density === "compact" ? "clamp(38px,5vw,68px)" : "clamp(54px,7vw,92px)";
  const max = compact ? 920 : mobile ? 460 : tablet ? 980 : 1240;
  const headingSize = mobile
    ? d.typography.scale === "large" ? "clamp(2.35rem,12vw,3.65rem)" : d.typography.scale === "compact" ? "clamp(1.95rem,9.5vw,2.8rem)" : "clamp(2.15rem,10.5vw,3.2rem)"
    : d.typography.scale === "large" ? "clamp(3rem,7.6vw,7.8rem)" : d.typography.scale === "compact" ? "clamp(2.2rem,5vw,4.9rem)" : "clamp(2.6rem,6vw,6rem)";
  const transition = motionTransition(d);
  const cardBackground = `color-mix(in srgb, ${d.palette.surface} ${Math.round(100 - d.surfaces.glass * 25)}%, transparent)`;

  return (
    <CommerceProvider design={d}>
    <motion.div
      layout
      initial={false}
      animate={{ backgroundColor: d.palette.background, color: d.palette.text }}
      transition={{ duration: 0.45 }}
      className="sf-preview"
      data-device={device}
      data-interaction-density={d.interactionProfile?.density ?? "balanced"}
      data-button-behavior={d.interactionProfile?.buttonBehavior ?? "softPress"}
      data-nav-behavior={d.interactionProfile?.navBehavior ?? "slidingUnderline"}
      data-image-behavior={d.interactionProfile?.imageBehavior ?? "subtleZoom"}
      data-motion-language={d.motionLanguage?.name ?? "legacy"}
      style={{ minHeight: "100%", fontFamily: d.typographyPair?.bodyFamily ?? d.typography.body, overflow: "visible", lineHeight: d.typographyPair?.lineHeight ?? 1.5 }}
    >
      <ReferenceHeader design={d} max={max} compact={compact} mobile={mobile} cardBackground={cardBackground} />

      {page === "home" ? (
        <>
      <section className="sf-hero-section" style={{ maxWidth: max, margin: "0 auto", padding: `${compact ? 14 : 22}px ${compact ? "14px" : "28px"} 0` }}>
        {d.layout.hero === "centered" && (
          <HeroCentered design={d} headingSize={headingSize} transition={transition} />
        )}
        {d.layout.hero === "editorial" && (
          <HeroEditorial design={d} headingSize={headingSize} transition={transition} />
        )}
        {d.layout.hero === "product" && (
          <HeroProduct design={d} headingSize={headingSize} transition={transition} />
        )}
        {d.layout.hero === "immersive" && (
          <HeroImmersive design={d} headingSize={headingSize} transition={transition} />
        )}
        {d.layout.hero === "statement" && (
          <HeroStatement design={d} headingSize={headingSize} transition={transition} />
        )}
        {d.layout.hero === "hotspot" && (
          <HeroHotspot design={d} headingSize={headingSize} transition={transition} />
        )}
        {d.layout.hero === "campaign" && (
          <HeroCampaign design={d} headingSize={headingSize} transition={transition} />
        )}
        {d.layout.hero === "beautyEditorial" && (
          <HeroBeautyEditorial design={d} headingSize={headingSize} transition={transition} />
        )}
        {d.layout.hero === "showcase" && (
          <HeroShowcase design={d} headingSize={headingSize} transition={transition} />
        )}
        {d.layout.hero === "bento" && (
          <HeroBento design={d} headingSize={headingSize} transition={transition} />
        )}
        {d.layout.hero === "splitMedia" && (
          <HeroSplitMedia design={d} headingSize={headingSize} transition={transition} />
        )}
        {d.layout.hero === "minimalCommerce" && (
          <HeroMinimalCommerce design={d} headingSize={headingSize} transition={transition} />
        )}
        {d.layout.hero === "launch" && (
          <HeroLaunch design={d} headingSize={headingSize} transition={transition} />
        )}
        {d.layout.hero === "magazine" && (
          <HeroMagazine design={d} headingSize={headingSize} transition={transition} />
        )}
        {d.layout.hero === "fullBleedEditorial" && (
          <HeroFullBleedEditorial design={d} headingSize={headingSize} transition={transition} />
        )}
        {d.layout.hero === "dualCampaign" && (
          <HeroDualCampaign design={d} headingSize={headingSize} transition={transition} />
        )}
        {d.layout.hero === "floatingProducts" && (
          <HeroFloatingProducts design={d} headingSize={headingSize} transition={transition} />
        )}
        {d.layout.hero === "megaTypography" && (
          <HeroMegaTypography design={d} headingSize={headingSize} transition={transition} />
        )}
        {d.layout.hero === "imageCollage" && (
          <HeroImageCollage design={d} headingSize={headingSize} transition={transition} />
        )}
        {d.layout.hero === "collectionHero" && (
          <HeroCollection design={d} headingSize={headingSize} transition={transition} />
        )}
        {d.layout.hero === "cinematicProduct" && (
          <HeroCinematicProduct design={d} headingSize={headingSize} transition={transition} />
        )}
        {d.layout.hero === "split" && (
          <HeroSplit design={d} headingSize={headingSize} transition={transition} />
        )}
      </section>

      <GeneratedSections
        design={d}
        max={max}
        compact={compact}
        sectionPad={sectionPad}
        cardBackground={cardBackground}
        transition={transition}
        mobile={mobile}
      />

        </>
      ) : (
        <StorePageBody page={page} design={d} max={max} compact={compact} sectionPad={sectionPad} cardBackground={cardBackground} transition={transition} mobile={mobile} />
      )}

      <ReferenceFooter design={d} max={max} compact={compact} mobile={mobile} />
    </motion.div>
    </CommerceProvider>
  );
}


function StorePageBody({ page, design, max, compact, sectionPad, cardBackground, transition, mobile }: {
  page: Exclude<StorePage, "home">;
  design: DesignGenome;
  max: number;
  compact: boolean;
  sectionPad: string;
  cardBackground: string;
  transition: { duration: number; ease: [number, number, number, number] };
  mobile: boolean;
}) {
  if (page === "collection") return <CollectionPage design={design} max={max} compact={compact} sectionPad={sectionPad} cardBackground={cardBackground} transition={transition} mobile={mobile} />;
  if (page === "product") return <ProductDetailPage design={design} max={max} compact={compact} mobile={mobile} />;
  if (page === "search") return <SearchPage design={design} max={max} compact={compact} cardBackground={cardBackground} transition={transition} mobile={mobile} />;
  if (page === "cart") return <CartPage design={design} max={max} compact={compact} />;
  if (page === "about") return <AboutPage design={design} max={max} compact={compact} />;
  if (page === "contact") return <ContactPage design={design} max={max} compact={compact} />;
  return <StandaloneFAQPage design={design} max={max} compact={compact} />;
}

function PageIntro({ design, eyebrow, title, body }: { design: DesignGenome; eyebrow: string; title: string; body: string }) {
  return (
    <div className="mb-8 max-w-3xl">
      <div className="text-[10px] font-semibold uppercase tracking-[.22em]" style={{ color: design.palette.muted }}>{eyebrow}</div>
      <h1 className="mt-3 text-4xl font-semibold tracking-[-.055em] md:text-6xl" style={{ fontFamily: design.typography.heading }}>{title}</h1>
      <p className="mt-4 max-w-2xl text-sm leading-7 md:text-base" style={{ color: design.palette.muted }}>{body}</p>
    </div>
  );
}

function CollectionPage({ design, max, compact, sectionPad, cardBackground, transition, mobile }: { design: DesignGenome; max: number; compact: boolean; sectionPad: string; cardBackground: string; transition: { duration: number; ease: [number, number, number, number] }; mobile: boolean }) {
  const niche = design.store.nicheLabel ?? collectionHeadline(design.store.category);
  return (
    <main style={{ maxWidth: max, margin: "0 auto", padding: `${sectionPad} ${compact ? "16px" : "30px"}` }}>
      <PageIntro design={design} eyebrow="Collection" title={niche} body={`Browse the full ${niche.toLowerCase()} assortment with category-aware filters, product details and responsive merchandising.`} />
      <CategoryFilterBar design={design} mobile={mobile} />
      <ProductGrid design={design} cardBackground={cardBackground} transition={transition} mobile={mobile} />
    </main>
  );
}

function ProductDetailPage({ design, max, compact, mobile }: { design: DesignGenome; max: number; compact: boolean; mobile: boolean }) {
  const commerce = useCommerce();
  const product = design.store.products[0];
  const gallery = product?.gallery?.length ? product.gallery : product ? [product.image] : [];
  const [selectedImage, setSelectedImage] = useState(gallery[0] ?? design.store.heroImage);
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState(product?.colors?.[0]);

  useEffect(() => {
    setSelectedImage(gallery[0] ?? product?.image ?? design.store.heroImage);
    setQuantity(1);
    setColor(product?.colors?.[0]);
  }, [product?.name, gallery[0], design.store.heroImage]);

  if (!product) return null;
  return (
    <main style={{ maxWidth: max, margin: "0 auto", padding: `${compact ? "34px" : "64px"} ${compact ? "16px" : "30px"}` }}>
      <div className={`grid gap-8 ${mobile ? "" : "lg:grid-cols-[1.05fr_.95fr]"}`}>
        <div>
          <div className="overflow-hidden border" style={{ borderColor: design.palette.border, borderRadius: design.geometry.radius, background: design.palette.surface }}>
            <img src={selectedImage} alt={product.name} className={`${mobile ? "h-[430px]" : "h-[680px]"} w-full object-cover`} />
          </div>
          <div className="mt-3 grid grid-cols-4 gap-2">
            {gallery.slice(0, 4).map((image, index) => <button key={`${image}-${index}`} onClick={() => setSelectedImage(image)} className="overflow-hidden border" style={{ borderColor: selectedImage === image ? design.palette.text : design.palette.border, borderRadius: Math.max(8, design.geometry.radius - 10) }}><img src={image} alt={`${product.name} view ${index + 1}`} className="h-24 w-full object-cover" /></button>)}
          </div>
        </div>
        <div className={mobile ? "" : "lg:sticky lg:top-24 lg:self-start"}>
          <div className="text-[10px] uppercase tracking-[.2em]" style={{ color: design.palette.muted }}>{design.store.nicheLabel ?? design.store.category} · {product.tag}</div>
          <h1 className="mt-3 text-4xl font-semibold tracking-[-.055em] md:text-5xl" style={{ fontFamily: design.typography.heading }}>{product.name}</h1>
          <p className="mt-4 text-sm leading-7" style={{ color: design.palette.muted }}>{product.subtitle}</p>
          <div className="mt-5 flex items-center gap-3"><span className="text-2xl font-semibold">{product.price}</span>{product.compareAt ? <span className="text-sm line-through" style={{ color: design.palette.muted }}>{product.compareAt}</span> : null}</div>
          {product.rating ? <div className="mt-3 text-xs" style={{ color: design.palette.muted }}>★ {product.rating.toFixed(1)} · {product.reviewCount ?? 0} verified reviews</div> : null}
          {product.colors?.length ? <div className="mt-7"><div className="mb-2 text-[10px] font-semibold uppercase tracking-[.16em]">Color</div><div className="flex gap-2">{product.colors.map((swatch, index) => <button key={`${swatch}-${index}`} onClick={() => setColor(swatch)} aria-label={`Select color ${index + 1}`} className="h-9 w-9 rounded-full border-2" style={{ background: swatch, borderColor: color === swatch ? design.palette.text : design.palette.border }} />)}</div></div> : null}
          <div className="mt-7 flex items-center gap-3">
            <div className="flex items-center rounded-full border" style={{ borderColor: design.palette.border }}><button onClick={() => setQuantity((value) => Math.max(1, value - 1))} className="px-4 py-3">−</button><span className="min-w-8 text-center text-sm">{quantity}</span><button onClick={() => setQuantity((value) => value + 1)} className="px-4 py-3">+</button></div>
            <button onClick={() => commerce.addToCart(product, { quantity, color })} className="flex-1 rounded-full px-5 py-3.5 text-sm font-semibold" style={{ background: design.palette.primary, color: design.palette.primaryText }}>Add to cart</button>
            {design.commerce?.wishlist ? <button onClick={() => commerce.toggleWishlist(product)} className="rounded-full border p-3.5" style={{ borderColor: design.palette.border }} aria-label="Add to wishlist"><Heart size={17} fill={commerce.isWishlisted(product) ? "currentColor" : "none"} /></button> : null}
          </div>
          <div className="mt-8 border-t" style={{ borderColor: design.palette.border }}>
            {Object.entries(product.specs ?? { "Product type": design.store.nicheLabel ?? design.store.category, "Availability": "In stock", "Delivery": "Tracked delivery", "Returns": "Easy returns" }).map(([key, value]) => <div key={key} className="grid grid-cols-[.9fr_1.1fr] gap-4 border-b py-3 text-sm" style={{ borderColor: design.palette.border }}><span style={{ color: design.palette.muted }}>{key}</span><strong>{value}</strong></div>)}
          </div>
        </div>
      </div>
      <section className="mt-16 border-t pt-12" style={{ borderColor: design.palette.border }}><SectionHeader design={design} eyebrow="You may also like" title="Related products" action="View collection" /><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{design.store.products.slice(1, 4).map((item, index) => <ProductCard key={`${item.name}-${index}`} product={item} design={design} cardBackground={design.palette.surface} transition={motionTransition(design)} index={index} compact={mobile} />)}</div></section>
    </main>
  );
}

function SearchPage({ design, max, compact, cardBackground, transition, mobile }: { design: DesignGenome; max: number; compact: boolean; cardBackground: string; transition: { duration: number; ease: [number, number, number, number] }; mobile: boolean }) {
  const [query, setQuery] = useState("");
  const normalized = query.trim().toLowerCase();
  const results = normalized ? design.store.products.filter((product) => `${product.name} ${product.subtitle} ${product.tag}`.toLowerCase().includes(normalized)) : design.store.products;
  return (
    <main style={{ maxWidth: max, margin: "0 auto", padding: `${compact ? "34px" : "64px"} ${compact ? "16px" : "30px"}` }}>
      <PageIntro design={design} eyebrow="Search" title="Find exactly what you need" body={`Search across ${design.store.nicheLabel ?? design.store.category} products, collections and product details.`} />
      <div className="mb-8 flex items-center gap-3 rounded-full border px-5 py-3.5" style={{ borderColor: design.palette.border, background: design.palette.surface }}><Search size={18} style={{ color: design.palette.muted }} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={`Search ${design.store.nicheLabel ?? design.store.category}…`} className="min-w-0 flex-1 bg-transparent text-sm outline-none" /></div>
      <div className="mb-5 text-xs" style={{ color: design.palette.muted }}>{results.length} result{results.length === 1 ? "" : "s"}</div>
      {results.length === design.store.products.length ? <ProductGrid design={design} cardBackground={cardBackground} transition={transition} mobile={mobile} /> : <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{results.map((product, index) => <ProductCard key={`${product.name}-${index}`} product={product} design={design} cardBackground={cardBackground} transition={transition} index={index} compact={mobile} />)}</div>}
      {!results.length ? <div className="rounded-2xl border p-10 text-center text-sm" style={{ borderColor: design.palette.border, color: design.palette.muted }}>No products matched “{query}”. Try another keyword.</div> : null}
    </main>
  );
}

function CartPage({ design, max, compact }: { design: DesignGenome; max: number; compact: boolean }) {
  const commerce = useCommerce();
  const subtotal = commerce.cart.reduce((sum, item) => sum + (parsePriceAmount(item.product.price) ?? 0) * item.quantity, 0);
  return (
    <main style={{ maxWidth: max, margin: "0 auto", padding: `${compact ? "34px" : "64px"} ${compact ? "16px" : "30px"}` }}>
      <PageIntro design={design} eyebrow="Cart" title={commerce.cart.length ? "Your cart" : "Your cart is ready for something good"} body={commerce.cart.length ? "Review quantities and selected options before checkout." : "Add products from the generated storefront to test the complete commerce flow."} />
      {commerce.cart.length ? <div className="grid gap-8 lg:grid-cols-[1fr_360px]"><div className="space-y-3">{commerce.cart.map((item) => <div key={item.id} className="flex gap-4 rounded-2xl border p-3" style={{ borderColor: design.palette.border, background: design.palette.surface }}><img src={item.product.image} alt={item.product.name} className="h-28 w-24 rounded-xl object-cover" /><div className="min-w-0 flex-1"><div className="font-semibold">{item.product.name}</div><div className="mt-1 text-xs" style={{ color: design.palette.muted }}>{item.color ? `Color ${item.color}` : item.product.subtitle}</div><div className="mt-4 flex items-center gap-2"><button onClick={() => commerce.setCartQuantity(item.id, item.quantity - 1)} className="rounded-full border px-3 py-1" style={{ borderColor: design.palette.border }}>−</button><span className="text-sm">{item.quantity}</span><button onClick={() => commerce.setCartQuantity(item.id, item.quantity + 1)} className="rounded-full border px-3 py-1" style={{ borderColor: design.palette.border }}>+</button><button onClick={() => commerce.removeFromCart(item.id)} className="ml-auto text-xs" style={{ color: design.palette.muted }}>Remove</button></div></div><div className="font-semibold">{item.product.price}</div></div>)}</div><aside className="h-fit rounded-2xl border p-5" style={{ borderColor: design.palette.border, background: design.palette.surface }}><div className="flex justify-between text-sm"><span style={{ color: design.palette.muted }}>Subtotal</span><strong>{formatPriceLike(design.store.products[0]?.price ?? "$0", subtotal)}</strong></div><div className="mt-3 flex justify-between text-sm"><span style={{ color: design.palette.muted }}>Shipping</span><span>Calculated at checkout</span></div><button className="mt-6 w-full rounded-full px-5 py-3.5 text-sm font-semibold" style={{ background: design.palette.primary, color: design.palette.primaryText }}>Continue to checkout</button></aside></div> : <div><button onClick={() => design.store.products[0] && commerce.addToCart(design.store.products[0])} className="rounded-full px-5 py-3 text-sm font-semibold" style={{ background: design.palette.primary, color: design.palette.primaryText }}>Add featured product</button></div>}
    </main>
  );
}

function AboutPage({ design, max, compact }: { design: DesignGenome; max: number; compact: boolean }) {
  return <main style={{ maxWidth: max, margin: "0 auto", padding: `${compact ? "34px" : "70px"} ${compact ? "16px" : "30px"}` }}><PageIntro design={design} eyebrow="About" title={`The story behind ${design.store.brandName}`} body={design.store.promoBody} /><div className="grid gap-5 md:grid-cols-2"><img src={design.store.secondaryImage} alt={`${design.store.brandName} story`} className="h-[420px] w-full object-cover" style={{ borderRadius: design.geometry.radius }} /><div className="flex flex-col justify-center rounded-3xl border p-8" style={{ borderColor: design.palette.border, background: design.palette.surface }}><div className="text-[10px] uppercase tracking-[.2em]" style={{ color: design.palette.muted }}>Our approach</div><h2 className="mt-4 text-3xl font-semibold tracking-[-.05em]" style={{ fontFamily: design.typography.heading }}>{design.store.promoTitle}</h2><p className="mt-4 text-sm leading-7" style={{ color: design.palette.muted }}>{design.store.heroBody} Every generated page inherits the same design tokens, merchandising language and responsive behavior.</p></div></div></main>;
}

function ContactPage({ design, max, compact }: { design: DesignGenome; max: number; compact: boolean }) {
  return <main style={{ maxWidth: max, margin: "0 auto", padding: `${compact ? "34px" : "64px"} ${compact ? "16px" : "30px"}` }}><PageIntro design={design} eyebrow="Contact" title="How can we help?" body="A generated support page that inherits your storefront typography, colors and customer-service tone." /><div className="grid gap-6 md:grid-cols-[.8fr_1.2fr]"><div className="space-y-3">{["Order support", "Product questions", "Returns & exchanges"].map((item) => <div key={item} className="rounded-2xl border p-5" style={{ borderColor: design.palette.border, background: design.palette.surface }}><div className="font-semibold">{item}</div><div className="mt-1 text-xs" style={{ color: design.palette.muted }}>We usually reply within one business day.</div></div>)}</div><form className="rounded-2xl border p-5" style={{ borderColor: design.palette.border, background: design.palette.surface }} onSubmit={(event) => event.preventDefault()}><div className="grid gap-3 sm:grid-cols-2"><input aria-label="Name" placeholder="Name" className="rounded-xl border bg-transparent px-4 py-3 text-sm outline-none" style={{ borderColor: design.palette.border }} /><input aria-label="Email" placeholder="Email" className="rounded-xl border bg-transparent px-4 py-3 text-sm outline-none" style={{ borderColor: design.palette.border }} /></div><textarea aria-label="Message" placeholder="Tell us how we can help" className="mt-3 h-36 w-full resize-none rounded-xl border bg-transparent px-4 py-3 text-sm outline-none" style={{ borderColor: design.palette.border }} /><button className="mt-3 rounded-full px-5 py-3 text-sm font-semibold" style={{ background: design.palette.primary, color: design.palette.primaryText }}>Send message</button></form></div></main>;
}

function StandaloneFAQPage({ design, max, compact }: { design: DesignGenome; max: number; compact: boolean }) {
  const questions = [
    ["How quickly will my order ship?", "In-stock products are prepared quickly and include tracking once dispatched."],
    ["Can I change or return an order?", "Eligible products can be returned or exchanged according to the store policy shown at checkout."],
    ["How do I choose the right product?", `Use the generated ${design.store.nicheLabel ?? design.store.category} filters, specifications and comparison tools to narrow the options.`],
    ["Where can I find product specifications?", "Open any product detail page to view dimensions, compatibility, materials, care and other category-specific specs."],
  ];
  return <main style={{ maxWidth: max, margin: "0 auto", padding: `${compact ? "34px" : "64px"} ${compact ? "16px" : "30px"}` }}><PageIntro design={design} eyebrow="FAQ" title="Questions, answered" body="A complete help page generated in the same visual system as the storefront." /><div className="max-w-3xl divide-y" style={{ borderColor: design.palette.border }}>{questions.map(([question, answer]) => <details key={question} className="group py-5"><summary className="cursor-pointer list-none text-base font-semibold">{question}</summary><p className="mt-3 text-sm leading-7" style={{ color: design.palette.muted }}>{answer}</p></details>)}</div></main>;
}


function GeneratedSections({ design, max, compact, sectionPad, cardBackground, transition, mobile }: {
  design: DesignGenome;
  max: number;
  compact: boolean;
  sectionPad: string;
  cardBackground: string;
  transition: { duration: number; ease: [number, number, number, number] };
  mobile: boolean;
}) {
  const sourceSections = design.sections?.length ? design.sections : [
    { id: "fallback-collections", type: "collections", variant: "clean" },
    { id: "fallback-products", type: "products", variant: "cards" },
    { id: "fallback-story", type: "story", variant: "split" },
  ] as SectionSpec[];
  const sections = sourceSections.filter((section) => !section.hidden && !(mobile && section.mobileHidden));

  return (
    <>
      {sections.map((section, index) => {
        let content: React.ReactNode = null;
        const intelligentSecondary = design.composition && ["collections", "story", "testimonials", "faq", "newsletter", "features", "campaign", "comparison", "socialProof"].includes(section.type);
        if (intelligentSecondary) content = <IntelligentSectionRenderer design={design} section={section} index={index} max={max} compact={compact} mobile={mobile} />;
        if (!content && section.type === "collections") content = <CollectionsSection design={design} section={section} index={index} max={max} compact={compact} />;
        if (!content && section.type === "products") content = <ProductsSection design={design} section={section} index={index} max={max} compact={compact} sectionPad={sectionPad} cardBackground={cardBackground} transition={transition} mobile={mobile} />;
        if (!content && section.type === "story") content = <StorySection design={design} section={section} index={index} max={max} compact={compact} cardBackground={cardBackground} mobile={mobile} />;
        if (!content && section.type === "testimonials") content = <TestimonialsSection design={design} section={section} index={index} max={max} compact={compact} cardBackground={cardBackground} mobile={mobile} />;
        if (!content && section.type === "faq") content = <FAQSection design={design} section={section} index={index} max={max} compact={compact} />;
        if (!content && section.type === "newsletter") content = <NewsletterSection design={design} section={section} index={index} max={max} compact={compact} cardBackground={cardBackground} mobile={mobile} />;
        if (!content && section.type === "features") content = <FeaturesSection design={design} section={section} index={index} max={max} compact={compact} mobile={mobile} />;
        if (!content && section.type === "quote") content = <QuoteSection design={design} section={section} index={index} max={max} compact={compact} />;
        if (!content && section.type === "campaign") content = <CampaignSection design={design} section={section} index={index} max={max} compact={compact} mobile={mobile} />;
        if (!content && section.type === "comparison") content = <ComparisonSection design={design} section={section} index={index} max={max} compact={compact} mobile={mobile} />;
        if (!content && section.type === "socialProof") content = <SocialProofSection design={design} section={section} index={index} max={max} compact={compact} />;
        if (!content && section.type === "videoStory") content = <VideoStorySection design={design} section={section} index={index} max={max} compact={compact} mobile={mobile} />;
        if (!content) return null;
        const spacing = section.spacing === "airy" ? 28 : section.spacing === "compact" ? 6 : 14;
        return <div key={section.id} data-generated-section={section.type} style={{ marginTop: spacing, textAlign: section.alignment ?? "left" }}>{content}</div>;
      })}
    </>
  );
}

function CollectionsSection({ design, section, index, max, compact }: { design: DesignGenome; section: SectionSpec; index: number; max: number; compact: boolean }) {
  return (
    <motion.section {...sectionReveal(design, index + 1)} className="sf-categories-section" style={{ background: design.palette.surface, borderTop: `1px solid ${design.palette.border}`, borderBottom: `1px solid ${design.palette.border}` }}>
      <div style={{ maxWidth: max, margin: "0 auto", padding: `${compact ? "28px" : "38px"} ${compact ? "16px" : "30px"}` }}>
        <SectionHeader design={design} eyebrow={section.eyebrow ?? "Shop by collection"} title={section.title ?? collectionHeadline(design.store.category)} action="Explore all" />
        <CollectionStrip design={design} />
      </div>
    </motion.section>
  );
}

function ProductsSection({ design, section, index, max, compact, sectionPad, cardBackground, transition, mobile }: { design: DesignGenome; section: SectionSpec; index: number; max: number; compact: boolean; sectionPad: string; cardBackground: string; transition: { duration: number; ease: [number, number, number, number] }; mobile: boolean }) {
  return (
    <motion.section {...sectionReveal(design, index + 1)} className="sf-products-section" style={{ maxWidth: max, margin: "0 auto", padding: `${sectionPad} ${compact ? "16px" : "30px"}` }}>
      <SectionHeader design={design} eyebrow={section.eyebrow ?? productEyebrow(design.store.category)} title={section.title ?? productHeadline(design.store.category)} action="Browse products" />
      <CategoryFilterBar design={design} mobile={mobile} />
      <ProductGrid design={design} cardBackground={cardBackground} transition={transition} mobile={mobile} />
    </motion.section>
  );
}

function CategoryFilterBar({ design, mobile }: { design: DesignGenome; mobile: boolean }) {
  const groups = design.store.filters ?? [];
  const [selected, setSelected] = useState<Record<string, string>>({});
  if (!groups.length) return null;
  return (
    <div className={`mb-6 flex ${mobile ? "gap-2 overflow-x-auto pb-1" : "flex-wrap gap-2"}`}>
      {groups.map((group) => {
        const value = selected[group.label];
        return (
          <label key={group.label} className="shrink-0">
            <span className="sr-only">{group.label}</span>
            <select
              value={value ?? ""}
              onChange={(event) => setSelected((current) => ({ ...current, [group.label]: event.target.value }))}
              className="rounded-full border px-4 py-2.5 text-xs font-medium outline-none"
              style={{ borderColor: design.palette.border, background: design.palette.surface, color: design.palette.text }}
            >
              <option value="">{group.label}</option>
              {group.options.map((option) => <option key={`${group.label}-${option}`} value={option}>{option}</option>)}
            </select>
          </label>
        );
      })}
      {Object.values(selected).some(Boolean) ? (
        <button type="button" onClick={() => setSelected({})} className="shrink-0 rounded-full border px-4 py-2.5 text-xs" style={{ borderColor: design.palette.border, color: design.palette.muted }}>Clear filters</button>
      ) : null}
    </div>
  );
}

function StorySection({ design, section, index, max, compact, cardBackground, mobile }: { design: DesignGenome; section: SectionSpec; index: number; max: number; compact: boolean; cardBackground: string; mobile: boolean }) {
  return (
    <motion.section {...sectionReveal(design, index + 1)} className="sf-story-section" style={{ borderTop: `1px solid ${design.palette.border}`, borderBottom: `1px solid ${design.palette.border}`, background: design.palette.surface }}>
      <div style={{ maxWidth: max, margin: "0 auto", padding: `${compact ? "20px" : "30px"}` }}>
        <div className={`sf-story-grid grid overflow-hidden ${mobile ? "grid-cols-1" : section.variant === "editorial" ? "md:grid-cols-[.8fr_1.2fr]" : "md:grid-cols-[1.05fr_.95fr]"}`} style={{ borderRadius: design.geometry.radius, background: cardBackground, border: `1px solid ${design.palette.border}`, boxShadow: shadow[design.surfaces.shadow] }}>
          <motion.img whileHover={{ scale: design.motion.mediaZoom }} transition={motionTransition(design)} src={design.store.secondaryImage} alt={`${design.store.brandName} story`} className="sf-story-image h-full min-h-[300px] w-full object-cover" />
          <div className="sf-story-copy flex flex-col justify-center p-7 md:p-12">
            <div className="mb-3 text-[10px] uppercase tracking-[.22em]" style={{ color: design.palette.accent }}>{section.eyebrow ?? "Editorial feature"}</div>
            <h3 style={{ fontFamily: design.typography.heading, fontWeight: design.typography.headingWeight, letterSpacing: `${design.typography.headingTracking}em`, fontSize: "clamp(2rem,3vw,3.4rem)" }}>{section.title ?? design.store.promoTitle}</h3>
            <p className="mt-5 max-w-lg text-sm leading-7" style={{ color: design.palette.muted }}>{design.store.promoBody}</p>
            <button className="mt-7 w-fit px-5 py-3 text-sm font-semibold" style={{ background: design.palette.primary, color: design.palette.primaryText, borderRadius: design.geometry.buttonRadius }}>Read the story</button>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

function TestimonialsSection({ design, section, index, max, compact, cardBackground, mobile }: { design: DesignGenome; section: SectionSpec; index: number; max: number; compact: boolean; cardBackground: string; mobile: boolean }) {
  const quotes = testimonialCopy(design.store.category);
  return (
    <motion.section {...sectionReveal(design, index + 1)} style={{ maxWidth: max, margin: "0 auto", padding: `${compact ? "42px" : "72px"} ${compact ? "16px" : "30px"}` }}>
      <SectionHeader design={design} eyebrow={section.eyebrow ?? "Customer notes"} title={section.title ?? "Why people keep coming back"} />
      <div className={`sf-testimonials-grid grid gap-4 ${mobile ? "grid-cols-1" : "md:grid-cols-3"}`}>
        {quotes.map((quote, i) => (
          <motion.blockquote key={quote.name} {...sectionReveal(design, i)} whileHover={hoverAnimation(design)} className="p-6" style={{ background: cardBackground, border: `1px solid ${design.palette.border}`, borderRadius: design.geometry.radius, boxShadow: shadow[design.surfaces.shadow] }}>
            <div className="text-lg tracking-[.1em]" style={{ color: design.palette.accent }}>★★★★★</div>
            <p className="mt-5 text-sm leading-7">“{quote.quote}”</p>
            <footer className="mt-6 text-xs font-semibold" style={{ color: design.palette.muted }}>{quote.name} · {quote.detail}</footer>
          </motion.blockquote>
        ))}
      </div>
    </motion.section>
  );
}

function FAQSection({ design, section, index, max, compact }: { design: DesignGenome; section: SectionSpec; index: number; max: number; compact: boolean }) {
  const faq = faqCopy(design.store.category);
  return (
    <motion.section {...sectionReveal(design, index + 1)} style={{ background: design.palette.surface, borderTop: `1px solid ${design.palette.border}`, borderBottom: `1px solid ${design.palette.border}` }}>
      <div style={{ maxWidth: max, margin: "0 auto", padding: `${compact ? "44px" : "76px"} ${compact ? "16px" : "30px"}` }}>
        <SectionHeader design={design} eyebrow={section.eyebrow ?? "Good to know"} title={section.title ?? "Frequently asked questions"} />
        <div className="mx-auto max-w-4xl divide-y" style={{ borderColor: design.palette.border }}>
          {faq.map((item, i) => (
            <motion.details key={item.q} {...sectionReveal(design, i)} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-base font-semibold"><span>{item.q}</span><span className="text-xl opacity-50 transition group-open:rotate-45">+</span></summary>
              <p className="mt-3 max-w-2xl text-sm leading-7" style={{ color: design.palette.muted }}>{item.a}</p>
            </motion.details>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

function NewsletterSection({ design, section, index, max, compact, cardBackground, mobile }: { design: DesignGenome; section: SectionSpec; index: number; max: number; compact: boolean; cardBackground: string; mobile: boolean }) {
  return (
    <motion.section {...sectionReveal(design, index + 1)} style={{ maxWidth: max, margin: "0 auto", padding: `${compact ? "44px" : "72px"} ${compact ? "16px" : "30px"}` }}>
      <div className={`sf-newsletter-card grid items-center gap-6 p-6 ${mobile ? "grid-cols-1" : "md:grid-cols-[1fr_.9fr] md:p-10"}`} style={{ background: cardBackground, border: `1px solid ${design.palette.border}`, borderRadius: design.geometry.radius, boxShadow: shadow[design.surfaces.shadow] }}>
        <div>
          <div className="text-[10px] uppercase tracking-[.22em]" style={{ color: design.palette.accent }}>{section.eyebrow ?? "Stay connected"}</div>
          <h3 className="sf-newsletter-title mt-3" style={{ fontFamily: design.typography.heading, fontWeight: design.typography.headingWeight, letterSpacing: `${design.typography.headingTracking}em`, fontSize: "clamp(2rem,3.5vw,3.8rem)" }}>{section.title ?? "New drops, useful stories, no clutter."}</h3>
        </div>
        <div className={`sf-newsletter-form flex flex-col gap-3 ${mobile ? "" : "sm:flex-row"}`}>
          <div className="min-w-0 flex-1 rounded-full border px-5 py-4 text-sm" style={{ borderColor: design.palette.border, color: design.palette.muted }}>Email address</div>
          <button className="px-6 py-4 text-sm font-semibold" style={{ borderRadius: design.geometry.buttonRadius, background: design.palette.primary, color: design.palette.primaryText }}>Subscribe</button>
        </div>
      </div>
    </motion.section>
  );
}

function FeaturesSection({ design, section, index, max, compact, mobile }: { design: DesignGenome; section: SectionSpec; index: number; max: number; compact: boolean; mobile: boolean }) {
  const items = [
    ["Fast dispatch", "In-stock orders move quickly with clear delivery expectations."],
    ["Easy returns", "Simple policies reduce friction after purchase."],
    ["Secure checkout", "Modern checkout cues keep the buying experience focused."],
    ["Real support", "Help is easy to find without interrupting product discovery."],
  ];
  return <motion.section {...sectionReveal(design,index+1)} style={{maxWidth:max,margin:"0 auto",padding:`${compact?"36px":"62px"} ${compact?"16px":"30px"}`}}><SectionHeader design={design} eyebrow={section.eyebrow??"Store benefits"} title={section.title??"A better shopping experience, without the clutter."}/><div className={`grid gap-3 ${mobile?"grid-cols-1":"md:grid-cols-4"}`}>{items.map(([title,body],i)=><motion.div key={title} whileHover={hoverAnimation(design)} className="p-5" style={{border:`1px solid ${design.palette.border}`,borderRadius:design.geometry.radius,background:design.palette.surface}}><div className="text-[10px] uppercase tracking-[.18em]" style={{color:design.palette.accent}}>0{i+1}</div><div className="mt-4 text-lg font-semibold">{title}</div><p className="mt-2 text-xs leading-6" style={{color:design.palette.muted}}>{body}</p></motion.div>)}</div></motion.section>;
}

function QuoteSection({ design, section, index, max, compact }: { design: DesignGenome; section: SectionSpec; index: number; max: number; compact: boolean }) {
  return <motion.section {...sectionReveal(design,index+1)} style={{background:design.palette.text,color:design.palette.primaryText}}><div className="mx-auto text-center" style={{maxWidth:max,padding:`${compact?"54px":"96px"} ${compact?"18px":"36px"}`}}><div className="text-[10px] uppercase tracking-[.24em] opacity-55">{section.eyebrow??"Point of view"}</div><blockquote className="mx-auto mt-6 max-w-5xl" style={{fontFamily:design.typography.heading,fontSize:"clamp(2.2rem,5vw,5.4rem)",fontWeight:design.typography.headingWeight,lineHeight:1,letterSpacing:`${design.typography.headingTracking}em`}}>“Good commerce should make the product feel inevitable, not overwhelming.”</blockquote><div className="mt-6 text-xs opacity-55">{design.store.brandName} / Design principle</div></div></motion.section>;
}

function CampaignSection({ design, section, index, max, compact, mobile }: { design: DesignGenome; section: SectionSpec; index: number; max: number; compact: boolean; mobile: boolean }) {
  return <motion.section {...sectionReveal(design,index+1)} style={{maxWidth:max,margin:"0 auto",padding:`${compact?"32px":"56px"} ${compact?"16px":"30px"}`}}><div className={`relative overflow-hidden ${mobile?"min-h-[520px]":"min-h-[620px]"}`} style={{borderRadius:design.geometry.radius}}><img src={design.store.secondaryImage} alt="campaign" className="absolute inset-0 h-full w-full object-cover"/><div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/25 to-transparent"/><div className="absolute inset-0 flex items-end p-7 text-white md:p-10"><div className="max-w-xl"><div className="text-[10px] uppercase tracking-[.2em] text-white/60">{section.eyebrow??"Limited campaign"}</div><div className="mt-3 text-4xl font-semibold tracking-[-.05em] md:text-6xl">{design.store.promoTitle}</div><p className="mt-4 text-sm leading-7 text-white/70">{design.store.promoBody}</p><button className="mt-6 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black">Shop the campaign</button></div></div></div></motion.section>;
}

function ComparisonSection({ design, section, index, max, compact, mobile }: { design: DesignGenome; section: SectionSpec; index: number; max: number; compact: boolean; mobile: boolean }) {
  const products=design.store.products.slice(0,3);
  return <motion.section {...sectionReveal(design,index+1)} style={{maxWidth:max,margin:"0 auto",padding:`${compact?"40px":"70px"} ${compact?"16px":"30px"}`}}><SectionHeader design={design} eyebrow={section.eyebrow??"Compare"} title={section.title??"Choose the product that fits the moment."}/><div className={`grid gap-3 ${mobile?"grid-cols-1":"md:grid-cols-3"}`}>{products.map((p,i)=><div key={`${p.name}-${i}`} className="overflow-hidden border" style={{borderColor:design.palette.border,borderRadius:design.geometry.radius,background:design.palette.surface}}><img src={p.image} alt={p.name} className="h-[240px] w-full object-cover"/><div className="p-5"><div className="text-[10px] uppercase tracking-[.18em]" style={{color:design.palette.muted}}>{p.tag}</div><div className="mt-2 text-xl font-semibold">{p.name}</div><div className="mt-3 text-sm" style={{color:design.palette.muted}}>{p.subtitle}</div><div className="mt-5 border-t pt-4" style={{borderColor:design.palette.border}}><PriceBlock design={design} product={p} index={i}/></div></div></div>)}</div></motion.section>;
}

function SocialProofSection({ design, section, index, max, compact }: { design: DesignGenome; section: SectionSpec; index: number; max: number; compact: boolean }) {
  const imgs=[design.store.heroImage,design.store.secondaryImage,...design.store.products.map(p=>p.image)].slice(0,6);
  return <motion.section {...sectionReveal(design,index+1)} style={{background:design.palette.surface,borderTop:`1px solid ${design.palette.border}`,borderBottom:`1px solid ${design.palette.border}`}}><div style={{maxWidth:max,margin:"0 auto",padding:`${compact?"38px":"68px"} ${compact?"16px":"30px"}`}}><SectionHeader design={design} eyebrow={section.eyebrow??"Community"} title={section.title??"Seen, styled and shared."} action="Follow us"/><div className="grid grid-cols-3 gap-2 md:grid-cols-6">{imgs.map((img,i)=><motion.img whileHover={{scale:1.025}} key={i} src={img} alt="community" className="aspect-square w-full object-cover" style={{borderRadius:Math.max(8,design.geometry.radius-10)}}/>)}</div></div></motion.section>;
}

function VideoStorySection({ design, section, index, max, compact, mobile }: { design: DesignGenome; section: SectionSpec; index: number; max: number; compact: boolean; mobile: boolean }) {
  return <motion.section {...sectionReveal(design,index+1)} style={{maxWidth:max,margin:"0 auto",padding:`${compact?"36px":"64px"} ${compact?"16px":"30px"}`}}><div className={`relative overflow-hidden ${mobile?"min-h-[480px]":"min-h-[650px]"}`} style={{borderRadius:design.geometry.radius,background:design.palette.text}}>{design.store.heroVideoUrl?<video src={design.store.heroVideoUrl} poster={design.store.heroImage} muted loop playsInline autoPlay className="absolute inset-0 h-full w-full object-cover opacity-75"/>:<img src={design.store.heroImage} alt="motion story" className="absolute inset-0 h-full w-full object-cover opacity-75"/>}<div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/10"/><div className="absolute inset-x-0 bottom-0 p-7 text-white md:p-10"><div className="text-[10px] uppercase tracking-[.2em] text-white/55">{section.eyebrow??"In motion"}</div><div className="mt-3 max-w-3xl text-4xl font-semibold tracking-[-.05em] md:text-6xl">A product story that moves with the brand.</div><button className="mt-6 rounded-full border border-white/35 px-5 py-3 text-sm font-semibold">Explore story</button></div></div></motion.section>;
}

function SectionHeader({ design, eyebrow, title, action }: { design: DesignGenome; eyebrow: string; title: string; action?: string }) {
  const sectionHeadingSize = design.typography.scale === "large"
    ? "clamp(2.2rem,4.4vw,4.25rem)"
    : design.typography.scale === "compact"
      ? "clamp(1.75rem,3.4vw,3.15rem)"
      : "clamp(2rem,4vw,3.7rem)";
  return (
    <div className="sf-section-head mb-8 flex items-end justify-between gap-5">
      <div>
        <div className="mb-2 text-[11px] font-semibold uppercase tracking-[.24em]" style={{ color: design.palette.muted }}>{eyebrow}</div>
        <h2 className="sf-section-title" style={{ fontFamily: design.typography.heading, fontWeight: design.typography.headingWeight, letterSpacing: `${design.typography.headingTracking}em`, fontSize: sectionHeadingSize, lineHeight: 0.94 }}>{title}</h2>
      </div>
      {action ? <button className="sf-view-all hidden items-center gap-2 text-xs md:flex" style={{ color: design.palette.muted }}>{action} <ArrowRight size={14} /></button> : null}
    </div>
  );
}

function productEyebrow(category: DesignGenome["store"]["category"]) {
  if (category === "fashion") return "Latest arrivals";
  if (category === "home") return "Curated essentials";
  if (category === "beauty") return "Editor favourites";
  if (category === "kids") return "Playtime picks";
  if (category === "tech") return "Top devices";
  return "Featured products";
}

function testimonialCopy(category: DesignGenome["store"]["category"]) {
  const categoryLine: Record<DesignGenome["store"]["category"], string> = {
    fashion: "The styling feels elevated without becoming hard to wear.",
    shoes: "The fit feels considered and the product pages make choosing simple.",
    accessories: "The details feel premium and the edit is easy to understand.",
    home: "Everything feels calm, useful and intentionally curated.",
    beauty: "The routine is clear and the product story feels genuinely helpful.",
    food: "The flavors are easy to compare and the bundles make sense immediately.",
    outdoor: "The technical information is easy to scan without losing the lifestyle feel.",
    kids: "It feels playful for kids and straightforward for parents.",
    tech: "Specs, prices and compatibility are much easier to compare here.",
  };
  return [
    { name: "Alex R.", detail: "Verified customer", quote: categoryLine[category] },
    { name: "Mika S.", detail: "Returning customer", quote: "I found what I needed quickly, and the presentation made the products feel trustworthy." },
    { name: "Jordan L.", detail: "Recent order", quote: "The store feels polished, fast and focused. Nothing gets in the way of the products." },
  ];
}

function faqCopy(category: DesignGenome["store"]["category"]) {
  const productWord = category === "tech" ? "devices" : category === "food" ? "items" : category === "home" ? "pieces" : "products";
  return [
    { q: `How quickly do ${productWord} ship?`, a: "Most in-stock orders are prepared within 1–2 business days. Delivery timing can vary by region and product type." },
    { q: "Can I change or cancel an order?", a: "Changes are usually possible before fulfillment begins. The interface keeps support and order details easy to find." },
    { q: "What is the return policy?", a: "Eligible items can be returned within the stated return window, subject to condition and category-specific exclusions." },
    { q: "How do I choose the right option?", a: "Use the collection filters, product details and comparison cues throughout the storefront. The generated layout is designed to reduce decision friction." },
  ];
}

function ReferenceHeader({ design, max, compact, mobile, cardBackground }: { design: DesignGenome; max: number; compact: boolean; mobile: boolean; cardBackground: string }) {
  const { ref, hidden } = useAutoHideHeader();
  const store = design.store;
  const rawVariant = design.layout.nav;
  const variant = rawVariant === "pillNav" ? "floating" : rawVariant === "brandMarquee" ? "promoHeavy" : rawVariant === "dualRowPromo" ? "stacked" : rawVariant;
  const promoText = store.announcement || defaultPromo(store.category);
  const utilityText = utilityLine(store.category);
  const leftNav = store.navItems.slice(0, Math.min(5, store.navItems.length));
  const rightNav = extraHeaderLinks(store.category);
  const shellPadding = compact ? "12px 12px 0" : variant === "minimal" ? "14px 28px 0" : "18px 28px 0";
  const rounded = ["floating", "searchFirst", "transparent", "compactSticky", "promoHeavy"].includes(variant) || rawVariant === "pillNav" || mobile;
  const dark = variant === "transparent";
  const editorialMinimal = store.category === "fashion" || store.brandName === "RITUAL";
  const headerBackground = dark
    ? `color-mix(in srgb, ${design.palette.primary} 90%, #050505)`
    : cardBackground;
  const headerColor = dark ? design.palette.primaryText : design.palette.text;
  const headerMuted = dark ? "rgba(255,255,255,.64)" : design.palette.muted;

  return (
    <div
      ref={ref}
      className="sf-nav-shell"
      style={{
        maxWidth: max,
        margin: "0 auto",
        padding: shellPadding,
        position: "sticky",
        top: mobile ? 0 : 8,
        zIndex: 45,
      }}
    >
      <motion.div
        animate={{ y: hidden ? -112 : 0, opacity: 1 }}
        transition={{ duration: Math.max(0.22, design.motion.duration * 0.78), ease: [0.22, 1, 0.36, 1] }}
        className={`sf-nav overflow-hidden sf-header-${variant}`}
        data-header-variant={variant}
        style={{
          borderRadius: rounded ? design.geometry.radius : variant === "editorial" ? Math.max(8, design.geometry.radius * 0.45) : 0,
          border: `1px solid ${dark ? "rgba(255,255,255,.14)" : design.palette.border}`,
          background: headerBackground,
          color: headerColor,
          backdropFilter: `blur(${Math.max(10, design.surfaces.blur)}px)`,
          boxShadow: hidden ? "0 18px 45px rgba(0,0,0,.14)" : shadow[design.surfaces.shadow],
        }}
      >
        {mobile ? (
          <MobileReferenceHeader design={design} variant={variant} promoText={promoText} utilityText={utilityText} dark={dark} />
        ) : (
          <>
            {(variant === "floating" || variant === "stacked" || variant === "searchFirst" || variant === "transparent" || variant === "promoHeavy" || variant === "categoryBar") && (
              <HeaderAnnouncement design={design} text={promoText} dark={dark} />
            )}

            {variant === "minimal" && (
              <div className="flex items-center gap-7 px-7 py-5">
                <BrandMark design={design} size="md" />
                <nav className="flex flex-1 items-center justify-center gap-7 text-[13px]">
                  {leftNav.slice(0, 4).map((item, index) => <HeaderLink key={`${item}-${index}`} label={item} />)}
                </nav>
                <HeaderActions muted={headerMuted} />
              </div>
            )}

            {variant === "floating" && (
              <div className="grid items-center gap-6 px-6 py-5 lg:grid-cols-[1fr_auto_1fr] lg:px-8">
                <nav className="flex flex-wrap items-center gap-5 text-[13px]">
                  {leftNav.slice(0, 4).map((item, index) => <HeaderLink key={`${item}-${index}`} label={item} chevron={index < 2} />)}
                </nav>
                <BrandMark design={design} size="lg" centered />
                <div className="ml-auto flex items-center gap-4">
                  <span className="hidden text-xs xl:inline" style={{ color: headerMuted }}>USD · EN</span>
                  <HeaderActions muted={headerMuted} />
                </div>
              </div>
            )}

            {variant === "centered" && (
              <>
                <div className="grid items-center border-b px-7 py-5 lg:grid-cols-[1fr_auto_1fr]" style={{ borderColor: design.palette.border }}>
                  <div className="flex items-center gap-4 text-sm" style={{ color: headerMuted }}><Search size={17} /><span>Search the collection</span></div>
                  <BrandMark design={design} size="xl" centered />
                  <div className="ml-auto"><HeaderActions muted={headerMuted} /></div>
                </div>
                <div className="flex items-center justify-center gap-8 px-7 py-3.5 text-[12px]">
                  {[...leftNav, ...rightNav.slice(0, 2)].slice(0, 7).map((item, index) => <HeaderLink key={`${item}-${index}`} label={item} chevron={index < 3} />)}
                </div>
              </>
            )}

            {variant === "split" && (
              <div className="grid items-center gap-5 px-7 py-5 lg:grid-cols-[auto_1fr_auto]">
                <div className="flex items-center gap-4"><Menu size={19} /><BrandMark design={design} size="md" /></div>
                <nav className="flex items-center justify-center gap-7 text-[13px]">
                  {leftNav.slice(0, 5).map((item, index) => <HeaderLink key={`${item}-${index}`} label={item} chevron={index < 2} />)}
                </nav>
                <div className="flex items-center gap-4"><span className="hidden text-xs xl:inline" style={{ color: headerMuted }}>PH · USD $</span><HeaderActions muted={headerMuted} /></div>
              </div>
            )}

            {variant === "stacked" && (
              <>
                <div className="flex items-center justify-between border-b px-7 py-2.5 text-[10px] uppercase tracking-[.16em]" style={{ borderColor: design.palette.border, color: headerMuted }}>
                  <span>Free delivery over $200</span><span>{utilityText}</span><span>English · USD</span>
                </div>
                <div className="grid items-center px-7 py-5 lg:grid-cols-[1fr_auto_1fr]">
                  <div className="flex items-center gap-4"><Search size={18} /><span className="text-xs" style={{ color: headerMuted }}>Search</span></div>
                  <BrandMark design={design} size="xl" centered />
                  <div className="ml-auto"><HeaderActions muted={headerMuted} /></div>
                </div>
                <nav className="flex items-center justify-center gap-8 border-t px-7 py-3.5 text-[12px]" style={{ borderColor: design.palette.border }}>
                  {[...leftNav, ...rightNav.slice(0, 3)].slice(0, 8).map((item, index) => <HeaderLink key={`${item}-${index}`} label={item} chevron={index < 3} />)}
                </nav>
              </>
            )}

            {variant === "searchFirst" && (
              <>
                <div className="grid items-center gap-5 px-6 py-4 lg:grid-cols-[auto_minmax(360px,1fr)_auto_auto]">
                  <BrandMark design={design} size="md" />
                  <SearchHeaderField design={design} placeholder={store.category === "tech" ? "Search devices, components, brands..." : "Search products..."} />
                  <div className="hidden items-center gap-3 xl:flex"><div className="grid h-9 w-9 place-items-center rounded-lg" style={{ background: design.palette.surface }}><Sparkles size={17} /></div><div><div className="text-[10px] font-bold uppercase">Find the right product</div><div className="text-[10px]" style={{ color: headerMuted }}>{utilityText}</div></div></div>
                  <HeaderActions muted={headerMuted} />
                </div>
                <div className="flex items-center gap-6 overflow-x-auto border-t px-6 py-3 text-[12px]" style={{ borderColor: design.palette.border }}>
                  {["Home", ...leftNav, ...rightNav].slice(0, 10).map((item, index) => <HeaderLink key={`${item}-${index}`} label={item} chevron={index === 1 || index === 2} />)}
                </div>
              </>
            )}

            {variant === "editorial" && (
              <div className="flex items-center gap-8 px-7 py-5">
                <BrandMark design={design} size="lg" />
                <nav className="flex flex-1 items-center gap-7 text-[12px] uppercase tracking-[.08em]">
                  {leftNav.slice(0, 4).map((item, index) => <HeaderLink key={`${item}-${index}`} label={item} chevron={index < 2} />)}
                  <span className="rounded-full px-3 py-1 text-[10px] font-bold" style={{ background: design.palette.accent, color: design.palette.text }}>NEW</span>
                </nav>
                <div className="flex items-center gap-4"><span className="hidden text-[11px] xl:inline" style={{ color: headerMuted }}>{editorialMinimal ? "THE EDIT · 2026" : utilityText}</span><HeaderActions muted={headerMuted} /></div>
              </div>
            )}

            {variant === "utility" && (
              <>
                <div className="flex items-center justify-between border-b px-7 py-2.5 text-[10px]" style={{ borderColor: design.palette.border, color: headerMuted }}>
                  <div className="flex items-center gap-5"><span>Stores</span><span>Support</span><span>Journal</span></div>
                  <div className="flex items-center gap-4"><Globe size={12} /><span>English</span><span>USD $</span></div>
                </div>
                <div className="flex items-center gap-7 px-7 py-4">
                  <BrandMark design={design} size="md" />
                  <nav className="flex flex-1 items-center justify-center gap-6 text-[13px]">
                    {leftNav.slice(0, 5).map((item, index) => <HeaderLink key={`${item}-${index}`} label={item} chevron={index < 3} />)}
                  </nav>
                  <div className="flex items-center gap-5"><span className="hidden text-xs lg:inline" style={{ color: headerMuted }}>{utilityText}</span><HeaderActions muted={headerMuted} /></div>
                </div>
              </>
            )}

            {variant === "megaMenu" && (
              <>
                <div className="grid items-center gap-6 px-7 py-4 lg:grid-cols-[auto_1fr_auto]">
                  <BrandMark design={design} size="lg" />
                  <nav className="flex items-center justify-center gap-8 text-[12px] font-semibold uppercase tracking-[.08em]">
                    {leftNav.slice(0,4).map((item,index)=><HeaderLink key={`${item}-${index}`} label={item} chevron={index<3}/>)}
                  </nav>
                  <HeaderActions muted={headerMuted}/>
                </div>
                <div className="grid grid-cols-4 border-t px-7 py-3 text-[11px]" style={{borderColor:design.palette.border}}>
                  {["New arrivals","Bestsellers","Collections","Journal"].map((item,i)=><div key={item} className={`${i>0?"border-l pl-5":""}`} style={{borderColor:design.palette.border}}><div className="font-semibold">{item}</div><div className="mt-1 text-[10px]" style={{color:headerMuted}}>Curated category links</div></div>)}
                </div>
              </>
            )}

            {variant === "logoRail" && (
              <div className="grid items-center gap-5 px-7 py-4 lg:grid-cols-[1fr_auto_1fr]">
                <nav className="flex items-center gap-6 text-[12px]">{leftNav.slice(0,3).map((item,index)=><HeaderLink key={`${item}-${index}`} label={item}/>)}</nav>
                <BrandMark design={design} size="xl" centered />
                <div className="ml-auto flex items-center gap-5"><span className="text-[11px]" style={{color:headerMuted}}>The edit · 2026</span><HeaderActions muted={headerMuted}/></div>
              </div>
            )}

            {variant === "categoryBar" && (
              <>
                <div className="flex items-center gap-7 px-7 py-4"><BrandMark design={design} size="md"/><SearchHeaderField design={design} placeholder="Search the catalog"/><HeaderActions muted={headerMuted}/></div>
                <div className="flex items-center gap-7 overflow-x-auto border-t px-7 py-3 text-[12px] font-semibold" style={{borderColor:design.palette.border}}>{[...leftNav,...rightNav,"Sale","New in"].slice(0,9).map((item,i)=><HeaderLink key={`${item}-${i}`} label={item} chevron={i<2}/>)}</div>
              </>
            )}

            {variant === "compactSticky" && (
              <div className="flex items-center gap-5 px-6 py-3.5">
                <BrandMark design={design} size="md"/>
                <nav className="flex flex-1 items-center justify-center gap-6 text-[12px]">{leftNav.slice(0,4).map((item,index)=><HeaderLink key={`${item}-${index}`} label={item}/>)}</nav>
                <HeaderActions muted={headerMuted}/>
              </div>
            )}

            {variant === "promoHeavy" && (
              <>
                <div className="grid items-center gap-5 px-7 py-4 lg:grid-cols-[auto_1fr_auto]"><BrandMark design={design} size="md"/><nav className="flex items-center justify-center gap-6 text-[12px]">{leftNav.slice(0,5).map((item,i)=><HeaderLink key={`${item}-${i}`} label={item} chevron={i<2}/>)}</nav><HeaderActions muted={headerMuted}/></div>
                <div className="grid grid-cols-3 border-t text-center text-[10px] uppercase tracking-[.14em]" style={{borderColor:design.palette.border}}>{["Free shipping","Members get 10%","Limited drops"].map((item,i)=><div key={item} className="px-4 py-2.5" style={{background:i===1?design.palette.primary:design.palette.surface,color:i===1?design.palette.primaryText:design.palette.text}}>{item}</div>)}</div>
              </>
            )}

            {variant === "sideNav" && (
              <div className="grid items-center gap-5 px-7 py-4 lg:grid-cols-[auto_auto_1fr_auto]">
                <Menu size={19}/><BrandMark design={design} size="md"/><div className="pl-4 text-[11px]" style={{color:headerMuted}}>Collections / Editorial / Shop</div><HeaderActions muted={headerMuted}/>
              </div>
            )}

            {variant === "transparent" && (
              <div className="grid items-center gap-6 px-7 py-5 lg:grid-cols-[auto_1fr_auto]">
                <div className="flex items-center gap-4"><Menu size={19} /><BrandMark design={design} size="md" /></div>
                <nav className="flex items-center justify-center gap-8 text-[12px] uppercase tracking-[.12em]">
                  {leftNav.slice(0, 5).map((item, index) => <HeaderLink key={`${item}-${index}`} label={item} />)}
                </nav>
                <div className="flex items-center gap-4"><span className="hidden text-xs xl:inline" style={{ color: headerMuted }}>USD $</span><HeaderActions muted={headerMuted} /></div>
              </div>
            )}
          </>
        )}
      </motion.div>
    </div>
  );
}

function HeaderAnnouncement({ design, text, dark = false }: { design: DesignGenome; text: string; dark?: boolean }) {
  const movingText = design.motion.preset === "marqueeFlow" || design.motion.preset === "headlineSweep";
  const tape = Array.from({ length: 6 }).map((_, i) => `${text} ✦ ${i + 1}`);
  return (
    <div
      className="sf-announcement overflow-hidden px-4 py-2.5 text-[10px] font-medium md:text-[11px]"
      style={{
        background: dark ? "rgba(255,255,255,.08)" : `color-mix(in srgb, ${design.palette.accent} 42%, ${design.palette.surface})`,
        color: dark ? design.palette.primaryText : design.palette.text,
        borderBottom: `1px solid ${dark ? "rgba(255,255,255,.12)" : design.palette.border}`,
      }}
    >
      {movingText ? (
        <motion.div className="flex min-w-max items-center gap-6 whitespace-nowrap" animate={{ x: [0, -180, 0] }} transition={{ duration: Math.max(10, design.motion.duration * 18), repeat: Infinity, ease: "linear" }}>
          {tape.map((item, i) => <span key={`${item}-${i}`} className="uppercase tracking-[.18em]">{item}</span>)}
        </motion.div>
      ) : (
        <div className="flex items-center justify-center gap-3 text-center">
          <ChevronLeft size={13} style={{ opacity: 0.55 }} />
          <span>{text}</span>
          <ArrowRight size={13} style={{ opacity: 0.55 }} />
        </div>
      )}
    </div>
  );
}

function BrandMark({ design, size = "md", centered = false }: { design: DesignGenome; size?: "md" | "lg" | "xl"; centered?: boolean }) {
  const fontSize = size === "xl" ? "clamp(1.8rem,2.8vw,3.2rem)" : size === "lg" ? "clamp(1.55rem,2.15vw,2.55rem)" : "clamp(1.3rem,1.75vw,2rem)";
  return (
    <div className={centered ? "text-center" : "text-left"}>
      <div className="whitespace-nowrap font-semibold uppercase" style={{ fontSize, lineHeight: .92, letterSpacing: design.store.brandName.length > 10 ? "-.05em" : "-.065em", fontFamily: design.typography.heading }}>
        {design.store.brandName}
      </div>
    </div>
  );
}

function HeaderLink({ label, chevron = false }: { label: string; chevron?: boolean }) {
  return <span className="sf-header-link relative inline-flex whitespace-nowrap items-center gap-1.5 font-medium">{label}{chevron ? <ChevronDown size={12} style={{ opacity: .55 }} /> : null}</span>;
}

function HeaderActions({ muted }: { muted: string }) {
  const commerce = useCommerce();
  return (
    <div className="flex items-center gap-4" style={{ color: "inherit" }}>
      <Search size={18} />
      <UserRound size={18} />
      <button onClick={commerce.openCartDrawer} aria-label={`Open cart with ${commerce.cartCount} items`} className="relative">
        <ShoppingBag size={18} />
        {commerce.cartCount > 0 ? <span className="absolute -right-2 -top-2 grid h-4 min-w-4 place-items-center rounded-full bg-black px-1 text-[8px] font-bold text-white">{commerce.cartCount}</span> : null}
      </button>
      <span className="hidden text-[10px] 2xl:inline" style={{ color: muted }}>{commerce.cartCount}</span>
    </div>
  );
}

function SearchHeaderField({ design, placeholder }: { design: DesignGenome; placeholder: string }) {
  return (
    <div className="flex h-11 min-w-0 items-center overflow-hidden border" style={{ borderColor: design.palette.border, borderRadius: Math.max(8, design.geometry.radius * .38), background: design.palette.surface }}>
      <div className="border-r px-4 text-xs" style={{ borderColor: design.palette.border, color: design.palette.muted }}>All <ChevronDown size={12} className="ml-2 inline" /></div>
      <div className="min-w-0 flex-1 truncate px-4 text-xs" style={{ color: design.palette.muted }}>{placeholder}</div>
      <div className="grid h-full w-12 place-items-center" style={{ background: design.palette.primary, color: design.palette.primaryText }}><Search size={16} /></div>
    </div>
  );
}

function MobileReferenceHeader({ design, variant, promoText, utilityText, dark }: { design: DesignGenome; variant: DesignGenome["layout"]["nav"]; promoText: string; utilityText: string; dark: boolean }) {
  const commerce = useCommerce();
  const border = dark ? "rgba(255,255,255,.14)" : design.palette.border;
  const muted = dark ? "rgba(255,255,255,.64)" : design.palette.muted;
  const showPromo = ["floating", "stacked", "searchFirst", "transparent", "promoHeavy", "categoryBar", "brandMarquee", "dualRowPromo"].includes(variant);

  return (
    <>
      {showPromo ? <HeaderAnnouncement design={design} text={promoText} dark={dark} /> : null}
      <div className="px-4 py-3.5">
        {variant === "searchFirst" ? (
          <>
            <div className="flex items-center justify-between gap-3"><div className="flex items-center gap-3"><Menu size={19} /><BrandMark design={design} size="md" /></div><div className="flex items-center gap-3"><UserRound size={18} /><button onClick={commerce.openCartDrawer} aria-label={`Open cart with ${commerce.cartCount} items`} className="relative"><ShoppingBag size={18} />{commerce.cartCount > 0 ? <span className="absolute -right-2 -top-2 grid h-4 min-w-4 place-items-center rounded-full bg-black px-1 text-[8px] font-bold text-white">{commerce.cartCount}</span> : null}</button></div></div>
            <div className="mt-3"><SearchHeaderField design={design} placeholder="Search products..." /></div>
          </>
        ) : variant === "centered" || variant === "stacked" ? (
          <>
            <div className="grid grid-cols-[1fr_auto_1fr] items-center"><Search size={18} /><BrandMark design={design} size="md" centered /><div className="ml-auto flex items-center gap-3"><UserRound size={18} /><button onClick={commerce.openCartDrawer} aria-label={`Open cart with ${commerce.cartCount} items`} className="relative"><ShoppingBag size={18} />{commerce.cartCount > 0 ? <span className="absolute -right-2 -top-2 grid h-4 min-w-4 place-items-center rounded-full bg-black px-1 text-[8px] font-bold text-white">{commerce.cartCount}</span> : null}</button></div></div>
            <div className="mt-3 flex gap-5 overflow-x-auto border-t pt-3 text-[11px]" style={{ borderColor: border }}>{design.store.navItems.slice(0, 4).map((item, index) => <span key={`${item}-${index}`} className="whitespace-nowrap">{item}</span>)}</div>
          </>
        ) : variant === "editorial" ? (
          <div className="grid grid-cols-[auto_1fr_auto] items-center gap-3">
            <div className="flex items-center gap-3"><Menu size={18} /><Search size={18} /></div>
            <BrandMark design={design} size="md" centered />
            <div className="ml-auto flex items-center gap-3"><UserRound size={18} /><button onClick={commerce.openCartDrawer} aria-label={`Open cart with ${commerce.cartCount} items`} className="relative"><ShoppingBag size={18} />{commerce.cartCount > 0 ? <span className="absolute -right-2 -top-2 grid h-4 min-w-4 place-items-center rounded-full bg-black px-1 text-[8px] font-bold text-white">{commerce.cartCount}</span> : null}</button></div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-[auto_1fr_auto] items-center gap-3"><Menu size={19} /><BrandMark design={design} size="md" centered /><div className="flex items-center gap-3"><Search size={18} /><button onClick={commerce.openCartDrawer} aria-label={`Open cart with ${commerce.cartCount} items`} className="relative"><ShoppingBag size={18} />{commerce.cartCount > 0 ? <span className="absolute -right-2 -top-2 grid h-4 min-w-4 place-items-center rounded-full bg-black px-1 text-[8px] font-bold text-white">{commerce.cartCount}</span> : null}</button></div></div>
            {(variant === "utility" || variant === "split") ? <div className="mt-3 flex items-center justify-between border-t pt-3 text-[10px]" style={{ borderColor: border, color: muted }}><span>USD $</span><span>{utilityText}</span></div> : null}
          </>
        )}
      </div>
    </>
  );
}

function ReferenceFooter({ design, max, compact, mobile }: { design: DesignGenome; max: number; compact: boolean; mobile: boolean }) {
  const store = design.store;
  const footerLinks = footerColumns(store.category, store.navItems);
  const rawFooterVariant = design.layout.footer ?? (["fashion", "accessories", "shoes"].includes(store.category) ? "oversizedBrand" : "columns");
  const footerVariant = rawFooterVariant === "megaGrid" ? "columns" : rawFooterVariant === "immersiveSignup" ? "newsletterHero" : rawFooterVariant === "brandWall" ? "oversizedBrand" : rawFooterVariant;
  const editorialFooter = footerVariant === "oversizedBrand" || footerVariant === "editorial";

  if (footerVariant === "imageSplit") {
    return (
      <footer className="sf-footer" style={{ padding: compact ? "28px 16px" : "42px 30px", background: design.palette.surface }}>
        <div className={`grid overflow-hidden ${mobile ? "grid-cols-1" : "md:grid-cols-[.8fr_1.2fr]"}`} style={{maxWidth:max,margin:"0 auto",borderRadius:design.geometry.radius,border:`1px solid ${design.palette.border}`,background:design.palette.text,color:design.palette.primaryText}}>
          <img src={store.secondaryImage} alt={`${store.brandName} footer`} className="h-[360px] w-full object-cover md:h-full"/>
          <div className="grid gap-8 p-7 md:grid-cols-2 md:p-10"><div><BrandMark design={design} size="xl"/><p className="mt-5 max-w-sm text-sm leading-7 opacity-65">{store.promoBody}</p><div className="mt-8 flex gap-4"><Instagram size={16}/><Facebook size={16}/><Youtube size={16}/></div></div><div><div className="text-2xl font-semibold">Join the private list.</div><div className="mt-8 border-b border-white/30 pb-3 text-sm text-white/55">Email address <span className="float-right text-white">→</span></div><div className="mt-10 grid grid-cols-2 gap-5">{footerLinks.slice(0,2).map((c,index)=><FooterList key={`${c.title}-${index}`} title={c.title} items={c.items}/>)}</div></div></div>
        </div>
      </footer>
    );
  }

  if (footerVariant === "darkCommerce") {
    return (
      <footer className="sf-footer" style={{padding:compact?"28px 16px":"42px 30px",background:"#08090b",color:"rgba(255,255,255,.68)"}}><div style={{maxWidth:max,margin:"0 auto"}}><div className={`grid gap-10 border-b border-white/10 py-10 ${mobile?"grid-cols-1":"md:grid-cols-[1.2fr_repeat(3,.7fr)]"}`}><div><div className="text-white"><BrandMark design={design} size="xl"/></div><p className="mt-5 max-w-md text-sm leading-7">Built for fast discovery, confident comparison and memorable campaigns.</p><div className="mt-8 flex gap-4 text-white"><Instagram size={16}/><Facebook size={16}/><Youtube size={16}/></div></div>{footerLinks.slice(0,3).map((c,index)=><FooterList key={`${c.title}-${index}`} title={c.title} items={c.items}/>)}</div><div className="flex flex-wrap items-center justify-between gap-4 py-5 text-[11px]"><span>© 2026 {store.brandName}</span><span>Privacy · Terms · Shipping · Returns</span><span>USD · EN</span></div></div></footer>
    );
  }

  if (footerVariant === "supportHeavy") {
    return (
      <footer className="sf-footer" style={{padding:compact?"28px 16px":"42px 30px",background:design.palette.surface}}><div style={{maxWidth:max,margin:"0 auto"}}><div className={`grid overflow-hidden ${mobile?"grid-cols-1":"md:grid-cols-[.7fr_1.3fr]"}`} style={{borderRadius:design.geometry.radius,border:`1px solid ${design.palette.border}`,background:design.palette.elevated}}><img src={store.secondaryImage} alt="support" className="h-[320px] w-full object-cover md:h-full"/><div className="p-7 md:p-10"><div className="text-[10px] uppercase tracking-[.2em]" style={{color:design.palette.muted}}>Customer care</div><div className="mt-3 text-3xl font-semibold">Questions? Real support is close.</div><div className="mt-7 grid gap-4 sm:grid-cols-3">{["Fast shipping","Easy returns","Secure checkout"].map(x=><div key={x} className="rounded-2xl border p-4" style={{borderColor:design.palette.border}}><div className="font-semibold">{x}</div><div className="mt-2 text-xs" style={{color:design.palette.muted}}>Clear information when you need it.</div></div>)}</div><div className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-3">{footerLinks.map((c,index)=><FooterList key={`${c.title}-${index}`} title={c.title} items={c.items}/>)}</div></div></div></div></footer>
    );
  }

  if (footerVariant === "socialFirst") {
    return (
      <footer className="sf-footer" style={{padding:compact?"28px 16px":"42px 30px",background:design.palette.surface}}><div style={{maxWidth:max,margin:"0 auto"}}><div className="text-center"><div className="text-[10px] uppercase tracking-[.22em]" style={{color:design.palette.muted}}>Follow the edit</div><div className="mt-3 text-4xl font-semibold md:text-6xl">@{store.brandName.toLowerCase().replace(/\s+/g,"")}</div></div><div className="mt-8 grid grid-cols-2 gap-2 md:grid-cols-4">{[store.heroImage,store.secondaryImage,...store.products.slice(0,2).map(p=>p.image)].map((img,i)=><img key={i} src={img} alt="social" className="aspect-square w-full object-cover" style={{borderRadius:Math.max(10,design.geometry.radius-10)}}/>)}</div><div className="mt-8 flex flex-col gap-5 border-t pt-6 text-xs md:flex-row md:items-center md:justify-between" style={{borderColor:design.palette.border}}><BrandMark design={design} size="md"/><div className="flex flex-wrap gap-5">Shop · Journal · Contact · Privacy · Terms</div><div className="flex gap-4"><Instagram size={16}/><Facebook size={16}/><Youtube size={16}/></div></div></div></footer>
    );
  }

  if (footerVariant === "compact") {
    return <footer className="sf-footer border-t px-6 py-7 text-xs" style={{borderColor:design.palette.border,background:design.palette.surface,color:design.palette.muted}}><div className={`flex gap-5 ${mobile?"flex-col":"items-center justify-between"}`} style={{maxWidth:max,margin:"0 auto"}}><BrandMark design={design} size="md"/><div>Shop · About · Support · Privacy · Terms</div><div>© 2026 {store.brandName}</div></div></footer>;
  }

  if (footerVariant === "newsletterHero") {
    return <footer className="sf-footer" style={{background:design.palette.primary,color:design.palette.primaryText,padding:compact?"34px 16px":"64px 30px"}}><div style={{maxWidth:max,margin:"0 auto"}}><div className="grid gap-8 md:grid-cols-[1.2fr_.8fr] md:items-end"><div><div className="text-[10px] uppercase tracking-[.22em] opacity-55">Members list</div><div className="mt-4 max-w-3xl text-4xl font-semibold tracking-[-.05em] md:text-7xl">Drops, stories and private offers — without the noise.</div></div><div><div className="border-b border-current/30 pb-4 text-sm opacity-70">Email address <span className="float-right opacity-100">Subscribe →</span></div><p className="mt-4 text-xs leading-6 opacity-55">By joining, you agree to receive occasional product and editorial updates.</p></div></div><div className="mt-12 grid gap-8 border-t border-current/15 pt-8 md:grid-cols-[1fr_repeat(3,.7fr)]"><BrandMark design={design} size="lg"/>{footerLinks.map((c,index)=><FooterList key={`${c.title}-${index}`} title={c.title} items={c.items}/>)}</div></div></footer>;
  }

  if (footerVariant === "storeLocator") {
    return <footer className="sf-footer" style={{padding:compact?"30px 16px":"48px 30px",background:design.palette.surface}}><div className={`grid overflow-hidden ${mobile?"grid-cols-1":"md:grid-cols-[1fr_1fr]"}`} style={{maxWidth:max,margin:"0 auto",border:`1px solid ${design.palette.border}`,borderRadius:design.geometry.radius}}><div className="p-7 md:p-10"><div className="text-[10px] uppercase tracking-[.2em]" style={{color:design.palette.muted}}>Visit us</div><div className="mt-3 text-4xl font-semibold tracking-[-.05em]">Find the nearest {store.brandName} store.</div><p className="mt-4 max-w-lg text-sm leading-7" style={{color:design.palette.muted}}>Explore local availability, pickup options and in-store services.</p><button className="mt-7 inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold" style={{background:design.palette.primary,color:design.palette.primaryText}}><MapPin size={15}/> Find a store</button></div><div className="p-7 md:p-10" style={{background:`color-mix(in srgb, ${design.palette.accent} 20%, ${design.palette.surface})`}}><div className="grid grid-cols-2 gap-6">{footerLinks.map((c,index)=><FooterList key={`${c.title}-${index}`} title={c.title} items={c.items}/>)}</div><div className="mt-10 border-t pt-5 text-xs" style={{borderColor:design.palette.border,color:design.palette.muted}}>© 2026 {store.brandName} · Privacy · Terms</div></div></div></footer>;
  }

  if (footerVariant === "legalHeavy") {
    return <footer className="sf-footer" style={{padding:compact?"28px 16px":"42px 30px",background:design.palette.surface,color:design.palette.muted}}><div style={{maxWidth:max,margin:"0 auto"}}><div className="flex flex-col gap-6 border-b pb-8 md:flex-row md:items-end md:justify-between" style={{borderColor:design.palette.border}}><BrandMark design={design} size="xl"/><div className="max-w-lg text-sm leading-7">Transparent policies, secure checkout, support details and product information — all easy to find.</div></div><div className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-4">{footerLinks.map((c,index)=><FooterList key={`${c.title}-${index}`} title={c.title} items={c.items}/>)}<FooterList title="Legal" items={["Privacy policy","Terms of service","Returns policy","Accessibility"]}/></div><div className="mt-8 flex flex-wrap justify-between gap-4 border-t pt-5 text-[10px]" style={{borderColor:design.palette.border}}><span>© 2026 {store.brandName}</span><span>Cookie preferences · Data controls · Accessibility · Legal</span><span>USD · English</span></div></div></footer>;
  }

  if (editorialFooter) {
    return (
      <footer className="sf-footer" style={{ padding: compact ? "28px 16px" : "42px 30px", color: design.palette.muted, background: design.palette.surface }}>
        <div style={{ maxWidth: max, margin: "0 auto" }}>
          <div
            className="sf-footer-top overflow-hidden"
            style={{
              borderRadius: design.geometry.radius,
              border: `1px solid ${design.palette.border}`,
              background: `color-mix(in srgb, ${design.palette.surface} 94%, white)`,
              boxShadow: shadow[design.surfaces.shadow],
            }}
          >
            <div className="overflow-hidden border-b" style={{ background: design.palette.text, borderColor: design.palette.border, color: design.palette.primaryText }}>
              <div className="flex min-w-max items-center gap-10 px-5 py-5 md:gap-20 md:px-10 md:py-6" style={{ fontFamily: design.typography.heading, fontWeight: Math.max(700, design.typography.headingWeight), fontSize: mobile ? "clamp(2.2rem,12vw,3.2rem)" : "clamp(3rem,8vw,5.6rem)", letterSpacing: "-.06em", lineHeight: .88 }}>
                {Array.from({ length: mobile ? 3 : 5 }).map((_, i) => <span key={`brand-tape-${i}`}>{store.brandName}</span>)}
              </div>
            </div>

            <div className="p-6 md:p-10">
              <div className={`grid gap-8 ${mobile ? "grid-cols-1" : "md:grid-cols-[repeat(3,minmax(0,1fr))_1.2fr]"}`}>
                {footerLinks.slice(0, 3).map((column, index) => <FooterList key={`${column.title}-${index}`} title={column.title} items={column.items} />)}
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-[.2em]" style={{ color: design.palette.text }}>Get on the list</div>
                  <div className="mt-8 flex items-center justify-between gap-4 border-b pb-4 text-sm" style={{ borderColor: design.palette.text, color: design.palette.text }}>
                    <span style={{ color: design.palette.muted }}>Email address</span>
                    <span className="font-medium uppercase tracking-[.14em]">OK</span>
                  </div>
                </div>
              </div>

              <div className="mt-10" style={{ fontFamily: design.typography.heading, fontWeight: Math.max(700, design.typography.headingWeight), fontSize: mobile ? "clamp(4rem,18vw,5.8rem)" : "clamp(6rem,14vw,10rem)", lineHeight: 0.84, letterSpacing: "-.08em", color: design.palette.text }}>
                {store.brandName}
              </div>

              <div className={`mt-5 flex gap-4 text-xs ${mobile ? "flex-col" : "items-center justify-between"}`}>
                <div>© 2026 {store.brandName}, Powered by Shopify</div>
                <div className="flex flex-wrap items-center gap-4" style={{ color: design.palette.text }}>
                  <Instagram size={16} />
                  <Facebook size={16} />
                  <Youtube size={16} />
                  <span>TikTok</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="sf-footer" style={{ padding: compact ? "28px 16px" : "42px 30px", color: design.palette.muted, background: design.palette.surface }}>
      <div style={{ maxWidth: max, margin: "0 auto" }}>
        <div
          className="sf-footer-top overflow-hidden"
          style={{
            borderRadius: design.geometry.radius,
            border: `1px solid ${design.palette.border}`,
            background: `color-mix(in srgb, ${design.palette.surface} 86%, white)`,
            boxShadow: shadow[design.surfaces.shadow],
          }}
        >
          <div className={`sf-footer-main grid gap-0 ${mobile ? "grid-cols-1" : "lg:grid-cols-[1.05fr_.95fr]"}`}>
            <div className={`flex min-h-[220px] flex-col justify-between p-6 ${mobile ? "" : "md:p-10"}`} style={{ background: `color-mix(in srgb, ${design.palette.accent} 20%, ${design.palette.surface})` }}>
              <div>
                <div className="text-[10px] uppercase tracking-[.24em]" style={{ color: design.palette.muted }}>Newsletter</div>
                <h3 className="sf-footer-title mt-3 max-w-lg text-[clamp(1.85rem,3vw,3.3rem)] leading-[1.02]" style={{ color: design.palette.text, fontFamily: design.typography.heading, fontWeight: design.typography.headingWeight, letterSpacing: `${design.typography.headingTracking}em` }}>
                  Get on the list for launches, offers and design drops.
                </h3>
              </div>
              <button className="mt-6 inline-flex w-fit items-center gap-2 text-sm font-semibold" style={{ color: design.palette.text }}>
                Shop now <ArrowRight size={15} />
              </button>
            </div>
            <div className={`p-6 ${mobile ? "" : "md:p-10"}`}>
              <div className="text-[10px] uppercase tracking-[.24em]" style={{ color: design.palette.muted }}>Email address</div>
              <div className="mt-6 flex items-center justify-between gap-4 border-b pb-4 text-sm" style={{ borderColor: design.palette.border, color: design.palette.text }}>
                <span style={{ color: design.palette.muted }}>you@example.com</span>
                <span className="font-semibold">Subscribe</span>
              </div>
              <div className={`sf-footer-links mt-8 grid gap-6 ${mobile ? "grid-cols-2" : "md:grid-cols-3"}`}>
                {footerLinks.map((column, index) => <FooterList key={`${column.title}-${index}`} title={column.title} items={column.items} />)}
              </div>
            </div>
          </div>
        </div>

        <div className={`sf-footer-bottom mt-6 flex flex-col gap-4 border-t pt-5 text-xs ${mobile ? "" : "md:flex-row md:items-center md:justify-between"}`} style={{ borderColor: design.palette.border }}>
          <div>
            <div style={{ color: design.palette.text, fontWeight: 700, letterSpacing: "-.05em", fontSize: mobile ? 18 : 24, fontFamily: design.typography.heading }}>
              {store.brandName}
            </div>
            <div className="mt-1">© 2026 {store.brandName}. AI-generated storefront direction.</div>
          </div>
          <div className="flex flex-wrap items-center gap-4" style={{ color: design.palette.text }}>
            <Instagram size={16} />
            <Facebook size={16} />
            <Youtube size={16} />
            <span>TikTok</span>
            <span style={{ color: design.palette.muted }}>|</span>
            <span>USD</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <div className="mb-3 text-sm font-semibold text-current">{title}</div>
      <div className="space-y-2 text-xs">
        {items.map((item, index) => (
          <div key={`${item}-${index}`}>{item}</div>
        ))}
      </div>
    </div>
  );
}

type HeroProps = {
  design: DesignGenome;
  headingSize: string;
  transition: { duration: number; ease: [number, number, number, number] };
};

function HeroSplit({ design, headingSize, transition }: HeroProps) {
  const s = design.store;
  return (
    <div className="sf-hero-split grid gap-6 md:grid-cols-[.92fr_1.08fr] md:items-center">
      <div className="py-6 md:py-10">
        <Eyebrow color={design.palette.accent}>{s.heroKicker}</Eyebrow>
        <HeroHeading design={design} size={headingSize}>{s.heroTitle}</HeroHeading>
        <p className="mt-6 max-w-lg text-sm leading-7" style={{ color: design.palette.muted }}>{s.heroBody}</p>
        <HeroButton design={design}>{s.cta}</HeroButton>
      </div>
      <motion.div layout transition={transition} className="overflow-hidden" style={{ borderRadius: design.geometry.radius, boxShadow: shadow[design.surfaces.shadow] }}>
        <HeroMedia design={design} alt={s.heroTitle} className="sf-hero-image h-[320px] w-full object-cover md:h-[620px]" />
      </motion.div>
    </div>
  );
}

function HeroEditorial({ design, headingSize, transition }: HeroProps) {
  const s = design.store;
  return (
    <div className="overflow-hidden" style={{ borderRadius: design.geometry.radius, boxShadow: shadow[design.surfaces.shadow] }}>
      <div className="sf-hero-editorial-grid grid md:grid-cols-[1.1fr_.9fr]">
        <div className="flex flex-col justify-between p-6 md:p-10" style={{ background: design.palette.surface }}>
          <div>
            <Eyebrow color={design.palette.accent}>{s.heroKicker}</Eyebrow>
            <HeroHeading design={design} size={headingSize}>{s.heroTitle}</HeroHeading>
            <p className="mt-6 max-w-xl text-sm leading-7" style={{ color: design.palette.muted }}>{s.heroBody}</p>
          </div>
          <HeroButton design={design}>{s.cta}</HeroButton>
        </div>
        <motion.div layout transition={transition}>
          <HeroMedia design={design} alt={s.heroTitle} className="sf-hero-image h-[360px] w-full object-cover md:h-[640px]" />
        </motion.div>
      </div>
    </div>
  );
}

function HeroCentered({ design, headingSize, transition }: HeroProps) {
  const s = design.store;
  return (
    <motion.div layout transition={transition} className="sf-hero-centered relative overflow-hidden text-center" style={{ borderRadius: design.geometry.radius, boxShadow: shadow[design.surfaces.shadow] }}>
      <HeroMedia design={design} alt={s.heroTitle} className="sf-hero-image h-[440px] w-full object-cover md:h-[700px]" />
      <div className="absolute inset-0 bg-black/30" />
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-white">
        <Eyebrow color="rgba(255,255,255,.82)">{s.heroKicker}</Eyebrow>
        <HeroHeading design={design} size={headingSize} color="#FFFFFF">{s.heroTitle}</HeroHeading>
        <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-white/80">{s.heroBody}</p>
        <HeroButton design={design} inverse>{s.cta}</HeroButton>
      </div>
    </motion.div>
  );
}

function HeroProduct({ design, headingSize, transition }: HeroProps) {
  const s = design.store;
  const product = s.products[0];
  return (
    <div className="sf-hero-product grid gap-6 md:grid-cols-[.82fr_1.18fr] md:items-center">
      <div className="py-4 md:py-10">
        <Eyebrow color={design.palette.accent}>{s.heroKicker}</Eyebrow>
        <HeroHeading design={design} size={headingSize}>{s.heroTitle}</HeroHeading>
        <p className="mt-6 max-w-md text-sm leading-7" style={{ color: design.palette.muted }}>{s.heroBody}</p>
        <div className="mt-8 rounded-2xl border p-4" style={{ borderColor: design.palette.border, background: design.palette.surface }}>
          <div className="text-[10px] uppercase tracking-[.2em]" style={{ color: design.palette.muted }}>Spotlight product</div>
          <div className="mt-2 text-lg font-semibold">{product.name}</div>
          <div className="mt-1 text-sm" style={{ color: design.palette.muted }}>{product.subtitle} · {product.price}</div>
        </div>
        <HeroButton design={design}>{s.cta}</HeroButton>
      </div>
      <motion.div layout transition={transition} className="overflow-hidden" style={{ borderRadius: design.geometry.radius, boxShadow: shadow[design.surfaces.shadow] }}>
        <img src={product.image} alt={product.name} className="sf-hero-image h-[340px] w-full object-cover md:h-[620px]" />
      </motion.div>
    </div>
  );
}

function HeroImmersive({ design, headingSize, transition }: HeroProps) {
  const s = design.store;
  return (
    <motion.div layout transition={transition} className="sf-hero-immersive relative overflow-hidden" style={{ borderRadius: design.geometry.radius, boxShadow: shadow[design.surfaces.shadow] }}>
      <HeroMedia design={design} alt={s.heroTitle} className="sf-hero-image h-[500px] w-full object-cover md:h-[760px]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-black/10" />
      <div className="sf-immersive-top absolute left-0 right-0 top-0 flex items-center justify-between px-6 py-5 text-white md:px-10">
        <div className="flex items-center gap-6 text-sm text-white/86">
          {s.navItems.slice(0, 4).map((item, index) => <span key={`${item}-${index}`}>{item}</span>)}
        </div>
        <div className="flex items-center gap-4"><Search size={18} /><Heart size={18} /><ShoppingBag size={18} /></div>
      </div>
      <div className="sf-immersive-content absolute bottom-0 left-0 right-0 grid gap-6 p-6 text-white md:grid-cols-[1fr_.85fr] md:p-10">
        <div>
          <Eyebrow color="rgba(255,255,255,.78)">{s.heroKicker}</Eyebrow>
          <HeroHeading design={design} size={headingSize} color="#FFFFFF">{s.heroTitle}</HeroHeading>
        </div>
        <div className="md:place-self-end">
          <p className="max-w-md text-sm leading-7 text-white/78">{s.heroBody}</p>
          <HeroButton design={design} inverse>{s.cta}</HeroButton>
        </div>
      </div>
    </motion.div>
  );
}

function HeroStatement({ design, headingSize }: HeroProps) {
  const s = design.store;
  return (
    <div className="sf-hero-statement overflow-hidden" style={{ borderRadius: design.geometry.radius, background: design.palette.accent, color: design.palette.text, border: `1px solid ${design.palette.border}` }}>
      <div className="px-6 pb-6 pt-8 md:px-10 md:pt-10">
        <div className="mb-8 flex flex-wrap gap-6 text-sm uppercase tracking-[.18em]">
          {s.navItems.slice(0, 4).map((item, index) => <span key={`${item}-${index}`}>{item}</span>)}
        </div>
        <p className="max-w-md text-sm leading-7">{s.heroBody}</p>
      </div>
      <div className="px-6 pb-8 md:px-10 md:pb-12">
        <h1 className="sf-hero-heading" style={{ fontFamily: design.typography.heading, fontWeight: design.typography.headingWeight, letterSpacing: `${design.typography.headingTracking}em`, fontSize: `max(5rem, ${headingSize})`, lineHeight: 0.88 }}>
          {s.brandName}
        </h1>
      </div>
    </div>
  );
}

function HeroHotspot({ design, headingSize, transition }: HeroProps) {
  const s = design.store;
  const p1 = s.products[0];
  const p2 = s.products[1] ?? s.products[0];
  return (
    <motion.div layout transition={transition} className="sf-hero-hotspot relative overflow-hidden" style={{ borderRadius: design.geometry.radius, boxShadow: shadow[design.surfaces.shadow] }}>
      <HeroMedia design={design} alt={s.heroTitle} className="sf-hero-image h-[520px] w-full object-cover md:h-[760px]" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/25 to-black/10" />
      <div className="sf-hotspot-copy absolute left-6 top-1/2 max-w-[470px] -translate-y-1/2 text-white md:left-12">
        <Eyebrow color="rgba(255,255,255,.76)">{s.heroKicker}</Eyebrow>
        <HeroHeading design={design} size={headingSize} color="#FFFFFF">{s.heroTitle}</HeroHeading>
        <p className="mt-5 max-w-md text-sm leading-6 text-white/72">{s.heroBody}</p>
        <HeroButton design={design} inverse>{s.cta}</HeroButton>
      </div>
      <Hotspot style={{ left: "56%", top: "43%" }} label={p1.name} />
      <Hotspot style={{ left: "43%", top: "77%" }} label={p2.name} />
      <div className="sf-hotspot-meta absolute bottom-5 left-6 right-6 hidden items-center justify-between text-[10px] uppercase tracking-[.28em] text-white/45 md:flex">
        <span>{s.brandName} / campaign</span><span>Interactive product hotspots</span>
      </div>
    </motion.div>
  );
}

function HeroCampaign({ design, headingSize, transition }: HeroProps) {
  const s = design.store;
  return (
    <motion.div layout transition={transition} className="sf-hero-campaign relative overflow-hidden" style={{ borderRadius: design.geometry.radius, boxShadow: shadow[design.surfaces.shadow] }}>
      <HeroMedia design={design} alt={s.heroTitle} className="sf-hero-image h-[540px] w-full object-cover md:h-[760px]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/15" />
      <div className="sf-campaign-nav absolute inset-x-0 top-0 flex items-center justify-between px-5 py-5 text-white md:px-8">
        <div className="text-xl font-black tracking-[-.06em] md:text-2xl">{s.brandName}</div>
        <div className="sf-campaign-links hidden gap-6 text-xs md:flex">{s.navItems.map((item, index) => <span key={`${item}-${index}`}>{item}</span>)}</div>
      </div>
      <div className="sf-campaign-copy absolute bottom-7 left-6 max-w-xl text-white md:bottom-10 md:left-10">
        <Eyebrow color="rgba(255,255,255,.72)">{s.heroKicker}</Eyebrow>
        <HeroHeading design={design} size={headingSize} color="#FFFFFF">{s.heroTitle}</HeroHeading>
        <div className="mt-5 flex flex-wrap gap-3"><HeroButton design={design} inverse>{s.cta}</HeroButton><button className="mt-7 rounded-full border border-white/25 px-6 py-4 text-sm font-semibold backdrop-blur">Read our story</button></div>
      </div>
      <div className="sf-campaign-dots absolute bottom-4 left-1/2 hidden -translate-x-1/2 gap-2 md:flex"><span className="h-1 w-14 rounded-full bg-white/80"/><span className="h-1 w-14 rounded-full bg-white/35"/><span className="h-1 w-14 rounded-full bg-white/35"/></div>
    </motion.div>
  );
}

function HeroBeautyEditorial({ design, headingSize, transition }: HeroProps) {
  const s = design.store;
  const circles = [s.products[0]?.image, s.products[1]?.image, s.secondaryImage].filter(Boolean) as string[];
  return (
    <motion.div layout transition={transition} className="sf-hero-beauty overflow-hidden" style={{ borderRadius: design.geometry.radius, background: design.palette.surface, boxShadow: shadow[design.surfaces.shadow] }}>
      <div className="sf-beauty-copy px-6 py-14 text-center md:px-12 md:py-20">
        <div className="sf-beauty-heading mx-auto max-w-5xl" style={{ fontFamily: design.typography.heading, fontSize: "clamp(2.6rem,5.2vw,5.8rem)", lineHeight: 1.12, letterSpacing: `${design.typography.headingTracking}em`, fontWeight: design.typography.headingWeight }}>
          The harmony between powerful <InlineCircle src={circles[0]} /> high-performance ingredients <InlineCircle src={circles[1]} /> and exceptionally simple <InlineCircle src={circles[2]} /> skincare routines.
        </div>
      </div>
      <div className="sf-beauty-grid grid md:grid-cols-3">
        {[s.products[0], s.products[1], s.products[2]].map((product, i) => product && (
          <div key={`${product.name}-${i}`} className="sf-beauty-card relative min-h-[330px] overflow-hidden border-t md:border-l md:border-t-0" style={{ borderColor: design.palette.border }}>
            <img src={product.image} alt={product.name} className="h-full min-h-[330px] w-full object-cover" />
            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between"><span className="text-lg font-semibold text-black">{product.name}</span><span className="rounded-full bg-white/85 px-3 py-1 text-xs text-black">{product.price}</span></div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function Hotspot({ style, label }: { style: React.CSSProperties; label: string }) {
  return <div className="sf-hotspot absolute hidden items-center md:flex" style={style}><span className="h-9 w-9 rounded-full border border-white/80 bg-white/20 p-2 backdrop-blur"><span className="block h-full w-full rounded-full bg-white" /></span><span className="ml-3 min-w-[190px] bg-black/75 px-4 py-3 text-sm text-white backdrop-blur">{label} <span className="float-right">›</span></span></div>;
}

function InlineCircle({ src }: { src: string }) {
  return <span className="mx-1 inline-block h-[1.05em] w-[1.05em] translate-y-[.12em] overflow-hidden rounded-full align-baseline"><img src={src} alt="" className="h-full w-full object-cover" /></span>;
}

function CollectionStrip({ design }: { design: DesignGenome }) {
  const items = design.store.collections;
  const lookbook = design.layout.productGrid === "lookbook";
  return (
    <div className={`sf-collection-grid grid gap-4 ${lookbook ? "grid-cols-2 md:grid-cols-4" : "grid-cols-2 md:grid-cols-4"}`}>
      {items.map((item, i) => (
        <motion.article key={`${item.title}-${i}`} {...sectionReveal(design, i)} whileHover={hoverAnimation(design)}>
          <div className="overflow-hidden" style={{ borderRadius: design.geometry.radius, boxShadow: shadow[design.surfaces.shadow] }}>
            <img src={item.image} alt={item.title} className={`sf-collection-image w-full object-cover ${lookbook && i === 0 ? "h-[260px] md:h-[340px]" : "h-[180px] md:h-[240px]"}`} />
          </div>
          <div className="mt-3 text-sm font-semibold uppercase tracking-[.06em]">{item.title}</div>
        </motion.article>
      ))}
    </div>
  );
}


function HeroBento({ design, headingSize, transition }: HeroProps) {
  const s = design.store;
  return (
    <motion.div layout transition={transition} className="sf-hero-bento grid gap-3 overflow-hidden md:grid-cols-[1.2fr_.8fr]" style={{ borderRadius: design.geometry.radius }}>
      <div className="relative min-h-[520px] overflow-hidden" style={{ background: design.palette.surface }}>
        <HeroMedia design={design} alt={s.heroTitle} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-6 text-white md:p-10">
          <Eyebrow color="rgba(255,255,255,.75)">{s.heroKicker}</Eyebrow>
          <HeroHeading design={design} size={headingSize}>{s.heroTitle}</HeroHeading>
          <p className="mt-4 max-w-xl text-sm leading-7 text-white/75">{s.heroBody}</p>
          <HeroButton design={{ ...design, palette: { ...design.palette, primary: "#FFFFFF", primaryText: "#111111" } }}>{s.cta}</HeroButton>
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-1">
        {s.products.slice(0, 2).map((product, i) => (
          <motion.div key={`${product.name}-${i}`} {...sectionReveal(design, i)} whileHover={hoverAnimation(design)} className="relative min-h-[250px] overflow-hidden" style={{ borderRadius: design.geometry.radius, background: design.palette.surface }}>
            <img src={product.image} alt={product.name} className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5 text-white"><div className="text-xs uppercase tracking-[.16em] text-white/65">{product.tag}</div><div className="mt-2 text-xl font-semibold">{product.name}</div><div className="mt-1 text-sm text-white/75">{product.price}</div></div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function HeroSplitMedia({ design, headingSize, transition }: HeroProps) {
  const s = design.store;
  return (
    <motion.div layout transition={transition} className="sf-hero-split-media grid overflow-hidden md:grid-cols-2" style={{ borderRadius: design.geometry.radius, background: design.palette.surface, border: `1px solid ${design.palette.border}` }}>
      <div className="flex min-h-[420px] flex-col justify-center p-7 md:min-h-[620px] md:p-12">
        <Eyebrow color={design.palette.accent}>{s.heroKicker}</Eyebrow>
        <HeroHeading design={design} size={headingSize}>{s.heroTitle}</HeroHeading>
        <p className="mt-5 max-w-lg text-sm leading-7" style={{ color: design.palette.muted }}>{s.heroBody}</p>
        <div className="mt-7 flex flex-wrap gap-3"><HeroButton design={design}>{s.cta}</HeroButton><button className="px-5 py-3 text-sm font-semibold" style={{ border: `1px solid ${design.palette.border}`, borderRadius: design.geometry.buttonRadius }}>View story</button></div>
      </div>
      <div className="relative min-h-[420px] overflow-hidden md:min-h-[620px]"><HeroMedia design={design} alt={s.heroTitle} className="absolute inset-0 h-full w-full object-cover" /></div>
    </motion.div>
  );
}

function HeroMinimalCommerce({ design, headingSize, transition }: HeroProps) {
  const s = design.store;
  return (
    <motion.div layout transition={transition} className="sf-hero-minimal-commerce overflow-hidden px-5 py-12 text-center md:px-10 md:py-20" style={{ borderRadius: design.geometry.radius, background: design.palette.surface, border: `1px solid ${design.palette.border}` }}>
      <Eyebrow color={design.palette.accent}>{s.heroKicker}</Eyebrow>
      <div className="mx-auto max-w-5xl"><HeroHeading design={design} size={headingSize}>{s.heroTitle}</HeroHeading></div>
      <p className="mx-auto mt-5 max-w-2xl text-sm leading-7" style={{ color: design.palette.muted }}>{s.heroBody}</p>
      <HeroButton design={design}>{s.cta}</HeroButton>
      <motion.div {...sectionReveal(design, 1)} className="mx-auto mt-12 grid max-w-5xl grid-cols-2 gap-3 md:grid-cols-4">
        {s.products.map((product, i) => <div key={`${product.name}-${i}`} className="overflow-hidden" style={{ borderRadius: Math.max(12, design.geometry.radius - 6) }}><img src={product.image} alt={product.name} className="aspect-[4/5] w-full object-cover" /></div>)}
      </motion.div>
    </motion.div>
  );
}

function HeroLaunch({ design, headingSize, transition }: HeroProps) {
  const s = design.store;
  return (
    <motion.div layout transition={transition} className="sf-hero-launch relative min-h-[560px] overflow-hidden md:min-h-[720px]" style={{ borderRadius: design.geometry.radius, background: design.palette.primary }}>
      <HeroMedia design={design} alt={s.heroTitle} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-transparent" />
      <div className="absolute inset-0 flex items-end p-7 md:p-12">
        <div className="max-w-3xl text-white">
          <div className="mb-4 flex items-center gap-3"><span className="rounded-full border border-white/30 px-3 py-1 text-[10px] uppercase tracking-[.18em]">New launch</span><span className="text-xs text-white/65">Limited release</span></div>
          <HeroHeading design={design} size={headingSize}>{s.heroTitle}</HeroHeading>
          <p className="mt-5 max-w-xl text-sm leading-7 text-white/75">{s.heroBody}</p>
          <div className="mt-7 flex flex-wrap gap-3"><button className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-black">{s.cta}</button><button className="rounded-full border border-white/35 px-6 py-3 text-sm font-semibold text-white">Watch campaign</button></div>
        </div>
      </div>
    </motion.div>
  );
}

function HeroMagazine({ design, headingSize, transition }: HeroProps) {
  const s = design.store;
  const p = s.products[0];
  return (
    <motion.div layout transition={transition} className="sf-hero-magazine overflow-hidden" style={{ borderRadius: design.geometry.radius, background: design.palette.surface, border: `1px solid ${design.palette.border}` }}>
      <div className="grid items-stretch md:grid-cols-[.82fr_1.18fr]">
        <div className="flex flex-col justify-between p-7 md:p-12">
          <div><Eyebrow color={design.palette.accent}>{s.heroKicker}</Eyebrow><HeroHeading design={design} size={headingSize}>{s.heroTitle}</HeroHeading><p className="mt-5 max-w-lg text-sm leading-7" style={{ color: design.palette.muted }}>{s.heroBody}</p></div>
          <div className="mt-10 border-t pt-5" style={{ borderColor: design.palette.border }}><div className="text-[10px] uppercase tracking-[.18em]" style={{ color: design.palette.muted }}>Editor pick</div><div className="mt-2 flex items-center justify-between gap-4"><span className="font-semibold">{p.name}</span><span>{p.price}</span></div></div>
        </div>
        <div className="grid grid-cols-2 gap-1 bg-black/5 p-1"><div className="col-span-2 min-h-[340px] overflow-hidden"><HeroMedia design={design} alt={s.heroTitle} className="h-full w-full object-cover" /></div>{s.products.slice(0,2).map((product, i)=><div key={`${product.name}-${i}`} className="overflow-hidden"><img src={product.image} alt={product.name} className="aspect-[4/3] h-full w-full object-cover" /></div>)}</div>
      </div>
    </motion.div>
  );
}

function HeroShowcase({ design, headingSize, transition }: HeroProps) {
  const s = design.store;
  const left = s.products[0] ?? s.products[1];
  const right = s.products[1] ?? s.products[0];
  return (
    <motion.div layout transition={transition} className="sf-hero-showcase overflow-hidden" style={{ borderRadius: design.geometry.radius, background: design.palette.surface, boxShadow: shadow[design.surfaces.shadow] }}>
      <div className="grid gap-4 p-4 md:grid-cols-[.9fr_1.2fr_.9fr] md:gap-6 md:p-6">
        <div className="order-2 md:order-1">
          <div className="relative overflow-hidden" style={{ borderRadius: Math.max(14, design.geometry.radius - 6) }}>
            <motion.img whileHover={hoverAnimation(design)} src={left.image} alt={left.name} className="h-[240px] w-full object-cover md:h-[520px]" />
            <FloatingProduct product={left} align="left" />
          </div>
        </div>
        <div className="order-1 flex flex-col items-center justify-center px-2 py-6 text-center md:order-2 md:px-6">
          <Eyebrow color={design.palette.accent}>{s.heroKicker}</Eyebrow>
          <HeroHeading design={design} size={headingSize}>{s.heroTitle}</HeroHeading>
          <p className="mt-6 max-w-lg text-sm leading-7" style={{ color: design.palette.muted }}>{s.heroBody}</p>
          <HeroButton design={design}>{s.cta}</HeroButton>
        </div>
        <div className="order-3">
          <div className="relative overflow-hidden" style={{ borderRadius: Math.max(14, design.geometry.radius - 6) }}>
            <motion.img whileHover={hoverAnimation(design)} src={right.image} alt={right.name} className="h-[240px] w-full object-cover md:h-[520px]" />
            <FloatingProduct product={right} align="right" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function HeroFullBleedEditorial({ design, headingSize, transition }: HeroProps) {
  const s = design.store;
  return (
    <motion.div layout transition={transition} className="sf-hero-fullbleed relative min-h-[620px] overflow-hidden md:min-h-[790px]" style={{ borderRadius: design.geometry.radius }}>
      <HeroMedia design={design} alt={s.heroTitle} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/5 to-black/20" />
      <div className="absolute inset-0 flex flex-col justify-between p-6 text-white md:p-10">
        <div className="flex items-center justify-between text-[10px] uppercase tracking-[.2em] text-white/65"><span>{s.heroKicker}</span><span>Edition / 01</span></div>
        <div className="grid gap-6 md:grid-cols-[1.25fr_.75fr] md:items-end">
          <HeroHeading design={design} size={headingSize}>{s.heroTitle}</HeroHeading>
          <div className="md:pb-2"><p className="text-sm leading-7 text-white/75">{s.heroBody}</p><button className="mt-5 border-b border-white pb-1 text-sm font-semibold">{s.cta}</button></div>
        </div>
      </div>
    </motion.div>
  );
}

function HeroDualCampaign({ design, headingSize, transition }: HeroProps) {
  const s = design.store;
  const p = s.products[0];
  return (
    <motion.div layout transition={transition} className="sf-hero-dual grid overflow-hidden md:grid-cols-2" style={{ borderRadius: design.geometry.radius, background: design.palette.surface, border: `1px solid ${design.palette.border}` }}>
      <div className="relative min-h-[420px] md:min-h-[690px]"><HeroMedia design={design} alt={s.heroTitle} className="absolute inset-0 h-full w-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent"/><div className="absolute bottom-6 left-6 text-white"><div className="text-[10px] uppercase tracking-[.2em] text-white/65">Campaign one</div><div className="mt-2 text-2xl font-semibold">{p.name}</div></div></div>
      <div className="flex flex-col justify-between p-7 md:p-12">
        <div><Eyebrow color={design.palette.accent}>{s.heroKicker}</Eyebrow><HeroHeading design={design} size={headingSize}>{s.heroTitle}</HeroHeading><p className="mt-5 max-w-lg text-sm leading-7" style={{ color: design.palette.muted }}>{s.heroBody}</p></div>
        <div className="mt-8 grid grid-cols-2 gap-3">{s.products.slice(1,3).map((product, i)=><div key={`${product.name}-${i}`} className="overflow-hidden" style={{ borderRadius: Math.max(10, design.geometry.radius - 8) }}><img src={product.image} alt={product.name} className="aspect-[4/5] w-full object-cover"/><div className="p-3 text-sm font-semibold">{product.name}</div></div>)}</div>
      </div>
    </motion.div>
  );
}

function HeroFloatingProducts({ design, headingSize, transition }: HeroProps) {
  const s = design.store;
  return (
    <motion.div layout transition={transition} className="sf-hero-floating-products relative overflow-hidden px-5 py-12 md:min-h-[680px] md:px-12 md:py-16" style={{ borderRadius: design.geometry.radius, background: `linear-gradient(135deg, ${design.palette.surface}, ${design.palette.background})`, border: `1px solid ${design.palette.border}` }}>
      <div className="relative z-10 mx-auto max-w-4xl text-center"><Eyebrow color={design.palette.accent}>{s.heroKicker}</Eyebrow><HeroHeading design={design} size={headingSize}>{s.heroTitle}</HeroHeading><p className="mx-auto mt-5 max-w-xl text-sm leading-7" style={{ color: design.palette.muted }}>{s.heroBody}</p><HeroButton design={design}>{s.cta}</HeroButton></div>
      <div className="mt-10 grid grid-cols-2 gap-3 md:absolute md:inset-x-8 md:bottom-8 md:mt-0 md:grid-cols-4">{s.products.map((product,i)=><motion.div key={`${product.name}-${i}`} whileHover={hoverAnimation(design)} className={`${i%2===0?"md:-translate-y-8":"md:translate-y-2"} overflow-hidden`} style={{ borderRadius: Math.max(14, design.geometry.radius - 5), background: design.palette.elevated, boxShadow: shadow[design.surfaces.shadow] }}><img src={product.image} alt={product.name} className="aspect-[4/5] w-full object-cover"/><div className="p-3"><div className="text-xs font-semibold">{product.name}</div><div className="mt-1 text-xs" style={{ color: design.palette.muted }}>{product.price}</div></div></motion.div>)}</div>
    </motion.div>
  );
}

function HeroMegaTypography({ design, headingSize, transition }: HeroProps) {
  const s = design.store;
  return (
    <motion.div layout transition={transition} className="sf-hero-mega-type overflow-hidden" style={{ borderRadius: design.geometry.radius, background: design.palette.primary, color: design.palette.primaryText }}>
      <div className="px-5 pb-5 pt-8 md:px-9 md:pt-12"><div className="max-w-md text-sm leading-6 opacity-75">{s.heroBody}</div><div className="mt-12 overflow-hidden whitespace-nowrap" style={{ fontFamily: design.typography.heading, fontWeight: 900, fontSize: "clamp(5rem,16vw,14rem)", lineHeight: .78, letterSpacing: "-.08em" }}>{s.brandName}</div></div>
      <div className="grid md:grid-cols-[1.2fr_.8fr]"><img src={s.heroImage} alt={s.heroTitle} className="h-[320px] w-full object-cover md:h-[500px]"/><div className="flex flex-col justify-between p-6 md:p-9"><Eyebrow color={design.palette.accent}>{s.heroKicker}</Eyebrow><div><h2 className="text-3xl font-semibold">{s.heroTitle}</h2><button className="mt-6 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black">{s.cta}</button></div></div></div>
    </motion.div>
  );
}

function HeroImageCollage({ design, headingSize, transition }: HeroProps) {
  const s = design.store;
  const imgs=[s.heroImage,s.secondaryImage,...s.products.slice(0,2).map(p=>p.image)];
  return (
    <motion.div layout transition={transition} className="sf-hero-collage grid gap-3 overflow-hidden p-3 md:grid-cols-[1.1fr_.9fr]" style={{ borderRadius: design.geometry.radius, background: design.palette.surface, border: `1px solid ${design.palette.border}` }}>
      <div className="grid grid-cols-2 gap-3"><img src={imgs[0]} alt="campaign" className="col-span-2 h-[340px] w-full object-cover md:h-[480px]" style={{borderRadius:Math.max(12,design.geometry.radius-8)}}/><img src={imgs[1]} alt="story" className="h-[180px] w-full object-cover md:h-[240px]" style={{borderRadius:Math.max(12,design.geometry.radius-8)}}/><img src={imgs[2]} alt="product" className="h-[180px] w-full object-cover md:h-[240px]" style={{borderRadius:Math.max(12,design.geometry.radius-8)}}/></div>
      <div className="flex flex-col justify-center p-5 md:p-10"><Eyebrow color={design.palette.accent}>{s.heroKicker}</Eyebrow><HeroHeading design={design} size={headingSize}>{s.heroTitle}</HeroHeading><p className="mt-5 text-sm leading-7" style={{color:design.palette.muted}}>{s.heroBody}</p><HeroButton design={design}>{s.cta}</HeroButton></div>
    </motion.div>
  );
}

function HeroCollection({ design, headingSize, transition }: HeroProps) {
  const s=design.store;
  return (
    <motion.div layout transition={transition} className="sf-hero-collection overflow-hidden" style={{ borderRadius: design.geometry.radius, background: design.palette.surface, border: `1px solid ${design.palette.border}` }}>
      <div className="p-6 text-center md:p-10"><Eyebrow color={design.palette.accent}>{s.heroKicker}</Eyebrow><div className="mx-auto max-w-4xl"><HeroHeading design={design} size={headingSize}>{s.heroTitle}</HeroHeading></div></div>
      <div className="grid grid-cols-2 gap-px md:grid-cols-4" style={{background:design.palette.border}}>{s.collections.map((c,i)=><div key={`${c.title}-${i}`} className="relative min-h-[260px] overflow-hidden bg-white md:min-h-[380px]"><img src={c.image} alt={c.title} className="absolute inset-0 h-full w-full object-cover"/><div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent"/><div className="absolute bottom-5 left-5 text-lg font-semibold text-white">{c.title}</div></div>)}</div>
    </motion.div>
  );
}

function HeroCinematicProduct({ design, headingSize, transition }: HeroProps) {
  const s=design.store; const p=s.products[0];
  return (
    <motion.div layout transition={transition} className="sf-hero-cinematic relative min-h-[600px] overflow-hidden md:min-h-[760px]" style={{borderRadius:design.geometry.radius,background:"#06070a",color:"white"}}>
      <HeroMedia design={design} alt={s.heroTitle} className="absolute inset-0 h-full w-full object-cover opacity-70"/><div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-black/5"/>
      <div className="absolute inset-0 flex items-end p-7 md:p-12"><div className="max-w-2xl"><Eyebrow color="#fff">{s.heroKicker}</Eyebrow><HeroHeading design={design} size={headingSize}>{s.heroTitle}</HeroHeading><p className="mt-5 max-w-xl text-sm leading-7 text-white/70">{s.heroBody}</p><div className="mt-7 flex items-center gap-4"><button className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-black">{s.cta}</button><div><div className="text-[10px] uppercase tracking-[.18em] text-white/50">Featured</div><div className="font-semibold">{p.name} · {p.price}</div></div></div></div></div>
    </motion.div>
  );
}

function FloatingProduct({ product, align = "left" }: { product: DesignGenome["store"]["products"][number]; align?: "left" | "right" }) {
  return (
    <motion.div
      initial={{ opacity: 1, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45 }}
      className={`absolute bottom-4 ${align === "left" ? "left-4" : "right-4"} flex items-center gap-3 rounded-[22px] border px-3 py-3 backdrop-blur-md`}
      style={{ background: "rgba(255,255,255,.82)", borderColor: "rgba(255,255,255,.35)", minWidth: 230 }}
    >
      <div className="h-12 w-12 overflow-hidden rounded-2xl bg-white">
        <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="truncate text-sm font-semibold">{product.name}</div>
        <div className="text-sm opacity-70">{product.price}</div>
      </div>
      <button className="rounded-full bg-black px-4 py-2 text-sm font-semibold text-white">Shop</button>
    </motion.div>
  );
}

function HeroMedia({ design, alt, className }: { design: DesignGenome; alt: string; className: string }) {
  const looping = loopAnimation(design);
  if (design.store.heroMediaMode === "video" && design.store.heroVideoUrl) {
    return <motion.video animate={looping} transition={looping ? { repeat: Infinity, duration: Math.max(4, design.motion.duration * 7), ease: "easeInOut" } : undefined} src={design.store.heroVideoUrl} poster={design.store.heroImage} className={className} autoPlay muted loop playsInline />;
  }
  return <motion.img animate={looping} transition={looping ? { repeat: Infinity, duration: Math.max(4, design.motion.duration * 7), ease: "easeInOut" } : undefined} src={design.store.heroImage} alt={alt} className={className} />;
}

function productTickerItems(design: DesignGenome) {
  return design.store.products.flatMap((product) => [product.name, product.tag, product.price, product.subtitle]).filter(Boolean);
}

function MotionTextStrip({ design, reverse = false, emphasis = false }: { design: DesignGenome; reverse?: boolean; emphasis?: boolean }) {
  const items = productTickerItems(design);
  const doubled = [...items, ...items];
  return (
    <div className={`sf-marquee ${reverse ? "reverse" : ""}`} style={{ borderRadius: Math.max(14, design.geometry.radius - 8), border: `1px solid ${design.palette.border}`, background: emphasis ? design.palette.text : design.palette.surface, color: emphasis ? design.palette.primaryText : design.palette.text }}>
      <div className="sf-marquee-track">
        {doubled.map((item, index) => (
          <span key={`${item}-${index}`} className="sf-marquee-chip" style={{ background: emphasis ? "rgba(255,255,255,.08)" : `color-mix(in srgb, ${design.palette.elevated} 86%, transparent)`, border: `1px solid ${emphasis ? "rgba(255,255,255,.10)" : design.palette.border}`, fontSize: 11, textTransform: "uppercase", letterSpacing: ".16em" }}>
            <span style={{ opacity: .72 }}>{design.store.brandName}</span>
            <span>{item}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function ProductGrid({ design, cardBackground, transition, mobile = false }: { design: DesignGenome; cardBackground: string; transition: { duration: number; ease: [number, number, number, number] }; mobile?: boolean }) {
  const commerce = useCommerce();
  const products = design.store.products;
  const rawGridVariant = design.layout.productGrid;
  const gridVariant = rawGridVariant === "zigzagEditorial" ? "editorial" : rawGridVariant === "hoverPanels" ? "mosaic" : rawGridVariant === "stackedShowcase" ? "featuredPlusRail" : rawGridVariant;
  if (mobile) return <MobileProductGrid design={design} cardBackground={cardBackground} transition={transition} />;
  if (gridVariant === "lookbook") {
    return (
      <div className="sf-lookbook-grid grid gap-5 md:grid-cols-[1.1fr_.9fr]">
        <div className="overflow-hidden" style={{ borderRadius: design.geometry.radius, boxShadow: shadow[design.surfaces.shadow] }}>
          <img src={products[0].image} alt={products[0].name} className="sf-lookbook-image h-[420px] w-full object-cover md:h-[680px]" />
        </div>
        <div className="sf-lookbook-products grid grid-cols-2 gap-4 md:grid-cols-2">
          {products.slice(1).map((product, i) => (
            <ProductCard key={`${product.name}-${i}`} product={product} design={design} cardBackground={cardBackground} transition={transition} index={i} compact />
          ))}
        </div>
      </div>
    );
  }
  if (gridVariant === "catalog") {
    return (
      <div>
        <div className="mb-5 flex flex-wrap items-end justify-between gap-4"><h3 className="text-2xl font-semibold tracking-[-.04em]">Find your layer</h3><div className="flex gap-5 text-xs" style={{ color: design.palette.muted }}><span>Best sellers</span><span>New</span><span>Collections</span></div></div>
        <div className="sf-catalog-grid grid grid-cols-2 gap-2 md:grid-cols-4">
          {products.map((product, i) => <ProductCard key={`${product.name}-${i}`} product={product} design={design} cardBackground={cardBackground} transition={transition} index={i} compact />)}
        </div>
      </div>
    );
  }
  if (gridVariant === "mosaic") {
    return (
      <div className="sf-mosaic-grid grid auto-rows-[190px] grid-cols-2 gap-2 md:auto-rows-[260px] md:grid-cols-4">
        {products.map((product, i) => <motion.div {...sectionReveal(design, i)} whileHover={hoverAnimation(design)} key={`${product.name}-${i}`} className={`relative overflow-hidden ${i === 0 ? "col-span-2 row-span-2" : ""}`} style={{ borderRadius: design.geometry.radius, boxShadow: shadow[design.surfaces.shadow] }}><img src={product.image} alt={product.name} className="h-full w-full object-cover"/><div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent"/><div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white"><div><div className="text-sm font-semibold">{product.name}</div><div className="mt-1 text-[10px] text-white/65">{product.subtitle}</div></div><span className="text-sm">{product.price}</span></div></motion.div>)}
      </div>
    );
  }
  if (gridVariant === "deals") {
    return (
      <div className="grid gap-4 md:grid-cols-4">
        {products.map((product, i) => {
          const pricing = buildPriceMeta(product.price, i, design.store.category, product.compareAt);
          return (
            <motion.article key={`${product.name}-${i}`} {...sectionReveal(design, i)} whileHover={hoverAnimation(design)} className="rounded-[24px] border p-4" style={{ background: cardBackground, borderColor: design.palette.border }}>
              <div className="overflow-hidden rounded-[18px]"><img src={product.image} alt={product.name} className="h-[230px] w-full object-cover" /></div>
              <div className="mt-4 text-[10px] uppercase tracking-[.16em]" style={{ color: design.palette.muted }}>{product.tag}</div>
              <div className="mt-2 text-lg font-semibold leading-6">{product.name}</div>
              <div className="mt-2 text-sm" style={{ color: design.palette.muted }}>{product.subtitle}</div>
              <div className="mt-5 flex items-end justify-between gap-3"><div><div className="text-xl font-semibold">{pricing.current}</div>{pricing.compareAt ? <div className="text-xs line-through" style={{ color: design.palette.muted }}>{pricing.compareAt}</div> : null}</div><button onClick={() => commerce.openQuickView(product)} className="rounded-full border px-4 py-2 text-xs font-semibold" style={{ borderColor: design.palette.border }}>Quick view</button></div>
            </motion.article>
          );
        })}
      </div>
    );
  }
  if (gridVariant === "carousel") {
    return (
      <div className="flex snap-x gap-4 overflow-x-auto pb-4">
        {products.map((product, i) => (
          <div key={`${product.name}-${i}`} className="min-w-[76%] snap-start sm:min-w-[44%] md:min-w-[30%]">
            <ProductCard product={product} design={design} cardBackground={cardBackground} transition={transition} index={i} />
          </div>
        ))}
      </div>
    );
  }
  if (gridVariant === "editorialRail") {
    return (
      <div className="grid gap-4 md:grid-cols-[1.45fr_.55fr]">
        <motion.article {...sectionReveal(design, 0)} className="relative min-h-[560px] overflow-hidden" style={{ borderRadius: design.geometry.radius }}>
          <img src={products[0].image} alt={products[0].name} className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-7 text-white"><div className="text-[10px] uppercase tracking-[.18em] text-white/65">Featured edit</div><div className="mt-2 text-3xl font-semibold">{products[0].name}</div><div className="mt-2 text-sm text-white/70">{products[0].subtitle}</div><div className="mt-5 text-lg font-semibold">{products[0].price}</div></div>
        </motion.article>
        <div className="grid gap-4">
          {products.slice(1,4).map((product, i) => <ProductCard key={`${product.name}-${i}`} product={product} design={design} cardBackground={cardBackground} transition={transition} index={i + 1} compact />)}
        </div>
      </div>
    );
  }
  if (gridVariant === "comparison") {
    return (
      <div className="overflow-x-auto">
        <div className="grid min-w-[760px] grid-cols-[160px_repeat(4,1fr)] overflow-hidden border" style={{ borderColor: design.palette.border, borderRadius: design.geometry.radius }}>
          <div className="p-4 text-xs font-semibold uppercase tracking-[.15em]" style={{ background: design.palette.surface }}>Compare</div>
          {products.map((p) => <div key={`${p.name}-${p.price}`} className="border-l p-4" style={{ borderColor: design.palette.border, background: cardBackground }}><img src={p.image} alt={p.name} className="mb-3 h-32 w-full rounded-xl object-cover"/><div className="font-semibold">{p.name}</div></div>)}
          {[["Price", ...products.map((p)=>p.price)],["Positioning", ...products.map((p)=>p.tag)],["Best for", ...products.map((p)=>p.subtitle)],["Action", ...products.map(()=>"View details")]].map((row) => (
            <div key={`row-${row[0]}`} className="contents">
              {row.map((cell, i) => (
                <div
                  key={`${row[0]}-${i}`}
                  className="border-l border-t p-4 text-sm first:border-l-0"
                  style={{ borderColor: design.palette.border, color: i === 0 ? design.palette.muted : design.palette.text }}
                >
                  {cell}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }
  if (gridVariant === "cards") {
    return (
      <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-4">
        {products.map((product, i) => (
          <motion.article key={`${product.name}-${i}`} {...sectionReveal(design, i)} whileHover={hoverAnimation(design)} className="overflow-hidden" style={{ borderRadius: design.geometry.radius, background: cardBackground, border: `1px solid ${design.palette.border}` }}>
            <img src={product.image} alt={product.name} className="aspect-[4/4.6] w-full object-cover" />
            <div className="p-5"><div className="text-xs uppercase tracking-[.16em]" style={{ color: design.palette.muted }}>{product.tag}</div><div className="mt-2 text-lg font-semibold">{product.name}</div><div className="mt-2 text-sm" style={{ color: design.palette.muted }}>{product.subtitle}</div><div className="mt-5 flex items-center justify-between"><span className="font-semibold">{product.price}</span><button className="h-9 w-9 rounded-full" style={{ background: design.palette.primary, color: design.palette.primaryText }}>+</button></div></div>
          </motion.article>
        ))}
      </div>
    );
  }
  if (gridVariant === "featureSplit") {
    return (
      <div className="grid gap-4 md:grid-cols-[1.15fr_.85fr]">
        <FeatureProductPanel product={products[0]} design={design} cardBackground={cardBackground} index={0} />
        <div className="grid gap-4">
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-1">
            {products.slice(1, 3).map((product, i) => (
              <MiniProductCard key={`${product.name}-${i}`} product={product} design={design} cardBackground={cardBackground} index={i + 1} />
            ))}
          </div>
          {products[3] ? <InlineProductStrip product={products[3]} design={design} cardBackground={cardBackground} index={3} /> : null}
        </div>
      </div>
    );
  }
  if (gridVariant === "asymmetric") {
    return (
      <div className="grid gap-4 md:grid-cols-[.72fr_1.28fr]">
        <div className="grid gap-4">
          {products[1] ? <MiniProductCard product={products[1]} design={design} cardBackground={cardBackground} index={1} /> : null}
          <motion.div {...sectionReveal(design, 2)} className="flex min-h-[240px] flex-col justify-between p-6 md:p-7" style={{ borderRadius: design.geometry.radius, background: design.palette.surface, border: `1px solid ${design.palette.border}`, boxShadow: shadow[design.surfaces.shadow] }}>
            <div>
              <div className="text-[10px] uppercase tracking-[.2em]" style={{ color: design.palette.accent }}>Layout note</div>
              <div className="mt-3 text-2xl font-semibold tracking-[-.04em]">Mix feature merchandising with editorial storytelling.</div>
              <p className="mt-3 text-sm leading-7" style={{ color: design.palette.muted }}>Different generations now switch product architecture, not only colors, so each category can feel more like a real storefront reference.</p>
            </div>
            <button className="mt-5 inline-flex w-fit items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold" style={{ background: design.palette.primary, color: design.palette.primaryText }}>Shop edit <ArrowRight size={15} /></button>
          </motion.div>
        </div>
        <div className="grid gap-4 md:grid-rows-[1.25fr_.75fr]">
          {products[0] ? <FeatureProductPanel product={products[0]} design={design} cardBackground={cardBackground} index={0} short /> : null}
          <div className="grid gap-4 sm:grid-cols-2">
            {products.slice(2, 4).map((product, i) => (
              <MiniProductCard key={`${product.name}-${i + 2}`} product={product} design={design} cardBackground={cardBackground} index={i + 2} />
            ))}
          </div>
        </div>
      </div>
    );
  }
  if (gridVariant === "stackedCards") {
    return (
      <div className="grid gap-5 md:grid-cols-2">
        {products.map((product, i) => (
          <motion.article key={`${product.name}-${i}`} {...sectionReveal(design, i)} whileHover={hoverAnimation(design)} className={`${i % 2 === 1 ? "md:translate-y-10" : ""}`}>
            <div className="overflow-hidden" style={{ borderRadius: design.geometry.radius, background: cardBackground, border: `1px solid ${design.palette.border}`, boxShadow: shadow[design.surfaces.shadow] }}>
              <div className="grid md:grid-cols-[.95fr_1.05fr]">
                <img src={product.image} alt={product.name} className="h-[260px] w-full object-cover md:h-full" />
                <div className="flex flex-col justify-between p-6">
                  <div>
                    <div className="text-[10px] uppercase tracking-[.2em]" style={{ color: design.palette.muted }}>{product.tag}</div>
                    <div className="mt-3 text-2xl font-semibold tracking-[-.04em]">{product.name}</div>
                    <div className="mt-3 text-sm leading-7" style={{ color: design.palette.muted }}>{product.subtitle}</div>
                  </div>
                  <div className="mt-6 flex items-center justify-between gap-3"><span className="text-lg font-semibold">{product.price}</span><button className="rounded-full border px-4 py-2 text-xs font-semibold" style={{ borderColor: design.palette.border }}>Add to bag</button></div>
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    );
  }
  if (gridVariant === "minimalList") {
    return (
      <div className="space-y-3">
        {products.map((product, i) => {
          const pricing = buildPriceMeta(product.price, i, design.store.category, product.compareAt);
          return (
            <motion.article key={`${product.name}-${i}`} {...sectionReveal(design, i)} whileHover={hoverAnimation(design)} className="grid items-center gap-4 p-3 md:grid-cols-[120px_1.35fr_.85fr_auto] md:p-4" style={{ borderRadius: design.geometry.radius, background: cardBackground, border: `1px solid ${design.palette.border}` }}>
              <img src={product.image} alt={product.name} className="h-24 w-full rounded-2xl object-cover md:h-28" />
              <div>
                <div className="text-[10px] uppercase tracking-[.18em]" style={{ color: design.palette.muted }}>{product.tag}</div>
                <div className="mt-1 text-lg font-semibold">{product.name}</div>
                <div className="mt-1 text-sm" style={{ color: design.palette.muted }}>{product.subtitle}</div>
              </div>
              <div className="text-sm" style={{ color: design.palette.muted }}>
                <div className="font-semibold" style={{ color: design.palette.text }}>{pricing.current}</div>
                {pricing.compareAt ? <div className="mt-1 line-through">{pricing.compareAt}</div> : <div className="mt-1">Ready to ship</div>}
              </div>
              <button className="rounded-full px-5 py-3 text-sm font-semibold" style={{ background: design.palette.primary, color: design.palette.primaryText }}>View</button>
            </motion.article>
          );
        })}
      </div>
    );
  }
  if (gridVariant === "spotlight") {
    return (
      <div className="grid gap-4 md:grid-cols-[1.25fr_.75fr]">
        <motion.article {...sectionReveal(design, 0)} className="relative overflow-hidden" style={{ borderRadius: design.geometry.radius, boxShadow: shadow[design.surfaces.shadow] }}>
          <img src={products[0].image} alt={products[0].name} className="h-[420px] w-full object-cover md:h-[620px]" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/15 to-transparent" />
          <div className="absolute inset-y-0 left-0 flex max-w-[420px] flex-col justify-end p-6 text-white md:p-8">
            <div className="text-[10px] uppercase tracking-[.2em] text-white/70">Spotlight item</div>
            <div className="mt-3 text-3xl font-semibold tracking-[-.05em] md:text-5xl">{products[0].name}</div>
            <div className="mt-3 text-sm leading-7 text-white/75">{products[0].subtitle}</div>
            <div className="mt-6 flex items-center gap-4"><span className="text-lg font-semibold">{products[0].price}</span><button className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-black">Shop now</button></div>
          </div>
        </motion.article>
        <div className="grid gap-4">
          {products.slice(1, 4).map((product, i) => (
            <InlineProductStrip key={`${product.name}-${i}`} product={product} design={design} cardBackground={cardBackground} index={i + 1} />
          ))}
        </div>
      </div>
    );
  }
  if (gridVariant === "magazineGrid") {
    return (
      <div className="grid gap-4 md:grid-cols-[.9fr_1.1fr]">
        <motion.div {...sectionReveal(design, 0)} className="flex flex-col justify-between p-6 md:p-8" style={{ borderRadius: design.geometry.radius, background: design.palette.surface, border: `1px solid ${design.palette.border}`, boxShadow: shadow[design.surfaces.shadow] }}>
          <div>
            <div className="text-[10px] uppercase tracking-[.2em]" style={{ color: design.palette.accent }}>Editor&apos;s selection</div>
            <div className="mt-3 text-3xl font-semibold tracking-[-.05em] md:text-4xl">Curated products with a more magazine-like structure.</div>
            <p className="mt-4 max-w-md text-sm leading-7" style={{ color: design.palette.muted }}>This variant creates a strong editorial block on the left and a denser product collage on the right so repeated generations feel visually different.</p>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {products.slice(0, 2).map((product, i) => (
              <div key={`${product.name}-${i}`} className="rounded-[20px] border p-4" style={{ borderColor: design.palette.border }}>
                <div className="text-[10px] uppercase tracking-[.18em]" style={{ color: design.palette.muted }}>{product.tag}</div>
                <div className="mt-2 text-sm font-semibold">{product.name}</div>
                <div className="mt-1 text-xs" style={{ color: design.palette.muted }}>{product.price}</div>
              </div>
            ))}
          </div>
        </motion.div>
        <div className="grid gap-4 sm:grid-cols-2">
          {products.map((product, i) => (
            <motion.article key={`${product.name}-${i}`} {...sectionReveal(design, i + 1)} whileHover={hoverAnimation(design)} className={`${i === 0 ? "sm:col-span-2" : ""} overflow-hidden`} style={{ borderRadius: design.geometry.radius, background: cardBackground, border: `1px solid ${design.palette.border}` }}>
              <img src={product.image} alt={product.name} className={`${i === 0 ? "h-[280px] md:h-[320px]" : "h-[220px]"} w-full object-cover`} />
              <div className="p-4"><div className="text-[10px] uppercase tracking-[.16em]" style={{ color: design.palette.muted }}>{product.tag}</div><div className="mt-2 flex items-center justify-between gap-3"><div className="font-semibold">{product.name}</div><div className="text-sm">{product.price}</div></div></div>
            </motion.article>
          ))}
        </div>
      </div>
    );
  }
  if (gridVariant === "shopTheLook") {
    return (
      <div className="grid gap-4 md:grid-cols-[1.2fr_.8fr]">
        <div className="relative min-h-[620px] overflow-hidden" style={{borderRadius:design.geometry.radius}}><img src={design.store.secondaryImage} alt="shop the look" className="absolute inset-0 h-full w-full object-cover"/><div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent"/>{products.slice(0,3).map((p,i)=><div key={`${p.name}-${i}`} className="absolute" style={{left:`${26+i*22}%`,top:`${28+i*18}%`}}><div className="grid h-9 w-9 place-items-center rounded-full border border-white/50 bg-black/45 text-xs text-white backdrop-blur">{i+1}</div></div>)}<div className="absolute bottom-6 left-6 text-white"><div className="text-[10px] uppercase tracking-[.2em] text-white/60">Shop the look</div><div className="mt-2 text-3xl font-semibold">One story, multiple pieces.</div></div></div>
        <div className="space-y-3">{products.map((product,i)=><InlineProductStrip key={`${product.name}-${i}`} product={product} design={design} cardBackground={cardBackground} index={i}/>)}</div>
      </div>
    );
  }
  if (gridVariant === "featuredPlusRail") {
    return (
      <div className="space-y-4"><FeatureProductPanel product={products[0]} design={design} cardBackground={cardBackground} index={0}/><div className="grid gap-3 md:grid-cols-3">{products.slice(1).map((product,i)=><MiniProductCard key={`${product.name}-${i}`} product={product} design={design} cardBackground={cardBackground} index={i+1}/>)}</div></div>
    );
  }
  if (gridVariant === "horizontalEditorial") {
    return (
      <div className="space-y-2">{products.map((product,i)=><motion.article key={`${product.name}-${i}`} {...sectionReveal(design,i)} className="grid items-center overflow-hidden md:grid-cols-[.65fr_1.1fr_.55fr]" style={{borderTop:`1px solid ${design.palette.border}`,padding:"18px 0"}}><img src={product.image} alt={product.name} className="h-48 w-full object-cover md:h-52"/><div className="p-5 md:p-8"><div className="text-[10px] uppercase tracking-[.2em]" style={{color:design.palette.muted}}>{product.tag}</div><div className="mt-2 text-3xl font-semibold tracking-[-.05em]">{product.name}</div><p className="mt-3 text-sm" style={{color:design.palette.muted}}>{product.subtitle}</p></div><div className="p-5 md:text-right"><PriceBlock design={design} product={product} index={i}/><button className="mt-4 border-b text-xs font-semibold">View product</button></div></motion.article>)}</div>
    );
  }
  if (gridVariant === "denseRetail") {
    return (
      <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-4">{products.map((product,i)=><motion.article key={`${product.name}-${i}`} {...sectionReveal(design,i)} className="relative overflow-hidden border" style={{borderColor:design.palette.border,borderRadius:Math.max(8,design.geometry.radius-10),background:cardBackground}}><div className="relative"><img src={product.image} alt={product.name} className="h-[250px] w-full object-cover"/>{design.commerce?.showBadges!==false?<span className="absolute left-2 top-2 rounded bg-white px-2 py-1 text-[9px] font-semibold text-black">{product.tag}</span>:null}</div><div className="p-3"><div className="text-sm font-semibold">{product.name}</div><div className="mt-1 text-[11px]" style={{color:design.palette.muted}}>{product.subtitle}</div><div className="mt-3"><PriceBlock design={design} product={product} index={i} compact/></div>{design.commerce?.showRatings?<div className="mt-2 text-[10px]" style={{color:design.palette.accent}}>★★★★★ <span style={{color:design.palette.muted}}>({32+i*17})</span></div>:null}<button className="mt-4 w-full border px-3 py-2 text-xs font-semibold" style={{borderColor:design.palette.border}}>+ Add to cart</button></div></motion.article>)}</div>
    );
  }
  if (gridVariant === "luxurySparse") {
    return (
      <div className="grid gap-x-8 gap-y-16 md:grid-cols-2">{products.map((product,i)=><motion.article key={`${product.name}-${i}`} {...sectionReveal(design,i)} className={`${i%2===1?"md:mt-24":""}`}><img src={product.image} alt={product.name} className="h-[480px] w-full object-cover md:h-[620px]"/><div className="mt-5 flex items-start justify-between gap-6"><div><div className="text-[10px] uppercase tracking-[.22em]" style={{color:design.palette.muted}}>{product.tag}</div><div className="mt-2 text-xl font-medium">{product.name}</div></div><PriceBlock design={design} product={product} index={i} compact/></div></motion.article>)}</div>
    );
  }
  if (gridVariant === "categoryTabs") {
    return (
      <div><div className="mb-6 flex gap-2 overflow-x-auto">{["Best sellers","New in","Core","Limited"].map((x,i)=><button key={x} className="rounded-full px-4 py-2 text-xs font-semibold" style={{background:i===0?design.palette.primary:design.palette.surface,color:i===0?design.palette.primaryText:design.palette.text,border:`1px solid ${design.palette.border}`}}>{x}</button>)}</div><div className="grid gap-4 md:grid-cols-4">{products.map((product,i)=><ProductCard key={`${product.name}-${i}`} product={product} design={design} cardBackground={cardBackground} transition={transition} index={i} compact/>)}</div></div>
    );
  }
  if (gridVariant === "bundleGrid") {
    return (
      <div className="grid gap-4 md:grid-cols-[1.15fr_.85fr]"> <div className="grid grid-cols-2 gap-3">{products.map((product,i)=><div key={`${product.name}-${i}`} className="overflow-hidden" style={{borderRadius:design.geometry.radius,background:cardBackground,border:`1px solid ${design.palette.border}`}}><img src={product.image} alt={product.name} className="aspect-square w-full object-cover"/><div className="p-3"><div className="text-sm font-semibold">{product.name}</div><div className="mt-1 text-xs" style={{color:design.palette.muted}}>{product.price}</div></div></div>)}</div><div className="flex flex-col justify-between p-7" style={{borderRadius:design.geometry.radius,background:design.palette.primary,color:design.palette.primaryText}}><div><div className="text-[10px] uppercase tracking-[.2em] opacity-60">Bundle & save</div><div className="mt-3 text-4xl font-semibold tracking-[-.05em]">Build the complete edit.</div><p className="mt-4 text-sm leading-7 opacity-70">Pair the best sellers together and unlock a cleaner bundle price.</p></div><div className="mt-8"><div className="text-3xl font-semibold">$249</div><div className="mt-1 text-xs opacity-55">Save 18% vs individual pricing</div><button className="mt-5 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black">Add bundle</button></div></div></div>
    );
  }
  if (gridVariant === "specGrid") {
    return (
      <div className="grid gap-3 md:grid-cols-2">{products.map((product,i)=><motion.article key={`${product.name}-${i}`} {...sectionReveal(design,i)} className="grid overflow-hidden border md:grid-cols-[180px_1fr]" style={{borderColor:design.palette.border,borderRadius:design.geometry.radius,background:cardBackground}}><img src={product.image} alt={product.name} className="h-[220px] w-full object-cover md:h-full"/><div className="p-5"><div className="text-[10px] uppercase tracking-[.18em]" style={{color:design.palette.muted}}>{product.tag}</div><div className="mt-2 text-xl font-semibold">{product.name}</div><div className="mt-3 grid grid-cols-2 gap-2 text-[10px]" style={{color:design.palette.muted}}><span>Performance · Pro</span><span>Warranty · 2 years</span><span>Shipping · Fast</span><span>Stock · Available</span></div><div className="mt-5 flex items-center justify-between"><PriceBlock design={design} product={product} index={i}/><button className="rounded-full px-4 py-2 text-xs font-semibold" style={{background:design.palette.primary,color:design.palette.primaryText}}>Configure</button></div></div></motion.article>)}</div>
    );
  }

  if (gridVariant === "tickerShowcase") {
    return (
      <div className="space-y-4">
        <MotionTextStrip design={design} emphasis />
        <div className="grid gap-4 md:grid-cols-[1.15fr_.85fr]">
          <FeatureProductPanel product={products[0]} design={design} cardBackground={cardBackground} index={0} />
          <div className="grid gap-4">
            {products.slice(1, 3).map((product, i) => (
              <MiniProductCard key={`${product.name}-${i}`} product={product} design={design} cardBackground={cardBackground} index={i + 1} />
            ))}
            {products[3] ? <InlineProductStrip product={products[3]} design={design} cardBackground={cardBackground} index={3} /> : null}
          </div>
        </div>
      </div>
    );
  }
  if (gridVariant === "staggeredGallery") {
    return (
      <div className="grid gap-4 md:grid-cols-3">
        {products.map((product, i) => (
          <div key={`${product.name}-${i}`} style={{ transform: i % 3 === 1 ? "translateY(28px)" : i % 3 === 2 ? "translateY(12px)" : "translateY(0px)" }}>
            <ProductCard product={product} design={design} cardBackground={cardBackground} transition={transition} index={i} editorial={i % 3 === 0} compact={false} />
          </div>
        ))}
      </div>
    );
  }
  if (gridVariant === "priceSpotlight") {
    return (
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {products.map((product, i) => (
          <motion.article key={`${product.name}-${i}`} {...sectionReveal(design, i)} whileHover={hoverAnimation(design)} className="overflow-hidden" style={{ borderRadius: design.geometry.radius, background: cardBackground, border: `1px solid ${design.palette.border}`, boxShadow: shadow[design.surfaces.shadow] }}>
            <div className="relative">
              <img src={product.image} alt={product.name} className="h-[300px] w-full object-cover" />
              <div className="absolute inset-x-4 top-4 flex items-start justify-between gap-3">
                <span className="rounded-full bg-white/85 px-3 py-1 text-[10px] uppercase tracking-[.16em] text-black">{product.tag}</span>
                <div className="rounded-[18px] px-4 py-3 backdrop-blur-md" style={{ background: 'rgba(17,17,17,.55)', color: '#fff' }}>
                  <PriceBlock design={{ ...design, commerce: { ...(design.commerce ?? {} as any), priceStyle: 'pricePill' } }} product={product} index={i} />
                </div>
              </div>
            </div>
            <div className="p-5">
              <div className="text-lg font-semibold">{product.name}</div>
              <div className="mt-2 text-sm" style={{ color: design.palette.muted }}>{product.subtitle}</div>
              <div className="mt-5 flex items-center justify-between gap-3">
                <div className="text-[11px] uppercase tracking-[.18em]" style={{ color: design.palette.accent }}>Modern pricing</div>
                <button className="rounded-full px-4 py-2 text-xs font-semibold" style={{ background: design.palette.primary, color: design.palette.primaryText }}>Add to cart</button>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    );
  }
  if (gridVariant === "floatingRail") {
    return (
      <div className="space-y-4">
        <div className="grid gap-4 md:grid-cols-[1.2fr_.8fr]">
          <FeatureProductPanel product={products[0]} design={design} cardBackground={cardBackground} index={0} />
          <motion.div {...sectionReveal(design, 1)} className="relative overflow-hidden p-6" style={{ borderRadius: design.geometry.radius, background: design.palette.surface, border: `1px solid ${design.palette.border}` }}>
            <div className="text-[10px] uppercase tracking-[.18em]" style={{ color: design.palette.accent }}>Editor's pick</div>
            <div className="mt-4 text-3xl font-semibold tracking-[-.05em]">{products[1]?.name ?? products[0].name}</div>
            <p className="mt-3 max-w-md text-sm leading-6" style={{ color: design.palette.muted }}>{products[1]?.subtitle ?? products[0].subtitle}</p>
            <div className="mt-6"><PriceBlock design={{ ...design, commerce: { ...(design.commerce ?? {} as any), priceStyle: 'compareStrong' } }} product={products[1] ?? products[0]} index={1} /></div>
            <div className="mt-6 -mr-4 grid gap-3">
              {products.slice(2,4).map((product, i) => <InlineProductStrip key={`${product.name}-${i}`} product={product} design={design} cardBackground={cardBackground} index={i + 2} />)}
            </div>
          </motion.div>
        </div>
        <MotionTextStrip design={design} reverse />
      </div>
    );
  }
  if (gridVariant === "editorialDeck") {
    return (
      <div className="grid gap-4 md:grid-cols-[.75fr_1.1fr_.75fr]">
        <div className="grid gap-4">
          {products[1] ? <MiniProductCard product={products[1]} design={design} cardBackground={cardBackground} index={1} /> : null}
          {products[2] ? <MiniProductCard product={products[2]} design={design} cardBackground={cardBackground} index={2} /> : null}
        </div>
        <motion.article {...sectionReveal(design, 0)} whileHover={hoverAnimation(design)} className="relative overflow-hidden" style={{ borderRadius: design.geometry.radius, minHeight: 620, boxShadow: shadow[design.surfaces.shadow] }}>
          <img src={products[0].image} alt={products[0].name} className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/10" />
          <div className="absolute inset-x-0 bottom-0 p-7 text-white">
            <div className="text-[10px] uppercase tracking-[.22em] text-white/65">Signature product</div>
            <div className="mt-3 text-4xl font-semibold tracking-[-.05em]">{products[0].name}</div>
            <p className="mt-3 max-w-sm text-sm leading-6 text-white/72">{products[0].subtitle}</p>
            <div className="mt-5 flex items-end justify-between gap-4">
              <PriceBlock design={{ ...design, commerce: { ...(design.commerce ?? {} as any), priceStyle: 'saleCallout' } }} product={products[0]} index={0} />
              <button className="rounded-full bg-white px-5 py-3 text-xs font-semibold text-black">Shop now</button>
            </div>
          </div>
        </motion.article>
        <div className="grid gap-4">
          {products[3] ? <MiniProductCard product={products[3]} design={design} cardBackground={cardBackground} index={3} /> : null}
          <motion.div {...sectionReveal(design, 4)} className="overflow-hidden p-5" style={{ borderRadius: Math.max(16, design.geometry.radius - 2), background: design.palette.surface, border: `1px solid ${design.palette.border}` }}>
            <div className="text-[10px] uppercase tracking-[.18em]" style={{ color: design.palette.accent }}>Moving text</div>
            <div className="mt-4"><MotionTextStrip design={design} /></div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className={`sf-product-grid grid ${gridVariant === "compact" ? "grid-cols-2 md:grid-cols-4" : "grid-cols-1 sm:grid-cols-2 md:grid-cols-4"} gap-4`}>
      {products.map((product, i) => (
        <ProductCard key={`${product.name}-${i}`} product={product} design={design} cardBackground={cardBackground} transition={transition} index={i} editorial={gridVariant === "editorial" && i === 0} compact={gridVariant === "compact"} />
      ))}
    </div>
  );
}

function FeatureProductPanel({ product, design, cardBackground, index, short = false }: { product: DesignGenome["store"]["products"][number]; design: DesignGenome; cardBackground: string; index: number; short?: boolean }) {
  return (
    <motion.article {...sectionReveal(design, index)} whileHover={hoverAnimation(design)} className="overflow-hidden" style={{ borderRadius: design.geometry.radius, background: cardBackground, border: `1px solid ${design.palette.border}`, boxShadow: shadow[design.surfaces.shadow] }}>
      <div className={`grid ${short ? "md:grid-cols-[1fr_.9fr]" : "md:grid-cols-[1.05fr_.95fr]"}`}>
        <img src={product.image} alt={product.name} className={`${short ? "h-[300px] md:h-full" : "h-[360px] md:h-[100%]"} w-full object-cover`} />
        <div className="flex flex-col justify-between p-6 md:p-8">
          <div>
            <div className="text-[10px] uppercase tracking-[.2em]" style={{ color: design.palette.muted }}>{product.tag}</div>
            <div className="mt-3 text-3xl font-semibold tracking-[-.05em] md:text-4xl">{product.name}</div>
            <p className="mt-4 text-sm leading-7" style={{ color: design.palette.muted }}>{product.subtitle}</p>
          </div>
          <div className="mt-7 flex items-center justify-between gap-3">
            <span className="text-lg font-semibold">{product.price}</span>
            <button className="rounded-full px-5 py-3 text-sm font-semibold" style={{ background: design.palette.primary, color: design.palette.primaryText }}>Shop now</button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function MiniProductCard({ product, design, cardBackground, index }: { product: DesignGenome["store"]["products"][number]; design: DesignGenome; cardBackground: string; index: number }) {
  return (
    <motion.article {...sectionReveal(design, index)} whileHover={hoverAnimation(design)} className="overflow-hidden" style={{ borderRadius: Math.max(16, design.geometry.radius - 4), background: cardBackground, border: `1px solid ${design.palette.border}`, boxShadow: shadow[design.surfaces.shadow] }}>
      <img src={product.image} alt={product.name} className="h-[220px] w-full object-cover" />
      <div className="p-4">
        <div className="text-[10px] uppercase tracking-[.18em]" style={{ color: design.palette.muted }}>{product.tag}</div>
        <div className="mt-2 text-lg font-semibold">{product.name}</div>
        <div className="mt-1 text-sm" style={{ color: design.palette.muted }}>{product.subtitle}</div>
        <div className="mt-4 flex items-center justify-between gap-3"><span className="font-semibold">{product.price}</span><button className="rounded-full border px-4 py-2 text-xs font-semibold" style={{ borderColor: design.palette.border }}>View</button></div>
      </div>
    </motion.article>
  );
}

function InlineProductStrip({ product, design, cardBackground, index }: { product: DesignGenome["store"]["products"][number]; design: DesignGenome; cardBackground: string; index: number }) {
  return (
    <motion.article {...sectionReveal(design, index)} whileHover={hoverAnimation(design)} className="grid items-center gap-4 p-3 md:grid-cols-[104px_1fr_auto] md:p-4" style={{ borderRadius: Math.max(16, design.geometry.radius - 6), background: cardBackground, border: `1px solid ${design.palette.border}`, boxShadow: shadow[design.surfaces.shadow] }}>
      <img src={product.image} alt={product.name} className="h-24 w-full rounded-2xl object-cover" />
      <div>
        <div className="text-[10px] uppercase tracking-[.18em]" style={{ color: design.palette.muted }}>{product.tag}</div>
        <div className="mt-1 text-sm font-semibold">{product.name}</div>
        <div className="mt-1 text-xs" style={{ color: design.palette.muted }}>{product.subtitle}</div>
      </div>
      <div className="flex items-center gap-4"><span className="text-sm font-semibold">{product.price}</span><button className="rounded-full px-4 py-2 text-xs font-semibold" style={{ background: design.palette.primary, color: design.palette.primaryText }}>Shop</button></div>
    </motion.article>
  );
}

function MobileProductGrid({ design, cardBackground, transition }: { design: DesignGenome; cardBackground: string; transition: { duration: number; ease: [number, number, number, number] } }) {
  const products = design.store.products;
  const variant = design.layout.productGrid;
  const featuredVariants = new Set(["lookbook", "editorial", "editorialRail", "featureSplit", "asymmetric", "spotlight", "magazineGrid", "shopTheLook", "featuredPlusRail", "luxurySparse", "bundleGrid", "tickerShowcase", "floatingRail", "editorialDeck", "staggeredGallery"]);
  const listVariants = new Set(["minimalList", "comparison", "stackedCards", "horizontalEditorial", "denseRetail", "specGrid", "priceSpotlight"]);

  if (variant === "carousel") {
    return (
      <div className="sf-mobile-carousel flex snap-x gap-3 overflow-x-auto pb-3">
        {products.map((product, i) => (
          <div key={`${product.name}-${i}`} className="min-w-[82%] snap-start">
            <MobileProductTile product={product} design={design} cardBackground={cardBackground} transition={transition} index={i} large />
          </div>
        ))}
      </div>
    );
  }

  if (variant === "mosaic") {
    return (
      <div className="sf-mobile-mosaic grid grid-cols-2 gap-2.5">
        {products.map((product, i) => (
          <motion.article
            key={`${product.name}-${i}`}
            {...sectionReveal(design, i)}
            className={`${i === 0 ? "col-span-2" : ""} relative overflow-hidden`}
            style={{ borderRadius: Math.max(14, design.geometry.radius - 4), minHeight: i === 0 ? 270 : 185 }}
          >
            <img src={product.image} alt={product.name} className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 text-white">
              <div className="min-w-0"><div className="truncate text-sm font-semibold">{product.name}</div><div className="mt-1 truncate text-[11px] text-white/70">{product.subtitle}</div></div>
              <span className="shrink-0 text-sm font-semibold">{product.price}</span>
            </div>
          </motion.article>
        ))}
      </div>
    );
  }

  if (featuredVariants.has(variant)) {
    return (
      <div className="sf-mobile-feature-products space-y-3">
        <MobileFeatureProduct product={products[0]} design={design} cardBackground={cardBackground} index={0} />
        <div className="sf-mobile-product-grid grid grid-cols-2 gap-3">
          {products.slice(1).map((product, i) => (
            <MobileProductTile key={`${product.name}-${i}`} product={product} design={design} cardBackground={cardBackground} transition={transition} index={i + 1} />
          ))}
        </div>
      </div>
    );
  }

  if (listVariants.has(variant)) {
    return (
      <div className="sf-mobile-product-list space-y-3">
        {products.map((product, i) => (
          <MobileProductRow key={`${product.name}-${i}`} product={product} design={design} cardBackground={cardBackground} index={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="sf-mobile-product-grid grid grid-cols-2 gap-3">
      {products.map((product, i) => (
        <MobileProductTile key={`${product.name}-${i}`} product={product} design={design} cardBackground={cardBackground} transition={transition} index={i} />
      ))}
    </div>
  );
}

function MobileFeatureProduct({ product, design, cardBackground, index }: { product: DesignGenome["store"]["products"][number]; design: DesignGenome; cardBackground: string; index: number }) {
  return (
    <motion.article {...sectionReveal(design, index)} className="sf-mobile-feature-card overflow-hidden" style={{ background: cardBackground, border: `1px solid ${design.palette.border}`, borderRadius: Math.max(16, design.geometry.radius), boxShadow: shadow[design.surfaces.shadow] }}>
      <img src={product.image} alt={product.name} className="h-[clamp(240px,76cqw,330px)] w-full object-cover" />
      <div className="p-5">
        <div className="text-[9px] uppercase tracking-[.2em]" style={{ color: design.palette.muted }}>{product.tag}</div>
        <div className="mt-2 text-[clamp(1.35rem,6.4cqw,1.8rem)] font-semibold leading-[1.02] tracking-[-.045em]">{product.name}</div>
        <p className="mt-2 text-[13px] leading-5" style={{ color: design.palette.muted }}>{product.subtitle}</p>
        <div className="mt-5 flex items-center justify-between gap-3">
          <PriceBlock design={design} product={product} index={index} compact />
          <button className="rounded-full px-4 py-2.5 text-xs font-semibold" style={{ background: design.palette.primary, color: design.palette.primaryText }}>Shop now</button>
        </div>
      </div>
    </motion.article>
  );
}

function MobileProductTile({ product, design, cardBackground, transition, index, large = false }: { product: DesignGenome["store"]["products"][number]; design: DesignGenome; cardBackground: string; transition: { duration: number; ease: [number, number, number, number] }; index: number; large?: boolean }) {
  const details = buildProductSignals(product, design.store.category, index);
  return (
    <motion.article {...sectionReveal(design, index)} transition={{ ...transition, delay: index * design.motion.stagger }} className="sf-mobile-product-tile min-w-0 overflow-hidden" style={{ background: cardBackground, border: `1px solid ${design.palette.border}`, borderRadius: Math.max(14, design.geometry.radius - 4) }}>
      <div className="relative overflow-hidden">
        <img src={product.image} alt={product.name} className={`w-full object-cover ${large ? "h-[300px]" : "h-[clamp(165px,48cqw,220px)]"}`} />
        <span className="absolute left-2.5 top-2.5 rounded-full bg-white/85 px-2 py-1 text-[8px] uppercase tracking-[.08em] text-black backdrop-blur">{product.tag}</span>
      </div>
      <div className="min-w-0 p-3.5">
        <div className="break-words text-[13px] font-semibold uppercase leading-[1.25] tracking-[-.02em]">{product.name}</div>
        <p className="mt-1 line-clamp-2 text-[11px] leading-4" style={{ color: design.palette.muted }}>{product.subtitle}</p>
        {design.productAnatomy === "technical" || design.productAnatomy === "comparison" ? <div className="mt-2 flex flex-wrap gap-1.5">{Object.entries(product.specs ?? {}).slice(0,2).map(([key,value]) => <span key={key} className="rounded-full border px-2 py-1 text-[9px]" style={{borderColor:design.palette.border,color:design.palette.muted}}>{key}: {value}</span>)}</div> : null}
        {design.productAnatomy === "beauty" ? <div className="mt-2 text-[9px] uppercase tracking-[.14em]" style={{color:design.palette.accent}}>Shade & routine details</div> : null}
        {design.productAnatomy === "furniture" ? <div className="mt-2 text-[9px] uppercase tracking-[.14em]" style={{color:design.palette.muted}}>Materials · dimensions · finishes</div> : null}
        {design.commerce?.showRatings ? <ProductRating rating={details.rating} reviewCount={details.reviewCount} muted={design.palette.muted} className="mt-2" compact /> : null}
        <div className="mt-2 text-[10px]" style={{ color: design.palette.muted }}>{details.delivery}</div>
        <div className="mt-3"><AnatomyPrice design={design} product={product} index={index} /></div>
      </div>
    </motion.article>
  );
}

function MobileProductRow({ product, design, cardBackground, index }: { product: DesignGenome["store"]["products"][number]; design: DesignGenome; cardBackground: string; index: number }) {
  const details = buildProductSignals(product, design.store.category, index);
  return (
    <motion.article {...sectionReveal(design, index)} className="sf-mobile-product-row grid grid-cols-[96px_minmax(0,1fr)] gap-3 p-3" style={{ background: cardBackground, border: `1px solid ${design.palette.border}`, borderRadius: Math.max(14, design.geometry.radius - 4) }}>
      <img src={product.image} alt={product.name} className="h-28 w-24 rounded-xl object-cover" />
      <div className="min-w-0 self-center">
        <div className="text-[9px] uppercase tracking-[.18em]" style={{ color: design.palette.muted }}>{product.tag}</div>
        <div className="mt-1 break-words text-sm font-semibold leading-[1.2]">{product.name}</div>
        <div className="mt-1 line-clamp-2 text-[11px] leading-4" style={{ color: design.palette.muted }}>{product.subtitle}</div>
        {design.commerce?.showRatings ? <ProductRating rating={details.rating} reviewCount={details.reviewCount} muted={design.palette.muted} className="mt-2" compact /> : null}
        <div className="mt-2 text-[10px]" style={{ color: design.palette.muted }}>{details.assurance}</div>
        <div className="mt-3 flex items-center justify-between gap-3"><AnatomyPrice design={design} product={product} index={index} /><button className="sf-micro-button rounded-full border px-3 py-1.5 text-[10px] font-semibold" style={{ borderColor: design.palette.border }}>View</button></div>
      </div>
    </motion.article>
  );
}

function buildProductSignals(product: DesignGenome["store"]["products"][number], category: DesignGenome["store"]["category"], index: number) {
  const reviewCount = product.reviewCount ?? (category === "tech" ? 96 + index * 41 : 24 + index * 29);
  const rating = product.rating ?? Number(((category === "beauty" || category === "fashion") ? 4.8 : 4.6).toFixed(1));
  const chipsByCategory: Record<DesignGenome["store"]["category"], string[][]> = {
    fashion: [["Tailored silhouette", "Premium blend"], ["Day-to-night", "Soft structure"], ["Limited capsule", "Editorial fit"]],
    shoes: [["Responsive foam", "Street-ready"], ["Runner favorite", "High traction"], ["Cloud-soft step", "Everyday pair"]],
    accessories: [["Gift-ready", "Refined hardware"], ["Compact carry", "Travel approved"], ["Polished finish", "Easy styling"]],
    home: [["Textural layer", "Calm palette"], ["Room refresh", "Small-batch feel"], ["Easy-care", "Design staple"]],
    beauty: [["Barrier friendly", "Daily ritual"], ["Hydration support", "Routine favorite"], ["Glow finish", "Clean formula"]],
    food: [["Small batch", "Chef-approved"], ["Pantry favorite", "Giftable"], ["Flavor packed", "Easy pairing"]],
    outdoor: [["Weather ready", "Trail tested"], ["Layering essential", "Built to move"], ["Pack-friendly", "Technical finish"]],
    kids: [["Soft touch", "Play-ready"], ["Parent favorite", "Easy wear"], ["Move-friendly", "Machine washable"]],
    tech: [["Fast setup", "Warranty included"], ["Creator ready", "High-spec value"], ["Performance tuned", "Ships insured"]],
  };
  const deliveryByCategory: Record<DesignGenome["store"]["category"], string> = {
    fashion: "Free delivery over $120 · Easy exchanges",
    shoes: "30-day comfort trial · Free returns",
    accessories: "Gift packaging available · Ships in 24h",
    home: "Delivery in 3–5 days · Styled for layering",
    beauty: "Derm-approved favorites · Replenish any time",
    food: "Ships fresh this week · Limited batch",
    outdoor: "Adventure-ready dispatch · Built for the season",
    kids: "Soft essentials · Easy returns for families",
    tech: "Insured shipping · 1-year protection included",
  };
  const assuranceByCategory: Record<DesignGenome["store"]["category"], string> = {
    fashion: "Size guidance available",
    shoes: "Fit guide available",
    accessories: "Premium finish guarantee",
    home: "Material details inside",
    beauty: "Ingredient transparency included",
    food: "Recipe inspiration included",
    outdoor: "Performance tested materials",
    kids: "Comfort-first construction",
    tech: "Specs verified before checkout",
  };
  return {
    rating,
    reviewCount,
    chips: chipsByCategory[category][index % chipsByCategory[category].length],
    delivery: deliveryByCategory[category],
    assurance: assuranceByCategory[category],
  };
}

function ProductRating({ rating, reviewCount, muted, className = "", compact = false }: { rating: number; reviewCount: number; muted: string; className?: string; compact?: boolean }) {
  return (
    <div className={`flex items-center gap-2 ${className}`.trim()}>
      <span className={compact ? "text-[11px]" : "text-xs"}>★ {rating.toFixed(1)}</span>
      <span className={compact ? "text-[10px]" : "text-[11px]"} style={{ color: muted }}>{reviewCount} reviews</span>
    </div>
  );
}

function buildAdvancedPriceMeta(product: DesignGenome["store"]["products"][number], index: number, category: DesignGenome["store"]["category"]) {
  const base = buildPriceMeta(product.price, index, category, product.compareAt);
  const amount = parsePriceAmount(product.price) ?? 0;
  const compareAmount = parsePriceAmount(base.compareAt ?? "") ?? 0;
  const saveAmount = compareAmount > amount ? compareAmount - amount : 0;
  const savePercent = compareAmount > amount ? Math.round((saveAmount / compareAmount) * 100) : 0;
  const splitMonths = category === "tech" ? 12 : category === "home" ? 6 : 4;
  const installment = amount > 0 ? formatPriceLike(product.price, amount / splitMonths) : null;
  const bundlePrice = amount > 0 ? formatPriceLike(product.price, amount * 1.68) : null;
  const tierPrice = amount > 0 ? formatPriceLike(product.price, amount * 0.88) : null;
  return {
    ...base,
    amount,
    saveAmount: saveAmount > 0 ? formatPriceLike(product.price, saveAmount) : null,
    savePercent,
    installment,
    splitMonths,
    bundlePrice,
    tierPrice,
    shippingNote: category === "tech" ? "Insured shipping" : category === "food" ? "Fresh weekly dispatch" : "Free shipping on qualifying orders",
    trustNote: category === "beauty" ? "Routine-friendly" : category === "outdoor" ? "Field-tested" : category === "fashion" ? "Easy exchanges" : "Easy returns",
  };
}

function MediaMicroLayout({ design, product, index }: { design: DesignGenome; product: DesignGenome["store"]["products"][number]; index: number }) {
  const mode = design.commerce?.mediaBehavior ?? "hoverZoom";
  const shell = { borderColor: design.palette.border, color: design.palette.muted };
  if (mode === "gallery") {
    return (
      <div className="mt-3 flex items-center gap-2">
        {[0, 1, 2].map((thumb) => (
          <button key={thumb} className="h-10 w-10 overflow-hidden rounded-xl border" style={{ borderColor: design.palette.border, background: thumb === 0 ? `url(${product.image}) center/cover` : `linear-gradient(135deg, ${design.palette.surface}, ${design.palette.elevated})` }} aria-label={`Gallery image ${thumb + 1}`} />
        ))}
        <span className="ml-auto rounded-full border px-3 py-1 text-[10px] uppercase tracking-[.18em]" style={shell}>360° view</span>
      </div>
    );
  }
  if (mode === "hoverSwap") {
    return <div className="mt-3 flex flex-wrap gap-2">{["Front", "Detail", "Lifestyle"].map((item) => <span key={item} className="rounded-full border px-3 py-1 text-[10px] uppercase tracking-[.18em]" style={shell}>{item}</span>)}</div>;
  }
  if (mode === "hoverVideo" || mode === "autoplayVideo") {
    return <div className="mt-3 flex items-center justify-between rounded-2xl border px-3 py-2" style={{ borderColor: design.palette.border, background: `color-mix(in srgb, ${design.palette.surface} 88%, transparent)` }}><span className="text-[10px] uppercase tracking-[.18em]" style={{ color: design.palette.muted }}>Preview clip</span><span className="text-xs font-medium">0:{12 + (index % 4) * 3}</span></div>;
  }
  if (mode === "parallax" || mode === "maskedReveal") {
    return <div className="mt-3 flex flex-wrap gap-2">{["Studio light", "Texture zoom"].map((item) => <span key={item} className="rounded-full px-3 py-1 text-[10px]" style={{ background: `color-mix(in srgb, ${design.palette.surface} 84%, transparent)`, border: `1px solid ${design.palette.border}`, color: design.palette.muted }}>{item}</span>)}</div>;
  }
  return <div className="mt-3 flex items-center justify-between text-[10px]" style={{ color: design.palette.muted }}><span>Editorial product media</span><span>Tap for close-up</span></div>;
}

function PriceBlock({ design, product, index, compact = false }: { design: DesignGenome; product: DesignGenome["store"]["products"][number]; index: number; compact?: boolean }) {
  const meta = buildAdvancedPriceMeta(product, index, design.store.category);
  const style = design.commerce?.priceStyle ?? "standard";
  if (style === "minimal") return <div className={compact ? "text-sm" : "text-base"}>{product.price}</div>;
  if (style === "pricePill") return <div><div className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold" style={{ background: design.palette.primary, color: design.palette.primaryText }}>{meta.current}{meta.saleLabel ? <span className="rounded-full bg-white/16 px-2 py-1 text-[9px] uppercase tracking-[.14em]">{meta.saleLabel}</span> : null}</div>{meta.compareAt ? <div className="mt-2 text-[10px]" style={{ color: design.palette.muted }}><span className="line-through">{meta.compareAt}</span>{meta.saveAmount ? <span className="ml-2">Save {meta.saveAmount}</span> : null}</div> : null}</div>;
  if (style === "compareStrong") return <div><div className={compact ? "text-lg font-semibold" : "text-2xl font-semibold tracking-[-.04em]"}>{meta.current}</div>{meta.compareAt ? <div className="mt-1 text-[10px] uppercase tracking-[.16em]" style={{ color: design.palette.muted }}><span className="line-through">{meta.compareAt}</span>{meta.savePercent ? <span className="ml-2">-{meta.savePercent}%</span> : null}</div> : <div className="mt-1 text-[10px] uppercase tracking-[.16em]" style={{ color: design.palette.muted }}>{meta.shippingNote}</div>}</div>;
  if (style === "saleCallout") return <div><div className="flex items-center gap-2"><span className={compact ? "text-base font-semibold" : "text-xl font-semibold"} style={{ color: design.palette.primary }}>{meta.current}</span>{meta.saleLabel ? <span className="rounded-full px-2 py-1 text-[9px] font-semibold uppercase tracking-[.14em]" style={{ background: `color-mix(in srgb, ${design.palette.primary} 18%, transparent)`, color: design.palette.primary }}>{meta.saleLabel}</span> : null}</div>{meta.compareAt ? <div className="mt-1 text-[10px]" style={{ color: design.palette.muted }}><span className="line-through">{meta.compareAt}</span>{meta.savePercent ? <span className="ml-2">{meta.savePercent}% off</span> : null}</div> : <div className="mt-1 text-[10px]" style={{ color: design.palette.muted }}>{meta.trustNote}</div>}</div>;
  if (style === "luxuryInline") return <div><div className="flex items-center gap-2"><span className={compact ? "text-sm" : "text-base"}>{meta.current}</span><span className="text-[9px] uppercase tracking-[.16em]" style={{color:design.palette.muted}}>USD</span></div>{meta.compareAt ? <div className="mt-1 text-[10px]" style={{color:design.palette.muted}}><span className="line-through">{meta.compareAt}</span>{meta.savePercent ? <span className="ml-2">Save {meta.savePercent}%</span> : null}</div> : null}</div>;
  if (style === "installment") return <div><div className="font-semibold">{meta.current}</div><div className="mt-1 text-[10px]" style={{color:design.palette.muted}}>or {meta.installment} / {meta.splitMonths} months</div><div className="mt-1 text-[10px]" style={{color:design.palette.muted}}>0% APR eligible</div></div>;
  if (style === "subscription") return <div><div className="font-semibold">{meta.current}</div><div className="mt-1 text-[10px]" style={{color:design.palette.muted}}>Subscribe & save 15%</div>{meta.installment ? <div className="text-[10px]" style={{color:design.palette.muted}}>Flexible delivery cadence</div> : null}</div>;
  if (style === "bundle") return <div><div className="font-semibold">{meta.current}</div><div className="mt-1 text-[10px]" style={{color:design.palette.muted}}>Bundle from {meta.bundlePrice}</div><div className="text-[10px]" style={{color:design.palette.muted}}>Pick 3 and save more</div></div>;
  if (style === "tiered") return <div><div className="font-semibold">{meta.current}</div><div className="mt-1 text-[10px]" style={{color:design.palette.muted}}>5+ units · from {meta.tierPrice}</div></div>;
  if (style === "techSpec") return <div><div className="text-[10px] uppercase tracking-[.14em]" style={{color:design.palette.muted}}>From</div><div className="mt-1 font-semibold">{meta.current}</div><div className="mt-1 text-[10px]" style={{color:design.palette.muted}}>{meta.shippingNote}</div></div>;
  if (style === "saveAmount" && meta.compareAt) return <div><div className="font-semibold">{meta.current}</div><div className="mt-1 text-[10px]" style={{color:design.palette.accent}}>Save {meta.saveAmount}</div><div className="text-[10px]" style={{color:design.palette.muted}}>{meta.trustNote}</div></div>;
  if (style === "percentage" || style === "discountBadge") return <div><div className="flex items-center gap-2"><span className="font-semibold">{meta.current}</span>{meta.saleLabel?<span className="rounded-full px-2 py-1 text-[9px] font-semibold" style={{background:design.palette.primary,color:design.palette.primaryText}}>{meta.saleLabel}</span>:null}</div>{meta.compareAt?<div className="mt-1 text-[10px]" style={{color:design.palette.muted}}><span className="line-through">{meta.compareAt}</span>{meta.saveAmount ? <span className="ml-2">Save {meta.saveAmount}</span> : null}</div>:null}</div>;
  if (style === "sale" && meta.compareAt) return <div><div className="font-semibold" style={{color:design.palette.primary}}>{meta.current}</div><div className="mt-1 text-[10px]" style={{color:design.palette.muted}}><span className="line-through">{meta.compareAt}</span>{meta.savePercent ? <span className="ml-2">{meta.savePercent}% off</span> : null}</div></div>;
  return <div><div className="font-semibold">{meta.current}</div>{meta.compareAt?<div className="mt-1 text-[10px]" style={{color:design.palette.muted}}><span className="line-through">{meta.compareAt}</span>{meta.savePercent ? <span className="ml-2">Save {meta.savePercent}%</span> : null}</div>:<div className="mt-1 text-[10px]" style={{color:design.palette.muted}}>{meta.shippingNote}</div>}</div>;
}



function AnatomyPrice({ design, product, index }: { design: DesignGenome; product: StoreProduct; index: number }) {
  const composition = design.pricingComposition ?? "inlineMinimal";
  const meta = buildAdvancedPriceMeta(product, index, design.store.category);
  const priceFont = design.typographyPair?.priceFamily ?? design.typography.body;
  if (composition === "largePrice" || composition === "technicalPricePanel") {
    return <div style={{ fontFamily: priceFont }}><div className="text-[10px] uppercase tracking-[.16em]" style={{ color: design.palette.muted }}>{composition === "technicalPricePanel" ? "Configure from" : "Price"}</div><div className="mt-1 text-2xl font-semibold tracking-[-.04em]">{product.price}</div>{composition === "technicalPricePanel" ? <div className="mt-1 text-[10px]" style={{color:design.palette.muted}}>Financing · warranty · delivery</div> : null}</div>;
  }
  if (composition === "priceStack") return <div style={{fontFamily:priceFont}}><div className="text-xl font-semibold">{meta.current}</div><div className="mt-1 text-[10px]" style={{color:design.palette.muted}}>{meta.shippingNote}</div></div>;
  if (composition === "oldNewPrice") return <div style={{fontFamily:priceFont}}><div className="flex items-baseline gap-2"><span className="text-lg font-semibold">{meta.current}</span>{meta.compareAt ? <span className="text-xs line-through" style={{color:design.palette.muted}}>{meta.compareAt}</span> : null}</div>{meta.saveAmount ? <div className="mt-1 text-[10px]" style={{color:design.palette.accent}}>Save {meta.saveAmount}</div> : null}</div>;
  if (composition === "percentageBadge") return <div style={{fontFamily:priceFont}}><div className="flex items-center gap-2"><span className="font-semibold">{meta.current}</span>{meta.savePercent ? <span className="rounded-full px-2 py-1 text-[9px] font-semibold" style={{background:design.palette.primary,color:design.palette.primaryText}}>-{meta.savePercent}%</span> : null}</div>{meta.compareAt ? <div className="mt-1 text-[10px] line-through" style={{color:design.palette.muted}}>{meta.compareAt}</div> : null}</div>;
  if (composition === "pricePerUnit") return <div style={{fontFamily:priceFont}}><div className="font-semibold">{product.price}</div><div className="mt-1 text-[10px]" style={{ color: design.palette.muted }}>approx. {product.price} / unit</div></div>;
  if (composition === "subscriptionPrice") return <div style={{fontFamily:priceFont}}><div className="font-semibold">{product.price}</div><div className="mt-1 text-[10px]" style={{ color: design.palette.muted }}>Subscribe & save 15%</div></div>;
  if (composition === "memberPrice") return <div style={{fontFamily:priceFont}}><div className="font-semibold">{product.price}</div><div className="mt-1 text-[10px]" style={{ color: design.palette.accent }}>Member price available</div></div>;
  if (composition === "installmentBlock") return <div style={{fontFamily:priceFont}}><div className="font-semibold">{product.price}</div><div className="mt-1 text-[10px]" style={{ color: design.palette.muted }}>{meta.installment ? `${meta.installment} × ${meta.splitMonths} months` : "Flexible monthly financing"}</div></div>;
  if (composition === "bundlePrice") return <div style={{fontFamily:priceFont}}><div className="font-semibold">{product.price}</div><div className="mt-1 text-[10px]" style={{color:design.palette.muted}}>Bundle from {meta.bundlePrice ?? product.price}</div></div>;
  if (composition === "floatingPrice" || composition === "priceCorner" || composition === "priceOverlay") return <span className="text-sm font-semibold" style={{fontFamily:priceFont}}>{product.price}</span>;
  return <PriceBlock design={design} product={product} index={index} compact />;
}

function ProductCardAnatomyBody({ design, product, index, compact, swatches, details, wishlisted, onQuickView, onWishlist, onAdd }: {
  design: DesignGenome;
  product: StoreProduct;
  index: number;
  compact: boolean;
  swatches: string[];
  details: ReturnType<typeof buildProductSignals>;
  wishlisted: boolean;
  onQuickView: () => void;
  onWishlist: () => void;
  onAdd: () => void;
}) {
  const anatomy = design.productAnatomy ?? (design.store.category === "tech" ? "technical" : design.store.category === "home" ? "furniture" : design.store.category === "beauty" ? "beauty" : design.store.category === "food" ? "food" : "imageDominant");
  const pair = design.typographyPair;
  const titleStyle = { fontFamily: pair?.headingFamily ?? design.typography.heading, fontWeight: pair?.headingWeight ?? 700, letterSpacing: `${pair?.headingTracking ?? -.03}em` };
  if (compact) return <div className="mt-3 flex items-start justify-between gap-3"><div className="min-w-0"><h3 className="text-sm leading-5" style={titleStyle}>{product.name}</h3><p className="mt-1 text-[11px] leading-4" style={{ color: design.palette.muted }}>{product.subtitle}</p></div><div className="shrink-0 text-right"><AnatomyPrice design={design} product={product} index={index}/></div></div>;

  if (anatomy === "minimal") return <div className="mt-4"><h3 className="text-base" style={titleStyle}>{product.name}</h3><div className="mt-2"><AnatomyPrice design={design} product={product} index={index}/></div></div>;

  if (anatomy === "luxury") return <div className="mt-5 border-t pt-4" style={{ borderColor: design.palette.border }}><div className="text-[9px] uppercase tracking-[.2em]" style={{ color: design.palette.muted }}>{product.tag}</div><div className="mt-2 flex items-end justify-between gap-4"><div><h3 className="text-xl" style={titleStyle}>{product.name}</h3><p className="mt-1 text-xs" style={{ color: design.palette.muted }}>{product.subtitle}</p></div><AnatomyPrice design={design} product={product} index={index}/></div><button onClick={onQuickView} className="sf-product-link mt-4 inline-flex items-center gap-2 text-xs font-semibold">View piece <ArrowRight size={13}/></button></div>;

  if (anatomy === "technical" || anatomy === "comparison") return <div className="mt-4"><div className="flex items-start justify-between gap-3"><div><div className="text-[9px] uppercase tracking-[.18em]" style={{ color: design.palette.accent }}>{product.tag}</div><h3 className="mt-1 text-lg" style={titleStyle}>{product.name}</h3></div><AnatomyPrice design={design} product={product} index={index}/></div><div className="mt-4 grid grid-cols-2 gap-2">{Object.entries(product.specs ?? {}).slice(0,4).map(([key,value])=><div key={key} className="border-t pt-2" style={{ borderColor: design.palette.border }}><div className="text-[9px] uppercase tracking-[.14em]" style={{ color: design.palette.muted }}>{key}</div><div className="mt-1 text-[11px] font-semibold">{value}</div></div>)}</div><div className="mt-4 flex items-center gap-2"><button onClick={onQuickView} className="sf-micro-button flex-1 border px-3 py-2 text-xs font-semibold" style={{ borderColor: design.palette.border, borderRadius: design.geometry.buttonRadius }}>Compare details</button><button onClick={onWishlist} aria-label="Save product" className="sf-icon-button border p-2" style={{ borderColor: design.palette.border, borderRadius: design.geometry.buttonRadius }}><Heart size={14} fill={wishlisted?"currentColor":"none"}/></button></div></div>;

  if (anatomy === "marketplace" || anatomy === "compactRetail") return <div className="mt-3"><ProductRating rating={details.rating} reviewCount={details.reviewCount} muted={design.palette.muted}/><h3 className="mt-2 text-sm font-semibold leading-5">{product.name}</h3><div className="mt-2 flex items-end justify-between gap-3"><AnatomyPrice design={design} product={product} index={index}/><button onClick={onAdd} className="sf-micro-button px-3 py-2 text-[10px] font-semibold" style={{ background: design.palette.primary, color: design.palette.primaryText, borderRadius: design.geometry.buttonRadius }}>Quick add</button></div><div className="mt-2 text-[10px]" style={{ color: design.palette.muted }}>{details.delivery} · {details.assurance}</div></div>;

  if (anatomy === "beauty") return <div className="mt-4"><div className="text-[9px] uppercase tracking-[.18em]" style={{ color: design.palette.accent }}>{product.tag} · routine step</div><h3 className="mt-2 text-lg" style={titleStyle}>{product.name}</h3><ProductRating rating={details.rating} reviewCount={details.reviewCount} muted={design.palette.muted} className="mt-2"/><div className="mt-3 flex items-center gap-2">{swatches.slice(0,5).map((swatch)=><button key={swatch} aria-label="Select shade" className="h-4 w-4 rounded-full border" style={{ background:swatch,borderColor:design.palette.border }}/>)}</div><div className="mt-4 flex items-end justify-between gap-4"><AnatomyPrice design={design} product={product} index={index}/><button onClick={onAdd} className="sf-product-link text-xs font-semibold">Add to routine</button></div></div>;

  if (anatomy === "furniture") return <div className="mt-4"><div className="flex items-start justify-between gap-4"><div><h3 className="text-lg" style={titleStyle}>{product.name}</h3><p className="mt-1 text-xs" style={{ color:design.palette.muted }}>{product.subtitle}</p></div><AnatomyPrice design={design} product={product} index={index}/></div><div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[10px]" style={{ color: design.palette.muted }}><span>Material · {Object.values(product.specs??{})[0]??"Premium finish"}</span><span>Dimensions · {Object.values(product.specs??{})[1]??"Multiple sizes"}</span></div><div className="mt-3 flex gap-2">{swatches.slice(0,4).map(s=><span key={s} className="h-4 w-4 rounded-full border" style={{background:s,borderColor:design.palette.border}}/>)}</div></div>;

  if (anatomy === "food") return <div className="mt-4"><div className="text-[9px] uppercase tracking-[.18em]" style={{color:design.palette.accent}}>{product.tag} · fresh selection</div><div className="mt-2 flex items-start justify-between gap-3"><div><h3 className="text-lg" style={titleStyle}>{product.name}</h3><p className="mt-1 text-xs" style={{color:design.palette.muted}}>{product.subtitle}</p></div><AnatomyPrice design={design} product={product} index={index}/></div><button onClick={onAdd} className="sf-micro-button mt-4 w-full border px-3 py-2.5 text-xs font-semibold" style={{borderColor:design.palette.border,borderRadius:design.geometry.buttonRadius}}>Add to basket</button></div>;

  if (anatomy === "fashionEditorial" || anatomy === "streetwear") return <div className="mt-4"><div className="text-[9px] uppercase tracking-[.2em]" style={{color:design.palette.muted}}>{product.tag}</div><div className="mt-2 flex items-start justify-between gap-4"><div><h3 className={anatomy==="streetwear"?"text-xl uppercase":"text-xl"} style={titleStyle}>{product.name}</h3><p className="mt-1 text-xs" style={{color:design.palette.muted}}>{product.subtitle}</p></div><AnatomyPrice design={design} product={product} index={index}/></div><div className="mt-3 flex items-center justify-between"><div className="flex gap-2">{swatches.slice(0,4).map(s=><span key={s} className="h-3.5 w-3.5 rounded-full border" style={{background:s,borderColor:design.palette.border}}/>)}</div><button onClick={onQuickView} className="sf-product-link text-xs font-semibold">Quick look</button></div></div>;

  return <div className="mt-4"><div className="flex items-start justify-between gap-3"><div className="min-w-0"><h3 className="text-base" style={titleStyle}>{product.name}</h3><p className="mt-1 text-xs" style={{color:design.palette.muted}}>{product.subtitle}</p>{design.commerce?.showRatings?<ProductRating rating={details.rating} reviewCount={details.reviewCount} muted={design.palette.muted} className="mt-2"/>:null}</div><AnatomyPrice design={design} product={product} index={index}/></div></div>;
}

function ProductCard({ product, design, cardBackground, transition, index, editorial = false, compact = false }: { product: DesignGenome["store"]["products"][number]; design: DesignGenome; cardBackground: string; transition: { duration: number; ease: [number, number, number, number] }; index: number; editorial?: boolean; compact?: boolean }) {
  const commerce = useCommerce();
  const wishlisted = commerce.isWishlisted(product);
  const pricing = buildPriceMeta(product.price, index, design.store.category, product.compareAt);
  const details = buildProductSignals(product, design.store.category, index);
  const swatches = product.colors?.length ? product.colors : priceSwatches(index, design);
  const cardStyle = design.commerce?.cardStyle ?? "softCard";
  const border = cardStyle === "borderless" || cardStyle === "flat" ? "transparent" : design.palette.border;
  const cardBg = cardStyle === "flat" || cardStyle === "borderless" ? "transparent" : cardStyle === "glass" ? `color-mix(in srgb, ${design.palette.surface} 74%, transparent)` : cardBackground;
  return (
    <motion.article
      {...sectionReveal(design, index)}
      transition={{ ...productInteractionTransition(design), delay: index * design.motion.stagger }}
      whileHover={productCardHoverInteraction(design, index)}
    >
      <div style={{ background: cardBg, borderRadius: cardStyle === "retail" ? Math.max(8, design.geometry.radius - 10) : design.geometry.radius, border: `1px solid ${border}`, padding: cardStyle === "borderless" ? 0 : compact ? 8 : 10, boxShadow: cardStyle === "softCard" ? shadow[design.surfaces.shadow] : "none" }}>
        <motion.div className="group relative overflow-hidden" style={{ borderRadius: Math.max(10, design.geometry.radius - 8), boxShadow: shadow[design.surfaces.shadow] }} whileHover={productImageInteraction(design, index)} transition={productInteractionTransition(design)}>
          {design.commerce?.mediaBehavior === "autoplayVideo" && design.store.heroVideoUrl && index === 0 ? (
            <motion.video
              src={design.store.heroVideoUrl}
              poster={product.image}
              autoPlay
              muted
              loop
              playsInline
              className={`sf-product-image w-full object-cover ${compact ? "h-[180px] md:h-[220px]" : editorial ? "h-[380px] md:h-[440px]" : "h-[320px] md:h-[360px]"}`}
            />
          ) : (
            <>
              <motion.img src={product.image} alt={product.name} className={`sf-product-image w-full object-cover ${compact ? "h-[180px] md:h-[220px]" : editorial ? "h-[380px] md:h-[440px]" : "h-[320px] md:h-[360px]"}`} />
              {(design.interactionProfile?.imageBehavior === "alternateImage" || design.interactionProfile?.imageBehavior === "crossfade") && product.gallery?.[1] ? (
                <img src={product.gallery[1]} alt={`${product.name} alternate view`} className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              ) : null}
            </>
          )}
          {["floatingPrice", "priceCorner", "priceOverlay"].includes(design.pricingComposition ?? "") ? (
            <div className={`absolute ${design.pricingComposition === "priceCorner" ? "bottom-3 left-3" : design.pricingComposition === "floatingPrice" ? "bottom-3 left-1/2 -translate-x-1/2" : "bottom-0 left-0 right-0"} px-3 py-2 text-sm font-semibold`} style={{ background: design.pricingComposition === "priceOverlay" ? "rgba(0,0,0,.58)" : "rgba(255,255,255,.88)", color: design.pricingComposition === "priceOverlay" ? "#fff" : "#111", backdropFilter: "blur(10px)", borderRadius: design.pricingComposition === "priceOverlay" ? 0 : 999 }}>{product.price}</div>
          ) : null}
          {design.commerce?.showBadges !== false ? <span style={{ position: "absolute", top: 12, left: 12, padding: "5px 8px", borderRadius: 999, fontSize: 9, background: "rgba(255,255,255,.82)", color: "#222", backdropFilter: "blur(10px)", textTransform: "uppercase", letterSpacing: ".06em" }}>{product.tag}</span> : null}
          {pricing.saleLabel ? (
            <span style={{ position: "absolute", top: 12, right: 12, padding: "5px 8px", borderRadius: 999, fontSize: 9, background: design.palette.primary, color: design.palette.primaryText, textTransform: "uppercase", letterSpacing: ".06em" }}>
              {pricing.saleLabel}
            </span>
          ) : null}
          {design.commerce?.showBadges !== false && product.badge ? <span style={{ position: "absolute", left: 12, bottom: 12, padding: "5px 8px", borderRadius: 999, fontSize: 9, background: "rgba(0,0,0,.52)", color: "#fff", backdropFilter: "blur(10px)", letterSpacing: ".03em" }}>{product.badge}</span> : null}
          {design.commerce?.wishlist ? (
            <motion.button
              aria-label={`Save ${product.name}`}
              onClick={() => commerce.toggleWishlist(product)}
              whileHover={{ scale: 1.08, y: -1 }}
              whileTap={{ scale: 0.94 }}
              transition={{ duration: 0.18 }}
              className="absolute right-3 rounded-full border border-white/35 bg-black/35 p-2 text-white backdrop-blur-md"
              style={{ top: pricing.saleLabel ? 48 : 12 }}
            >
              <Heart size={14} fill={wishlisted ? "currentColor" : "none"} />
            </motion.button>
          ) : null}
          {design.commerce?.quickView ? (
            <motion.button
              onClick={() => commerce.addToCart(product)}
              whileHover={{ scale: 1.025, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.18 }}
              className={`sf-product-quick-action absolute bottom-3 right-3 rounded-full border border-white/30 bg-black/45 px-3 py-2 text-[10px] font-semibold uppercase tracking-[.12em] text-white backdrop-blur-md ${design.interactionProfile?.quickActionBehavior === "hover" ? "sf-quick-hover" : ""}`}
            >
              Quick add
            </motion.button>
          ) : null}
        </motion.div>
        <ProductCardAnatomyBody
          design={design}
          product={product}
          index={index}
          compact={compact}
          swatches={swatches}
          details={details}
          wishlisted={wishlisted}
          onQuickView={() => commerce.openQuickView(product)}
          onWishlist={() => commerce.toggleWishlist(product)}
          onAdd={() => commerce.addToCart(product)}
        />
      </div>
    </motion.article>
  );
}

function buildPriceMeta(price: string, index: number, category: DesignGenome["store"]["category"], preferredCompareAt?: string) {
  const amount = parsePriceAmount(price);
  if (!amount) return { current: price, compareAt: preferredCompareAt ?? null as string | null, saleLabel: null as string | null };
  const eligible = category !== "home" || index % 2 === 0 || Boolean(preferredCompareAt);
  if (!eligible) return { current: price, compareAt: preferredCompareAt ?? null as string | null, saleLabel: null as string | null };
  const compareAt = preferredCompareAt ?? formatPriceLike(price, amount * (1.12 + ((index % 3) * 0.05)));
  const compareAmount = parsePriceAmount(compareAt) ?? amount;
  const discount = compareAmount > amount ? Math.max(8, Math.round((1 - amount / compareAmount) * 100)) : 0;
  return {
    current: price,
    compareAt,
    saleLabel: discount > 0 && index % 2 === 0 ? `-${discount}%` : null,
  };
}


function collectionHeadline(category: DesignGenome["store"]["category"]) {
  const labels: Record<DesignGenome["store"]["category"], string> = {
    fashion: "Shop the edit",
    shoes: "Find your pair",
    accessories: "Finishing touches",
    home: "Shop by room",
    beauty: "Build your ritual",
    food: "Shop by craving",
    outdoor: "Choose your terrain",
    kids: "Made for play",
    tech: "Shop by category",
  };
  return labels[category];
}

function productHeadline(category: DesignGenome["store"]["category"]) {
  const labels: Record<DesignGenome["store"]["category"], string> = {
    fashion: "Latest arrivals",
    shoes: "Fresh pairs",
    accessories: "New essentials",
    home: "Design favorites",
    beauty: "Routine essentials",
    food: "Popular picks",
    outdoor: "Field-tested favorites",
    kids: "Playtime picks",
    tech: "Featured products",
  };
  return labels[category];
}

function defaultPromo(category: DesignGenome["store"]["category"]) {
  const promos: Record<DesignGenome["store"]["category"], string> = {
    fashion: "New season edit — discover the latest drop",
    shoes: "Free shipping on selected footwear",
    accessories: "New accessories just landed",
    home: "Refresh your space with the newest collection",
    beauty: "Build a simpler routine with new essentials",
    food: "Fresh picks, limited batches, seasonal favorites",
    outdoor: "New gear for the next route",
    kids: "Soft, playful pieces made for everyday movement",
    tech: "New releases, smarter setups, better upgrades",
  };
  return promos[category];
}

function utilityLine(category: DesignGenome["store"]["category"]) {
  const lines: Record<DesignGenome["store"]["category"], string> = {
    fashion: "Fit guide · Easy returns",
    shoes: "Size finder · Easy returns",
    accessories: "Gift-ready · Care guide",
    home: "Room guide · Delivery support",
    beauty: "Routine finder · Ingredient guide",
    food: "Delivery info · Storage guide",
    outdoor: "Gear finder · Field support",
    kids: "Size guide · Parent support",
    tech: "Compatibility finder · Expert help",
  };
  return lines[category];
}

function extraHeaderLinks(category: DesignGenome["store"]["category"]) {
  const links: Record<DesignGenome["store"]["category"], string[]> = {
    fashion: ["Journal", "Lookbook", "About"],
    shoes: ["Shoe quiz", "Performance", "Stories"],
    accessories: ["Gifts", "Materials", "Journal"],
    home: ["Rooms", "Inspiration", "Journal"],
    beauty: ["Routine quiz", "Ingredients", "Journal"],
    food: ["Recipes", "Bundles", "Our story"],
    outdoor: ["Field notes", "Gear guide", "Stories"],
    kids: ["New in", "Play guide", "Our story"],
    tech: ["Brands", "Deals", "Services"],
  };
  return links[category];
}

function footerColumns(category: DesignGenome["store"]["category"], navItems: string[]) {
  const primary = navItems.length ? navItems.slice(0, 4) : ["Shop all", "New arrivals", "Best sellers"];
  const supportByCategory: Record<DesignGenome["store"]["category"], string[]> = {
    fashion: ["Fit guide", "Shipping & returns", "Contact us"],
    shoes: ["Size guide", "Shipping & returns", "Contact us"],
    accessories: ["Care guide", "Shipping & returns", "Contact us"],
    home: ["Delivery", "Care & materials", "Contact us"],
    beauty: ["Ingredients", "Routine guide", "Contact us"],
    food: ["Delivery", "Storage", "Contact us"],
    outdoor: ["Gear guide", "Shipping & returns", "Contact us"],
    kids: ["Size guide", "Shipping & returns", "Contact us"],
    tech: ["Compatibility", "Warranty", "Contact us"],
  };
  return [
    { title: "Shop", items: primary },
    { title: "Brand", items: ["About us", "Journal", "Our story"] },
    { title: "Help", items: supportByCategory[category] },
  ];
}

function parsePriceAmount(price: string) {
  const cleaned = Number(price.replace(/[^0-9.]/g, ""));
  return Number.isFinite(cleaned) && cleaned > 0 ? cleaned : null;
}

function formatPriceLike(template: string, amount: number) {
  const symbol = template.trim().match(/^[^\d]+/)?.[0] ?? "$";
  const decimals = template.includes(".") ? 2 : 0;
  return `${symbol}${amount.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}`;
}

function priceSwatches(index: number, design: DesignGenome) {
  const palette = [design.palette.primary, design.palette.accent, design.palette.text, design.palette.surface];
  return [palette[index % palette.length], palette[(index + 1) % palette.length], palette[(index + 2) % palette.length]];
}

function Eyebrow({ color, children }: { color: string; children: React.ReactNode }) {
  return <div className="mb-4 text-[11px] font-semibold uppercase tracking-[.26em]" style={{ color }}>{children}</div>;
}

function HeroHeading({ design, size, color, children }: { design: DesignGenome; size: string; color?: string; children: React.ReactNode }) {
  const balance = design.typography.scale === "large" ? 0.86 : design.typography.scale === "compact" ? 0.94 : 0.9;
  return (
    <h1 className="sf-hero-heading" style={{ fontFamily: design.typography.heading, fontWeight: design.typography.headingWeight, letterSpacing: `${design.typography.headingTracking}em`, fontSize: size, lineHeight: balance, color: color ?? design.palette.text, maxWidth: "11ch" }}>
      {children}
    </h1>
  );
}

function HeroButton({ design, inverse = false, children }: { design: DesignGenome; inverse?: boolean; children: React.ReactNode }) {
  return (
    <button
      className="sf-hero-button sf-micro-button mt-7 inline-flex items-center gap-2 px-6 py-4 text-sm font-semibold"
      style={{
        borderRadius: design.geometry.buttonRadius,
        background: inverse ? "rgba(255,255,255,.12)" : design.palette.primary,
        color: inverse ? "#FFFFFF" : design.palette.primaryText,
        border: inverse ? "1px solid rgba(255,255,255,.24)" : `1px solid ${design.palette.primary}`,
        backdropFilter: inverse ? "blur(14px)" : undefined,
      }}
    >
      {children} <ArrowRight size={16} />
    </button>
  );
}
