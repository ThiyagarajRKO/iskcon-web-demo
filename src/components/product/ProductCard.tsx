import Image from "next/image";
import Link from "next/link";
import { Price } from "@/components/product/Price";
import type { Product } from "@/lib/types";
import styles from "./ProductCard.module.css";

type Props = {
  product: Product;
  sizes?: string;
  headingLevel?: "h2" | "h3";
  /** Above-the-fold cards: load immediately at high priority (LCP candidates) */
  eager?: boolean;
};

export function ProductCard({ product, sizes = "(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw", headingLevel: H = "h3", eager = false }: Props) {
  const image = product.images[0];
  return (
    <article className={styles.card}>
      <Link href={`/products/${product.slug}`} className={styles.link}>
        <div className={styles.media}>
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes={sizes}
            className={styles.img}
            loading={eager ? "eager" : "lazy"}
            fetchPriority={eager ? "high" : "auto"}
          />
          {product.isNew && <span className={styles.badge}>New</span>}
          {!product.inStock && <span className={styles.badge}>Sold out</span>}
        </div>
        <div className={styles.meta}>
          <H className={styles.name}>{product.name}</H>
          <Price inr={product.price} className={styles.price} />
        </div>
      </Link>
    </article>
  );
}
