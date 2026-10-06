"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import type { Collection } from "@/lib/types";
import styles from "./CollectionNav.module.css";

/**
 * Text tabs. Any number of collections fit: the row scrolls sideways (scrollbar hidden)
 * and the active tab is brought into view on load.
 */
export function CollectionNav({ collections, active }: { collections: Collection[]; active?: string }) {
  const listRef = useRef<HTMLUListElement>(null);
  const items = [{ slug: "", name: "All" }, ...collections];
  const [edges, setEdges] = useState({ start: true, end: true });

  useEffect(() => {
    const list = listRef.current;
    const current = list?.querySelector<HTMLElement>('[aria-current="page"]');
    if (!list || !current) return;
    // Scroll the row only (scrollIntoView could also move the page).
    list.scrollLeft = current.offsetLeft - (list.clientWidth - current.offsetWidth) / 2;
  }, [active]);

  // Track whether more tabs are hidden on either side (drives the fade + chevron).
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const update = () =>
      setEdges({ start: list.scrollLeft <= 2, end: list.scrollLeft >= list.scrollWidth - list.clientWidth - 2 });
    update();
    list.addEventListener("scroll", update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(list);
    return () => {
      list.removeEventListener("scroll", update);
      ro.disconnect();
    };
  }, []);

  const page = (dir: 1 | -1) =>
    listRef.current?.scrollBy({ left: dir * listRef.current.clientWidth * 0.6, behavior: "smooth" });

  return (
    <nav aria-label="Collections" className={styles.nav}>
      {!edges.start && (
        <button type="button" className={`${styles.more} ${styles.prev}`} onClick={() => page(-1)} aria-label="Previous collections">
          <Icon name="chevronLeft" size={18} />
        </button>
      )}
      <ul ref={listRef}>
        {items.map((c) => {
          const current = (active ?? "") === c.slug;
          return (
            <li key={c.slug || "all"}>
              <Link
                href={c.slug ? `/collections/${c.slug}` : "/collections"}
                className={styles.tab}
                aria-current={current ? "page" : undefined}
              >
                {c.name}
              </Link>
            </li>
          );
        })}
      </ul>
      {!edges.end && (
        <button type="button" className={`${styles.more} ${styles.next}`} onClick={() => page(1)} aria-label="Next collections">
          <Icon name="chevronRight" size={18} />
        </button>
      )}
    </nav>
  );
}
