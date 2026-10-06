"use client";

import Link from "next/link";
import { Drawer } from "@/components/ui/Drawer";
import { closePanel } from "@/lib/store";
import type { Collection } from "@/lib/types";
import styles from "./MenuDrawer.module.css";

const secondary = [
  { href: "/our-story", label: "Our Story" },
  { href: "/faq", label: "Questions & Answers" },
  { href: "/shipping-returns", label: "Shipping & Returns" },
  { href: "/contact", label: "Contact Us" },
];

export default function MenuDrawer({
  open,
  collections,
}: {
  open: boolean;
  collections: Pick<Collection, "slug" | "name" | "tagline">[];
}) {
  return (
    <Drawer open={open} side="left" label="Main menu">
      <nav aria-label="Collections">
        <ul className={styles.primary}>
          <li>
            <Link href="/collections" onClick={closePanel} className={styles.primaryLink}>
              All Creations
            </Link>
          </li>
          {collections.map((c) => (
            <li key={c.slug}>
              <Link href={`/collections/${c.slug}`} onClick={closePanel} className={styles.primaryLink}>
                {c.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <nav aria-label="Information">
        <ul className={styles.secondary}>
          {secondary.map((l) => (
            <li key={l.href}>
              <Link href={l.href} onClick={closePanel} className={styles.secondaryLink}>
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </Drawer>
  );
}
