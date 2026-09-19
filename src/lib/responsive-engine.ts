import type { DesignGenome, Device, FooterLayout, HeaderLayout, HeroLayout, ProductGridLayout, SectionSpec } from "@/types/design";

const MOBILE_HERO_MAP: Partial<Record<HeroLayout, HeroLayout>> = {
  fullBleedEditorial: "showcase",
  dualCampaign: "splitMedia",
  floatingProducts: "showcase",
  megaTypography: "campaign",
  imageCollage: "splitMedia",
  collectionHero: "showcase",
  cinematicProduct: "showcase",
  magazine: "editorial",
  immersive: "splitMedia",
};

const TABLET_HERO_MAP: Partial<Record<HeroLayout, HeroLayout>> = {
  fullBleedEditorial: "magazine",
  dualCampaign: "splitMedia",
  floatingProducts: "showcase",
  megaTypography: "launch",
  imageCollage: "editorial",
};

const MOBILE_GRID_MAP: Partial<Record<ProductGridLayout, ProductGridLayout>> = {
  denseRetail: "cards",
  comparison: "featuredPlusRail",
  specGrid: "featuredPlusRail",
  shopTheLook: "featureSplit",
  magazineGrid: "cards",
  categoryTabs: "stackedCards",
  bundleGrid: "cards",
  horizontalEditorial: "featureSplit",
  editorialRail: "carousel",
  luxurySparse: "spotlight",
  asymmetric: "cards",
  staggeredGallery: "cards",
  priceSpotlight: "featuredPlusRail",
  tickerShowcase: "carousel",
  floatingRail: "carousel",
  editorialDeck: "featureSplit",
  hoverPanels: "cards",
  zigzagEditorial: "featureSplit",
  stackedShowcase: "featuredPlusRail",
};

const TABLET_GRID_MAP: Partial<Record<ProductGridLayout, ProductGridLayout>> = {
  denseRetail: "featuredPlusRail",
  comparison: "featuredPlusRail",
  specGrid: "comparison",
  shopTheLook: "featureSplit",
  staggeredGallery: "magazineGrid",
  tickerShowcase: "carousel",
  floatingRail: "featuredPlusRail",
  editorialDeck: "featureSplit",
  priceSpotlight: "comparison",
};

const MOBILE_FOOTER_MAP: Partial<Record<FooterLayout, FooterLayout>> = {
  oversizedBrand: "columns",
  imageSplit: "newsletterHero",
  darkCommerce: "supportHeavy",
  legalHeavy: "columns",
  storeLocator: "compact",
};

const TABLET_FOOTER_MAP: Partial<Record<FooterLayout, FooterLayout>> = {
  oversizedBrand: "imageSplit",
  darkCommerce: "columns",
};


const MOBILE_SECTION_VARIANTS: Partial<Record<SectionSpec["variant"], SectionSpec["variant"]>> = {
  asymmetricMosaic: "imageRail",
  magazineCollections: "imageRail",
  oversizedTiles: "stackedCategories",
  fullBleedTiles: "stackedCategories",
  splitCategories: "stackedCategories",
  stickyStory: "imageFirstStory",
  scrollStory: "editorialSplit",
  collageStory: "imageFirstStory",
  magazineStory: "editorialSplit",
  overlappingStory: "imageFirstStory",
  reviewMasonry: "reviewCarousel",
  quoteWall: "minimalQuotes",
  sidebarFAQ: "minimalAccordion",
  twoColumnFAQ: "minimalAccordion",
  categoryFAQ: "numberedFAQ",
  largeQuestionFAQ: "minimalAccordion",
  oversizedEditorial: "sideSignup",
  imageSplit: "sideSignup",
  magazineSignup: "minimalInline",
  collageCampaign: "imageFirstCampaign",
  splitCampaign: "imageFirstCampaign",
  classicTable: "featureCards",
  comparisonMatrix: "compactComparison",
  technicalSpecs: "compactComparison",
  stickyComparison: "featureCards",
  socialMasonry: "InstagramRail",
  communityWall: "InstagramRail",
  floatingUGC: "InstagramRail",
  alternatingFeatures: "numberedFeatures",
  featureTimeline: "numberedFeatures",
  visualFeatureGrid: "iconGrid",
};

const TABLET_SECTION_VARIANTS: Partial<Record<SectionSpec["variant"], SectionSpec["variant"]>> = {
  fullBleedTiles: "asymmetricMosaic",
  stickyStory: "editorialSplit",
  reviewMasonry: "editorialQuotes",
  sidebarFAQ: "twoColumnFAQ",
  comparisonMatrix: "horizontalComparison",
  stickyComparison: "horizontalComparison",
};

const MOBILE_NAV_MAP: Partial<Record<HeaderLayout, HeaderLayout>> = {
  megaMenu: "compactSticky",
  sideNav: "compactSticky",
  logoRail: "centered",
  categoryBar: "compactSticky",
  promoHeavy: "stacked",
  searchFirst: "stacked",
};

export function getResponsiveDesign(input: DesignGenome, device: Device): DesignGenome {
  if (device === "desktop") return input;

  const design = structuredClone(input);
  const mobile = device === "mobile";
  const heroMap = mobile ? MOBILE_HERO_MAP : TABLET_HERO_MAP;
  const gridMap = mobile ? MOBILE_GRID_MAP : TABLET_GRID_MAP;
  const footerMap = mobile ? MOBILE_FOOTER_MAP : TABLET_FOOTER_MAP;

  design.layout.hero = heroMap[design.layout.hero] ?? design.layout.hero;
  design.layout.productGrid = gridMap[design.layout.productGrid] ?? design.layout.productGrid;
  design.layout.footer = (design.layout.footer ? footerMap[design.layout.footer] : undefined) ?? design.layout.footer;
  if (mobile) design.layout.nav = MOBILE_NAV_MAP[design.layout.nav] ?? design.layout.nav;

  design.layout.density = mobile ? "balanced" : design.layout.density === "airy" ? "balanced" : design.layout.density;
  design.layout.sectionRhythm = mobile ? "balanced" : design.layout.sectionRhythm;

  if (design.composition) {
    design.composition.contentWidth = mobile ? "contained" : design.composition.contentWidth === "fullBleed" ? "wide" : design.composition.contentWidth;
    design.composition.whitespaceProfile = mobile ? (design.composition.whitespaceProfile === "dramatic" ? "generous" : "balanced") : design.composition.whitespaceProfile;
    design.composition.imageRhythm = mobile ? (design.composition.imageRhythm === "immersive" ? "alternating" : design.composition.imageRhythm) : design.composition.imageRhythm;
    design.composition.cardRhythm = mobile ? (design.composition.cardRhythm === "stacked" ? "mixed" : design.composition.cardRhythm) : design.composition.cardRhythm;
    design.composition.interactionDensity = mobile
      ? design.composition.interactionDensity === "kinetic" || design.composition.interactionDensity === "expressive" ? "balanced" : design.composition.interactionDensity
      : design.composition.interactionDensity;
  }

  if (design.interactionProfile && mobile) {
    design.interactionProfile = {
      ...design.interactionProfile,
      density: design.interactionProfile.density === "kinetic" || design.interactionProfile.density === "expressive" ? "balanced" : design.interactionProfile.density,
      cardBehavior: "tapAndReveal",
      quickActionBehavior: "always",
      touchBehavior: "persistentActions",
      responsiveness: "instant",
    };
  }
  if (design.motionLanguage && mobile) design.motionLanguage = { ...design.motionLanguage, ambient: "none", hoverDensity: "restrained" };

  if (design.commerce) {
    design.commerce.imageRatio = mobile
      ? (design.commerce.imageRatio === "editorial" || design.commerce.imageRatio === "landscape" ? "portrait" : design.commerce.imageRatio)
      : design.commerce.imageRatio === "mixed" ? "portrait" : design.commerce.imageRatio;
    if (mobile && design.commerce.mediaBehavior === "autoplayVideo") design.commerce.mediaBehavior = "hoverVideo";
  }

  if (mobile) {
    design.motion.loop = false;
    design.motion.sectionDistance = Math.min(design.motion.sectionDistance, 18);
    design.motion.hoverLift = Math.min(design.motion.hoverLift, 5);
    design.motion.mediaZoom = Math.min(design.motion.mediaZoom, 1.035);
    if (design.typography.scale === "large" && design.store.heroTitle.length > 62) design.typography.scale = "balanced";
  }

  const sectionVariantMap = mobile ? MOBILE_SECTION_VARIANTS : TABLET_SECTION_VARIANTS;
  design.sections = design.sections.map((section) => ({
    ...section,
    variant: sectionVariantMap[section.variant] ?? section.variant,
    alignment: mobile && section.alignment === "center" && design.composition?.alignmentPattern === "alternating" ? "left" : section.alignment,
  }));

  const availableSections = design.sections.filter((section) => !section.hidden && !(mobile && section.mobileHidden));
  if (mobile && availableSections.length > 8) {
    const required = availableSections.filter((section) => section.type === "products" || section.type === "collections");
    const rest = availableSections.filter((section) => section.type !== "products" && section.type !== "collections").slice(0, Math.max(0, 8 - required.length));
    design.sections = [...required, ...rest];
  } else {
    design.sections = availableSections;
  }

  return design;
}
