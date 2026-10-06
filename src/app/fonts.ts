import localFont from "next/font/local";
import { Jost } from "next/font/google";

/** Display face — geometric capitals in the spirit of the Maison wordmark */
export const intrepid = localFont({
  src: "../fonts/Intrepid.woff2",
  variable: "--font-intrepid",
  display: "swap",
  weight: "400",
  preload: true,
  adjustFontFallback: "Arial",
  fallback: ["Futura", "Century Gothic", "sans-serif"],
});

/** Text face — Futura-like humanist geometric */
export const jost = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
  display: "swap",
  preload: true,
  fallback: ["Futura", "Century Gothic", "system-ui", "sans-serif"],
});
