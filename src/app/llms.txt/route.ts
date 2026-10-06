import { getCollections, getProducts } from "@/lib/catalog";
import { siteFaqs } from "@/lib/data/catalog";
import { formatPrice } from "@/lib/currency";
import { absoluteUrl, siteConfig } from "@/lib/site";

export const revalidate = 3600;

/** llms.txt — a plain-language map of the store for AI answer engines (https://llmstxt.org). */
export async function GET() {
  const [collections, products] = await Promise.all([getCollections(), getProducts()]);

  const body = [
    `# ${siteConfig.legalName}`,
    "",
    `> ${siteConfig.description}`,
    "",
    "Prices are listed in Indian Rupees (INR); the storefront also displays USD, GBP, EUR, AED, AUD, CAD and SGD.",
    `Ships from India to: ${siteConfig.shipsTo.join(", ")} and more. Contact: ${siteConfig.email}.`,
    "",
    "## Collections",
    ...collections.map((c) => `- [${c.name}](${absoluteUrl(`/collections/${c.slug}`)}): ${c.description}`),
    "",
    "## Products",
    ...products.map(
      (p) =>
        `- [${p.name}](${absoluteUrl(`/products/${p.slug}`)}): ${p.shortDescription} ${formatPrice(p.price, "INR")}. ${p.inStock ? "In stock" : "Sold out"}.`,
    ),
    "",
    "## Questions & answers",
    ...siteFaqs.flatMap((f) => [`### ${f.q}`, f.a, ""]),
    "## Pages",
    `- [Our Story](${absoluteUrl("/our-story")}): the Shankha in worship, selection, care and gifting`,
    `- [Shipping & Returns](${absoluteUrl("/shipping-returns")})`,
    `- [Questions & Answers](${absoluteUrl("/faq")})`,
    `- [Contact](${absoluteUrl("/contact")})`,
    "",
  ].join("\n");

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" },
  });
}
