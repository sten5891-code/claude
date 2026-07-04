import { getAllProducts } from "@/lib/data/products";
import CatalogView from "@/components/product/CatalogView";

export const metadata = {
  title: "전체 컬렉션 — MŌRPH",
};

export default async function ProductsPage() {
  const products = await getAllProducts();
  return (
    <div className="container-page py-20">
      <header className="mb-12">
        <p className="eyebrow">SS26 Collection</p>
        <h1 className="mt-3 text-display-md font-bold text-chrome">
          전체 컬렉션
        </h1>
        <p className="mt-4 max-w-md text-sm text-text-muted">
          형태를 다시 쓰는 아방가르드 여성복. 크롬처럼 흐르는 실루엣의 컬렉션.
        </p>
      </header>
      <CatalogView products={products} />
    </div>
  );
}
