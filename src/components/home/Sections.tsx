import Image from "next/image";
import Link from "next/link";
import type { Collection, ImageAsset } from "@/lib/types";
import styles from "./Sections.module.css";

/* ---------- Category grid ("Explore a selection of…") ---------- */

export function CategoryGrid({ title, collections }: { title: string; collections: Collection[] }) {
  return (
    <section className={styles.section} aria-labelledby="explore-title">
      <h2 id="explore-title" className="section-title">
        {title}
      </h2>
      <ul className={`container ${styles.categories}`}>
        {collections.map((c) => (
          <li key={c.slug}>
            <Link href={`/collections/${c.slug}`} className={styles.category}>
              <span className={styles.categoryMedia}>
                <Image
                  src={c.image.src}
                  alt={c.image.alt}
                  fill
                  sizes="(min-width: 1024px) 22vw, 50vw"
                  quality={60}
                />
              </span>
              <span className={styles.categoryName}>{c.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ---------- Full-bleed editorial push ---------- */

type EditorialProps = {
  id: string;
  eyebrow?: string;
  title: string;
  text?: string;
  cta: { href: string; label: string };
  image: ImageAsset;
  /** Text over the image (dark frames) or underneath it */
  overlay?: boolean;
};

export function Editorial({ id, eyebrow, title, text, cta, image, overlay = false }: EditorialProps) {
  return (
    <section className={`${styles.editorial} ${overlay ? styles.editorialOverlay : ""}`} aria-labelledby={id}>
      <Link href={cta.href} className={styles.editorialMedia} tabIndex={-1} aria-hidden="true">
        <Image src={image.src} alt={image.alt} fill sizes="100vw" quality={70} />
      </Link>
      <div className={styles.editorialText}>
        {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
        <h2 id={id} className={styles.editorialTitle}>
          {title}
        </h2>
        {text && <p className={styles.editorialBody}>{text}</p>}
        <Link href={cta.href} className="link-underline">
          {cta.label}
        </Link>
      </div>
    </section>
  );
}

/* ---------- Two-up push ---------- */

type DuoItem = { title: string; href: string; cta: string; image: ImageAsset };

export function Duo({ items }: { items: [DuoItem, DuoItem] }) {
  return (
    <section className={styles.duo} aria-label="Featured collections">
      {items.map((it) => (
        <article key={it.href} className={styles.duoItem}>
          <Link href={it.href} className={styles.duoMedia} tabIndex={-1} aria-hidden="true">
            <Image src={it.image.src} alt={it.image.alt} fill sizes="(min-width: 768px) 50vw, 100vw" quality={70} />
          </Link>
          <div className={styles.duoText}>
            <h2 className={styles.duoTitle}>{it.title}</h2>
            <Link href={it.href} className="link-underline">
              {it.cta}
            </Link>
          </div>
        </article>
      ))}
    </section>
  );
}

/* ---------- Services ---------- */

type Service = { title: string; text: string; href: string; cta: string; image: ImageAsset };

export function Services({ title, items }: { title: string; items: Service[] }) {
  return (
    <section className={styles.section} aria-labelledby="services-title">
      <h2 id="services-title" className="section-title">
        {title}
      </h2>
      <ul className={`container ${styles.services}`}>
        {items.map((s) => (
          <li key={s.title} className={styles.service}>
            <span className={styles.serviceMedia}>
              <Image src={s.image.src} alt={s.image.alt} fill sizes="(min-width: 768px) 33vw, 100vw" quality={60} />
            </span>
            <h3 className={styles.serviceTitle}>{s.title}</h3>
            <p className={styles.serviceText}>{s.text}</p>
            <Link href={s.href} className="link-underline">
              {s.cta}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ---------- Questions & answers (AEO) — native <details>, zero JS ---------- */

export function FaqList({ faqs, title, id = "faq-title" }: { faqs: { q: string; a: string }[]; title?: string; id?: string }) {
  return (
    <section className={styles.section} aria-labelledby={title ? id : undefined}>
      {title && (
        <h2 id={id} className="section-title">
          {title}
        </h2>
      )}
      <div className={styles.faq}>
        {faqs.map((f) => (
          <details key={f.q} className={styles.faqItem}>
            <summary className={styles.faqQ}>
              <h3>{f.q}</h3>
            </summary>
            <p className={styles.faqA}>{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
