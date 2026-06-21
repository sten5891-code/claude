// ─────────────────────────────────────────────────────────────
//  도메인 타입 정의
//  실제 백엔드 연결 시에도 이 타입들을 그대로 재사용할 수 있도록
//  데이터 레이어와 분리해 둡니다.
// ─────────────────────────────────────────────────────────────

export type Size = "M" | "L";

export interface SizeSpec {
  size: Size;
  /** 가슴 단면 (cm) */
  chest: number;
  /** 총장 (cm) */
  length: number;
  /** 어깨 너비 (cm) */
  shoulder: number;
  /** 소매 길이 (cm) */
  sleeve: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  /** 정가 (원) */
  price: number;
  color: string;
  sizes: Size[];
  /** 갤러리 이미지 경로 (public 기준) */
  images: string[];
  shortDescription: string;
  description: string;
  sizeChart: SizeSpec[];
  /** 카탈로그 정렬/필터용 메타 */
  tags: string[];
  createdAt: string;
}

export interface CartItem {
  productId: string;
  slug: string;
  name: string;
  price: number;
  size: Size;
  quantity: number;
  image: string;
}

export interface Review {
  id: string;
  productId: string;
  author: string;
  rating: number; // 1-5
  text: string;
  /** data URL 또는 이미지 경로 (선택) */
  photo?: string;
  createdAt: string;
}

export type QuestionStatus = "answered" | "pending";

export interface Question {
  id: string;
  productId: string;
  author: string;
  title: string;
  body: string;
  secret: boolean;
  status: QuestionStatus;
  answer?: string;
  createdAt: string;
}
