"use client";

import { useCart } from "@/hooks/useCart";
import { calculatePrice, formatEuro } from "@/lib/pricing";
import type { Product } from "@/data/products";

interface PriceDisplayProps {
  product: Product;
  qty: number;
}

export function PriceDisplay({ product, qty }: PriceDisplayProps) {
  const { isB2B } = useCart();
  const calc = calculatePrice(product, qty, isB2B);

  if (!isB2B) {
    return (
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-bold text-neutral-900">
          {formatEuro(product.retailPrice)}
        </span>
        <span className="text-sm text-neutral-500">/ Display</span>
      </div>
    );
  }

  return (
    <div className="space-y-1">
      <div className="flex items-baseline gap-2">
        {calc.isWholesale ? (
          <>
            <span className="text-2xl font-bold text-emerald-600">
              {formatEuro(product.wholesalePrice)}
            </span>
            <span className="text-sm text-neutral-500">/ Display</span>
            <span className="text-sm text-neutral-400 line-through">
              {formatEuro(product.retailPrice)}
            </span>
          </>
        ) : (
          <>
            <span className="text-2xl font-bold text-neutral-900">
              {formatEuro(product.retailPrice)}
            </span>
            <span className="text-sm text-neutral-500">/ Display</span>
            <span className="text-xs text-neutral-400">
              ab {product.mcDisplays} Displays: {formatEuro(product.wholesalePrice)}
            </span>
          </>
        )}
      </div>
      {calc.isWholesale && (
        <p className="text-sm font-medium text-emerald-600">
          Du sparst {formatEuro(calc.savingsOnOrder)} auf diese Bestellung
        </p>
      )}
    </div>
  );
}
