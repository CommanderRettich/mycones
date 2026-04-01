"use client";

import Link from "next/link";
import { getColoredProducts } from "@/data/products";
import { ProductCard } from "@/components/shop/ProductCard";

const coloredProducts = getColoredProducts();

const colors = [
  { name: "Pink Blush", color: "#FFB6C1", products: coloredProducts.filter((p) => p.paper === "pink-blush") },
  { name: "Blue Breeze", color: "#87CEEB", products: coloredProducts.filter((p) => p.paper === "blue-breeze") },
  { name: "Green Glow", color: "#90EE90", products: coloredProducts.filter((p) => p.paper === "green-glow") },
];

export default function ColoredPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-r from-pink-100 via-sky-100 to-emerald-100">
        <div className="mx-auto max-w-7xl px-4 py-16 md:py-24">
          <p className="mb-4 text-sm font-semibold tracking-widest text-neutral-600">
            THE ORIGINAL CONES
          </p>
          <h1 className="text-3xl font-bold md:text-5xl">Colored Cones</h1>
          <p className="mt-4 max-w-xl text-lg text-neutral-600">
            Pink Blush, Blue Breeze, Green Glow — drei Farben, ein Statement.
            Nur das Papier ist eingefärbt. Kein Aroma, kein Geschmack.
          </p>
          <div className="mt-6 inline-flex items-center rounded-full bg-white/80 px-4 py-2 text-sm font-medium text-neutral-700 backdrop-blur">
            Colored not flavoured — nur Farbe, kein Aroma
          </div>
        </div>
      </section>

      {/* Colors */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        {colors.map((color) => (
          <div key={color.name} className="mb-12">
            <div className="mb-4 flex items-center gap-3">
              <span
                className="h-6 w-6 rounded-full border border-neutral-200"
                style={{ backgroundColor: color.color }}
              />
              <h2 className="text-xl font-bold">{color.name}</h2>
              <span className="text-sm text-neutral-400">
                {color.products.length} Produkte
              </span>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {color.products.map((product) => (
                <ProductCard key={product.artCode} product={product} />
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Info */}
      <section className="bg-neutral-50">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center">
          <h2 className="text-2xl font-bold">Verfügbare Größen</h2>
          <p className="mt-3 text-neutral-600">
            Colored Cones gibt es in <strong>King Size (109mm)</strong> und{" "}
            <strong>Small 1&frac14; (84mm)</strong>. Verpackung: immer Conical
            Pack — das ikonische gelb-schwarze Display.
          </p>
          <Link
            href="/konfigurator"
            className="mt-6 inline-block rounded-xl bg-black px-8 py-3 font-bold text-white transition hover:bg-neutral-800"
          >
            Im Konfigurator ausprobieren
          </Link>
        </div>
      </section>
    </div>
  );
}
