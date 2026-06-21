"use client";

import { useState } from "react";
import type { Product } from "@/types";
import SizeTable from "./SizeTable";
import Reviews from "@/components/reviews/Reviews";
import Qna from "@/components/qna/Qna";

const TABS = [
  { key: "detail", label: "상세정보" },
  { key: "reviews", label: "리뷰" },
  { key: "qna", label: "Q&A" },
] as const;

type TabKey = (typeof TABS)[number]["key"];

export default function ProductTabs({ product }: { product: Product }) {
  const [tab, setTab] = useState<TabKey>("detail");

  return (
    <div>
      <div className="sticky top-16 z-30 -mx-4 mb-10 flex border-b border-white/5 bg-ink-950/80 px-4 backdrop-blur sm:mx-0 sm:px-0">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`relative px-6 py-4 text-sm transition ${
              tab === t.key ? "text-drop-light" : "text-mist-400 hover:text-mist-200"
            }`}
          >
            {t.label}
            {tab === t.key && (
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-drop" />
            )}
          </button>
        ))}
      </div>

      {tab === "detail" && (
        <div className="space-y-12">
          <div>
            <h3 className="mb-4 text-lg font-semibold">상품 설명</h3>
            <p className="whitespace-pre-line leading-relaxed text-mist-300">
              {product.description}
            </p>
          </div>

          {/* 상세 이미지 나열 */}
          <div className="space-y-6">
            {product.images.map((src, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={src}
                src={src}
                alt={`${product.name} 상세 ${i + 1}`}
                className="w-full rounded-2xl"
              />
            ))}
          </div>

          <SizeTable chart={product.sizeChart} />
        </div>
      )}

      {tab === "reviews" && <Reviews productId={product.id} />}
      {tab === "qna" && <Qna productId={product.id} />}
    </div>
  );
}
