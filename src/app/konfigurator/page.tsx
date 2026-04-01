"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { products, uniqueSizes, uniquePapers, uniquePackagings } from "@/data/products";
import type { PaperType, PackagingType } from "@/data/products";
import { useCart } from "@/hooks/useCart";
import { formatEuro } from "@/lib/pricing";
import { ShoppingCart, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

type UserType = "private" | "dealer" | "unsure";
type QtyLevel = "1" | "2-10" | "mc" | "multi-mc";

interface ConfigState {
  step: number;
  userType: UserType | null;
  qtyLevel: QtyLevel | null;
  sizeMm: number | null;
  paper: PaperType | null;
  packaging: PackagingType | null;
}

const isColoredPaper = (p: PaperType) =>
  ["pink-blush", "blue-breeze", "green-glow"].includes(p);

export default function KonfiguratorPage() {
  const [config, setConfig] = useState<ConfigState>({
    step: 1,
    userType: null,
    qtyLevel: null,
    sizeMm: null,
    paper: null,
    packaging: null,
  });

  const { addItem } = useCart();

  const totalSteps = config.paper && isColoredPaper(config.paper) ? 4 : 5;

  const goNext = () => {
    let nextStep = config.step + 1;
    // Skip step 5 for colored cones
    if (nextStep === 5 && config.paper && isColoredPaper(config.paper)) {
      nextStep = 6; // go to results
    }
    setConfig((s) => ({ ...s, step: nextStep }));
  };

  const goBack = () =>
    setConfig((s) => ({ ...s, step: Math.max(1, s.step - 1) }));

  // Available sizes based on paper selection
  const availableSizes =
    config.paper && isColoredPaper(config.paper)
      ? uniqueSizes.filter((s) => s.mm === 84 || s.mm === 109)
      : uniqueSizes;

  // Find matching products
  const matches = products.filter((p) => {
    if (config.sizeMm && p.sizeMm !== config.sizeMm) return false;
    if (config.paper && p.paper !== config.paper) return false;
    if (config.packaging && p.packaging !== config.packaging) return false;
    return true;
  });

  const showResults = config.step > totalSteps;

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-2 text-center text-3xl font-bold">
        Finde deinen perfekten Cone
      </h1>
      <p className="mb-8 text-center text-neutral-500">
        5 Fragen, 1 Ergebnis — wir helfen dir bei der Auswahl
      </p>

      {/* Progress */}
      {!showResults && (
        <div className="mb-8">
          <div className="flex justify-between text-xs text-neutral-400">
            <span>Schritt {config.step} von {totalSteps}</span>
            <span>{Math.round((config.step / totalSteps) * 100)}%</span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-neutral-100">
            <motion.div
              className="h-full rounded-full bg-amber-400"
              animate={{ width: `${(config.step / totalSteps) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      )}

      <AnimatePresence mode="wait">
        {/* Step 1: User Type */}
        {config.step === 1 && (
          <StepCard key="step1" title="Wer bist du?">
            {[
              { value: "private" as UserType, icon: "🛒", label: "Privatkunde" },
              { value: "dealer" as UserType, icon: "🏪", label: "Händler" },
              { value: "unsure" as UserType, icon: "🤷", label: "Noch unsicher" },
            ].map((opt) => (
              <OptionButton
                key={opt.value}
                selected={config.userType === opt.value}
                onClick={() => {
                  setConfig((s) => ({ ...s, userType: opt.value }));
                  setTimeout(goNext, 200);
                }}
              >
                <span className="text-2xl">{opt.icon}</span>
                <span className="font-semibold">{opt.label}</span>
              </OptionButton>
            ))}
          </StepCard>
        )}

        {/* Step 2: Quantity */}
        {config.step === 2 && (
          <StepCard key="step2" title="Wie viel brauchst du?">
            {[
              { value: "1" as QtyLevel, label: "1 Display (ausprobieren)" },
              { value: "2-10" as QtyLevel, label: "2–10 Displays" },
              { value: "mc" as QtyLevel, label: "1 Master Carton (Händlerpreis)" },
              { value: "multi-mc" as QtyLevel, label: "Mehrere MCs (Großhandel)" },
            ].map((opt) => (
              <OptionButton
                key={opt.value}
                selected={config.qtyLevel === opt.value}
                onClick={() => {
                  setConfig((s) => ({ ...s, qtyLevel: opt.value }));
                  setTimeout(goNext, 200);
                }}
              >
                <span className="font-semibold">{opt.label}</span>
              </OptionButton>
            ))}
          </StepCard>
        )}

        {/* Step 3: Size */}
        {config.step === 3 && (
          <StepCard key="step3" title="Welche Cone-Größe?">
            {availableSizes.map((size) => (
              <OptionButton
                key={size.mm}
                selected={config.sizeMm === size.mm}
                onClick={() => {
                  setConfig((s) => ({ ...s, sizeMm: size.mm }));
                  setTimeout(goNext, 200);
                }}
              >
                <span className="text-lg font-bold text-amber-600">
                  {size.mm}mm
                </span>
                <span className="text-sm text-neutral-500">{size.label}</span>
              </OptionButton>
            ))}
          </StepCard>
        )}

        {/* Step 4: Paper / Color */}
        {config.step === 4 && (
          <StepCard key="step4" title="Welches Papier / Farbe?">
            {uniquePapers.map((paper) => (
              <OptionButton
                key={paper.value}
                selected={config.paper === paper.value}
                onClick={() => {
                  const isColored = isColoredPaper(paper.value);
                  setConfig((s) => ({
                    ...s,
                    paper: paper.value,
                    // Colored cones are always conical pack
                    packaging: isColored ? "conical-pack" : s.packaging,
                    // Colored only in 84mm and 109mm
                    sizeMm:
                      isColored &&
                      s.sizeMm !== null &&
                      s.sizeMm !== 84 &&
                      s.sizeMm !== 109
                        ? 109
                        : s.sizeMm,
                  }));
                  setTimeout(goNext, 200);
                }}
              >
                <span
                  className="h-5 w-5 rounded-full border border-neutral-300"
                  style={{ backgroundColor: paper.color }}
                />
                <span className="font-semibold">{paper.label}</span>
                {isColoredPaper(paper.value) && (
                  <span className="ml-auto text-xs text-neutral-400">
                    Colored not flavoured
                  </span>
                )}
              </OptionButton>
            ))}
          </StepCard>
        )}

        {/* Step 5: Packaging (skipped for colored) */}
        {config.step === 5 &&
          (!config.paper || !isColoredPaper(config.paper)) && (
            <StepCard key="step5" title="Verpackungsart?">
              {uniquePackagings.map((pkg) => (
                <OptionButton
                  key={pkg.value}
                  selected={config.packaging === pkg.value}
                  onClick={() => {
                    setConfig((s) => ({ ...s, packaging: pkg.value }));
                    setTimeout(goNext, 200);
                  }}
                >
                  <span className="font-semibold">{pkg.label}</span>
                </OptionButton>
              ))}
            </StepCard>
          )}

        {/* Results */}
        {showResults && (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="mb-6 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-amber-500" />
              <h2 className="text-xl font-bold">
                {matches.length === 0
                  ? "Kein exaktes Ergebnis"
                  : matches.length === 1
                    ? "Dein perfekter Cone"
                    : `${matches.length} passende Produkte`}
              </h2>
            </div>

            {matches.length === 0 ? (
              <div className="rounded-xl border border-neutral-200 p-8 text-center">
                <p className="text-neutral-500">
                  Für diese Kombination haben wir noch kein Produkt. Probier
                  eine andere Konfiguration oder kontaktiere uns.
                </p>
                <button
                  onClick={() =>
                    setConfig({
                      step: 1,
                      userType: null,
                      qtyLevel: null,
                      sizeMm: null,
                      paper: null,
                      packaging: null,
                    })
                  }
                  className="mt-4 rounded-lg bg-amber-400 px-6 py-2 text-sm font-bold text-black"
                >
                  Neu starten
                </button>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                {matches.map((product, i) => (
                  <div
                    key={product.artCode}
                    className="relative rounded-xl border border-neutral-200 p-4"
                  >
                    {i === 0 && matches.length > 1 && (
                      <span className="absolute -top-2 right-4 rounded-full bg-amber-400 px-2 py-0.5 text-[10px] font-bold">
                        EMPFEHLUNG
                      </span>
                    )}
                    <p className="text-xs text-neutral-400">
                      {product.paperLabel}
                    </p>
                    <h3 className="font-semibold">{product.name}</h3>
                    <p className="text-xs text-neutral-500">
                      {product.sizeMm}mm · {product.piecesPerPack} Stk ·{" "}
                      {product.packagingLabel}
                    </p>
                    <p className="mt-2 text-lg font-bold">
                      {formatEuro(product.retailPrice)}
                    </p>
                    {config.userType === "dealer" && (
                      <p className="text-xs text-emerald-600">
                        Händlerpreis ab {product.mcDisplays} Displays:{" "}
                        {formatEuro(product.wholesalePrice)}
                      </p>
                    )}
                    <div className="mt-3 flex gap-2">
                      <button
                        onClick={() => addItem(product)}
                        className="flex items-center gap-1.5 rounded-lg bg-amber-400 px-4 py-2 text-sm font-bold text-black transition hover:bg-amber-500"
                      >
                        <ShoppingCart className="h-3.5 w-3.5" />
                        Warenkorb
                      </button>
                      <Link
                        href={`/produkt/${product.slug}`}
                        className="rounded-lg border border-neutral-200 px-4 py-2 text-sm font-medium transition hover:bg-neutral-50"
                      >
                        Details
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <button
              onClick={() =>
                setConfig({
                  step: 1,
                  userType: null,
                  qtyLevel: null,
                  sizeMm: null,
                  paper: null,
                  packaging: null,
                })
              }
              className="mt-6 text-sm text-neutral-500 underline"
            >
              Konfigurator neu starten
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      {!showResults && config.step > 1 && (
        <div className="mt-6 flex justify-between">
          <button
            onClick={goBack}
            className="flex items-center gap-1 text-sm text-neutral-500 transition hover:text-neutral-900"
          >
            <ChevronLeft className="h-4 w-4" />
            Zurück
          </button>
        </div>
      )}
    </div>
  );
}

// Helper components
function StepCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.2 }}
    >
      <h2 className="mb-4 text-xl font-bold">{title}</h2>
      <div className="space-y-3">{children}</div>
    </motion.div>
  );
}

function OptionButton({
  children,
  selected,
  onClick,
}: {
  children: React.ReactNode;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center gap-3 rounded-xl border-2 p-4 text-left transition ${
        selected
          ? "border-amber-400 bg-amber-50"
          : "border-neutral-200 hover:border-neutral-300"
      }`}
    >
      {children}
    </button>
  );
}
