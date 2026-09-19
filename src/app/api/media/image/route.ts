import {
  isImageRole,
  isStoreCategory,
  remoteImageCandidates,
  mediaConfidence,
  mediaSemanticLabel,
  type ImageRole,
} from "@/lib/image-library";
import type { StoreCategory } from "@/types/design";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const CACHE_CONTROL = "public, max-age=86400, s-maxage=604800, stale-while-revalidate=604800";

async function fetchCandidate(url: string) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 6500);
  try {
    const response = await fetch(url, {
      redirect: "follow",
      signal: controller.signal,
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; ShopifyUIGenerator/0.37)",
        Accept: "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
      },
      cache: "force-cache",
    });

    if (!response.ok) return null;
    const contentType = response.headers.get("content-type") ?? "";
    if (!contentType.toLowerCase().startsWith("image/")) return null;

    const data = await response.arrayBuffer();
    if (data.byteLength < 1024) return null;

    return {
      data,
      contentType,
    };
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

function svgFallback(category: StoreCategory, role: ImageRole, index: number, topic = "") {
  const palette: Record<StoreCategory, [string, string, string]> = {
    fashion: ["#241E1A", "#B98B63", "#F6F0EA"],
    shoes: ["#162642", "#7793F8", "#F8FAFF"],
    accessories: ["#2B211D", "#D2A487", "#FBF4EF"],
    home: ["#3C4432", "#B7C29C", "#F5F2E8"],
    beauty: ["#704B62", "#E0AEC6", "#FFF4F8"],
    food: ["#6B2B1B", "#F0A85B", "#FFF5EA"],
    outdoor: ["#18211B", "#889B72", "#EFF3EB"],
    kids: ["#744E67", "#F2B8D0", "#FFF7E9"],
    tech: ["#10162F", "#5F79FF", "#EEF3FF"],
  };
  const [dark, accent, light] = palette[category];
  const safeCategory = category.replace(/[^a-z0-9 -]/gi, "");
  const safeRole = role.replace(/[^a-z0-9 -]/gi, "");
  const semanticLabel = mediaSemanticLabel(category, role, topic).replace(/[^a-z0-9 &+.-]/gi, " ").trim().slice(0, 46);

  return `<?xml version="1.0" encoding="UTF-8"?>
  <svg xmlns="http://www.w3.org/2000/svg" width="1400" height="1700" viewBox="0 0 1400 1700">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${light}"/>
        <stop offset="55%" stop-color="${accent}"/>
        <stop offset="100%" stop-color="${dark}"/>
      </linearGradient>
      <filter id="blur"><feGaussianBlur stdDeviation="70"/></filter>
    </defs>
    <rect width="1400" height="1700" fill="url(#bg)"/>
    <circle cx="1080" cy="350" r="310" fill="#ffffff" opacity="0.20" filter="url(#blur)"/>
    <circle cx="270" cy="1320" r="360" fill="${dark}" opacity="0.18" filter="url(#blur)"/>
    <rect x="90" y="90" width="1220" height="1520" rx="70" fill="none" stroke="#ffffff" stroke-opacity="0.34" stroke-width="2"/>
    <text x="110" y="1425" fill="#ffffff" font-family="Arial, Helvetica, sans-serif" font-size="46" font-weight="700" letter-spacing="4">${semanticLabel.toUpperCase()}</text>
    <text x="110" y="1500" fill="#ffffff" fill-opacity="0.78" font-family="Arial, Helvetica, sans-serif" font-size="28" letter-spacing="4">${safeCategory.toUpperCase()} · ${safeRole.toUpperCase()} · ${index + 1}</text>
  </svg>`;
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const categoryParam = url.searchParams.get("category") ?? "fashion";
  const roleParam = url.searchParams.get("role") ?? "product";
  const parsedIndex = Number.parseInt(url.searchParams.get("index") ?? "0", 10);
  const topic = (url.searchParams.get("topic") ?? "").trim().slice(0, 80);

  const category: StoreCategory = isStoreCategory(categoryParam) ? categoryParam : "fashion";
  const role: ImageRole = isImageRole(roleParam) ? roleParam : "product";
  const index = Number.isFinite(parsedIndex) ? Math.max(0, parsedIndex) : 0;

  const candidates = remoteImageCandidates(category, index, role, topic);
  let result: Awaited<ReturnType<typeof fetchCandidate>> = null;
  let resolvedSource = "none";
  for (let candidateIndex = 0; candidateIndex < candidates.length; candidateIndex += 1) {
    const fetched = await fetchCandidate(candidates[candidateIndex]);
    if (!fetched) continue;
    result = fetched;
    resolvedSource = candidateIndex === 0 ? "curated-or-semantic" : candidateIndex === 1 ? "semantic" : candidateIndex === 2 ? "semantic-alternate" : "generic-fallback";
    break;
  }

  if (result) {
    return new Response(result.data, {
      status: 200,
      headers: {
        "Content-Type": result.contentType,
        "Cache-Control": CACHE_CONTROL,
        "X-Shopify-UI-Generator-Media": resolvedSource,
        "X-Shopify-UI-Generator-Media-Confidence": mediaConfidence(category, role, topic),
      },
    });
  }

  const svg = svgFallback(category, role, index, topic);
  return new Response(svg, {
    status: 200,
    headers: {
      "Content-Type": "image/svg+xml; charset=utf-8",
      "Cache-Control": "public, max-age=300",
      "X-Shopify-UI-Generator-Media": "generated-fallback",
      "X-Shopify-UI-Generator-Media-Confidence": "fallback",
    },
  });
}
