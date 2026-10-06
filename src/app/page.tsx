import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/home/Hero";
import { CategoryGrid, Duo, Editorial, FaqList, Services } from "@/components/home/Sections";
import { ProductCard } from "@/components/product/ProductCard";
import { JsonLd } from "@/components/seo/JsonLd";
import { Rail } from "@/components/ui/Rail";
import { getCollections, getNewArrivals } from "@/lib/catalog";
import { IMAGES, siteFaqs } from "@/lib/data/catalog";
import { faqJsonLd, itemListJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: { absolute: `${siteConfig.legalName} — Sacred Conch Shells, Shankha & Cowries | Shipped Worldwide` },
  description: siteConfig.description,
  alternates: { canonical: "/" },
};

export default async function HomePage() {
  const [collections, newArrivals] = await Promise.all([getCollections(), getNewArrivals(8)]);

  return (
    <>
      <Hero
        eyebrow="The Sacred Shankha"
        title="The Voice of the Divine"
        cta={{ href: "/collections/sacred-shankha", label: "Discover the Collection" }}
        landscape={IMAGES.silverShankha}
        portrait={IMAGES.nautilus}
      />

      {/* Answer-first introduction: a concise, quotable definition for search and AI answers */}
      <section className={`container ${styles.intro}`} aria-label="About Shankha">
        <p>
          {siteConfig.legalName} offers hand-selected conch shells, cowries and collector sea shells from the coasts
          of India — prepared for puja, kirtan and heritage collections, and shipped to devotees and collectors
          worldwide.
        </p>
      </section>

      <CategoryGrid title="Explore a Selection of Sacred Creations" collections={collections} />

      <Editorial
        id="ed-heritage"
        overlay
        eyebrow="Heritage Mounted"
        title="Silver, Gilt & Inlay"
        text="Natural conches dressed by traditional metalsmiths — made to be displayed, gifted and passed down."
        cta={{ href: "/collections/heritage-mounted", label: "Discover the Pieces" }}
        image={IMAGES.ornateConch}
      />

      <section className={styles.rail} aria-labelledby="new-title">
        <div className={styles.railHead}>
          <h2 id="new-title" className="section-title">
            New Arrivals
          </h2>
          <Link href="/collections" className="link-underline">
            View all
          </Link>
        </div>
        <Rail label="New arrivals">
          {newArrivals.map((p) => (
            <li key={p.slug}>
              <ProductCard product={p} sizes="(min-width: 1024px) 25vw, (min-width: 640px) 40vw, 72vw" />
            </li>
          ))}
        </Rail>
      </section>

      <Duo
        items={[
          {
            title: "Blowing Conch",
            href: "/collections/blowing-conch",
            cta: "Shop the Voices of Kirtan",
            image: IMAGES.carvedConch,
          },
          {
            title: "Cowrie",
            href: "/collections/cowrie",
            cta: "Shop Cowrie",
            image: IMAGES.tigerCowrie,
          },
        ]}
      />

      <Editorial
        id="ed-collector"
        eyebrow="Collector Shells"
        title="Rare Forms from the Sea"
        text="Nautilus, spider conch and sundial — natural specimens chosen for form, pattern and colour."
        cta={{ href: "/collections/collector-shells", label: "Explore Collector Shells" }}
        image={IMAGES.murexVelvet}
      />

      <Services
        title={`${siteConfig.name} Services`}
        items={[
          {
            title: "Worldwide Delivery",
            text: "Tracked, insured shipping from India to devotees and collectors around the world.",
            href: "/shipping-returns",
            cta: "Delivery Information",
            image: IMAGES.sandCockle,
          },
          {
            title: "The Art of Gifting",
            text: "Every shell arrives cloth-wrapped in a signature box, ready to be offered.",
            href: "/our-story#gifting",
            cta: "Discover Gifting",
            image: IMAGES.pujaShankha,
          },
          {
            title: "Client Advisors",
            text: "Guidance on choosing a Shankha for puja, kirtan or collection, by phone or email.",
            href: "/contact",
            cta: "Contact Us",
            image: IMAGES.lotusShankha,
          },
        ]}
      />

      <FaqList title="Questions & Answers" faqs={siteFaqs.slice(0, 4)} />

      <JsonLd data={[faqJsonLd(siteFaqs.slice(0, 4)), itemListJsonLd("New Arrivals", newArrivals)]} />
    </>
  );
}
