import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/layout/PageHeader";
import { AddToBag } from "@/components/product/AddToBag";
import { Price } from "@/components/product/Price";
import { ProductCard } from "@/components/product/ProductCard";
import { JsonLd } from "@/components/seo/JsonLd";
import { Icon } from "@/components/ui/Icon";
import { Rail } from "@/components/ui/Rail";
import { getCollection, getProduct, getProducts, getRelatedProducts } from "@/lib/catalog";
import { clip, faqJsonLd, pageMetadata, productJsonLd } from "@/lib/seo";
import styles from "./page.module.css";

export const dynamicParams = true;
export const revalidate = 300;

export async function generateStaticParams() {
  return (await getProducts()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/products/[slug]">) {
  const { slug } = await params;
  const p = await getProduct(slug);
  if (!p) return {};
  return pageMetadata({
    title: p.name,
    description: clip(`${p.shortDescription} ${p.description}`),
    path: `/products/${p.slug}`,
    image: p.images[0],
  });
}

export default async function ProductPage({ params }: PageProps<"/products/[slug]">) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();
  const [collection, related] = await Promise.all([getCollection(product.collection), getRelatedProducts(product)]);

  return (
    <div className="page">
      <div className={styles.layout}>
        <div className={styles.gallery} aria-label={`${product.name} images`}>
          {product.images.map((img, i) => (
            <figure key={img.src + i} className={styles.figure}>
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(min-width: 1024px) 60vw, 100vw"
                quality={75}
                loading={i === 0 ? "eager" : "lazy"}
                fetchPriority={i === 0 ? "high" : "auto"}
              />
            </figure>
          ))}
        </div>

        <aside className={styles.panel}>
          <div className={styles.sticky}>
            <Breadcrumbs
              visible={false}
              items={[
                { name: "All Creations", path: "/collections" },
                ...(collection ? [{ name: collection.name, path: `/collections/${collection.slug}` }] : []),
                { name: product.name, path: `/products/${product.slug}` },
              ]}
            />
            <p className={styles.sku}>{product.sku}</p>
            <h1 className={styles.name}>{product.name}</h1>
            <Price inr={product.price} className={styles.price} />
            <p className={styles.short}>{product.shortDescription}</p>

            <AddToBag
              slug={product.slug}
              name={product.name}
              price={product.price}
              inStock={product.inStock}
              image={product.images[0].src}
            />

            <ul className={styles.perks}>
              <li>
                <Icon name="truck" size={18} /> Tracked, insured delivery in India and worldwide
              </li>
              <li>
                <Icon name="gift" size={18} /> Cloth-wrapped in a signature gift box
              </li>
              <li>
                <Icon name="chat" size={18} />{" "}
                <Link href="/contact" className="link-underline">
                  Ask a Client Advisor
                </Link>
              </li>
            </ul>

            <div className={styles.accordions}>
              <details open>
                <summary>Product Details</summary>
                <div className={styles.detailBody}>
                  <p>{product.description}</p>
                  <dl className={styles.specs}>
                    {product.specs.map((s) => (
                      <div key={s.label}>
                        <dt>{s.label}</dt>
                        <dd>{s.value}</dd>
                      </div>
                    ))}
                  </dl>
                  <p className={styles.note}>
                    Each shell is natural, so size, colour and markings vary slightly from the photographs.
                  </p>
                </div>
              </details>
              <details>
                <summary>Delivery & Returns</summary>
                <div className={styles.detailBody}>
                  <p>
                    Ships in 1–3 working days. India: 3–7 working days. International: 7–14 working days, tracked and
                    insured. Unused items may be returned within 14 days. <Link href="/shipping-returns">Learn more</Link>
                  </p>
                </div>
              </details>
              {product.faqs?.map((f) => (
                <details key={f.q}>
                  <summary>{f.q}</summary>
                  <div className={styles.detailBody}>
                    <p>{f.a}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </aside>
      </div>

      {related.length > 0 && (
        <section className={styles.related} aria-labelledby="related-title">
          <h2 id="related-title" className="section-title">
            You May Also Like
          </h2>
          <Rail label="Related products">
            {related.map((p) => (
              <li key={p.slug}>
                <ProductCard product={p} sizes="(min-width: 1024px) 25vw, (min-width: 640px) 40vw, 72vw" />
              </li>
            ))}
          </Rail>
        </section>
      )}

      <JsonLd data={[productJsonLd(product, collection), ...(product.faqs ? [faqJsonLd(product.faqs)] : [])]} />
    </div>
  );
}
