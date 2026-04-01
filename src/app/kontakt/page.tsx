export default function KontaktPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-2 text-3xl font-bold">Kontakt</h1>
      <p className="mb-8 text-neutral-500">
        Fragen, Wholesale-Anfragen oder Feedback — wir sind für dich da.
      </p>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="rounded-xl border border-neutral-200 p-6">
          <h2 className="mb-4 text-lg font-bold">Kontaktformular</h2>
          <div className="space-y-4">
            {["Name", "E-Mail", "Betreff"].map((field) => (
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
            <div>
              <label className="mb-1 block text-xs font-semibold text-neutral-500">
                Nachricht
              </label>
              <textarea
                rows={4}
                placeholder="Deine Nachricht..."
                className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm"
                disabled
              />
            </div>
            <button
              disabled
              className="w-full rounded-lg bg-amber-400 py-2 font-bold text-black opacity-50"
            >
              Absenden (Demo)
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="font-bold">MyCones.com</h3>
            <p className="mt-1 text-sm text-neutral-600">
              Ein Projekt von WeTrack GmbH
            </p>
            <p className="text-sm text-neutral-600">Köln, Deutschland</p>
          </div>
          <div>
            <h3 className="font-bold">Lieferant & Hersteller</h3>
            <p className="mt-1 text-sm text-neutral-600">
              Vandenberg Special Products B.V.
            </p>
            <p className="text-sm text-neutral-600">Rotterdam, Niederlande</p>
            <p className="text-sm text-neutral-600">Seit 1994</p>
          </div>
          <div>
            <h3 className="font-bold">Wholesale / B2B</h3>
            <p className="mt-1 text-sm text-neutral-600">
              Für Händler-Anfragen und Großbestellungen besuche unsere{" "}
              <a href="/b2b" className="text-emerald-600 underline">
                B2B-Seite
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
