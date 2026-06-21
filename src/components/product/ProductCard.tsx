import Link from "next/link";
import type { Product } from "@/types";
import { formatKRW } from "@/lib/format";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <div className="glass-card overflow-hidden">
        <div className="relative aspect-[4/5] overflow-hidden bg-ink-800">
          {/* next/image 대신 일반 img — placeholder 교체 편의를 위해 */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.images[0]}
            alt={product.name}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
          <span className="absolute left-3 top-3 rounded-full bg-ink-950/70 px-3 py-1 text-[11px] text-drop-light backdrop-blur">
            {product.color}
          </span>
        </div>
        <div className="space-y-1 p-4">
          <p className="text-xs tracking-widest text-mist-400">{product.brand}</p>
          <h3 className="text-base font-medium text-mist-100 transition group-hover:text-drop-light">
            {product.name}
          </h3>
          <p className="pt-1 text-sm font-semibold text-mist-200">
            {formatKRW(product.price)}
          </p>
        </div>
      </div>
    </Link>
  );
}
