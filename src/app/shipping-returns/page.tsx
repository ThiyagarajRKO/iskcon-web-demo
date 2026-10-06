import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import styles from "@/components/layout/Prose.module.css";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Shipping & Returns — Worldwide Delivery",
  description:
    "Orders ship from India in 1–3 working days. India delivery takes 3–7 working days; international delivery takes 7–14 working days, tracked and insured. Returns within 14 days.",
  path: "/shipping-returns",
});

export default function ShippingPage() {
  return (
    <div className="page">
      <PageHeader title="Shipping & Returns" crumbs={[{ name: "Shipping & Returns", path: "/shipping-returns" }]} />
      <article className={styles.prose}>
        <h2 id="shipping">Shipping</h2>
        <ul>
          <li>Orders are prepared and dispatched from India within 1–3 working days.</li>
          <li>India: delivery in 3–7 working days.</li>
          <li>International: delivery in 7–14 working days, depending on customs.</li>
          <li>Every parcel is tracked and insured. A tracking link is emailed at dispatch.</li>
        </ul>

        <h2 id="duties">Duties & taxes</h2>
        <p>
          International orders may be subject to import duties and taxes set by the destination country. Where
          available these are shown at checkout; otherwise they are collected by the carrier on delivery.
        </p>

        <h2 id="packing">Packing</h2>
        <p>Each shell is cloth-wrapped, cushioned and boxed individually inside a rigid outer carton.</p>

        <h2 id="returns">Returns</h2>
        <p>
          Unused items in original packaging can be returned within 14 days of delivery. One-of-a-kind heritage pieces
          are final sale unless they arrive damaged. To start a return, <Link href="/contact">contact us</Link> with
          your order number.
        </p>
      </article>
    </div>
  );
}
