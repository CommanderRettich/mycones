"use client";

import Link from "next/link";
import { ShoppingCart, Store, User, Menu, X } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useState } from "react";

const navLinks = [
  { href: "/shop", label: "Shop" },
  { href: "/the-original-cones", label: "The Original Cones" },
  { href: "/konfigurator", label: "Konfigurator" },
  { href: "/b2b", label: "Für Händler" },
  { href: "/blog", label: "Blog" },
];

export function Header() {
  const { items, isB2B, toggleB2B } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const itemCount = items.reduce((sum, item) => sum + item.qty, 0);

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-400 font-bold text-black">
            MC
          </div>
          <div className="leading-tight">
            <span className="text-lg font-bold">MyCones</span>
            <span className="block text-[10px] tracking-wider text-neutral-500">
              THE ORIGINAL CONES
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-neutral-700 transition hover:text-amber-600"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* B2B Toggle */}
          <button
            onClick={toggleB2B}
            className={`hidden items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition md:flex ${
              isB2B
                ? "bg-emerald-100 text-emerald-700"
                : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
            }`}
          >
            {isB2B ? <Store className="h-3.5 w-3.5" /> : <User className="h-3.5 w-3.5" />}
            {isB2B ? "Händler-Modus" : "Privatkunde"}
          </button>

          {/* Cart */}
          <Link
            href="/warenkorb"
            className="relative flex h-10 w-10 items-center justify-center rounded-lg transition hover:bg-neutral-100"
          >
            <ShoppingCart className="h-5 w-5" />
            {itemCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-amber-400 text-[10px] font-bold">
                {itemCount}
              </span>
            )}
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-lg transition hover:bg-neutral-100 md:hidden"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <nav className="border-t border-neutral-200 bg-white px-4 py-4 md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block py-2 text-sm font-medium text-neutral-700"
            >
              {link.label}
            </Link>
          ))}
          <button
            onClick={() => { toggleB2B(); setMenuOpen(false); }}
            className={`mt-3 w-full rounded-lg px-4 py-2 text-sm font-semibold ${
              isB2B
                ? "bg-emerald-100 text-emerald-700"
                : "bg-neutral-100 text-neutral-600"
            }`}
          >
            {isB2B ? "Händler-Modus aktiv" : "Als Händler ansehen"}
          </button>
        </nav>
      )}
    </header>
  );
}
