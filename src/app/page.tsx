import { Hero } from "@/components/home/hero";
import { CollectionGrid } from "@/components/home/collection-grid";
import { ProductSection } from "@/components/home/product-section";
import { EditorialSplit } from "@/components/home/editorial-split";
import { getNewArrivals } from "@/db/queries/products";

export default async function Home() {
  const newArrivals = await getNewArrivals();

  return (
    <>
      <Hero />
      <CollectionGrid />
      <ProductSection
        eyebrow="Just In"
        title="New Arrivals"
        viewAllHref="/new-arrivals"
        products={newArrivals}
      />
      <EditorialSplit />
      <ProductSection
        eyebrow="Customer Favorites"
        title="Best Sellers"
        viewAllHref="/best-sellers"
        products={[...newArrivals].reverse()}
      />
    </>
  );
}
