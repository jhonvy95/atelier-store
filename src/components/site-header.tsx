import Link from "next/link";
import { MobileNav } from "@/components/mobile-nav";

const primaryNav = [
  { label: "New Arrivals", href: "/new-arrivals" },
  { label: "Women", href: "/collections/women" },
  { label: "Men", href: "/collections/men" },
  { label: "Accessories", href: "/collections/accessories" },
  { label: "Journal", href: "/journal" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 bg-paper/95 backdrop-blur-sm">
      <div className="divider" />
      <p className="bg-ink py-2 text-center text-eyebrow font-medium uppercase tracking-luxe text-paper">
        Complimentary shipping on all orders over $200
      </p>
      <div className="container-fashion relative flex h-20 items-center justify-between gap-6">
        <MobileNav links={primaryNav} />

        <nav
          aria-label="Primary"
          className="hidden items-center gap-8 md:flex"
        >
          {primaryNav.map((item) => (
            <Link key={item.href} href={item.href} className="nav-link">
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/"
          className="font-display text-2xl tracking-tight text-ink md:absolute md:left-1/2 md:-translate-x-1/2"
        >
          ATELIER
        </Link>

        <div className="flex items-center gap-6">
          <Link href="/search" className="nav-link hidden sm:inline">
            Search
          </Link>
          <Link href="/account" className="nav-link hidden sm:inline">
            Account
          </Link>
          <Link href="/bag" className="nav-link">
            Bag (0)
          </Link>
        </div>
      </div>
      <div className="divider" />
    </header>
  );
}
