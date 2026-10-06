import { FaqList } from "@/components/home/Sections";
import { PageHeader } from "@/components/layout/PageHeader";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteFaqs } from "@/lib/data/catalog";
import { faqJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Questions & Answers — Shankha, Shipping & Care",
  description:
    "Answers about the Shankha, the difference between puja and blowing conches, international shipping, delivery times, packing and returns.",
  path: "/faq",
});

export default function FaqPage() {
  return (
    <div className="page">
      <PageHeader
        title="Questions & Answers"
        crumbs={[{ name: "Questions & Answers", path: "/faq" }]}
        intro={<p>Clear answers about our shells, delivery and care.</p>}
      />
      <FaqList faqs={siteFaqs} />
      <JsonLd data={faqJsonLd(siteFaqs)} />
    </div>
  );
}
