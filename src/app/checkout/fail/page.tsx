"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

function FailInner() {
  const params = useSearchParams();
  const message = params.get("message") ?? "결제가 취소되었거나 실패했습니다.";
  const code = params.get("code");

  return (
    <div className="container-page py-24 text-center">
      <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10 text-3xl">
        ✕
      </div>
      <h1 className="text-2xl font-semibold">결제에 실패했습니다</h1>
      <p className="mt-3 text-mist-400">{message}</p>
      {code && <p className="mt-1 text-xs text-mist-400">오류코드: {code}</p>}

      <div className="mt-10 flex justify-center gap-3">
        <Link href="/cart" className="btn-ghost">
          장바구니로
        </Link>
        <Link href="/checkout" className="btn-primary">
          다시 시도하기
        </Link>
      </div>
    </div>
  );
}

export default function FailPage() {
  return (
    <Suspense fallback={<div className="container-page py-32 text-center text-mist-400">불러오는 중…</div>}>
      <FailInner />
    </Suspense>
  );
}
