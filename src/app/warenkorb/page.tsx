"use client";

import Link from "next/link";
import { useCart } from "@/hooks/useCart";
import { calculatePrice, formatEuro } from "@/lib/pricing";
import { MCAlert } from "@/components/pricing/MCAlert";
import { CountdownTimer } from "@/components/delivery/CountdownTimer";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";

export default function WarenkorbPage() {
  const { items, isB2B, updateQty, removeItem, setToMC } = useCart();

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <ShoppingBag className="mx-auto h-16 w-16 text-neutral-200" />
        <h1 className="mt-4 text-2xl font-bold">Dein Warenkorb ist leer</h1>
        <p className="mt-2 text-neutral-500">
          Entdecke unsere 34 Display-Produkte
        </p>
        <Link
          href="/shop"
          className="mt-6 inline-block rounded-xl bg-amber-400 px-8 py-3 font-bold text-black transition hover:bg-amber-500"
        >
          Zum Shop
        </Link>
      </div>
    );
  }

  const cartTotals = items.map((item) => {
    const calc = calculatePrice(item.product, item.qty, isB2B);
    return { ...item, calc };
  });

  const subtotal = cartTotals.reduce(
    (sum, item) => sum + item.calc.totalPrice,
    0
  );
  const totalSavings = isB2B
    ? cartTotals.reduce((sum, item) => sum + item.calc.savingsOnOrder, 0)
    : 0;

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold">Warenkorb</h1>

      {/* Delivery Countdown */}
      <div className="mb-6">
        <CountdownTimer />
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Cart Items */}
        <div className="space-y-4 lg:col-span-2">
          {items.map((item) => {
            const calc = calculatePrice(item.product, item.qty, isB2B);
            return (
              <div
                key={item.product.artCode}
                className="rounded-xl border border-neutral-200 p-4"
              >
                <div className="flex gap-4">
                  {/* Image Placeholder */}
                  <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-lg bg-neutral-50 text-lg font-bold text-neutral-200">
                    {item.product.sizeMm}
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between">
                      <div>
                        <p className="text-xs text-neutral-400">
                          {item.product.paperLabel}
                        </p>
                        <h3 className="font-semibold">{item.product.name}</h3>
                        <p className="text-xs text-neutral-500">
                          {item.product.sizeMm}mm · {item.product.piecesPerPack}{" "}
                          Stk · {item.product.packagingLabel}
                        </p>
                      </div>
                      <button
                        onClick={() => removeItem(item.product.artCode)}
                        className="text-neutral-400 transition hover:text-red-500"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      {/* Qty */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            updateQty(
                              item.product.artCode,
                              Math.max(1, item.qty - 1)
                            )
                          }
                          className="flex h-8 w-8 items-center justify-center rounded border border-neutral-200"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-10 text-center text-sm font-semibold">
                          {item.qty}
                        </span>
                        <button
                          onClick={() =>
                            updateQty(item.product.artCode, item.qty + 1)
                          }
                          className="flex h-8 w-8 items-center justify-center rounded border border-neutral-200"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <p className="text-lg font-bold">
                          {formatEuro(calc.totalPrice)}
                        </p>
                        <p className="text-xs text-neutral-500">
                          {formatEuro(calc.unitPrice)} / Display
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* MC Alert */}
                <div className="mt-3">
                  <MCAlert
                    product={item.product}
                    qty={item.qty}
                    onSetToMC={() => setToMC(item.product.artCode)}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 rounded-xl border border-neutral-200 p-6">
            <h3 className="mb-4 text-lg font-bold">Zusammenfassung</h3>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-neutral-600">
                  Zwischensumme ({items.length} Artikel)
                </span>
                <span className="font-semibold">{formatEuro(subtotal)}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-neutral-600">Versand</span>
                <span className="font-semibold text-emerald-600">
                  Kostenlos
                </span>
              </div>

              {isB2B && totalSavings > 0 && (
                <div className="flex justify-between text-emerald-600">
                  <span>Ersparnis (Händlerpreis)</span>
                  <span className="font-semibold">
                    -{formatEuro(totalSavings)}
                  </span>
                </div>
              )}

              <div className="border-t border-neutral-200 pt-3">
                <div className="flex justify-between">
                  <span className="font-bold">
                    Gesamt {isB2B ? "(netto)" : "(inkl. MwSt.)"}
                  </span>
                  <span className="text-xl font-bold">
                    {formatEuro(subtotal)}
                  </span>
                </div>
              </div>
            </div>

            <button className="mt-6 w-full rounded-xl bg-amber-400 py-3 font-bold text-black transition hover:bg-amber-500">
              Zur Kasse (Demo)
            </button>

            <Link
              href="/shop"
              className="mt-3 block text-center text-sm text-neutral-500 underline"
            >
              Weiter einkaufen
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
