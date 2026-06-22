import type { Product } from "@/types";

// ─────────────────────────────────────────────────────────────
//  상품 데이터 (현재는 정적 mock).
//  나중에 실제 API/DB로 교체할 때는 아래 함수 시그니처만 유지하면
//  화면 코드는 그대로 동작합니다.
// ─────────────────────────────────────────────────────────────

const PRODUCTS: Product[] = [
  {
    id: "raindrop-tee-001",
    slug: "raindrop-tee",
    // TODO: 실제 상품명으로 교체
    name: "RAINDROP TEE",
    // TODO: 실제 브랜드명으로 교체
    brand: "AQUA LABEL",
    // TODO: 실제 판매가로 교체
    price: 39000,
    color: "Heather Gray",
    sizes: ["M", "L"],
    images: [
      // ▼ 상품 사진 (현재 1장).
      //   사진을 더 추가하려면 public/images/ 에 파일을 넣고 아래 배열에 경로를 추가하세요.
      "/images/product-1.png",
    ],
    shortDescription:
      "상단은 차분한 헤더 그레이, 밑단으로 갈수록 물방울이 번지는 그라데이션 티셔츠.",
    description:
      // TODO: 실제 상세 설명으로 교체
      "도시의 비 오는 거리에서 영감을 받은 RAINDROP TEE. 상단은 미니멀한 헤더 그레이 솔리드로 시작해, 밑단으로 내려갈수록 물방울이 유리 위로 번지는 듯한 그라데이션 프린트가 자연스럽게 스며듭니다. 부드러운 코튼 혼방 원단으로 데일리하게 입기 좋으며, 한 가지 색상·미니멀한 실루엣으로 어떤 코디에도 무리 없이 어울립니다. (상세 카피 추후 보완)",
    sizeChart: [
      // TODO: 실제 실측값으로 교체
      { size: "M", chest: 52, length: 70, shoulder: 46, sleeve: 21 },
      { size: "L", chest: 55, length: 73, shoulder: 49, sleeve: 22 },
    ],
    tags: ["신상품", "베스트", "그라데이션"],
    createdAt: "2026-06-01T00:00:00.000Z",
  },
];

export async function getAllProducts(): Promise<Product[]> {
  return PRODUCTS;
}

export async function getProductBySlug(
  slug: string
): Promise<Product | undefined> {
  return PRODUCTS.find((p) => p.slug === slug);
}

export async function getFeaturedProduct(): Promise<Product> {
  return PRODUCTS[0];
}

export function getAllProductsSync(): Product[] {
  return PRODUCTS;
}
