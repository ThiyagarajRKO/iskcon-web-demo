import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import styles from "@/components/layout/Prose.module.css";

export const metadata: Metadata = {
  title: "Checkout",
  robots: { index: false, follow: false },
};

// TODO(backend): replace with the real checkout flow (address, shipping rates, payment gateway).
export default function CheckoutPage() {
  return (
    <div className="page">
      <PageHeader title="Checkout" crumbs={[{ name: "Checkout", path: "/checkout" }]} />
      <div className={styles.prose} style={{ textAlign: "center" }}>
        <p>Secure checkout opens once payment and shipping are connected to the store backend.</p>
      </div>
    </div>
  );
}
