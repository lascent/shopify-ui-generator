"use client";

import { useEffect, useState } from "react";
import { BuilderShell } from "@/components/builder/builder-shell";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <main suppressHydrationWarning className="min-h-dvh bg-[#08090c]" aria-hidden="true" />;
  }

  return <BuilderShell />;
}
