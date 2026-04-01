import Link from "next/link";
import { products } from "@/data/products";

const originalProducts = products.filter((p) => p.paper === "original" && !p.isColored);
const naturalProducts = products.filter((p) => p.paper === "natural");
const coloredProducts = products.filter((p) => p.isColored);

export default function BrandPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-neutral-900 text-white">
        <div className="mx-auto max-w-7xl px-4 py-20 md:py-28">
          <p className="mb-4 text-sm font-semibold tracking-widest text-amber-400">
            SEIT 1994 — ROTTERDAM, NIEDERLANDE
          </p>
          <h1 className="max-w-2xl text-4xl font-bold md:text-5xl">
            The Original Cones
          </h1>
          <p className="mt-4 max-w-xl text-lg text-neutral-400">
            Vandenberg Special Products brachte 1994 den ersten industriell
            gefertigten Pre-Rolled Cone auf den Markt. Mehr als 30 Jahre bevor
            &ldquo;Pre-Roll&rdquo; zum Megamarkt wurde, war die
            Cone-Technologie Made in Europe.
          </p>
        </div>
      </section>

      {/* Paper Types */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <h2 className="mb-8 text-2xl font-bold">Unsere Papiertypen</h2>

        <div className="grid gap-8 md:grid-cols-3">
          {/* Original */}
          <div className="rounded-xl border border-neutral-200 p-6">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-sm">
              <span className="text-2xl">&#9898;</span>
            </div>
            <h3 className="text-lg font-bold">Original (Bleached)</h3>
            <p className="mt-2 text-sm text-neutral-600">
              Der Klassiker. Chlorfrei gebleichtes, ultra-dünnes Papier mit
              neutralem Geschmack. Meistverkaufte Variante weltweit.
            </p>
            <p className="mt-3 text-sm text-neutral-500">
              {originalProducts.length} Produkte
            </p>
            <Link
              href="/shop?paper=original"
              className="mt-4 inline-block text-sm font-semibold text-amber-600 hover:underline"
            >
              Original Produkte ansehen
            </Link>
          </div>

          {/* Natural */}
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-6">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-amber-100">
              <span className="text-2xl">&#129475;</span>
            </div>
            <h3 className="text-lg font-bold">Natural (Unbleached)</h3>
            <p className="mt-2 text-sm text-neutral-600">
              Ungebleicht, erdiger Charakter. Leicht langsameres Brennverhalten.
              Wächst am schnellsten im Craft-Cannabis-Segment.
            </p>
            <p className="mt-3 text-sm text-neutral-500">
              {naturalProducts.length} Produkte
            </p>
            <Link
              href="/shop?paper=natural"
              className="mt-4 inline-block text-sm font-semibold text-amber-600 hover:underline"
            >
              Natural Produkte ansehen
            </Link>
          </div>

          {/* Colored */}
          <div className="overflow-hidden rounded-xl border border-pink-200 bg-gradient-to-br from-pink-50 via-sky-50 to-emerald-50 p-6">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-pink-200 via-sky-200 to-emerald-200">
              <span className="text-2xl">&#127912;</span>
            </div>
            <h3 className="text-lg font-bold">Colored Cones</h3>
            <p className="mt-2 text-sm text-neutral-600">
              Pink Blush, Blue Breeze, Green Glow — nur das Papier ist
              eingefärbt, kein Aroma. King Size und Small 1&frac14;.
            </p>
            <p className="mt-3 text-sm text-neutral-500">
              {coloredProducts.length} Produkte
            </p>
            <Link
              href="/the-original-cones/colored"
              className="mt-4 inline-block text-sm font-semibold text-amber-600 hover:underline"
            >
              Colored Cones entdecken
            </Link>
          </div>
        </div>
      </section>

      {/* Sizes */}
      <section className="bg-neutral-50">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <h2 className="mb-8 text-2xl font-bold">6 Größen für jeden Anlass</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { mm: 84, name: "Small 1¼", use: "Multi-Packs, Tasting, Sampling" },
              { mm: 109, name: "King Size", use: "Der Weltstandard — 1g Pre-Rolls" },
              { mm: 120, name: "Bomb Size", use: "Extra stark, auffällige Box" },
              { mm: 140, name: "Party Size", use: "Für die Runde — Sessions" },
              { mm: 180, name: "Super Sized", use: "Wenn King Size nicht reicht" },
              { mm: 280, name: "Giga", use: "Das Statement-Piece" },
            ].map((size) => (
              <div
                key={size.mm}
                className="flex items-center gap-4 rounded-xl bg-white p-4 shadow-sm"
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-lg font-bold text-amber-600">
                  {size.mm}
                </div>
                <div>
                  <h3 className="font-bold">{size.name}</h3>
                  <p className="text-sm text-neutral-500">{size.mm}mm — {size.use}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-16 text-center">
        <h2 className="text-2xl font-bold">Bereit?</h2>
        <p className="mt-2 text-neutral-500">
          Finde deinen perfekten Cone oder lass dich vom Konfigurator beraten.
        </p>
        <div className="mt-6 flex justify-center gap-4">
          <Link
            href="/konfigurator"
            className="rounded-xl bg-amber-400 px-8 py-3 font-bold text-black transition hover:bg-amber-500"
          >
            Konfigurator
          </Link>
          <Link
            href="/shop"
            className="rounded-xl border-2 border-neutral-900 px-8 py-3 font-bold transition hover:bg-neutral-900 hover:text-white"
          >
            Alle Produkte
          </Link>
        </div>
      </section>
    </div>
  );
}
