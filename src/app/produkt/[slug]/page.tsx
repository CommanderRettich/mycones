import { products, getProductBySlug } from "@/data/products";
import { notFound } from "next/navigation";
import { PDPClient } from "./PDPClient";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  // Find related products (same size or same paper, excluding self)
  const related = products
    .filter(
      (p) =>
        p.artCode !== product.artCode &&
        (p.sizeMm === product.sizeMm || p.paper === product.paper)
    )
    .slice(0, 4);

  return <PDPClient product={product} related={related} />;
}
