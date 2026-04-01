import Link from "next/link";

const dummyArticles = [
  {
    slug: "#",
    title: "The Original Cones — Das Original seit 1994",
    category: "Brand",
    excerpt: "Die Geschichte von Vandenberg Special Products und wie ein Unternehmen aus Rotterdam die Cone-Industrie erfunden hat.",
    date: "15. März 2026",
  },
  {
    slug: "#",
    title: "King Size vs. Small 1¼ vs. Bomb Size: Cone-Größen im Vergleich",
    category: "Ratgeber",
    excerpt: "Welche Cone-Größe passt zu dir? Ein Vergleich aller 6 Größen — von 84mm bis 280mm.",
    date: "10. März 2026",
  },
  {
    slug: "#",
    title: "Bleached vs. Unbleached — Was ist der Unterschied?",
    category: "Ratgeber",
    excerpt: "Original White oder Natural Brown? Wir erklären die Unterschiede bei Geschmack, Brennverhalten und Nachhaltigkeit.",
    date: "5. März 2026",
  },
  {
    slug: "#",
    title: "Pre-rolled Cones für Händler: Staffelpreise & Marge",
    category: "B2B",
    excerpt: "So maximierst du deine Marge als Händler. MC-Preise, Kalkulation und Tipps für den Einkauf.",
    date: "28. Februar 2026",
  },
];

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="mb-2 text-3xl font-bold">Blog</h1>
      <p className="mb-8 text-neutral-500">
        Ratgeber, Brand-Guides und Händler-Insights rund um Pre-Rolled Cones
      </p>

      <div className="space-y-6">
        {dummyArticles.map((article) => (
          <article
            key={article.title}
            className="rounded-xl border border-neutral-200 p-6 transition hover:shadow-md"
          >
            <div className="flex items-center gap-3 text-xs">
              <span className="rounded-full bg-amber-100 px-2 py-0.5 font-semibold text-amber-700">
                {article.category}
              </span>
              <span className="text-neutral-400">{article.date}</span>
            </div>
            <h2 className="mt-2 text-lg font-bold">
              <Link href={article.slug} className="hover:text-amber-600">
                {article.title}
              </Link>
            </h2>
            <p className="mt-2 text-sm text-neutral-600">{article.excerpt}</p>
          </article>
        ))}
      </div>

      <p className="mt-8 text-center text-sm text-neutral-400">
        Weitere Artikel folgen — Content Hub in Entwicklung
      </p>
    </div>
  );
}
