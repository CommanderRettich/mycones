"use client";

import { useDeliveryCountdown } from "@/hooks/useDeliveryCountdown";
import { Truck } from "lucide-react";

export function CountdownTimer() {
  const delivery = useDeliveryCountdown();

  if (!delivery.isNextDay) {
    return (
      <div className="rounded-lg bg-neutral-100 px-4 py-3 text-center text-sm text-neutral-600">
        Bestell jetzt für die nächste Lieferung am{" "}
        <strong>{delivery.deliveryDateFormatted}</strong>
      </div>
    );
  }

  const isUrgent = delivery.remainingMs < 2 * 60 * 60 * 1000;

  return (
    <div
      className={`rounded-lg px-4 py-3 text-center ${
        isUrgent
          ? "bg-orange-100 text-orange-900"
          : "bg-emerald-100 text-emerald-900"
      }`}
    >
      <div className="flex items-center justify-center gap-2">
        <Truck className="h-4 w-4" />
        <span className="text-sm font-semibold">
          Alle Artikel: Morgen geliefert
        </span>
        <span className="font-mono text-lg font-bold">
          {delivery.remainingFormatted}
        </span>
      </div>
    </div>
  );
}
