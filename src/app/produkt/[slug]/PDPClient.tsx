"use client";

import { useState } from "react";
import Link from "next/link";
import type { Product } from "@/data/products";
import { useCart } from "@/hooks/useCart";
import { PriceDisplay } from "@/components/pricing/PriceDisplay";
import { MCAlert } from "@/components/pricing/MCAlert";
import { MargeWidget } from "@/components/pricing/MargeWidget";
import { DeliveryBadge } from "@/components/delivery/DeliveryBadge";
import { ShoppingCart, Minus, Plus, ChevronRight } from "lucide-react";
import { formatEuro } from "@/lib/pricing";

const paperColors: Record<string, string> = {
  original: "bg-white",
  natural: "bg-amber-50",
  hemp: "bg-green-50",
  "pink-blush": "bg-pink-50",
  "blue-breeze": "bg-sky-50",
  "green-glow": "bg-emerald-50",
};

interface PDPClientProps {
  product: Product;
  related: Product[];
}

export function PDPClient({ product, related }: PDPClientProps) {
  const [qty, setQty] = useState(1);
  const { addItem, isB2B } = useCart();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-sm text-neutral-500">
        <Link href="/" className="hover:text-neutral-900">
          Home
        </Link>
        <ChevronRight className="h-3 w-3" />
        <Link href="/shop" className="hover:text-neutral-900">
          Shop
        </Link>
        <ChevronRight className="h-3 w-3" />
        <Link
          href="/the-original-cones"
          className="hover:text-neutral-900"
        >
          The Original Cones
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-neutral-900">{product.name}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Gallery Placeholder */}
        <div className="space-y-4">
          <div
            className={`flex aspect-square items-center justify-center rounded-2xl ${paperColors[product.paper] ?? "bg-neutral-50"}`}
          >
            <div className="text-center">
              <div className="text-7xl font-bold text-neutral-200">
                {product.sizeMm}mm
              </div>
              <div className="mt-2 text-lg text-neutral-300">
                {product.packagingLabel}
              </div>
              <div className="mt-1 text-sm text-neutral-400">
                {product.paperLabel}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={`flex aspect-square items-center justify-center rounded-lg ${paperColors[product.paper] ?? "bg-neutral-50"}`}
              >
                <span className="text-xs text-neutral-300">
                  Bild {i}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <p className="text-sm text-neutral-500">{product.paperLabel}</p>
            <h1 className="mt-1 text-2xl font-bold md:text-3xl">
              {product.name}
            </h1>
            <p className="mt-1 text-sm text-neutral-400">
              Art. {product.artCode}
            </p>
          </div>

          {/* Delivery Badge */}
          <DeliveryBadge />

          {/* Price */}
          <PriceDisplay product={product} qty={qty} />

          {/* MC Alert (B2B) */}
          <MCAlert
            product={product}
            qty={qty}
            onSetToMC={() => setQty(product.mcDisplays)}
          />

          {/* Quantity Selector */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-neutral-700">
              Menge (Displays)
            </label>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQty(Math.max(1, qty - 1))}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-200 transition hover:bg-neutral-50"
              >
                <Minus className="h-4 w-4" />
              </button>
              <input
                type="number"
                min={1}
                value={qty}
                onChange={(e) => setQty(Math.max(1, Number(e.target.value)))}
                className="h-10 w-20 rounded-lg border border-neutral-200 text-center text-sm font-semibold"
              />
              <button
                onClick={() => setQty(qty + 1)}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-200 transition hover:bg-neutral-50"
              >
                <Plus className="h-4 w-4" />
              </button>

              {/* Quick-Add Buttons */}
              {isB2B && qty < product.mcDisplays && (
                <div className="flex gap-2">
                  <button
                    onClick={() => setQty(Math.min(qty + 5, product.mcDisplays))}
                    className="rounded-lg border border-neutral-200 px-3 py-2 text-xs font-semibold transition hover:bg-neutral-50"
                  >
                    +5
                  </button>
                  <button
                    onClick={() => setQty(Math.min(qty + 10, product.mcDisplays))}
                    className="rounded-lg border border-neutral-200 px-3 py-2 text-xs font-semibold transition hover:bg-neutral-50"
                  >
                    +10
                  </button>
                  <button
                    onClick={() => setQty(product.mcDisplays)}
                    className="rounded-lg bg-amber-100 px-3 py-2 text-xs font-bold text-amber-800 transition hover:bg-amber-200"
                  >
                    MC ({product.mcDisplays})
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Total */}
          <div className="rounded-lg bg-neutral-50 p-4">
            <div className="flex justify-between">
              <span className="text-sm text-neutral-600">
                {qty} Display{qty !== 1 ? "s" : ""} &times;{" "}
                {formatEuro(
                  qty >= product.mcDisplays
                    ? product.wholesalePrice
                    : product.retailPrice
                )}
              </span>
              <span className="text-lg font-bold">
                {formatEuro(
                  qty *
                    (qty >= product.mcDisplays
                      ? product.wholesalePrice
                      : product.retailPrice)
                )}
              </span>
            </div>
          </div>

          {/* Add to Cart */}
          <button
            onClick={() => addItem(product, qty)}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-amber-400 py-4 text-lg font-bold text-black transition hover:bg-amber-500"
          >
            <ShoppingCart className="h-5 w-5" />
            In den Warenkorb
          </button>

          {/* Marge Widget (B2B) */}
          <MargeWidget product={product} qty={qty} />

          {/* Specs */}
          <div className="rounded-lg border border-neutral-200 p-4">
            <h3 className="mb-3 text-sm font-bold">Spezifikationen</h3>
            <div className="space-y-2 text-sm">
              {[
                ["Papier", product.paperLabel],
                ["Größe", `${product.sizeMm}mm`],
                ["Stk / Pack", String(product.piecesPerPack)],
                ["Verpackung", product.packagingLabel],
                ["Displays / MC", String(product.mcDisplays)],
                ["Art.-Nr.", product.artCode],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between">
                  <span className="text-neutral-500">{label}</span>
                  <span className="font-medium">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-6 text-xl font-bold">Passende Produkte</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p) => (
              <Link
                key={p.artCode}
                href={`/produkt/${p.slug}`}
                className="group rounded-xl border border-neutral-200 p-4 transition hover:shadow-md"
              >
                <p className="text-xs text-neutral-400">{p.paperLabel}</p>
                <h3 className="text-sm font-semibold group-hover:text-amber-600">
                  {p.name}
                </h3>
                <p className="mt-1 text-xs text-neutral-500">
                  {p.sizeMm}mm · {p.piecesPerPack} Stk
                </p>
                <p className="mt-2 text-sm font-bold">
                  {formatEuro(p.retailPrice)}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
