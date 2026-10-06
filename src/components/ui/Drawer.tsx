"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Icon } from "@/components/ui/Icon";
import { closePanel } from "@/lib/store";
import styles from "./Drawer.module.css";

const FOCUSABLE = 'a[href],button:not([disabled]),input:not([disabled]),select,textarea,[tabindex]:not([tabindex="-1"])';

type Props = {
  open: boolean;
  side?: "left" | "right" | "top";
  label: string;
  title?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
};

export function Drawer({ open, side = "left", label, title, children, footer }: Props) {
  const panelRef = useRef<HTMLDivElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  // Drives the CSS transition one frame after `open` changes, so a freshly mounted panel still slides in.
  const [shown, setShown] = useState(false);

  useEffect(() => {
    let inner = 0;
    const outer = requestAnimationFrame(() => {
      inner = requestAnimationFrame(() => setShown(open));
    });
    return () => {
      cancelAnimationFrame(outer);
      cancelAnimationFrame(inner);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    returnFocus.current = document.activeElement as HTMLElement | null;
    const panel = panelRef.current;
    // Focus after the slide-in starts so the browser does not scroll the panel.
    const t = window.setTimeout(() => {
      // Inputs opt in with data-autofocus; otherwise focus the dialog itself so no ring shows on the first button.
      (panel?.querySelector<HTMLElement>("[data-autofocus]") ?? panel)?.focus({ preventScroll: true });
    }, 60);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closePanel();
        return;
      }
      if (e.key !== "Tab" || !panel) return;
      const items = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE)).filter((el) => el.offsetParent !== null);
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(t);
      document.removeEventListener("keydown", onKey);
      returnFocus.current?.focus?.({ preventScroll: true });
    };
  }, [open]);

  return (
    <div className={styles.root} data-open={shown || undefined} data-side={side} aria-hidden={!open} inert={!open}>
      <div className={styles.backdrop} onClick={closePanel} />
      <div ref={panelRef} className={styles.panel} role="dialog" aria-modal="true" aria-label={label} tabIndex={-1}>
        <div className={styles.head}>
          <div className={styles.title}>{title}</div>
          <button type="button" className={styles.close} onClick={closePanel} aria-label="Close">
            <Icon name="close" />
            <span className={styles.closeLabel}>Close</span>
          </button>
        </div>
        <div className={styles.body}>{children}</div>
        {footer && <div className={styles.footer}>{footer}</div>}
      </div>
    </div>
  );
}
