"use client";

import { useState } from "react";
import { cart, openPanel } from "@/lib/store";
import type { Product } from "@/lib/types";

type Props = Pick<Product, "slug" | "name" | "price" | "inStock"> & { image: string };

export function AddToBag({ slug, name, price, inStock, image }: Props) {
  const [added, setAdded] = useState(false);

  if (!inStock) {
    return (
      <button type="button" className="btn btn--block" disabled>
        Sold Out
      </button>
    );
  }

  return (
    <button
      type="button"
      className="btn btn--block"
      onClick={() => {
        cart.add({ slug, name, price, image });
        setAdded(true);
        openPanel("bag");
        window.setTimeout(() => setAdded(false), 2000);
      }}
    >
      {added ? "Added to Bag" : "Add to Bag"}
    </button>
  );
}
