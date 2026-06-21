import { NextResponse } from "next/server";

// ─────────────────────────────────────────────────────────────
//  결제 승인(confirm) — 서버에서만 시크릿 키로 호출합니다.
//  successUrl로 받은 paymentKey/orderId/amount를 토스 서버에 전달해
//  실제 결제를 최종 승인합니다.
//  docs: https://docs.tosspayments.com/reference#결제-승인
// ─────────────────────────────────────────────────────────────

export async function POST(request: Request) {
  const secretKey = process.env.TOSS_SECRET_KEY;
  if (!secretKey) {
    return NextResponse.json(
      { message: "서버에 TOSS_SECRET_KEY가 설정되지 않았습니다." },
      { status: 500 }
    );
  }

  const { paymentKey, orderId, amount } = await request.json();
  if (!paymentKey || !orderId || !amount) {
    return NextResponse.json(
      { message: "필수 파라미터가 누락되었습니다." },
      { status: 400 }
    );
  }

  // Basic 인증: base64("{secretKey}:")
  const encrypted = Buffer.from(`${secretKey}:`).toString("base64");

  const res = await fetch("https://api.tosspayments.com/v1/payments/confirm", {
    method: "POST",
    headers: {
      Authorization: `Basic ${encrypted}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ paymentKey, orderId, amount: Number(amount) }),
  });

  const data = await res.json();

  if (!res.ok) {
    return NextResponse.json(
      { message: data.message ?? "결제 승인에 실패했습니다.", code: data.code },
      { status: res.status }
    );
  }

  return NextResponse.json(data);
}
