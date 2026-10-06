import type { Metadata } from "next";
import type { Collection, Product } from "@/lib/types";
import { absoluteUrl, siteConfig } from "@/lib/site";

type PageMeta = {
  title: string;
  description: string;
  path: string;
  image?: { src: string; width: number; height: number; alt: string };
  type?: "website" | "article";
};

export function pageMetadata({ title, description, path, image, type = "website" }: PageMeta): Metadata {
  const images = image ? [{ url: image.src, width: image.width, height: image.height, alt: image.alt }] : undefined;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: path, type, images },
    twitter: { card: "summary_large_image", title, description, images: images?.map((i) => i.url) },
  };
}

const ORG_ID = `${siteConfig.url}/#organization`;
const SITE_ID = `${siteConfig.url}/#website`;

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": ORG_ID,
        name: siteConfig.legalName,
        alternateName: siteConfig.name,
        url: siteConfig.url,
        logo: absoluteUrl("/icon-512.png"),
        description: siteConfig.description,
        email: siteConfig.email,
        telephone: siteConfig.phone,
        address: { "@type": "PostalAddress", ...siteConfig.address },
        sameAs: Object.values(siteConfig.social),
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer service",
          email: siteConfig.email,
          telephone: siteConfig.phone,
          availableLanguage: ["English", "Hindi"],
          areaServed: siteConfig.shipsTo,
        },
      },
      {
        "@type": "WebSite",
        "@id": SITE_ID,
        url: siteConfig.url,
        name: siteConfig.legalName,
        description: siteConfig.description,
        publisher: { "@id": ORG_ID },
        inLanguage: "en",
        potentialAction: {
          "@type": "SearchAction",
          target: { "@type": "EntryPoint", urlTemplate: `${siteConfig.url}/search?q={search_term_string}` },
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: absoluteUrl(it.path),
    })),
  };
}

export function productJsonLd(product: Product, collection?: Collection) {
  const url = absoluteUrl(`/products/${product.slug}`);
  const availability = product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock";
  const priceValidUntil = `${new Date().getFullYear() + 1}-12-31`;
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${url}#product`,
    name: product.name,
    sku: product.sku,
    description: product.description,
    url,
    image: product.images.map((i) => absoluteUrl(i.src)),
    category: collection?.name,
    brand: { "@type": "Brand", name: siteConfig.legalName },
    additionalProperty: product.specs.map((s) => ({ "@type": "PropertyValue", name: s.label, value: s.value })),
    offers: {
      "@type": "Offer",
      url,
      priceCurrency: "INR",
      price: product.price,
      priceValidUntil,
      availability,
      itemCondition: "https://schema.org/NewCondition",
      seller: { "@id": ORG_ID },
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingDestination: siteConfig.shipsTo.map((c) => ({ "@type": "DefinedRegion", addressCountry: c })),
        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          handlingTime: { "@type": "QuantitativeValue", minValue: 1, maxValue: 3, unitCode: "DAY" },
          transitTime: { "@type": "QuantitativeValue", minValue: 3, maxValue: 14, unitCode: "DAY" },
        },
      },
      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy",
        applicableCountry: siteConfig.shipsTo,
        returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
        merchantReturnDays: 14,
        returnMethod: "https://schema.org/ReturnByMail",
      },
    },
  };
}

export function itemListJsonLd(name: string, products: Product[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    numberOfItems: products.length,
    itemListElement: products.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: absoluteUrl(`/products/${p.slug}`),
      name: p.name,
    })),
  };
}

export function faqJsonLd(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}


/** Trim text to a meta-description length on a word boundary. */
export function clip(text: string, max = 158) {
  const t = text.replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  return `${t.slice(0, t.lastIndexOf(" ", max - 1))}…`;
}
