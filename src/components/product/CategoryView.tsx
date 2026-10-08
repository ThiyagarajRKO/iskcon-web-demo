import { PageHeader } from "@/components/layout/PageHeader";
import { CollectionNav } from "@/components/product/CollectionNav";
import { ListingGuide } from "@/components/product/ListingGuide";
import { ProductListing } from "@/components/product/ProductListing";
import { JsonLd } from "@/components/seo/JsonLd";
import { categoryTabs } from "@/lib/categories";
import { itemListJsonLd } from "@/lib/seo";
import type { Collection, Product } from "@/lib/types";

type Props = {
  collection: Collection;
  /** Every product in the category (drives which tabs show) */
  all: Product[];
  /** Products for the current tab */
  products: Product[];
  /** Current tab; omitted on "View All" */
  tab?: { slug: string; name: string };
};

/** Category page: title, sub-category tabs, brand tiles, then the product grid (as on the reference). */
export function CategoryView({ collection, all, products, tab }: Props) {
  const base = `/collections/${collection.slug}`;
  const path = tab ? `${base}/${tab.slug}` : base;
  const listName = tab ? `${collection.name} — ${tab.name}` : collection.name;

  return (
    <div className="page">
      <PageHeader
        title={collection.name}
        align="start"
        crumbs={[
          { name: "All Creations", path: "/collections" },
          { name: collection.name, path: base },
          ...(tab ? [{ name: tab.name, path }] : []),
        ]}
      >
        <CollectionNav items={categoryTabs(collection, all)} active={path} label={`${collection.name} categories`} />
      </PageHeader>
      {products.length > 0 ? (
        <ProductListing key={path} products={products} brands={collection.brands} />
      ) : (
        <p className="container" style={{ textAlign: "center", paddingBlock: 48 }}>
          New pieces are being prepared for this collection.
        </p>
      )}
      <ListingGuide guide={collection.guide ?? { intro: collection.description, faqs: [] }} />
      <JsonLd data={itemListJsonLd(listName, products)} />
    </div>
  );
}
