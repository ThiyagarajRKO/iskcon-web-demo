import localFont from "next/font/local";

/** Iskcon Font Regular — the only typeface on the site (logo, headings, body, UI). */
export const iskconFont = localFont({
  src: "../fonts/IskconFont-Regular.woff2",
  variable: "--font-iskcon",
  display: "swap",
  weight: "400",
  preload: true,
  adjustFontFallback: "Arial",
  fallback: ["Helvetica Neue", "Arial", "sans-serif"],
});
