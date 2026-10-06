"use client";

import { useState } from "react";
import styles from "./Footer.module.css";

export function NewsletterForm() {
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");

  return (
    <form
      className={styles.newsletter}
      onSubmit={async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        const email = new FormData(form).get("email");
        setState("sending");
        try {
          const res = await fetch("/api/newsletter", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
          });
          setState(res.ok ? "done" : "error");
          if (res.ok) form.reset();
        } catch {
          setState("error");
        }
      }}
    >
      <label htmlFor="newsletter-email" className="visually-hidden">
        Email address
      </label>
      <input id="newsletter-email" name="email" type="email" required autoComplete="email" placeholder="Email address" />
      <button type="submit" className={styles.subscribe} disabled={state === "sending"}>
        Subscribe
      </button>
      <p className={styles.formStatus} role="status">
        {state === "done" && "Thank you — you are subscribed."}
        {state === "error" && "Something went wrong. Please try again."}
      </p>
    </form>
  );
}
