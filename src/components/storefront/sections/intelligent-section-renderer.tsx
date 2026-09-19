"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import { motion } from "motion/react";
import { ArrowRight, Check, ChevronRight, Plus, Quote, Star } from "lucide-react";
import type { DesignGenome, SectionSpec, StoreProduct } from "@/types/design";
import { interactionDuration, interactionEase } from "@/lib/intelligence/interaction-engine";
import { categoryImageUrl } from "@/lib/image-library";

export type IntelligentSectionRendererProps = {
  design: DesignGenome;
  section: SectionSpec;
  index: number;
  max: number;
  compact: boolean;
  mobile: boolean;
};

const pad = (compact: boolean, a = 68, b = 40) => `${compact ? b : a}px ${compact ? 16 : 30}px`;

function transitionFor(design: DesignGenome) {
  const profile = design.interactionProfile;
  return profile
    ? { duration: interactionDuration(profile), ease: interactionEase(profile) }
    : { duration: Math.min(0.45, design.motion.duration), ease: [0.22, 1, 0.36, 1] as [number, number, number, number] };
}

function collectionHover(design: DesignGenome, index: number) {
  const behavior = design.interactionProfile?.imageBehavior ?? "subtleZoom";
  if (behavior === "cropShift") return { scale: 1.025, x: index % 2 ? -5 : 5 };
  if (behavior === "zoomAndPan") return { scale: 1.045, x: index % 2 ? -4 : 4, y: -2 };
  if (behavior === "softBrightness") return { scale: 1.018, filter: "brightness(1.04)" };
  if (behavior === "grayscaleToColor") return { scale: 1.01, filter: "grayscale(0)" };
  return { scale: 1.025 };
}

function collectionInitialFilter(design: DesignGenome) {
  return design.interactionProfile?.imageBehavior === "grayscaleToColor" ? "grayscale(0.85)" : "none";
}

function SectionIntro({ design, section, action }: { design: DesignGenome; section: SectionSpec; action?: string }) {
  const pair = design.typographyPair;
  return (
    <div className="mb-8 flex items-end justify-between gap-5">
      <div className="max-w-4xl">
        <div className="mb-2 text-[10px] font-semibold uppercase" style={{ color: design.palette.muted, letterSpacing: `${pair?.labelTracking ?? .2}em`, fontFamily: pair?.labelFamily ?? design.typography.body }}>{section.eyebrow ?? "Explore"}</div>
        <h2 style={{ fontFamily: pair?.headingFamily ?? design.typography.heading, fontWeight: pair?.headingWeight ?? design.typography.headingWeight, fontSize: "clamp(2rem,4vw,4rem)", lineHeight: .94, letterSpacing: `${pair?.headingTracking ?? design.typography.headingTracking}em` }}>{section.title ?? defaultSectionTitle(section.type)}</h2>
      </div>
      {action ? <button className="sf-micro-button hidden items-center gap-2 text-xs font-semibold md:flex" style={{ color: design.palette.muted }}>{action}<ArrowRight size={14} /></button> : null}
    </div>
  );
}

function defaultSectionTitle(type: SectionSpec["type"]) {
  return ({ collections: "Shop by collection", products: "Featured products", story: "A closer look at the brand", testimonials: "Customer perspective", faq: "Questions, answered", newsletter: "Stay close to what comes next", features: "What makes it better", quote: "A point of view", campaign: "Current campaign", comparison: "Compare the details", socialProof: "Seen in the community", videoStory: "The story in motion" } as const)[type];
}

export function IntelligentSectionRenderer(props: IntelligentSectionRendererProps) {
  const { section } = props;
  if (section.type === "collections") return <CollectionsV2 {...props} />;
  if (section.type === "story") return <StoryV2 {...props} />;
  if (section.type === "testimonials") return <TestimonialsV2 {...props} />;
  if (section.type === "faq") return <FAQV2 {...props} />;
  if (section.type === "newsletter") return <NewsletterV2 {...props} />;
  if (section.type === "campaign") return <CampaignV2 {...props} />;
  if (section.type === "comparison") return <ComparisonV2 {...props} />;
  if (section.type === "socialProof") return <SocialProofV2 {...props} />;
  if (section.type === "features") return <FeaturesV2 {...props} />;
  return null;
}

function CollectionsV2({ design, section, max, compact, mobile }: IntelligentSectionRendererProps) {
  const items = design.store.collections;
  const variant = section.variant;
  const trans = transitionFor(design);
  const tile = (item: (typeof items)[number], i: number, className = "") => (
    <motion.a key={`${item.title}-${i}`} href="#" className={`group relative block overflow-hidden ${className}`} onClick={(e) => e.preventDefault()} style={{ borderRadius: Math.max(0, design.geometry.radius - (variant === "posterCollections" ? 8 : 0)) }} whileHover={design.interactionProfile?.density === "minimal" ? undefined : { y: variant === "floatingCategories" ? -4 : 0 }} transition={trans}>
      <motion.img src={item.image} alt={item.title} className="absolute inset-0 h-full w-full object-cover" style={{ filter: collectionInitialFilter(design) }} whileHover={collectionHover(design, i)} transition={trans} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5 text-white"><div><div className="text-[9px] uppercase tracking-[.18em] text-white/55">{String(i + 1).padStart(2, "0")}</div><div className="mt-1 text-xl font-semibold">{item.title}</div></div><ArrowRight className="opacity-0 transition-opacity duration-150 group-hover:opacity-100" size={16} /></div>
    </motion.a>
  );

  let body: ReactNode;
  if (["imageRail", "horizontalScroller"].includes(variant)) {
    body = <div className="flex snap-x gap-4 overflow-x-auto pb-3">{items.concat(items.slice(0, mobile ? 0 : 1)).map((item, i) => <div key={`${item.title}-${i}`} className="min-w-[72%] snap-start sm:min-w-[42%] lg:min-w-[28%]">{tile(item, i, "aspect-[4/5]")}</div>)}</div>;
  } else if (["asymmetricMosaic", "magazineCollections"].includes(variant)) {
    body = <div className={`grid gap-3 ${mobile ? "grid-cols-1" : "grid-cols-12 grid-rows-2"}`}>{items.map((item, i) => <div key={item.title} className={mobile ? "" : i === 0 ? "col-span-7 row-span-2" : i === 1 ? "col-span-5" : "col-span-5"}>{tile(item, i, mobile ? "aspect-[4/5]" : i === 0 ? "h-[620px]" : "h-[302px]")}</div>)}</div>;
  } else if (["circularCollections", "floatingCategories"].includes(variant)) {
    body = <div className={`grid gap-6 ${mobile ? "grid-cols-2" : "grid-cols-4"}`}>{items.map((item, i) => <motion.a href="#" onClick={(e) => e.preventDefault()} key={item.title} className="group text-center" whileHover={{ y: -3 }} transition={trans}><div className="mx-auto aspect-square overflow-hidden rounded-full border" style={{ borderColor: design.palette.border, maxWidth: 260 }}><motion.img src={item.image} alt={item.title} className="h-full w-full object-cover" whileHover={collectionHover(design, i)} transition={trans} /></div><div className="mt-4 text-sm font-semibold">{item.title}</div><div className="mt-1 text-[10px] uppercase tracking-[.16em]" style={{ color: design.palette.muted }}>Explore collection</div></motion.a>)}</div>;
  } else if (["splitCategories", "stackedCategories"].includes(variant)) {
    body = <div className={mobile ? "space-y-4" : variant === "splitCategories" ? "grid grid-cols-2 gap-4" : "space-y-4"}>{items.map((item, i) => <motion.a href="#" onClick={(e) => e.preventDefault()} key={item.title} className={`group grid overflow-hidden border ${mobile ? "grid-cols-[112px_1fr]" : "grid-cols-[.9fr_1.1fr]"}`} style={{ borderColor: design.palette.border, borderRadius: design.geometry.radius, background: design.palette.surface }} whileHover={{ borderColor: design.palette.accent }} transition={trans}><div className={mobile ? "h-32" : "h-64 overflow-hidden"}><motion.img src={item.image} alt={item.title} className="h-full w-full object-cover" whileHover={collectionHover(design, i)} transition={trans} /></div><div className="flex flex-col justify-between p-5"><div className="text-[10px] uppercase tracking-[.18em]" style={{ color: design.palette.muted }}>Collection {String(i + 1).padStart(2, "0")}</div><div className="mt-4 text-2xl font-semibold">{item.title}</div><div className="mt-4 flex items-center gap-2 text-xs">View edit <ChevronRight size={14} /></div></div></motion.a>)}</div>;
  } else if (["numberedEditorial", "minimalTextCollections", "categoryIndex"].includes(variant)) {
    body = <div className="divide-y border-y" style={{ borderColor: design.palette.border }}>{items.map((item, i) => <motion.a href="#" onClick={(e) => e.preventDefault()} key={item.title} className="group grid items-center gap-4 py-5 md:grid-cols-[60px_1fr_140px_40px]" whileHover={{ x: 4 }} transition={trans}><span className="text-xs" style={{ color: design.palette.muted }}>{String(i + 1).padStart(2, "0")}</span><span className="text-2xl font-semibold md:text-4xl">{item.title}</span><div className="hidden h-20 overflow-hidden md:block"><motion.img src={item.image} alt="" className="h-full w-full object-cover opacity-70" whileHover={{ scale: 1.04 }} transition={trans} /></div><ArrowRight size={18} className="opacity-40 group-hover:opacity-100" /></motion.a>)}</div>;
  } else {
    const poster = ["fullBleedTiles", "posterCollections", "oversizedTiles"].includes(variant);
    body = <div className={`grid gap-3 ${mobile ? "grid-cols-1" : poster ? "md:grid-cols-2" : "md:grid-cols-4"}`}>{items.map((item, i) => tile(item, i, poster ? "aspect-[16/10] md:aspect-[4/3]" : "aspect-[4/5]"))}</div>;
  }
  return <motion.section initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .12 }} transition={trans} style={{ maxWidth: max, margin: "0 auto", padding: pad(compact) }}><SectionIntro design={design} section={section} action="Explore all" />{body}</motion.section>;
}

function StoryV2({ design, section, max, compact, mobile }: IntelligentSectionRendererProps) {
  const variant = section.variant;
  const trans = transitionFor(design);
  const copy = <div><div className="text-[10px] font-semibold uppercase tracking-[.22em]" style={{ color: design.palette.accent }}>{section.eyebrow ?? "Brand story"}</div><h3 className="mt-4" style={{ fontFamily: design.typographyPair?.displayFamily ?? design.typography.heading, fontSize: "clamp(2.3rem,5vw,5.2rem)", lineHeight: .94, letterSpacing: `${design.typographyPair?.headingTracking ?? design.typography.headingTracking}em`, fontWeight: design.typographyPair?.headingWeight ?? design.typography.headingWeight }}>{section.title ?? design.store.promoTitle}</h3><p className="mt-5 max-w-xl text-sm leading-7" style={{ color: design.palette.muted, fontFamily: design.typographyPair?.bodyFamily ?? design.typography.body }}>{design.store.promoBody}</p><button className="sf-micro-button mt-6 inline-flex items-center gap-2 text-sm font-semibold">Read the story <ArrowRight size={15}/></button></div>;
  const image = <motion.img src={design.store.secondaryImage} alt={`${design.store.brandName} story`} className="h-full min-h-[360px] w-full object-cover" whileHover={design.interactionProfile?.density === "minimal" ? undefined : collectionHover(design, 0)} transition={trans} />;
  let body: ReactNode;
  if (["fullBleedStory", "scrollStory"].includes(variant)) body = <div className="relative min-h-[620px] overflow-hidden" style={{ borderRadius: mobile ? 0 : design.geometry.radius }}><img src={design.store.secondaryImage} alt="" className="absolute inset-0 h-full w-full object-cover"/><div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/30 to-transparent"/><div className="relative z-10 flex min-h-[620px] items-end p-7 text-white md:p-12"><div className="max-w-2xl">{copy}</div></div></div>;
  else if (variant === "oversizedQuoteImage") body = <div className={`grid gap-8 ${mobile ? "" : "md:grid-cols-[.9fr_1.1fr]"}`}><blockquote className="flex items-end text-4xl font-semibold leading-[.95] md:text-6xl" style={{ fontFamily: design.typographyPair?.displayFamily ?? design.typography.heading }}>“{design.store.promoTitle}”</blockquote><div className="overflow-hidden" style={{ borderRadius: design.geometry.radius }}>{image}</div></div>;
  else if (variant === "stickyStory") body = <div className={`grid gap-8 ${mobile ? "" : "md:grid-cols-[.8fr_1.2fr]"}`}><div className={mobile ? "" : "md:sticky md:top-24 md:self-start"}>{copy}</div><div className="space-y-4"><div className="overflow-hidden" style={{ borderRadius: design.geometry.radius }}>{image}</div><div className="grid grid-cols-2 gap-4">{design.store.products.slice(0,2).map((p) => <img key={p.name} src={p.image} alt={p.name} className="aspect-[4/3] w-full object-cover" style={{ borderRadius: Math.max(8, design.geometry.radius - 8) }}/>)}</div></div></div>;
  else if (variant === "timelineStory") body = <div className="grid gap-10 md:grid-cols-[.75fr_1.25fr]"><div>{copy}</div><div className="border-l pl-6" style={{ borderColor: design.palette.border }}>{["Origin","Material","Process","Today"].map((x,i)=><div key={x} className="relative pb-8"><span className="absolute -left-[29px] top-1 h-2 w-2 rounded-full" style={{ background: design.palette.primary }}/><div className="text-[10px] uppercase tracking-[.18em]" style={{ color: design.palette.muted }}>0{i+1}</div><div className="mt-2 text-xl font-semibold">{x}</div><p className="mt-2 text-sm leading-6" style={{ color: design.palette.muted }}>{i===0 ? design.store.heroBody : design.store.promoBody}</p></div>)}</div></div>;
  else if (["collageStory","magazineStory","overlappingStory"].includes(variant)) body = <div className={`grid gap-4 ${mobile ? "" : "grid-cols-12"}`}><div className={mobile ? "" : "col-span-7 row-span-2 overflow-hidden"} style={{ borderRadius: design.geometry.radius }}>{image}</div><div className={mobile ? "" : "col-span-5 p-5 md:p-8"}>{copy}</div><div className={mobile ? "hidden" : "col-span-4 col-start-9 -mt-12 overflow-hidden"} style={{ borderRadius: Math.max(8, design.geometry.radius - 8) }}><img src={design.store.heroImage} alt="" className="aspect-[4/3] w-full object-cover"/></div></div>;
  else if (variant === "minimalTextStory") body = <div className="mx-auto max-w-4xl py-10 text-center">{copy}</div>;
  else {
    const reversed = ["reversedEditorialSplit","textFirstStory"].includes(variant);
    body = <div className={`grid overflow-hidden border ${mobile ? "" : "md:grid-cols-2"}`} style={{ borderColor: design.palette.border, borderRadius: design.geometry.radius, background: design.palette.surface }}>{reversed ? <><div className="flex items-center p-7 md:p-12">{copy}</div><div className="overflow-hidden">{image}</div></> : <><div className="overflow-hidden">{image}</div><div className="flex items-center p-7 md:p-12">{copy}</div></>}</div>;
  }
  return <motion.section initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .12 }} transition={trans} style={{ maxWidth: ["fullBleedStory","scrollStory"].includes(variant) ? undefined : max, margin: "0 auto", padding: ["fullBleedStory","scrollStory"].includes(variant) ? `${compact ? 24 : 48}px 0` : pad(compact, 76, 44) }}>{body}</motion.section>;
}

function testimonialData(design: DesignGenome) {
  const noun = design.store.nicheLabel ?? design.store.category;
  return [
    { name: "Mara L.", role: "Verified customer", quote: `The ${noun} edit felt considered rather than overwhelming. The details made comparison easy.`, rating: 5 },
    { name: "Noah R.", role: "Repeat customer", quote: "The quality is clear before checkout and the product presentation feels genuinely premium.", rating: 5 },
    { name: "Iris T.", role: "Community member", quote: "Fast to browse, easy to understand, and the visual direction feels specific to the products.", rating: 5 },
    { name: "Avery K.", role: "Verified customer", quote: "I found what I wanted without digging through generic cards or repetitive sections.", rating: 5 },
  ];
}

function Stars({ count = 5, color }: { count?: number; color: string }) { return <div className="flex gap-1">{Array.from({length:count}).map((_,i)=><Star key={i} size={13} fill={color} color={color}/>)}</div>; }

function TestimonialsV2({ design, section, max, compact, mobile }: IntelligentSectionRendererProps) {
  const variant = section.variant;
  const data = testimonialData(design);
  let body: ReactNode;
  if (["quoteWall","minimalQuotes"].includes(variant)) body = <div className="divide-y border-y" style={{ borderColor: design.palette.border }}>{data.map((q,i)=><blockquote key={q.name} className="grid gap-4 py-7 md:grid-cols-[80px_1fr_180px]"><Quote size={22} style={{ color: design.palette.accent }}/><p className="text-2xl leading-snug md:text-3xl" style={{ fontFamily: design.typographyPair?.headingFamily ?? design.typography.heading }}>“{q.quote}”</p><footer className="text-xs" style={{ color: design.palette.muted }}>{q.name}<br/>{q.role}</footer></blockquote>)}</div>;
  else if (["featuredReview","largeQuote","customerSpotlight"].includes(variant)) { const q=data[0]; body=<div className={`grid items-center gap-7 ${mobile?"":"md:grid-cols-[.7fr_1.3fr]"}`}><div className="aspect-square overflow-hidden rounded-full bg-black/5"><img src={design.store.products[0]?.image ?? design.store.heroImage} alt="Customer spotlight" className="h-full w-full object-cover"/></div><div><Stars color={design.palette.accent}/><blockquote className="mt-5 text-4xl font-semibold leading-[1.05] md:text-6xl" style={{fontFamily:design.typographyPair?.displayFamily ?? design.typography.heading}}>“{q.quote}”</blockquote><div className="mt-6 text-sm" style={{color:design.palette.muted}}>{q.name} · {q.role}</div></div></div>; }
  else if (["splitReview","ratingSummary"].includes(variant)) body=<div className={`grid gap-6 ${mobile?"":"md:grid-cols-[.72fr_1.28fr]"}`}><div className="border p-7" style={{borderColor:design.palette.border,borderRadius:design.geometry.radius}}><div className="text-6xl font-semibold">4.9</div><Stars color={design.palette.accent}/><div className="mt-3 text-sm" style={{color:design.palette.muted}}>Based on 1,284 verified reviews</div></div><div className="grid gap-3">{data.slice(0,3).map(q=><blockquote key={q.name} className="border-b pb-4" style={{borderColor:design.palette.border}}><p className="text-lg">“{q.quote}”</p><div className="mt-2 text-xs" style={{color:design.palette.muted}}>{q.name}</div></blockquote>)}</div></div>;
  else if (["reviewCarousel","reviewTicker"].includes(variant)) body=<div className="flex snap-x gap-4 overflow-x-auto pb-3">{data.concat(data.slice(0,1)).map((q,i)=><blockquote key={`${q.name}-${i}`} className="min-w-[82%] snap-start border p-6 sm:min-w-[44%] lg:min-w-[31%]" style={{borderColor:design.palette.border,borderRadius:design.geometry.radius}}><Stars color={design.palette.accent}/><p className="mt-5 text-xl leading-8">“{q.quote}”</p><footer className="mt-5 text-xs" style={{color:design.palette.muted}}>{q.name} · {q.role}</footer></blockquote>)}</div>;
  else if (["reviewMasonry","socialReviewCards"].includes(variant)) body=<div className={`columns-1 gap-4 ${mobile?"":"md:columns-2 lg:columns-3"}`}>{data.map((q,i)=><blockquote key={q.name} className="mb-4 break-inside-avoid border p-5" style={{borderColor:design.palette.border,borderRadius:i%2?Math.max(8,design.geometry.radius-8):design.geometry.radius,background:design.palette.surface}}><Stars color={design.palette.accent}/><p className={`mt-4 ${i%2?"text-base":"text-2xl"} leading-7`}>“{q.quote}”</p><footer className="mt-4 text-xs" style={{color:design.palette.muted}}>{q.name}</footer></blockquote>)}</div>;
  else body=<div className={`grid gap-7 ${mobile?"":"md:grid-cols-2"}`}>{data.slice(0,2).map(q=><blockquote key={q.name}><div className="text-[10px] uppercase tracking-[.18em]" style={{color:design.palette.muted}}>{q.role}</div><p className="mt-3 text-3xl leading-tight" style={{fontFamily:design.typographyPair?.headingFamily ?? design.typography.heading}}>“{q.quote}”</p><div className="mt-5"><Stars color={design.palette.accent}/></div><footer className="mt-2 text-xs">{q.name}</footer></blockquote>)}</div>;
  return <section style={{maxWidth:max,margin:"0 auto",padding:pad(compact,72,44)}}><SectionIntro design={design} section={section}/>{body}</section>;
}

const faqItems = (design: DesignGenome) => {
  const category = design.store.nicheLabel ?? design.store.category;
  return [
    { group: "Shopping", q: `How do I choose the right ${category}?`, a: `Use the specifications, filters and comparison tools shown throughout this ${category} storefront.` },
    { group: "Delivery", q: "When will my order ship?", a: "In-stock products are prepared quickly. Delivery estimates and tracking appear before and after checkout." },
    { group: "Returns", q: "Can I return or exchange an item?", a: "Eligible items can be returned within the policy window. Product-specific exclusions are shown clearly before purchase." },
    { group: "Product", q: "Where can I find detailed specifications?", a: "Product pages surface category-specific dimensions, materials, compatibility, ingredients or performance details where relevant." },
    { group: "Support", q: "Can I get help before ordering?", a: "Yes. Product and order support remain accessible without interrupting the shopping flow." },
    { group: "Care", q: "How should I care for the product?", a: "Care, storage or maintenance guidance is included on relevant product pages and packaging." },
  ];
};

function FAQV2({ design, section, max, compact, mobile }: IntelligentSectionRendererProps) {
  const [active, setActive] = useState(0);
  const items = faqItems(design);
  const variant = section.variant;
  const details = (item: (typeof items)[number], i: number, boxed=false) => <details key={item.q} className={boxed?"border p-4":"border-b py-5"} style={{borderColor:design.palette.border,borderRadius:boxed?Math.max(8,design.geometry.radius-8):0}}><summary className="flex cursor-pointer list-none items-center justify-between gap-5 font-semibold"><span>{variant==="numberedFAQ"?<span className="mr-3 text-xs" style={{color:design.palette.muted}}>0{i+1}</span>:null}{item.q}</span><Plus size={16}/></summary><p className="mt-3 max-w-2xl text-sm leading-7" style={{color:design.palette.muted}}>{item.a}</p></details>;
  let body:ReactNode;
  if (variant === "twoColumnFAQ") body=<div className={`grid gap-x-10 ${mobile?"":"md:grid-cols-2"}`}>{items.map((x,i)=>details(x,i))}</div>;
  else if (variant === "sidebarFAQ") body=<div className={`grid gap-6 ${mobile?"":"md:grid-cols-[260px_1fr]"}`}><div className="space-y-1">{items.map((x,i)=><button key={x.q} onClick={()=>setActive(i)} className="w-full border-l-2 px-4 py-3 text-left text-sm" style={{borderColor:i===active?design.palette.primary:"transparent",color:i===active?design.palette.text:design.palette.muted}}>{x.q}</button>)}</div><div className="border-l p-6" style={{borderColor:design.palette.border}}><div className="text-3xl font-semibold">{items[active].q}</div><p className="mt-4 text-sm leading-7" style={{color:design.palette.muted}}>{items[active].a}</p></div></div>;
  else if (variant === "categoryFAQ") { const groups=[...new Set(items.map(x=>x.group))]; body=<div className="space-y-8">{groups.slice(0,3).map(g=><div key={g} className={`grid gap-5 ${mobile?"":"md:grid-cols-[180px_1fr]"}`}><div className="text-xs font-semibold uppercase tracking-[.18em]" style={{color:design.palette.muted}}>{g}</div><div>{items.filter(x=>x.group===g).map((x,i)=>details(x,i))}</div></div>)}</div>; }
  else if (["boxedFAQ","supportFAQ"].includes(variant)) body=<div className={`grid gap-3 ${mobile?"":"md:grid-cols-2"}`}>{items.map((x,i)=>details(x,i,true))}</div>;
  else if (["largeQuestionFAQ","editorialFAQ"].includes(variant)) body=<div className="divide-y" style={{borderColor:design.palette.border}}>{items.slice(0,5).map((x,i)=><details key={x.q} className="py-7"><summary className="cursor-pointer list-none text-2xl font-semibold md:text-4xl" style={{fontFamily:design.typographyPair?.headingFamily ?? design.typography.heading}}>{x.q}</summary><p className="mt-4 max-w-2xl text-sm leading-7" style={{color:design.palette.muted}}>{x.a}</p></details>)}</div>;
  else body=<div className={variant==="compactFAQ"?"max-w-3xl":"mx-auto max-w-4xl"}>{items.slice(0,variant==="compactFAQ"?4:6).map((x,i)=>details(x,i))}</div>;
  return <section style={{background:design.palette.surface,borderTop:`1px solid ${design.palette.border}`,borderBottom:`1px solid ${design.palette.border}`}}><div style={{maxWidth:max,margin:"0 auto",padding:pad(compact,76,44)}}><SectionIntro design={design} section={section}/>{body}</div></section>;
}

function SignupForm({ design, inline=false }: {design:DesignGenome;inline?:boolean}) { return <form onSubmit={e=>e.preventDefault()} className={`flex gap-3 ${inline?"flex-row":"flex-col sm:flex-row"}`}><input aria-label="Email address" placeholder="Email address" className="min-w-0 flex-1 border bg-transparent px-5 py-3.5 text-sm outline-none focus-visible:ring-2" style={{borderColor:design.palette.border,borderRadius:design.geometry.buttonRadius}}/><button className="sf-micro-button px-6 py-3.5 text-sm font-semibold" style={{background:design.palette.primary,color:design.palette.primaryText,borderRadius:design.geometry.buttonRadius}}>Subscribe</button></form>; }

function NewsletterV2({ design, section, max, compact, mobile }: IntelligentSectionRendererProps) {
  const v=section.variant;
  const heading=<><div className="text-[10px] font-semibold uppercase tracking-[.22em]" style={{color:design.palette.accent}}>{section.eyebrow??"Stay connected"}</div><h3 className="mt-3" style={{fontFamily:design.typographyPair?.displayFamily??design.typography.heading,fontSize:"clamp(2.2rem,5vw,5rem)",lineHeight:.92,fontWeight:design.typographyPair?.headingWeight??design.typography.headingWeight}}>{section.title??"Useful updates, new releases, no clutter."}</h3></>;
  if(v==="minimalInline"||v==="footerIntegrated") return <section style={{maxWidth:max,margin:"0 auto",padding:pad(compact,56,34),borderTop:`1px solid ${design.palette.border}`}}><div className={`grid items-end gap-5 ${mobile?"":"md:grid-cols-[1.1fr_.9fr]"}`}><div>{heading}</div><SignupForm design={design}/></div></section>;
  if(v==="fullWidthColor"||v==="darkSignup") return <section style={{background:v==="darkSignup"?design.palette.text:design.palette.primary,color:v==="darkSignup"?design.palette.primaryText:design.palette.primaryText}}><div className="mx-auto grid items-center gap-8 py-14 md:grid-cols-[1.1fr_.9fr]" style={{maxWidth:max,paddingLeft:compact?16:30,paddingRight:compact?16:30}}><div>{heading}</div><SignupForm design={design}/></div></section>;
  if(v==="imageSplit"||v==="sideSignup") return <section style={{maxWidth:max,margin:"0 auto",padding:pad(compact,68,40)}}><div className={`grid overflow-hidden border ${mobile?"":"md:grid-cols-2"}`} style={{borderColor:design.palette.border,borderRadius:design.geometry.radius}}><img src={design.store.secondaryImage} alt="Newsletter" className="h-full min-h-72 w-full object-cover"/><div className="flex flex-col justify-center p-7 md:p-10">{heading}<div className="mt-7"><SignupForm design={design}/></div></div></div></section>;
  if(v==="oversizedEditorial"||v==="magazineSignup") return <section style={{maxWidth:max,margin:"0 auto",padding:pad(compact,82,48)}}><div className="border-y py-10" style={{borderColor:design.palette.border}}>{heading}<div className="mt-8 max-w-2xl"><SignupForm design={design}/></div></div></section>;
  return <section style={{maxWidth:max,margin:"0 auto",padding:pad(compact,68,40)}}><div className="relative overflow-hidden p-7 md:p-10" style={{borderRadius:design.geometry.radius,background:design.palette.surface,border:`1px solid ${design.palette.border}`}}><div className="max-w-2xl">{heading}<div className="mt-7"><SignupForm design={design}/></div></div></div></section>;
}

function CampaignV2({ design, section, max, compact, mobile }: IntelligentSectionRendererProps) {
  const v=section.variant;
  const copy=<div><div className="text-[10px] font-semibold uppercase tracking-[.22em] opacity-60">{section.eyebrow??"Campaign"}</div><h3 className="mt-3 text-4xl font-semibold leading-[.92] md:text-7xl" style={{fontFamily:design.typographyPair?.displayFamily??design.typography.heading}}>{section.title??design.store.promoTitle}</h3><p className="mt-4 max-w-xl text-sm leading-7 opacity-70">{design.store.promoBody}</p><button className="sf-micro-button mt-6 bg-white px-5 py-3 text-sm font-semibold text-black" style={{borderRadius:design.geometry.buttonRadius}}>Shop the campaign</button></div>;
  if(v==="splitCampaign"||v==="textFirstCampaign") return <section style={{maxWidth:max,margin:"0 auto",padding:pad(compact,62,36)}}><div className={`grid overflow-hidden ${mobile?"":"md:grid-cols-2"}`} style={{background:design.palette.text,color:design.palette.primaryText,borderRadius:design.geometry.radius}}><div className="flex items-center p-7 md:p-10">{copy}</div><img src={design.store.secondaryImage} alt="Campaign" className="h-full min-h-[440px] w-full object-cover"/></div></section>;
  if(v==="collageCampaign") return <section style={{maxWidth:max,margin:"0 auto",padding:pad(compact,62,36)}}><div className={`grid gap-3 ${mobile?"":"grid-cols-12"}`}><div className="relative col-span-7 min-h-[560px] overflow-hidden" style={{borderRadius:design.geometry.radius}}><img src={design.store.heroImage} alt="" className="absolute inset-0 h-full w-full object-cover"/><div className="absolute inset-0 bg-black/35"/><div className="absolute inset-0 flex items-end p-7 text-white">{copy}</div></div><div className="col-span-5 grid gap-3"><img src={design.store.secondaryImage} alt="" className="h-[272px] w-full object-cover" style={{borderRadius:design.geometry.radius}}/><img src={design.store.products[0]?.image} alt="" className="h-[272px] w-full object-cover" style={{borderRadius:design.geometry.radius}}/></div></div></section>;
  if(v==="productCampaign") { const p=design.store.products[0]; return <section style={{maxWidth:max,margin:"0 auto",padding:pad(compact,62,36)}}><div className={`grid items-center gap-8 ${mobile?"":"md:grid-cols-[1.15fr_.85fr]"}`}><img src={p?.image??design.store.heroImage} alt={p?.name??"Product"} className="w-full object-cover" style={{borderRadius:design.geometry.radius,aspectRatio:"4/5"}}/><div>{copy}<div className="mt-6 text-3xl font-semibold">{p?.price}</div></div></div></section>; }
  if(v==="countdownCampaign") return <section style={{maxWidth:max,margin:"0 auto",padding:pad(compact,62,36)}}><div className="border p-7 md:p-10" style={{borderColor:design.palette.border,borderRadius:design.geometry.radius,background:design.palette.surface}}>{copy}<div className="mt-8 grid grid-cols-4 gap-2">{[["02","Days"],["14","Hours"],["38","Minutes"],["12","Seconds"]].map(([n,l])=><div key={l} className="border p-4 text-center" style={{borderColor:design.palette.border,borderRadius:Math.max(8,design.geometry.radius-10)}}><div className="text-3xl font-semibold">{n}</div><div className="mt-1 text-[9px] uppercase tracking-[.16em]" style={{color:design.palette.muted}}>{l}</div></div>)}</div></div></section>;
  return <section className="relative overflow-hidden" style={{minHeight:mobile?560:720}}><img src={design.store.secondaryImage} alt="Campaign" className="absolute inset-0 h-full w-full object-cover"/><div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/25 to-transparent"/><div className="relative mx-auto flex min-h-[inherit] items-end p-7 text-white md:p-12" style={{maxWidth:max}}>{copy}</div></section>;
}

function comparisonRows(category: DesignGenome["store"]["category"]) {
  if(category==="tech") return ["Display","Processor","Memory","Battery","Warranty"];
  if(category==="beauty") return ["Skin type","Finish","Coverage","Key ingredients","Routine step"];
  if(category==="home") return ["Dimensions","Material","Room","Finish","Delivery"];
  if(category==="food") return ["Weight","Origin","Flavor","Storage","Dietary"];
  if(category==="shoes") return ["Cushioning","Drop","Weight","Surface","Fit"];
  return ["Material","Use","Finish","Care","Delivery"];
}
function specValue(product:StoreProduct,key:string,index:number){ return product.specs?.[key] ?? Object.values(product.specs??{})[index] ?? ["Standard","Premium","Advanced","Included","Available"][index%5]; }

function ComparisonV2({ design, section, max, compact, mobile }: IntelligentSectionRendererProps) {
  const v=section.variant; const products=design.store.products.slice(0,3); const rows=comparisonRows(design.store.category);
  if(["classicTable","comparisonMatrix","technicalSpecs"].includes(v) && !mobile) return <section style={{maxWidth:max,margin:"0 auto",padding:pad(compact,72,44)}}><SectionIntro design={design} section={section}/><div className="overflow-hidden border" style={{borderColor:design.palette.border,borderRadius:design.geometry.radius}}><div className="grid" style={{gridTemplateColumns:`220px repeat(${products.length},1fr)`}}><div className="p-4"/>{products.map(p=><div key={p.name} className="border-l p-4" style={{borderColor:design.palette.border}}><img src={p.image} alt={p.name} className="mb-3 aspect-[4/3] w-full object-cover"/><div className="font-semibold">{p.name}</div><div className="mt-1 text-sm">{p.price}</div></div>)}{rows.map((row,ri)=><div key={row} className="contents"><div className="border-t p-4 text-xs font-semibold uppercase tracking-[.14em]" style={{borderColor:design.palette.border,color:design.palette.muted}}>{row}</div>{products.map((p,pi)=><div key={`${p.name}-${row}`} className="border-l border-t p-4 text-sm" style={{borderColor:design.palette.border}}>{specValue(p,row,ri+pi)}</div>)}</div>)}</div></div></section>;
  if(v==="pricingComparison") return <section style={{maxWidth:max,margin:"0 auto",padding:pad(compact,72,44)}}><SectionIntro design={design} section={section}/><div className={`grid gap-4 ${mobile?"":"md:grid-cols-3"}`}>{products.map((p,i)=><div key={p.name} className="border p-6" style={{borderColor:i===1?design.palette.primary:design.palette.border,borderWidth:i===1?2:1,borderRadius:design.geometry.radius}}><div className="text-[10px] uppercase tracking-[.18em]" style={{color:design.palette.muted}}>{p.tag}</div><div className="mt-3 text-2xl font-semibold">{p.name}</div><div className="mt-4 text-4xl font-semibold">{p.price}</div><div className="mt-6 space-y-3">{rows.slice(0,4).map((r,ri)=><div key={r} className="flex gap-2 text-sm"><Check size={16} style={{color:design.palette.accent}}/>{r}: {specValue(p,r,ri)}</div>)}</div></div>)}</div></section>;
  return <section style={{maxWidth:max,margin:"0 auto",padding:pad(compact,72,44)}}><SectionIntro design={design} section={section}/><div className={`flex gap-4 ${v==="horizontalComparison"?"overflow-x-auto pb-3":mobile?"flex-col":"grid md:grid-cols-3"}`}>{products.map((p,i)=><div key={p.name} className={`${v==="horizontalComparison"?"min-w-[78%] sm:min-w-[42%]":""} border p-5`} style={{borderColor:design.palette.border,borderRadius:design.geometry.radius,background:design.palette.surface}}><img src={p.image} alt={p.name} className="aspect-[4/3] w-full object-cover" style={{borderRadius:Math.max(8,design.geometry.radius-10)}}/><div className="mt-4 text-xl font-semibold">{p.name}</div><div className="mt-1 text-sm" style={{color:design.palette.muted}}>{p.subtitle}</div><div className="mt-4 text-2xl font-semibold">{p.price}</div></div>)}</div></section>;
}

function SocialProofV2({ design, section, max, compact, mobile }: IntelligentSectionRendererProps) {
  const v=section.variant;
  const socialContext = `${design.store.nicheLabel ?? design.store.brandName} ${design.artDirection?.mediaDirection ?? "customer community"}`.slice(0,72);
  const roleAwareSocial = Array.from({ length: 8 }, (_, i) => categoryImageUrl(design.store.category, (design.seed + i * 47) % 900, "social", `${socialContext} ${design.store.products[i % Math.max(1, design.store.products.length)]?.name ?? "community"}`.slice(0,80)));
  const imgs=[...roleAwareSocial,design.store.heroImage,design.store.secondaryImage].filter(Boolean).slice(0,10) as string[];
  if(v==="UGCMarquee"||v==="InstagramRail") return <section style={{padding:pad(compact,64,38),overflow:"hidden"}}><div style={{maxWidth:max,margin:"0 auto"}}><SectionIntro design={design} section={section} action="Follow"/></div><div className="flex snap-x gap-3 overflow-x-auto px-4 pb-3 md:px-8">{imgs.concat(imgs.slice(0,3)).map((img,i)=><div key={`${img}-${i}`} className="min-w-[52%] snap-start sm:min-w-[28%] lg:min-w-[18%]"><img src={img} alt="Community" className="aspect-[4/5] w-full object-cover" style={{borderRadius:Math.max(6,design.geometry.radius-10)}}/></div>)}</div></section>;
  if(v==="phoneStyleStories") return <section style={{maxWidth:max,margin:"0 auto",padding:pad(compact,64,38)}}><SectionIntro design={design} section={section}/><div className="flex gap-3 overflow-x-auto pb-3">{imgs.slice(0,7).map((img,i)=><div key={`${img}-${i}`} className="min-w-[120px] text-center"><div className="mx-auto h-28 w-20 overflow-hidden rounded-[24px] border-2" style={{borderColor:design.palette.accent}}><img src={img} alt="Story" className="h-full w-full object-cover"/></div><div className="mt-2 text-[10px]">Story {i+1}</div></div>)}</div></section>;
  if(v==="creatorSpotlight") return <section style={{maxWidth:max,margin:"0 auto",padding:pad(compact,64,38)}}><div className={`grid gap-6 ${mobile?"":"md:grid-cols-[1.1fr_.9fr]"}`}><img src={imgs[0]} alt="Creator" className="min-h-[480px] w-full object-cover" style={{borderRadius:design.geometry.radius}}/><div className="flex flex-col justify-center"><div className="text-[10px] uppercase tracking-[.18em]" style={{color:design.palette.accent}}>Creator spotlight</div><div className="mt-4 text-4xl font-semibold">How the community styles {design.store.brandName}.</div><p className="mt-4 text-sm leading-7" style={{color:design.palette.muted}}>Real-world inspiration presented as a focused story instead of another generic card grid.</p></div></div></section>;
  const masonry=["socialMasonry","floatingUGC","customerGallery","communityWall"].includes(v);
  return <section style={{maxWidth:max,margin:"0 auto",padding:pad(compact,64,38)}}><SectionIntro design={design} section={section} action="Follow"/><div className={masonry&&!mobile?"columns-3 gap-3":"grid grid-cols-2 gap-3 md:grid-cols-5"}>{imgs.slice(0,10).map((img,i)=><img key={`${img}-${i}`} src={img} alt="Community" className={`${masonry?"mb-3 break-inside-avoid":""} w-full object-cover`} style={{aspectRatio:masonry?i%3===0?"4/5":"1/1":"1/1",borderRadius:Math.max(6,design.geometry.radius-10)}}/>)}</div></section>;
}

function FeaturesV2({ design, section, max, compact, mobile }: IntelligentSectionRendererProps) {
  const v=section.variant;
  const items = design.store.category === "tech" ? [["Fast performance","Optimized processing and responsive workflows."],["Compatibility","Clear support for the devices and standards that matter."],["Warranty","Simple coverage and support expectations."],["Setup","Useful configuration guidance without clutter."]] : design.store.category === "home" ? [["Material","Useful material and finish details."],["Dimensions","Sizing information placed before checkout."],["Delivery","Clear expectations for large-item delivery."],["Care","Practical maintenance guidance."]] : [["Fast dispatch","Clear delivery expectations."],["Easy returns","Straightforward post-purchase policies."],["Secure checkout","Focused and trustworthy checkout cues."],["Real support","Help remains easy to find."]];
  if(v==="horizontalFeatures"||v==="minimalFeatureStrip") return <section style={{borderTop:`1px solid ${design.palette.border}`,borderBottom:`1px solid ${design.palette.border}`}}><div className={`mx-auto grid ${mobile?"grid-cols-2":"md:grid-cols-4"}`} style={{maxWidth:max}}>{items.map(([t,b],i)=><div key={t} className="border-r p-5 last:border-r-0" style={{borderColor:design.palette.border}}><div className="text-[10px]" style={{color:design.palette.accent}}>0{i+1}</div><div className="mt-2 font-semibold">{t}</div><div className="mt-1 text-xs leading-5" style={{color:design.palette.muted}}>{b}</div></div>)}</div></section>;
  if(v==="alternatingFeatures"||v==="featureTimeline") return <section style={{maxWidth:max,margin:"0 auto",padding:pad(compact,68,40)}}><SectionIntro design={design} section={section}/><div className="space-y-0">{items.map(([t,b],i)=><div key={t} className={`grid gap-5 border-t py-6 ${mobile?"":"md:grid-cols-[100px_1fr_1fr]"}`} style={{borderColor:design.palette.border}}><div className="text-xs" style={{color:design.palette.muted}}>0{i+1}</div><div className="text-2xl font-semibold">{t}</div><p className="text-sm leading-6" style={{color:design.palette.muted}}>{b}</p></div>)}</div></section>;
  if(v==="largeFeatureCards"||v==="visualFeatureGrid") return <section style={{maxWidth:max,margin:"0 auto",padding:pad(compact,68,40)}}><SectionIntro design={design} section={section}/><div className={`grid gap-4 ${mobile?"":"md:grid-cols-2"}`}>{items.map(([t,b],i)=><div key={t} className="min-h-[230px] border p-6" style={{borderColor:design.palette.border,borderRadius:design.geometry.radius,background:i%2?design.palette.surface:design.palette.elevated}}><div className="text-[10px] uppercase tracking-[.18em]" style={{color:design.palette.accent}}>Feature {i+1}</div><div className="mt-8 text-3xl font-semibold">{t}</div><p className="mt-3 max-w-md text-sm leading-6" style={{color:design.palette.muted}}>{b}</p></div>)}</div></section>;
  return <section style={{maxWidth:max,margin:"0 auto",padding:pad(compact,68,40)}}><SectionIntro design={design} section={section}/><div className={`grid gap-3 ${mobile?"grid-cols-1":"md:grid-cols-4"}`}>{items.map(([t,b],i)=><div key={t} className="border p-5" style={{borderColor:design.palette.border,borderRadius:Math.max(8,design.geometry.radius-6)}}><div className="flex h-9 w-9 items-center justify-center rounded-full" style={{background:design.palette.primary,color:design.palette.primaryText}}>{i+1}</div><div className="mt-5 text-lg font-semibold">{t}</div><p className="mt-2 text-xs leading-6" style={{color:design.palette.muted}}>{b}</p></div>)}</div></section>;
}
