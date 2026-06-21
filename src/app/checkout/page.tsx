"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  loadPaymentWidget,
  ANONYMOUS,
  type PaymentWidgetInstance,
} from "@tosspayments/payment-widget-sdk";
import { useCart, selectSubtotal } from "@/lib/store/cart";
import { calcShipping, formatKRW } from "@/lib/format";

const CLIENT_KEY = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY ?? "";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, hydrated } = useCart();
  const subtotal = useCart(selectSubtotal);
  const shipping = calcShipping(subtotal);
  const amount = subtotal + shipping;

  const widgetRef = useRef<PaymentWidgetInstance | null>(null);
  const methodsRef = useRef<ReturnType<
    PaymentWidgetInstance["renderPaymentMethods"]
  > | null>(null);
  const [ready, setReady] = useState(false);
  const [paying, setPaying] = useState(false);

  // 주문자 정보
  const [form, setForm] = useState({
    name: "",
    phone: "",
    zipcode: "",
    address: "",
    addressDetail: "",
  });

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  // 결제위젯 로드
  useEffect(() => {
    if (!hydrated || amount <= 0 || !CLIENT_KEY) return;
    let mounted = true;

    (async () => {
      const widget = await loadPaymentWidget(CLIENT_KEY, ANONYMOUS);
      if (!mounted) return;
      widgetRef.current = widget;
      methodsRef.current = widget.renderPaymentMethods(
        "#payment-method",
        { value: amount },
        { variantKey: "DEFAULT" }
      );
      widget.renderAgreement("#agreement", { variantKey: "AGREEMENT" });
      setReady(true);
    })();

    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hydrated, CLIENT_KEY]);

  // 금액 변동 시 위젯 갱신
  useEffect(() => {
    if (methodsRef.current && amount > 0) {
      methodsRef.current.updateAmount(amount);
    }
  }, [amount]);

  const validForm =
    form.name.trim() && form.phone.trim() && form.address.trim();

  const handlePay = async () => {
    const widget = widgetRef.current;
    if (!widget || !validForm) return;
    setPaying(true);

    const orderId = `WDT_${Date.now()}_${Math.random()
      .toString(36)
      .slice(2, 8)}`;
    const orderName =
      items.length > 1
        ? `${items[0].name} 외 ${items.length - 1}건`
        : items[0]?.name ?? "주문";

    // 성공 페이지에서 표시할 주문 정보를 임시 저장
    try {
      localStorage.setItem(
        "wdt_pending_order",
        JSON.stringify({ orderId, orderName, amount, items, form })
      );
    } catch {
      /* noop */
    }

    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL ?? window.location.origin;

    try {
      await widget.requestPayment({
        orderId,
        orderName,
        successUrl: `${baseUrl}/checkout/success`,
        failUrl: `${baseUrl}/checkout/fail`,
        customerName: form.name,
        customerMobilePhone: form.phone.replace(/[^0-9]/g, ""),
      });
    } catch (err) {
      console.error(err);
      setPaying(false);
    }
  };

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
        <h1 className="text-2xl font-semibold">주문할 상품이 없습니다</h1>
        <button onClick={() => router.push("/products")} className="btn-primary mt-8">
          쇼핑하러 가기
        </button>
      </div>
    );
  }

  return (
    <div className="container-page py-14">
      <h1 className="mb-10 text-3xl font-semibold">주문 / 결제</h1>

      <div className="grid gap-10 lg:grid-cols-3">
        <div className="space-y-10 lg:col-span-2">
          {/* 주문자 정보 */}
          <section className="glass-card p-6">
            <h2 className="mb-5 text-lg font-semibold">배송 정보</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <input className="field" placeholder="받는 분 이름 *" value={form.name} onChange={update("name")} />
              <input className="field" placeholder="휴대폰 번호 *" value={form.phone} onChange={update("phone")} />
              <input className="field" placeholder="우편번호" value={form.zipcode} onChange={update("zipcode")} />
              <input className="field sm:col-span-2" placeholder="주소 *" value={form.address} onChange={update("address")} />
              <input className="field sm:col-span-2" placeholder="상세주소" value={form.addressDetail} onChange={update("addressDetail")} />
            </div>
            {!validForm && (
              <p className="mt-3 text-xs text-mist-400">* 표시 항목은 필수입니다.</p>
            )}
          </section>

          {/* 결제수단 위젯 */}
          <section className="glass-card p-2 sm:p-4">
            <h2 className="px-3 pb-2 pt-3 text-lg font-semibold">결제 수단</h2>
            {!CLIENT_KEY && (
              <p className="px-3 pb-4 text-sm text-red-400">
                ⚠ TossPayments 클라이언트 키가 설정되지 않았습니다. .env.local의
                NEXT_PUBLIC_TOSS_CLIENT_KEY를 확인하세요.
              </p>
            )}
            <div id="payment-method" />
            <div id="agreement" />
          </section>
        </div>

        {/* 주문 요약 */}
        <aside className="lg:col-span-1">
          <div className="glass-card sticky top-24 space-y-4 p-6">
            <h2 className="text-lg font-semibold">주문 요약</h2>
            <ul className="space-y-2 text-sm text-mist-300">
              {items.map((it) => (
                <li key={`${it.productId}-${it.size}`} className="flex justify-between">
                  <span className="truncate pr-2">
                    {it.name} ({it.size}) × {it.quantity}
                  </span>
                  <span>{formatKRW(it.price * it.quantity)}</span>
                </li>
              ))}
            </ul>
            <div className="space-y-2 border-t border-white/5 pt-4 text-sm">
              <div className="flex justify-between text-mist-300">
                <span>상품금액</span>
                <span>{formatKRW(subtotal)}</span>
              </div>
              <div className="flex justify-between text-mist-300">
                <span>배송비</span>
                <span>{shipping === 0 ? "무료" : formatKRW(shipping)}</span>
              </div>
            </div>
            <div className="flex justify-between border-t border-white/5 pt-4 text-base font-semibold">
              <span>총 결제금액</span>
              <span className="text-drop-light">{formatKRW(amount)}</span>
            </div>
            <button
              onClick={handlePay}
              disabled={!ready || !validForm || paying}
              className="btn-primary w-full"
            >
              {paying ? "결제 진행 중…" : `${formatKRW(amount)} 결제하기`}
            </button>
            <p className="text-center text-xs text-mist-400">
              테스트 모드로 동작합니다 (실제 결제 아님)
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
