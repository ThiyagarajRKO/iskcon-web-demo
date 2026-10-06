"use client";

import Image from "next/image";
import Link from "next/link";
import { Drawer } from "@/components/ui/Drawer";
import { Icon } from "@/components/ui/Icon";
import { Price } from "@/components/product/Price";
import { cart, cartCount, cartTotal, closePanel, useCart } from "@/lib/store";
import styles from "./BagDrawer.module.css";

export default function BagDrawer({ open }: { open: boolean }) {
  const lines = useCart();
  const count = cartCount(lines);

  return (
    <Drawer
      open={open}
      side="right"
      label="Shopping bag"
      title={`Shopping Bag${count ? ` (${count})` : ""}`}
      footer={
        lines.length > 0 && (
          <>
            <div className={styles.total}>
              <span>Subtotal</span>
              <Price inr={cartTotal(lines)} />
            </div>
            <p className={styles.note}>Shipping, duties and taxes are calculated at checkout.</p>
            <Link href="/checkout" className="btn btn--block" onClick={closePanel}>
              Proceed to Checkout
            </Link>
          </>
        )
      }
    >
      {lines.length === 0 ? (
        <div className={styles.empty}>
          <p>Your shopping bag is empty.</p>
          <Link href="/collections" className="btn btn--outline" onClick={closePanel}>
            Discover the Collection
          </Link>
        </div>
      ) : (
        <ul className={styles.lines}>
          {lines.map((l) => (
            <li key={l.slug} className={styles.line}>
              <Link href={`/products/${l.slug}`} onClick={closePanel} className={styles.thumb}>
                <Image src={l.image} alt="" fill sizes="96px" />
              </Link>
              <div className={styles.info}>
                <Link href={`/products/${l.slug}`} onClick={closePanel} className={styles.name}>
                  {l.name}
                </Link>
                <Price inr={l.price * l.qty} className={styles.price} />
                <div className={styles.controls}>
                  <div className={styles.qty} role="group" aria-label={`Quantity for ${l.name}`}>
                    <button type="button" onClick={() => cart.setQty(l.slug, l.qty - 1)} aria-label="Decrease quantity">
                      <Icon name="minus" size={14} />
                    </button>
                    <span aria-live="polite">{l.qty}</span>
                    <button type="button" onClick={() => cart.setQty(l.slug, l.qty + 1)} aria-label="Increase quantity">
                      <Icon name="plus" size={14} />
                    </button>
                  </div>
                  <button type="button" className={styles.remove} onClick={() => cart.remove(l.slug)}>
                    Remove
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </Drawer>
  );
}
