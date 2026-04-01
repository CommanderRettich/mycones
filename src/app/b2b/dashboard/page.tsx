"use client";

import Link from "next/link";
import { products } from "@/data/products";
import { formatEuro } from "@/lib/pricing";
import { useCart } from "@/hooks/useCart";
import {
  Package,
  TrendingUp,
  RotateCcw,
  Star,
  FileText,
  MessageSquare,
} from "lucide-react";

// Mock order data
const mockOrders = [
  {
    id: "MC-20260328-042",
    date: "28. März 2026",
    status: "Geliefert",
    statusColor: "text-emerald-600 bg-emerald-50",
    items: [
      { product: products[0], qty: 32 },
      { product: products[9], qty: 32 },
    ],
    total: 803.2,
  },
  {
    id: "MC-20260315-031",
    date: "15. März 2026",
    status: "Geliefert",
    statusColor: "text-emerald-600 bg-emerald-50",
    items: [
      { product: products[0], qty: 64 },
      { product: products[19], qty: 32 },
    ],
    total: 1057.6,
  },
  {
    id: "MC-20260301-018",
    date: "1. März 2026",
    status: "Geliefert",
    statusColor: "text-emerald-600 bg-emerald-50",
    items: [{ product: products[0], qty: 32 }],
    total: 348.8,
  },
];

const favorites = [products[0], products[9], products[19], products[24]];

export default function DashboardPage() {
  const { addItem, isB2B, toggleB2B } = useCart();

  // Auto-enable B2B mode on dashboard
  if (!isB2B) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <h1 className="text-2xl font-bold">Händler-Dashboard</h1>
        <p className="mt-2 text-neutral-500">
          Aktiviere den Händler-Modus um das Dashboard zu sehen.
        </p>
        <button
          onClick={toggleB2B}
          className="mt-6 rounded-xl bg-emerald-600 px-8 py-3 font-bold text-white transition hover:bg-emerald-700"
        >
          Händler-Modus aktivieren
        </button>
      </div>
    );
  }

  // Calculate 30-day margin from mock orders
  const totalMargin30d = mockOrders.reduce((sum, order) => {
    return (
      sum +
      order.items.reduce(
        (s, item) =>
          s +
          (item.product.retailPrice - item.product.wholesalePrice) * item.qty,
        0
      )
    );
  }, 0);

  const totalOrders = mockOrders.length;
  const totalDisplays = mockOrders.reduce(
    (sum, o) => sum + o.items.reduce((s, i) => s + i.qty, 0),
    0
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Händler-Dashboard</h1>
          <p className="text-sm text-neutral-500">
            Willkommen zurück, Demo-Händler
          </p>
        </div>
        <Link
          href="/shop"
          className="rounded-lg bg-amber-400 px-4 py-2 text-sm font-bold text-black transition hover:bg-amber-500"
        >
          Neue Bestellung
        </Link>
      </div>

      {/* KPI Cards */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KPICard
          icon={<TrendingUp className="h-5 w-5 text-emerald-600" />}
          label="Marge (30 Tage)"
          value={formatEuro(totalMargin30d)}
          sub={`${totalDisplays} Displays`}
        />
        <KPICard
          icon={<Package className="h-5 w-5 text-amber-600" />}
          label="Bestellungen"
          value={String(totalOrders)}
          sub="Letzte 30 Tage"
        />
        <KPICard
          icon={<Star className="h-5 w-5 text-amber-500" />}
          label="Favoriten"
          value={String(favorites.length)}
          sub="Produkte gespeichert"
        />
        <KPICard
          icon={<RotateCcw className="h-5 w-5 text-blue-500" />}
          label="Schnellbestellung"
          value="1-Klick"
          sub="Letzte Bestellung laden"
        />
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Order History */}
        <div className="lg:col-span-2">
          <h2 className="mb-4 text-lg font-bold">Bestellhistorie</h2>
          <div className="space-y-4">
            {mockOrders.map((order) => (
              <div
                key={order.id}
                className="rounded-xl border border-neutral-200 p-4"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-mono text-sm font-semibold">
                      {order.id}
                    </p>
                    <p className="text-xs text-neutral-500">{order.date}</p>
                  </div>
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-semibold ${order.statusColor}`}
                  >
                    {order.status}
                  </span>
                </div>
                <div className="mt-3 space-y-1">
                  {order.items.map((item) => (
                    <div
                      key={item.product.artCode}
                      className="flex justify-between text-sm"
                    >
                      <span>
                        {item.qty}x {item.product.name} ({item.product.paperLabel})
                      </span>
                      <span className="font-medium">
                        {formatEuro(item.product.wholesalePrice * item.qty)}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-3 flex items-center justify-between border-t pt-3">
                  <span className="font-bold">
                    Gesamt: {formatEuro(order.total)}
                  </span>
                  <button
                    onClick={() =>
                      order.items.forEach((item) =>
                        addItem(item.product, item.qty)
                      )
                    }
                    className="flex items-center gap-1.5 rounded-lg bg-amber-100 px-3 py-1.5 text-xs font-bold text-amber-800 transition hover:bg-amber-200"
                  >
                    <RotateCcw className="h-3 w-3" />
                    Nachbestellen
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Favorites */}
          <div>
            <h2 className="mb-4 text-lg font-bold">Favoriten</h2>
            <div className="space-y-2">
              {favorites.map((p) => (
                <Link
                  key={p.artCode}
                  href={`/produkt/${p.slug}`}
                  className="flex items-center justify-between rounded-lg border border-neutral-200 p-3 transition hover:shadow-sm"
                >
                  <div>
                    <p className="text-sm font-medium">{p.name}</p>
                    <p className="text-xs text-neutral-400">{p.paperLabel}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-emerald-600">
                      {formatEuro(p.wholesalePrice)}
                    </p>
                    <p className="text-[10px] text-neutral-400">
                      Marge {p.marginPercent}%
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Marge Overview */}
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
            <h3 className="mb-3 font-bold text-emerald-900">
              Marge-Übersicht (30 Tage)
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-emerald-700">Gesamtmarge</span>
                <span className="font-bold text-emerald-900">
                  {formatEuro(totalMargin30d)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-emerald-700">Displays gekauft</span>
                <span className="font-bold text-emerald-900">
                  {totalDisplays}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-emerald-700">Ø Marge / Display</span>
                <span className="font-bold text-emerald-900">
                  {formatEuro(totalMargin30d / totalDisplays)}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-2">
            <button className="flex w-full items-center gap-2 rounded-lg border border-neutral-200 px-4 py-3 text-sm font-medium transition hover:bg-neutral-50">
              <FileText className="h-4 w-4 text-neutral-400" />
              Rechnungen (PDF)
            </button>
            <button className="flex w-full items-center gap-2 rounded-lg border border-neutral-200 px-4 py-3 text-sm font-medium transition hover:bg-neutral-50">
              <MessageSquare className="h-4 w-4 text-neutral-400" />
              Support kontaktieren
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function KPICard({
  icon,
  label,
  value,
  sub,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub: string;
}) {
  return (
    <div className="rounded-xl border border-neutral-200 p-4">
      <div className="flex items-center gap-2">
        {icon}
        <span className="text-xs text-neutral-500">{label}</span>
      </div>
      <p className="mt-2 text-2xl font-bold">{value}</p>
      <p className="text-xs text-neutral-400">{sub}</p>
    </div>
  );
}
