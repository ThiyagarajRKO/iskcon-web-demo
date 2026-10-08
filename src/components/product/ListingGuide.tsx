import Link from "next/link";
import { Fragment } from "react";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqJsonLd } from "@/lib/seo";
import type { ListingGuide as Guide } from "@/lib/types";
import styles from "./ListingGuide.module.css";

const LINK = /\[([^\]]+)\]\(([^)\s]+)\)/g;

/** Renders "[label](/path)" as internal links; everything else stays plain text. */
function RichText({ text }: { text: string }) {
  const parts: React.ReactNode[] = [];
  let last = 0;
  for (const m of text.matchAll(LINK)) {
    parts.push(text.slice(last, m.index));
    parts.push(
      <Link key={m.index} href={m[2]} className={styles.link}>
        {m[1]}
      </Link>,
    );
    last = m.index + m[0].length;
  }
  parts.push(text.slice(last));
  return parts.map((p, i) => <Fragment key={i}>{p}</Fragment>);
}

const plain = (text: string) => text.replace(LINK, "$1");

/** Copy block under the product grid: intro paragraph, then question headings with answers (as on the reference). */
export function ListingGuide({ guide }: { guide: Guide }) {
  return (
    <section className={styles.guide} aria-label="About this collection">
      <p>
        <RichText text={guide.intro} />
      </p>
      {guide.faqs.map((f) => (
        <Fragment key={f.q}>
          <h2 className={styles.q}>{f.q}</h2>
          <p>
            <RichText text={f.a} />
          </p>
        </Fragment>
      ))}
      {guide.faqs.length > 0 && <JsonLd data={faqJsonLd(guide.faqs.map((f) => ({ q: f.q, a: plain(f.a) })))} />}
    </section>
  );
}
