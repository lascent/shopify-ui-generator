"use client";

import { AnimatePresence, motion } from "motion/react";
import { Heart, Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { DesignGenome, StoreProduct } from "@/types/design";

type CartItem = {
  id: string;
  product: StoreProduct;
  quantity: number;
  color?: string;
  size?: string;
};

type CommerceContextValue = {
  cart: CartItem[];
  cartCount: number;
  wishlist: Set<string>;
  quickViewProduct: StoreProduct | null;
  openQuickView: (product: StoreProduct) => void;
  closeQuickView: () => void;
  addToCart: (product: StoreProduct, options?: { quantity?: number; color?: string; size?: string; openCart?: boolean }) => void;
  removeFromCart: (id: string) => void;
  setCartQuantity: (id: string, quantity: number) => void;
  toggleWishlist: (product: StoreProduct) => void;
  isWishlisted: (product: StoreProduct) => boolean;
  openCartDrawer: () => void;
};

const CommerceContext = createContext<CommerceContextValue | null>(null);

function parsePrice(price: string) {
  const value = Number(price.replace(/[^0-9.]/g, ""));
  return Number.isFinite(value) ? value : 0;
}

function formatLike(price: string, amount: number) {
  const symbol = price.trim().match(/^[^\d]+/)?.[0] ?? "$";
  const decimals = price.includes(".") ? 2 : 0;
  return `${symbol}${amount.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}`;
}

function cartItemId(product: StoreProduct, color?: string, size?: string) {
  return `${product.name}::${color ?? "default"}::${size ?? "default"}`;
}

export function CommerceProvider({ design, children }: { design: DesignGenome; children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Set<string>>(new Set());
  const [quickViewProduct, setQuickViewProduct] = useState<StoreProduct | null>(null);
  const [cartOpen, setCartOpen] = useState(false);

  const cartCount = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);

  function addToCart(product: StoreProduct, options?: { quantity?: number; color?: string; size?: string; openCart?: boolean }) {
    const quantity = Math.max(1, options?.quantity ?? 1);
    const id = cartItemId(product, options?.color, options?.size);
    setCart((items) => {
      const existing = items.find((item) => item.id === id);
      if (existing) return items.map((item) => item.id === id ? { ...item, quantity: item.quantity + quantity } : item);
      return [...items, { id, product, quantity, color: options?.color, size: options?.size }];
    });
    if (options?.openCart !== false) setCartOpen(true);
  }

  function removeFromCart(id: string) {
    setCart((items) => items.filter((item) => item.id !== id));
  }

  function setCartQuantity(id: string, quantity: number) {
    if (quantity <= 0) return removeFromCart(id);
    setCart((items) => items.map((item) => item.id === id ? { ...item, quantity } : item));
  }

  function toggleWishlist(product: StoreProduct) {
    setWishlist((current) => {
      const next = new Set(current);
      if (next.has(product.name)) next.delete(product.name);
      else next.add(product.name);
      return next;
    });
  }

  const value: CommerceContextValue = {
    cart,
    cartCount,
    wishlist,
    quickViewProduct,
    openQuickView: setQuickViewProduct,
    closeQuickView: () => setQuickViewProduct(null),
    addToCart,
    removeFromCart,
    setCartQuantity,
    toggleWishlist,
    isWishlisted: (product) => wishlist.has(product.name),
    openCartDrawer: () => setCartOpen(true),
  };

  return (
    <CommerceContext.Provider value={value}>
      {children}
      <QuickViewModal design={design} product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
      <CartDrawer design={design} open={cartOpen} onClose={() => setCartOpen(false)} />
    </CommerceContext.Provider>
  );
}

export function useCommerce() {
  const context = useContext(CommerceContext);
  if (!context) throw new Error("useCommerce must be used inside CommerceProvider");
  return context;
}

function QuickViewModal({ design, product, onClose }: { design: DesignGenome; product: StoreProduct | null; onClose: () => void }) {
  const commerce = useCommerce();
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState<string | undefined>();
  const [size, setSize] = useState<string | undefined>();
  const [activeTab, setActiveTab] = useState<"details" | "specs" | "shipping">("details");
  const hasSizes = ["fashion", "shoes", "kids", "outdoor"].includes(design.store.category);
  const sizes = design.store.category === "shoes" ? ["7", "8", "9", "10", "11"] : ["XS", "S", "M", "L", "XL"];

  useEffect(() => {
    setQuantity(1);
    setColor(product?.colors?.[0]);
    setSize(undefined);
    setActiveTab("details");
  }, [product?.name]);

  return (
    <AnimatePresence>
      {product ? (
        <motion.div className="fixed inset-0 z-[120] grid place-items-center bg-black/55 p-4 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
          <motion.div initial={{ opacity: 0, y: 24, scale: .985 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 14, scale: .99 }} transition={{ type: "spring", stiffness: 320, damping: 28 }} className="relative grid max-h-[90vh] w-full max-w-4xl overflow-auto md:grid-cols-[.9fr_1.1fr]" style={{ borderRadius: Math.max(18, design.geometry.radius), background: design.palette.surface, color: design.palette.text, border: `1px solid ${design.palette.border}`, boxShadow: "0 30px 100px rgba(0,0,0,.35)" }}>
            <button onClick={onClose} aria-label="Close quick view" className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full bg-black/45 text-white backdrop-blur"><X size={16} /></button>
            <div className="min-h-[340px] overflow-hidden p-3 md:p-4">
              <div className="h-[360px] overflow-hidden rounded-[18px] md:h-[520px]"><img src={product.image} alt={product.name} className="h-full w-full object-cover" /></div>
              <div className="mt-3 grid grid-cols-4 gap-2">
                {["50% 50%", "35% 50%", "65% 50%", "50% 35%"].map((position, index) => (
                  <div key={position} className="h-16 overflow-hidden rounded-xl border" style={{ borderColor: design.palette.border }}>
                    <img src={product.image} alt={`${product.name} view ${index + 1}`} className="h-full w-full object-cover" style={{ objectPosition: position }} />
                  </div>
                ))}
              </div>
            </div>
            <div className="p-6 md:p-8">
              <div className="text-[10px] uppercase tracking-[.2em]" style={{ color: design.palette.muted }}>{design.store.nicheLabel ? `${design.store.nicheLabel} · ` : ""}{product.tag}</div>
              <h3 className="mt-3 text-3xl font-semibold tracking-[-.05em] md:text-4xl" style={{ fontFamily: design.typography.heading }}>{product.name}</h3>
              <p className="mt-3 text-sm leading-7" style={{ color: design.palette.muted }}>{product.subtitle}</p>
              <div className="mt-5 flex items-center gap-3"><span className="text-xl font-semibold">{product.price}</span>{product.compareAt ? <span className="text-sm line-through" style={{ color: design.palette.muted }}>{product.compareAt}</span> : null}</div>
              {product.rating ? <div className="mt-3 text-xs" style={{ color: design.palette.muted }}>★ {product.rating.toFixed(1)} · {product.reviewCount ?? 0} verified reviews</div> : null}

              <div className="mt-6 border-y" style={{ borderColor: design.palette.border }}>
                <div className="flex gap-5 overflow-x-auto py-3 text-[11px] font-semibold uppercase tracking-[.12em]">
                  {(["details", "specs", "shipping"] as const).map((tab) => <button key={tab} onClick={() => setActiveTab(tab)} className="whitespace-nowrap" style={{ color: activeTab === tab ? design.palette.text : design.palette.muted }}>{tab === "details" ? "Product details" : tab === "specs" ? "Specifications" : "Delivery & returns"}</button>)}
                </div>
                <div className="pb-4 text-sm leading-6" style={{ color: design.palette.muted }}>
                  {activeTab === "details" ? <p>{product.subtitle}. Designed to make comparison and purchase decisions clearer, with practical product information surfaced before checkout.</p> : null}
                  {activeTab === "specs" ? (product.specs && Object.keys(product.specs).length ? <div className="grid gap-2">{Object.entries(product.specs).map(([key, value]) => <div key={key} className="grid grid-cols-[.9fr_1.1fr] gap-3 border-t pt-2 first:border-t-0 first:pt-0" style={{ borderColor: design.palette.border }}><span>{key}</span><strong style={{ color: design.palette.text }}>{value}</strong></div>)}</div> : <p>Key dimensions, materials, compatibility and warranty information are available for this product.</p>) : null}
                  {activeTab === "shipping" ? <div className="space-y-2"><p>Fast dispatch on in-stock items with order tracking included.</p><p>Easy returns and exchanges on eligible products. Large items may use scheduled delivery.</p></div> : null}
                </div>
              </div>

              {product.colors?.length ? <div className="mt-6"><div className="mb-2 text-[10px] font-semibold uppercase tracking-[.16em]">Color</div><div className="flex gap-2">{product.colors.map((swatch, index) => <button key={swatch} onClick={() => setColor(swatch)} aria-label={`Select color ${index + 1}`} className="h-8 w-8 rounded-full border-2 transition" style={{ background: swatch, borderColor: color === swatch ? design.palette.text : design.palette.border }} />)}</div></div> : null}

              {hasSizes ? <div className="mt-6"><div className="mb-2 flex items-center justify-between text-[10px] font-semibold uppercase tracking-[.16em]"><span>Size</span><span style={{ color: design.palette.muted }}>Size guide</span></div><div className="flex flex-wrap gap-2">{sizes.map((item) => <button key={item} onClick={() => setSize(item)} className="min-w-11 rounded-full border px-3 py-2 text-xs" style={{ borderColor: size === item ? design.palette.text : design.palette.border, background: size === item ? design.palette.text : "transparent", color: size === item ? design.palette.primaryText : design.palette.text }}>{item}</button>)}</div></div> : null}

              <div className="mt-7 flex items-center gap-3">
                <div className="flex items-center rounded-full border" style={{ borderColor: design.palette.border }}><button onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="p-3"><Minus size={13} /></button><span className="min-w-8 text-center text-sm">{quantity}</span><button onClick={() => setQuantity((q) => q + 1)} className="p-3"><Plus size={13} /></button></div>
                <button onClick={() => { commerce.addToCart(product, { quantity, color, size }); onClose(); }} className="flex-1 rounded-full px-5 py-3.5 text-sm font-semibold" style={{ background: design.palette.primary, color: design.palette.primaryText }}>Add to cart</button>
                <button onClick={() => commerce.toggleWishlist(product)} aria-label="Toggle wishlist" className="grid h-12 w-12 place-items-center rounded-full border" style={{ borderColor: design.palette.border, background: commerce.isWishlisted(product) ? design.palette.text : "transparent", color: commerce.isWishlisted(product) ? design.palette.primaryText : design.palette.text }}><Heart size={16} fill={commerce.isWishlisted(product) ? "currentColor" : "none"} /></button>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-3 text-[11px]" style={{ color: design.palette.muted }}><div className="rounded-xl border p-3" style={{ borderColor: design.palette.border }}>Free shipping on qualifying orders</div><div className="rounded-xl border p-3" style={{ borderColor: design.palette.border }}>Easy returns and exchanges</div></div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function CartDrawer({ design, open, onClose }: { design: DesignGenome; open: boolean; onClose: () => void }) {
  const commerce = useCommerce();
  const subtotal = commerce.cart.reduce((sum, item) => sum + parsePrice(item.product.price) * item.quantity, 0);
  const template = commerce.cart[0]?.product.price ?? "$0.00";

  return (
    <AnimatePresence>
      {open ? (
        <motion.div className="fixed inset-0 z-[130] bg-black/45 backdrop-blur-[2px]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
          <motion.aside initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", stiffness: 330, damping: 32 }} className="ml-auto flex h-full w-full max-w-md flex-col" style={{ background: design.palette.surface, color: design.palette.text, borderLeft: `1px solid ${design.palette.border}` }}>
            <div className="flex items-center justify-between border-b px-5 py-5" style={{ borderColor: design.palette.border }}><div><div className="text-[10px] uppercase tracking-[.18em]" style={{ color: design.palette.muted }}>Your bag</div><div className="mt-1 text-xl font-semibold">{commerce.cartCount} item{commerce.cartCount === 1 ? "" : "s"}</div></div><button onClick={onClose} aria-label="Close cart" className="grid h-9 w-9 place-items-center rounded-full border" style={{ borderColor: design.palette.border }}><X size={16} /></button></div>
            <div className="flex-1 overflow-y-auto p-5">
              {commerce.cart.length === 0 ? <div className="grid h-full place-items-center text-center"><div><ShoppingBag className="mx-auto opacity-35" size={34} /><div className="mt-4 text-lg font-semibold">Your bag is empty.</div><p className="mt-2 text-sm" style={{ color: design.palette.muted }}>Add a product to test the generated commerce flow.</p></div></div> : <div className="space-y-4">{commerce.cart.map((item) => <div key={item.id} className="grid grid-cols-[86px_1fr] gap-4 border-b pb-4" style={{ borderColor: design.palette.border }}><img src={item.product.image} alt={item.product.name} className="h-24 w-[86px] rounded-xl object-cover" /><div className="min-w-0"><div className="flex items-start justify-between gap-3"><div><div className="font-semibold">{item.product.name}</div><div className="mt-1 text-[11px]" style={{ color: design.palette.muted }}>{[item.color ? "Selected color" : null, item.size ? `Size ${item.size}` : null].filter(Boolean).join(" · ") || item.product.subtitle}</div></div><button onClick={() => commerce.removeFromCart(item.id)} aria-label="Remove item" style={{ color: design.palette.muted }}><Trash2 size={14} /></button></div><div className="mt-4 flex items-center justify-between"><div className="flex items-center rounded-full border" style={{ borderColor: design.palette.border }}><button onClick={() => commerce.setCartQuantity(item.id, item.quantity - 1)} className="p-2"><Minus size={11} /></button><span className="min-w-7 text-center text-xs">{item.quantity}</span><button onClick={() => commerce.setCartQuantity(item.id, item.quantity + 1)} className="p-2"><Plus size={11} /></button></div><div className="text-sm font-semibold">{formatLike(item.product.price, parsePrice(item.product.price) * item.quantity)}</div></div></div></div>)}</div>}
            </div>
            <div className="border-t p-5" style={{ borderColor: design.palette.border }}><div className="flex items-center justify-between text-sm"><span style={{ color: design.palette.muted }}>Subtotal</span><strong className="text-lg">{formatLike(template, subtotal)}</strong></div><p className="mt-2 text-[11px]" style={{ color: design.palette.muted }}>Shipping and taxes calculated at checkout.</p><button disabled={!commerce.cart.length} className="mt-4 w-full rounded-full px-5 py-4 text-sm font-semibold disabled:opacity-40" style={{ background: design.palette.primary, color: design.palette.primaryText }}>Checkout preview</button></div>
          </motion.aside>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
