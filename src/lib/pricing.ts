import type { Product } from "@/data/products";

export type MCAlertState = "under-mc" | "near-mc" | "mc-reached" | "over-mc";

export interface PriceCalculation {
  unitPrice: number;
  isWholesale: boolean;
  totalPrice: number;
  missingToMC: number;
  savingsPerDisplay: number;
  savingsAtMC: number;
  savingsOnOrder: number;
  mcAlertState: MCAlertState;
}

export function calculatePrice(
  product: Product,
  qty: number,
  isB2B: boolean
): PriceCalculation {
  const isWholesale = qty >= product.mcDisplays;
  const unitPrice = isWholesale ? product.wholesalePrice : product.retailPrice;
  const totalPrice = unitPrice * qty;
  const missingToMC = Math.max(0, product.mcDisplays - qty);
  const savingsPerDisplay = product.retailPrice - product.wholesalePrice;
  const savingsAtMC = savingsPerDisplay * product.mcDisplays;
  const savingsOnOrder = isWholesale ? savingsPerDisplay * qty : 0;

  let mcAlertState: MCAlertState;
  if (qty >= product.mcDisplays * 2) {
    mcAlertState = "over-mc";
  } else if (qty >= product.mcDisplays) {
    mcAlertState = "mc-reached";
  } else if (qty >= product.mcDisplays * 0.8) {
    mcAlertState = "near-mc";
  } else {
    mcAlertState = "under-mc";
  }

  return {
    unitPrice,
    isWholesale,
    totalPrice,
    missingToMC,
    savingsPerDisplay,
    savingsAtMC,
    savingsOnOrder,
    mcAlertState,
  };
}

export function formatEuro(amount: number): string {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  }).format(amount);
}

export function getMCAlertMessage(
  product: Product,
  qty: number
): { message: string; color: string } | null {
  const calc = calculatePrice(product, qty, true);

  switch (calc.mcAlertState) {
    case "under-mc":
      return {
        message: `Noch ${calc.missingToMC} Displays für Händlerpreis von ${formatEuro(product.wholesalePrice)} / Display — du sparst ${formatEuro(calc.savingsAtMC)} auf eine MC`,
        color: "orange",
      };
    case "near-mc":
      return {
        message: `Fast da! Noch ${calc.missingToMC} Displays bis Händlerpreis ${formatEuro(product.wholesalePrice)} — spare ${formatEuro(calc.savingsPerDisplay * qty)} mehr`,
        color: "amber",
      };
    case "mc-reached":
      return {
        message: `Händlerpreis aktiv — du sparst ${formatEuro(calc.savingsOnOrder)} auf diese Bestellung`,
        color: "green",
      };
    case "over-mc":
      return {
        message: `${Math.floor(qty / product.mcDisplays)} MCs — Händlerpreis ${formatEuro(product.wholesalePrice)} / Display aktiv`,
        color: "emerald",
      };
  }
}
