import type { Review } from "@/types";
import { createId, readCollection, writeCollection } from "./storage";

const KEY = "wdt_reviews_v1";

const SEED: Review[] = [
  {
    id: "rv_seed_1",
    productId: "raindrop-tee-001",
    author: "물방울러버",
    rating: 5,
    text: "사진보다 실물이 훨씬 예뻐요. 밑단 그라데이션이 은은하게 빠져서 고급스럽습니다. 비 오는 날 입으면 분위기 최고!",
    createdAt: "2026-06-10T09:00:00.000Z",
  },
  {
    id: "rv_seed_2",
    productId: "raindrop-tee-001",
    author: "minsu_k",
    rating: 4,
    text: "원단이 도톰하고 좋아요. 평소 M 입는데 살짝 넉넉한 핏이라 만족합니다. 별 하나 뺀 건 배송이 조금 느려서요.",
    createdAt: "2026-06-12T14:20:00.000Z",
  },
  {
    id: "rv_seed_3",
    productId: "raindrop-tee-001",
    author: "rainy.day",
    rating: 5,
    text: "색감이 정말 차분하고 좋네요. 어디에나 잘 어울려서 자주 손이 갑니다.",
    createdAt: "2026-06-15T18:45:00.000Z",
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
