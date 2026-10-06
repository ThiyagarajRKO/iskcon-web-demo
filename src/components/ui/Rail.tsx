"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Icon } from "@/components/ui/Icon";
import styles from "./Rail.module.css";

/** Horizontal scroll-snap rail. Works without JS (native scroll); JS only adds arrow buttons. */
export function Rail({ children, label }: { children: ReactNode; label: string }) {
  const ref = useRef<HTMLUListElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      const max = el.scrollWidth - el.clientWidth - 2;
      setEdges({ start: el.scrollLeft <= 2, end: el.scrollLeft >= max });
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", update);
      ro.disconnect();
    };
  }, []);

  const page = (dir: 1 | -1) => {
    const el = ref.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <div className={styles.wrap}>
      <ul ref={ref} className={styles.rail} aria-label={label}>
        {children}
      </ul>
      <div className={styles.arrows}>
        <button type="button" onClick={() => page(-1)} disabled={edges.start} aria-label="Previous">
          <Icon name="chevronLeft" size={18} />
        </button>
        <button type="button" onClick={() => page(1)} disabled={edges.end} aria-label="Next">
          <Icon name="chevronRight" size={18} />
        </button>
      </div>
    </div>
  );
}
