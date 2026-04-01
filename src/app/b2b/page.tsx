import Link from "next/link";
import { products } from "@/data/products";
import { formatEuro } from "@/lib/pricing";

// Top-Marge Produkte
const topMargin = [...products]
  .sort((a, b) => b.marginPercent - a.marginPercent)
  .slice(0, 8);

export default function B2BPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-b from-emerald-50 to-white">
        <div className="mx-auto max-w-7xl px-4 py-16 md:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-4 text-sm font-semibold tracking-widest text-emerald-600">
              HÄNDLER-PROGRAMM
            </p>
            <h1 className="text-3xl font-bold md:text-5xl">
              Bis zu 40% Marge auf jedes Display
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-lg text-neutral-600">
              Ab 1 Master Carton zum Händlerpreis. Next-Day Delivery.
              Live-Marge-Berechnung. 1-Klick-Nachbestellung.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Link
                href="/b2b/dashboard"
                className="rounded-xl bg-emerald-600 px-8 py-3 font-bold text-white transition hover:bg-emerald-700"
              >
                Dashboard ansehen
              </Link>
              <Link
                href="/shop"
                className="rounded-xl border-2 border-emerald-600 px-8 py-3 font-bold text-emerald-600 transition hover:bg-emerald-50"
              >
                Zum Shop
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Vorteile */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <h2 className="mb-8 text-center text-2xl font-bold">Warum MyCones?</h2>
        <div className="grid gap-6 md:grid-cols-4">
          {[
            {
              title: "Händlerpreis ab 1 MC",
              desc: "Ein Preisbruch. Kein Staffelpreis-Wirrwarr. Ab Master Carton gehört dir die Marge.",
            },
            {
              title: "Next-Day Delivery",
              desc: "Bestell bis 16:20 Uhr — morgen geliefert. Egal ob 1 Display oder 10 MCs.",
            },
            {
              title: "Live-Marge berechnen",
              desc: "Sieh deine Marge pro Display, pro MC und pro Bestellung in Echtzeit.",
            },
            {
              title: "1-Klick Nachbestellung",
              desc: "Letzte Bestellung als Vorlage laden. Favoriten pinnen. Schneller einkaufen.",
            },
          ].map((item) => (
            <div key={item.title} className="rounded-xl border border-neutral-200 p-6">
              <h3 className="font-bold">{item.title}</h3>
              <p className="mt-2 text-sm text-neutral-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Preistabelle */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <h2 className="mb-2 text-center text-2xl font-bold">
          Preistabelle — Top Marge Produkte
        </h2>
        <p className="mb-8 text-center text-neutral-500">
          Alle 34 Produkte sind im Shop mit Händlerpreisen verfügbar
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b bg-neutral-50 text-xs text-neutral-500">
                <th className="px-4 py-3">Art.-Nr.</th>
                <th className="px-4 py-3">Produkt</th>
                <th className="px-4 py-3">Papier</th>
                <th className="px-4 py-3 text-right">Retail</th>
                <th className="px-4 py-3 text-right">Händlerpreis</th>
                <th className="px-4 py-3 text-right">Marge</th>
                <th className="px-4 py-3 text-right">MC</th>
                <th className="px-4 py-3 text-right">Ersparnis / MC</th>
              </tr>
            </thead>
            <tbody>
              {topMargin.map((p) => (
                <tr key={p.artCode} className="border-b hover:bg-neutral-50">
                  <td className="px-4 py-3 font-mono text-xs">{p.artCode}</td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/produkt/${p.slug}`}
                      className="font-medium hover:text-amber-600"
                    >
                      {p.name}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-xs">{p.paperLabel}</td>
                  <td className="px-4 py-3 text-right">{formatEuro(p.retailPrice)}</td>
                  <td className="px-4 py-3 text-right font-bold text-emerald-600">
                    {formatEuro(p.wholesalePrice)}
                  </td>
                  <td className="px-4 py-3 text-right text-emerald-600">
                    {p.marginPercent}%
                  </td>
                  <td className="px-4 py-3 text-right">{p.mcDisplays}</td>
                  <td className="px-4 py-3 text-right font-semibold">
                    {formatEuro(p.savingsAtMC)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/shop"
            className="text-sm font-medium text-emerald-600 underline"
          >
            Alle 34 Produkte im Shop ansehen
          </Link>
        </div>
      </section>

      {/* Registrierung Mock */}
      <section className="bg-neutral-50">
        <div className="mx-auto max-w-3xl px-4 py-16">
          <h2 className="mb-6 text-center text-2xl font-bold">
            Händler-Registrierung
          </h2>
          <div className="rounded-xl border border-neutral-200 bg-white p-6 md:p-8">
            <div className="grid gap-4 md:grid-cols-2">
              {[
                "Vorname",
                "Nachname",
                "Firmenname",
                "USt-IdNr. (EU)",
                "E-Mail",
                "Telefon",
                "Land / Region",
                "Website",
              ].map((field) => (
                <div key={field}>
                  <label className="mb-1 block text-xs font-semibold text-neutral-500">
                    {field}
                  </label>
                  <input
                    type="text"
                    placeholder={field}
                    className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm"
                    disabled
                  />
                </div>
              ))}
            </div>
            <button
              disabled
              className="mt-6 w-full rounded-xl bg-emerald-600 py-3 font-bold text-white opacity-50"
            >
              Registrierung absenden (Demo)
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
