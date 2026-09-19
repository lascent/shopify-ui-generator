"use client";

import { create } from "zustand";
import { initialDesign } from "@/lib/presets";
import type { Creativity, DesignGenome, DesignLocks, DesignVersion, Device, GenerateScope, StorePage } from "@/types/design";

const defaultLocks: DesignLocks = {
  palette: false,
  typography: false,
  layout: false,
  surfaces: false,
  motion: false,
  hero: false,
  products: false,
};

const firstVersion: DesignVersion = {
  id: "version-initial",
  design: initialDesign,
  prompt: "",
  favorite: true,
  label: "Quiet Luxury",
};

type EditorStore = {
  design: DesignGenome;
  previousDesign: DesignGenome | null;
  history: DesignVersion[];
  variants: DesignGenome[];
  variantMode: boolean;
  locks: DesignLocks;
  prompt: string;
  shopTitle: string;
  creativity: Creativity;
  scope: GenerateScope;
  device: Device;
  storePage: StorePage;
  compare: boolean;
  generating: boolean;
  mobilePanel: "design" | "canvas";
  designLibraryOpen: boolean;
  libraryFavorites: string[];
  libraryRecent: string[];
  setPrompt: (value: string) => void;
  setShopTitle: (value: string) => void;
  setCreativity: (value: Creativity) => void;
  setScope: (value: GenerateScope) => void;
  setDevice: (value: Device) => void;
  setStorePage: (value: StorePage) => void;
  setCompare: (value: boolean) => void;
  setGenerating: (value: boolean) => void;
  setMobilePanel: (value: "design" | "canvas") => void;
  setDesignLibraryOpen: (value: boolean) => void;
  hydrateLibraryState: (favorites: string[], recent: string[]) => void;
  toggleLibraryFavorite: (id: string) => void;
  rememberLibraryDirection: (id: string) => void;
  setDesign: (design: DesignGenome) => void;
  setVariants: (variants: DesignGenome[]) => void;
  setVariantMode: (value: boolean) => void;
  selectVariant: (index: number) => void;
  editDesign: (updater: (design: DesignGenome) => DesignGenome) => void;
  toggleLock: (key: keyof DesignLocks) => void;
  addVersion: (design: DesignGenome) => void;
  restoreVersion: (id: string) => void;
  toggleFavorite: (id: string) => void;
};

export const useEditorStore = create<EditorStore>((set) => ({
  design: initialDesign,
  previousDesign: null,
  history: [firstVersion],
  variants: [],
  variantMode: false,
  locks: defaultLocks,
  prompt: "",
  shopTitle: initialDesign.store.brandName,
  creativity: "balanced",
  scope: "all",
  device: "desktop",
  storePage: "home",
  compare: false,
  generating: false,
  mobilePanel: "canvas",
  designLibraryOpen: false,
  libraryFavorites: [],
  libraryRecent: [],
  setPrompt: (prompt) => set({ prompt }),
  setShopTitle: (shopTitle) => set({ shopTitle }),
  setCreativity: (creativity) => set({ creativity }),
  setScope: (scope) => set({ scope }),
  setDevice: (device) => set({ device }),
  setStorePage: (storePage) => set({ storePage }),
  setCompare: (compare) => set({ compare }),
  setGenerating: (generating) => set({ generating }),
  setMobilePanel: (mobilePanel) => set({ mobilePanel }),
  setDesignLibraryOpen: (designLibraryOpen) => set({ designLibraryOpen }),
  hydrateLibraryState: (libraryFavorites, libraryRecent) => set({ libraryFavorites, libraryRecent }),
  toggleLibraryFavorite: (id) => set((state) => ({ libraryFavorites: state.libraryFavorites.includes(id) ? state.libraryFavorites.filter((item) => item !== id) : [id, ...state.libraryFavorites].slice(0, 100) })),
  rememberLibraryDirection: (id) => set((state) => ({ libraryRecent: [id, ...state.libraryRecent.filter((item) => item !== id)].slice(0, 30) })),
  setDesign: (design) => set((state) => ({ previousDesign: state.design, design, variantMode: false })),
  setVariants: (variants) => set({ variants }),
  setVariantMode: (variantMode) => set({ variantMode }),
  selectVariant: (index) => set((state) => {
    const design = state.variants[index];
    if (!design) return {};
    return { previousDesign: state.design, design, shopTitle: design.store.brandName, variantMode: false };
  }),
  editDesign: (updater) => set((state) => ({ design: updater(structuredClone(state.design)) })),
  toggleLock: (key) => set((state) => ({ locks: { ...state.locks, [key]: !state.locks[key] } })),
  addVersion: (design) => set((state) => ({
    history: [
      { id: crypto.randomUUID(), design, prompt: state.prompt, favorite: false, label: design.name },
      ...state.history,
    ].slice(0, 30),
  })),
  restoreVersion: (id) => set((state) => {
    const version = state.history.find((item) => item.id === id);
    return version ? { previousDesign: state.design, design: version.design, shopTitle: version.design.store.brandName } : {};
  }),
  toggleFavorite: (id) => set((state) => ({ history: state.history.map((item) => item.id === id ? { ...item, favorite: !item.favorite } : item) })),
}));
