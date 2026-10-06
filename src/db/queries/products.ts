import { and, desc, eq, ne } from "drizzle-orm";
import { db } from "@/db";
import { products } from "@/db/schema";
import { getStockStatus, type StockStatus } from "@/lib/stock";

export type ProductListItem = {
  id: string;
  slug: string;
  name: string;
  categoryId: string;
  category: string;
  description: string;
  details: string[];
  image: string;
  imageDetail: string;
  priceCents: number;
  currency: string;
  isNew: boolean;
  stockStatus: StockStatus;
  stockQuantity: number;
};

type ProductWithRelations = {
  id: string;
  slug: string;
  name: string;
  categoryId: string;
  description: string;
  details: string[];
  image: string;
  imageDetail: string;
  priceCents: number;
  currency: string;
  isNew: boolean;
  category: { name: string } | null;
  stock: { quantity: number } | null;
};

function toListItem(product: ProductWithRelations): ProductListItem {
  const quantity = product.stock?.quantity ?? 0;
  return {
    id: product.id,
    slug: product.slug,
    name: product.name,
    categoryId: product.categoryId,
    category: product.category?.name ?? "",
    description: product.description,
    details: product.details,
    image: product.image,
    imageDetail: product.imageDetail,
    priceCents: product.priceCents,
    currency: product.currency,
    isNew: product.isNew,
    stockStatus: getStockStatus(quantity),
    stockQuantity: quantity,
  };
}

export async function getAllProductSlugs(): Promise<string[]> {
  const rows = await db.query.products.findMany({
    columns: { slug: true },
  });
  return rows.map((row) => row.slug);
}

export async function getProductBySlug(
  slug: string
): Promise<ProductListItem | null> {
  const row = await db.query.products.findFirst({
    where: eq(products.slug, slug),
    with: { category: true, stock: true },
  });
  return row ? toListItem(row) : null;
}

export async function getNewArrivals(limit = 8): Promise<ProductListItem[]> {
  const rows = await db.query.products.findMany({
    where: eq(products.isNew, true),
    with: { category: true, stock: true },
    orderBy: desc(products.createdAt),
    limit,
  });
  return rows.map(toListItem);
}

export async function getRelatedProducts(
  product: Pick<ProductListItem, "id" | "categoryId">,
  limit = 4
): Promise<ProductListItem[]> {
  const sameCategory = await db.query.products.findMany({
    where: and(
      eq(products.categoryId, product.categoryId),
      ne(products.id, product.id)
    ),
    with: { category: true, stock: true },
    limit,
  });

  if (sameCategory.length >= limit) {
    return sameCategory.map(toListItem);
  }

  const fallback = await db.query.products.findMany({
    where: ne(products.id, product.id),
    with: { category: true, stock: true },
    limit: limit - sameCategory.length,
  });

  const seen = new Set(sameCategory.map((row) => row.id));
  const combined = [
    ...sameCategory,
    ...fallback.filter((row) => !seen.has(row.id)),
  ];

  return combined.slice(0, limit).map(toListItem);
}
