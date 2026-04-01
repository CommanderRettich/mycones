import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-neutral-50">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-400 text-sm font-bold text-black">
                MC
              </div>
              <span className="font-bold">MyCones</span>
            </div>
            <p className="text-sm text-neutral-500">
              Das Original seit 1994 — in Europa entwickelt, weltweit
              geliefert. Powered by The Original Cones.
            </p>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold">Shop</h4>
            <ul className="space-y-2 text-sm text-neutral-500">
              <li><Link href="/shop" className="hover:text-neutral-900">Alle Produkte</Link></li>
              <li><Link href="/the-original-cones" className="hover:text-neutral-900">The Original Cones</Link></li>
              <li><Link href="/the-original-cones/colored" className="hover:text-neutral-900">Colored Cones</Link></li>
              <li><Link href="/konfigurator" className="hover:text-neutral-900">Konfigurator</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold">Für Händler</h4>
            <ul className="space-y-2 text-sm text-neutral-500">
              <li><Link href="/b2b" className="hover:text-neutral-900">Händler werden</Link></li>
              <li><Link href="/b2b/dashboard" className="hover:text-neutral-900">Händler-Dashboard</Link></li>
              <li><Link href="/kontakt" className="hover:text-neutral-900">Kontakt</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold">Rechtliches</h4>
            <ul className="space-y-2 text-sm text-neutral-500">
              <li><Link href="#" className="hover:text-neutral-900">Impressum</Link></li>
              <li><Link href="#" className="hover:text-neutral-900">Datenschutz</Link></li>
              <li><Link href="#" className="hover:text-neutral-900">AGB</Link></li>
              <li><Link href="#" className="hover:text-neutral-900">Widerrufsrecht</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-neutral-200 pt-6 text-center text-xs text-neutral-400">
          <p>
            Vandenberg Special Products B.V. — Mountain High | Rotterdam, NL
            seit 1994
          </p>
          <p className="mt-1">
            Gebaut von{" "}
            <a
              href="https://maxmy.business"
              className="text-neutral-500 underline hover:text-neutral-700"
              target="_blank"
              rel="noopener noreferrer"
            >
              MaxMy.business
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
