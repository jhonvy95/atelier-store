import Link from "next/link";

const footerColumns = [
  {
    heading: "Shop",
    links: [
      { label: "New Arrivals", href: "/new-arrivals" },
      { label: "Womenswear", href: "/collections/women" },
      { label: "Menswear", href: "/collections/men" },
      { label: "Accessories", href: "/collections/accessories" },
    ],
  },
  {
    heading: "Help",
    links: [
      { label: "Shipping & Returns", href: "/help/shipping" },
      { label: "Size Guide", href: "/help/sizing" },
      { label: "Contact Us", href: "/help/contact" },
      { label: "FAQ", href: "/help/faq" },
    ],
  },
  {
    heading: "About",
    links: [
      { label: "Our Story", href: "/about" },
      { label: "The Journal", href: "/journal" },
      { label: "Sustainability", href: "/sustainability" },
      { label: "Careers", href: "/careers" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="bg-paper-alt">
      <div className="divider" />
      <div className="container-fashion grid gap-12 py-section-sm md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="flex flex-col gap-4">
          <span className="font-display text-2xl tracking-tight text-ink">
            ATELIER
          </span>
          <p className="max-w-xs text-sm text-ink-soft">
            Considered clothing and accessories, designed in-house and made
            with small ateliers across Europe.
          </p>
          <form className="mt-2 flex max-w-sm flex-col gap-3 sm:flex-row">
            <label htmlFor="footer-email" className="sr-only">
              Email address
            </label>
            <input
              id="footer-email"
              type="email"
              required
              placeholder="Enter your email"
              className="w-full border border-line bg-paper px-4 py-3 text-sm text-ink placeholder:text-ink-faint focus:border-ink focus:outline-none"
            />
            <button type="submit" className="btn btn-primary shrink-0">
              Sign Up
            </button>
          </form>
        </div>

        {footerColumns.map((column) => (
          <div key={column.heading} className="flex flex-col gap-4">
            <span className="eyebrow">{column.heading}</span>
            <ul className="flex flex-col gap-3">
              {column.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="link-underline text-sm text-ink-soft hover:text-ink"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="divider" />
      <div className="container-fashion flex flex-col items-center justify-between gap-4 py-6 text-eyebrow uppercase tracking-luxe text-ink-faint sm:flex-row">
        <p>&copy; {new Date().getFullYear()} Atelier Store</p>
        <div className="flex gap-6">
          <Link href="/legal/privacy" className="hover:text-ink">
            Privacy
          </Link>
          <Link href="/legal/terms" className="hover:text-ink">
            Terms
          </Link>
        </div>
      </div>
    </footer>
  );
}
