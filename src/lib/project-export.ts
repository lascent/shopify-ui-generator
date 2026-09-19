import type { DesignGenome } from "@/types/design";

export type ProjectExportBundle = {
  schemaVersion: "2.0";
  generatedAt: string;
  name: string;
  designId: string;
  files: Record<string, string>;
};

function safeName(value: string) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "generated-store";
}

function escapeTemplate(value: string) {
  return value.replace(/`/g, "\\`").replace(/\$\{/g, "\\${");
}

function liquidString(value: string) {
  return JSON.stringify(value.replace(/\r?\n/g, " "));
}

function tokensCss(design: DesignGenome) {
  return `:root {
  --shop-bg: ${design.palette.background};
  --shop-surface: ${design.palette.surface};
  --shop-elevated: ${design.palette.elevated};
  --shop-text: ${design.palette.text};
  --shop-muted: ${design.palette.muted};
  --shop-primary: ${design.palette.primary};
  --shop-primary-text: ${design.palette.primaryText};
  --shop-accent: ${design.palette.accent};
  --shop-border: ${design.palette.border};
  --shop-radius: ${design.geometry.radius}px;
  --shop-button-radius: ${design.geometry.buttonRadius}px;
  --shop-font: ${design.typography.body};
  --shop-motion: ${design.motion.duration}s;
}
`;
}

function reactStorefront(design: DesignGenome) {
  return `import design from "./design.json";
import "./tokens.css";

export default function GeneratedStorefront() {
  return (
    <main style={{ background: "var(--shop-bg)", color: "var(--shop-text)", minHeight: "100vh", fontFamily: "var(--shop-font)" }}>
      <header style={{ padding: 24, borderBottom: "1px solid var(--shop-border)" }}>
        <strong>${escapeTemplate(design.store.brandName)}</strong>
      </header>
      <section style={{ padding: "clamp(48px, 8vw, 120px) 24px" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <p>${escapeTemplate(design.store.heroKicker)}</p>
          <h1 style={{ fontSize: "clamp(3rem, 8vw, 7rem)", maxWidth: 900 }}>${escapeTemplate(design.store.heroTitle)}</h1>
          <p style={{ maxWidth: 620 }}>${escapeTemplate(design.store.heroBody)}</p>
          <button style={{ background: "var(--shop-primary)", color: "var(--shop-primary-text)", borderRadius: "var(--shop-button-radius)", padding: "14px 20px", border: 0 }}>${escapeTemplate(design.store.cta)}</button>
        </div>
      </section>
    </main>
  );
}
`;
}

function shopifyBaseCss(design: DesignGenome) {
  return `${tokensCss(design)}
*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;background:var(--shop-bg);color:var(--shop-text);font-family:var(--shop-font),system-ui,sans-serif}a{color:inherit;text-decoration:none}img{display:block;max-width:100%;height:auto}.page-width{width:min(1240px,calc(100% - 40px));margin-inline:auto}.shop-button{display:inline-flex;align-items:center;justify-content:center;min-height:46px;padding:0 20px;border:0;border-radius:var(--shop-button-radius);background:var(--shop-primary);color:var(--shop-primary-text);font:inherit;font-weight:700;cursor:pointer}.generated-header{position:sticky;top:0;z-index:40;border-bottom:1px solid var(--shop-border);background:color-mix(in srgb,var(--shop-bg) 90%,transparent);backdrop-filter:blur(16px)}.generated-header__inner{min-height:70px;display:flex;align-items:center;justify-content:space-between;gap:24px}.generated-header__nav{display:flex;gap:22px;flex-wrap:wrap;font-size:.88rem}.generated-hero{padding:clamp(72px,10vw,150px) 0}.generated-hero__grid{display:grid;grid-template-columns:minmax(0,1.05fr) minmax(320px,.95fr);align-items:center;gap:clamp(32px,6vw,88px)}.generated-hero h1{font-size:clamp(3rem,7vw,7.5rem);line-height:.92;letter-spacing:-.055em;margin:.12em 0 .28em}.generated-hero__body{max-width:650px;color:var(--shop-muted);font-size:clamp(1rem,1.7vw,1.2rem);line-height:1.6}.generated-hero__media{min-height:520px;border-radius:var(--shop-radius);overflow:hidden;background:var(--shop-surface)}.generated-hero__media img{width:100%;height:100%;min-height:520px;object-fit:cover}.generated-grid{padding:clamp(56px,8vw,110px) 0}.generated-grid__head{display:flex;align-items:end;justify-content:space-between;gap:24px;margin-bottom:30px}.generated-grid__products{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:22px}.product-card__media{aspect-ratio:4/5;border-radius:var(--shop-radius);overflow:hidden;background:var(--shop-surface)}.product-card__media img{width:100%;height:100%;object-fit:cover;transition:transform var(--shop-motion) ease}.product-card:hover .product-card__media img{transform:scale(1.025)}.product-card__meta{padding-top:14px}.product-card__title{font-weight:700}.product-card__price{margin-top:5px;color:var(--shop-muted)}.generated-footer{border-top:1px solid var(--shop-border);padding:54px 0}.generated-footer__grid{display:grid;grid-template-columns:2fr repeat(3,1fr);gap:32px}.main-product{padding:60px 0}.main-product__grid{display:grid;grid-template-columns:1.1fr .9fr;gap:56px}.main-product__gallery{display:grid;gap:14px}.main-product__gallery img{width:100%;border-radius:var(--shop-radius);background:var(--shop-surface)}.main-product__info{position:sticky;top:100px;align-self:start}.main-product select,.main-product input[type=number]{width:100%;min-height:46px;border:1px solid var(--shop-border);background:var(--shop-surface);color:var(--shop-text);border-radius:12px;padding:10px;margin:10px 0}.collection-toolbar{display:flex;justify-content:space-between;gap:16px;align-items:center;margin:24px 0}.cart-drawer{position:fixed;inset:0;z-index:80;pointer-events:none}.cart-drawer[open]{pointer-events:auto}.cart-drawer__overlay{position:absolute;inset:0;background:#0008}.cart-drawer__panel{position:absolute;right:0;top:0;height:100%;width:min(440px,92vw);background:var(--shop-bg);padding:26px;overflow:auto}.cart-drawer:not([open]){display:none}.shopify-section{min-width:0}@media(max-width:900px){.generated-header__nav{display:none}.generated-hero__grid,.main-product__grid{grid-template-columns:1fr}.generated-hero__media,.generated-hero__media img{min-height:380px}.generated-grid__products{grid-template-columns:repeat(2,minmax(0,1fr))}.generated-footer__grid{grid-template-columns:1fr 1fr}.main-product__info{position:static}}@media(max-width:560px){.page-width{width:min(100% - 28px,1240px)}.generated-grid__products{grid-template-columns:1fr 1fr;gap:12px}.generated-footer__grid{grid-template-columns:1fr}.generated-hero{padding:56px 0}.generated-hero h1{font-size:clamp(2.7rem,14vw,4.5rem)}}@media(prefers-reduced-motion:reduce){*,*::before,*::after{scroll-behavior:auto!important;animation-duration:.01ms!important;transition-duration:.01ms!important}}
`;
}

function shopifyThemeJs() {
  return `(() => {
  const drawer = document.querySelector('[data-cart-drawer]');
  const countNodes = document.querySelectorAll('[data-cart-count]');
  const setDrawer = (open) => drawer && (open ? drawer.setAttribute('open','') : drawer.removeAttribute('open'));
  document.addEventListener('click', (event) => {
    const target = event.target.closest('[data-cart-open],[data-cart-close]');
    if (!target) return;
    if (target.matches('[data-cart-open]')) setDrawer(true);
    if (target.matches('[data-cart-close]')) setDrawer(false);
  });
  document.addEventListener('submit', async (event) => {
    const form = event.target.closest('form[action="/cart/add"]');
    if (!form) return;
    event.preventDefault();
    const response = await fetch('/cart/add.js', { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
    if (!response.ok) return form.submit();
    const cart = await fetch('/cart.js').then((r) => r.json());
    countNodes.forEach((node) => { node.textContent = String(cart.item_count); });
    setDrawer(true);
  });
})();`;
}

function shopifyThemeLayout(design: DesignGenome) {
  return `<!doctype html>
<html class="no-js" lang="{{ request.locale.iso_code }}">
  <head>
    <meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
    <title>{{ page_title }}{% unless page_title contains shop.name %} · {{ shop.name }}{% endunless %}</title>
    {{ content_for_header }}
    {{ 'base.css' | asset_url | stylesheet_tag }}
  </head>
  <body>
    <a class="visually-hidden" href="#MainContent">Skip to content</a>
    <main id="MainContent" role="main">{{ content_for_layout }}</main>
    {% render 'cart-drawer' %}
    <script src="{{ 'theme.js' | asset_url }}" defer="defer"></script>
  </body>
</html>`;
}

function shopifyHeader(design: DesignGenome) {
  return `<header class="generated-header">
  <div class="page-width generated-header__inner">
    <a href="{{ routes.root_url }}" aria-label="{{ shop.name }}">{% if section.settings.logo != blank %}{{ section.settings.logo | image_url: width: 360 | image_tag: widths: '120,180,240,360' }}{% else %}<strong>{{ section.settings.brand_name | default: shop.name }}</strong>{% endif %}</a>
    <nav class="generated-header__nav" aria-label="Primary navigation">{% for link in section.settings.menu.links %}<a href="{{ link.url }}">{{ link.title }}</a>{% endfor %}</nav>
    <button type="button" data-cart-open class="shop-button" aria-label="Open cart">Cart <span data-cart-count>{{ cart.item_count }}</span></button>
  </div>
</header>
{% schema %}
{"name":"Generated header","settings":[{"type":"text","id":"brand_name","label":"Brand name","default":${liquidString(design.store.brandName)}},{"type":"image_picker","id":"logo","label":"Logo"},{"type":"link_list","id":"menu","label":"Menu","default":"main-menu"}],"presets":[{"name":"Generated header"}]}
{% endschema %}`;
}

function shopifyHero(design: DesignGenome) {
  return `<section class="generated-hero generated-hero--${safeName(design.layout.hero)}">
  <div class="page-width generated-hero__grid">
    <div><p>{{ section.settings.eyebrow }}</p><h1>{{ section.settings.heading }}</h1><p class="generated-hero__body">{{ section.settings.body }}</p><a class="shop-button" href="{{ section.settings.button_link | default: routes.all_products_collection_url }}">{{ section.settings.button_label }}</a></div>
    <div class="generated-hero__media">{% if section.settings.image != blank %}{{ section.settings.image | image_url: width: 1800 | image_tag: widths: '600,900,1200,1800', loading: 'eager' }}{% else %}<img src=${liquidString(design.store.heroImage)} alt="${escapeTemplate(design.store.nicheLabel ?? design.store.heroTitle)}">{% endif %}</div>
  </div>
</section>
{% schema %}
{"name":"Generated hero","settings":[{"type":"text","id":"eyebrow","label":"Eyebrow","default":${liquidString(design.store.heroKicker)}},{"type":"text","id":"heading","label":"Heading","default":${liquidString(design.store.heroTitle)}},{"type":"textarea","id":"body","label":"Body","default":${liquidString(design.store.heroBody)}},{"type":"text","id":"button_label","label":"Button label","default":${liquidString(design.store.cta)}},{"type":"url","id":"button_link","label":"Button link"},{"type":"image_picker","id":"image","label":"Hero image"}],"presets":[{"name":"Generated hero"}]}
{% endschema %}`;
}

function productCardSnippet() {
  return `<article class="product-card">
  <a href="{{ product.url }}">
    <div class="product-card__media">{% if product.featured_image %}{{ product.featured_image | image_url: width: 900 | image_tag: loading: 'lazy', widths: '360,540,720,900' }}{% endif %}</div>
    <div class="product-card__meta"><div class="product-card__title">{{ product.title }}</div>{% render 'price', product: product %}</div>
  </a>
</article>`;
}

function priceSnippet() {
  return `<div class="product-card__price">{% if product.compare_at_price > product.price %}<s>{{ product.compare_at_price | money }}</s> {% endif %}<span>{{ product.price | money }}</span></div>`;
}

function productGridSection(design: DesignGenome) {
  return `<section class="generated-grid"><div class="page-width"><div class="generated-grid__head"><div><p>{{ section.settings.eyebrow }}</p><h2>{{ section.settings.heading }}</h2></div><a href="{{ section.settings.collection.url }}">View all</a></div><div class="generated-grid__products">{% assign source_collection = section.settings.collection | default: collections.all %}{% for product in source_collection.products limit: section.settings.products_to_show %}{% render 'product-card', product: product %}{% else %}<p>Add products to this collection to populate the generated grid.</p>{% endfor %}</div></div></section>
{% schema %}
{"name":"Generated product grid","settings":[{"type":"text","id":"eyebrow","label":"Eyebrow","default":"CURATED FOR YOU"},{"type":"text","id":"heading","label":"Heading","default":${liquidString(design.store.nicheLabel ? `Shop ${design.store.nicheLabel}` : "Featured products")}},{"type":"collection","id":"collection","label":"Collection"},{"type":"range","id":"products_to_show","label":"Products to show","min":4,"max":12,"step":1,"default":8}],"presets":[{"name":"Generated product grid"}]}
{% endschema %}`;
}

function shopifyFooter(design: DesignGenome) {
  return `<footer class="generated-footer"><div class="page-width generated-footer__grid"><div><strong>{{ section.settings.heading }}</strong><p>{{ section.settings.body }}</p></div>{% for block in section.blocks %}<div {{ block.shopify_attributes }}><strong>{{ block.settings.heading }}</strong>{% for link in block.settings.menu.links %}<div><a href="{{ link.url }}">{{ link.title }}</a></div>{% endfor %}</div>{% endfor %}</div></footer>
{% schema %}
{"name":"Generated footer","settings":[{"type":"text","id":"heading","label":"Heading","default":${liquidString(design.store.brandName)}},{"type":"textarea","id":"body","label":"Body","default":${liquidString(design.store.promoBody)}}],"blocks":[{"type":"menu","name":"Menu","settings":[{"type":"text","id":"heading","label":"Heading","default":"Explore"},{"type":"link_list","id":"menu","label":"Menu"}]}],"max_blocks":3,"presets":[{"name":"Generated footer","blocks":[{"type":"menu"},{"type":"menu"}]}]}
{% endschema %}`;
}

function mainProductSection() {
  return `<section class="main-product"><div class="page-width main-product__grid"><div class="main-product__gallery">{% for image in product.images limit: 6 %}{{ image | image_url: width: 1400 | image_tag: loading: 'lazy', widths: '600,900,1200,1400' }}{% endfor %}</div><div class="main-product__info"><p>{{ product.vendor }}</p><h1>{{ product.title }}</h1>{% render 'price', product: product %}<div>{{ product.description }}</div>{% form 'product', product %}<label for="Variant-{{ section.id }}">Variant</label><select id="Variant-{{ section.id }}" name="id">{% for variant in product.variants %}<option value="{{ variant.id }}" {% unless variant.available %}disabled{% endunless %}>{{ variant.title }} — {{ variant.price | money }}</option>{% endfor %}</select><label for="Quantity-{{ section.id }}">Quantity</label><input id="Quantity-{{ section.id }}" type="number" name="quantity" min="1" value="1"><button class="shop-button" type="submit" {% unless product.available %}disabled{% endunless %}>{% if product.available %}Add to cart{% else %}Sold out{% endif %}</button>{% endform %}</div></div></section>
{% schema %}{"name":"Main product","settings":[]}{% endschema %}`;
}

function mainCollectionSection() {
  return `<section class="generated-grid"><div class="page-width"><h1>{{ collection.title }}</h1><div class="collection-toolbar"><p>{{ collection.products_count }} products</p><form><label for="SortBy">Sort</label><select id="SortBy" name="sort_by" onchange="this.form.submit()">{% for option in collection.sort_options %}<option value="{{ option.value }}" {% if option.value == collection.sort_by %}selected{% endif %}>{{ option.name }}</option>{% endfor %}</select></form></div><div class="generated-grid__products">{% paginate collection.products by 24 %}{% for product in collection.products %}{% render 'product-card', product: product %}{% endfor %}{{ paginate | default_pagination }}{% endpaginate %}</div></div></section>
{% schema %}{"name":"Main collection grid","settings":[]}{% endschema %}`;
}

function mainSearchSection() {
  return `<section class="generated-grid"><div class="page-width"><h1>Search</h1><form action="{{ routes.search_url }}" method="get"><input type="search" name="q" value="{{ search.terms | escape }}" placeholder="Search products"><button class="shop-button" type="submit">Search</button></form>{% if search.performed %}<div class="generated-grid__products">{% for item in search.results %}{% if item.object_type == 'product' %}{% render 'product-card', product: item %}{% endif %}{% endfor %}</div>{% endif %}</div></section>
{% schema %}{"name":"Main search","settings":[]}{% endschema %}`;
}

function mainCartSection() {
  return `<section class="generated-grid"><div class="page-width"><h1>Cart</h1><form action="{{ routes.cart_url }}" method="post">{% for item in cart.items %}<div style="display:grid;grid-template-columns:90px 1fr auto;gap:16px;align-items:center;padding:16px 0;border-bottom:1px solid var(--shop-border)">{{ item.image | image_url: width: 180 | image_tag }}<div><a href="{{ item.url }}"><strong>{{ item.product.title }}</strong></a><div>{{ item.variant.title }}</div><input type="number" name="updates[]" value="{{ item.quantity }}" min="0"></div><strong>{{ item.final_line_price | money }}</strong></div>{% endfor %}<p><strong>Subtotal {{ cart.total_price | money }}</strong></p><button class="shop-button" type="submit" name="update">Update cart</button> <button class="shop-button" type="submit" name="checkout">Checkout</button></form></div></section>
{% schema %}{"name":"Main cart items","settings":[]}{% endschema %}`;
}

function mainPageSection() {
  return `<section class="generated-grid"><div class="page-width" style="max-width:850px"><h1>{{ page.title }}</h1><div>{{ page.content }}</div></div></section>
{% schema %}{"name":"Main page","settings":[]}{% endschema %}`;
}

function cartDrawerSnippet() {
  return `<aside class="cart-drawer" data-cart-drawer aria-label="Cart drawer"><button class="cart-drawer__overlay" data-cart-close aria-label="Close cart"></button><div class="cart-drawer__panel"><div style="display:flex;justify-content:space-between;align-items:center"><h2>Your cart</h2><button type="button" data-cart-close>Close</button></div><p>Cart updated. <a href="{{ routes.cart_url }}"><strong>View cart</strong></a> or continue shopping.</p></div></aside>`;
}

function shopifySettings(design: DesignGenome) {
  return JSON.stringify([
    { name: "Generated theme", settings: [
      { type: "color", id: "background", label: "Background", default: design.palette.background },
      { type: "color", id: "text", label: "Text", default: design.palette.text },
      { type: "color", id: "primary", label: "Primary", default: design.palette.primary },
      { type: "range", id: "radius", label: "Radius", min: 0, max: 32, step: 1, default: Math.max(0, Math.min(32, design.geometry.radius)) },
    ] },
  ], null, 2);
}

function shopifyTemplate(sectionType: string) {
  return JSON.stringify({ sections: { main: { type: sectionType, settings: {} } }, order: ["main"] }, null, 2);
}

function indexTemplate() {
  return JSON.stringify({
    sections: {
      header: { type: "generated-header", settings: {} },
      hero: { type: "generated-home", settings: {} },
      products: { type: "generated-product-grid", settings: {} },
      footer: { type: "generated-footer", settings: {} },
    },
    order: ["header", "hero", "products", "footer"],
  }, null, 2);
}

function multiPageManifest(design: DesignGenome) {
  return JSON.stringify({
    home: { path: "/", title: design.store.brandName },
    collection: { path: "/collections/all", title: design.store.nicheLabel ?? "Shop all" },
    product: { path: "/products/featured", title: design.store.products[0]?.name ?? "Featured product" },
    search: { path: "/search", title: "Search" }, cart: { path: "/cart", title: "Cart" },
    about: { path: "/pages/about", title: "About" }, contact: { path: "/pages/contact", title: "Contact" }, faq: { path: "/pages/faq", title: "FAQ" },
  }, null, 2);
}

function reactGeneratedPages(design: DesignGenome) {
  return `import design from "../design/design.json";
export const generatedPages = {
  home: { path: "/", title: design.store.brandName },
  collection: { path: "/collections/all", title: design.store.nicheLabel ?? "Shop all" },
  product: { path: "/products/featured", title: design.store.products?.[0]?.name ?? "Featured product" },
  search: { path: "/search", title: "Search" }, cart: { path: "/cart", title: "Cart" },
  about: { path: "/pages/about", title: "About" }, contact: { path: "/pages/contact", title: "Contact" }, faq: { path: "/pages/faq", title: "FAQ" },
} as const;
export type GeneratedPageKey = keyof typeof generatedPages;
`;
}

export function buildProjectExport(design: DesignGenome): ProjectExportBundle {
  const slug = safeName(design.store.brandName);
  return {
    schemaVersion: "2.0",
    generatedAt: new Date().toISOString(), name: slug, designId: design.id,
    files: {
      "design/design.json": JSON.stringify(design, null, 2),
      "design/tokens.css": tokensCss(design),
      "design/pages.json": multiPageManifest(design),
      "src/GeneratedStorefront.tsx": reactStorefront(design),
      "src/generated-pages.ts": reactGeneratedPages(design),
      "shopify/layout/theme.liquid": shopifyThemeLayout(design),
      "shopify/assets/base.css": shopifyBaseCss(design),
      "shopify/assets/theme.js": shopifyThemeJs(),
      "shopify/sections/generated-header.liquid": shopifyHeader(design),
      "shopify/sections/generated-home.liquid": shopifyHero(design),
      "shopify/sections/generated-product-grid.liquid": productGridSection(design),
      "shopify/sections/generated-footer.liquid": shopifyFooter(design),
      "shopify/sections/main-product.liquid": mainProductSection(),
      "shopify/sections/main-collection-product-grid.liquid": mainCollectionSection(),
      "shopify/sections/main-search.liquid": mainSearchSection(),
      "shopify/sections/main-cart-items.liquid": mainCartSection(),
      "shopify/sections/main-page.liquid": mainPageSection(),
      "shopify/snippets/product-card.liquid": productCardSnippet(),
      "shopify/snippets/price.liquid": priceSnippet(),
      "shopify/snippets/cart-drawer.liquid": cartDrawerSnippet(),
      "shopify/config/settings_schema.json": shopifySettings(design),
      "shopify/config/settings_data.json": JSON.stringify({ current: { settings: {} }, presets: {} }, null, 2),
      "shopify/templates/index.json": indexTemplate(),
      "shopify/templates/collection.generated.json": shopifyTemplate("main-collection-product-grid"),
      "shopify/templates/product.generated.json": shopifyTemplate("main-product"),
      "shopify/templates/search.json": shopifyTemplate("main-search"),
      "shopify/templates/cart.json": shopifyTemplate("main-cart-items"),
      "shopify/templates/page.about.json": shopifyTemplate("main-page"),
      "shopify/templates/page.contact.json": shopifyTemplate("main-page"),
      "shopify/templates/page.faq.json": shopifyTemplate("main-page"),
      "shopify/locales/en.default.json": JSON.stringify({ general: { accessibility: { skip_to_content: "Skip to content" } }, products: { product: { add_to_cart: "Add to cart", sold_out: "Sold out" } } }, null, 2),
      "README.md": `# ${design.store.brandName} export\n\nGenerated by Shopify UI Generator.\n\nThe project bundle includes the design genome, tokens, React starter, eight-page manifest, and a Shopify OS 2.0 theme implementation with Liquid sections, product/collection bindings, variant forms, cart interactions, responsive CSS, snippets, templates and Theme Editor schema.\n`,
    },
  };
}

export function downloadProjectExport(design: DesignGenome) {
  const bundle = buildProjectExport(design);
  const blob = new Blob([JSON.stringify(bundle, null, 2)], { type: "application/json" });
  downloadBlob(blob, `${bundle.name}-project-export-v2.json`);
}

function crc32(bytes: Uint8Array) {
  let crc = 0xffffffff;
  for (const byte of bytes) {
    crc ^= byte;
    for (let bit = 0; bit < 8; bit += 1) crc = (crc >>> 1) ^ ((crc & 1) ? 0xedb88320 : 0);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function u16(value: number) { const out = new Uint8Array(2); new DataView(out.buffer).setUint16(0, value, true); return out; }
function u32(value: number) { const out = new Uint8Array(4); new DataView(out.buffer).setUint32(0, value >>> 0, true); return out; }
function concatBytes(parts: Uint8Array[]) { const size = parts.reduce((sum, part) => sum + part.length, 0); const out = new Uint8Array(size); let offset = 0; for (const part of parts) { out.set(part, offset); offset += part.length; } return out; }

function createStoredZip(files: Record<string, string>) {
  const encoder = new TextEncoder();
  const localParts: Uint8Array[] = [];
  const centralParts: Uint8Array[] = [];
  let offset = 0;
  let count = 0;
  for (const [name, content] of Object.entries(files)) {
    const nameBytes = encoder.encode(name.replace(/^\/+/, ""));
    const data = encoder.encode(content);
    const crc = crc32(data);
    const local = concatBytes([u32(0x04034b50), u16(20), u16(0x0800), u16(0), u16(0), u16(0), u32(crc), u32(data.length), u32(data.length), u16(nameBytes.length), u16(0), nameBytes, data]);
    localParts.push(local);
    const central = concatBytes([u32(0x02014b50), u16(20), u16(20), u16(0x0800), u16(0), u16(0), u16(0), u32(crc), u32(data.length), u32(data.length), u16(nameBytes.length), u16(0), u16(0), u16(0), u16(0), u32(0), u32(offset), nameBytes]);
    centralParts.push(central);
    offset += local.length;
    count += 1;
  }
  const centralData = concatBytes(centralParts);
  const end = concatBytes([u32(0x06054b50), u16(0), u16(0), u16(count), u16(count), u32(centralData.length), u32(offset), u16(0)]);
  return new Blob([...localParts, centralData, end], { type: "application/zip" });
}

export function downloadShopifyTheme(design: DesignGenome) {
  const bundle = buildProjectExport(design);
  const shopifyFiles = Object.fromEntries(Object.entries(bundle.files).filter(([name]) => name.startsWith("shopify/")).map(([name, content]) => [name.replace(/^shopify\//, ""), content]));
  const zip = createStoredZip(shopifyFiles);
  downloadBlob(zip, `${bundle.name}-shopify-os2-theme.zip`);
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url; anchor.download = filename; anchor.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 500);
}
