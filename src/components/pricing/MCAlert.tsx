"use client";

import { useCart } from "@/hooks/useCart";
import { getMCAlertMessage, formatEuro } from "@/lib/pricing";
import type { Product } from "@/data/products";
import { TrendingUp, Check, Package } from "lucide-react";

interface MCAlertProps {
  product: Product;
  qty: number;
  onSetToMC?: () => void;
}

const alertStyles: Record<string, string> = {
  orange: "border-orange-200 bg-orange-50 text-orange-800",
  amber: "border-amber-200 bg-amber-50 text-amber-800",
  green: "border-emerald-200 bg-emerald-50 text-emerald-800",
  emerald: "border-emerald-300 bg-emerald-100 text-emerald-900",
};

const alertIcons: Record<string, React.ReactNode> = {
  orange: <TrendingUp className="h-4 w-4 shrink-0" />,
  amber: <Package className="h-4 w-4 shrink-0" />,
  green: <Check className="h-4 w-4 shrink-0" />,
  emerald: <Check className="h-4 w-4 shrink-0" />,
};

export function MCAlert({ product, qty, onSetToMC }: MCAlertProps) {
  const { isB2B } = useCart();

  if (!isB2B) return null;

  const alert = getMCAlertMessage(product, qty);
  if (!alert) return null;

  const missingToMC = Math.max(0, product.mcDisplays - qty);

  return (
    <div
      className={`flex items-start gap-3 rounded-lg border p-3 ${alertStyles[alert.color]}`}
    >
      {alertIcons[alert.color]}
      <div className="flex-1">
        <p className="text-sm font-medium">{alert.message}</p>
        {missingToMC > 0 && onSetToMC && (
          <button
            onClick={onSetToMC}
            className="mt-2 rounded-md bg-amber-400 px-3 py-1.5 text-xs font-bold text-black transition hover:bg-amber-500"
          >
            + {missingToMC} Displays hinzufügen — Händlerpreis aktivieren
          </button>
        )}
      </div>
    </div>
  );
}
