import Image from "next/image";
import Link from "next/link";
import { editorial } from "@/lib/sample-data";

export function EditorialSplit() {
  return (
    <section className="border-t border-line bg-paper-alt">
      <div className="grid lg:grid-cols-2">
        <div className="relative aspect-4/5 w-full lg:aspect-auto">
          <Image
            src={editorial.image}
            alt={editorial.heading}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col justify-center gap-6 px-gutter py-16 sm:px-12 lg:px-20">
          <span className="eyebrow">{editorial.kicker}</span>
          <h2 className="max-w-md text-display-sm">{editorial.heading}</h2>
          <p className="max-w-md text-ink-soft">{editorial.copy}</p>
          <Link href={editorial.href} className="btn btn-outline w-fit">
            Read the Story
          </Link>
        </div>
      </div>
    </section>
  );
}
