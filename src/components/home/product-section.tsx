import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import type { ProductListItem } from "@/db/queries/products";

export function ProductSection({
  eyebrow,
  title,
  viewAllHref,
  products,
}: {
  eyebrow: string;
  title: string;
  viewAllHref: string;
  products: ProductListItem[];
}) {
  return (
    <section className="border-t border-line py-section-sm sm:py-section">
      <div className="container-fashion mb-10 flex flex-wrap items-end justify-between gap-4 sm:mb-14">
        <div className="flex flex-col gap-2">
          <span className="eyebrow">{eyebrow}</span>
          <h2 className="text-display-sm">{title}</h2>
        </div>
        <Link href={viewAllHref} className="link-underline text-sm text-ink-soft hover:text-ink">
          View All
        </Link>
      </div>
      <div className="container-fashion grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
