import type { StoreCategory, StoreContent } from "@/types/design";

/**
 * Shopify UI Generator media library.
 *
 * Important: UI components receive SAME-ORIGIN URLs (/api/media/image). The API route
 * fetches the remote source server-side, so browser hot-link blocking, CORS policies,
 * privacy extensions and provider redirect behavior do not leave broken <img> tags.
 */
export const IMAGE_CANDIDATES_PER_CATEGORY = 900;
export const TOTAL_IMAGE_CANDIDATES = IMAGE_CANDIDATES_PER_CATEGORY * 9;
export const TOTAL_VIDEO_CANDIDATES = 72;

export type ImageRole = "hero" | "story" | "collection" | "product" | "detail" | "lifestyle" | "social";
export type MediaConfidence = "highConfidence" | "mediumConfidence" | "fallback";

export const STORE_CATEGORIES: StoreCategory[] = [
  "fashion",
  "shoes",
  "accessories",
  "home",
  "beauty",
  "food",
  "outdoor",
  "kids",
  "tech",
];

const queries: Record<StoreCategory, readonly string[]> = {
  fashion: [
    "fashion editorial model", "streetwear fashion campaign", "minimal fashion portrait",
    "clothing editorial studio", "luxury fashion model", "modern apparel campaign",
    "fashion lookbook", "designer clothing portrait", "urban fashion model",
    "fashion studio photography", "wardrobe editorial", "contemporary fashion",
    "luxury basics editorial",
    "contemporary tailoring lookbook",
    "capsule wardrobe product photography",
    "designer dress campaign"
  ],
  shoes: [
    "sneakers editorial", "running shoes product", "footwear fashion", "sneaker campaign",
    "sports shoes lifestyle", "minimal shoe product", "trail shoes outdoor",
    "streetwear sneakers", "shoe studio photography", "performance footwear",
    "sneakers fashion model", "luxury footwear",
  ],
  accessories: [
    "luxury accessories fashion", "handbag editorial", "jewelry product photography",
    "watch fashion editorial", "leather goods product", "travel accessories",
    "minimal handbag studio", "fashion accessories model", "jewelry editorial portrait",
    "wallet leather product", "designer bag campaign", "accessories still life",
    "luxury jewelry campaign",
    "eyewear boutique product",
    "car accessories premium",
    "travel luggage editorial"
  ],
  home: [
    "modern desk setup", "minimal workspace", "home decor editorial", "office accessories product",
    "interior design objects", "modern lamp desk", "organized workspace", "designer home objects",
    "minimal home office", "decor still life", "wood desk accessories", "contemporary interior detail", "designer sofa interior", "bedroom furniture luxury", "kitchen appliance lifestyle", "minimal dining space", "premium furniture showroom",
    "premium bed mattress bedroom",
    "sofa living room editorial",
    "kitchen appliance showroom",
    "designer lamp interior"
  ],
  beauty: [
    "skincare editorial", "beauty product studio", "cosmetics campaign", "skincare model portrait",
    "serum product photography", "beauty flatlay", "luxury skincare", "cosmetic bottle studio",
    "clean beauty editorial", "skin care routine", "beauty campaign portrait", "wellness cosmetics",
  ],
  food: [
    "gourmet sauce product", "food brand photography", "pantry product editorial", "spicy sauce bottle",
    "modern food packaging", "condiment product studio", "restaurant food editorial", "gourmet ingredients",
    "food gift set", "artisan pantry", "colorful food campaign", "kitchen product photography", "premium seafood display", "fresh produce market", "gourmet kitchen scene",
    "specialty coffee beans editorial",
    "artisan bakery product",
    "fresh seafood counter",
    "organic grocery market"
  ],
  outdoor: [
    "technical outdoor fashion", "ski fashion campaign", "winter puffer editorial", "mountain outerwear model",
    "snow fashion portrait", "outdoor techwear", "alpine clothing campaign", "ski goggles fashion",
    "technical jacket editorial", "winter streetwear", "mountain fashion model", "performance outerwear",
  ],
  kids: [
    "kids fashion editorial", "children clothing campaign", "kids backpack product", "playful childrens wear",
    "kids apparel studio", "colorful toddler fashion", "kids clothing flatlay",
    "childrens accessories product", "family lifestyle apparel", "kids outfit catalog",
    "school essentials product", "playwear campaign",
  ],
  tech: [
    "modern laptop product", "smartphone launch campaign", "electronics product render", "gaming monitor product",
    "premium gadget photography", "computer accessories product", "technology showcase display",
    "consumer electronics studio", "smart device editorial", "rgb gaming setup", "tech retail campaign",
    "phone product closeup", "android smartphone lifestyle", "ios smartphone premium render", "smartphone camera module detail", "fold phone product launch", "phone retail display premium",
    "laptop computer product launch",
    "tablet product closeup",
    "camera gear product studio",
    "headphones premium lifestyle"
  ],
};

type NicheMediaProfile = {
  id: string;
  match: RegExp;
  keywords?: readonly string[];
  queries: readonly string[];
  fallbacks?: readonly string[];
};

/**
 * High-signal media routing for the categories people most often search directly.
 * These profiles are evaluated from the semantic topic passed by the planner. This
 * prevents a niche like "Cars & Automotive" (which uses the broad accessories render
 * family) from accidentally receiving handbag/jewelry photography.
 */
const nicheMediaProfiles: readonly NicheMediaProfile[] = [

  {
    id: "laptops",
    keywords: ["laptop", "laptops", "notebook", "notebooks", "computer", "computers", "pc", "macbook", "ultrabook"],
    match: /\b(laptop|laptops|notebook|notebooks|computer|computers|pc|macbook|ultrabook)\b/i,
    queries: [
      "premium laptop product photography", "modern notebook computer desk setup", "ultrabook product launch", "laptop keyboard closeup",
      "creator laptop studio photography", "business laptop lifestyle", "laptop lineup premium", "portable computer product shot"
    ],
    fallbacks: [
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=2000&q=88",
      "https://images.unsplash.com/photo-1517336714739-489689fd1ca8?auto=format&fit=crop&w=2000&q=88",
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=2000&q=88",
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=2000&q=88",
      "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=2000&q=88",
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=2000&q=88"
    ],
  },
  {
    id: "jewelry",
    match: /\b(jewelry|jewellery|ring|rings|necklace|bracelet|earrings|pearl|gold jewelry)\b/i,
    queries: [
      "luxury jewelry product photography", "gold ring editorial", "diamond necklace studio", "bracelet macro detail",
      "earrings product campaign", "fine jewelry flatlay", "pearl jewelry premium", "jewelry boutique editorial"
    ],
    fallbacks: [
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=2000&q=88",
      "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=2000&q=88",
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=2000&q=88",
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=2000&q=88",
      "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=2000&q=88"
    ],
  },
  {
    id: "pets",
    match: /\b(pet|pets|dog|dogs|cat|cats|pet supplies|pet accessories)\b/i,
    queries: [
      "premium pet accessories lifestyle", "dog harness product photography", "cat accessories product", "pet bed interior",
      "dog lifestyle brand campaign", "cat toy product studio", "pet feeding accessories", "modern pet store"
    ],
    fallbacks: [
      "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=2000&q=88",
      "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=2000&q=88",
      "https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=2000&q=88",
      "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=2000&q=88",
      "https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?auto=format&fit=crop&w=2000&q=88"
    ],
  },
  {
    id: "coffee-tea",
    match: /\b(coffee|espresso|latte|tea|matcha|beans|brewing|cafe gear)\b/i,
    queries: [
      "specialty coffee product photography", "espresso machine lifestyle", "coffee beans packaging editorial", "matcha tea product",
      "pour over brewing setup", "cafe accessories premium", "latte lifestyle product", "tea ritual campaign"
    ],
    fallbacks: [
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=2000&q=88",
      "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=2000&q=88",
      "https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=2000&q=88",
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=2000&q=88",
      "https://images.unsplash.com/photo-1494314671902-399b18174975?auto=format&fit=crop&w=2000&q=88"
    ],
  },
  {
    id: "books-stationery",
    match: /\b(book|books|stationery|notebook|journals|planner|pens|desk supplies)\b/i,
    queries: [
      "bookstore editorial", "stationery product photography", "journal notebook flatlay", "premium pen desk setup",
      "reading lifestyle books", "planner stationery brand", "desk accessories paper goods", "book cover product"
    ],
    fallbacks: [
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=2000&q=88",
      "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=2000&q=88",
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=2000&q=88",
      "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=2000&q=88",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=2000&q=88"
    ],
  },
  {
    id: "cars",
    keywords: ["car", "cars", "automotive", "vehicle", "vehicles", "dealership", "coupe", "sedan", "suv", "supercar", "sports car", "electric vehicle", "ev"],
    match: /\b(car|cars|automotive|vehicle|vehicles|dealership|coupe|sedan|suv|supercar|sports car|electric vehicle|ev)\b/i,
    queries: [
      "premium sports car automotive photography", "luxury car dealership showroom", "modern electric car exterior",
      "performance coupe road photography", "premium SUV automotive campaign", "sports sedan studio photography",
      "supercar front three quarter view", "luxury vehicle interior dashboard", "electric vehicle charging lifestyle",
      "modern car side profile", "automotive showroom premium cars", "car detail wheel headlight photography",
      "black sports car cinematic", "white luxury sedan studio", "performance car mountain road", "modern SUV city lifestyle",
    ],
    fallbacks: [
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=2000&q=88",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=2000&q=88",
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=2000&q=88",
      "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=2000&q=88",
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=2000&q=88",
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=2000&q=88",
      "https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=2000&q=88",
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=2000&q=88",
      "https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?auto=format&fit=crop&w=2000&q=88",
      "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=2000&q=88",
      "https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=2000&q=88",
      "https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&w=2000&q=88",
    ],
  },
  {
    id: "phones",
    keywords: ["phone", "phones", "smartphone", "smartphones", "iphone", "iphones", "ios", "android", "samsung", "galaxy phone", "pixel phone", "mobile phone", "cell phone", "cellphone", "foldable phone", "flip phone"],
    match: /\b(phone|phones|smartphone|smartphones|iphone|iphones|ios|android|samsung|galaxy phone|pixel phone|mobile phone|cell phone|cellphone|foldable phone|flip phone)\b/i,
    queries: [
      "premium smartphone product photography",
      "smartphone launch campaign",
      "mobile phone studio product",
      "phone camera closeup",
      "smartphone lifestyle hand",
      "flagship phone display",
      "foldable smartphone product",
      "mobile phone colors lineup",
      "ios and android smartphone lineup",
      "android phone product photography",
      "iphone style smartphone closeup",
      "smartphone back and front product shot",
    ],
    fallbacks: [
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=2000&q=88",
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=2000&q=88",
      "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=2000&q=88",
      "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=2000&q=88",
      "https://images.unsplash.com/photo-1605236453806-6ff36851218e?auto=format&fit=crop&w=2000&q=88",
      "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=2000&q=88",
      "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?auto=format&fit=crop&w=2000&q=88",
      "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&w=2000&q=88",
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=2000&q=88",
      "https://images.unsplash.com/photo-1603314585442-ee3b3c16fbcf?auto=format&fit=crop&w=2000&q=88",
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=2000&q=88",
      "https://images.unsplash.com/photo-1585060544812-6b45742d762f?auto=format&fit=crop&w=2000&q=88",
    ],
  },
  {
    id: "seafood",
    keywords: ["seafood", "fresh fish", "fish market", "salmon", "shrimp", "prawn", "prawns", "shellfish", "lobster", "crab", "oyster", "oysters"],
    match: /\b(seafood|fresh fish|fish market|salmon|shrimp|prawn|prawns|shellfish|lobster|crab|oyster|oysters)\b/i,
    queries: [
      "fresh seafood market photography", "premium salmon fillet", "fresh prawns seafood", "whole sea bass market",
      "shellfish platter premium", "fresh lobster seafood", "oysters on ice restaurant", "seafood fish counter",
      "premium seafood restaurant plate", "fresh fish display on ice", "chef prepared seafood platter", "salmon sushi grade product photography"
    ],
    fallbacks: [
      "https://images.unsplash.com/photo-1510130387422-82bed34b37e9?auto=format&fit=crop&w=2000&q=88",
      "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=2000&q=88",
      "https://images.unsplash.com/photo-1544943910-4c1dc44aab44?auto=format&fit=crop&w=2000&q=88",
      "https://images.unsplash.com/photo-1559737558-2f5a35f4523b?auto=format&fit=crop&w=2000&q=88",
      "https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?auto=format&fit=crop&w=2000&q=88",
      "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=2000&q=88",
      "https://images.unsplash.com/photo-1580476262798-bddd9f4b7369?auto=format&fit=crop&w=2000&q=88",
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=2000&q=88",
      "https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?auto=format&fit=crop&w=2000&q=88",
      "https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=2000&q=88"
    ],
  },
  {
    id: "watches",
    keywords: ["watch", "watches", "timepiece", "timepieces", "chronograph", "automatic watch", "smart watch", "smartwatch"],
    match: /\b(watch|watches|timepiece|timepieces|chronograph|automatic watch|smart watch|smartwatch)\b/i,
    queries: [
      "luxury watch product photography", "automatic watch macro", "premium timepiece editorial", "chronograph studio photography",
      "watch wrist lifestyle", "steel watch closeup", "dress watch leather strap", "sports watch product",
      "minimal watch flatlay", "watch face macro detail", "luxury timepiece campaign", "premium wristwatch studio black background"
    ],
    fallbacks: [
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=2000&q=88",
      "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?auto=format&fit=crop&w=2000&q=88",
      "https://images.unsplash.com/photo-1434056886845-dac89ffe9b56?auto=format&fit=crop&w=2000&q=88",
      "https://images.unsplash.com/photo-1612817159949-195b6eb9e31a?auto=format&fit=crop&w=2000&q=88",
      "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&w=2000&q=88",
      "https://images.unsplash.com/photo-1508057198894-247b23fe5ade?auto=format&fit=crop&w=2000&q=88",
      "https://images.unsplash.com/photo-1623998021450-85c5d5e0a6b8?auto=format&fit=crop&w=2000&q=88",
      "https://images.unsplash.com/photo-1526045612212-70caf35c14df?auto=format&fit=crop&w=2000&q=88"
    ],
  },
  {
    id: "eyewear",
    keywords: ["glasses", "eyeglasses", "eyewear", "sunglasses", "optical frames", "reading glasses", "frames"],
    match: /\b(glasses|eyeglasses|eyewear|sunglasses|optical frames|reading glasses|frames)\b/i,
    queries: [
      "designer eyeglasses product", "sunglasses fashion editorial", "optical frames studio", "eyewear closeup",
      "acetate glasses product", "metal eyeglasses portrait", "premium eyewear flatlay", "sunglasses lifestyle",
      "premium glasses product photography", "optical eyewear boutique", "fashion sunglasses closeup", "eyeglass frames editorial product"
    ],
    fallbacks: [
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=2000&q=88",
      "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=2000&q=88",
      "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=2000&q=88",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=2000&q=88",
      "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=2000&q=88",
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=2000&q=88",
      "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?auto=format&fit=crop&w=2000&q=88",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=2000&q=88"
    ],
  },
  {
    id: "kitchen-appliances",
    keywords: ["kitchen appliance", "kitchen appliances", "air fryer", "microwave", "coffee machine", "coffee maker", "blender", "rice cooker", "refrigerator", "fridge", "oven", "toaster", "stand mixer"],
    match: /\b(kitchen appliance|kitchen appliances|air fryer|microwave|coffee machine|coffee maker|blender|rice cooker|refrigerator|fridge|oven|toaster|stand mixer)\b/i,
    queries: [
      "modern kitchen appliances interior", "premium air fryer product", "coffee machine kitchen counter", "modern refrigerator kitchen",
      "built in oven interior", "premium blender product", "rice cooker product photography", "small kitchen appliances lineup",
      "premium toaster appliance kitchen", "stand mixer product photography", "espresso machine countertop", "modern appliance showroom"
    ],
    fallbacks: [
      "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=2000&q=88",
      "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?auto=format&fit=crop&w=2000&q=88",
      "https://images.unsplash.com/photo-1517705008128-361805f42e86?auto=format&fit=crop&w=2000&q=88",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=2000&q=88",
      "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=2000&q=88",
      "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?auto=format&fit=crop&w=2000&q=88",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=2000&q=88",
      "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=2000&q=88"
    ],
  },
  {
    id: "sofas",
    keywords: ["sofa", "sofas", "couch", "couches", "sectional", "loveseat", "living room furniture"],
    match: /\b(sofa|sofas|couch|couches|sectional|loveseat|living room furniture)\b/i,
    queries: [
      "modern sofa living room", "designer sectional sofa interior", "minimal couch product", "luxury sofa editorial interior",
      "modular sofa living room", "cream sofa modern apartment", "fabric couch closeup", "contemporary lounge furniture",
      "minimal living room sofa wide shot", "curved sofa designer interior", "neutral sofa product photography", "premium sectional styled apartment"
    ],
    fallbacks: [
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=2000&q=88",
      "https://images.unsplash.com/photo-1484101403633-562f891dc89a?auto=format&fit=crop&w=2000&q=88",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=2000&q=88",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=2000&q=88",
      "https://images.unsplash.com/photo-1501045661006-fcebe0257c3f?auto=format&fit=crop&w=2000&q=88",
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=2000&q=88",
      "https://images.unsplash.com/photo-1549187774-b4e9b0445b41?auto=format&fit=crop&w=2000&q=88",
      "https://images.unsplash.com/photo-1519947486511-46149fa0a254?auto=format&fit=crop&w=2000&q=88"
    ],
  },
  {
    id: "beds",
    keywords: ["bed", "beds", "mattress", "mattresses", "bed frame", "bedroom furniture", "bedding"],
    match: /\b(bed|beds|mattress|mattresses|bed frame|bedroom furniture|bedding)\b/i,
    queries: [
      "modern bed bedroom interior", "premium mattress bedroom", "minimal bed frame interior", "luxury bedroom bed",
      "upholstered bed frame", "modern bedding editorial", "calm bedroom furniture", "hotel style bed interior",
      "bedroom set premium design", "cozy bedding lifestyle interior", "minimal mattress product room", "designer bedroom suite"
    ],
    fallbacks: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=2000&q=88",
      "https://images.unsplash.com/photo-1505693534744-5e5f4f1c5605?auto=format&fit=crop&w=2000&q=88",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=2000&q=88",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=2200&q=88",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1800&q=88",
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=2000&q=88",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=2400&q=88",
      "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=2000&q=88"
    ],
  },
];

function normalizeTopic(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, " ").replace(/\s+/g, " ").trim();
}

function nicheMediaProfile(topic?: string) {
  if (!topic?.trim()) return null;
  const normalized = normalizeTopic(topic);
  return nicheMediaProfiles.find((profile) => profile.match.test(topic) || profile.keywords?.some((keyword) => normalized.includes(keyword))) ?? null;
}

const roleSize: Record<ImageRole, readonly [number, number]> = {
  hero: [2560, 1600],
  story: [2000, 1400],
  collection: [1400, 1600],
  product: [1400, 1700],
  detail: [1600, 1600],
  lifestyle: [1900, 1400],
  social: [1200, 1500],
};

/**
 * Stable direct-photo fallbacks. These are intentionally a small curated pool because
 * they are only used if the larger dynamic source fails. The dynamic source still gives
 * us the 3,240 deterministic broad-category candidates, plus niche-aware semantic routing.
 */
const stableFallbacks: Record<StoreCategory, readonly string[]> = {
  fashion: [
    "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1800&q=85",
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1800&q=85",
    "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1800&q=85",
    "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=1800&q=85",
    "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1800&q=85",
    "https://images.unsplash.com/photo-1495385794356-15371f348c31?auto=format&fit=crop&w=1800&q=85",
    "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=1800&q=85",
    "https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?auto=format&fit=crop&w=1800&q=85",
  ],
  shoes: [
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1800&q=85",
    "https://images.unsplash.com/photo-1543508282-6319a3e2621f?auto=format&fit=crop&w=1800&q=85",
    "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=1800&q=85",
    "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=1800&q=85",
    "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=1800&q=85",
    "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=1800&q=85&sat=-5",
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1800&q=85&sat=5",
    "https://images.unsplash.com/photo-1543508282-6319a3e2621f?auto=format&fit=crop&w=1800&q=85&sat=-10",
  ],
  accessories: [
    "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1800&q=85",
    "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=1800&q=85",
    "https://images.unsplash.com/photo-1523398002811-999ca8dec234?auto=format&fit=crop&w=1800&q=85",
    "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1800&q=85",
    "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1800&q=85",
    "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1800&q=85&sat=-5",
    "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=1800&q=85&sat=4",
    "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1800&q=85&sat=-8",
  ],
  home: [
    "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1800&q=85",
    "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=1800&q=85",
    "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=1800&q=85",
    "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1800&q=85",
    "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1800&q=85",
    "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1800&q=85&sat=-10",
    "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=1800&q=85&sat=8",
    "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=1800&q=85&sat=-4",
  ],
  beauty: [
    "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=1800&q=85",
    "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=1800&q=85",
    "https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&w=1800&q=85",
    "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1800&q=85",
    "https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=1800&q=85",
    "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=1800&q=85&sat=5",
    "https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&w=1800&q=85&sat=-5",
    "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1800&q=85&sat=8",
  ],
  food: [
    "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1800&q=85",
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1800&q=85",
    "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=1800&q=85",
    "https://images.unsplash.com/photo-1514986888952-8cd320577b68?auto=format&fit=crop&w=1800&q=85",
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1800&q=85&sat=6",
    "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=1800&q=85&sat=-10",
    "https://images.unsplash.com/photo-1514986888952-8cd320577b68?auto=format&fit=crop&w=1800&q=85&sat=4",
    "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1800&q=85&sat=-5",
  ],
  outdoor: [
    "https://images.unsplash.com/photo-1486911278844-a81c5267e227?auto=format&fit=crop&w=1800&q=85",
    "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=1800&q=85",
    "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=1800&q=85",
    "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?auto=format&fit=crop&w=1800&q=85",
    "https://images.unsplash.com/photo-1486911278844-a81c5267e227?auto=format&fit=crop&w=1800&q=85&sat=-10",
    "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=1800&q=85&sat=5",
    "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=1800&q=85&sat=-5",
    "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?auto=format&fit=crop&w=1800&q=85&sat=8",
  ],
  kids: [
    "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=1800&q=85",
    "https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?auto=format&fit=crop&w=1800&q=85",
    "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=1800&q=85",
    "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=1800&q=85",
    "https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?auto=format&fit=crop&w=1800&q=85",
    "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=1800&q=85",
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1800&q=85",
    "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1800&q=85",
  ],
  tech: [
    "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1800&q=85",
    "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=1800&q=85",
    "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1800&q=85",
    "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1800&q=85",
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1800&q=85",
    "https://images.unsplash.com/photo-1517336714739-489689fd1ca8?auto=format&fit=crop&w=1800&q=85",
    "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=1800&q=85",
    "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=2200&q=85&sat=4",
    "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=1800&q=85&sat=-8",
    "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1800&q=85&sat=8",
  ],
};

const categoryVideoPool: Record<StoreCategory, readonly string[]> = {
  fashion: [
    "https://videos.pexels.com/video-files/6069078/6069078-hd_1920_1080_25fps.mp4",
    "https://videos.pexels.com/video-files/6769791/6769791-hd_1920_1080_25fps.mp4",
    "https://videos.pexels.com/video-files/4624250/4624250-hd_1920_1080_25fps.mp4",
  ],
  shoes: [
    "https://videos.pexels.com/video-files/855706/855706-hd_1920_1080_25fps.mp4",
    "https://videos.pexels.com/video-files/853970/853970-hd_1920_1080_25fps.mp4",
    "https://videos.pexels.com/video-files/6550828/6550828-hd_1920_1080_25fps.mp4",
  ],
  accessories: [
    "https://videos.pexels.com/video-files/6183896/6183896-hd_1920_1080_25fps.mp4",
    "https://videos.pexels.com/video-files/5820493/5820493-hd_1920_1080_25fps.mp4",
    "https://videos.pexels.com/video-files/855805/855805-hd_1920_1080_25fps.mp4",
  ],
  home: [
    "https://videos.pexels.com/video-files/5077061/5077061-hd_1920_1080_25fps.mp4",
    "https://videos.pexels.com/video-files/7025987/7025987-hd_1920_1080_25fps.mp4",
    "https://videos.pexels.com/video-files/7578540/7578540-hd_1920_1080_25fps.mp4",
  ],
  beauty: [
    "https://videos.pexels.com/video-files/7792753/7792753-hd_1920_1080_25fps.mp4",
    "https://videos.pexels.com/video-files/5980270/5980270-hd_1920_1080_25fps.mp4",
    "https://videos.pexels.com/video-files/6981411/6981411-hd_1920_1080_25fps.mp4",
  ],
  food: [
    "https://videos.pexels.com/video-files/3195650/3195650-hd_1920_1080_25fps.mp4",
    "https://videos.pexels.com/video-files/6999534/6999534-hd_1920_1080_25fps.mp4",
    "https://videos.pexels.com/video-files/3196073/3196073-hd_1920_1080_25fps.mp4",
  ],
  outdoor: [
    "https://videos.pexels.com/video-files/857195/857195-hd_1920_1080_25fps.mp4",
    "https://videos.pexels.com/video-files/5527780/5527780-hd_1920_1080_25fps.mp4",
    "https://videos.pexels.com/video-files/4488797/4488797-hd_1920_1080_25fps.mp4",
  ],
  kids: [
    "https://videos.pexels.com/video-files/7214249/7214249-hd_1920_1080_25fps.mp4",
    "https://videos.pexels.com/video-files/6200700/6200700-hd_1920_1080_25fps.mp4",
    "https://videos.pexels.com/video-files/5735093/5735093-hd_1920_1080_25fps.mp4",
  ],
  tech: [
    "https://videos.pexels.com/video-files/3195394/3195394-hd_1920_1080_25fps.mp4",
    "https://videos.pexels.com/video-files/1811313/1811313-hd_1920_1080_25fps.mp4",
    "https://videos.pexels.com/video-files/856987/856987-hd_1920_1080_25fps.mp4",
  ],
};

function normalizedIndex(index: number) {
  return ((index % IMAGE_CANDIDATES_PER_CATEGORY) + IMAGE_CANDIDATES_PER_CATEGORY) % IMAGE_CANDIDATES_PER_CATEGORY;
}

function candidateLock(category: StoreCategory, index: number) {
  return STORE_CATEGORIES.indexOf(category) * IMAGE_CANDIDATES_PER_CATEGORY + normalizedIndex(index) + 1;
}

export function isStoreCategory(value: string): value is StoreCategory {
  return STORE_CATEGORIES.includes(value as StoreCategory);
}

export function isImageRole(value: string): value is ImageRole {
  return ["hero", "story", "collection", "product", "detail", "lifestyle", "social"].includes(value);
}

function hashTopic(topic?: string) {
  if (!topic) return 0;
  let hash = 0;
  for (let i = 0; i < topic.length; i += 1) {
    hash = ((hash << 5) - hash + topic.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

function roleOffset(role: ImageRole) {
  return role === "hero" ? 0 : role === "story" ? 17 : role === "collection" ? 37 : role === "product" ? 59 : role === "detail" ? 79 : role === "lifestyle" ? 101 : 127;
}

/** Same-origin URL used by the storefront renderer. */
export function mediaConfidence(category: StoreCategory, role: ImageRole, topic?: string): MediaConfidence {
  const normalized = normalizeTopic(topic ?? "");
  const niche = nicheMediaProfile(topic);
  if (niche && normalized.split(" ").filter(Boolean).length >= 2) return "highConfidence";
  if (niche || (topic?.trim() && role !== "hero")) return "mediumConfidence";
  return "fallback";
}

export function mediaSemanticLabel(category: StoreCategory, role: ImageRole, topic?: string) {
  const niche = nicheMediaProfile(topic);
  const cleaned = normalizeTopic(topic ?? "").slice(0, 72);
  return cleaned || `${niche?.id?.replace(/-/g, " ") ?? category} ${role}`;
}

export function categoryImageUrl(category: StoreCategory, index: number, role: ImageRole, topic?: string) {
  const params = new URLSearchParams({
    category,
    index: String(normalizedIndex(index)),
    role,
  });
  if (topic?.trim()) params.set("topic", topic.trim().slice(0, 80));
  return `/api/media/image?${params.toString()}`;
}

/** Candidate URLs fetched server-side by /api/media/image. */
export function remoteImageCandidates(category: StoreCategory, index: number, role: ImageRole, topic?: string) {
  const normalized = normalizedIndex(index);
  const topicOffset = hashTopic(topic);
  const niche = nicheMediaProfile(topic);
  const queryPool = niche?.queries ?? queries[category];
  const diversityOffset = roleOffset(role);
  const baseQuery = queryPool[(normalized + topicOffset + diversityOffset) % queryPool.length];
  // For dedicated niches, keep the high-signal noun phrase first instead of mixing
  // it with the broad render-family query. This dramatically improves cars/phones/etc.
  const roleSuffix: Record<ImageRole, string> = {
    hero: "premium campaign cinematic wide hero",
    product: "studio product front view isolated merchandising",
    detail: "macro close-up material detail product",
    lifestyle: "in-use lifestyle environment authentic",
    collection: "category collection overview merchandising",
    story: "editorial narrative lifestyle brand story",
    social: "candid creator UGC vertical social",
  };
  const exactTopic = topic?.trim();
  const query = niche
    ? `${niche.id.replace(/-/g, " ")} ${baseQuery} ${roleSuffix[role]}`
    : exactTopic
      ? `${exactTopic} ${baseQuery} ${roleSuffix[role]}`
      : baseQuery;
  const [width, height] = roleSize[role];
  const lock = candidateLock(category, normalized + topicOffset + diversityOffset);
  const fallbackPool = niche?.fallbacks?.length ? niche.fallbacks : stableFallbacks[category];
  const stable = fallbackPool[(normalized + topicOffset + diversityOffset) % fallbackPool.length];
  const semantic = `https://loremflickr.com/${width}/${height}/${encodeURIComponent(query)}?lock=${lock}`;
  const generic = `https://picsum.photos/seed/storestudio-${niche?.id ?? category}-${lock}-${topicOffset + diversityOffset}/${width}/${height}`;

  if (niche?.fallbacks?.length) {
    const semanticAlt = `https://loremflickr.com/${width}/${height}/${encodeURIComponent(`${query} studio detail`)}?lock=${lock + 10000}`;
    return [
      // Dedicated niches intentionally avoid the generic Picsum fallback. If these
      // fail, the API emits a branded semantic fallback instead of a random photo.
      stable,
      semantic,
      semanticAlt,
    ];
  }

  return [
    // Semantic source is intentionally first. A dedicated-niche query (cars,
    // seafood, sofas, phones, etc.) no longer inherits irrelevant broad imagery.
    semantic,
    stable,
    generic,
  ];
}

/** Public stable URL retained for compatibility and debugging. */
export function fallbackImageUrl(category: StoreCategory, index: number, _role: ImageRole, topic?: string) {
  const normalized = normalizedIndex(index);
  const topicOffset = hashTopic(topic);
  return stableFallbacks[category][(normalized + topicOffset) % stableFallbacks[category].length];
}

export function categoryVideoUrl(category: StoreCategory, seed: number) {
  const pool = categoryVideoPool[category];
  return pool[((seed % pool.length) + pool.length) % pool.length];
}

function makeRng(seed: number) {
  let value = seed >>> 0;
  return () => {
    value = (value * 1664525 + 1013904223) >>> 0;
    return value / 4294967296;
  };
}

function uniqueIndexes(seed: number, count: number) {
  const rng = makeRng(seed);
  const values = Array.from({ length: IMAGE_CANDIDATES_PER_CATEGORY }, (_, i) => i);
  for (let i = values.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rng() * (i + 1));
    [values[i], values[j]] = [values[j], values[i]];
  }
  return values.slice(0, count);
}

function shouldUseHeroVideo(store: StoreContent, seed: number) {
  const nicheTopic = `${store.nicheLabel ?? ""} ${store.heroTitle ?? ""} ${store.brandName ?? ""}`;
  const sensitiveNiche = nicheMediaProfile(nicheTopic)?.id;
  if (["phones", "watches", "eyewear", "kitchen-appliances", "seafood", "sofas", "beds"].includes(sensitiveNiche ?? "")) {
    return false;
  }
  if (["tech", "shoes", "beauty", "kids", "outdoor"].includes(store.category)) {
    return seed % 2 === 0;
  }
  return seed % 5 === 0;
}

export function refreshStoreImages(
  source: StoreContent,
  seed: number,
  options: {
    keepHero?: boolean;
    keepProducts?: boolean;
    previous?: StoreContent;
    searchContext?: string;
  } = {},
): StoreContent {
  const store = structuredClone(source);
  const gallerySize = 4;
  const requiredPicks = Math.max(10, 2 + store.collections.length + store.products.length * gallerySize);
  const picks = uniqueIndexes(seed + STORE_CATEGORIES.indexOf(store.category) * 7919, Math.min(requiredPicks, IMAGE_CANDIDATES_PER_CATEGORY));
  const previous = options.previous;
  const searchContext = options.searchContext?.trim().slice(0, 80);
  const withContext = (topic: string) => searchContext ? `${searchContext} ${topic}`.slice(0, 80) : topic;

  store.heroImage = options.keepHero && previous
    ? previous.heroImage
    : categoryImageUrl(store.category, picks[0], "hero", withContext(`${store.brandName} ${store.heroTitle}`));

  store.heroMediaMode = options.keepHero && previous
    ? previous.heroMediaMode
    : shouldUseHeroVideo(store, seed)
      ? "video"
      : "image";

  store.heroVideoUrl = options.keepHero && previous
    ? previous.heroVideoUrl
    : categoryVideoUrl(store.category, seed);

  store.secondaryImage = categoryImageUrl(store.category, picks[1], "story", withContext(`${store.brandName} ${store.promoTitle}`));

  store.collections = store.collections.map((collection, i) => ({
    ...collection,
    image: categoryImageUrl(store.category, picks[2 + i] ?? ((seed + i * 17) % IMAGE_CANDIDATES_PER_CATEGORY), "collection", withContext(`${store.nicheLabel ?? store.brandName} ${collection.title}`)),
  }));

  const productStart = 2 + store.collections.length;
  store.products = store.products.map((product, i) => {
    const previousProduct = previous?.products[i];
    const productTopic = withContext(`${store.nicheLabel ?? store.brandName} ${product.name} ${product.subtitle}`);
    const gallery = Array.from({ length: gallerySize }, (_, galleryIndex) => {
      const pickIndex = productStart + i * gallerySize + galleryIndex;
      const imageIndex = picks[pickIndex] ?? ((seed + i * 31 + galleryIndex * 13) % IMAGE_CANDIDATES_PER_CATEGORY);
      const viewLabel = galleryIndex === 0 ? "main product" : galleryIndex === 1 ? "detail view" : galleryIndex === 2 ? "lifestyle view" : "alternate angle";
      const role: ImageRole = galleryIndex === 0 ? "product" : galleryIndex === 1 ? "detail" : galleryIndex === 2 ? "lifestyle" : "product";
      return categoryImageUrl(store.category, imageIndex, role, `${product.name} ${store.nicheLabel ?? store.brandName} ${viewLabel}`.slice(0, 80));
    });

    if (options.keepProducts && previousProduct) {
      return {
        ...product,
        image: previousProduct.image,
        gallery: previousProduct.gallery?.length ? previousProduct.gallery : [previousProduct.image, ...gallery.slice(1)],
      };
    }

    return {
      ...product,
      image: gallery[0],
      gallery,
    };
  });

  return store;
}

export type StoreMediaAudit = {
  score: number;
  totalAssets: number;
  uniqueAssets: number;
  duplicateAssets: number;
  missingTopics: number;
  issues: string[];
};

function mediaAssets(store: StoreContent) {
  return [
    store.heroImage,
    store.secondaryImage,
    ...store.collections.map((collection) => collection.image),
    ...store.products.flatMap((product) => product.gallery?.length ? product.gallery : [product.image]),
  ].filter(Boolean);
}

export function auditStoreMedia(store: StoreContent): StoreMediaAudit {
  const assets = mediaAssets(store);
  const unique = new Set(assets);
  const duplicateAssets = Math.max(0, assets.length - unique.size);
  const missingTopics = assets.filter((asset) => {
    if (!asset.startsWith("/api/media/image?")) return false;
    try {
      const params = new URLSearchParams(asset.split("?")[1] ?? "");
      return !(params.get("topic") ?? "").trim();
    } catch {
      return true;
    }
  }).length;
  const issues: string[] = [];
  if (duplicateAssets) issues.push(`${duplicateAssets} repeated media asset${duplicateAssets === 1 ? "" : "s"}`);
  if (missingTopics) issues.push(`${missingTopics} media request${missingTopics === 1 ? "" : "s"} missing semantic context`);
  if (!store.products.every((product) => (product.gallery?.length ?? 0) >= 3)) issues.push("Some products do not have a multi-image gallery");
  const penalty = duplicateAssets * 7 + missingTopics * 5 + (issues.some((issue) => issue.includes("multi-image")) ? 10 : 0);
  return {
    score: Math.max(0, Math.min(100, 100 - penalty)),
    totalAssets: assets.length,
    uniqueAssets: unique.size,
    duplicateAssets,
    missingTopics,
    issues,
  };
}
