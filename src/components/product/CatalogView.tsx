"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/types";
import ProductCard from "./ProductCard";

// 필터/정렬 UI 스캐폴딩 — 상품이 늘어나도 그대로 확장 가능합니다.
type SortKey = "newest" | "price-asc" | "price-desc";

const SORTS: { key: SortKey; label: string }[] = [
  { key: "newest", label: "최신순" },
  { key: "price-asc", label: "가격 낮은순" },
  { key: "price-desc", label: "가격 높은순" },
];

export default function CatalogView({ products }: { products: Product[] }) {
  const [sort, setSort] = useState<SortKey>("newest");
  const [activeTag, setActiveTag] = useState<string>("전체");

  const tags = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => p.tags.forEach((t) => set.add(t)));
    return ["전체", ...Array.from(set)];
  }, [products]);

  const visible = useMemo(() => {
    let list =
      activeTag === "전체"
        ? products
        : products.filter((p) => p.tags.includes(activeTag));
    list = [...list];
    switch (sort) {
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      default:
        list.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
    }
    return list;
  }, [products, activeTag, sort]);

  return (
    <div>
      {/* 필터 + 정렬 바 */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {tags.map((t) => (
            <button
              key={t}
              onClick={() => setActiveTag(t)}
              className={`rounded-full border px-4 py-1.5 text-sm transition ${
                activeTag === t
                  ? "border-drop/50 bg-drop/10 text-drop-light"
                  : "border-white/10 text-mist-400 hover:border-drop/30 hover:text-mist-200"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-mist-400">정렬</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="field w-auto py-2"
          >
            {SORTS.map((s) => (
              <option key={s.key} value={s.key}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <p className="mb-4 text-xs text-mist-400">총 {visible.length}개 상품</p>

      <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
        {visible.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      {visible.length === 0 && (
        <p className="py-20 text-center text-mist-400">상품이 없습니다.</p>
      )}
    </div>
  );
}
