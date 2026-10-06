"use client";

import Link from "next/link";
import { useState } from "react";

export function MobileNav({
  links,
}: {
  links: { label: string; href: string }[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        className="nav-link"
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        onClick={() => setOpen((value) => !value)}
      >
        {open ? "Close" : "Menu"}
      </button>

      {open && (
        <div
          id="mobile-nav-panel"
          className="absolute inset-x-0 top-full border-b border-line bg-paper"
        >
          <nav aria-label="Primary" className="container-fashion flex flex-col py-2">
            {links.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="nav-link border-b border-line py-4 last:border-b-0"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
}
