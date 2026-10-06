import Link from "next/link";
import type { ReactNode } from "react";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";
import styles from "./PageHeader.module.css";

type Crumb = { name: string; path: string };

/** `visible={false}` keeps the BreadcrumbList JSON-LD for SEO but renders no on-page trail. */
export function Breadcrumbs({ items, visible = true }: { items: Crumb[]; visible?: boolean }) {
  const all = [{ name: "Home", path: "/" }, ...items];
  return (
    <>
      {visible && (
        <nav aria-label="Breadcrumb" className={styles.crumbs}>
          <ol>
            {all.map((c, i) => (
              <li key={c.path}>
                {i < all.length - 1 ? <Link href={c.path}>{c.name}</Link> : <span aria-current="page">{c.name}</span>}
              </li>
            ))}
          </ol>
        </nav>
      )}
      <JsonLd data={breadcrumbJsonLd(all)} />
    </>
  );
}

export function PageHeader({ title, intro, crumbs, children }: { title: string; intro?: ReactNode; crumbs: Crumb[]; children?: ReactNode }) {
  return (
    <header className={`container ${styles.header}`}>
      <Breadcrumbs items={crumbs} />
      <h1 className={styles.title}>{title}</h1>
      {intro && <div className={styles.intro}>{intro}</div>}
      {children}
    </header>
  );
}
