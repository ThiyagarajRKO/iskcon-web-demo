import { PageHeader } from "@/components/layout/PageHeader";
import styles from "@/components/layout/Prose.module.css";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Contact Us — Client Advisors",
  description: `Speak with a Client Advisor about choosing a Shankha, orders, delivery or bespoke requests. Email ${siteConfig.email}.`,
  path: "/contact",
});

export default function ContactPage() {
  const { address } = siteConfig;
  return (
    <div className="page">
      <PageHeader
        title="Contact Us"
        crumbs={[{ name: "Contact Us", path: "/contact" }]}
        intro={<p>Our Client Advisors will help you choose a shell, track an order or arrange a bespoke request.</p>}
      />
      <div className={styles.prose}>
        <div className={styles.contactGrid}>
          <div className={styles.card}>
            <h2>Email</h2>
            <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
          </div>
          <div className={styles.card}>
            <h2>Phone</h2>
            <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}>{siteConfig.phone}</a>
          </div>
          <div className={styles.card}>
            <h2>Address</h2>
            <address style={{ fontStyle: "normal" }}>
              {siteConfig.legalName}
              <br />
              {address.streetAddress}, {address.addressLocality}
              <br />
              {address.addressRegion} {address.postalCode}, India
            </address>
          </div>
          <div className={styles.card}>
            <h2>Hours</h2>
            <p>Monday – Saturday, 10:00 – 18:00 IST</p>
          </div>
        </div>
      </div>
    </div>
  );
}
