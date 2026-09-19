import type { DesignGenome, StoreContent } from "@/types/design";
import { categoryImageUrl, categoryVideoUrl } from "@/lib/image-library";

export const storePresets: Record<string, StoreContent> = {
  fashion: {
    category: "fashion",
    brandName: "RITUAL",
    navItems: ["New", "Tops", "Bottoms", "Outerwear"],
    announcement: "New season drop · Tailored essentials for everyday dressing",
    heroKicker: "Fashion for the wild at heart",
    heroTitle: "Build a capsule wardrobe with iconic pieces.",
    heroBody: "Structured essentials, directional silhouettes and elevated textures for a wardrobe that feels current without feeling loud.",
    cta: "Shop the collection",
    heroImage: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=3840&q=85",
    heroMediaMode: "image",
    heroVideoUrl: categoryVideoUrl("fashion", 7),
    secondaryImage: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=3200&q=85",
    collections: [
      { title: "Knitwear", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=80" },
      { title: "Dresses", image: "https://images.unsplash.com/photo-1495385794356-15371f348c31?auto=format&fit=crop&w=1200&q=80" },
      { title: "Denim", image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=1200&q=80" },
      { title: "Jackets", image: "https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?auto=format&fit=crop&w=1200&q=80" },
    ],
    products: [
      { name: "Contour Cardigan", price: "$148", tag: "New", subtitle: "Soft rib knit", image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1100&q=80" },
      { name: "Column Dress", price: "$186", tag: "Core", subtitle: "Minimal drape", image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1100&q=80" },
      { name: "Ash Straight Denim", price: "$164", tag: "Limited", subtitle: "Washed charcoal", image: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=1100&q=80" },
      { name: "Studio Blazer", price: "$238", tag: "Bestseller", subtitle: "Sharp tailoring", image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=1100&q=80" },
    ],
    promoTitle: "Editorial silhouettes. Daily wearability.",
    promoBody: "Balance statement pieces with dependable staples and build a wardrobe that shifts effortlessly from weekday structure to weekend ease.",
  },
  shoes: {
    category: "shoes",
    brandName: "HELIX",
    navItems: ["Women", "Men", "Shoe quiz", "Presets"],
    announcement: "Performance launch · engineered comfort for every stride",
    heroKicker: "Run beyond routine",
    heroTitle: "Shoes that move like momentum.",
    heroBody: "From all-day lifestyle pairs to fast-feeling trainers, every silhouette is built to feel light, confident and ready to move.",
    cta: "Explore footwear",
    heroImage: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=3840&q=85",
    heroMediaMode: "video",
    heroVideoUrl: categoryVideoUrl("shoes", 12),
    secondaryImage: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=3200&q=85",
    collections: [
      { title: "Daily Running", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80" },
      { title: "Street", image: "https://images.unsplash.com/photo-1543508282-6319a3e2621f?auto=format&fit=crop&w=1200&q=80" },
      { title: "Trail", image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=1200&q=80" },
      { title: "Recovery", image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=1200&q=80" },
    ],
    products: [
      { name: "Aero Runner", price: "$168", tag: "Launch", subtitle: "Responsive foam", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1100&q=80" },
      { name: "Street Pace", price: "$142", tag: "New", subtitle: "Everyday comfort", image: "https://images.unsplash.com/photo-1543508282-6319a3e2621f?auto=format&fit=crop&w=1100&q=80" },
      { name: "Summit Trail", price: "$176", tag: "Trail", subtitle: "Grip and stability", image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=1100&q=80" },
      { name: "Cloud Slip", price: "$118", tag: "Recovery", subtitle: "Easy post-run wear", image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=1100&q=80" },
    ],
    promoTitle: "Built for speed. Styled for the city.",
    promoBody: "Your store layout can shift toward performance storytelling, drops, launch banners and quick comparisons when the prompt suggests shoes or sportswear.",
  },
  accessories: {
    category: "accessories",
    brandName: "HORIZON",
    navItems: ["Bags", "Jewelry", "Travel", "Giftable"],
    announcement: "Curated accessories · refined details that complete the look",
    heroKicker: "Objects to wear. Pieces to keep.",
    heroTitle: "Accessories with staying power.",
    heroBody: "Minimal bags, polished jewelry and travel companions designed to feel timeless, tactile and easy to style.",
    cta: "Shop accessories",
    heroImage: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=3840&q=85",
    heroMediaMode: "image",
    heroVideoUrl: categoryVideoUrl("accessories", 5),
    secondaryImage: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=3200&q=85",
    collections: [
      { title: "Totes", image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1200&q=80" },
      { title: "Jewelry", image: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=1200&q=80" },
      { title: "Travel", image: "https://images.unsplash.com/photo-1523398002811-999ca8dec234?auto=format&fit=crop&w=1200&q=80" },
      { title: "Small Leather", image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1200&q=80" },
    ],
    products: [
      { name: "Studio Tote", price: "$188", tag: "Bestseller", subtitle: "Structured carryall", image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1100&q=80" },
      { name: "Pearl Arc Earrings", price: "$96", tag: "New", subtitle: "Soft polish", image: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=1100&q=80" },
      { name: "Passport Sleeve", price: "$74", tag: "Travel", subtitle: "Pebbled leather", image: "https://images.unsplash.com/photo-1523398002811-999ca8dec234?auto=format&fit=crop&w=1100&q=80" },
      { name: "Mini Zip Wallet", price: "$82", tag: "Core", subtitle: "Compact daily carry", image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1100&q=80" },
    ],
    promoTitle: "Small details. Strong identity.",
    promoBody: "Great accessory stores benefit from clean layout shifts, strong close-up imagery and focused categories so the products feel elevated instantly.",
  },
  home: {
    category: "home",
    brandName: "DWELL",
    navItems: ["Bedding", "Bath", "Decor", "Inspiration"],
    announcement: "Shop the bedroom event · on now",
    heroKicker: "Living, softened",
    heroTitle: "Thoughtfully edited comfort for home.",
    heroBody: "Bedding, bath and elevated decor curated to create a calmer, warmer atmosphere in every room.",
    cta: "Shop the edit",
    heroImage: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=3840&q=85",
    heroMediaMode: "image",
    heroVideoUrl: categoryVideoUrl("home", 17),
    secondaryImage: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=3200&q=85",
    collections: [
      { title: "Bedding", image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80" },
      { title: "Bath", image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80" },
      { title: "Decor", image: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=1200&q=80" },
      { title: "Furniture", image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80" },
    ],
    products: [
      { name: "Linen Quilt Set", price: "$128", tag: "Bestseller", subtitle: "Breathable softness", image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1100&q=80" },
      { name: "Stone Bath Towel", price: "$42", tag: "Bath", subtitle: "Spa-weight cotton", image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1100&q=80" },
      { name: "Oak Catchall", price: "$64", tag: "Decor", subtitle: "Warm minimal storage", image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=1100&q=80" },
      { name: "Glass Task Lamp", price: "$148", tag: "Lighting", subtitle: "Focused ambient glow", image: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=1100&q=80" },
    ],
    promoTitle: "A home that feels composed, not crowded.",
    promoBody: "For home and decor stores, the generator leans into editorial object photography, calm palettes and premium layout systems that highlight collections beautifully.",
  },
  outdoor: {
    category: "outdoor",
    brandName: "ARCTIC",
    navItems: ["Men", "Women", "Collections", "Explore"],
    announcement: "Cold-weather system · engineered layers for city and alpine use",
    heroKicker: "Urban alpine gear",
    heroTitle: "Built for weather. Designed for the city.",
    heroBody: "Technical outerwear, protective layers and high-contrast accessories designed to move between cold streets and mountain terrain.",
    cta: "Explore outerwear",
    heroImage: "https://images.unsplash.com/photo-1486911278844-a81c5267e227?auto=format&fit=crop&w=3840&q=85",
    heroMediaMode: "video",
    heroVideoUrl: categoryVideoUrl("outdoor", 8),
    secondaryImage: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=3200&q=85",
    collections: [
      { title: "Shells", image: "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=1200&q=82" },
      { title: "Bottoms", image: "https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=1200&q=82" },
      { title: "Accessories", image: "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=1200&q=82" },
      { title: "Insulation", image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?auto=format&fit=crop&w=1200&q=82" },
    ],
    products: [
      { name: "Thermal Shell", price: "$286", tag: "Best seller", subtitle: "Weatherproof layer", image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?auto=format&fit=crop&w=1100&q=82" },
      { name: "Utility Trouser", price: "$176", tag: "New", subtitle: "Articulated fit", image: "https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=1100&q=82" },
      { name: "Alpine Goggle", price: "$124", tag: "Technical", subtitle: "High-contrast lens", image: "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=1100&q=82" },
      { name: "Puffer System", price: "$318", tag: "Core", subtitle: "Insulated shell", image: "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=1100&q=82" },
    ],
    promoTitle: "Technical performance can still feel fashion-forward.",
    promoBody: "Outdoor prompts unlock darker campaign layouts, full-bleed imagery, category mosaics and product storytelling inspired by technical fashion storefronts.",
  },
  beauty: {
    category: "beauty",
    brandName: "STYLIST",
    navItems: ["Hair", "Treatments", "Bundles", "Journal"],
    announcement: "20% off your first order · Join the list",
    heroKicker: "Calm skin. Clear ritual.",
    heroTitle: "Beauty designed for slower routines.",
    heroBody: "Serums, cleansers and salon-quality essentials created with a premium editorial tone and stronger motion storytelling.",
    cta: "Discover skincare",
    heroImage: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=3840&q=85",
    heroMediaMode: "video",
    heroVideoUrl: categoryVideoUrl("beauty", 11),
    secondaryImage: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=3200&q=85",
    collections: [
      { title: "Cleansers", image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=1200&q=80" },
      { title: "Serums", image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=1200&q=80" },
      { title: "Hair Care", image: "https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&w=1200&q=80" },
      { title: "Gift Sets", image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1200&q=80" },
    ],
    products: [
      { name: "Milk Cleanser", price: "$28", tag: "Daily", subtitle: "Barrier-friendly", image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=1100&q=80" },
      { name: "Glass Skin Serum", price: "$34", tag: "New", subtitle: "Hydration concentrate", image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=1100&q=80" },
      { name: "Hydra Mist", price: "$24", tag: "Hair", subtitle: "Soft finish", image: "https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&w=1100&q=80" },
      { name: "Evening Ritual Set", price: "$72", tag: "Set", subtitle: "Four-step routine", image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1100&q=80" },
    ],
    promoTitle: "Premium beauty can feel soft, calm and modern.",
    promoBody: "Beauty prompts steer the generator toward cleaner hierarchy, lighter palettes, motion-rich heroes and strong ingredient storytelling.",
  },
  food: {
    category: "food",
    brandName: "SAVOR",
    navItems: ["Shop", "Gift Sets", "Recipes", "About"],
    announcement: "Small-batch condiments · bright flavors and giftable sets",
    heroKicker: "Bold pantry essentials",
    heroTitle: "Savor every last bite.",
    heroBody: "From chili oils to finishing sauces, the experience turns rich product imagery into a strong, high-energy storefront direction.",
    cta: "Shop sauces",
    heroImage: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=3840&q=85",
    heroMediaMode: "video",
    heroVideoUrl: categoryVideoUrl("food", 14),
    secondaryImage: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=3200&q=85",
    collections: [
      { title: "Hot Sauces", image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80" },
      { title: "Pantry Kits", image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80" },
      { title: "Giftable", image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=1200&q=80" },
      { title: "Recipes", image: "https://images.unsplash.com/photo-1514986888952-8cd320577b68?auto=format&fit=crop&w=1200&q=80" },
    ],
    products: [
      { name: "Smoked Chili Oil", price: "$16", tag: "Hot", subtitle: "Savory heat", image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1100&q=80" },
      { name: "Citrus Sesame Sauce", price: "$14", tag: "New", subtitle: "Bright umami", image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=1100&q=80" },
      { name: "Weekend Gift Box", price: "$38", tag: "Gift", subtitle: "Three bottle set", image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1100&q=80" },
      { name: "Recipe Journal", price: "$18", tag: "Kitchen", subtitle: "Pantry companion", image: "https://images.unsplash.com/photo-1514986888952-8cd320577b68?auto=format&fit=crop&w=1100&q=80" },
    ],
    promoTitle: "Turn flavor into a storefront identity.",
    promoBody: "Food layouts become bolder, more launch-oriented and more media-driven with stronger call-to-actions and high-contrast product storytelling.",
  },
  kids: {
    category: "kids",
    brandName: "little PEBBLE",
    navItems: ["Shop", "Collections", "Pages", "Features"],
    announcement: "New campaign · Softness in comfort",
    heroKicker: "New campaign",
    heroTitle: "Softness in comfort.",
    heroBody: "Playful, premium kidswear layouts with soft rounded geometry, pastel balance and cleaner merchandising for categories, sets and seasonal drops.",
    cta: "Shop collection",
    heroImage: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=3840&q=85",
    heroMediaMode: "video",
    heroVideoUrl: categoryVideoUrl("kids", 3),
    secondaryImage: "https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?auto=format&fit=crop&w=3200&q=85",
    collections: [
      { title: "Sweaters", image: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=1200&q=80" },
      { title: "Sets", image: "https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?auto=format&fit=crop&w=1200&q=80" },
      { title: "Outerwear", image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80" },
      { title: "Accessories", image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=1200&q=80" },
    ],
    products: [
      { name: "Stripe Shorts", price: "$24", tag: "New", subtitle: "Lightweight playwear", image: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=1100&q=80" },
      { name: "Colorblock Jacket", price: "$44", tag: "Core", subtitle: "Soft outer layer", image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=1100&q=80" },
      { name: "Sweet Pink Pack", price: "$58", tag: "Accessories", subtitle: "Playful backpack", image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1100&q=80" },
      { name: "Campus Spirit Cap", price: "$45", tag: "Best seller", subtitle: "Stackable colors", image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1100&q=80" },
    ],
    promoTitle: "Soft, playful and parent-ready merchandising.",
    promoBody: "Kids prompts unlock more rounded layouts, softer palettes, clearer product cards and hero sections that feel playful without losing polish.",
  },
  tech: {
    category: "tech",
    brandName: "IGNITE",
    navItems: ["Shop Devices", "Shop Components", "Phones", "Brands"],
    announcement: "Find compatible parts · choose your motherboard",
    heroKicker: "Now in obsidian",
    heroTitle: "Time for the upgrade?",
    heroBody: "Launch premium electronics, accessories and components with stronger specification-style pricing, cleaner catalog cards and richer product motion.",
    cta: "Buy now",
    heroImage: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=3840&q=85",
    heroMediaMode: "video",
    heroVideoUrl: categoryVideoUrl("tech", 2),
    secondaryImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=3200&q=85",
    collections: [
      { title: "Phones", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1200&q=80" },
      { title: "Monitors", image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=1200&q=80" },
      { title: "Computing", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80" },
      { title: "Accessories", image: "https://images.unsplash.com/photo-1517336714739-489689fd1ca8?auto=format&fit=crop&w=1200&q=80" },
    ],
    products: [
      { name: "Edge Pixa 9", price: "$607.00", tag: "Refurbished", subtitle: "128GB · 256GB · 512GB", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1100&q=80" },
      { name: "Aware 4K QD-OLED", price: "$911.00", tag: "Display", subtitle: "Gaming monitor", image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=1100&q=80" },
      { name: "Prime Notebook 9 Pro", price: "$2,277.00", tag: "Up to £1,518 off", subtitle: "Creator-grade laptop", image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1100&q=80" },
      { name: "BitCore ZX", price: "$19.00", tag: "New", subtitle: "Compact single-board computer", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1100&q=80" },
    ],
    promoTitle: "Faster discovery. Cleaner specs. Better merchandising.",
    promoBody: "Tech prompts steer the generator toward stronger search-driven headers, denser catalog layouts, comparison-friendly pricing and motion-ready launch heroes.",
  },
};

type ProductEnrichmentCategory = keyof typeof storePresets;

const categoryColorSuggestions: Record<ProductEnrichmentCategory, string[]> = {
  fashion: ["#2D2A26", "#C4B29F", "#6E7B6A", "#8E745B", "#F5F0EA"],
  shoes: ["#111111", "#F4F4F2", "#D94F3D", "#607D8B", "#B6C7A4"],
  accessories: ["#201A17", "#C6A16E", "#7F6658", "#EADFD5", "#949494"],
  home: ["#D7C7B3", "#EEE7DD", "#8B8F80", "#C9B8A3", "#F7F2EC"],
  outdoor: ["#1C2331", "#879D7A", "#D39B49", "#C7CFD7", "#5D7285"],
  beauty: ["#EFC8C0", "#F7E7D6", "#C8B1A0", "#A67262", "#FBF7F3"],
  food: ["#C8432B", "#F2D3A7", "#7A3E23", "#E9E1D1", "#748B4D"],
  kids: ["#F7B7C3", "#9EC5FF", "#FFD66B", "#B7E4C7", "#EAD7FF"],
  tech: ["#0F172A", "#D8E2F2", "#4F8CFF", "#5EEAD4", "#8B93A7"],
};

const categoryHighlights: Record<ProductEnrichmentCategory, string[]> = {
  fashion: ["Premium fabric", "Ready to style", "Limited seasonal run", "Tailored finish", "Soft-touch texture"],
  shoes: ["Responsive cushioning", "All-day comfort", "Breathable upper", "Road-tested grip", "Lightweight build"],
  accessories: ["Gift-ready", "Signature hardware", "Travel friendly", "Everyday carry", "Polished finish"],
  home: ["Small-batch design", "Easy-care finish", "Layer-friendly", "Textural upgrade", "Designed for calm spaces"],
  outdoor: ["Weather ready", "Packable setup", "Field-tested", "Built for layering", "Technical performance"],
  beauty: ["Routine essential", "Derm-inspired", "Hydration focused", "Salon-grade feel", "Sensitive-skin friendly"],
  food: ["Small batch", "Chef-approved", "Pantry staple", "Giftable pick", "Flavor packed"],
  kids: ["Soft and durable", "Easy movement", "Parent favorite", "Play-ready", "Machine-wash friendly"],
  tech: ["Fast setup", "Creator ready", "High-spec value", "Warranty included", "Performance tuned"],
};

function enrichStoreProduct(product: StoreContent["products"][number], category: ProductEnrichmentCategory, index: number) {
  const baseColors = categoryColorSuggestions[category];
  const colorCount = category === "tech" ? 2 : category === "food" ? 1 : 3;
  const start = index % baseColors.length;
  const colors = Array.from({ length: colorCount }, (_, offset) => baseColors[(start + offset) % baseColors.length]);
  const ratingBase = category === "tech" ? 4.7 : category === "beauty" || category === "fashion" ? 4.8 : 4.6;
  const rating = product.rating ?? Number((ratingBase - ((index % 3) * 0.1)).toFixed(1));
  const reviewCount = product.reviewCount ?? (category === "tech" ? 84 + index * 43 : 26 + index * 31);
  const badge = product.badge ?? categoryHighlights[category][index % categoryHighlights[category].length];
  const numericPrice = Number(String(product.price).replace(/[^0-9.]/g, ""));
  const compareMultiplier = 1.14 + ((index % 3) * 0.04);
  const compareAt = product.compareAt ?? (Number.isFinite(numericPrice) && numericPrice > 0 && index % 2 === 0
    ? product.price.replace(/[\d,.]+/, (numericPrice * compareMultiplier).toFixed(product.price.includes(".") ? 2 : 0))
    : undefined);
  return { ...product, rating, reviewCount, colors, badge, compareAt };
}

// Route every built-in preset through the same-origin media proxy as well.
// This prevents the initial storefront from depending on direct third-party hotlinks.
Object.values(storePresets).forEach((store, groupIndex) => {
  store.heroImage = categoryImageUrl(store.category, groupIndex * 17, "hero", `${store.brandName} ${store.heroTitle}`);
  store.secondaryImage = categoryImageUrl(store.category, groupIndex * 17 + 1, "story", `${store.brandName} ${store.promoTitle}`);
  store.collections = store.collections.map((collection, index) => ({
    ...collection,
    image: categoryImageUrl(store.category, groupIndex * 17 + 2 + index, "collection", collection.title),
  }));
  store.products = store.products.map((product, index) => enrichStoreProduct({
    ...product,
    image: categoryImageUrl(store.category, groupIndex * 17 + 8 + index, "product", `${product.name} ${product.subtitle}`),
  }, store.category as ProductEnrichmentCategory, index));
});

export const initialDesign: DesignGenome = {
  id: "initial",
  name: "Ritual / Quiet Luxury",
  description: "Fashion storefront · Inter · split hero · editorial products · editorial motion.",
  store: storePresets.fashion,
  archetype: "editorial",
  commerce: {
    priceStyle: "luxuryInline",
    cardStyle: "editorial",
    imageRatio: "editorial",
    showRatings: false,
    showSwatches: true,
    showBadges: true,
    quickView: true,
    wishlist: true,
    mediaBehavior: "hoverZoom",
  },
  palette: {
    background: "#F4F0E9",
    surface: "#FCFAF6",
    elevated: "#FFFFFF",
    text: "#191713",
    muted: "#756F66",
    primary: "#1F1E1A",
    primaryText: "#FFFFFF",
    accent: "#9D7B59",
    border: "rgba(25,23,19,.12)",
  },
  typography: {
    fontName: "Inter",
    heading: "var(--font-inter), ui-sans-serif, system-ui, sans-serif",
    body: "var(--font-inter), ui-sans-serif, system-ui, sans-serif",
    headingWeight: 700,
    headingTracking: -0.045,
    scale: "large",
  },
  layout: {
    nav: "floating",
    hero: "split",
    productGrid: "editorial",
    footer: "oversizedBrand",
    density: "airy",
    sectionRhythm: "editorial",
  },
  geometry: { radius: 22, buttonRadius: 999 },
  surfaces: { glass: 0.76, blur: 20, shadow: "soft" },
  motion: { preset: "editorial", duration: 0.55, stagger: 0.07, hoverLift: 6, hoverScale: 1.015, sectionDistance: 18, mediaZoom: 1.025, loop: false },
  sections: [
    { id: "collections", type: "collections", eyebrow: "Shop by collection", variant: "clean" },
    { id: "products", type: "products", eyebrow: "Latest arrivals", variant: "editorial" },
    { id: "story", type: "story", eyebrow: "Editorial feature", variant: "split" },
    { id: "testimonials", type: "testimonials", eyebrow: "Community notes", variant: "cards" },
    { id: "faq", type: "faq", eyebrow: "Good to know", variant: "minimal" },
    { id: "newsletter", type: "newsletter", eyebrow: "Stay connected", variant: "clean" },
  ],
  seed: 841203,
  createdAt: "2026-01-01T00:00:00.000Z",
};
