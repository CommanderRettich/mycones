import Link from "next/link";
import { products } from "@/data/products";
import { HomeClient } from "./HomeClient";

const bestsellers = [
  products[0],  // Original KS 3er
  products[9],  // Natural KS 3er
  products[18], // Pink Blush Small
  products[19], // Pink Blush KS
  products[24], // Bomb Original 3er
  products[13], // Natural KS 12er Slidebox
].filter(Boolean);

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-amber-50 to-white">
        <div className="mx-auto max-w-7xl px-4 py-20 text-center md:py-32">
          <p className="mb-4 text-sm font-semibold tracking-widest text-amber-600">
            THE ORIGINAL CONES — SEIT 1994
          </p>
          <h1 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight text-neutral-900 md:text-6xl">
            Finde deinen perfekten Cone
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-neutral-600">
            34 Produkte, 6 Größen, 6 Papiertypen. Von Small 1&frac14; bis Giga
            280mm. Next-Day Delivery bei Bestellung bis 16:20 Uhr.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/konfigurator"
              className="rounded-xl bg-amber-400 px-8 py-3 text-lg font-bold text-black transition hover:bg-amber-500"
            >
              Konfigurator starten
            </Link>
            <Link
              href="/shop"
              className="rounded-xl border-2 border-neutral-900 px-8 py-3 text-lg font-bold text-neutral-900 transition hover:bg-neutral-900 hover:text-white"
            >
              Alle Produkte
            </Link>
          </div>
        </div>
      </section>

      {/* Delivery Banner */}
      <HomeClient />

      {/* Bestseller */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <h2 className="mb-8 text-center text-2xl font-bold">Bestseller</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {bestsellers.map((product) => (
            <Link
              key={product.artCode}
              href={`/produkt/${product.slug}`}
              className="group flex gap-4 rounded-xl border border-neutral-200 p-4 transition hover:shadow-md"
            >
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-lg bg-neutral-50 text-xl font-bold text-neutral-300">
                {product.sizeMm}
              </div>
              <div>
                <p className="text-xs text-neutral-400">{product.paperLabel}</p>
                <h3 className="text-sm font-semibold group-hover:text-amber-600">
                  {product.name}
                </h3>
                <p className="mt-1 text-xs text-neutral-500">
                  {product.piecesPerPack} Stk · {product.packagingLabel}
                </p>
                <p className="mt-1 text-sm font-bold">
                  ab{" "}
                  {new Intl.NumberFormat("de-DE", {
                    style: "currency",
                    currency: "EUR",
                  }).format(product.retailPrice)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Brand Teaser */}
      <section className="bg-neutral-900 text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 md:py-24">
          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold">The Original Cones</h2>
              <p className="mt-4 text-neutral-400">
                Vandenberg Special Products brachte 1994 den ersten industriell
                gefertigten Pre-Rolled Cone auf den Markt. Mehr als 30 Jahre
                Erfahrung in jeder Cone.
              </p>
              <div className="mt-6 grid grid-cols-3 gap-6">
                <div>
                  <p className="text-2xl font-bold text-amber-400">1994</p>
                  <p className="text-xs text-neutral-500">Gegründet</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-amber-400">6</p>
                  <p className="text-xs text-neutral-500">Papiertypen</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-amber-400">34</p>
                  <p className="text-xs text-neutral-500">Produkte</p>
                </div>
              </div>
              <Link
                href="/the-original-cones"
                className="mt-8 inline-block rounded-lg bg-amber-400 px-6 py-2.5 text-sm font-bold text-black transition hover:bg-amber-500"
              >
                Marke entdecken
              </Link>
            </div>
            <div className="flex items-center justify-center rounded-2xl bg-neutral-800 p-12">
              <div className="text-center text-neutral-500">
                <p className="text-6xl font-bold text-neutral-700">TC</p>
                <p className="mt-2 text-sm">The Original Cones</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* B2B CTA */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="rounded-2xl bg-gradient-to-r from-emerald-50 to-amber-50 p-8 md:p-12">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold">Händler werden</h2>
              <p className="mt-3 text-neutral-600">
                Ab Master Carton bis zu 40% günstiger einkaufen. Marge live
                berechnen, 1-Klick-Nachbestellung, Next-Day Delivery.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-neutral-600">
                <li className="flex gap-2">
                  <span className="text-emerald-500">&#10003;</span>
                  Händlerpreise ab 1 Master Carton
                </li>
                <li className="flex gap-2">
                  <span className="text-emerald-500">&#10003;</span>
                  Live-Marge-Berechnung im Dashboard
                </li>
                <li className="flex gap-2">
                  <span className="text-emerald-500">&#10003;</span>
                  1-Klick-Nachbestellung aus Bestellhistorie
                </li>
                <li className="flex gap-2">
                  <span className="text-emerald-500">&#10003;</span>
                  Next-Day Delivery — bei Bestellung bis 16:20 Uhr
                </li>
              </ul>
              <Link
                href="/b2b"
                className="mt-6 inline-block rounded-lg bg-emerald-600 px-6 py-2.5 text-sm font-bold text-white transition hover:bg-emerald-700"
              >
                Jetzt registrieren
              </Link>
            </div>
            <div className="flex items-center justify-center">
              <div className="rounded-xl border border-emerald-200 bg-white p-6 shadow-sm">
                <p className="text-xs text-neutral-500">Beispiel-Marge</p>
                <p className="text-sm text-neutral-700">
                  Original King Size 3er — 32 Displays
                </p>
                <div className="mt-3 space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>EK (Händler)</span>
                    <span className="font-bold text-emerald-600">10,90 EUR</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>VK (Retail)</span>
                    <span>18,10 EUR</span>
                  </div>
                  <div className="border-t pt-1">
                    <div className="flex justify-between text-sm font-bold">
                      <span>Marge / Display</span>
                      <span className="text-emerald-600">7,20 EUR (39,8%)</span>
                    </div>
                    <div className="flex justify-between text-sm font-bold">
                      <span>Marge / MC</span>
                      <span className="text-emerald-600">230,40 EUR</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Colored Cones Teaser */}
      <section className="mx-auto max-w-7xl px-4 pb-16">
        <div className="overflow-hidden rounded-2xl bg-gradient-to-r from-pink-100 via-sky-100 to-emerald-100 p-8 md:p-12">
          <h2 className="text-2xl font-bold">Colored Cones</h2>
          <p className="mt-2 text-neutral-600">
            Pink Blush, Blue Breeze, Green Glow — nur das Papier ist eingefärbt,
            kein Aroma. Verfügbar in King Size und Small 1&frac14;.
          </p>
          <Link
            href="/the-original-cones/colored"
            className="mt-6 inline-block rounded-lg bg-black px-6 py-2.5 text-sm font-bold text-white transition hover:bg-neutral-800"
          >
            Colored Cones entdecken
          </Link>
        </div>
      </section>
    </div>
  );
}
