import Link from "next/link";

export default function NotFound() {
  return (
    <div className="page container" style={{ textAlign: "center", paddingBlock: "calc(var(--header-h) + 80px) 40px" }}>
      <p className="eyebrow">404</p>
      <h1 className="section-title" style={{ margin: "16px 0 24px" }}>
        This page could not be found
      </h1>
      <Link href="/collections" className="btn">
        Discover the Collection
      </Link>
    </div>
  );
}
