"use client";

import { useDeliveryCountdown } from "@/hooks/useDeliveryCountdown";
import { Truck, Clock } from "lucide-react";

export function DeliveryBadge() {
  const delivery = useDeliveryCountdown();

  if (delivery.isNextDay) {
    const isUrgent = delivery.remainingMs < 2 * 60 * 60 * 1000; // < 2h

    return (
      <div
        className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-semibold ${
          isUrgent
            ? "bg-orange-100 text-orange-800"
            : "bg-emerald-100 text-emerald-800"
        }`}
      >
        <Truck className="h-4 w-4" />
        <span>Morgen geliefert</span>
        <span className="font-mono text-xs">
          noch {delivery.remainingFormatted}
        </span>
      </div>
    );
  }

  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-neutral-100 px-3 py-1.5 text-sm font-medium text-neutral-600">
      <Clock className="h-4 w-4" />
      <span>Nächste Lieferung: {delivery.deliveryDateFormatted}</span>
    </div>
  );
}
