export type ImageAsset = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

/** A tab under a category title ("Chains", "Rings"…). Products opt in via `Product.subcategory`. */
export type Subcategory = { slug: string; name: string };

/** An image tile under the tabs ("Valampuri", "Idampuri"…). Products opt in via `Product.brand`. */
export type Brand = { slug: string; name: string; image: ImageAsset };

/**
 * Long-form copy shown under a listing (SEO / AEO), as on the reference.
 * Text may contain inline links written as [label](/path).
 */
export type ListingGuide = { intro: string; faqs: { q: string; a: string }[] };

export type Collection = {
  slug: string;
  name: string;
  /** Short line used on tiles and in menus */
  tagline: string;
  /** Answer-first description used for SEO / AEO */
  description: string;
  image: ImageAsset;
  subcategories?: Subcategory[];
  brands?: Brand[];
  guide?: ListingGuide;
};

export type ProductSpec = { label: string; value: string };

export type Product = {
  slug: string;
  sku: string;
  name: string;
  collection: string;
  /** Slug of one of the collection's `subcategories` */
  subcategory?: string;
  /** Slug of one of the collection's `brands` */
  brand?: string;
  /** Price in INR (base currency). Other currencies are derived for display. */
  price: number;
  shortDescription: string;
  description: string;
  images: ImageAsset[];
  specs: ProductSpec[];
  inStock: boolean;
  isNew?: boolean;
  faqs?: { q: string; a: string }[];
};
