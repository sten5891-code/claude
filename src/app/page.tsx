import Link from "next/link";
import Hero from "@/components/home/Hero";
import ProductCard from "@/components/product/ProductCard";
import ProductVisual from "@/components/product/ProductVisual";
import Reveal from "@/components/ui/Reveal";
import { getFeaturedProduct, getAllProducts } from "@/lib/data/products";
import { formatKRW } from "@/lib/format";

export default async function HomePage() {
  const featured = await getFeaturedProduct();
  const products = await getAllProducts();

  return (
    <>
      <Hero />

      {/* 브랜드 매니페스토 */}
      <section className="container-page py-30">
        <Reveal className="max-w-4xl">
          <p className="eyebrow">Manifesto</p>
          <p className="mt-6 text-display-md font-bold leading-tight">
            우리는 옷을 <span className="text-iris">형태의 실험</span>으로
            본다. 몸을 감싸는 대신, 몸 주위에 새로운 부피를 짓는다.
          </p>
        </Reveal>
      </section>

      {/* 피처드 상품 쇼케이스 */}
      <section className="container-page py-16">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <Reveal className="glass-card holo-border overflow-hidden">
            <div className="relative aspect-[4/5]">
              {featured.images[0] ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={featured.images[0]}
                  alt={featured.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <ProductVisual
                  hue={featured.hue}
                  label={featured.category}
                  className="h-full w-full"
                />
              )}
            </div>
          </Reveal>

          <Reveal delay={120}>
            <p className="eyebrow">Featured · {featured.category}</p>
            <h2 className="mt-4 text-display-md font-bold text-chrome">
              {featured.name}
            </h2>
            <p className="mt-5 max-w-md leading-relaxed text-text-muted">
              {featured.shortDescription}
            </p>
            <p className="mt-7 text-2xl font-semibold text-text">
              {formatKRW(featured.price)}
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link href={`/products/${featured.slug}`} className="btn-primary">
                자세히 보기
              </Link>
              <Link href="/products" className="btn-ghost">
                전체 컬렉션
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 전체 컬렉션 */}
      <section className="container-page py-20">
        <Reveal className="mb-10 flex items-end justify-between">
          <div>
            <p className="eyebrow">SS26 Collection</p>
            <h2 className="mt-3 text-display-md font-bold">컬렉션</h2>
          </div>
          <Link
            href="/products"
            className="text-sm text-text-muted transition hover:text-iris-cyan"
          >
            전체보기 →
          </Link>
        </Reveal>

        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {products.map((p, i) => (
            <Reveal key={p.id} delay={(i % 4) * 80}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
