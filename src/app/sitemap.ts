import type { MetadataRoute } from "next";
import { categoryTabs } from "@/lib/categories";
import { getCollections, getProducts } from "@/lib/catalog";
import { absoluteUrl } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [collections, products] = await Promise.all([getCollections(), getProducts()]);
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), changeFrequency: "daily", priority: 1, lastModified: now },
    { url: absoluteUrl("/collections"), changeFrequency: "daily", priority: 0.9, lastModified: now },
    ...["/our-story", "/faq", "/shipping-returns", "/contact"].map((p) => ({
      url: absoluteUrl(p),
      changeFrequency: "monthly" as const,
      priority: 0.5,
      lastModified: now,
    })),
  ];

  return [
    ...staticRoutes,
    ...collections.map((c) => ({
      url: absoluteUrl(`/collections/${c.slug}`),
      changeFrequency: "weekly" as const,
      priority: 0.8,
      lastModified: now,
      images: [absoluteUrl(c.image.src)],
    })),
    ...collections.flatMap((c) =>
      categoryTabs(c, products.filter((p) => p.collection === c.slug))
        .slice(1)
        .map((t) => ({ url: absoluteUrl(t.href), changeFrequency: "weekly" as const, priority: 0.7, lastModified: now })),
    ),
    ...products.map((p) => ({
      url: absoluteUrl(`/products/${p.slug}`),
      changeFrequency: "weekly" as const,
      priority: 0.7,
      lastModified: now,
      images: p.images.map((i) => absoluteUrl(i.src)),
    })),
  ];
}
