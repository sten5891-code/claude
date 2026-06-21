import type { Question } from "@/types";
import { createId, readCollection, writeCollection } from "./storage";

const KEY = "wdt_questions_v1";

const SEED: Question[] = [
  {
    id: "q_seed_1",
    productId: "raindrop-tee-001",
    author: "예비구매자",
    title: "재입고 예정이 있나요?",
    body: "L 사이즈가 품절인데 언제쯤 다시 들어오나요?",
    secret: false,
    status: "answered",
    answer:
      "안녕하세요, 고객님. L 사이즈는 다음 주 중 재입고 예정입니다. 재입고 알림을 신청해 주시면 입고 즉시 안내드리겠습니다. 감사합니다.",
    createdAt: "2026-06-11T10:00:00.000Z",
  },
  {
    id: "q_seed_2",
    productId: "raindrop-tee-001",
    author: "jiwon",
    title: "세탁은 어떻게 하나요?",
    body: "그라데이션 프린트가 세탁하면 벗겨지지 않을까 걱정돼요.",
    secret: false,
    status: "pending",
    createdAt: "2026-06-16T08:30:00.000Z",
  },
];

export type QnaFilter = "all" | "answered" | "pending";

export async function getQuestions(
  productId: string,
  filter: QnaFilter = "all"
): Promise<Question[]> {
  const all = readCollection<Question>(KEY, SEED).filter(
    (q) => q.productId === productId
  );
  const filtered =
    filter === "all" ? all : all.filter((q) => q.status === filter);
  return [...filtered].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export async function addQuestion(
  input: Omit<Question, "id" | "createdAt" | "status" | "answer">
): Promise<Question> {
  const all = readCollection<Question>(KEY, SEED);
  const question: Question = {
    ...input,
    id: createId("q"),
    status: "pending",
    createdAt: new Date().toISOString(),
  };
  writeCollection(KEY, [question, ...all]);
  return question;
}
