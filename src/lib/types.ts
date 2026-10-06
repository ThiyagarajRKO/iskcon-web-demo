export type ImageAsset = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

export type Collection = {
  slug: string;
  name: string;
  /** Short line used on tiles and in menus */
  tagline: string;
  /** Answer-first description used for SEO / AEO */
  description: string;
  image: ImageAsset;
};

export type ProductSpec = { label: string; value: string };

export type Product = {
  slug: string;
  sku: string;
  name: string;
  collection: string;
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
