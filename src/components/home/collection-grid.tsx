import Image from "next/image";
import Link from "next/link";
import { collections } from "@/lib/sample-data";

export function CollectionGrid() {
  return (
    <section className="py-section-sm sm:py-section">
      <div className="container-fashion mb-10 flex flex-col gap-2 sm:mb-14">
        <span className="eyebrow">Shop by Category</span>
        <h2 className="text-display-sm">Featured Collections</h2>
      </div>
      <div className="container-fashion grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {collections.map((collection) => (
          <Link
            key={collection.id}
            href={collection.href}
            className="group relative flex aspect-[4/5] w-full flex-col justify-end overflow-hidden bg-paper-alt"
          >
            <Image
              src={collection.image}
              alt={collection.title}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/0 to-transparent" />
            <div className="relative z-10 flex flex-col gap-1 p-6 text-paper">
              <h3 className="font-display text-2xl">{collection.title}</h3>
              <p className="text-sm text-paper/85">{collection.description}</p>
              <span className="eyebrow mt-3 text-paper/90 group-hover:underline">
                Shop Now
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
