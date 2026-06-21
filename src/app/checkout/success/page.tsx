"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCart } from "@/lib/store/cart";
import { formatKRW } from "@/lib/format";

type Status = "loading" | "success" | "error";

function SuccessInner() {
  const params = useSearchParams();
  const clear = useCart((s) => s.clear);
  const [status, setStatus] = useState<Status>("loading");
  const [message, setMessage] = useState("");
  const [order, setOrder] = useState<{
    orderId: string;
    amount: number;
    name?: string;
    address?: string;
  } | null>(null);
  const done = useRef(false);

  useEffect(() => {
    if (done.current) return;
    done.current = true;

    const paymentKey = params.get("paymentKey");
    const orderId = params.get("orderId");
    const amount = params.get("amount");

    if (!paymentKey || !orderId || !amount) {
      setStatus("error");
      setMessage("결제 정보가 올바르지 않습니다.");
      return;
    }

    (async () => {
      try {
        const res = await fetch("/api/confirm", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ paymentKey, orderId, amount }),
        });
        const data = await res.json();
        if (!res.ok) {
          setStatus("error");
          setMessage(data.message ?? "결제 승인에 실패했습니다.");
          return;
        }

        // 주문자 정보 복원
        let pending: any = null;
        try {
          pending = JSON.parse(localStorage.getItem("wdt_pending_order") ?? "null");
          localStorage.removeItem("wdt_pending_order");
        } catch {
          /* noop */
        }

        setOrder({
          orderId,
          amount: Number(amount),
          name: pending?.form?.name,
          address: pending?.form
            ? `${pending.form.address} ${pending.form.addressDetail ?? ""}`.trim()
            : undefined,
        });
        clear(); // 결제 완료 → 장바구니 비우기
        setStatus("success");
      } catch (e) {
        setStatus("error");
        setMessage("결제 승인 중 오류가 발생했습니다.");
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (status === "loading") {
    return (
      <div className="container-page py-32 text-center text-mist-400">
        결제를 확인하고 있습니다…
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="container-page py-24 text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10 text-3xl">
          ✕
        </div>
        <h1 className="text-2xl font-semibold">결제 승인 실패</h1>
        <p className="mt-3 text-mist-400">{message}</p>
        <Link href="/cart" className="btn-primary mt-8">
          장바구니로 돌아가기
        </Link>
      </div>
    );
  }

  return (
    <div className="container-page py-24 text-center">
      <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-drop/15 text-3xl text-drop-light animate-ripple">
        ✓
      </div>
      <h1 className="text-3xl font-semibold">주문이 완료되었습니다</h1>
      <p className="mt-3 text-mist-400">
        구매해 주셔서 감사합니다. 주문 내역을 확인해주세요.
      </p>

      <div className="glass-card mx-auto mt-10 max-w-md space-y-3 p-6 text-left text-sm">
        <Row label="주문번호" value={order?.orderId ?? "-"} />
        <Row label="결제금액" value={order ? formatKRW(order.amount) : "-"} />
        {order?.name && <Row label="받는 분" value={order.name} />}
        {order?.address && <Row label="배송지" value={order.address} />}
      </div>

      <div className="mt-10 flex justify-center gap-3">
        <Link href="/" className="btn-ghost">
          홈으로
        </Link>
        <Link href="/products" className="btn-primary">
          계속 쇼핑하기
        </Link>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-white/5 pb-3 last:border-0 last:pb-0">
      <span className="text-mist-400">{label}</span>
      <span className="text-right font-medium text-mist-100">{value}</span>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="container-page py-32 text-center text-mist-400">불러오는 중…</div>}>
      <SuccessInner />
    </Suspense>
  );
}
