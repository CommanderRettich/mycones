"use client";

import { useState, useEffect } from "react";
import { getDeliveryInfo, type DeliveryInfo } from "@/lib/delivery";

export function useDeliveryCountdown(): DeliveryInfo {
  const [info, setInfo] = useState<DeliveryInfo>(() => getDeliveryInfo());

  useEffect(() => {
    const interval = setInterval(() => {
      setInfo(getDeliveryInfo());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return info;
}
