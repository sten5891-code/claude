"use client";

import Link from "next/link";
import { useCart, selectSubtotal } from "@/lib/store/cart";
import { calcShipping, formatKRW, FREE_SHIPPING_THRESHOLD } from "@/lib/format";

export default function CartPage() {
  const { items, hydrated, updateQuantity, removeItem } = useCart();
  const subtotal = useCart(selectSubtotal);
  const shipping = calcShipping(subtotal);
  const total = subtotal + shipping;

  if (!hydrated) {
    return (
      <div className="container-page py-20 text-center text-mist-400">
        불러오는 중…
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container-page py-24 text-center">
        <h1 className="text-2xl font-semibold">장바구니가 비어있습니다</h1>
        <p className="mt-3 text-mist-400">마음에 드는 상품을 담아보세요.</p>
        <Link href="/products" className="btn-primary mt-8">
          쇼핑하러 가기
        </Link>
      </div>
    );
  }

  return (
    <div className="container-page py-14">
      <h1 className="mb-10 text-3xl font-semibold">장바구니</h1>

      <div className="grid gap-10 lg:grid-cols-3">
        {/* 품목 리스트 */}
        <div className="space-y-4 lg:col-span-2">
          {items.map((item) => (
            <div
              key={`${item.productId}-${item.size}`}
              className="glass-card flex gap-4 p-4"
            >
              <Link
                href={`/products/${item.slug}`}
                className="relative aspect-square w-24 shrink-0 overflow-hidden rounded-xl bg-ink-800"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover"
                />
              </Link>

              <div className="flex flex-1 flex-col">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="mt-1 text-xs text-mist-400">
                      사이즈: {item.size}
                    </p>
                  </div>
                  <button
                    onClick={() => removeItem(item.productId, item.size)}
                    className="text-xs text-mist-400 hover:text-drop-light"
                  >
                    삭제
                  </button>
                </div>

                <div className="mt-auto flex items-center justify-between pt-3">
                  <div className="inline-flex items-center rounded-lg border border-white/10">
                    <button
                      onClick={() =>
                        updateQuantity(item.productId, item.size, item.quantity - 1)
                      }
                      className="h-9 w-9 text-mist-300 hover:text-drop-light"
                      aria-label="수량 감소"
                    >
                      −
                    </button>
                    <span className="w-10 text-center text-sm">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(item.productId, item.size, item.quantity + 1)
                      }
                      className="h-9 w-9 text-mist-300 hover:text-drop-light"
                      aria-label="수량 증가"
                    >
                      +
                    </button>
                  </div>
                  <p className="font-semibold">
                    {formatKRW(item.price * item.quantity)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 주문 요약 */}
        <aside className="lg:col-span-1">
          <div className="glass-card sticky top-24 space-y-4 p-6">
            <h2 className="text-lg font-semibold">주문 요약</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-mist-300">
                <span>상품금액</span>
                <span>{formatKRW(subtotal)}</span>
              </div>
              <div className="flex justify-between text-mist-300">
                <span>배송비</span>
                <span>{shipping === 0 ? "무료" : formatKRW(shipping)}</span>
              </div>
              {subtotal < FREE_SHIPPING_THRESHOLD && (
                <p className="text-xs text-drop-light">
                  {formatKRW(FREE_SHIPPING_THRESHOLD - subtotal)} 추가 시 무료배송
                </p>
              )}
            </div>
            <div className="flex justify-between border-t border-white/5 pt-4 text-base font-semibold">
              <span>총 결제금액</span>
              <span className="text-drop-light">{formatKRW(total)}</span>
            </div>
            <Link href="/checkout" className="btn-primary w-full">
              주문하기
            </Link>
            <Link href="/products" className="btn-ghost w-full">
              계속 쇼핑하기
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
