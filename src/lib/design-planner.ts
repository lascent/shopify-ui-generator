import { SHOPIFY_CATEGORY_GROUPS } from "@/lib/category-taxonomy";
import { buildDynamicCategoryProfile, dynamicCategoryDirectory } from "@/lib/dynamic-category-engine";
import type {
  CardStyle,
  CommerceArchetype,
  Creativity,
  FooterLayout,
  HeaderLayout,
  HeroLayout,
  MediaBehavior,
  PriceStyle,
  ProductGridLayout,
  StoreCategory,
} from "@/types/design";

export type PromptSignals = {
  luxury: boolean;
  editorial: boolean;
  minimal: boolean;
  bold: boolean;
  dark: boolean;
  playful: boolean;
  technical: boolean;
  organic: boolean;
  performance: boolean;
  conversion: boolean;
  promo: boolean;
  warm: boolean;
  gallery: boolean;
  comparison: boolean;
  subscription: boolean;
  support: boolean;
  story: boolean;
  video: boolean;
  cinematic: boolean;
  merchHeavy: boolean;
  nicheSpecific: boolean;
};

export type LayoutBias = {
  navOptions?: readonly HeaderLayout[];
  heroOptions?: readonly HeroLayout[];
  gridOptions?: readonly ProductGridLayout[];
  footerOptions?: readonly FooterLayout[];
  density?: "compact" | "balanced" | "airy";
  rhythm?: "tight" | "balanced" | "editorial";
  archetype?: CommerceArchetype;
  priceStyle?: PriceStyle;
  cardStyle?: CardStyle;
  mediaBehavior?: MediaBehavior;
};

export type PlannerContent = {
  brandVoice?: string;
  heroKicker?: string;
  heroTitle?: string;
  heroBody?: string;
  cta?: string;
  announcement?: string;
  navItems?: string[];
  mediaQuery?: string;
  collectionTitles?: string[];
  filters?: { label: string; options: string[] }[];
  products?: { name: string; subtitle: string; price?: string; tag?: string; specs?: Record<string, string> }[];
};

export type DesignPlan = {
  source: "local" | "openai";
  category: StoreCategory;
  confidence: number;
  intent: string;
  summary: string;
  niche?: string;
  signals: PromptSignals;
  layoutBias: LayoutBias;
  content: PlannerContent;
};

const categories: StoreCategory[] = ["fashion", "shoes", "accessories", "home", "beauty", "food", "outdoor", "kids", "tech"];

export type NicheProfile = {
  id: string;
  label: string;
  category: StoreCategory;
  aliases: string[];
  mediaQuery: string;
  heroTitle: string;
  heroBody: string;
  cta: string;
  navItems: string[];
  collectionTitles: string[];
  products: { name: string; subtitle: string; price: string; tag: string }[];
  layoutBias?: LayoutBias;
};

export const NICHE_PROFILES: NicheProfile[] = [
  { id: "cars", label: "Cars & Automotive", category: "accessories", aliases: ["cars", "car dealership", "auto marketplace", "vehicles", "automotive store", "car shop"], mediaQuery: "premium cars automotive dealership", heroTitle: "Find the car that fits the way you drive.", heroBody: "Browse standout vehicles, compare the details that matter, and discover a cleaner path from research to ownership.", cta: "Explore vehicles", navItems: ["Vehicles", "New arrivals", "Electric", "Performance", "Sell / Trade"], collectionTitles: ["Performance", "Electric", "Daily drivers"], products: [{name:"Apex GT",subtitle:"Performance coupe · precision handling",price:"$48,900",tag:"Featured"},{name:"Volt S",subtitle:"Electric sedan · long-range comfort",price:"$41,500",tag:"Electric"},{name:"Terra X",subtitle:"Adventure SUV · all-road capability",price:"$52,800",tag:"New"},{name:"Metro C",subtitle:"Compact city car · efficient everyday drive",price:"$24,900",tag:"Popular"}], layoutBias: { navOptions: ["searchFirst", "megaMenu", "categoryBar"], heroOptions: ["product", "showcase", "collectionHero"], gridOptions: ["comparison", "specGrid", "featuredPlusRail"], footerOptions: ["supportHeavy", "columns"], density: "compact", archetype: "catalog", priceStyle: "installment", cardStyle: "retail", mediaBehavior: "gallery" } },
  { id: "phones", label: "Smartphones & Mobile", category: "tech", aliases: ["phone", "phones", "smartphone", "smartphones", "iphone", "android phone", "mobile phone"], mediaQuery: "premium smartphone mobile phone product", heroTitle: "The phones worth carrying every day.", heroBody: "Compare cameras, displays, battery life and performance across a focused range of smartphones and mobile essentials.", cta: "Shop phones", navItems: ["Phones", "Android", "iPhone", "Accessories", "Deals"], collectionTitles: ["Flagship phones", "Everyday value", "Mobile accessories"], products: [{name:"Nova Pro",subtitle:"Pro camera system · flagship performance",price:"$999",tag:"Flagship"},{name:"Nova Air",subtitle:"Slim design · all-day battery",price:"$699",tag:"New"},{name:"Pixel Core",subtitle:"Clean software · intelligent camera",price:"$749",tag:"Popular"},{name:"Fold One",subtitle:"Flexible display · multitasking ready",price:"$1,299",tag:"Premium"}], layoutBias: { navOptions: ["searchFirst", "categoryBar", "utility"], heroOptions: ["product", "launch", "showcase"], gridOptions: ["specGrid", "comparison", "featuredPlusRail"], footerOptions: ["supportHeavy", "legalHeavy"], density: "compact", archetype: "tech-retail", priceStyle: "techSpec", cardStyle: "retail", mediaBehavior: "gallery" } },
  { id: "seafood", label: "Seafood & Fresh Fish", category: "food", aliases: ["seafood", "fresh fish", "fish market", "frozen seafood", "salmon", "shrimp", "prawns"], mediaQuery: "fresh seafood fish market premium", heroTitle: "Fresh seafood, selected for the table.", heroBody: "Shop fish, shellfish and ready-to-cook favorites with clearer sourcing, freshness notes and convenient delivery.", cta: "Shop seafood", navItems: ["Fresh fish", "Shellfish", "Frozen", "Ready to cook", "Bundles"], collectionTitles: ["Fresh catch", "Shellfish", "Chef-ready picks"], products: [{name:"Atlantic Salmon",subtitle:"Fresh-cut fillet · rich and buttery",price:"$24",tag:"Fresh"},{name:"Tiger Prawns",subtitle:"Large shell-on prawns · sweet finish",price:"$19",tag:"Best seller"},{name:"Sea Bass",subtitle:"Whole cleaned fish · delicate texture",price:"$22",tag:"Daily catch"},{name:"Seafood Grill Box",subtitle:"Mixed seafood selection · ready to grill",price:"$49",tag:"Bundle"}], layoutBias: { navOptions: ["centered", "categoryBar", "editorial"], heroOptions: ["bento", "showcase", "split"], gridOptions: ["cards", "bundleGrid", "featureSplit"], footerOptions: ["newsletterHero", "columns"], density: "balanced", archetype: "storytelling", priceStyle: "bundle", cardStyle: "softCard", mediaBehavior: "hoverZoom" } },
  { id: "watches", label: "Watches", category: "accessories", aliases: ["watch", "watches", "luxury watch", "classic watch", "timepiece"], mediaQuery: "luxury watch timepiece product editorial", heroTitle: "Timepieces with presence, precision and restraint.", heroBody: "Discover everyday watches and collector-worthy pieces with refined materials, considered proportions and lasting design.", cta: "Explore watches", navItems: ["New watches", "Automatic", "Classic", "Sport", "Straps"], collectionTitles: ["Automatic", "Dress watches", "Sport watches"], products: [{name:"Chrono 42",subtitle:"Automatic chronograph · steel case",price:"$1,280",tag:"Automatic"},{name:"Noir Classic",subtitle:"Slim dress watch · leather strap",price:"$620",tag:"Classic"},{name:"Field One",subtitle:"Utility dial · sapphire crystal",price:"$780",tag:"Field"},{name:"Marine GMT",subtitle:"Dual-time movement · 100m resistance",price:"$1,450",tag:"Premium"}], layoutBias: { navOptions: ["centered", "logoRail", "editorial"], heroOptions: ["fullBleedEditorial", "product", "cinematicProduct"], gridOptions: ["luxurySparse", "spotlight", "editorialRail"], footerOptions: ["oversizedBrand", "editorial"], density: "airy", rhythm: "editorial", archetype: "luxury", priceStyle: "luxuryInline", cardStyle: "imageFirst", mediaBehavior: "gallery" } },
  { id: "glasses", label: "Glasses & Eyewear", category: "accessories", aliases: ["glasses", "eyeglasses", "eyewear", "optical store", "sunglasses", "reading glasses"], mediaQuery: "designer eyeglasses eyewear sunglasses editorial", heroTitle: "Frames that change the whole point of view.", heroBody: "Shop optical frames and sunglasses with modern shapes, lightweight materials and easy-to-compare fit details.", cta: "Shop frames", navItems: ["Eyeglasses", "Sunglasses", "New frames", "Blue light", "Accessories"], collectionTitles: ["Optical", "Sun", "Lightweight frames"], products: [{name:"Arc 01",subtitle:"Slim acetate frame · everyday fit",price:"$145",tag:"New"},{name:"Vista Metal",subtitle:"Lightweight metal · adjustable fit",price:"$165",tag:"Optical"},{name:"Noon Sun",subtitle:"Polarized lenses · UV400 protection",price:"$180",tag:"Sun"},{name:"Studio Clear",subtitle:"Transparent acetate · blue-light ready",price:"$150",tag:"Popular"}], layoutBias: { navOptions: ["centered", "editorial", "minimal"], heroOptions: ["collectionHero", "imageCollage", "showcase"], gridOptions: ["cards", "mosaic", "featuredPlusRail"], footerOptions: ["socialFirst", "columns"], density: "balanced", archetype: "editorial", priceStyle: "standard", cardStyle: "softCard", mediaBehavior: "hoverSwap" } },
  { id: "kitchen-appliances", label: "Kitchen Appliances", category: "home", aliases: ["kitchen appliances", "air fryer", "microwave", "coffee machine", "blender", "rice cooker", "refrigerator", "oven"], mediaQuery: "modern kitchen appliances product interior", heroTitle: "Better appliances for everyday cooking.", heroBody: "Build a smarter kitchen with reliable appliances designed around speed, convenience, performance and easier cleanup.", cta: "Shop appliances", navItems: ["Cooking", "Coffee", "Prep", "Refrigeration", "Small appliances"], collectionTitles: ["Countertop essentials", "Coffee & breakfast", "Cooking appliances"], products: [{name:"Air Crisp Pro",subtitle:"Dual-zone air fryer · fast crisping",price:"$189",tag:"Best seller"},{name:"Brew Studio",subtitle:"Programmable coffee maker · thermal carafe",price:"$149",tag:"New"},{name:"Blend Max",subtitle:"High-speed blender · 1.8L jar",price:"$129",tag:"Powerful"},{name:"Rice Master",subtitle:"Smart rice cooker · multi-grain programs",price:"$99",tag:"Everyday"}], layoutBias: { navOptions: ["searchFirst", "categoryBar", "stacked"], heroOptions: ["showcase", "product", "bento"], gridOptions: ["comparison", "categoryTabs", "denseRetail"], footerOptions: ["supportHeavy", "columns"], density: "compact", archetype: "tech-retail", priceStyle: "techSpec", cardStyle: "retail", mediaBehavior: "gallery" } },
  { id: "sofas", label: "Sofas & Couches", category: "home", aliases: ["sofa", "sofas", "couch", "couches", "sectional sofa"], mediaQuery: "modern sofa couch living room furniture", heroTitle: "Sofas made for the room you actually live in.", heroBody: "Discover comfortable silhouettes, durable upholstery and modular options designed to anchor modern living spaces.", cta: "Shop sofas", navItems: ["Sofas", "Sectionals", "Loveseats", "Modular", "Fabric guide"], collectionTitles: ["Modular seating", "Compact sofas", "Deep lounge"], products: [{name:"Cloud Three",subtitle:"Deep 3-seat sofa · soft woven fabric",price:"$1,499",tag:"Best seller"},{name:"Line Modular",subtitle:"Configurable sectional · low profile",price:"$2,190",tag:"Modular"},{name:"Studio Two",subtitle:"Compact 2-seat sofa · apartment ready",price:"$999",tag:"Compact"},{name:"Lounge Curve",subtitle:"Rounded silhouette · plush cushioning",price:"$1,790",tag:"New"}], layoutBias: { navOptions: ["centered", "logoRail", "floating"], heroOptions: ["splitMedia", "imageCollage", "fullBleedEditorial"], gridOptions: ["magazineGrid", "featureSplit", "luxurySparse"], footerOptions: ["imageSplit", "oversizedBrand"], density: "airy", rhythm: "editorial", archetype: "editorial", priceStyle: "luxuryInline", cardStyle: "imageFirst", mediaBehavior: "gallery" } },
  { id: "beds", label: "Beds & Mattresses", category: "home", aliases: ["bed", "beds", "mattress", "mattresses", "bed frame", "bedroom furniture"], mediaQuery: "modern bed mattress bedroom furniture", heroTitle: "A better bedroom starts with better rest.", heroBody: "Shop supportive mattresses, considered bed frames and bedroom essentials designed for calmer nights and easier mornings.", cta: "Shop beds", navItems: ["Mattresses", "Bed frames", "Bedroom", "Bedding", "Sleep guide"], collectionTitles: ["Mattresses", "Bed frames", "Bedroom essentials"], products: [{name:"Rest Hybrid",subtitle:"Hybrid mattress · balanced support",price:"$899",tag:"Best seller"},{name:"Oak Platform",subtitle:"Solid wood bed frame · clean profile",price:"$749",tag:"Natural"},{name:"Cloud Foam",subtitle:"Cooling memory foam · pressure relief",price:"$699",tag:"Cooling"},{name:"Linen Headboard",subtitle:"Upholstered frame · soft texture",price:"$820",tag:"New"}], layoutBias: { navOptions: ["centered", "minimal", "stacked"], heroOptions: ["minimalCommerce", "splitMedia", "collectionHero"], gridOptions: ["featuredPlusRail", "minimalList", "cards"], footerOptions: ["newsletterHero", "columns"], density: "airy", archetype: "scandinavian", priceStyle: "standard", cardStyle: "softCard", mediaBehavior: "hoverZoom" } },
  { id: "laptops", label: "Laptops & Computers", category: "tech", aliases: ["laptop", "laptops", "notebook computer", "gaming laptop", "desktop computer", "gaming pc"], mediaQuery: "premium laptop computer product technology", heroTitle: "Computers built for the work you want to do.", heroBody: "Compare portable performance, creator-ready displays and high-power systems without losing sight of the details that matter.", cta: "Shop computers", navItems: ["Laptops", "Desktops", "Gaming", "Creator", "Accessories"], collectionTitles: ["Everyday laptops", "Creator systems", "Gaming performance"], products: [{name:"Studio 14",subtitle:"Creator laptop · calibrated display",price:"$1,399",tag:"Creator"},{name:"Airbook 13",subtitle:"Ultra-light laptop · all-day battery",price:"$999",tag:"Portable"},{name:"Forge 16",subtitle:"Gaming laptop · high-refresh display",price:"$1,799",tag:"Gaming"},{name:"Core Mini",subtitle:"Compact desktop · quiet performance",price:"$849",tag:"Desktop"}] },
  { id: "tvs", label: "TVs & Home Theater", category: "tech", aliases: ["tv", "television", "smart tv", "oled tv", "home theater", "soundbar", "projector"], mediaQuery: "smart tv oled home theater product", heroTitle: "Bring the theater home without the clutter.", heroBody: "Shop premium displays, projectors and audio systems with clearer comparisons for picture quality, size and room fit.", cta: "Shop home theater", navItems: ["TVs", "OLED", "Projectors", "Soundbars", "Home theater"], collectionTitles: ["Premium TVs", "Big-screen viewing", "Immersive audio"], products: [{name:"Vision OLED 55",subtitle:"4K OLED display · cinematic contrast",price:"$1,299",tag:"OLED"},{name:"Cinema Beam",subtitle:"4K projector · compact laser light",price:"$1,099",tag:"Projector"},{name:"Arc Soundbar",subtitle:"Dolby Atmos soundbar · wireless sub",price:"$599",tag:"Audio"},{name:"Frame QLED 65",subtitle:"4K QLED display · art mode",price:"$1,499",tag:"Premium"}] },
  { id: "cameras", label: "Cameras & Photography", category: "tech", aliases: ["camera", "cameras", "photography", "mirrorless camera", "dslr", "action camera"], mediaQuery: "mirrorless camera photography gear product", heroTitle: "Tools for making the shot feel intentional.", heroBody: "Explore cameras, lenses and creator gear with clear specs, real use cases and premium product presentation.", cta: "Shop cameras", navItems: ["Cameras", "Lenses", "Video", "Creator gear", "Accessories"], collectionTitles: ["Mirrorless", "Lenses", "Creator kits"], products: [{name:"Frame X",subtitle:"Full-frame mirrorless · 4K video",price:"$1,899",tag:"Full frame"},{name:"Prime 35",subtitle:"35mm f/1.8 lens · compact prime",price:"$549",tag:"Lens"},{name:"Pocket Cinema",subtitle:"Compact video camera · creator ready",price:"$799",tag:"Video"},{name:"Action One",subtitle:"Stabilized action camera · waterproof",price:"$399",tag:"Action"}] },
  { id: "gaming", label: "Gaming & PC", category: "tech", aliases: ["gaming", "gaming pc", "gaming accessories", "mechanical keyboard", "gaming monitor", "console"], mediaQuery: "gaming pc setup peripherals product", heroTitle: "Build a setup that keeps up.", heroBody: "Shop performance PCs, monitors and peripherals with spec-first comparisons and a faster route to the right setup.", cta: "Shop gaming", navItems: ["PCs", "Monitors", "Keyboards", "Audio", "Controllers"], collectionTitles: ["Performance PCs", "Displays", "Peripherals"], products: [{name:"Forge RTX",subtitle:"Gaming desktop · high-refresh performance",price:"$1,899",tag:"Performance"},{name:"Pulse 27",subtitle:"27-inch 180Hz monitor · fast IPS",price:"$349",tag:"180Hz"},{name:"Mech 75",subtitle:"Hot-swap mechanical keyboard · compact layout",price:"$139",tag:"Mechanical"},{name:"Orbit Pro",subtitle:"Wireless gaming headset · low latency",price:"$169",tag:"Wireless"}] },
  { id: "jewelry", label: "Jewelry", category: "accessories", aliases: ["jewelry", "jewellery", "necklace", "bracelet", "ring", "earrings", "fine jewelry"], mediaQuery: "fine jewelry luxury product editorial", heroTitle: "Jewelry designed to stay in rotation.", heroBody: "Discover refined pieces with considered materials, modern proportions and easy layering across everyday and occasion looks.", cta: "Shop jewelry", navItems: ["New", "Rings", "Necklaces", "Earrings", "Bracelets"], collectionTitles: ["Everyday gold", "Statement pieces", "Fine essentials"], products: [{name:"Line Ring",subtitle:"Polished vermeil · sculpted profile",price:"$145",tag:"New"},{name:"Fine Chain",subtitle:"18k gold chain · delicate finish",price:"$320",tag:"Fine"},{name:"Halo Studs",subtitle:"Minimal crystal studs · everyday pair",price:"$95",tag:"Popular"},{name:"Arc Bracelet",subtitle:"Slim cuff · brushed metal finish",price:"$180",tag:"Signature"}] },
  { id: "bags", label: "Bags & Luggage", category: "accessories", aliases: ["bag", "bags", "handbag", "backpack", "luggage", "suitcase", "briefcase"], mediaQuery: "designer bags luggage backpack product", heroTitle: "Carry better, from commute to weekend.", heroBody: "Shop structured bags, travel-ready luggage and everyday carry pieces built around practical details and refined materials.", cta: "Shop bags", navItems: ["Bags", "Backpacks", "Travel", "Work", "Small goods"], collectionTitles: ["Everyday carry", "Travel", "Work bags"], products: [{name:"City Tote",subtitle:"Structured tote · padded laptop sleeve",price:"$220",tag:"Everyday"},{name:"Transit Pack",subtitle:"Modular backpack · travel organization",price:"$189",tag:"Travel"},{name:"Weekender 40",subtitle:"Carry-on duffel · expandable storage",price:"$249",tag:"Weekend"},{name:"Core Case",subtitle:"Hard-shell luggage · smooth spinner wheels",price:"$279",tag:"Luggage"}] },
  { id: "pet", label: "Pet Supplies", category: "accessories", aliases: ["pet supplies", "pet store", "dog accessories", "cat accessories", "pet accessories", "pet food"], mediaQuery: "modern pet supplies dog cat accessories", heroTitle: "Better everyday essentials for pets and their people.", heroBody: "Shop considered food, walking, play and home essentials designed around comfort, durability and easier routines.", cta: "Shop pet essentials", navItems: ["Dogs", "Cats", "Food", "Walk", "Home"], collectionTitles: ["Daily walks", "Home comfort", "Treats & food"], products: [{name:"Everyday Harness",subtitle:"Padded walking harness · adjustable fit",price:"$42",tag:"Walk"},{name:"Calm Bed",subtitle:"Supportive pet bed · washable cover",price:"$79",tag:"Comfort"},{name:"Treat Box",subtitle:"Curated snacks · training friendly",price:"$28",tag:"Treats"},{name:"Travel Bowl Set",subtitle:"Collapsible food and water bowls",price:"$24",tag:"Travel"}] },
  { id: "bicycles", label: "Bicycles & E-Bikes", category: "outdoor", aliases: ["bicycle", "bicycles", "bike", "bikes", "e-bike", "ebike", "cycling"], mediaQuery: "premium bicycle ebike cycling gear", heroTitle: "Bikes built for the ride you actually take.", heroBody: "Compare city, trail and electric bikes with clearer fit, component and range details.", cta: "Shop bikes", navItems: ["Bikes", "E-bikes", "Road", "Trail", "Accessories"], collectionTitles: ["City bikes", "E-bikes", "Trail ready"], products: [{name:"Metro One",subtitle:"Lightweight city bike · belt drive",price:"$899",tag:"City"},{name:"Volt Trail",subtitle:"Electric hardtail · 80km range",price:"$2,299",tag:"E-bike"},{name:"Road S",subtitle:"Endurance road bike · carbon fork",price:"$1,399",tag:"Road"},{name:"Trail 29",subtitle:"29-inch mountain bike · hydraulic brakes",price:"$1,199",tag:"Trail"}] },
  { id: "sports", label: "Sports Equipment", category: "outdoor", aliases: ["sports equipment", "basketball gear", "football gear", "soccer gear", "volleyball", "badminton", "tennis gear"], mediaQuery: "modern sports equipment athletic gear", heroTitle: "Gear built for practice, match day and everything between.", heroBody: "Shop sport-specific essentials with performance details, durable materials and equipment you can compare quickly.", cta: "Shop sports", navItems: ["Basketball", "Football", "Racquet", "Training", "Accessories"], collectionTitles: ["Court", "Field", "Training"], products: [{name:"Game Ball Pro",subtitle:"Competition basketball · indoor/outdoor grip",price:"$65",tag:"Game day"},{name:"Match Kit",subtitle:"Training cones and markers · team set",price:"$49",tag:"Training"},{name:"Racquet X",subtitle:"Carbon racquet · balanced control",price:"$129",tag:"Racquet"},{name:"Performance Bag",subtitle:"Ventilated sports duffel · team ready",price:"$72",tag:"Gear"}] },
  { id: "tools", label: "Tools & Hardware", category: "home", aliases: ["tools", "hardware", "power tools", "diy tools", "drill", "tool shop"], mediaQuery: "power tools hardware workshop product", heroTitle: "Tools that make the next job easier.", heroBody: "Shop dependable power tools, hand tools and workshop essentials with practical specs and straightforward comparison.", cta: "Shop tools", navItems: ["Power tools", "Hand tools", "Workshop", "Hardware", "Storage"], collectionTitles: ["Power tools", "Workshop", "Tool storage"], products: [{name:"Drive 20V",subtitle:"Brushless drill driver · 2-battery kit",price:"$129",tag:"20V"},{name:"Cut Pro",subtitle:"Compact circular saw · cordless",price:"$149",tag:"Cordless"},{name:"Bench Set",subtitle:"Professional hand-tool kit · 72 pieces",price:"$119",tag:"Kit"},{name:"Stack Case",subtitle:"Modular tool storage · locking system",price:"$89",tag:"Storage"}] },
  { id: "flowers", label: "Flowers & Plants", category: "home", aliases: ["flowers", "flower shop", "florist", "plants", "plant shop", "indoor plants"], mediaQuery: "modern florist flowers indoor plants shop", heroTitle: "Fresh stems and living greens for every kind of space.", heroBody: "Shop seasonal bouquets, indoor plants and thoughtful arrangements for homes, gifts and special moments.", cta: "Shop flowers", navItems: ["Bouquets", "Plants", "Gifts", "Occasions", "Subscriptions"], collectionTitles: ["Seasonal flowers", "Indoor plants", "Gift arrangements"], products: [{name:"Seasonal Edit",subtitle:"Florist-selected bouquet · changing weekly",price:"$48",tag:"Seasonal"},{name:"Monstera Mini",subtitle:"Easy-care indoor plant · ceramic pot",price:"$36",tag:"Plant"},{name:"Soft Rose",subtitle:"Modern rose arrangement · gift ready",price:"$62",tag:"Gift"},{name:"Green Subscription",subtitle:"Monthly plant or bouquet delivery",price:"$45",tag:"Monthly"}] },
  { id: "books", label: "Books & Stationery", category: "home", aliases: ["books", "bookstore", "stationery", "notebooks", "journals", "pens"], mediaQuery: "bookstore stationery notebooks editorial", heroTitle: "Books and desk objects worth keeping close.", heroBody: "Discover thoughtful reads, notebooks, writing tools and paper goods selected for work, study and everyday rituals.", cta: "Browse the collection", navItems: ["Books", "Notebooks", "Pens", "Desk", "Gifts"], collectionTitles: ["New reads", "Writing tools", "Desk essentials"], products: [{name:"Studio Journal",subtitle:"Lay-flat notebook · premium paper",price:"$24",tag:"Journal"},{name:"Fine Pen 01",subtitle:"Metal rollerball · balanced weight",price:"$32",tag:"Writing"},{name:"Design Library",subtitle:"Curated visual reference book",price:"$48",tag:"Book"},{name:"Desk Notes",subtitle:"Minimal memo set · recycled stock",price:"$16",tag:"Stationery"}] },
  { id: "bakery", label: "Bakery & Desserts", category: "food", aliases: ["bakery", "bread", "pastry", "cake", "desserts", "cookies"], mediaQuery: "artisan bakery pastries bread dessert", heroTitle: "Baked fresh for the next good moment.", heroBody: "Shop artisan breads, pastries and desserts made in small batches with simple ingredients and generous flavor.", cta: "Shop bakery", navItems: ["Bread", "Pastries", "Cakes", "Cookies", "Gift boxes"], collectionTitles: ["Fresh bread", "Pastries", "Dessert boxes"], products: [{name:"Butter Croissant Box",subtitle:"Six flaky croissants · baked fresh",price:"$24",tag:"Fresh"},{name:"Sourdough Loaf",subtitle:"Slow-fermented artisan bread",price:"$12",tag:"Daily"},{name:"Chocolate Cake",subtitle:"Dark chocolate layer cake · serves 8",price:"$42",tag:"Celebration"},{name:"Cookie Set",subtitle:"Mixed bakery cookies · 12 pieces",price:"$28",tag:"Gift"}] },
  { id: "coffee", label: "Coffee & Tea", category: "food", aliases: ["coffee", "coffee shop", "coffee beans", "tea", "tea shop", "matcha"], mediaQuery: "specialty coffee tea beans cafe product", heroTitle: "Better coffee and tea for the daily ritual.", heroBody: "Shop specialty beans, loose-leaf tea and brewing essentials with tasting notes and easier discovery.", cta: "Shop coffee & tea", navItems: ["Coffee", "Tea", "Matcha", "Brewing", "Subscriptions"], collectionTitles: ["Coffee beans", "Tea & matcha", "Brewing gear"], products: [{name:"House Roast",subtitle:"Medium roast · caramel and cacao",price:"$18",tag:"Roasted weekly"},{name:"Single Origin",subtitle:"Light roast · citrus and floral",price:"$22",tag:"Seasonal"},{name:"Ceremonial Matcha",subtitle:"Stone-ground green tea · 30g tin",price:"$28",tag:"Matcha"},{name:"Brew Kit",subtitle:"Pour-over dripper and filters",price:"$36",tag:"Brewing"}] },
  { id: "motorcycles", label: "Motorcycles & Riding", category: "accessories", aliases: ["motorcycle", "motorcycles", "motorbike", "riding gear", "motorcycle shop"], mediaQuery: "premium motorcycles riding gear showroom", heroTitle: "Machines built for the road ahead.", heroBody: "Browse motorcycles and riding essentials with clearer performance, protection and ownership details.", cta: "Explore motorcycles", navItems: ["Motorcycles", "Helmets", "Riding gear", "Parts", "Service"], collectionTitles: ["Street", "Adventure", "Riding essentials"], products: [{name:"Velocity 650",subtitle:"Middleweight road bike · agile twin",price:"$8,900",tag:"Road"},{name:"Trail 900",subtitle:"Adventure bike · long-range touring",price:"$13,500",tag:"Adventure"},{name:"Aero Helmet",subtitle:"Full-face helmet · lightweight shell",price:"$329",tag:"Protection"},{name:"Road Jacket",subtitle:"Armored riding jacket · all-season",price:"$249",tag:"Gear"}], layoutBias: { navOptions: ["categoryBar", "utility", "transparent"], heroOptions: ["immersive", "cinematicProduct", "showcase"], gridOptions: ["specGrid", "featuredPlusRail", "cards"], footerOptions: ["supportHeavy", "darkCommerce"], density: "compact", archetype: "sport", priceStyle: "techSpec", cardStyle: "retail", mediaBehavior: "gallery" } },
  { id: "car-parts", label: "Car Parts & Accessories", category: "accessories", aliases: ["car parts", "auto parts", "tires", "wheels", "car audio", "auto detailing", "car accessories"], mediaQuery: "car parts wheels tires detailing accessories", heroTitle: "Upgrade the drive, part by part.", heroBody: "Shop wheels, tires, audio, detailing and everyday automotive upgrades with practical compatibility details.", cta: "Shop car parts", navItems: ["Wheels", "Tires", "Audio", "Detailing", "Interior"], collectionTitles: ["Wheels & tires", "Interior upgrades", "Care & detailing"], products: [{name:"Aero Wheel 18",subtitle:"Flow-formed alloy wheel · lightweight",price:"$289",tag:"Wheel"},{name:"Touring Tire",subtitle:"All-season tire · quiet highway ride",price:"$169",tag:"Tire"},{name:"Drive Audio Kit",subtitle:"Component speaker set · clear cabin sound",price:"$249",tag:"Audio"},{name:"Ceramic Care Set",subtitle:"Detailing kit · paint protection",price:"$79",tag:"Care"}], layoutBias: { navOptions: ["searchFirst", "megaMenu", "categoryBar"], heroOptions: ["collectionHero", "showcase", "launch"], gridOptions: ["denseRetail", "categoryTabs", "comparison"], footerOptions: ["supportHeavy", "columns"], density: "compact", archetype: "catalog", priceStyle: "standard", cardStyle: "retail", mediaBehavior: "hoverSwap" } },
  { id: "tablets", label: "Tablets & Mobile Computing", category: "tech", aliases: ["tablet", "tablets", "ipad", "android tablet", "drawing tablet"], mediaQuery: "premium tablet ipad product technology", heroTitle: "Portable screens built for more than browsing.", heroBody: "Compare tablets for creativity, study, work and entertainment with clearer display, battery and accessory details.", cta: "Shop tablets", navItems: ["Tablets", "Pro", "Everyday", "Kids", "Accessories"], collectionTitles: ["Pro tablets", "Everyday tablets", "Tablet accessories"], products: [{name:"Canvas Pro 13",subtitle:"High-refresh tablet · creator display",price:"$899",tag:"Pro"},{name:"Slate Air",subtitle:"Thin tablet · all-day battery",price:"$549",tag:"Portable"},{name:"Note Mini",subtitle:"Compact tablet · pen ready",price:"$399",tag:"Compact"},{name:"Studio Pen",subtitle:"Pressure-sensitive stylus · low latency",price:"$99",tag:"Accessory"}], layoutBias: { navOptions: ["searchFirst", "utility", "categoryBar"], heroOptions: ["product", "showcase", "launch"], gridOptions: ["comparison", "specGrid", "featuredPlusRail"], footerOptions: ["supportHeavy", "legalHeavy"], density: "compact", archetype: "tech-retail", priceStyle: "techSpec", cardStyle: "retail", mediaBehavior: "gallery" } },
  { id: "audio", label: "Audio & Headphones", category: "tech", aliases: ["headphones", "earbuds", "speakers", "audio store", "hi-fi", "hifi", "bluetooth speaker"], mediaQuery: "premium headphones earbuds speakers audio product", heroTitle: "Hear more of what you came for.", heroBody: "Shop headphones, earbuds and speakers with straightforward comparisons for sound, comfort and battery life.", cta: "Shop audio", navItems: ["Headphones", "Earbuds", "Speakers", "Hi-Fi", "Accessories"], collectionTitles: ["Personal audio", "Wireless speakers", "Hi-Fi"], products: [{name:"Studio One",subtitle:"Wireless over-ear headphones · ANC",price:"$349",tag:"ANC"},{name:"Pocket Buds",subtitle:"Compact earbuds · adaptive sound",price:"$179",tag:"Wireless"},{name:"Room 360",subtitle:"Wireless speaker · room-filling audio",price:"$299",tag:"Speaker"},{name:"Reference DAC",subtitle:"Desktop DAC amp · hi-res audio",price:"$249",tag:"Hi-Fi"}], layoutBias: { navOptions: ["searchFirst", "categoryBar", "minimal"], heroOptions: ["cinematicProduct", "product", "showcase"], gridOptions: ["spotlight", "comparison", "specGrid"], footerOptions: ["supportHeavy", "darkCommerce"], density: "balanced", archetype: "dark-premium", priceStyle: "techSpec", cardStyle: "glass", mediaBehavior: "hoverVideo" } },
  { id: "smart-home", label: "Smart Home & Security", category: "tech", aliases: ["smart home", "security cameras", "smart camera", "smart lights", "smart lock", "home automation"], mediaQuery: "smart home security camera lighting technology", heroTitle: "A smarter home without the complicated setup.", heroBody: "Connect lighting, security and everyday automation with products designed to work together cleanly.", cta: "Shop smart home", navItems: ["Security", "Lighting", "Locks", "Hubs", "Automation"], collectionTitles: ["Home security", "Smart lighting", "Connected living"], products: [{name:"Guard Cam 2",subtitle:"2K security camera · night vision",price:"$129",tag:"Security"},{name:"Glow Hub",subtitle:"Smart lighting bridge · scene control",price:"$79",tag:"Lighting"},{name:"Lock One",subtitle:"Keyless smart lock · app access",price:"$199",tag:"Access"},{name:"Home Sensor Kit",subtitle:"Door and motion sensors · starter set",price:"$149",tag:"Starter"}], layoutBias: { navOptions: ["searchFirst", "megaMenu", "utility"], heroOptions: ["showcase", "product", "bento"], gridOptions: ["comparison", "categoryTabs", "specGrid"], footerOptions: ["supportHeavy", "legalHeavy"], density: "compact", archetype: "tech-retail", priceStyle: "techSpec", cardStyle: "retail", mediaBehavior: "gallery" } },
  { id: "cookware", label: "Cookware & Kitchenware", category: "home", aliases: ["cookware", "pots and pans", "kitchen knives", "tableware", "kitchenware", "bakeware"], mediaQuery: "premium cookware kitchenware pots pans knives", heroTitle: "Kitchen tools made to stay in rotation.", heroBody: "Shop cookware, knives and table essentials chosen for daily performance, durable materials and clean storage.", cta: "Shop cookware", navItems: ["Cookware", "Knives", "Bakeware", "Tableware", "Kitchen tools"], collectionTitles: ["Cookware sets", "Chef tools", "Table essentials"], products: [{name:"Steel Seven",subtitle:"7-piece cookware set · tri-ply stainless",price:"$349",tag:"Set"},{name:"Chef 20",subtitle:"20cm chef knife · forged steel",price:"$129",tag:"Knife"},{name:"Stone Pan",subtitle:"Nonstick sauté pan · induction ready",price:"$89",tag:"Everyday"},{name:"Serve Four",subtitle:"Stoneware dinner set · 16 pieces",price:"$119",tag:"Table"}], layoutBias: { navOptions: ["centered", "categoryBar", "stacked"], heroOptions: ["splitMedia", "bento", "collectionHero"], gridOptions: ["cards", "categoryTabs", "featuredPlusRail"], footerOptions: ["newsletterHero", "columns"], density: "balanced", archetype: "scandinavian", priceStyle: "standard", cardStyle: "softCard", mediaBehavior: "hoverZoom" } },
  { id: "refrigerators", label: "Refrigerators & Large Kitchen Appliances", category: "home", aliases: ["refrigerator", "refrigerators", "fridge", "freezer", "large kitchen appliances"], mediaQuery: "modern refrigerator fridge kitchen appliance product", heroTitle: "Cooling that fits the way your kitchen works.", heroBody: "Compare refrigerators and freezers by capacity, configuration, efficiency and smart features without the spec overload.", cta: "Shop refrigerators", navItems: ["French door", "Side-by-side", "Freezers", "Compact", "Smart models"], collectionTitles: ["Family capacity", "Smart cooling", "Compact spaces"], products: [{name:"FlexDoor 620",subtitle:"French-door refrigerator · 620L capacity",price:"$1,899",tag:"Family"},{name:"PureCool 480",subtitle:"Bottom-freezer fridge · inverter cooling",price:"$1,249",tag:"Efficient"},{name:"Side 700",subtitle:"Side-by-side refrigerator · water dispenser",price:"$1,699",tag:"Large"},{name:"Freeze Box 300",subtitle:"Upright freezer · frost-free",price:"$849",tag:"Freezer"}], layoutBias: { navOptions: ["searchFirst", "categoryBar", "utility"], heroOptions: ["product", "showcase", "minimalCommerce"], gridOptions: ["comparison", "specGrid", "denseRetail"], footerOptions: ["supportHeavy", "legalHeavy"], density: "compact", archetype: "catalog", priceStyle: "installment", cardStyle: "retail", mediaBehavior: "gallery" } },
  { id: "laundry", label: "Laundry Appliances", category: "home", aliases: ["washing machine", "washer", "dryer", "laundry appliances", "washer dryer"], mediaQuery: "modern washing machine dryer laundry appliance", heroTitle: "Laundry systems built around real weekly loads.", heroBody: "Compare washers and dryers by capacity, cycle options, energy use and space-saving configurations.", cta: "Shop laundry", navItems: ["Washers", "Dryers", "Washer-dryers", "Compact", "Laundry care"], collectionTitles: ["Front load", "Space saving", "High capacity"], products: [{name:"Wash 10",subtitle:"10kg front-load washer · inverter motor",price:"$899",tag:"Washer"},{name:"Dry 9 Heat",subtitle:"9kg heat-pump dryer · energy efficient",price:"$999",tag:"Dryer"},{name:"Duo Compact",subtitle:"Washer-dryer combo · small-space design",price:"$1,049",tag:"Combo"},{name:"Care Steam",subtitle:"Steam washer · allergen cycle",price:"$1,099",tag:"Steam"}], layoutBias: { navOptions: ["searchFirst", "utility", "categoryBar"], heroOptions: ["showcase", "product", "splitMedia"], gridOptions: ["comparison", "specGrid", "featuredPlusRail"], footerOptions: ["supportHeavy", "columns"], density: "compact", archetype: "catalog", priceStyle: "installment", cardStyle: "retail", mediaBehavior: "gallery" } },
  { id: "air-conditioning", label: "Air Conditioning & Cooling", category: "home", aliases: ["air conditioner", "air conditioning", "aircon", "ac unit", "electric fan", "cooling appliances"], mediaQuery: "modern air conditioner cooling appliance interior", heroTitle: "Cooler rooms, quieter performance.", heroBody: "Shop efficient cooling systems with straightforward room-size guidance, energy ratings and installation details.", cta: "Shop cooling", navItems: ["Split AC", "Window AC", "Portable", "Fans", "Installation"], collectionTitles: ["Room cooling", "Energy saver", "Portable cooling"], products: [{name:"Breeze 1.5HP",subtitle:"Inverter split AC · quiet mode",price:"$699",tag:"Inverter"},{name:"Window Cool 1HP",subtitle:"Compact window AC · fast cooling",price:"$449",tag:"Compact"},{name:"Air Tower",subtitle:"Bladeless fan · air circulation",price:"$249",tag:"Fan"},{name:"Portable 12K",subtitle:"Portable AC · 12,000 BTU",price:"$529",tag:"Portable"}], layoutBias: { navOptions: ["searchFirst", "categoryBar", "utility"], heroOptions: ["minimalCommerce", "product", "showcase"], gridOptions: ["comparison", "specGrid", "cards"], footerOptions: ["supportHeavy", "legalHeavy"], density: "compact", archetype: "tech-retail", priceStyle: "installment", cardStyle: "retail", mediaBehavior: "gallery" } },
  { id: "dining-furniture", label: "Dining Furniture", category: "home", aliases: ["dining table", "dining furniture", "dining chairs", "dining set"], mediaQuery: "modern dining table chairs interior furniture", heroTitle: "A better table for everyday gathering.", heroBody: "Shop dining tables, chairs and coordinated sets with dimensions, materials and room-fit details made easier to compare.", cta: "Shop dining", navItems: ["Dining tables", "Chairs", "Sets", "Benches", "Materials"], collectionTitles: ["Dining tables", "Seating", "Complete sets"], products: [{name:"Oak Table 180",subtitle:"Solid oak dining table · seats 6",price:"$1,190",tag:"Oak"},{name:"Curve Chair",subtitle:"Upholstered dining chair · set of 2",price:"$420",tag:"Pair"},{name:"Studio Round",subtitle:"Round dining table · pedestal base",price:"$890",tag:"Compact"},{name:"Bench Line",subtitle:"Solid wood dining bench · 160cm",price:"$520",tag:"Bench"}], layoutBias: { navOptions: ["centered", "logoRail", "minimal"], heroOptions: ["splitMedia", "fullBleedEditorial", "imageCollage"], gridOptions: ["magazineGrid", "featureSplit", "luxurySparse"], footerOptions: ["imageSplit", "oversizedBrand"], density: "airy", rhythm: "editorial", archetype: "editorial", priceStyle: "luxuryInline", cardStyle: "imageFirst", mediaBehavior: "gallery" } },
  { id: "office-furniture", label: "Office Furniture", category: "home", aliases: ["office chair", "office desk", "office furniture", "ergonomic chair", "standing desk"], mediaQuery: "modern ergonomic office chair desk workspace", heroTitle: "A workspace that works harder for you.", heroBody: "Build a better desk setup with ergonomic seating, adjustable desks and storage designed for long days and cleaner focus.", cta: "Shop office furniture", navItems: ["Chairs", "Desks", "Standing desks", "Storage", "Accessories"], collectionTitles: ["Ergonomic seating", "Desks", "Workspace storage"], products: [{name:"Form Chair",subtitle:"Ergonomic office chair · adaptive lumbar",price:"$599",tag:"Ergonomic"},{name:"Rise Desk",subtitle:"Electric standing desk · memory presets",price:"$699",tag:"Standing"},{name:"Studio Desk",subtitle:"Minimal work desk · cable management",price:"$449",tag:"Desk"},{name:"Grid Drawer",subtitle:"Mobile filing pedestal · soft close",price:"$229",tag:"Storage"}], layoutBias: { navOptions: ["searchFirst", "minimal", "stacked"], heroOptions: ["showcase", "splitMedia", "minimalCommerce"], gridOptions: ["comparison", "featuredPlusRail", "cards"], footerOptions: ["supportHeavy", "columns"], density: "balanced", archetype: "minimal", priceStyle: "standard", cardStyle: "outlined", mediaBehavior: "gallery" } },
  { id: "butcher", label: "Meat & Butcher Shop", category: "food", aliases: ["butcher", "meat shop", "beef", "steak shop", "chicken", "poultry"], mediaQuery: "premium butcher meat steak market food", heroTitle: "Better cuts, selected with care.", heroBody: "Shop steaks, poultry and everyday cuts with straightforward weight, sourcing and preparation details.", cta: "Shop meat", navItems: ["Beef", "Poultry", "Pork", "BBQ", "Bundles"], collectionTitles: ["Premium cuts", "Everyday essentials", "BBQ boxes"], products: [{name:"Ribeye Cut",subtitle:"Prime ribeye · 300g steak",price:"$18",tag:"Premium"},{name:"Chicken Breast",subtitle:"Boneless skinless · 1kg pack",price:"$11",tag:"Fresh"},{name:"BBQ Box",subtitle:"Mixed grilling cuts · family pack",price:"$49",tag:"Bundle"},{name:"Slow Cook Set",subtitle:"Braising cuts · 1.5kg selection",price:"$32",tag:"Value"}], layoutBias: { navOptions: ["categoryBar", "centered", "promoHeavy"], heroOptions: ["bento", "showcase", "campaign"], gridOptions: ["bundleGrid", "cards", "denseRetail"], footerOptions: ["newsletterHero", "columns"], density: "compact", archetype: "conversion", priceStyle: "bundle", cardStyle: "retail", mediaBehavior: "hoverZoom" } },
  { id: "produce", label: "Fresh Produce & Grocery", category: "food", aliases: ["fresh produce", "fruit market", "vegetable market", "grocery", "groceries", "organic produce"], mediaQuery: "fresh produce fruit vegetable grocery market", heroTitle: "Fresh produce for the everyday shop.", heroBody: "Browse fruit, vegetables and pantry staples with seasonal picks, bundles and practical delivery options.", cta: "Shop fresh", navItems: ["Fruit", "Vegetables", "Organic", "Pantry", "Boxes"], collectionTitles: ["Seasonal fruit", "Fresh vegetables", "Weekly boxes"], products: [{name:"Market Fruit Box",subtitle:"Seasonal fruit selection · family size",price:"$28",tag:"Seasonal"},{name:"Green Basket",subtitle:"Leafy greens and vegetables · mixed box",price:"$22",tag:"Fresh"},{name:"Citrus Set",subtitle:"Oranges, lemons and limes · 3kg",price:"$16",tag:"Citrus"},{name:"Weekly Essentials",subtitle:"Fruit and vegetable staples · curated box",price:"$35",tag:"Weekly"}], layoutBias: { navOptions: ["categoryBar", "searchFirst", "centered"], heroOptions: ["bento", "collectionHero", "showcase"], gridOptions: ["categoryTabs", "cards", "bundleGrid"], footerOptions: ["newsletterHero", "columns"], density: "compact", archetype: "conversion", priceStyle: "bundle", cardStyle: "softCard", mediaBehavior: "hoverZoom" } },
  { id: "ice-cream", label: "Ice Cream & Frozen Desserts", category: "food", aliases: ["ice cream", "gelato", "frozen desserts", "ice cream shop"], mediaQuery: "premium ice cream gelato colorful dessert", heroTitle: "Cold, creamy, and made for the next scoop.", heroBody: "Shop signature flavors, pints and party boxes with playful merchandising and easy bundle choices.", cta: "Shop flavors", navItems: ["Flavors", "Pints", "Bundles", "Vegan", "Party boxes"], collectionTitles: ["Signature flavors", "Pint bundles", "Party favorites"], products: [{name:"Vanilla Bean",subtitle:"Classic vanilla gelato · 473ml pint",price:"$12",tag:"Classic"},{name:"Dark Cocoa",subtitle:"Rich chocolate ice cream · 473ml",price:"$13",tag:"Rich"},{name:"Mango Cream",subtitle:"Tropical mango gelato · 473ml",price:"$13",tag:"Fruit"},{name:"Party Six",subtitle:"Choose six pints · bundle price",price:"$65",tag:"Bundle"}], layoutBias: { navOptions: ["floating", "centered", "promoHeavy"], heroOptions: ["imageCollage", "bento", "showcase"], gridOptions: ["cards", "carousel", "bundleGrid"], footerOptions: ["socialFirst", "newsletterHero"], density: "balanced", archetype: "playful", priceStyle: "bundle", cardStyle: "softCard", mediaBehavior: "hoverSwap" } },
  { id: "toys", label: "Toys & Play", category: "kids", aliases: ["toys", "toy store", "kids toys", "action figures", "building blocks", "dolls"], mediaQuery: "premium kids toys colorful play store", heroTitle: "More ways to play, build and imagine.", heroBody: "Discover toys for creative play, learning and everyday fun with clearer age guidance and gift-ready collections.", cta: "Shop toys", navItems: ["New toys", "Learning", "Building", "Pretend play", "Gifts"], collectionTitles: ["Creative play", "Learning toys", "Gift favorites"], products: [{name:"Build Box 120",subtitle:"Creative building set · 120 pieces",price:"$39",tag:"Build"},{name:"Story House",subtitle:"Pretend-play house set · ages 3+",price:"$59",tag:"Pretend"},{name:"Science Lab Mini",subtitle:"STEM experiment kit · ages 8+",price:"$32",tag:"STEM"},{name:"Soft Friend",subtitle:"Plush character · washable fabric",price:"$24",tag:"Gift"}], layoutBias: { navOptions: ["floating", "centered", "stacked"], heroOptions: ["bento", "imageCollage", "showcase"], gridOptions: ["cards", "carousel", "categoryTabs"], footerOptions: ["socialFirst", "newsletterHero"], density: "balanced", archetype: "playful", priceStyle: "standard", cardStyle: "softCard", mediaBehavior: "hoverSwap" } },
  { id: "skincare", label: "Skincare", category: "beauty", aliases: ["skincare", "skin care", "serum", "cleanser", "moisturizer", "dermatology skincare"], mediaQuery: "premium skincare serum cleanser beauty editorial", heroTitle: "A clearer routine, product by product.", heroBody: "Shop cleansers, serums and moisturizers with ingredient-focused guidance and a calmer path to building your routine.", cta: "Build your routine", navItems: ["Cleansers", "Serums", "Moisturizers", "SPF", "Sets"], collectionTitles: ["Daily routine", "Treatment", "Hydration"], products: [{name:"Balance Cleanser",subtitle:"Gentle gel cleanser · daily use",price:"$28",tag:"Cleanse"},{name:"Bright C15",subtitle:"Vitamin C serum · antioxidant care",price:"$46",tag:"Serum"},{name:"Barrier Cream",subtitle:"Ceramide moisturizer · fragrance free",price:"$38",tag:"Barrier"},{name:"Daily SPF50",subtitle:"Lightweight sunscreen · no white cast",price:"$34",tag:"SPF"}], layoutBias: { navOptions: ["centered", "editorial", "minimal"], heroOptions: ["beautyEditorial", "minimalCommerce", "splitMedia"], gridOptions: ["luxurySparse", "cards", "bundleGrid"], footerOptions: ["newsletterHero", "editorial"], density: "airy", archetype: "beauty", priceStyle: "subscription", cardStyle: "borderless", mediaBehavior: "gallery" } },
  { id: "perfume", label: "Perfume & Fragrance", category: "beauty", aliases: ["perfume", "fragrance", "cologne", "perfume shop", "niche fragrance"], mediaQuery: "luxury perfume fragrance bottle editorial", heroTitle: "Fragrance with a point of view.", heroBody: "Discover distinctive scents through notes, moods and compositions designed to make finding a signature easier.", cta: "Explore fragrance", navItems: ["New scents", "Fresh", "Woody", "Floral", "Discovery sets"], collectionTitles: ["Signature scents", "Discovery sets", "Seasonal notes"], products: [{name:"No. 01 Cedar",subtitle:"Cedar, iris and musk · eau de parfum",price:"$145",tag:"Woody"},{name:"No. 07 Neroli",subtitle:"Citrus, neroli and white musk",price:"$135",tag:"Fresh"},{name:"No. 12 Rose",subtitle:"Rose, pink pepper and amber",price:"$155",tag:"Floral"},{name:"Discovery Six",subtitle:"Six 2ml fragrance samples",price:"$42",tag:"Discovery"}], layoutBias: { navOptions: ["centered", "logoRail", "editorial"], heroOptions: ["fullBleedEditorial", "cinematicProduct", "magazine"], gridOptions: ["luxurySparse", "spotlight", "editorialRail"], footerOptions: ["oversizedBrand", "editorial"], density: "airy", rhythm: "editorial", archetype: "luxury", priceStyle: "luxuryInline", cardStyle: "imageFirst", mediaBehavior: "hoverVideo" } },
  { id: "smartwatches", label: "Smartwatches & Fitness Trackers", category: "tech", aliases: ["smartwatch", "smartwatches", "fitness tracker", "fitness watch"], mediaQuery: "premium smartwatch fitness tracker product", heroTitle: "A smarter view of every day.", heroBody: "Compare health tracking, battery life, displays and connected features across watches built for work, training and daily life.", cta: "Shop smartwatches", navItems: ["Smartwatches", "Fitness", "Outdoor", "Accessories", "Compare"], collectionTitles: ["Everyday smartwatches", "Fitness tracking", "Outdoor ready"], products: [{name:"Pulse X",subtitle:"AMOLED display · advanced health tracking",price:"$349",tag:"Featured"},{name:"Trail Pro",subtitle:"Dual-band GPS · rugged build",price:"$429",tag:"Outdoor"},{name:"Fit Mini",subtitle:"Lightweight tracker · 10-day battery",price:"$129",tag:"Fitness"},{name:"Studio Watch",subtitle:"Slim case · calls and notifications",price:"$279",tag:"New"}], layoutBias: { navOptions: ["searchFirst", "utility", "categoryBar"], heroOptions: ["launch", "product", "showcase"], gridOptions: ["comparison", "specGrid", "featuredPlusRail"], footerOptions: ["supportHeavy", "legalHeavy"], density: "compact", archetype: "tech-retail", priceStyle: "techSpec", cardStyle: "outlined", mediaBehavior: "gallery" } },
  { id: "luxury-handbags", label: "Luxury Handbags", category: "accessories", aliases: ["luxury handbag", "designer bag", "handbag store", "luxury bags"], mediaQuery: "luxury designer handbag editorial", heroTitle: "Carry pieces designed to outlast seasons.", heroBody: "Explore structured icons, soft leather essentials and statement silhouettes through a refined, editorial shopping experience.", cta: "Explore handbags", navItems: ["New bags", "Top handles", "Shoulder bags", "Totes", "Small leather goods"], collectionTitles: ["New icons", "Everyday leather", "Evening pieces"], products: [{name:"Atelier 28",subtitle:"Structured calfskin top handle",price:"$1,890",tag:"Signature"},{name:"Arc Shoulder",subtitle:"Soft leather · sculpted silhouette",price:"$1,450",tag:"New"},{name:"Grand Tote",subtitle:"Full-grain leather · spacious interior",price:"$1,680",tag:"Essential"},{name:"Mini Form",subtitle:"Compact crossbody · polished hardware",price:"$980",tag:"Evening"}], layoutBias: { navOptions: ["centered", "logoRail", "editorial"], heroOptions: ["fullBleedEditorial", "magazine", "cinematicProduct"], gridOptions: ["luxurySparse", "editorialRail", "spotlight"], footerOptions: ["oversizedBrand", "editorial"], density: "airy", rhythm: "editorial", archetype: "luxury", priceStyle: "luxuryInline", cardStyle: "imageFirst", mediaBehavior: "gallery" } },
  { id: "makeup", label: "Makeup & Cosmetics", category: "beauty", aliases: ["makeup", "cosmetics", "makeup store", "beauty makeup"], mediaQuery: "premium makeup cosmetics editorial product", heroTitle: "Color, finish and texture made easier to explore.", heroBody: "Shop complexion, lip, eye and cheek essentials with shade-led merchandising and editorial product storytelling.", cta: "Shop makeup", navItems: ["New", "Face", "Eyes", "Lips", "Sets"], collectionTitles: ["Complexion", "Color essentials", "Artist sets"], products: [{name:"Skin Veil",subtitle:"Buildable skin tint · natural finish",price:"$42",tag:"Complexion"},{name:"Velvet Lip",subtitle:"Soft-matte lip color · rich pigment",price:"$28",tag:"Lips"},{name:"Light Palette",subtitle:"Six wearable eye shades",price:"$48",tag:"Eyes"},{name:"Flush Cream",subtitle:"Blendable cheek color · dewy finish",price:"$32",tag:"New"}], layoutBias: { navOptions: ["centered", "editorial", "categoryBar"], heroOptions: ["beautyEditorial", "imageCollage", "showcase"], gridOptions: ["categoryTabs", "cards", "magazineGrid"], footerOptions: ["newsletterHero", "socialFirst"], density: "balanced", archetype: "beauty", priceStyle: "standard", cardStyle: "imageFirst", mediaBehavior: "hoverSwap" } },
  { id: "hair-care", label: "Hair Care", category: "beauty", aliases: ["hair care", "haircare", "shampoo store", "curly hair care"], mediaQuery: "premium hair care shampoo conditioner product", heroTitle: "Build a routine around your hair, not a trend.", heroBody: "Discover cleansers, conditioners, masks and styling care organized by texture, concern and routine step.", cta: "Build a hair routine", navItems: ["Wash", "Condition", "Treat", "Style", "Sets"], collectionTitles: ["Wash day", "Repair", "Hydration"], products: [{name:"Balance Wash",subtitle:"Gentle daily shampoo · sulfate free",price:"$26",tag:"Cleanse"},{name:"Soft Condition",subtitle:"Hydrating conditioner · detangling care",price:"$28",tag:"Condition"},{name:"Repair Mask",subtitle:"Weekly bond-support treatment",price:"$36",tag:"Treatment"},{name:"Curl Define",subtitle:"Flexible styling cream · soft hold",price:"$24",tag:"Style"}], layoutBias: { navOptions: ["centered", "categoryBar", "minimal"], heroOptions: ["beautyEditorial", "splitMedia", "minimalCommerce"], gridOptions: ["bundleGrid", "cards", "categoryTabs"], footerOptions: ["newsletterHero", "supportHeavy"], density: "balanced", archetype: "beauty", priceStyle: "subscription", cardStyle: "softCard", mediaBehavior: "gallery" } },
  { id: "lighting", label: "Lighting & Lamps", category: "home", aliases: ["lighting", "lamps", "pendant lights", "floor lamp", "lighting store"], mediaQuery: "designer lighting lamps interior editorial", heroTitle: "Light that shapes the room.", heroBody: "Explore pendants, floor lamps, table lights and architectural pieces selected for atmosphere, proportion and finish.", cta: "Shop lighting", navItems: ["Pendants", "Floor lamps", "Table lamps", "Wall lights", "Outdoor"], collectionTitles: ["Ambient light", "Statement pendants", "Task lighting"], products: [{name:"Halo Pendant",subtitle:"Opal glass · warm diffused light",price:"$420",tag:"Pendant"},{name:"Line Floor",subtitle:"Slim metal floor lamp · dimmable",price:"$360",tag:"Floor"},{name:"Moss Table",subtitle:"Ceramic base · linen shade",price:"$240",tag:"Table"},{name:"Arc Wall",subtitle:"Directional wall light · brushed finish",price:"$190",tag:"Wall"}], layoutBias: { navOptions: ["logoRail", "centered", "minimal"], heroOptions: ["imageCollage", "fullBleedEditorial", "showcase"], gridOptions: ["mosaic", "magazineGrid", "luxurySparse"], footerOptions: ["imageSplit", "oversizedBrand"], density: "airy", rhythm: "editorial", archetype: "editorial", priceStyle: "luxuryInline", cardStyle: "imageFirst", mediaBehavior: "gallery" } },
  { id: "outdoor-furniture", label: "Outdoor Furniture", category: "home", aliases: ["outdoor furniture", "patio furniture", "garden furniture", "outdoor sofa"], mediaQuery: "premium outdoor patio furniture lifestyle", heroTitle: "Make outside feel fully furnished.", heroBody: "Shop weather-ready seating, dining and lounge pieces designed to bring indoor comfort into open-air spaces.", cta: "Shop outdoor furniture", navItems: ["Lounge", "Dining", "Chairs", "Shade", "Accessories"], collectionTitles: ["Outdoor lounge", "Dining outside", "Small-space patio"], products: [{name:"Terrace Sofa",subtitle:"Weather-ready modular seating",price:"$1,890",tag:"Lounge"},{name:"Coast Dining",subtitle:"Six-seat outdoor dining set",price:"$1,490",tag:"Dining"},{name:"Rope Chair",subtitle:"Woven lounge chair · quick-dry cushion",price:"$520",tag:"Chair"},{name:"Shade Table",subtitle:"Compact bistro table · powder-coated",price:"$390",tag:"Patio"}], layoutBias: { navOptions: ["categoryBar", "logoRail", "centered"], heroOptions: ["fullBleedEditorial", "collectionHero", "imageCollage"], gridOptions: ["featureSplit", "magazineGrid", "cards"], footerOptions: ["storeLocator", "imageSplit"], density: "airy", rhythm: "editorial", archetype: "scandinavian", priceStyle: "standard", cardStyle: "imageFirst", mediaBehavior: "gallery" } },
  { id: "golf", label: "Golf Equipment", category: "outdoor", aliases: ["golf equipment", "golf gear", "golf clubs", "golf shop"], mediaQuery: "premium golf clubs equipment performance", heroTitle: "Build a setup for the way you play.", heroBody: "Compare clubs, balls, bags and training gear with performance details that make choosing the right setup easier.", cta: "Shop golf gear", navItems: ["Clubs", "Balls", "Bags", "Apparel", "Training"], collectionTitles: ["Drivers & woods", "Irons & wedges", "Course essentials"], products: [{name:"Velocity Driver",subtitle:"Adjustable 460cc driver · low spin",price:"$549",tag:"Driver"},{name:"Forged 7 Set",subtitle:"Players-distance irons · 5–PW",price:"$999",tag:"Irons"},{name:"Tour Wedge",subtitle:"Milled face · versatile sole",price:"$169",tag:"Wedge"},{name:"Carry Pro",subtitle:"Lightweight stand bag · 6-way top",price:"$249",tag:"Bag"}], layoutBias: { navOptions: ["categoryBar", "utility", "searchFirst"], heroOptions: ["showcase", "product", "campaign"], gridOptions: ["specGrid", "comparison", "featuredPlusRail"], footerOptions: ["supportHeavy", "storeLocator"], density: "compact", archetype: "sport", priceStyle: "techSpec", cardStyle: "retail", mediaBehavior: "gallery" } },
  { id: "camping", label: "Camping & Hiking", category: "outdoor", aliases: ["camping", "hiking gear", "camping gear", "tents", "outdoor camping"], mediaQuery: "premium camping hiking outdoor gear landscape", heroTitle: "Gear for nights farther from the road.", heroBody: "Explore shelter, sleep systems, camp furniture and trail essentials organized for real trips and changing conditions.", cta: "Explore camping gear", navItems: ["Tents", "Sleep", "Camp kitchen", "Packs", "Trail gear"], collectionTitles: ["Shelter", "Sleep systems", "Camp essentials"], products: [{name:"Ridge 2P",subtitle:"Two-person tent · three-season shelter",price:"$329",tag:"Shelter"},{name:"Cloud 20",subtitle:"20°F sleeping bag · packable insulation",price:"$189",tag:"Sleep"},{name:"Trail 45",subtitle:"45L hiking pack · ventilated carry",price:"$219",tag:"Pack"},{name:"Camp Fire Set",subtitle:"Compact cook system · two-person kit",price:"$119",tag:"Kitchen"}], layoutBias: { navOptions: ["utility", "categoryBar", "searchFirst"], heroOptions: ["immersive", "showcase", "splitMedia"], gridOptions: ["specGrid", "featureSplit", "cards"], footerOptions: ["supportHeavy", "imageSplit"], density: "balanced", archetype: "sport", priceStyle: "standard", cardStyle: "outlined", mediaBehavior: "gallery" } },
  { id: "earbuds", label: "Earbuds & Personal Audio", category: "tech", aliases: ["earbuds", "wireless earbuds", "in ear headphones", "personal audio"], mediaQuery: "premium wireless earbuds audio product", heroTitle: "Small audio, tuned for the whole day.", heroBody: "Compare fit, noise cancellation, battery life and sound profiles across true-wireless earbuds and personal audio.", cta: "Shop earbuds", navItems: ["Earbuds", "Headphones", "Sport", "Accessories", "Compare"], collectionTitles: ["Noise cancelling", "Everyday audio", "Sport fit"], products: [{name:"Quiet Bud Pro",subtitle:"Adaptive ANC · spatial audio",price:"$249",tag:"Pro"},{name:"Air Mini",subtitle:"Compact fit · 30-hour battery",price:"$149",tag:"Everyday"},{name:"Run Lock",subtitle:"Secure sport fit · sweat resistant",price:"$179",tag:"Sport"},{name:"Studio TWS",subtitle:"Hi-res codec · custom EQ",price:"$219",tag:"Audio"}], layoutBias: { navOptions: ["searchFirst", "utility", "minimal"], heroOptions: ["cinematicProduct", "launch", "product"], gridOptions: ["comparison", "specGrid", "spotlight"], footerOptions: ["supportHeavy", "legalHeavy"], density: "compact", archetype: "tech-retail", priceStyle: "techSpec", cardStyle: "outlined", mediaBehavior: "hoverVideo" } },
  { id: "sneakers", label: "Sneakers", category: "shoes", aliases: ["sneakers", "sneaker store", "trainer shoes", "sneaker drop"], mediaQuery: "premium sneakers footwear streetwear campaign", heroTitle: "The pairs shaping the next rotation.", heroBody: "Discover new drops, everyday icons and performance-inspired sneakers through a faster, culture-led storefront.", cta: "Shop sneakers", navItems: ["New drops", "Men", "Women", "Performance", "Sale"], collectionTitles: ["Latest drops", "Everyday rotation", "Performance"], products: [{name:"Vector 01",subtitle:"Layered runner · lightweight cushioning",price:"$160",tag:"New"},{name:"Court Low",subtitle:"Leather court sneaker · clean profile",price:"$140",tag:"Classic"},{name:"Pulse Knit",subtitle:"Responsive foam · breathable upper",price:"$180",tag:"Performance"},{name:"Archive High",subtitle:"Retro high-top · premium suede",price:"$170",tag:"Archive"}], layoutBias: { navOptions: ["compactSticky", "transparent", "promoHeavy"], heroOptions: ["megaTypography", "campaign", "cinematicProduct"], gridOptions: ["shopTheLook", "denseRetail", "featuredPlusRail"], footerOptions: ["darkCommerce", "socialFirst"], density: "compact", archetype: "streetwear", priceStyle: "percentage", cardStyle: "textOverlay", mediaBehavior: "hoverSwap" } },
  { id: "organic-grocery", label: "Organic Grocery", category: "food", aliases: ["organic grocery", "organic food", "natural grocery", "healthy grocery"], mediaQuery: "organic grocery fresh produce pantry premium", heroTitle: "A cleaner weekly shop, from produce to pantry.", heroBody: "Browse organic produce, pantry staples and everyday essentials with clearer sourcing and simpler recurring shopping.", cta: "Shop organic", navItems: ["Produce", "Pantry", "Dairy", "Snacks", "Weekly box"], collectionTitles: ["Fresh produce", "Pantry staples", "Weekly essentials"], products: [{name:"Market Produce Box",subtitle:"Seasonal organic fruit and vegetables",price:"$42",tag:"Fresh"},{name:"Pantry Grain Set",subtitle:"Rice, oats and grains · organic staples",price:"$28",tag:"Pantry"},{name:"Clean Snack Box",subtitle:"Better-for-you snacks · curated mix",price:"$36",tag:"Snacks"},{name:"Weekly Essentials",subtitle:"Produce and pantry bundle · recurring",price:"$68",tag:"Bundle"}], layoutBias: { navOptions: ["searchFirst", "categoryBar", "centered"], heroOptions: ["bento", "collectionHero", "showcase"], gridOptions: ["denseRetail", "bundleGrid", "categoryTabs"], footerOptions: ["newsletterHero", "supportHeavy"], density: "compact", archetype: "catalog", priceStyle: "subscription", cardStyle: "retail", mediaBehavior: "hoverZoom" } },

  { id: "furniture-lounge", label: "Lounge Furniture", category: "home", aliases: ["lounge furniture", "living room furniture", "accent chair", "coffee table set"], mediaQuery: "premium lounge furniture living room interior", heroTitle: "The living room, upgraded piece by piece.", heroBody: "Create a warmer lounge setup with modern seating, tables and layered accents presented through a cleaner furniture-first shopping flow.", cta: "Shop lounge furniture", navItems: ["Sofas", "Accent chairs", "Coffee tables", "Storage", "Lighting"], collectionTitles: ["Living room", "Statement seating", "Layered accessories"], products: [{name:"Halo Sofa",subtitle:"Curved 3-seater · textured weave",price:"$1,299",tag:"Featured"},{name:"Frame Chair",subtitle:"Oak accent chair · cushioned seat",price:"$449",tag:"New"},{name:"Orbit Table",subtitle:"Round coffee table · stone top",price:"$389",tag:"Popular"},{name:"Stack Console",subtitle:"Slim storage console · matte finish",price:"$599",tag:"Storage"}], layoutBias: { navOptions: ["pillNav", "centered", "minimal"], heroOptions: ["showcase", "splitMedia", "floatingProducts"], gridOptions: ["zigzagEditorial", "stackedShowcase", "magazineGrid"], footerOptions: ["megaGrid", "immersiveSignup"], density: "balanced", archetype: "scandinavian", priceStyle: "pricePill", cardStyle: "softCard", mediaBehavior: "hoverZoom" } },
  { id: "bedroom-interiors", label: "Bedroom Interiors", category: "home", aliases: ["bedroom furniture", "bedroom interiors", "beds and nightstands", "bedroom decor"], mediaQuery: "luxury bedroom furniture interior design", heroTitle: "A calmer bedroom starts with better essentials.", heroBody: "Explore beds, nightstands, linens and bedroom accents through a soft editorial storefront designed for comfort-led discovery.", cta: "Shop bedroom", navItems: ["Beds", "Mattresses", "Nightstands", "Bedding", "Lighting"], collectionTitles: ["Bedroom edit", "Soft layers", "Rest essentials"], products: [{name:"Cloud Bed",subtitle:"Upholstered frame · low profile",price:"$1,180",tag:"Best seller"},{name:"Still Nightstand",subtitle:"Solid wood bedside table",price:"$260",tag:"New"},{name:"Sleep Linen Set",subtitle:"Breathable cotton sateen",price:"$149",tag:"Set"},{name:"Aura Lamp",subtitle:"Warm bedside glow",price:"$89",tag:"Accent"}], layoutBias: { navOptions: ["brandMarquee", "centered", "logoRail"], heroOptions: ["collectionHero", "showcase", "split"], gridOptions: ["zigzagEditorial", "luxurySparse", "featuredPlusRail"], footerOptions: ["brandWall", "newsletterHero"], density: "airy", rhythm: "editorial", archetype: "storytelling", priceStyle: "compareStrong", cardStyle: "imageFirst", mediaBehavior: "hoverZoom" } },
  { id: "coffee-gear", label: "Coffee Machines & Brewing", category: "home", aliases: ["coffee gear", "coffee machine", "espresso machine", "brewing equipment"], mediaQuery: "premium coffee machine brewing equipment kitchen", heroTitle: "Brew better, from first cup to daily ritual.", heroBody: "Compare espresso machines, grinders and brewing tools with clearer specs, pricing and bundle-friendly shopping.", cta: "Shop coffee gear", navItems: ["Machines", "Grinders", "Brewers", "Accessories", "Bundles"], collectionTitles: ["Espresso", "Pour-over", "Barista setup"], products: [{name:"Barista One",subtitle:"Compact espresso machine · 15-bar pump",price:"$499",tag:"Popular"},{name:"Grind Studio",subtitle:"Conical burr grinder · 40 settings",price:"$189",tag:"Precision"},{name:"Pour Kit",subtitle:"Kettle, dripper and server set",price:"$129",tag:"Bundle"},{name:"Milk Pro",subtitle:"Hands-free frother · dual heat",price:"$99",tag:"Accessory"}], layoutBias: { navOptions: ["searchFirst", "pillNav", "utility"], heroOptions: ["product", "showcase", "launch"], gridOptions: ["hoverPanels", "comparison", "specGrid"], footerOptions: ["megaGrid", "supportHeavy"], density: "compact", archetype: "conversion", priceStyle: "compareStrong", cardStyle: "outlined", mediaBehavior: "gallery" } },
  { id: "motion-streetwear", label: "Motion Streetwear", category: "fashion", aliases: ["motion streetwear", "animated streetwear", "moving streetwear", "marquee fashion"], mediaQuery: "streetwear fashion campaign premium", heroTitle: "Collections built to move on screen and on body.", heroBody: "A campaign-led storefront combining energetic type, motion-led media and bold product presentation for drops, collabs and streetwear edits.", cta: "Shop the drop", navItems: ["New drop", "Outerwear", "Graphics", "Accessories", "Lookbook"], collectionTitles: ["Drop 01", "Core streetwear", "Motion graphics"], products: [{name:"Signal Hoodie",subtitle:"Heavyweight fleece · oversized fit",price:"$98",tag:"Drop"},{name:"Shift Cargo",subtitle:"Utility pant · relaxed taper",price:"$88",tag:"Core"},{name:"Transit Tee",subtitle:"Graphic tee · washed cotton",price:"$42",tag:"New"},{name:"Pulse Cap",subtitle:"Structured cap · stitched logo",price:"$28",tag:"Accessory"}], layoutBias: { navOptions: ["brandMarquee", "dualRowPromo", "transparent"], heroOptions: ["megaTypography", "campaign", "cinematicProduct"], gridOptions: ["hoverPanels", "shopTheLook", "stackedShowcase"], footerOptions: ["brandWall", "darkCommerce"], density: "compact", archetype: "streetwear", priceStyle: "saleCallout", cardStyle: "textOverlay", mediaBehavior: "hoverVideo" } },
  { id: "premium-pets", label: "Premium Pets", category: "kids", aliases: ["pet store", "premium pets", "dog accessories", "cat accessories"], mediaQuery: "premium pet accessories dog cat lifestyle", heroTitle: "Everyday essentials for well-loved pets.", heroBody: "Shop pet accessories, care essentials and playful home goods with a friendlier layout that still feels premium.", cta: "Shop pet essentials", navItems: ["Dogs", "Cats", "Walk", "Sleep", "Treats"], collectionTitles: ["Walk essentials", "Sleep & comfort", "Play & treat"], products: [{name:"Cloud Pet Bed",subtitle:"Washable plush bed · medium size",price:"$79",tag:"Best seller"},{name:"Trail Harness",subtitle:"Padded dog harness · secure fit",price:"$34",tag:"Walk"},{name:"Treat Jar",subtitle:"Airtight container · matte finish",price:"$22",tag:"Home"},{name:"Play Rope Set",subtitle:"Durable chew toys · 3-piece set",price:"$18",tag:"Play"}], layoutBias: { navOptions: ["pillNav", "floating", "centered"], heroOptions: ["imageCollage", "splitMedia", "minimalCommerce"], gridOptions: ["cards", "hoverPanels", "bundleGrid"], footerOptions: ["immersiveSignup", "socialFirst"], density: "balanced", archetype: "playful", priceStyle: "pricePill", cardStyle: "softCard", mediaBehavior: "hoverZoom" } },

];

export const NICHE_DIRECTORY = (() => {
  const dedicated = NICHE_PROFILES.map(({ id, label, category, aliases }) => ({ id, label, category, aliases }));
  const dynamic = dynamicCategoryDirectory();
  const seen = new Set(dedicated.map((item) => item.label.toLowerCase()));
  return [...dedicated, ...dynamic.filter((item) => !seen.has(item.label.toLowerCase()))];
})();

function detectNicheProfile(prompt: string) {
  const p = prompt.toLowerCase();
  const tokens = new Set(p.split(/[^a-z0-9]+/).filter(Boolean));
  let best: { profile: NicheProfile; score: number } | null = null;
  for (const profile of NICHE_PROFILES) {
    let score = 0;
    for (const alias of profile.aliases) {
      const normalized = alias.toLowerCase().trim();
      if (!normalized) continue;
      const words = normalized.split(/\s+/).filter(Boolean);
      if (p.includes(normalized)) score += 12 + words.length * 6;
      const wordHits = words.filter((word) => tokens.has(word)).length;
      if (wordHits === words.length && words.length > 0) score += 12;
      else if (wordHits > 0) score += wordHits * 3;
    }
    if (score > 0 && (!best || score > best.score)) best = { profile, score };
  }
  return best?.profile ?? null;
}

const headerValues: HeaderLayout[] = ["minimal", "floating", "centered", "split", "stacked", "searchFirst", "editorial", "utility", "transparent", "megaMenu", "logoRail", "categoryBar", "compactSticky", "promoHeavy", "sideNav", "pillNav", "brandMarquee", "dualRowPromo"];
const heroValues: HeroLayout[] = ["split", "editorial", "centered", "product", "immersive", "statement", "hotspot", "campaign", "beautyEditorial", "showcase", "bento", "splitMedia", "minimalCommerce", "launch", "magazine", "fullBleedEditorial", "dualCampaign", "floatingProducts", "megaTypography", "imageCollage", "collectionHero", "cinematicProduct"];
const gridValues: ProductGridLayout[] = ["classic", "editorial", "compact", "lookbook", "catalog", "mosaic", "deals", "carousel", "editorialRail", "comparison", "cards", "featureSplit", "asymmetric", "stackedCards", "minimalList", "spotlight", "magazineGrid", "shopTheLook", "featuredPlusRail", "horizontalEditorial", "denseRetail", "luxurySparse", "categoryTabs", "bundleGrid", "specGrid", "zigzagEditorial", "hoverPanels", "stackedShowcase", "staggeredGallery", "priceSpotlight", "tickerShowcase", "floatingRail", "editorialDeck"];
const footerValues: FooterLayout[] = ["minimal", "columns", "oversizedBrand", "editorial", "imageSplit", "newsletterHero", "supportHeavy", "socialFirst", "storeLocator", "darkCommerce", "compact", "legalHeavy", "megaGrid", "immersiveSignup", "brandWall"];
const archetypeValues: CommerceArchetype[] = ["editorial", "luxury", "minimal", "streetwear", "sport", "tech-retail", "beauty", "playful", "scandinavian", "campaign", "dark-premium", "magazine", "catalog", "storytelling", "conversion"];
const priceValues: PriceStyle[] = ["minimal", "standard", "sale", "discountBadge", "saveAmount", "percentage", "installment", "subscription", "bundle", "tiered", "techSpec", "luxuryInline", "pricePill", "compareStrong", "saleCallout"];
const cardValues: CardStyle[] = ["borderless", "outlined", "softCard", "imageFirst", "textOverlay", "editorial", "retail", "glass", "flat", "split"];
const mediaValues: MediaBehavior[] = ["static", "hoverZoom", "hoverSwap", "hoverVideo", "autoplayVideo", "parallax", "maskedReveal", "gallery"];

export function analyzePrompt(prompt: string): PromptSignals {
  const p = prompt.toLowerCase();
  return {
    luxury: /(luxury|premium|elevated|exclusive|high-end|designer)/.test(p),
    editorial: /(editorial|lookbook|magazine|storytelling|campaign|fashion film|art direction)/.test(p),
    minimal: /(minimal|clean|simple|scandinavian|quiet|refined)/.test(p),
    bold: /(bold|graphic|maximal|dramatic|statement|vibrant)/.test(p),
    dark: /(dark|noir|black|midnight|moody|night)/.test(p),
    playful: /(playful|cute|colorful|fun|kids|toy|pet)/.test(p),
    technical: /(tech|electronic|device|gadget|smart|gaming|spec|performance|laptop|computer|smartphone|phone)/.test(p),
    organic: /(organic|wellness|natural|sage|eco|clean beauty)/.test(p),
    performance: /(performance|sport|running|training|outdoor|trail|ski|fitness)/.test(p),
    conversion: /(conversion|shop|retail|marketplace|catalog|plp|pricing)/.test(p),
    promo: /(sale|discount|deal|drop|launch|new arrivals|promo)/.test(p),
    warm: /(warm|earth|terracotta|beige|sand|artisan|coffee)/.test(p),
    gallery: /(gallery|grid|masonry|lookbook|visual|collection wall|showcase)/.test(p),
    comparison: /(compare|comparison|spec|features|tiers|plan|pricing table)/.test(p),
    subscription: /(subscription|subscribe|membership|replenish|monthly|club)/.test(p),
    support: /(support|help|faq|shipping|returns|guarantee|trust|service)/.test(p),
    story: /(story|journal|about|founder|heritage|craft|editorial)/.test(p),
    video: /(video|gif|motion|animated|moving|reel|cinematic)/.test(p),
    cinematic: /(cinematic|filmic|movie|dramatic lighting|immersive)/.test(p),
    merchHeavy: /(many products|product heavy|merch-heavy|catalog heavy|dense products|lots of products)/.test(p),
    nicheSpecific: /(cars?|automotive|smartphones?|phones?|seafood|watches?|glasses|eyewear|kitchen appliances|sofas?|beds?|laptops?|computers?|jewelry|pets?|coffee|tea|books?|stationery)/.test(p),
  };
}

export function detectCategoryFromPrompt(prompt: string, current: StoreCategory, creativity: Creativity = "balanced") {
  const p = prompt.toLowerCase();
  const scores = new Map<StoreCategory, number>();
  for (const category of categories) scores.set(category, 0);

  for (const group of SHOPIFY_CATEGORY_GROUPS) {
    let score = scores.get(group.group) ?? 0;
    for (const keyword of group.keywords) {
      const normalized = keyword.toLowerCase();
      if (!normalized || !p.includes(normalized)) continue;
      score += Math.max(1, Math.min(5, normalized.split(/\s+/).length + (normalized.length > 12 ? 1 : 0)));
    }
    scores.set(group.group, score);
  }

  const signals = analyzePrompt(prompt);
  if (signals.technical) scores.set("tech", (scores.get("tech") ?? 0) + 3);
  if (signals.playful) scores.set("kids", (scores.get("kids") ?? 0) + 2);
  if (signals.performance) {
    scores.set("outdoor", (scores.get("outdoor") ?? 0) + 2);
    scores.set("shoes", (scores.get("shoes") ?? 0) + 1);
  }
  if (signals.organic) {
    scores.set("beauty", (scores.get("beauty") ?? 0) + 2);
    scores.set("food", (scores.get("food") ?? 0) + 1);
  }
  if (signals.luxury || signals.editorial) {
    scores.set("fashion", (scores.get("fashion") ?? 0) + 2);
    scores.set("accessories", (scores.get("accessories") ?? 0) + 1);
  }
  if (signals.warm) scores.set("home", (scores.get("home") ?? 0) + 1);

  const ranked = [...scores.entries()].sort((a, b) => b[1] - a[1]);
  if ((ranked[0]?.[1] ?? 0) > 0) return ranked[0][0];
  return creativity === "experimental" ? categories[Math.floor(Math.random() * categories.length)] : current;
}

export function inferLayoutBias(prompt: string, category: StoreCategory, signals = analyzePrompt(prompt)): LayoutBias {
  const p = prompt.toLowerCase();
  const bias: LayoutBias = {};

  if (signals.technical || /marketplace|search/.test(p)) {
    bias.navOptions = ["searchFirst", "utility", "categoryBar", "stacked"];
    bias.footerOptions = ["supportHeavy", "columns", "legalHeavy"];
    bias.density = "compact";
  }
  if (signals.luxury || signals.editorial) {
    bias.navOptions = ["editorial", "centered", "logoRail", "transparent"];
    bias.heroOptions = ["fullBleedEditorial", "magazine", "cinematicProduct", "imageCollage"];
    bias.footerOptions = ["editorial", "oversizedBrand", "imageSplit"];
    bias.rhythm = "editorial";
    bias.cardStyle = signals.dark ? "glass" : "editorial";
    bias.priceStyle = "luxuryInline";
  }
  if (signals.comparison) {
    bias.gridOptions = ["comparison", "specGrid", "featuredPlusRail", "categoryTabs"];
    bias.priceStyle = category === "tech" ? "techSpec" : "tiered";
    bias.footerOptions = ["supportHeavy", "legalHeavy", "columns"];
  }
  if (signals.subscription) {
    bias.heroOptions = ["launch", "showcase", "collectionHero", "minimalCommerce"];
    bias.gridOptions = ["bundleGrid", "featuredPlusRail", "cards"];
    bias.footerOptions = ["newsletterHero", "supportHeavy", "socialFirst"];
    bias.priceStyle = "subscription";
    bias.archetype = "conversion";
  }
  if (signals.gallery) {
    bias.heroOptions = ["imageCollage", "floatingProducts", "splitMedia", "showcase"];
    bias.gridOptions = ["mosaic", "magazineGrid", "editorialRail", "asymmetric"];
  }
  if (signals.promo) {
    bias.heroOptions = ["launch", "megaTypography", "collectionHero", "campaign"];
    bias.footerOptions = ["newsletterHero", "socialFirst", "darkCommerce"];
    bias.density = "compact";
    if (!bias.priceStyle) bias.priceStyle = "percentage";
  }
  if (signals.support) bias.footerOptions = ["supportHeavy", "legalHeavy", "columns"];
  if (signals.story) {
    bias.heroOptions = ["magazine", "editorial", "split", "splitMedia"];
    bias.gridOptions = ["horizontalEditorial", "editorialRail", "featureSplit", "magazineGrid"];
    bias.footerOptions = ["imageSplit", "editorial", "oversizedBrand"];
  }
  if (signals.video) {
    bias.mediaBehavior = signals.technical ? "hoverVideo" : /autoplay|loop|gif/.test(p) ? "autoplayVideo" : "gallery";
    if (!bias.heroOptions) bias.heroOptions = ["cinematicProduct", "immersive", "showcase"];
  }
  if (signals.minimal && !bias.cardStyle) bias.cardStyle = "borderless";
  if (signals.bold && !bias.cardStyle) bias.cardStyle = signals.dark ? "textOverlay" : "softCard";
  if (signals.playful) {
    bias.navOptions = ["floating", "centered", "stacked", "split"];
    bias.footerOptions = ["socialFirst", "newsletterHero", "columns"];
  }
  if (category === "food" && signals.warm) bias.heroOptions = ["bento", "split", "showcase", "centered"];
  if (category === "outdoor" && signals.performance) bias.heroOptions = ["immersive", "campaign", "hotspot", "cinematicProduct"];
  if (category === "home" && signals.minimal) bias.gridOptions = ["minimalList", "magazineGrid", "cards", "featureSplit"];

  if (/(anime streetwear|anime fashion|graphic streetwear)/.test(p)) {
    bias.archetype = "streetwear";
    bias.navOptions = ["transparent", "sideNav", "compactSticky"];
    bias.heroOptions = ["megaTypography", "campaign", "cinematicProduct"];
    bias.gridOptions = ["shopTheLook", "magazineGrid", "asymmetric"];
    bias.footerOptions = ["darkCommerce", "oversizedBrand"];
    bias.cardStyle = "textOverlay";
    bias.priceStyle = "percentage";
    bias.mediaBehavior = "gallery";
  }
  if (/(smart ring|wearable ring|fitness ring)/.test(p)) {
    bias.archetype = "minimal";
    bias.navOptions = ["centered", "minimal", "compactSticky"];
    bias.heroOptions = ["product", "floatingProducts", "minimalCommerce"];
    bias.gridOptions = ["spotlight", "comparison", "featuredPlusRail"];
    bias.footerOptions = ["compact", "supportHeavy"];
    bias.priceStyle = "installment";
    bias.cardStyle = "borderless";
  }
  if (/(sim racing|racing rig|racing wheel)/.test(p)) {
    bias.archetype = "dark-premium";
    bias.navOptions = ["sideNav", "searchFirst", "utility"];
    bias.heroOptions = ["immersive", "cinematicProduct", "launch"];
    bias.gridOptions = ["specGrid", "comparison", "denseRetail"];
    bias.footerOptions = ["darkCommerce", "supportHeavy"];
    bias.priceStyle = "techSpec";
    bias.cardStyle = "glass";
    bias.mediaBehavior = "hoverVideo";
  }
  if (/(matcha|tea ritual|tea shop)/.test(p)) {
    bias.archetype = "editorial";
    bias.navOptions = ["centered", "editorial", "logoRail"];
    bias.heroOptions = ["magazine", "splitMedia", "centered"];
    bias.gridOptions = ["featuredPlusRail", "horizontalEditorial", "cards"];
    bias.footerOptions = ["newsletterHero", "imageSplit"];
    bias.cardStyle = "imageFirst";
  }
  if (/(montessori|learning toys|educational toys)/.test(p)) {
    bias.archetype = "storytelling";
    bias.navOptions = ["centered", "floating", "stacked"];
    bias.heroOptions = ["imageCollage", "splitMedia", "minimalCommerce"];
    bias.gridOptions = ["featureSplit", "cards", "bundleGrid"];
    bias.footerOptions = ["newsletterHero", "supportHeavy"];
    bias.cardStyle = "softCard";
  }
  if (/(hot sauce|chili sauce|spicy sauce)/.test(p)) {
    bias.archetype = "campaign";
    bias.navOptions = ["promoHeavy", "transparent", "floating"];
    bias.heroOptions = ["megaTypography", "campaign", "showcase"];
    bias.gridOptions = ["spotlight", "deals", "bundleGrid"];
    bias.footerOptions = ["darkCommerce", "socialFirst"];
    bias.priceStyle = "percentage";
    bias.cardStyle = "textOverlay";
  }
  if (/(scalp care|clinical hair|hair treatment)/.test(p)) {
    bias.archetype = "minimal";
    bias.navOptions = ["utility", "centered", "minimal"];
    bias.heroOptions = ["showcase", "minimalCommerce", "splitMedia"];
    bias.gridOptions = ["featuredPlusRail", "comparison", "cards"];
    bias.footerOptions = ["supportHeavy", "legalHeavy"];
    bias.cardStyle = "outlined";
  }
  if (/(overlanding|overland gear|expedition vehicle)/.test(p)) {
    bias.archetype = "storytelling";
    bias.navOptions = ["sideNav", "utility", "transparent"];
    bias.heroOptions = ["immersive", "cinematicProduct", "campaign"];
    bias.gridOptions = ["featureSplit", "specGrid", "horizontalEditorial"];
    bias.footerOptions = ["supportHeavy", "imageSplit"];
    bias.mediaBehavior = "hoverVideo";
  }
  if (/(moving text|ticker|marquee|scrolling text|animated text)/.test(p)) {
    bias.navOptions = ["brandMarquee", "dualRowPromo", "promoHeavy"];
    bias.gridOptions = ["tickerShowcase", "editorialDeck", "floatingRail"];
    bias.footerOptions = ["brandWall", "immersiveSignup", "megaGrid"];
    if (!bias.mediaBehavior) bias.mediaBehavior = "gallery";
  }
  if (/(moving image|animated image|image motion|floating image|hover image)/.test(p)) {
    bias.gridOptions = ["hoverPanels", "zigzagEditorial", "stackedShowcase", "staggeredGallery", "floatingRail"];
    bias.heroOptions = ["floatingProducts", "splitMedia", "showcase"];
    bias.mediaBehavior = /video|loop/.test(p) ? "autoplayVideo" : "gallery";
  }
  if (signals.cinematic) {
    bias.heroOptions = ["cinematicProduct", "immersive", "fullBleedEditorial", "campaign"];
    if (!bias.mediaBehavior) bias.mediaBehavior = "hoverVideo";
  }
  if (signals.merchHeavy) {
    bias.gridOptions = ["denseRetail", "categoryTabs", "comparison", "featuredPlusRail"];
    bias.density = "compact";
  }
  if (signals.nicheSpecific && !bias.mediaBehavior) {
    bias.mediaBehavior = "gallery";
  }
  if (/(sofa|couch|bed|mattress|furniture)/.test(p)) {
    bias.heroOptions = ["splitMedia", "fullBleedEditorial", "imageCollage"];
    bias.gridOptions = ["magazineGrid", "featureSplit", "luxurySparse"];
  }
  if (/(laptop|computer|pc|notebook)/.test(p)) {
    bias.heroOptions = ["product", "launch", "cinematicProduct"];
    bias.gridOptions = ["specGrid", "comparison", "denseRetail"];
    bias.priceStyle = "techSpec";
  }
  if (/(jewelry|jewellery|ring|necklace|bracelet|earrings)/.test(p)) {
    bias.heroOptions = ["fullBleedEditorial", "magazine", "cinematicProduct"];
    bias.gridOptions = ["luxurySparse", "spotlight", "editorialRail"];
    bias.priceStyle = "luxuryInline";
  }
  if (/(pet|pets|dog|cat)/.test(p)) {
    bias.heroOptions = ["imageCollage", "showcase", "splitMedia"];
    bias.gridOptions = ["cards", "hoverPanels", "bundleGrid"];
  }
  if (/(pill nav|pill header|rounded navigation)/.test(p)) {
    bias.navOptions = ["pillNav", "floating", "compactSticky"];
  }
  if (/(strong pricing|price callout|bigger price|pricing emphasis)/.test(p)) {
    bias.priceStyle = /sale|discount/.test(p) ? "saleCallout" : "compareStrong";
  }

  return bias;
}

function plannerIntent(signals: PromptSignals, category: StoreCategory) {
  if (signals.subscription) return "membership commerce";
  if (signals.comparison || signals.technical) return category === "tech" ? "technical product discovery" : "comparison-led retail";
  if (signals.luxury && signals.editorial) return "luxury editorial storytelling";
  if (signals.promo) return "campaign-led conversion";
  if (signals.playful) return "playful discovery";
  if (signals.performance) return "performance commerce";
  if (signals.minimal) return "minimal product-first retail";
  return "balanced modern commerce";
}

function localContent(prompt: string, category: StoreCategory, signals: PromptSignals): PlannerContent {
  const p = prompt.toLowerCase();
  const tone = signals.luxury ? "Refined and selective" : signals.playful ? "Friendly and energetic" : signals.technical ? "Precise and confident" : signals.organic ? "Calm and grounded" : "Clear and modern";
  const kicker = signals.promo ? "JUST LANDED" : signals.editorial ? "THE NEW EDIT" : signals.performance ? "BUILT TO MOVE" : signals.technical ? "SMARTER BY DESIGN" : "NEW COLLECTION";
  const titleByCategory: Record<StoreCategory, string> = {
    fashion: signals.luxury ? "A sharper point of view on everyday dressing." : "New silhouettes for the way you actually move.",
    shoes: "Find the pair that earns its place in rotation.",
    accessories: "The finishing pieces that make the look feel considered.",
    home: "Objects and textures that make a room feel intentional.",
    beauty: "A simpler ritual, built around products worth repeating.",
    food: "Small-batch favorites made for the next craving.",
    outdoor: "Gear that works harder when the route gets interesting.",
    kids: "Play-ready essentials made for real everyday movement.",
    tech: "Better tools for faster, cleaner, more capable setups.",
  };
  const body = signals.story
    ? "Discover the materials, details and product decisions behind the collection, then shop the pieces that fit your routine."
    : signals.conversion || signals.promo
      ? "Shop standout products, compare the details that matter, and move from discovery to checkout without unnecessary friction."
      : "Explore a focused selection with clearer product stories, useful details and a more confident path to purchase.";
  return {
    brandVoice: tone,
    heroKicker: kicker,
    heroTitle: titleByCategory[category],
    heroBody: body,
    cta: signals.subscription ? "Join the club" : signals.comparison ? "Compare products" : signals.promo ? "Shop the drop" : "Shop the collection",
    announcement: /free shipping|free delivery/.test(p) ? "Free shipping on qualifying orders" : signals.promo ? "New release now live — limited quantities available" : "Complimentary delivery on qualifying orders",
  };
}

export function buildLocalDesignPlan(prompt: string, currentCategory: StoreCategory, creativity: Creativity = "balanced"): DesignPlan {
  const niche = detectNicheProfile(prompt);
  const dynamicProfile = buildDynamicCategoryProfile(prompt, niche?.category ?? currentCategory);
  const category = niche?.category ?? dynamicProfile?.category ?? detectCategoryFromPrompt(prompt, currentCategory, creativity);
  const signals = analyzePrompt(prompt);
  const inferredBias = inferLayoutBias(prompt, category, signals);
  const profileBias = niche?.layoutBias ?? dynamicProfile?.layoutBias;
  const layoutBias: LayoutBias = profileBias ? { ...inferredBias, ...profileBias } : inferredBias;
  const intent = plannerIntent(signals, category);
  const signalCount = Object.values(signals).filter(Boolean).length;
  const hasProfile = Boolean(niche || dynamicProfile);
  const confidence = Math.min(99, 62 + signalCount * 4 + (prompt.trim().split(/\s+/).length > 7 ? 6 : 0) + (hasProfile ? 9 : 0) + (signals.nicheSpecific ? 6 : 0));
  const descriptors = [signals.luxury ? "luxury" : null, signals.editorial ? "editorial" : null, signals.minimal ? "minimal" : null, signals.technical ? "technical" : null, signals.performance ? "performance" : null, signals.playful ? "playful" : null].filter(Boolean);
  const baseContent = localContent(prompt, category, signals);
  const content: PlannerContent = niche ? {
    ...baseContent,
    heroKicker: signals.promo ? "JUST LANDED" : niche.label.toUpperCase().slice(0, 38),
    heroTitle: niche.heroTitle,
    heroBody: niche.heroBody,
    cta: niche.cta,
    navItems: niche.navItems,
    mediaQuery: niche.mediaQuery,
    collectionTitles: niche.collectionTitles,
    products: niche.products.map((product, index) => ({ ...product, specs: dynamicProfile?.content.products?.[index]?.specs })),
    filters: dynamicProfile?.filters,
  } : dynamicProfile ? { ...baseContent, ...dynamicProfile.content } : baseContent;
  const profileLabel = niche?.label ?? dynamicProfile?.label;
  return {
    source: "local",
    category,
    confidence,
    intent,
    niche: profileLabel,
    summary: profileLabel
      ? `${descriptors.length ? descriptors.join(", ") + " " : ""}${profileLabel} storefront focused on ${intent}`
      : `${descriptors.length ? descriptors.join(", ") : "modern"} ${category} direction focused on ${intent}`,
    signals,
    layoutBias,
    content,
  };
}

function firstAllowed<T extends string>(value: unknown, allowed: readonly T[]): T | undefined {
  return typeof value === "string" && allowed.includes(value as T) ? value as T : undefined;
}

function allowedList<T extends string>(value: unknown, allowed: readonly T[]): T[] | undefined {
  if (!Array.isArray(value)) return undefined;
  const list = value.filter((item): item is T => typeof item === "string" && allowed.includes(item as T)).slice(0, 6);
  return list.length ? list : undefined;
}

export function mergeExternalDesignPlan(raw: unknown, fallback: DesignPlan): DesignPlan {
  if (!raw || typeof raw !== "object") return fallback;
  const obj = raw as Record<string, unknown>;
  const layout = obj.layout && typeof obj.layout === "object" ? obj.layout as Record<string, unknown> : {};
  const content = obj.content && typeof obj.content === "object" ? obj.content as Record<string, unknown> : {};
  const category = firstAllowed(obj.category, categories) ?? fallback.category;
  const externalBias: LayoutBias = {
    navOptions: allowedList(layout.navOptions ?? layout.nav, headerValues),
    heroOptions: allowedList(layout.heroOptions ?? layout.hero, heroValues),
    gridOptions: allowedList(layout.gridOptions ?? layout.productGrid, gridValues),
    footerOptions: allowedList(layout.footerOptions ?? layout.footer, footerValues),
    density: firstAllowed(layout.density, ["compact", "balanced", "airy"] as const),
    rhythm: firstAllowed(layout.rhythm, ["tight", "balanced", "editorial"] as const),
    archetype: firstAllowed(layout.archetype, archetypeValues),
    priceStyle: firstAllowed(layout.priceStyle, priceValues),
    cardStyle: firstAllowed(layout.cardStyle, cardValues),
    mediaBehavior: firstAllowed(layout.mediaBehavior, mediaValues),
  };
  const confidence = typeof obj.confidence === "number" ? Math.max(0, Math.min(100, Math.round(obj.confidence))) : Math.max(fallback.confidence, 82);
  const navItems = Array.isArray(content.navItems) ? content.navItems.filter((item): item is string => typeof item === "string" && item.trim().length > 0).slice(0, 8) : undefined;
  return {
    ...fallback,
    source: "openai",
    category,
    confidence,
    intent: typeof obj.intent === "string" && obj.intent.trim() ? obj.intent.slice(0, 120) : fallback.intent,
    summary: typeof obj.summary === "string" && obj.summary.trim() ? obj.summary.slice(0, 220) : fallback.summary,
    layoutBias: { ...fallback.layoutBias, ...Object.fromEntries(Object.entries(externalBias).filter(([, value]) => value !== undefined)) },
    content: {
      ...fallback.content,
      brandVoice: typeof content.brandVoice === "string" ? content.brandVoice.slice(0, 120) : fallback.content.brandVoice,
      heroKicker: typeof content.heroKicker === "string" ? content.heroKicker.slice(0, 48) : fallback.content.heroKicker,
      heroTitle: typeof content.heroTitle === "string" ? content.heroTitle.slice(0, 120) : fallback.content.heroTitle,
      heroBody: typeof content.heroBody === "string" ? content.heroBody.slice(0, 240) : fallback.content.heroBody,
      cta: typeof content.cta === "string" ? content.cta.slice(0, 40) : fallback.content.cta,
      announcement: typeof content.announcement === "string" ? content.announcement.slice(0, 120) : fallback.content.announcement,
      navItems: navItems ?? fallback.content.navItems,
      mediaQuery: typeof content.mediaQuery === "string" ? content.mediaQuery.slice(0, 100) : fallback.content.mediaQuery,
      collectionTitles: Array.isArray(content.collectionTitles) ? content.collectionTitles.filter((item): item is string => typeof item === "string" && item.trim().length > 0).slice(0, 6) : fallback.content.collectionTitles,
      filters: Array.isArray(content.filters) ? content.filters.filter((item): item is { label: string; options: string[] } => Boolean(item && typeof item === "object" && typeof (item as Record<string, unknown>).label === "string" && Array.isArray((item as Record<string, unknown>).options))).slice(0, 5).map((item) => ({ label: item.label.slice(0, 30), options: item.options.filter((x): x is string => typeof x === "string").slice(0, 8) })) : fallback.content.filters,
      products: Array.isArray(content.products) ? content.products.filter((item): item is { name: string; subtitle: string; price?: string; tag?: string; specs?: Record<string, string> } => Boolean(item && typeof item === "object" && typeof (item as Record<string, unknown>).name === "string" && typeof (item as Record<string, unknown>).subtitle === "string")).slice(0, 8).map((item) => ({ name: item.name.slice(0, 60), subtitle: item.subtitle.slice(0, 100), price: typeof item.price === "string" ? item.price.slice(0, 20) : undefined, tag: typeof item.tag === "string" ? item.tag.slice(0, 30) : undefined, specs: item.specs && typeof item.specs === "object" ? Object.fromEntries(Object.entries(item.specs).slice(0, 6).map(([key, value]) => [key.slice(0, 30), String(value).slice(0, 60)])) : undefined })) : fallback.content.products,
    },
  };
}

export async function requestDesignPlan(input: { prompt: string; currentCategory: StoreCategory; creativity: Creativity; shopTitle?: string }): Promise<DesignPlan> {
  const fallback = buildLocalDesignPlan(input.prompt, input.currentCategory, input.creativity);
  try {
    const response = await fetch("/api/design-plan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
    if (!response.ok) return fallback;
    const data = await response.json();
    return mergeExternalDesignPlan(data, fallback);
  } catch {
    return fallback;
  }
}
