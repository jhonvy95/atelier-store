import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductSection } from "@/components/home/product-section";
import { StockBadge } from "@/components/stock-badge";
import { formatPrice } from "@/lib/format";
import {
  getAllProductSlugs,
  getProductBySlug,
  getRelatedProducts,
} from "@/db/queries/products";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getAllProductSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return { title: "Product Not Found — Atelier Store" };
  }

  return {
    title: `${product.name} — Atelier Store`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = await getRelatedProducts(product);
  const outOfStock = product.stockStatus === "out-of-stock";

  return (
    <>
      <div className="container-fashion pt-8">
        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center gap-2 text-eyebrow font-medium uppercase tracking-luxe text-ink-faint"
        >
          <Link href="/" className="hover:text-ink">
            Home
          </Link>
          <span aria-hidden>/</span>
          <span>{product.category}</span>
          <span aria-hidden>/</span>
          <span className="text-ink">{product.name}</span>
        </nav>
      </div>

      <section className="container-fashion grid gap-10 py-8 sm:py-12 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col gap-3">
          <div className="relative aspect-4/5 w-full overflow-hidden bg-paper-alt">
            <Image
              src={product.image}
              alt={product.name}
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="relative aspect-4/5 w-full overflow-hidden bg-paper-alt">
            <Image
              src={product.imageDetail}
              alt={`${product.name} — detail view`}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>

        <div className="flex flex-col gap-6 lg:sticky lg:top-32 lg:self-start">
          <div className="flex flex-col gap-3">
            <span className="eyebrow">{product.category}</span>
            <h1 className="text-display-sm sm:text-display-md">{product.name}</h1>
            <p className="font-display text-2xl text-ink-soft">
              {formatPrice(product.priceCents, product.currency)}
            </p>
            <StockBadge status={product.stockStatus} quantity={product.stockQuantity} />
          </div>

          <div className="divider" />

          <p className="max-w-prose text-ink-soft">{product.description}</p>

          <ul className="flex flex-col gap-2 text-sm text-ink-soft">
            {product.details.map((detail) => (
              <li key={detail} className="flex gap-2">
                <span aria-hidden>—</span>
                {detail}
              </li>
            ))}
          </ul>

          <div className="divider" />

          <div className="flex flex-col gap-3">
            <button
              type="button"
              disabled={outOfStock}
              className="btn btn-primary w-full sm:w-auto"
            >
              {outOfStock ? "Out of Stock" : "Add to Bag"}
            </button>
            <p className="text-sm text-ink-faint">
              Complimentary shipping and returns on all orders over $200.
            </p>
          </div>
        </div>
      </section>

      {relatedProducts.length > 0 && (
        <ProductSection
          eyebrow="Complete the Look"
          title="You May Also Like"
          viewAllHref="/new-arrivals"
          products={relatedProducts}
        />
      )}
    </>
  );
}
