import Image from "next/image";
import Link from "next/link";
import type { ProductListItem } from "@/db/queries/products";
import { formatPrice } from "@/lib/format";

export function ProductCard({ product }: { product: ProductListItem }) {
  const outOfStock = product.stockStatus === "out-of-stock";

  return (
    <Link href={`/products/${product.slug}`} className="product-card group">
      <div className="product-card__frame">
        {outOfStock ? (
          <span className="absolute left-3 top-3 z-10 bg-ink-faint px-3 py-1 text-eyebrow font-medium uppercase tracking-luxe text-paper">
            Sold Out
          </span>
        ) : (
          product.isNew && (
            <span className="absolute left-3 top-3 z-10 bg-ink px-3 py-1 text-eyebrow font-medium uppercase tracking-luxe text-paper">
              New
            </span>
          )
        )}
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className={`object-cover ${outOfStock ? "opacity-60" : ""}`}
        />
      </div>
      <div>
        <span className="eyebrow mb-1">{product.category}</span>
        <p className="product-card__title">{product.name}</p>
        <p className="product-card__price">
          {formatPrice(product.priceCents, product.currency)}
        </p>
      </div>
    </Link>
  );
}
