export const siteConfig = {
  name: "Shankha",
  legalName: "Shankha by ISKCON",
  tagline: "Sacred Conch & Sea Shells",
  description:
    "Hand-selected sacred conch shells (Shankha), cowries and collector sea shells from the coasts of India — prepared for puja, kirtan and heritage collections, and shipped worldwide.",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, ""),
  locale: "en_IN",
  email: "care@example.com",
  phone: "+91 00000 00000",
  address: {
    streetAddress: "Hare Krishna Hill",
    addressLocality: "Bengaluru",
    addressRegion: "Karnataka",
    postalCode: "560010",
    addressCountry: "IN",
  },
  social: {
    instagram: "https://www.instagram.com/",
    youtube: "https://www.youtube.com/",
    facebook: "https://www.facebook.com/",
  },
  shipsTo: ["IN", "US", "GB", "AE", "CA", "AU", "SG", "DE", "FR", "NL"],
} as const;

export const absoluteUrl = (path = "/") => `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
