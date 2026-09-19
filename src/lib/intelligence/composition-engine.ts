import type {
  ArtDirectionSelection,
  CompositionGenome,
  CompositionPageFamily,
  Creativity,
  SectionSpec,
  SectionType,
  SectionVariant,
  StoreCategory,
} from "@/types/design";

export type CompositionFamilyDefinition = {
  family: CompositionPageFamily;
  sequence: SectionType[];
  variants: Partial<Record<SectionType, SectionVariant[]>>;
  rhythm: CompositionGenome["sectionRhythm"];
  contentWidth: CompositionGenome["contentWidth"];
  whitespace: CompositionGenome["whitespaceProfile"];
  density: CompositionGenome["merchandisingDensity"];
  imageRhythm: CompositionGenome["imageRhythm"];
  cardRhythm: CompositionGenome["cardRhythm"];
  balance: CompositionGenome["visualBalance"];
  interaction: CompositionGenome["interactionDensity"];
};

const d = (definition: CompositionFamilyDefinition) => definition;
const common = {
  collections: ["imageRail", "editorialCards", "oversizedTiles", "asymmetricMosaic", "circularCollections", "splitCategories", "numberedEditorial", "horizontalScroller", "stackedCategories", "fullBleedTiles", "floatingCategories", "magazineCollections", "minimalTextCollections", "posterCollections", "categoryIndex"] as SectionVariant[],
  story: ["editorialSplit", "reversedEditorialSplit", "fullBleedStory", "oversizedQuoteImage", "stickyStory", "timelineStory", "collageStory", "magazineStory", "minimalTextStory", "overlappingStory", "imageFirstStory", "textFirstStory", "scrollStory"] as SectionVariant[],
  testimonials: ["quoteWall", "editorialQuotes", "featuredReview", "splitReview", "ratingSummary", "reviewCarousel", "minimalQuotes", "socialReviewCards", "reviewMasonry", "reviewTicker", "largeQuote", "customerSpotlight"] as SectionVariant[],
  faq: ["minimalAccordion", "twoColumnFAQ", "categoryFAQ", "sidebarFAQ", "editorialFAQ", "boxedFAQ", "largeQuestionFAQ", "supportFAQ", "compactFAQ", "numberedFAQ"] as SectionVariant[],
  newsletter: ["minimalInline", "oversizedEditorial", "imageSplit", "floatingCard", "fullWidthColor", "darkSignup", "magazineSignup", "footerIntegrated", "sideSignup", "campaignSignup"] as SectionVariant[],
  campaign: ["cinematicFullBleed", "splitCampaign", "posterCampaign", "collageCampaign", "countdownCampaign", "productCampaign", "textFirstCampaign", "imageFirstCampaign", "launchCampaign", "editorialCampaign"] as SectionVariant[],
  comparison: ["classicTable", "featureCards", "technicalSpecs", "pricingComparison", "horizontalComparison", "productVsProduct", "visualComparison", "stickyComparison", "compactComparison", "comparisonMatrix"] as SectionVariant[],
  socialProof: ["UGCGrid", "UGCMarquee", "socialMasonry", "creatorSpotlight", "editorialSocial", "InstagramRail", "floatingUGC", "phoneStyleStories", "customerGallery", "communityWall"] as SectionVariant[],
  features: ["iconGrid", "horizontalFeatures", "numberedFeatures", "alternatingFeatures", "largeFeatureCards", "minimalFeatureStrip", "editorialFeatures", "featureTimeline", "visualFeatureGrid", "technicalFeatureList"] as SectionVariant[],
};

const FAMILY_DEFS: readonly CompositionFamilyDefinition[] = [
  d({ family: "editorial", sequence: ["story","collections","quote","products","socialProof","newsletter"], variants:{story:["magazineStory","editorialSplit"],collections:["magazineCollections","asymmetricMosaic"],socialProof:["editorialSocial","InstagramRail"],newsletter:["magazineSignup","minimalInline"]}, rhythm:"editorial",contentWidth:"mixed",whitespace:"generous",density:"balanced",imageRhythm:"editorial",cardRhythm:"mixed",balance:"asymmetric",interaction:"restrained" }),
  d({ family: "conversion", sequence: ["features","products","comparison","testimonials","faq","newsletter"], variants:{features:["iconGrid","technicalFeatureList"],comparison:["featureCards","pricingComparison"],testimonials:["ratingSummary","featuredReview"],faq:["supportFAQ","twoColumnFAQ"],newsletter:["minimalInline","fullWidthColor"]}, rhythm:"balanced",contentWidth:"contained",whitespace:"balanced",density:"dense",imageRhythm:"uniform",cardRhythm:"uniform",balance:"symmetric",interaction:"balanced" }),
  d({ family: "luxury", sequence: ["story","products","collections","quote","products","story","newsletter"], variants:{story:["oversizedQuoteImage","minimalTextStory"],collections:["oversizedTiles","minimalTextCollections"],newsletter:["oversizedEditorial","darkSignup"]}, rhythm:"editorial",contentWidth:"wide",whitespace:"dramatic",density:"sparse",imageRhythm:"cinematic",cardRhythm:"minimal",balance:"mediaWeighted",interaction:"restrained" }),
  d({ family: "marketplace", sequence: ["collections","campaign","products","comparison","testimonials","faq"], variants:{collections:["categoryIndex","horizontalScroller"],campaign:["productCampaign","countdownCampaign"],comparison:["classicTable","comparisonMatrix"],testimonials:["ratingSummary","socialReviewCards"],faq:["supportFAQ","compactFAQ"]}, rhythm:"tight",contentWidth:"wide",whitespace:"compressed",density:"marketplace",imageRhythm:"uniform",cardRhythm:"uniform",balance:"symmetric",interaction:"expressive" }),
  d({ family: "storytelling", sequence: ["story","collections","story","products","testimonials","newsletter"], variants:{story:["timelineStory","collageStory","scrollStory"],collections:["numberedEditorial","editorialCards"],testimonials:["editorialQuotes","customerSpotlight"],newsletter:["imageSplit","magazineSignup"]}, rhythm:"editorial",contentWidth:"mixed",whitespace:"generous",density:"balanced",imageRhythm:"alternating",cardRhythm:"mixed",balance:"asymmetric",interaction:"balanced" }),
  d({ family: "campaign", sequence: ["campaign","products","story","socialProof","testimonials","newsletter"], variants:{campaign:["cinematicFullBleed","posterCampaign","launchCampaign"],story:["fullBleedStory","overlappingStory"],socialProof:["UGCMarquee","phoneStyleStories"],testimonials:["reviewTicker","largeQuote"],newsletter:["campaignSignup","darkSignup"]}, rhythm:"cinematic",contentWidth:"edgeToEdge",whitespace:"dramatic",density:"balanced",imageRhythm:"cinematic",cardRhythm:"staggered",balance:"mediaWeighted",interaction:"kinetic" }),
  d({ family: "magazine", sequence: ["story","products","quote","socialProof","collections","products"], variants:{story:["magazineStory","oversizedQuoteImage"],socialProof:["socialMasonry","editorialSocial"],collections:["magazineCollections","posterCollections"]}, rhythm:"editorial",contentWidth:"mixed",whitespace:"generous",density:"balanced",imageRhythm:"editorial",cardRhythm:"mixed",balance:"asymmetric",interaction:"restrained" }),
  d({ family: "technical", sequence: ["features","products","comparison","story","testimonials","faq"], variants:{features:["technicalFeatureList","visualFeatureGrid"],comparison:["technicalSpecs","comparisonMatrix"],story:["textFirstStory","timelineStory"],testimonials:["ratingSummary","featuredReview"],faq:["categoryFAQ","supportFAQ"]}, rhythm:"tight",contentWidth:"wide",whitespace:"balanced",density:"dense",imageRhythm:"uniform",cardRhythm:"uniform",balance:"symmetric",interaction:"balanced" }),
  d({ family: "experimental", sequence: ["campaign","collections","quote","products","socialProof","story"], variants:{campaign:["collageCampaign","posterCampaign"],collections:["asymmetricMosaic","floatingCategories"],socialProof:["floatingUGC","socialMasonry"],story:["collageStory","overlappingStory"]}, rhythm:"cinematic",contentWidth:"edgeToEdge",whitespace:"dramatic",density:"balanced",imageRhythm:"masonry",cardRhythm:"staggered",balance:"asymmetric",interaction:"kinetic" }),
  d({ family: "gallery", sequence: ["collections","products","story","socialProof","newsletter"], variants:{collections:["fullBleedTiles","asymmetricMosaic"],story:["imageFirstStory","minimalTextStory"],socialProof:["customerGallery","UGCGrid"],newsletter:["minimalInline","footerIntegrated"]}, rhythm:"editorial",contentWidth:"edgeToEdge",whitespace:"generous",density:"sparse",imageRhythm:"masonry",cardRhythm:"minimal",balance:"mediaWeighted",interaction:"restrained" }),
  d({ family: "productLaunch", sequence: ["campaign","features","products","story","comparison","testimonials","faq"], variants:{campaign:["productCampaign","launchCampaign"],features:["largeFeatureCards","technicalFeatureList"],story:["imageFirstStory","stickyStory"],comparison:["productVsProduct","technicalSpecs"],testimonials:["featuredReview","ratingSummary"]}, rhythm:"cinematic",contentWidth:"wide",whitespace:"generous",density:"balanced",imageRhythm:"cinematic",cardRhythm:"mixed",balance:"centerWeighted",interaction:"expressive" }),
  d({ family: "productFirst", sequence: ["products","features","story","comparison","products","testimonials","faq"], variants:{features:["horizontalFeatures","visualFeatureGrid"],story:["imageFirstStory","textFirstStory"],comparison:["productVsProduct","featureCards"],testimonials:["featuredReview","minimalQuotes"]}, rhythm:"balanced",contentWidth:"wide",whitespace:"balanced",density:"balanced",imageRhythm:"uniform",cardRhythm:"mixed",balance:"symmetric",interaction:"balanced" }),
  d({ family: "streetwearDrop", sequence: ["campaign","products","story","products","socialProof","newsletter"], variants:{campaign:["posterCampaign","countdownCampaign"],story:["collageStory","fullBleedStory"],socialProof:["phoneStyleStories","UGCMarquee"],newsletter:["campaignSignup","darkSignup"]}, rhythm:"tight",contentWidth:"edgeToEdge",whitespace:"compressed",density:"dense",imageRhythm:"cinematic",cardRhythm:"staggered",balance:"asymmetric",interaction:"kinetic" }),
  d({ family: "japaneseMinimal", sequence: ["story","products","story","collections","newsletter"], variants:{story:["minimalTextStory","imageFirstStory","reversedEditorialSplit"],collections:["minimalTextCollections","numberedEditorial"],newsletter:["minimalInline","footerIntegrated"]}, rhythm:"editorial",contentWidth:"contained",whitespace:"dramatic",density:"sparse",imageRhythm:"alternating",cardRhythm:"minimal",balance:"asymmetric",interaction:"minimal" }),
  d({ family: "furnitureEditorial", sequence: ["collections","story","products","features","socialProof","newsletter"], variants:{collections:["splitCategories","oversizedTiles"],story:["stickyStory","editorialSplit"],features:["alternatingFeatures","visualFeatureGrid"],socialProof:["customerGallery","creatorSpotlight"],newsletter:["imageSplit","oversizedEditorial"]}, rhythm:"editorial",contentWidth:"wide",whitespace:"generous",density:"balanced",imageRhythm:"alternating",cardRhythm:"mixed",balance:"mediaWeighted",interaction:"restrained" }),
  d({ family: "beautyClinical", sequence: ["features","products","comparison","story","testimonials","faq","newsletter"], variants:{features:["technicalFeatureList","iconGrid"],comparison:["featureCards","comparisonMatrix"],story:["textFirstStory","editorialSplit"],testimonials:["ratingSummary","reviewCarousel"],faq:["categoryFAQ","minimalAccordion"],newsletter:["minimalInline","floatingCard"]}, rhythm:"balanced",contentWidth:"contained",whitespace:"generous",density:"balanced",imageRhythm:"uniform",cardRhythm:"uniform",balance:"symmetric",interaction:"restrained" }),
  d({ family: "organicWellness", sequence: ["story","features","products","testimonials","story","newsletter"], variants:{story:["editorialSplit","timelineStory"],features:["iconGrid","alternatingFeatures"],testimonials:["editorialQuotes","customerSpotlight"],newsletter:["imageSplit","fullWidthColor"]}, rhythm:"editorial",contentWidth:"contained",whitespace:"generous",density:"sparse",imageRhythm:"alternating",cardRhythm:"minimal",balance:"asymmetric",interaction:"restrained" }),
  d({ family: "gamingLaunch", sequence: ["campaign","features","products","comparison","socialProof","testimonials","faq"], variants:{campaign:["cinematicFullBleed","productCampaign"],features:["technicalFeatureList","visualFeatureGrid"],comparison:["technicalSpecs","comparisonMatrix"],socialProof:["UGCGrid","phoneStyleStories"],testimonials:["ratingSummary","socialReviewCards"]}, rhythm:"cinematic",contentWidth:"wide",whitespace:"balanced",density:"dense",imageRhythm:"cinematic",cardRhythm:"staggered",balance:"mediaWeighted",interaction:"kinetic" }),
  d({ family: "luxuryWatch", sequence: ["story","products","features","comparison","story","newsletter"], variants:{story:["oversizedQuoteImage","timelineStory"],features:["numberedFeatures","technicalFeatureList"],comparison:["technicalSpecs","visualComparison"],newsletter:["oversizedEditorial","minimalInline"]}, rhythm:"editorial",contentWidth:"contained",whitespace:"dramatic",density:"sparse",imageRhythm:"cinematic",cardRhythm:"minimal",balance:"centerWeighted",interaction:"restrained" }),
  d({ family: "creatorBrand", sequence: ["campaign","story","products","socialProof","testimonials","newsletter"], variants:{campaign:["splitCampaign","editorialCampaign"],story:["collageStory","textFirstStory"],socialProof:["creatorSpotlight","phoneStyleStories"],testimonials:["socialReviewCards","reviewTicker"],newsletter:["campaignSignup","floatingCard"]}, rhythm:"balanced",contentWidth:"wide",whitespace:"balanced",density:"balanced",imageRhythm:"masonry",cardRhythm:"mixed",balance:"asymmetric",interaction:"expressive" }),
  d({ family: "modernGrocery", sequence: ["collections","campaign","products","features","testimonials","faq"], variants:{collections:["categoryIndex","circularCollections"],campaign:["splitCampaign","productCampaign"],features:["minimalFeatureStrip","iconGrid"],testimonials:["ratingSummary","minimalQuotes"],faq:["compactFAQ","supportFAQ"]}, rhythm:"tight",contentWidth:"wide",whitespace:"compressed",density:"marketplace",imageRhythm:"uniform",cardRhythm:"uniform",balance:"symmetric",interaction:"balanced" }),
  d({ family: "artisanFood", sequence: ["story","collections","products","story","testimonials","newsletter"], variants:{story:["editorialSplit","fullBleedStory"],collections:["editorialCards","posterCollections"],testimonials:["largeQuote","editorialQuotes"],newsletter:["imageSplit","magazineSignup"]}, rhythm:"editorial",contentWidth:"mixed",whitespace:"generous",density:"balanced",imageRhythm:"editorial",cardRhythm:"mixed",balance:"asymmetric",interaction:"restrained" }),
  d({ family: "sportsPerformance", sequence: ["campaign","features","products","comparison","testimonials","faq"], variants:{campaign:["productCampaign","splitCampaign"],features:["horizontalFeatures","technicalFeatureList"],comparison:["featureCards","technicalSpecs"],testimonials:["reviewCarousel","ratingSummary"],faq:["categoryFAQ","supportFAQ"]}, rhythm:"balanced",contentWidth:"wide",whitespace:"balanced",density:"dense",imageRhythm:"cinematic",cardRhythm:"uniform",balance:"centerWeighted",interaction:"expressive" }),
  d({ family: "darkCinematic", sequence: ["campaign","story","products","quote","socialProof","newsletter"], variants:{campaign:["cinematicFullBleed","imageFirstCampaign"],story:["fullBleedStory","overlappingStory"],socialProof:["socialMasonry","UGCMarquee"],newsletter:["darkSignup","campaignSignup"]}, rhythm:"cinematic",contentWidth:"edgeToEdge",whitespace:"dramatic",density:"balanced",imageRhythm:"cinematic",cardRhythm:"staggered",balance:"mediaWeighted",interaction:"expressive" }),
  d({ family: "boutiqueEditorial", sequence: ["collections","story","products","testimonials","newsletter"], variants:{collections:["editorialCards","numberedEditorial"],story:["reversedEditorialSplit","magazineStory"],testimonials:["editorialQuotes","customerSpotlight"],newsletter:["oversizedEditorial","minimalInline"]}, rhythm:"editorial",contentWidth:"contained",whitespace:"generous",density:"sparse",imageRhythm:"alternating",cardRhythm:"minimal",balance:"asymmetric",interaction:"restrained" }),
  d({ family: "neoMinimal", sequence: ["collections","products","features","story","newsletter"], variants:{collections:["minimalTextCollections","imageRail"],features:["minimalFeatureStrip","numberedFeatures"],story:["minimalTextStory","imageFirstStory"],newsletter:["minimalInline","footerIntegrated"]}, rhythm:"balanced",contentWidth:"contained",whitespace:"generous",density:"sparse",imageRhythm:"uniform",cardRhythm:"minimal",balance:"symmetric",interaction:"minimal" }),
  d({ family: "comparisonLed", sequence: ["products","comparison","features","testimonials","faq"], variants:{comparison:["comparisonMatrix","productVsProduct","technicalSpecs"],features:["technicalFeatureList","visualFeatureGrid"],testimonials:["ratingSummary","featuredReview"],faq:["categoryFAQ","supportFAQ"]}, rhythm:"tight",contentWidth:"wide",whitespace:"balanced",density:"dense",imageRhythm:"uniform",cardRhythm:"uniform",balance:"symmetric",interaction:"balanced" }),
  d({ family: "socialCommerce", sequence: ["socialProof","products","campaign","testimonials","newsletter"], variants:{socialProof:["phoneStyleStories","UGCGrid","creatorSpotlight"],campaign:["collageCampaign","posterCampaign"],testimonials:["socialReviewCards","reviewTicker"],newsletter:["campaignSignup","floatingCard"]}, rhythm:"tight",contentWidth:"wide",whitespace:"balanced",density:"dense",imageRhythm:"masonry",cardRhythm:"staggered",balance:"asymmetric",interaction:"expressive" }),
  d({ family: "collectionFirst", sequence: ["collections","collections","products","story","newsletter"], variants:{collections:["categoryIndex","oversizedTiles","horizontalScroller"],story:["editorialSplit","textFirstStory"],newsletter:["minimalInline","fullWidthColor"]}, rhythm:"balanced",contentWidth:"wide",whitespace:"balanced",density:"dense",imageRhythm:"alternating",cardRhythm:"rail",balance:"symmetric",interaction:"balanced" }),
  d({ family: "trustFirst", sequence: ["features","testimonials","products","comparison","faq","newsletter"], variants:{features:["minimalFeatureStrip","iconGrid"],testimonials:["ratingSummary","featuredReview"],comparison:["featureCards","classicTable"],faq:["supportFAQ","twoColumnFAQ"],newsletter:["minimalInline","floatingCard"]}, rhythm:"balanced",contentWidth:"contained",whitespace:"balanced",density:"balanced",imageRhythm:"uniform",cardRhythm:"uniform",balance:"symmetric",interaction:"balanced" }),
  d({ family: "lookbook", sequence: ["collections","story","products","socialProof","story"], variants:{collections:["fullBleedTiles","posterCollections"],story:["fullBleedStory","collageStory"],socialProof:["customerGallery","socialMasonry"]}, rhythm:"editorial",contentWidth:"edgeToEdge",whitespace:"dramatic",density:"sparse",imageRhythm:"masonry",cardRhythm:"staggered",balance:"mediaWeighted",interaction:"restrained" }),
  d({ family: "highDensityRetail", sequence: ["collections","products","campaign","products","comparison","faq"], variants:{collections:["categoryIndex","horizontalScroller"],campaign:["countdownCampaign","productCampaign"],comparison:["compactComparison","classicTable"],faq:["compactFAQ","supportFAQ"]}, rhythm:"tight",contentWidth:"wide",whitespace:"compressed",density:"marketplace",imageRhythm:"uniform",cardRhythm:"uniform",balance:"symmetric",interaction:"expressive" }),
  d({ family: "immersiveStory", sequence: ["story","campaign","story","products","quote","newsletter"], variants:{story:["scrollStory","fullBleedStory","stickyStory"],campaign:["cinematicFullBleed","editorialCampaign"],newsletter:["oversizedEditorial","darkSignup"]}, rhythm:"cinematic",contentWidth:"mixed",whitespace:"dramatic",density:"sparse",imageRhythm:"cinematic",cardRhythm:"minimal",balance:"mediaWeighted",interaction:"restrained" }),
  d({ family: "minimal", sequence: ["collections","products","story","newsletter"], variants:{collections:["minimalTextCollections","imageRail"],story:["minimalTextStory","imageFirstStory"],newsletter:["minimalInline","footerIntegrated"]}, rhythm:"balanced",contentWidth:"contained",whitespace:"generous",density:"sparse",imageRhythm:"uniform",cardRhythm:"minimal",balance:"symmetric",interaction:"minimal" }),
  d({ family: "catalog", sequence: ["collections","products","products","comparison","faq"], variants:{collections:["categoryIndex","horizontalScroller"],comparison:["compactComparison","classicTable"],faq:["compactFAQ","supportFAQ"]}, rhythm:"tight",contentWidth:"wide",whitespace:"compressed",density:"dense",imageRhythm:"uniform",cardRhythm:"uniform",balance:"symmetric",interaction:"balanced" }),
] as const;

const variantsFor = (definition: CompositionFamilyDefinition, type: SectionType) => definition.variants[type] ?? common[type as keyof typeof common] ?? ["clean"];
const pick = <T,>(items: readonly T[], seed: number) => items[Math.abs(seed) % items.length];

export function selectCompositionFamily(art: ArtDirectionSelection, category: StoreCategory, prompt: string, seed: number, current?: CompositionPageFamily): CompositionFamilyDefinition {
  const p = prompt.toLowerCase();
  const exact = FAMILY_DEFS.find((item) => item.family === art.family);
  const compatible = FAMILY_DEFS.filter((item) => {
    if (item.family === current) return false;
    if (/marketplace|catalog|dense/.test(p)) return ["marketplace","catalog","highDensityRetail","comparisonLed"].includes(item.family);
    if (/story|editorial|magazine/.test(p)) return ["editorial","magazine","storytelling","boutiqueEditorial","immersiveStory"].includes(item.family);
    if (/launch|campaign|drop/.test(p)) return ["campaign","productLaunch","streetwearDrop","darkCinematic"].includes(item.family);
    if (category === "tech") return ["technical","gamingLaunch","productLaunch","comparisonLed","marketplace"].includes(item.family);
    if (category === "home") return ["furnitureEditorial","japaneseMinimal","neoMinimal","editorial","gallery"].includes(item.family);
    if (category === "beauty") return ["beautyClinical","organicWellness","editorial","luxury","boutiqueEditorial"].includes(item.family);
    return item.family === art.family || ["editorial","conversion","gallery","productFirst","collectionFirst"].includes(item.family);
  });
  const pool = [exact, ...compatible].filter(Boolean) as CompositionFamilyDefinition[];
  return pool[Math.abs(seed) % Math.max(1, pool.length)] ?? FAMILY_DEFS[0];
}

export function buildCompositionGenome(definition: CompositionFamilyDefinition, seed: number): CompositionGenome {
  return {
    pageFamily: definition.family,
    heroAlignment: pick(["left","center","right","offset"] as const, seed + 1),
    heroMediaPlacement: pick(["left","right","background","stacked","collage","floating"] as const, seed + 2),
    heroTextWidth: pick(["narrow","balanced","wide"] as const, seed + 3),
    sectionSequence: [...definition.sequence],
    sectionRhythm: definition.rhythm,
    contentWidth: definition.contentWidth,
    whitespaceProfile: definition.whitespace,
    merchandisingDensity: definition.density,
    imageRhythm: definition.imageRhythm,
    cardRhythm: definition.cardRhythm,
    alignmentPattern: pick(["consistent","alternating","offset","editorial"] as const, seed + 4),
    visualBalance: definition.balance,
    interactionDensity: definition.interaction,
  };
}

const sectionEyebrow: Partial<Record<SectionType, string>> = {
  collections: "Explore",
  products: "Shop",
  story: "Story",
  testimonials: "Customer notes",
  faq: "Good to know",
  newsletter: "Stay connected",
  features: "Why it works",
  quote: "Point of view",
  campaign: "Campaign",
  comparison: "Compare",
  socialProof: "Community",
  videoStory: "In motion",
};

export function buildSectionsFromComposition(definition: CompositionFamilyDefinition, creativity: Creativity, seed: number): SectionSpec[] {
  const max = creativity === "safe" ? Math.min(5, definition.sequence.length) : creativity === "balanced" ? Math.min(7, definition.sequence.length) : definition.sequence.length;
  return definition.sequence.slice(0, max).map((type, index) => ({
    id: crypto.randomUUID(),
    type,
    variant: pick(variantsFor(definition, type), seed + index * 13),
    eyebrow: sectionEyebrow[type],
    spacing: definition.whitespace === "dramatic" ? "airy" : definition.whitespace === "compressed" ? "compact" : "balanced",
    alignment: definition.balance === "centerWeighted" ? "center" : definition.alignmentPattern === "alternating" && index % 2 ? "right" : "left",
  }));
}

export const COMPOSITION_FAMILIES = FAMILY_DEFS;

export function layoutChoicesForComposition(family: CompositionPageFamily) {
  const map: Record<CompositionPageFamily, { nav: string[]; hero: string[]; grid: string[]; footer: string[] }> = {
    minimal: { nav:["minimal","compactSticky","centered"], hero:["minimalCommerce","centered","split"], grid:["minimalList","luxurySparse","classic"], footer:["minimal","compact","columns"] },
    editorial: { nav:["editorial","centered","transparent"], hero:["fullBleedEditorial","magazine","editorial"], grid:["editorialRail","editorialDeck","magazineGrid"], footer:["editorial","oversizedBrand","imageSplit"] },
    catalog: { nav:["searchFirst","categoryBar","stacked"], hero:["collectionHero","minimalCommerce","product"], grid:["catalog","denseRetail","categoryTabs"], footer:["columns","supportHeavy","legalHeavy"] },
    conversion: { nav:["utility","searchFirst","compactSticky"], hero:["product","showcase","launch"], grid:["featuredPlusRail","comparison","priceSpotlight"], footer:["supportHeavy","columns","newsletterHero"] },
    luxury: { nav:["centered","logoRail","minimal"], hero:["cinematicProduct","fullBleedEditorial","statement"], grid:["luxurySparse","spotlight","editorialDeck"], footer:["oversizedBrand","editorial","brandWall"] },
    marketplace: { nav:["megaMenu","searchFirst","categoryBar"], hero:["minimalCommerce","collectionHero","bento"], grid:["denseRetail","categoryTabs","comparison"], footer:["megaGrid","supportHeavy","legalHeavy"] },
    storytelling: { nav:["editorial","centered","minimal"], hero:["editorial","splitMedia","imageCollage"], grid:["horizontalEditorial","featureSplit","editorialRail"], footer:["imageSplit","editorial","newsletterHero"] },
    campaign: { nav:["transparent","brandMarquee","dualRowPromo"], hero:["campaign","cinematicProduct","megaTypography"], grid:["tickerShowcase","hoverPanels","staggeredGallery"], footer:["darkCommerce","brandWall","immersiveSignup"] },
    magazine: { nav:["editorial","split","centered"], hero:["magazine","fullBleedEditorial","imageCollage"], grid:["magazineGrid","editorialDeck","horizontalEditorial"], footer:["editorial","oversizedBrand","imageSplit"] },
    technical: { nav:["searchFirst","utility","megaMenu"], hero:["product","launch","showcase"], grid:["specGrid","comparison","priceSpotlight"], footer:["supportHeavy","legalHeavy","megaGrid"] },
    experimental: { nav:["brandMarquee","pillNav","transparent"], hero:["megaTypography","imageCollage","floatingProducts"], grid:["asymmetric","hoverPanels","tickerShowcase"], footer:["brandWall","immersiveSignup","darkCommerce"] },
    gallery: { nav:["minimal","transparent","centered"], hero:["fullBleedEditorial","imageCollage","immersive"], grid:["mosaic","staggeredGallery","lookbook"], footer:["minimal","editorial","oversizedBrand"] },
    productLaunch: { nav:["compactSticky","transparent","utility"], hero:["cinematicProduct","product","launch"], grid:["spotlight","priceSpotlight","featuredPlusRail"], footer:["darkCommerce","supportHeavy","newsletterHero"] },
    productFirst: { nav:["searchFirst","minimal","compactSticky"], hero:["product","showcase","splitMedia"], grid:["featuredPlusRail","comparison","specGrid"], footer:["supportHeavy","columns","compact"] },
    streetwearDrop: { nav:["brandMarquee","transparent","dualRowPromo"], hero:["campaign","megaTypography","floatingProducts"], grid:["tickerShowcase","hoverPanels","staggeredGallery"], footer:["darkCommerce","brandWall","immersiveSignup"] },
    japaneseMinimal: { nav:["minimal","centered","logoRail"], hero:["minimalCommerce","splitMedia","editorial"], grid:["minimalList","luxurySparse","editorialDeck"], footer:["minimal","editorial","compact"] },
    furnitureEditorial: { nav:["centered","logoRail","minimal"], hero:["splitMedia","fullBleedEditorial","imageCollage"], grid:["featuredPlusRail","editorialDeck","staggeredGallery"], footer:["imageSplit","editorial","newsletterHero"] },
    beautyClinical: { nav:["centered","searchFirst","minimal"], hero:["beautyEditorial","product","minimalCommerce"], grid:["cards","comparison","specGrid"], footer:["newsletterHero","supportHeavy","columns"] },
    organicWellness: { nav:["centered","minimal","pillNav"], hero:["splitMedia","editorial","beautyEditorial"], grid:["editorialRail","cards","luxurySparse"], footer:["imageSplit","newsletterHero","minimal"] },
    gamingLaunch: { nav:["megaMenu","searchFirst","transparent"], hero:["cinematicProduct","launch","bento"], grid:["specGrid","comparison","tickerShowcase"], footer:["darkCommerce","supportHeavy","megaGrid"] },
    luxuryWatch: { nav:["centered","logoRail","minimal"], hero:["cinematicProduct","product","fullBleedEditorial"], grid:["spotlight","luxurySparse","comparison"], footer:["oversizedBrand","editorial","brandWall"] },
    creatorBrand: { nav:["floating","pillNav","brandMarquee"], hero:["campaign","splitMedia","imageCollage"], grid:["shopTheLook","hoverPanels","featuredPlusRail"], footer:["socialFirst","immersiveSignup","newsletterHero"] },
    modernGrocery: { nav:["categoryBar","searchFirst","promoHeavy"], hero:["bento","minimalCommerce","split"], grid:["denseRetail","categoryTabs","bundleGrid"], footer:["columns","newsletterHero","supportHeavy"] },
    artisanFood: { nav:["editorial","centered","minimal"], hero:["splitMedia","editorial","showcase"], grid:["cards","featureSplit","editorialRail"], footer:["imageSplit","newsletterHero","editorial"] },
    sportsPerformance: { nav:["transparent","utility","split"], hero:["showcase","campaign","product"], grid:["spotlight","specGrid","featuredPlusRail"], footer:["supportHeavy","darkCommerce","columns"] },
    darkCinematic: { nav:["transparent","brandMarquee","minimal"], hero:["cinematicProduct","immersive","campaign"], grid:["spotlight","tickerShowcase","hoverPanels"], footer:["darkCommerce","brandWall","oversizedBrand"] },
    boutiqueEditorial: { nav:["centered","editorial","floating"], hero:["editorial","magazine","splitMedia"], grid:["editorialRail","luxurySparse","editorialDeck"], footer:["editorial","imageSplit","newsletterHero"] },
    neoMinimal: { nav:["minimal","compactSticky","centered"], hero:["minimalCommerce","centered","splitMedia"], grid:["minimalList","classic","luxurySparse"], footer:["minimal","compact","columns"] },
    comparisonLed: { nav:["searchFirst","utility","categoryBar"], hero:["product","showcase","launch"], grid:["comparison","specGrid","priceSpotlight"], footer:["supportHeavy","legalHeavy","columns"] },
    socialCommerce: { nav:["pillNav","floating","brandMarquee"], hero:["imageCollage","campaign","bento"], grid:["shopTheLook","hoverPanels","carousel"], footer:["socialFirst","immersiveSignup","newsletterHero"] },
    collectionFirst: { nav:["categoryBar","megaMenu","stacked"], hero:["collectionHero","bento","minimalCommerce"], grid:["categoryTabs","denseRetail","classic"], footer:["columns","megaGrid","supportHeavy"] },
    trustFirst: { nav:["utility","compactSticky","minimal"], hero:["minimalCommerce","product","centered"], grid:["cards","comparison","classic"], footer:["supportHeavy","legalHeavy","columns"] },
    lookbook: { nav:["transparent","editorial","centered"], hero:["fullBleedEditorial","imageCollage","campaign"], grid:["lookbook","mosaic","staggeredGallery"], footer:["editorial","oversizedBrand","minimal"] },
    highDensityRetail: { nav:["megaMenu","searchFirst","categoryBar"], hero:["minimalCommerce","collectionHero","bento"], grid:["denseRetail","categoryTabs","deals"], footer:["megaGrid","supportHeavy","legalHeavy"] },
    immersiveStory: { nav:["transparent","editorial","minimal"], hero:["immersive","fullBleedEditorial","cinematicProduct"], grid:["horizontalEditorial","spotlight","staggeredGallery"], footer:["imageSplit","editorial","oversizedBrand"] },
  };
  return map[family];
}
