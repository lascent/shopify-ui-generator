export type Creativity = "safe" | "balanced" | "experimental";
export type Device = "desktop" | "tablet" | "mobile";
export type StorePage = "home" | "collection" | "product" | "search" | "cart" | "about" | "contact" | "faq";
export type GenerateScope = "all" | "palette" | "typography" | "layout" | "surfaces" | "motion";

export type MotionPreset =
  | "calm" | "smooth" | "editorial" | "spring" | "dynamic" | "cinematic"
  | "float" | "snappy" | "layered" | "reveal" | "glide" | "orbit"
  | "softReveal" | "clipReveal" | "staggerRise" | "editorialSlide" | "magnetic" | "parallaxSoft"
  | "imageDrift" | "menuCascade"
  | "luxuryFlow" | "gridPulse" | "spotlightReveal" | "elasticRise" | "softZoom" | "showcaseLift"
  | "marqueeFlow" | "headlineSweep" | "driftLoop"
  | "kineticTicker" | "ribbonWave" | "depthFloat" | "cascadeZoom" | "spotlightParallax";

export type StoreCategory = "fashion" | "shoes" | "accessories" | "home" | "beauty" | "food" | "outdoor" | "kids" | "tech";

export type CommerceArchetype =
  | "editorial" | "luxury" | "minimal" | "streetwear" | "sport" | "tech-retail"
  | "beauty" | "playful" | "scandinavian" | "campaign" | "dark-premium"
  | "magazine" | "catalog" | "storytelling" | "conversion";

export type HeroLayout =
  | "split" | "editorial" | "centered" | "product" | "immersive" | "statement"
  | "hotspot" | "campaign" | "beautyEditorial" | "showcase" | "bento" | "splitMedia"
  | "minimalCommerce" | "launch" | "magazine"
  | "fullBleedEditorial" | "dualCampaign" | "floatingProducts" | "megaTypography"
  | "imageCollage" | "collectionHero" | "cinematicProduct";

export type ProductGridLayout =
  | "classic" | "editorial" | "compact" | "lookbook" | "catalog" | "mosaic" | "deals"
  | "carousel" | "editorialRail" | "comparison" | "cards" | "featureSplit" | "asymmetric"
  | "stackedCards" | "minimalList" | "spotlight" | "magazineGrid"
  | "shopTheLook" | "featuredPlusRail" | "horizontalEditorial" | "denseRetail"
  | "luxurySparse" | "categoryTabs" | "bundleGrid" | "specGrid"
  | "zigzagEditorial" | "hoverPanels" | "stackedShowcase"
  | "staggeredGallery" | "priceSpotlight" | "tickerShowcase" | "floatingRail" | "editorialDeck";

export type HeaderLayout =
  | "minimal" | "floating" | "centered" | "split" | "stacked" | "searchFirst"
  | "editorial" | "utility" | "transparent"
  | "megaMenu" | "logoRail" | "categoryBar" | "compactSticky" | "promoHeavy" | "sideNav"
  | "pillNav" | "brandMarquee" | "dualRowPromo";

export type FooterLayout =
  | "minimal" | "columns" | "oversizedBrand" | "editorial" | "imageSplit" | "newsletterHero"
  | "supportHeavy" | "socialFirst" | "storeLocator" | "darkCommerce" | "compact" | "legalHeavy"
  | "megaGrid" | "immersiveSignup" | "brandWall";

export type PriceStyle =
  | "minimal" | "standard" | "sale" | "discountBadge" | "saveAmount" | "percentage"
  | "installment" | "subscription" | "bundle" | "tiered" | "techSpec" | "luxuryInline"
  | "pricePill" | "compareStrong" | "saleCallout";

export type CardStyle =
  | "borderless" | "outlined" | "softCard" | "imageFirst" | "textOverlay"
  | "editorial" | "retail" | "glass" | "flat" | "split";

export type MediaBehavior =
  | "static" | "hoverZoom" | "hoverSwap" | "hoverVideo" | "autoplayVideo"
  | "parallax" | "maskedReveal" | "gallery";

export type MediaMode = "image" | "video";

export type SectionType =
  | "collections" | "products" | "story" | "testimonials" | "faq" | "newsletter"
  | "features" | "quote" | "campaign" | "comparison" | "socialProof" | "videoStory";

export type SectionVariant =
  | "clean" | "editorial" | "split" | "cards" | "rail" | "minimal" | "immersive" | "compact" | "contrast"
  // collections
  | "imageRail" | "editorialCards" | "oversizedTiles" | "asymmetricMosaic" | "circularCollections" | "splitCategories"
  | "numberedEditorial" | "horizontalScroller" | "stackedCategories" | "fullBleedTiles" | "floatingCategories"
  | "magazineCollections" | "minimalTextCollections" | "posterCollections" | "categoryIndex"
  // story
  | "editorialSplit" | "reversedEditorialSplit" | "fullBleedStory" | "oversizedQuoteImage" | "stickyStory" | "timelineStory"
  | "collageStory" | "magazineStory" | "minimalTextStory" | "overlappingStory" | "imageFirstStory" | "textFirstStory" | "scrollStory"
  // testimonials
  | "quoteWall" | "editorialQuotes" | "featuredReview" | "splitReview" | "ratingSummary" | "reviewCarousel" | "minimalQuotes"
  | "socialReviewCards" | "reviewMasonry" | "reviewTicker" | "largeQuote" | "customerSpotlight"
  // faq
  | "minimalAccordion" | "twoColumnFAQ" | "categoryFAQ" | "sidebarFAQ" | "editorialFAQ" | "boxedFAQ" | "largeQuestionFAQ"
  | "supportFAQ" | "compactFAQ" | "numberedFAQ"
  // newsletter
  | "minimalInline" | "oversizedEditorial" | "imageSplit" | "floatingCard" | "fullWidthColor" | "darkSignup" | "magazineSignup"
  | "footerIntegrated" | "sideSignup" | "campaignSignup"
  // campaign
  | "cinematicFullBleed" | "splitCampaign" | "posterCampaign" | "collageCampaign" | "countdownCampaign" | "productCampaign"
  | "textFirstCampaign" | "imageFirstCampaign" | "launchCampaign" | "editorialCampaign"
  // social proof / ugc
  | "UGCGrid" | "UGCMarquee" | "socialMasonry" | "creatorSpotlight" | "editorialSocial" | "InstagramRail" | "floatingUGC"
  | "phoneStyleStories" | "customerGallery" | "communityWall"
  // comparison
  | "classicTable" | "featureCards" | "technicalSpecs" | "pricingComparison" | "horizontalComparison" | "productVsProduct"
  | "visualComparison" | "stickyComparison" | "compactComparison" | "comparisonMatrix"
  // features
  | "iconGrid" | "horizontalFeatures" | "numberedFeatures" | "alternatingFeatures" | "largeFeatureCards" | "minimalFeatureStrip"
  | "editorialFeatures" | "featureTimeline" | "visualFeatureGrid" | "technicalFeatureList";

export type CompositionPageFamily =
  | "minimal" | "editorial" | "catalog" | "conversion" | "luxury" | "marketplace" | "storytelling" | "campaign" | "magazine"
  | "technical" | "experimental" | "gallery" | "productLaunch" | "productFirst" | "streetwearDrop" | "japaneseMinimal"
  | "furnitureEditorial" | "beautyClinical" | "organicWellness" | "gamingLaunch" | "luxuryWatch" | "creatorBrand" | "modernGrocery"
  | "artisanFood" | "sportsPerformance" | "darkCinematic" | "boutiqueEditorial" | "neoMinimal" | "comparisonLed" | "socialCommerce"
  | "collectionFirst" | "trustFirst" | "lookbook" | "highDensityRetail" | "immersiveStory";

export type CompositionGenome = {
  pageFamily: CompositionPageFamily;
  heroAlignment: "left" | "center" | "right" | "offset";
  heroMediaPlacement: "left" | "right" | "background" | "stacked" | "collage" | "floating";
  heroTextWidth: "narrow" | "balanced" | "wide";
  sectionSequence: SectionType[];
  sectionRhythm: "tight" | "balanced" | "editorial" | "cinematic";
  contentWidth: "contained" | "wide" | "edgeToEdge" | "mixed";
  whitespaceProfile: "compressed" | "balanced" | "generous" | "dramatic";
  merchandisingDensity: "sparse" | "balanced" | "dense" | "marketplace";
  imageRhythm: "uniform" | "alternating" | "editorial" | "masonry" | "cinematic";
  cardRhythm: "uniform" | "staggered" | "mixed" | "rail" | "minimal";
  alignmentPattern: "consistent" | "alternating" | "offset" | "editorial";
  visualBalance: "symmetric" | "asymmetric" | "centerWeighted" | "mediaWeighted";
  interactionDensity: "minimal" | "restrained" | "balanced" | "expressive" | "kinetic";
};

export type ArtDirectionName =
  | "Quiet Luxury" | "High Fashion Editorial" | "Brutalist Commerce" | "Japanese Minimal" | "Scandinavian Retail"
  | "Contemporary Magazine" | "Technical Marketplace" | "Luxury Product Launch" | "Streetwear Drop" | "Y2K Commerce"
  | "Organic Wellness" | "Clinical Beauty" | "Playful Kids" | "Premium Furniture" | "Sports Performance" | "Gaming Hardware"
  | "Modern Grocery" | "Artisan Food" | "Luxury Jewelry" | "Creator Brand" | "Dark Cinematic" | "Colorful Maximalist"
  | "Neo Minimal" | "Gallery Commerce" | "Catalog Retail" | "Conversion Heavy" | "Boutique Editorial"
  | "Experimental Typography" | "Monochrome Luxury" | "Soft Pastel Commerce" | "Heritage Watchmaker" | "Technical Luxury"
  | "Modern Gallery" | "Premium Hardware" | "Editorial Fragrance";

export type ArtDirectionSelection = {
  name: ArtDirectionName;
  family: CompositionPageFamily;
  mood: string;
  compatibleArchetypes: CommerceArchetype[];
  mediaDirection: string;
};

export type TypographyPairSelection = {
  name: string;
  headingFamily: string;
  bodyFamily: string;
  displayFamily: string;
  labelFamily: string;
  priceFamily: string;
  headingWeight: number;
  bodyWeight: number;
  headingTracking: number;
  bodyTracking: number;
  labelTracking: number;
  displayScale: number;
  headingScale: number;
  bodyScale: number;
  priceScale: number;
  lineHeight: number;
  uppercaseLabels: boolean;
};

export type ProductCardAnatomy =
  | "minimal" | "imageDominant" | "fashionEditorial" | "luxury" | "technical" | "marketplace" | "beauty" | "food"
  | "furniture" | "streetwear" | "comparison" | "compactRetail" | "launch";

export type PricingComposition =
  | "inlineMinimal" | "priceStack" | "largePrice" | "oldNewPrice" | "percentageBadge" | "floatingPrice" | "priceCorner"
  | "priceOverlay" | "installmentBlock" | "memberPrice" | "subscriptionPrice" | "pricePerUnit" | "bundlePrice" | "technicalPricePanel";

export type InteractionDensity = "minimal" | "restrained" | "balanced" | "expressive" | "kinetic";
export type ProductHoverBehavior =
  | "imageZoom" | "imagePan" | "alternateImage" | "crossfadeImage" | "revealSecondImage" | "cardLift" | "borderReveal" | "shadowRise"
  | "infoSlideUp" | "infoFadeIn" | "priceReveal" | "quickAddReveal" | "wishlistReveal" | "swatchesReveal" | "arrowReveal"
  | "productTitleShift" | "imageCurtain" | "cursorTilt" | "spotlightFollow" | "minimalUnderline" | "mediaCropShift" | "productGalleryPreview";

export type InteractionProfileSelection = {
  name: string;
  density: InteractionDensity;
  responsiveness: "instant" | "fast" | "smooth" | "editorial";
  cardBehavior: ProductHoverBehavior;
  imageBehavior: "subtleZoom" | "zoomAndPan" | "cropShift" | "alternateImage" | "crossfade" | "overlayReveal" | "captionReveal" | "directionalReveal" | "grayscaleToColor" | "softBrightness" | "parallaxPointer" | "perspectiveTilt";
  textBehavior: "none" | "underline" | "shift" | "fade" | "reveal";
  buttonBehavior: "fillSweep" | "arrowSlide" | "iconShift" | "underlineGrow" | "borderFill" | "softMagnetic" | "backgroundSlide" | "splitFill" | "textSwap" | "softPress";
  navBehavior: "slidingUnderline" | "expandingUnderline" | "activeIndicator" | "textFade" | "arrowReveal" | "backgroundHighlight" | "pillHighlight" | "megaMenuReveal" | "megaMenuPreview" | "categoryReveal";
  iconBehavior: "none" | "shift" | "rotateSoft" | "fade";
  priceBehavior: "static" | "emphasize" | "reveal" | "badge";
  quickActionBehavior: "always" | "hover" | "compact" | "overlay";
  focusBehavior: "ring" | "underline" | "outline";
  touchBehavior: "tap" | "tapAndReveal" | "swipe" | "persistentActions";
  easingFamily: "standard" | "smooth" | "snappy" | "editorial";
  feedbackSpeed: "micro" | "fast" | "normal" | "editorial";
};

export type MotionLanguageName = "QuietLuxuryMotion" | "StreetwearMotion" | "TechnicalMotion" | "EditorialMotion" | "PlayfulMotion" | "CampaignMotion" | "MinimalMotion";
export type MotionLanguageSelection = {
  name: MotionLanguageName;
  primary: MotionPreset;
  text: MotionPreset;
  media: MotionPreset;
  hover: "restrained" | "balanced" | "expressive";
  ambient: "none" | "marquee" | "ticker" | "drift";
};

export type SectionSpec = {
  id: string;
  type: SectionType;
  title?: string;
  eyebrow?: string;
  variant: SectionVariant;
  hidden?: boolean;
  mobileHidden?: boolean;
  spacing?: "compact" | "balanced" | "airy";
  alignment?: "left" | "center" | "right";
  regenerationNote?: string;
  lastRegeneratedAt?: string;
};

export type Palette = {
  background: string;
  surface: string;
  elevated: string;
  text: string;
  muted: string;
  primary: string;
  primaryText: string;
  accent: string;
  border: string;
};

export type StoreCollection = {
  title: string;
  image: string;
};

export type StoreProduct = {
  name: string;
  price: string;
  tag: string;
  subtitle: string;
  image: string;
  compareAt?: string;
  badge?: string;
  rating?: number;
  reviewCount?: number;
  colors?: string[];
  specs?: Record<string, string>;
  gallery?: string[];
};

export type StoreFilterGroup = {
  label: string;
  options: string[];
};

export type StoreContent = {
  category: StoreCategory;
  brandName: string;
  navItems: string[];
  announcement: string;
  heroKicker: string;
  heroTitle: string;
  heroBody: string;
  cta: string;
  heroImage: string;
  heroMediaMode: MediaMode;
  heroVideoUrl?: string;
  secondaryImage: string;
  collections: StoreCollection[];
  products: StoreProduct[];
  nicheLabel?: string;
  filters?: StoreFilterGroup[];
  promoTitle: string;
  promoBody: string;
};

export type CommerceSettings = {
  priceStyle: PriceStyle;
  cardStyle: CardStyle;
  imageRatio: "square" | "portrait" | "editorial" | "landscape" | "mixed";
  showRatings: boolean;
  showSwatches: boolean;
  showBadges: boolean;
  quickView: boolean;
  wishlist: boolean;
  mediaBehavior: MediaBehavior;
};

export type DesignGenome = {
  id: string;
  name: string;
  description: string;
  store: StoreContent;
  archetype?: CommerceArchetype;
  commerce?: CommerceSettings;
  palette: Palette;
  typography: {
    fontName: string;
    heading: string;
    body: string;
    headingWeight: number;
    headingTracking: number;
    scale: "compact" | "balanced" | "large";
    bodyWeight?: number;
    bodyTracking?: number;
    display?: string;
    label?: string;
    price?: string;
    pairName?: string;
  };
  layout: {
    nav: HeaderLayout;
    hero: HeroLayout;
    productGrid: ProductGridLayout;
    footer?: FooterLayout;
    density: "compact" | "balanced" | "airy";
    sectionRhythm?: "tight" | "balanced" | "editorial";
  };
  geometry: {
    radius: number;
    buttonRadius: number;
  };
  surfaces: {
    glass: number;
    blur: number;
    shadow: "none" | "soft" | "elevated";
  };
  motion: {
    preset: MotionPreset;
    duration: number;
    stagger: number;
    hoverLift: number;
    hoverScale: number;
    sectionDistance: number;
    mediaZoom: number;
    loop: boolean;
  };
  sections: SectionSpec[];
  composition?: CompositionGenome;
  artDirection?: ArtDirectionSelection;
  typographyPair?: TypographyPairSelection;
  productAnatomy?: ProductCardAnatomy;
  pricingComposition?: PricingComposition;
  interactionProfile?: InteractionProfileSelection;
  motionLanguage?: MotionLanguageSelection;
  seed: number;
  createdAt: string;
};

export type DesignLocks = {
  palette: boolean;
  typography: boolean;
  layout: boolean;
  surfaces: boolean;
  motion: boolean;
  hero: boolean;
  products: boolean;
};

export type DesignVersion = {
  id: string;
  design: DesignGenome;
  prompt: string;
  favorite: boolean;
  label: string;
};
