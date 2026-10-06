import { siteConfig } from "@/lib/site";
import styles from "./Logo.module.css";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`${styles.logo} ${className}`}>
      {siteConfig.name}
    </span>
  );
}
