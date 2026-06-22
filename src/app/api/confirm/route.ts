import { NextResponse } from "next/server";

// ─────────────────────────────────────────────────────────────
//  결제 승인(confirm) — 서버에서만 시크릿 키로 호출합니다.
//  successUrl로 받은 paymentKey/orderId/amount를 토스 서버에 전달해
//  실제 결제를 최종 승인합니다.
//  docs: https://docs.tosspayments.com/reference#결제-승인
// ─────────────────────────────────────────────────────────────

// 환경변수가 없으면 토스페이먼츠 공개 "테스트" 시크릿 키로 동작합니다.
// (배포 후 별도 설정 없이도 테스트 결제 승인 가능 / 라이브 전환은 환경변수로 교체)
const TEST_SECRET_KEY = "test_gsk_docs_OaPz8L5KdmQXkzRz3y47BMw6";

export async function POST(request: Request) {
  const secretKey = process.env.TOSS_SECRET_KEY ?? TEST_SECRET_KEY;

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
