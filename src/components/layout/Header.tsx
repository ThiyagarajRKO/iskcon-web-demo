"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { Logo } from "@/components/layout/Logo";
import { cartCount, openPanel, useCart, usePanel } from "@/lib/store";
import type { Collection } from "@/lib/types";
import styles from "./Header.module.css";

// Panels are code-split and only downloaded on first open — keeps the initial JS tiny.
const MenuDrawer = dynamic(() => import("./MenuDrawer"));
const SearchPanel = dynamic(() => import("./SearchPanel"));
const BagDrawer = dynamic(() => import("@/components/cart/BagDrawer"));

/** Routes whose first section is a full-bleed hero the header should blend into. */
const OVERLAY_ROUTES = new Set(["/"]);

export function Header({ collections }: { collections: Pick<Collection, "slug" | "name" | "tagline">[] }) {
  const pathname = usePathname();
  const panel = usePanel();
  const count = cartCount(useCart());
  const [scrolled, setScrolled] = useState(false);
  const [loaded, setLoaded] = useState({ menu: false, search: false, bag: false });

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 8);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  // Mount a panel the first time it is requested, keep it mounted for exit animations.
  // (State adjusted during render — React's pattern for deriving state from changing inputs.)
  if (panel && panel in loaded && !loaded[panel as keyof typeof loaded]) setLoaded((l) => ({ ...l, [panel]: true }));

  // Lock page scroll while a panel is open.
  useEffect(() => {
    document.body.classList.toggle("scroll-locked", panel !== null);
  }, [panel]);

  const overlay = OVERLAY_ROUTES.has(pathname) && !scrolled && panel === null;

  return (
    <>
      <header className={styles.header} data-overlay={overlay || undefined} data-scrolled={scrolled || undefined}>
        <div className={styles.inner}>
          <div className={styles.left}>
            <button
              type="button"
              className={styles.action}
              onClick={() => openPanel("menu")}
              aria-haspopup="dialog"
              aria-label="Menu"
            >
              <Icon name="menu" size={22} strokeWidth={1.5} />
              <span className={styles.label} aria-hidden="true">
                Menu
              </span>
            </button>
            <button
              type="button"
              className={styles.action}
              onClick={() => openPanel("search")}
              aria-haspopup="dialog"
              aria-label="Search"
            >
              <Icon name="search" size={22} strokeWidth={1.5} />
              <span className={styles.label} aria-hidden="true">
                Search
              </span>
            </button>
          </div>

          <Link href="/" className={styles.logo} aria-label="Shankha — home">
            <Logo />
          </Link>

          <div className={styles.right}>
            <Link href="/contact" className={`${styles.action} ${styles.desktopOnly}`}>
              <span className={styles.label}>Contact Us</span>
            </Link>
            <button
              type="button"
              className={styles.action}
              onClick={() => openPanel("bag")}
              aria-haspopup="dialog"
              aria-label={`Shopping bag, ${count} ${count === 1 ? "item" : "items"}`}
            >
              <span className={styles.iconWrap}>
                <Icon name="bag" size={22} strokeWidth={1.5} />
                {count > 0 && (
                  <span className={styles.count} aria-hidden="true">
                    {count}
                  </span>
                )}
              </span>
            </button>
          </div>
        </div>
      </header>

      {loaded.menu && <MenuDrawer open={panel === "menu"} collections={collections} />}
      {loaded.search && <SearchPanel open={panel === "search"} />}
      {loaded.bag && <BagDrawer open={panel === "bag"} />}
    </>
  );
}
