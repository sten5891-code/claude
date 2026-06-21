import Link from "next/link";
import Hero from "@/components/home/Hero";
import ProductCard from "@/components/product/ProductCard";
import { getFeaturedProduct, getAllProducts } from "@/lib/data/products";
import { formatKRW } from "@/lib/format";

export default async function HomePage() {
  const featured = await getFeaturedProduct();
  const products = await getAllProducts();

  return (
    <>
      <Hero />

      {/* 피처드 상품 쇼케이스 */}
      <section className="container-page py-20">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div className="glass-card overflow-hidden">
            <div className="relative aspect-[4/5] bg-ink-800">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={featured.images[0]}
                alt={featured.name}
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <div>
            <p className="text-sm tracking-[0.3em] text-drop-light">
              FEATURED
            </p>
            <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
              {featured.name}
            </h2>
            <p className="mt-4 leading-relaxed text-mist-300">
              {featured.shortDescription}
            </p>
            <p className="mt-6 text-2xl font-semibold text-mist-100">
              {formatKRW(featured.price)}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href={`/products/${featured.slug}`}
                className="btn-primary"
              >
                자세히 보기
              </Link>
              <Link href="/products" className="btn-ghost">
                전체상품 보기
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 전체 컬렉션 */}
      <section className="container-page py-10">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="text-2xl font-semibold">컬렉션</h2>
          <Link
            href="/products"
            className="text-sm text-mist-400 hover:text-drop-light"
          >
            전체보기 →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </>
  );
}
