"use client";

import { useState } from "react";
import { products } from "@/data/products";
import type { PaperType, PackagingType } from "@/data/products";
import { ProductCard } from "@/components/shop/ProductCard";
import { FilterBar } from "@/components/shop/FilterBar";

export default function ShopPage() {
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [selectedPaper, setSelectedPaper] = useState<PaperType | null>(null);
  const [selectedPackaging, setSelectedPackaging] =
    useState<PackagingType | null>(null);

  const filtered = products.filter((p) => {
    if (selectedSize && p.sizeMm !== selectedSize) return false;
    if (selectedPaper && p.paper !== selectedPaper) return false;
    if (selectedPackaging && p.packaging !== selectedPackaging) return false;
    return true;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-2 text-3xl font-bold">Alle Produkte</h1>
      <p className="mb-6 text-neutral-500">
        {products.length} Displays — The Original Cones seit 1994
      </p>

      <FilterBar
        selectedSize={selectedSize}
        selectedPaper={selectedPaper}
        selectedPackaging={selectedPackaging}
        onSizeChange={setSelectedSize}
        onPaperChange={setSelectedPaper}
        onPackagingChange={setSelectedPackaging}
      />

      <p className="mt-4 text-sm text-neutral-400">
        {filtered.length} Produkt{filtered.length !== 1 ? "e" : ""}
      </p>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((product) => (
          <ProductCard key={product.artCode} product={product} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="py-20 text-center">
          <p className="text-lg text-neutral-400">
            Keine Produkte mit diesen Filtern gefunden.
          </p>
        </div>
      )}
    </div>
  );
}
