import { getAllProducts } from "@/lib/data/products";
import CatalogView from "@/components/product/CatalogView";

export const metadata = {
  title: "전체상품 — AQUA LABEL",
};

export default async function ProductsPage() {
  const products = await getAllProducts();
  return (
    <div className="container-page py-14">
      <header className="mb-10">
        <p className="text-sm tracking-[0.3em] text-drop-light">COLLECTION</p>
        <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">전체상품</h1>
        <p className="mt-3 text-sm text-mist-400">
          비 오는 날의 무드를 담은 컬렉션
        </p>
      </header>
      <CatalogView products={products} />
    </div>
  );
}
