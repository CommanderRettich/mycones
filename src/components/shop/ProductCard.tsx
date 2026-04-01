"use client";

import Link from "next/link";
import { useCart } from "@/hooks/useCart";
import { formatEuro } from "@/lib/pricing";
import type { Product } from "@/data/products";
import { ShoppingCart } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

const paperColors: Record<string, string> = {
  original: "bg-white border-neutral-300",
  natural: "bg-amber-50 border-amber-200",
  hemp: "bg-green-50 border-green-200",
  "pink-blush": "bg-pink-50 border-pink-200",
  "blue-breeze": "bg-sky-50 border-sky-200",
  "green-glow": "bg-emerald-50 border-emerald-200",
};

export function ProductCard({ product }: ProductCardProps) {
  const { addItem, isB2B } = useCart();

  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white transition hover:shadow-lg">
      {/* Product Image Placeholder */}
      <Link
        href={`/produkt/${product.slug}`}
        className={`relative flex h-48 items-center justify-center ${paperColors[product.paper] ?? "bg-neutral-50"}`}
      >
        <div className="text-center">
          <div className="text-3xl font-bold text-neutral-300">
            {product.sizeMm}mm
          </div>
          <div className="mt-1 text-xs text-neutral-400">
            {product.packagingLabel}
          </div>
        </div>
        {product.isColored && (
          <span className="absolute right-2 top-2 rounded-full bg-gradient-to-r from-pink-400 via-blue-400 to-green-400 px-2 py-0.5 text-[10px] font-bold text-white">
            COLORED
          </span>
        )}
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        <Link href={`/produkt/${product.slug}`}>
          <p className="text-xs text-neutral-400">{product.paperLabel}</p>
          <h3 className="mt-0.5 text-sm font-semibold text-neutral-900 group-hover:text-amber-600">
            {product.name}
          </h3>
          <p className="mt-1 text-xs text-neutral-500">
            {product.piecesPerPack} Stk · {product.sizeMm}mm ·{" "}
            {product.packagingLabel}
          </p>
        </Link>

        <div className="mt-auto pt-3">
          {/* Price */}
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-neutral-900">
              {formatEuro(product.retailPrice)}
            </span>
            {isB2B && (
              <span className="text-xs text-emerald-600">
                ab {product.mcDisplays}: {formatEuro(product.wholesalePrice)}
              </span>
            )}
          </div>

          {isB2B && (
            <p className="mt-0.5 text-xs text-neutral-500">
              Marge: {formatEuro(product.margin)} ({product.marginPercent}%)
            </p>
          )}

          {/* Add to Cart */}
          <button
            onClick={() => addItem(product)}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-amber-400 py-2 text-sm font-bold text-black transition hover:bg-amber-500"
          >
            <ShoppingCart className="h-4 w-4" />
            In den Warenkorb
          </button>
        </div>
      </div>
    </div>
  );
}
