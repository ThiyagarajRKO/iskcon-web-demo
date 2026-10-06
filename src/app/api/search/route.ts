import { NextResponse, type NextRequest } from "next/server";
import { getProducts, searchProducts } from "@/lib/catalog";

/** With no query: featured products (new arrivals first, then the rest in stock) for the empty search state. */
async function featured(limit: number) {
  const all = (await getProducts()).filter((p) => p.inStock);
  return [...all.filter((p) => p.isNew), ...all.filter((p) => !p.isNew)].slice(0, limit);
}

export async function GET(req: NextRequest) {
  const q = (req.nextUrl.searchParams.get("q") || "").slice(0, 80);
  const found = q.trim() ? (await searchProducts(q)).slice(0, 8) : await featured(4);
  const results = found.map((p) => ({
    slug: p.slug,
    name: p.name,
    price: p.price,
    image: p.images[0].src,
    alt: p.images[0].alt,
  }));
  return NextResponse.json(
    { q, results },
    { headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=86400" } },
  );
}
