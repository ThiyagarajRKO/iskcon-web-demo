import Link from "next/link";
import { Logo } from "@/components/layout/Logo";
import { CurrencySelect } from "@/components/layout/CurrencySelect";
import { NewsletterForm } from "@/components/layout/NewsletterForm";
import { siteConfig } from "@/lib/site";
import styles from "./Footer.module.css";

const columns = [
  {
    title: "Help",
    intro: `Our Client Advisors are available by phone at ${siteConfig.phone} or by email.`,
    links: [
      { href: "/faq", label: "Questions & Answers" },
      { href: "/shipping-returns", label: "Shipping & Returns" },
      { href: "/contact", label: "Contact Us" },
    ],
  },
  {
    title: "Services",
    links: [
      { href: "/our-story#care", label: "Shell Care" },
      { href: "/our-story#gifting", label: "The Art of Gifting" },
      { href: "/contact", label: "Bespoke Requests" },
    ],
  },
  {
    title: "About",
    links: [
      { href: "/our-story", label: "Our Story" },
      { href: "/collections", label: "All Creations" },
      { href: "/collections/sacred-shankha", label: "The Sacred Shankha" },
    ],
  },
];

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        {columns.map((col) => (
          <nav key={col.title} aria-label={col.title} className={styles.col}>
            <h2 className={styles.heading}>{col.title}</h2>
            {col.intro && <p className={styles.intro}>{col.intro}</p>}
            <ul>
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className={styles.link}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
        <div className={styles.col}>
          <h2 className={styles.heading}>Email Sign-Up</h2>
          <p className={styles.intro}>
            Be the first to hear about new arrivals, festival editions and the stories behind each shell.
          </p>
          <NewsletterForm />
        </div>
      </div>

      <div className={`container ${styles.bottom}`}>
        <CurrencySelect />
        <ul className={styles.social}>
          {Object.entries(siteConfig.social).map(([name, href]) => (
            <li key={name}>
              <a href={href} target="_blank" rel="noopener noreferrer" className={styles.link}>
                {name[0].toUpperCase() + name.slice(1)}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.brand}>
        <Logo className={styles.brandLogo} />
        <p className={styles.legal}>
          © {new Date().getFullYear()} {siteConfig.legalName}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
