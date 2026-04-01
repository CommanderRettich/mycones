"use client";

import { uniqueSizes, uniquePapers, uniquePackagings } from "@/data/products";
import type { PaperType, PackagingType } from "@/data/products";

interface FilterBarProps {
  selectedSize: number | null;
  selectedPaper: PaperType | null;
  selectedPackaging: PackagingType | null;
  onSizeChange: (size: number | null) => void;
  onPaperChange: (paper: PaperType | null) => void;
  onPackagingChange: (pkg: PackagingType | null) => void;
}

export function FilterBar({
  selectedSize,
  selectedPaper,
  selectedPackaging,
  onSizeChange,
  onPaperChange,
  onPackagingChange,
}: FilterBarProps) {
  return (
    <div className="flex flex-wrap gap-4 rounded-xl border border-neutral-200 bg-white p-4">
      {/* Size Filter */}
      <div>
        <label className="mb-1.5 block text-xs font-semibold text-neutral-500">
          Größe
        </label>
        <select
          value={selectedSize ?? ""}
          onChange={(e) =>
            onSizeChange(e.target.value ? Number(e.target.value) : null)
          }
          className="rounded-lg border border-neutral-200 px-3 py-2 text-sm"
        >
          <option value="">Alle Größen</option>
          {uniqueSizes.map((size) => (
            <option key={size.mm} value={size.mm}>
              {size.label}
            </option>
          ))}
        </select>
      </div>

      {/* Paper Filter */}
      <div>
        <label className="mb-1.5 block text-xs font-semibold text-neutral-500">
          Papier
        </label>
        <select
          value={selectedPaper ?? ""}
          onChange={(e) =>
            onPaperChange((e.target.value || null) as PaperType | null)
          }
          className="rounded-lg border border-neutral-200 px-3 py-2 text-sm"
        >
          <option value="">Alle Papiertypen</option>
          {uniquePapers.map((paper) => (
            <option key={paper.value} value={paper.value}>
              {paper.label}
            </option>
          ))}
        </select>
      </div>

      {/* Packaging Filter */}
      <div>
        <label className="mb-1.5 block text-xs font-semibold text-neutral-500">
          Verpackung
        </label>
        <select
          value={selectedPackaging ?? ""}
          onChange={(e) =>
            onPackagingChange(
              (e.target.value || null) as PackagingType | null
            )
          }
          className="rounded-lg border border-neutral-200 px-3 py-2 text-sm"
        >
          <option value="">Alle Verpackungen</option>
          {uniquePackagings.map((pkg) => (
            <option key={pkg.value} value={pkg.value}>
              {pkg.label}
            </option>
          ))}
        </select>
      </div>

      {/* Reset */}
      {(selectedSize || selectedPaper || selectedPackaging) && (
        <button
          onClick={() => {
            onSizeChange(null);
            onPaperChange(null);
            onPackagingChange(null);
          }}
          className="self-end rounded-lg px-3 py-2 text-sm font-medium text-neutral-500 transition hover:bg-neutral-100"
        >
          Filter zurücksetzen
        </button>
      )}
    </div>
  );
}
