import Image from "next/image";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import styles from "@/components/layout/Prose.module.css";
import { IMAGES } from "@/lib/data/catalog";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Our Story — The Sacred Shankha",
  description:
    "Why the conch matters in Vaishnava worship, how each shell is selected and prepared, how to care for it, and how it is gifted.",
  path: "/our-story",
  image: IMAGES.lotusShankha,
  type: "article",
});

export default function OurStoryPage() {
  return (
    <div className="page">
      <PageHeader
        title="Our Story"
        crumbs={[{ name: "Our Story", path: "/our-story" }]}
        intro={<p>{siteConfig.legalName} brings the sacred conch from the shores of India to altars around the world.</p>}
      />
      <article className={styles.prose}>
        <figure className={styles.figure}>
          <Image src={IMAGES.lotusShankha.src} alt={IMAGES.lotusShankha.alt} fill sizes="(min-width: 800px) 760px, 100vw" />
        </figure>

        <h2 id="shankha">The Shankha in worship</h2>
        <p>
          In Vaishnava tradition the conch is one of the four emblems held by Lord Vishnu. Lord Krishna sounded His
          conch, Panchajanya, at the start of the Bhagavad-gita&apos;s battle at Kurukshetra. In temples and homes the
          Shankha is sounded to open arati, used to offer water during abhishek and kept on the altar.
        </p>

        <h2 id="selection">Selection and preparation</h2>
        <p>
          Every shell is examined by hand for form, weight, finish and — for blowing conches — tone. Blowing conches
          are cut and smoothed at the tip; puja conches are left closed. Each piece is cleaned, photographed and
          documented before it is offered for sale.
        </p>

        <h2 id="care">Shell care</h2>
        <ul>
          <li>Rinse with clean water after use; avoid soaps and detergents.</li>
          <li>Dry mouth-down on a soft cloth before returning it to its stand.</li>
          <li>Keep away from long direct sun and sudden temperature changes.</li>
          <li>Polish silver mounts with a dry silver cloth only.</li>
        </ul>

        <h2 id="gifting">The art of gifting</h2>
        <p>
          Each shell is wrapped in cloth and placed in a signature box with a care card, ready to be offered. For a personal
          message or a bespoke request, <Link href="/contact">contact a Client Advisor</Link>.
        </p>
      </article>
    </div>
  );
}
