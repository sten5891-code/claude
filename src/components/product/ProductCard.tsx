"use client";

import Link from "next/link";
import { useRef } from "react";
import type { Product } from "@/types";
import { formatKRW } from "@/lib/format";
import ProductVisual from "./ProductVisual";

export default function ProductCard({ product }: { product: Product }) {
  const ref = useRef<HTMLAnchorElement>(null);

  // 자석(magnetic) 효과 — 포인터 위치에 따라 카드가 살짝 기울어짐
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${x * 6}deg) rotateX(${
      -y * 6
    }deg) translateY(-4px)`;
  };
  const reset = () => {
    const el = ref.current;
    if (el) el.style.transform = "";
  };

  return (
    <Link
      ref={ref}
      href={`/products/${product.slug}`}
      onMouseMove={onMove}
      onMouseLeave={reset}
      className="group block transition-transform duration-base ease-expo will-change-transform"
    >
      <div className="glass-card holo-border overflow-hidden">
        <div className="relative aspect-[4/5] overflow-hidden">
          {product.images[0] ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={product.images[0]}
              alt={product.name}
              className="h-full w-full object-cover transition duration-slow ease-expo group-hover:scale-105"
            />
          ) : (
            <ProductVisual
              hue={product.hue}
              label={product.category}
              className="h-full w-full transition duration-slow ease-expo group-hover:scale-105"
            />
          )}
          <span className="absolute left-3 top-3 rounded-full border border-line bg-void/60 px-3 py-1 text-[11px] tracking-wide text-text-muted backdrop-blur">
            {product.color}
          </span>
        </div>
        <div className="space-y-1 p-4">
          <p className="eyebrow text-[10px]">{product.brand}</p>
          <h3 className="text-base font-medium text-text transition group-hover:text-iris-cyan">
            {product.name}
          </h3>
          <p className="pt-1 text-sm font-semibold text-text-muted">
            {formatKRW(product.price)}
          </p>
        </div>
      </div>
    </Link>
  );
}
