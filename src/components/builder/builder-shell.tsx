"use client";

import { Canvas } from "./canvas";
import { LeftPanel } from "./left-panel";
import { Topbar } from "./topbar";
import { DesignLibrary } from "./design-library";
import { useEditorStore } from "@/store/editor-store";

export function BuilderShell() {
  const panel = useEditorStore((s) => s.mobilePanel);
  return (
    <div className="h-dvh overflow-hidden bg-[#08090c]">
      <Topbar />
      <DesignLibrary />

      {/* Desktop / large laptop: one unified control rail on the left, preview on the right. */}
      <div className="hidden h-[calc(100dvh-64px)] grid-cols-[360px_minmax(0,1fr)] xl:grid 2xl:grid-cols-[390px_minmax(0,1fr)]">
        <LeftPanel />
        <Canvas />
      </div>

      {/* Smaller laptops, tablets and phones: one panel at a time so the canvas never gets crushed. */}
      <div className="h-[calc(100dvh-64px)] pb-16 xl:hidden">
        {panel === "design" && <LeftPanel />}
        {panel === "canvas" && <Canvas />}
      </div>
    </div>
  );
}
