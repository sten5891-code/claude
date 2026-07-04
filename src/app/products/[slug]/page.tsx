import { notFound } from "next/navigation";
import { getAllProducts, getProductBySlug } from "@/lib/data/products";
import Gallery from "@/components/product/Gallery";
import ProductPurchase from "@/components/product/ProductPurchase";
import ProductTabs from "@/components/product/ProductTabs";

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const product = await getProductBySlug(params.slug);
  return { title: product ? `${product.name} — MŌRPH` : "상품" };
}

export default async function ProductDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = await getProductBySlug(params.slug);
  if (!product) notFound();

  return (
    <div className="container-page py-12">
      {/* 상단: 갤러리 + 구매 영역 */}
      <div className="grid gap-12 lg:grid-cols-2">
        <Gallery images={product.images} alt={product.name} hue={product.hue} />
        <ProductPurchase product={product} />
      </div>

      {/* 하단: 탭 (상세 / 리뷰 / Q&A) */}
      <div className="mt-24">
        <ProductTabs product={product} />
      </div>
    </div>
  );
}
