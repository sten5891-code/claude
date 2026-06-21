"use client";

import { useEffect, useState } from "react";
import type { Review } from "@/types";
import {
  addReview,
  getAverageRating,
  getReviews,
  type ReviewSort,
} from "@/lib/data/reviews";
import { formatDate } from "@/lib/format";
import { Stars, StarInput } from "./StarRating";

export default function Reviews({ productId }: { productId: string }) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [sort, setSort] = useState<ReviewSort>("recent");
  const [loading, setLoading] = useState(true);

  // 작성 폼 상태
  const [author, setAuthor] = useState("");
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");
  const [photo, setPhoto] = useState<string | undefined>();

  const load = async (s: ReviewSort) => {
    setLoading(true);
    setReviews(await getReviews(productId, s));
    setLoading(false);
  };

  useEffect(() => {
    load(sort);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sort]);

  const avg = getAverageRating(reviews);

  const onPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setPhoto(reader.result as string);
    reader.readAsDataURL(file);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !text.trim()) return;
    await addReview({ productId, author: author.trim(), rating, text: text.trim(), photo });
    setAuthor("");
    setText("");
    setRating(5);
    setPhoto(undefined);
    await load(sort);
  };

  return (
    <section>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-semibold">
            리뷰 <span className="text-mist-400">({reviews.length})</span>
          </h2>
          {reviews.length > 0 && (
            <span className="flex items-center gap-2 text-sm text-mist-300">
              <Stars value={avg} /> {avg.toFixed(1)}
            </span>
          )}
        </div>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as ReviewSort)}
          className="field w-auto py-2"
        >
          <option value="recent">최신순</option>
          <option value="rating">평점순</option>
        </select>
      </div>

      {/* 작성 폼 */}
      <form onSubmit={submit} className="glass-card mb-8 space-y-4 p-5">
        <div className="flex flex-wrap items-center gap-4">
          <input
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="닉네임"
            className="field sm:w-48"
            required
          />
          <StarInput value={rating} onChange={setRating} />
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="상품은 어떠셨나요? 솔직한 후기를 남겨주세요."
          rows={3}
          className="field resize-none"
          required
        />
        <div className="flex flex-wrap items-center justify-between gap-4">
          <label className="cursor-pointer text-sm text-mist-300 hover:text-drop-light">
            <input type="file" accept="image/*" onChange={onPhoto} className="hidden" />
            📷 사진 첨부 {photo ? "(첨부됨)" : "(선택)"}
          </label>
          <button type="submit" className="btn-primary">
            리뷰 등록
          </button>
        </div>
        {photo && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={photo} alt="첨부 미리보기" className="h-24 w-24 rounded-lg object-cover" />
        )}
      </form>

      {/* 목록 */}
      {loading ? (
        <p className="py-10 text-center text-mist-400">불러오는 중…</p>
      ) : reviews.length === 0 ? (
        <p className="py-10 text-center text-mist-400">
          첫 번째 리뷰를 남겨보세요.
        </p>
      ) : (
        <ul className="space-y-4">
          {reviews.map((r) => (
            <li key={r.id} className="glass-card p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="font-medium text-mist-100">{r.author}</span>
                  <Stars value={r.rating} size={14} />
                </div>
                <span className="text-xs text-mist-400">
                  {formatDate(r.createdAt)}
                </span>
              </div>
              <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-mist-300">
                {r.text}
              </p>
              {r.photo && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={r.photo}
                  alt="리뷰 사진"
                  className="mt-3 h-32 w-32 rounded-lg object-cover"
                />
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
