"use client";

import { useCart } from "@/hooks/useCart";
import { formatEuro } from "@/lib/pricing";
import type { Product } from "@/data/products";

interface MargeWidgetProps {
  product: Product;
  qty: number;
}

export function MargeWidget({ product, qty }: MargeWidgetProps) {
  const { isB2B } = useCart();

  if (!isB2B || qty < product.mcDisplays) return null;

  const marginPerDisplay = product.retailPrice - product.wholesalePrice;
  const marginPercent = ((marginPerDisplay / product.retailPrice) * 100).toFixed(1);
  const marginOnOrder = marginPerDisplay * qty;
  const marginOnMC = marginPerDisplay * product.mcDisplays;

  return (
    <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4">
      <h4 className="mb-3 text-sm font-bold text-emerald-900">
        Ihre Marge-Übersicht
      </h4>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-emerald-700">Einkaufspreis (WS)</span>
          <span className="font-semibold text-emerald-900">
            {formatEuro(product.wholesalePrice)} / Display
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-emerald-700">Empf. Verkaufspreis</span>
          <span className="font-semibold text-emerald-900">
            {formatEuro(product.retailPrice)} / Display
          </span>
        </div>
        <div className="border-t border-emerald-200 pt-2">
          <div className="flex justify-between">
            <span className="text-emerald-700">Marge / Display</span>
            <span className="font-bold text-emerald-900">
              {formatEuro(marginPerDisplay)} ({marginPercent}%)
            </span>
          </div>
        </div>
        <div className="flex justify-between">
          <span className="text-emerald-700">
            Marge auf diese Bestellung ({qty} Displays)
          </span>
          <span className="font-bold text-emerald-900">
            {formatEuro(marginOnOrder)}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-emerald-700">
            Marge auf 1 MC ({product.mcDisplays} Displays)
          </span>
          <span className="font-bold text-emerald-900">
            {formatEuro(marginOnMC)}
          </span>
        </div>
      </div>
    </div>
  );
}
