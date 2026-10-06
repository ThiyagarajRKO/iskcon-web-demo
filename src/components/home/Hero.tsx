import Link from "next/link";
import { getImageProps } from "next/image";
import type { ImageAsset } from "@/lib/types";
import styles from "./Hero.module.css";

type Props = {
  eyebrow?: string;
  title: string;
  cta: { href: string; label: string };
  landscape: ImageAsset;
  portrait: ImageAsset;
};

/**
 * Full-viewport hero. Art-directed <picture>: landscape frame on wide screens, portrait on phones.
 * The image is the LCP element — eager + fetchpriority=high, no fade-in, no client JS.
 */
export function Hero({ eyebrow, title, cta, landscape, portrait }: Props) {
  const common = { alt: landscape.alt, sizes: "100vw", quality: 70, fetchPriority: "high" as const, loading: "eager" as const };
  const {
    props: { srcSet: wide },
  } = getImageProps({ ...common, src: landscape.src, width: landscape.width, height: landscape.height });
  const {
    props: { srcSet: tall, ...img },
  } = getImageProps({ ...common, src: portrait.src, width: portrait.width, height: portrait.height });

  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <picture className={styles.media}>
        <source media="(min-aspect-ratio: 1/1)" srcSet={wide} sizes="100vw" />
        <img {...img} srcSet={tall} alt={landscape.alt} className={styles.img} />
      </picture>
      <div className={styles.scrim} aria-hidden="true" />
      <div className={styles.content}>
        {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
        <h1 id="hero-title" className={styles.title}>
          {title}
        </h1>
        <Link href={cta.href} className={`${styles.cta} link-underline`}>
          {cta.label}
        </Link>
      </div>
    </section>
  );
}
