import type { Product } from "@/types";

// ─────────────────────────────────────────────────────────────
//  상품 데이터 (현재는 정적 mock).
//  MŌRPH — 아방가르드 여성복 컬렉션.
//  실제 API/DB로 교체할 때는 아래 함수 시그니처만 유지하면
//  화면 코드는 그대로 동작합니다.
//  이미지는 비워두면 제네러티브 크롬 비주얼(ProductVisual)로 렌더됩니다.
// ─────────────────────────────────────────────────────────────

const PRODUCTS: Product[] = [
  {
    id: "morph-nullform-coat",
    slug: "nullform-coat",
    name: "NULL-FORM COAT",
    brand: "MŌRPH",
    price: 489000,
    color: "Liquid Graphite",
    category: "OUTERWEAR",
    sizes: ["XS", "S", "M", "L"],
    images: [],
    hue: 258,
    shortDescription:
      "어깨선을 지운 구조적 오버사이즈 코트. 몸의 윤곽 대신 형태 그 자체를 입는다.",
    description:
      "NULL-FORM COAT는 '입는 사람의 형태를 지운다'는 아이디어에서 출발한 아우터입니다. 각진 어깨 구조와 흐르는 헴라인이 충돌하며, 정지와 움직임 사이의 실루엣을 만듭니다. 무광 그래파이트 표면에 미세한 메탈릭 코팅을 더해 빛의 각도에 따라 크롬처럼 반사됩니다. 안감은 무중력 감의 리사이클 새틴. (상세 카피 추후 보완)",
    sizeChart: [
      { size: "XS", chest: 54, length: 108, shoulder: 52, sleeve: 60 },
      { size: "S", chest: 57, length: 110, shoulder: 54, sleeve: 61 },
      { size: "M", chest: 60, length: 112, shoulder: 56, sleeve: 62 },
      { size: "L", chest: 63, length: 114, shoulder: 58, sleeve: 63 },
    ],
    tags: ["신상품", "시그니처", "아우터"],
    createdAt: "2026-06-20T00:00:00.000Z",
  },
  {
    id: "morph-liquidchrome-dress",
    slug: "liquid-chrome-dress",
    name: "LIQUID CHROME DRESS",
    brand: "MŌRPH",
    price: 372000,
    color: "Mercury",
    category: "DRESS",
    sizes: ["XS", "S", "M", "L"],
    images: [],
    hue: 190,
    shortDescription:
      "수은처럼 흐르는 메탈릭 드레이프. 걸을 때마다 표면이 다시 그려진다.",
    description:
      "바이어스 재단으로 몸을 따라 흐르는 리퀴드 크롬 드레스. 은빛 코팅 저지가 조명 아래에서 수은 방울처럼 움직이며, 실루엣이 매 순간 재구성됩니다. 미니멀한 카울넥과 오픈 백으로 아방가르드와 관능 사이의 균형을 잡았습니다. (상세 카피 추후 보완)",
    sizeChart: [
      { size: "XS", chest: 42, length: 132, shoulder: 36, sleeve: 0 },
      { size: "S", chest: 44, length: 134, shoulder: 37, sleeve: 0 },
      { size: "M", chest: 46, length: 136, shoulder: 38, sleeve: 0 },
      { size: "L", chest: 48, length: 138, shoulder: 39, sleeve: 0 },
    ],
    tags: ["신상품", "베스트", "드레스"],
    createdAt: "2026-06-18T00:00:00.000Z",
  },
  {
    id: "morph-fracture-blazer",
    slug: "fracture-blazer",
    name: "FRACTURE BLAZER",
    brand: "MŌRPH",
    price: 298000,
    color: "Onyx",
    category: "TAILORING",
    sizes: ["XS", "S", "M", "L"],
    images: [],
    hue: 320,
    shortDescription:
      "해체·재조립한 테일러링. 라펠이 비대칭으로 갈라지며 새 균형을 만든다.",
    description:
      "클래식 블레이저를 해체주의 관점으로 다시 쓴 FRACTURE BLAZER. 비대칭 라펠과 어긋난 절개선이 정장의 문법을 깨뜨리되, 정교한 어깨 구조로 긴장감을 유지합니다. 매트한 오닉스 울 혼방. (상세 카피 추후 보완)",
    sizeChart: [
      { size: "XS", chest: 48, length: 72, shoulder: 42, sleeve: 60 },
      { size: "S", chest: 50, length: 74, shoulder: 44, sleeve: 61 },
      { size: "M", chest: 52, length: 76, shoulder: 46, sleeve: 62 },
      { size: "L", chest: 54, length: 78, shoulder: 48, sleeve: 63 },
    ],
    tags: ["베스트", "테일러링"],
    createdAt: "2026-06-15T00:00:00.000Z",
  },
  {
    id: "morph-void-knit",
    slug: "void-knit",
    name: "VOID KNIT",
    brand: "MŌRPH",
    price: 218000,
    color: "Deep Space",
    category: "KNIT",
    sizes: ["XS", "S", "M", "L"],
    images: [],
    hue: 268,
    shortDescription:
      "구멍과 밀도가 교차하는 조형 니트. 비어 있음을 디자인의 재료로 쓴다.",
    description:
      "VOID KNIT는 '없음'을 짜 넣은 니트웨어입니다. 불규칙한 개구부와 촘촘한 케이블이 교차하며, 착용자와 공간 사이에 새로운 레이어를 만듭니다. 부드러운 메리노 혼방으로 조형성과 편안함을 동시에. (상세 카피 추후 보완)",
    sizeChart: [
      { size: "XS", chest: 50, length: 62, shoulder: 44, sleeve: 58 },
      { size: "S", chest: 52, length: 64, shoulder: 46, sleeve: 59 },
      { size: "M", chest: 54, length: 66, shoulder: 48, sleeve: 60 },
      { size: "L", chest: 56, length: 68, shoulder: 50, sleeve: 61 },
    ],
    tags: ["신상품", "니트"],
    createdAt: "2026-06-10T00:00:00.000Z",
  },
  {
    id: "morph-monolith-trousers",
    slug: "monolith-trousers",
    name: "MONOLITH TROUSERS",
    brand: "MŌRPH",
    price: 246000,
    color: "Slate",
    category: "BOTTOMS",
    sizes: ["XS", "S", "M", "L"],
    images: [],
    hue: 210,
    shortDescription:
      "바닥까지 떨어지는 기둥 실루엣의 와이드 팬츠. 걸음이 조각이 된다.",
    description:
      "MONOLITH TROUSERS는 하나의 기둥처럼 곧게 떨어지는 와이드 실루엣입니다. 무게감 있는 드레이프가 다리의 움직임을 조형적 리듬으로 바꿔줍니다. 하이라이즈 구조로 비율을 극대화했습니다. (상세 카피 추후 보완)",
    sizeChart: [
      { size: "XS", chest: 34, length: 104, shoulder: 0, sleeve: 0 },
      { size: "S", chest: 36, length: 105, shoulder: 0, sleeve: 0 },
      { size: "M", chest: 38, length: 106, shoulder: 0, sleeve: 0 },
      { size: "L", chest: 40, length: 107, shoulder: 0, sleeve: 0 },
    ],
    tags: ["팬츠"],
    createdAt: "2026-06-05T00:00:00.000Z",
  },
  {
    id: "morph-halo-mesh-top",
    slug: "halo-mesh-top",
    name: "HALO MESH TOP",
    brand: "MŌRPH",
    price: 154000,
    color: "Iridescent",
    category: "TOP",
    sizes: ["XS", "S", "M", "L"],
    images: [],
    hue: 300,
    shortDescription:
      "빛을 통과시키는 시스루 메시. 몸 위에 후광 같은 레이어를 얹는다.",
    description:
      "HALO MESH TOP은 이리데센트 필라멘트로 짠 시스루 메시 탑입니다. 각도에 따라 보라·시안·마젠타로 번지는 표면이 피부 위에 후광 같은 빛의 막을 만듭니다. 레이어드 스타일링의 핵심 피스. (상세 카피 추후 보완)",
    sizeChart: [
      { size: "XS", chest: 40, length: 54, shoulder: 34, sleeve: 56 },
      { size: "S", chest: 42, length: 56, shoulder: 35, sleeve: 57 },
      { size: "M", chest: 44, length: 58, shoulder: 36, sleeve: 58 },
      { size: "L", chest: 46, length: 60, shoulder: 37, sleeve: 59 },
    ],
    tags: ["신상품", "레이어드"],
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
