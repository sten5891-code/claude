"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Product, Size } from "@/types";
import { useCart } from "@/lib/store/cart";
import { formatKRW } from "@/lib/format";

export default function ProductPurchase({ product }: { product: Product }) {
  const router = useRouter();
  const addItem = useCart((s) => s.addItem);
  const [size, setSize] = useState<Size | null>(null);
  const [qty, setQty] = useState(1);
  const [notice, setNotice] = useState<string | null>(null);

  const total = product.price * qty;

  const buildItem = (selected: Size) => ({
    productId: product.id,
    slug: product.slug,
    name: product.name,
    price: product.price,
    size: selected,
    quantity: qty,
    image: product.images[0],
  });

  const handleAdd = () => {
    if (!size) {
      setNotice("사이즈를 선택해주세요.");
      return;
    }
    addItem(buildItem(size));
    setNotice("장바구니에 담았습니다.");
  };

  const handleBuyNow = () => {
    if (!size) {
      setNotice("사이즈를 선택해주세요.");
      return;
    }
    addItem(buildItem(size));
    router.push("/checkout");
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm tracking-widest text-mist-400">{product.brand}</p>
        <h1 className="mt-2 text-3xl font-semibold">{product.name}</h1>
        <p className="mt-2 text-sm text-mist-400">색상: {product.color}</p>
        <p className="mt-4 text-2xl font-semibold">{formatKRW(product.price)}</p>
      </div>

      <p className="leading-relaxed text-mist-300">{product.shortDescription}</p>

      {/* 사이즈 선택 */}
      <div>
        <p className="mb-2 text-sm font-medium text-mist-200">사이즈</p>
        <div className="flex gap-3">
          {product.sizes.map((s) => (
            <button
              key={s}
              onClick={() => {
                setSize(s);
                setNotice(null);
              }}
              className={`h-12 w-16 rounded-xl border text-sm font-medium transition ${
                size === s
                  ? "border-drop/60 bg-drop/10 text-drop-light"
                  : "border-white/10 text-mist-300 hover:border-drop/40"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* 수량 */}
      <div>
        <p className="mb-2 text-sm font-medium text-mist-200">수량</p>
        <div className="inline-flex items-center rounded-xl border border-white/10">
          <button
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="h-11 w-11 text-lg text-mist-300 hover:text-drop-light"
            aria-label="수량 감소"
          >
            −
          </button>
          <span className="w-12 text-center text-sm">{qty}</span>
          <button
            onClick={() => setQty((q) => q + 1)}
            className="h-11 w-11 text-lg text-mist-300 hover:text-drop-light"
            aria-label="수량 증가"
          >
            +
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-white/5 pt-4">
        <span className="text-sm text-mist-400">총 상품금액</span>
        <span className="text-xl font-semibold text-drop-light">
          {formatKRW(total)}
        </span>
      </div>

      {notice && (
        <p className="rounded-lg bg-drop/10 px-4 py-3 text-sm text-drop-light">
          {notice}
        </p>
      )}

      <div className="flex gap-3">
        <button onClick={handleAdd} className="btn-ghost flex-1">
          장바구니
        </button>
        <button onClick={handleBuyNow} className="btn-primary flex-1">
          바로 구매
        </button>
      </div>
    </div>
  );
}
