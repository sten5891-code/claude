// 공통 포맷 유틸

export function formatKRW(value: number): string {
  return `${value.toLocaleString("ko-KR")}원`;
}

export function formatDate(iso: string): string {
  const d = new Date(iso);
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(d);
}

/** 배송비 정책 (placeholder): 5만원 이상 무료, 미만 3,000원 */
export const SHIPPING_FEE = 3000;
export const FREE_SHIPPING_THRESHOLD = 50000;

export function calcShipping(subtotal: number): number {
  if (subtotal === 0) return 0;
  return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
}
