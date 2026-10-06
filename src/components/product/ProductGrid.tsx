import { ProductCard } from "@/components/product/ProductCard";
import type { Product } from "@/lib/types";
import styles from "./ProductGrid.module.css";

export function ProductGrid({ products }: { products: Product[] }) {
  return (
    <ul className={`container ${styles.grid}`}>
      {products.map((p, i) => (
        <li key={p.slug}>
          <ProductCard product={p} headingLevel="h2" eager={i < 2} />
        </li>
      ))}
    </ul>
  );
}
