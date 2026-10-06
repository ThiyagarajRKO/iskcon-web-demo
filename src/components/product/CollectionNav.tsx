import Link from "next/link";
import type { Collection } from "@/lib/types";
import styles from "./CollectionNav.module.css";

export function CollectionNav({ collections, active }: { collections: Collection[]; active?: string }) {
  const items = [{ slug: "", name: "All" }, ...collections];
  return (
    <nav aria-label="Collections" className={styles.nav}>
      <ul>
        {items.map((c) => {
          const current = (active ?? "") === c.slug;
          return (
            <li key={c.slug || "all"}>
              <Link
                href={c.slug ? `/collections/${c.slug}` : "/collections"}
                className={styles.chip}
                aria-current={current ? "page" : undefined}
              >
                {c.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
