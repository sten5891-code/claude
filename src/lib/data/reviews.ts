import type { Review } from "@/types";
import { createId, readCollection, writeCollection } from "./storage";

const KEY = "morph_reviews_v1";

const SEED: Review[] = [
  {
    id: "rv_seed_1",
    productId: "morph-nullform-coat",
    author: "form.follows",
    rating: 5,
    text: "실물이 압도적입니다. 어깨 구조가 정말 조형적이고, 빛 각도에 따라 표면이 크롬처럼 반사돼요. 갤러리 오프닝에 입고 갔는데 시선 독차지했어요.",
    createdAt: "2026-06-25T09:00:00.000Z",
  },
  {
    id: "rv_seed_2",
    productId: "morph-nullform-coat",
    author: "seoyeon_a",
    rating: 4,
    text: "무게감이 있어서 드레이프가 정말 예쁘게 떨어집니다. 평소 S인데 오버핏이라 XS도 괜찮았을 듯. 별 하나는 가격 때문에요.",
    createdAt: "2026-06-27T14:20:00.000Z",
  },
  {
    id: "rv_seed_3",
    productId: "morph-liquidchrome-dress",
    author: "mercury.mood",
    rating: 5,
    text: "움직일 때마다 표면이 다시 그려지는 느낌. 조명 아래에서 진짜 수은처럼 흘러요. 오픈 백 라인도 과하지 않고 세련됐습니다.",
    createdAt: "2026-06-28T18:45:00.000Z",
  },
];

export type ReviewSort = "recent" | "rating";

export async function getReviews(
  productId: string,
  sort: ReviewSort = "recent"
): Promise<Review[]> {
  const all = readCollection<Review>(KEY, SEED).filter(
    (r) => r.productId === productId
  );
  if (sort === "rating") {
    return [...all].sort((a, b) => b.rating - a.rating);
  }
  return [...all].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export async function addReview(
  input: Omit<Review, "id" | "createdAt">
): Promise<Review> {
  const all = readCollection<Review>(KEY, SEED);
  const review: Review = {
    ...input,
    id: createId("rv"),
    createdAt: new Date().toISOString(),
  };
  writeCollection(KEY, [review, ...all]);
  return review;
}

export function getAverageRating(reviews: Review[]): number {
  if (reviews.length === 0) return 0;
  const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
  return Math.round((sum / reviews.length) * 10) / 10;
}
