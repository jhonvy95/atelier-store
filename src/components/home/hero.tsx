import Image from "next/image";
import Link from "next/link";
import { heroImage } from "@/lib/sample-data";

export function Hero() {
  return (
    <section className="relative flex h-[88vh] min-h-[34rem] w-full items-end overflow-hidden bg-ink-soft">
      <Image
        src={heroImage}
        alt="Model wearing a tailored wool coat from the Fall/Winter collection"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
      <div className="container-fashion relative z-10 flex flex-col gap-6 pb-16 text-paper sm:pb-20">
        <span className="eyebrow text-paper/80">Fall / Winter 2026</span>
        <h1 className="max-w-2xl text-display-sm sm:text-display-md lg:text-display-lg">
          Quiet luxury, made to last.
        </h1>
        <p className="max-w-md text-base text-paper/85">
          Tailored silhouettes and considered fabrics, designed in-house and
          produced with small ateliers across Europe.
        </p>
        <div className="flex flex-wrap gap-4 pt-2">
          <Link href="/new-arrivals" className="btn btn-primary">
            Shop New Arrivals
          </Link>
          <Link
            href="/collections/women"
            className="btn border-paper text-paper hover:bg-paper hover:text-ink"
          >
            Explore Collections
          </Link>
        </div>
      </div>
    </section>
  );
}
