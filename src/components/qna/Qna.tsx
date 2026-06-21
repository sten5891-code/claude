"use client";

import { useEffect, useState } from "react";
import type { Question } from "@/types";
import { addQuestion, getQuestions, type QnaFilter } from "@/lib/data/qna";
import { formatDate } from "@/lib/format";

export default function Qna({ productId }: { productId: string }) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [filter, setFilter] = useState<QnaFilter>("all");
  const [loading, setLoading] = useState(true);
  const [openId, setOpenId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [secret, setSecret] = useState(false);

  const load = async (f: QnaFilter) => {
    setLoading(true);
    setQuestions(await getQuestions(productId, f));
    setLoading(false);
  };

  useEffect(() => {
    load(filter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !title.trim() || !body.trim()) return;
    await addQuestion({
      productId,
      author: author.trim(),
      title: title.trim(),
      body: body.trim(),
      secret,
    });
    setAuthor("");
    setTitle("");
    setBody("");
    setSecret(false);
    setShowForm(false);
    await load(filter);
  };

  const FILTERS: { key: QnaFilter; label: string }[] = [
    { key: "all", label: "전체" },
    { key: "answered", label: "답변완료" },
    { key: "pending", label: "미답변" },
  ];

  return (
    <section>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-xl font-semibold">
          상품 Q&amp;A <span className="text-mist-400">({questions.length})</span>
        </h2>
        <button onClick={() => setShowForm((v) => !v)} className="btn-ghost py-2">
          {showForm ? "닫기" : "문의하기"}
        </button>
      </div>

      {/* 필터 */}
      <div className="mb-5 flex gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`rounded-full border px-4 py-1.5 text-sm transition ${
              filter === f.key
                ? "border-drop/50 bg-drop/10 text-drop-light"
                : "border-white/10 text-mist-400 hover:text-mist-200"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* 문의 작성 폼 */}
      {showForm && (
        <form onSubmit={submit} className="glass-card mb-6 space-y-4 p-5">
          <div className="flex flex-wrap gap-4">
            <input
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="이름"
              className="field sm:w-48"
              required
            />
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="제목"
              className="field flex-1"
              required
            />
          </div>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="문의 내용을 입력해주세요."
            rows={3}
            className="field resize-none"
            required
          />
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm text-mist-300">
              <input
                type="checkbox"
                checked={secret}
                onChange={(e) => setSecret(e.target.checked)}
                className="accent-drop"
              />
              비밀글로 문의
            </label>
            <button type="submit" className="btn-primary">
              등록
            </button>
          </div>
        </form>
      )}

      {/* 목록 */}
      {loading ? (
        <p className="py-10 text-center text-mist-400">불러오는 중…</p>
      ) : questions.length === 0 ? (
        <p className="py-10 text-center text-mist-400">등록된 문의가 없습니다.</p>
      ) : (
        <ul className="divide-y divide-white/5 overflow-hidden rounded-2xl border border-white/5">
          {questions.map((q) => {
            const open = openId === q.id;
            return (
              <li key={q.id}>
                <button
                  onClick={() => setOpenId(open ? null : q.id)}
                  className="flex w-full items-center gap-3 px-5 py-4 text-left transition hover:bg-white/[0.03]"
                >
                  <span
                    className={`shrink-0 rounded-full px-2.5 py-0.5 text-[11px] ${
                      q.status === "answered"
                        ? "bg-drop/15 text-drop-light"
                        : "bg-white/5 text-mist-400"
                    }`}
                  >
                    {q.status === "answered" ? "답변완료" : "미답변"}
                  </span>
                  <span className="flex-1 truncate text-sm text-mist-100">
                    {q.secret ? "🔒 비밀글입니다." : q.title}
                  </span>
                  <span className="hidden text-xs text-mist-400 sm:block">
                    {q.author}
                  </span>
                  <span className="text-xs text-mist-400">
                    {formatDate(q.createdAt)}
                  </span>
                </button>

                {open && !q.secret && (
                  <div className="space-y-3 bg-ink-900/50 px-5 py-4">
                    <p className="whitespace-pre-line text-sm leading-relaxed text-mist-300">
                      {q.body}
                    </p>
                    {q.answer ? (
                      <div className="rounded-xl border border-drop/20 bg-drop/5 p-4">
                        <p className="mb-1 text-xs font-semibold text-drop-light">
                          답변
                        </p>
                        <p className="whitespace-pre-line text-sm leading-relaxed text-mist-200">
                          {q.answer}
                        </p>
                      </div>
                    ) : (
                      <p className="text-xs text-mist-400">
                        아직 답변이 등록되지 않았습니다.
                      </p>
                    )}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
