import type { Question } from "@/types";
import { createId, readCollection, writeCollection } from "./storage";

const KEY = "morph_questions_v1";

const SEED: Question[] = [
  {
    id: "q_seed_1",
    productId: "morph-nullform-coat",
    author: "예비구매자",
    title: "재입고 예정이 있나요?",
    body: "M 사이즈가 품절인데 언제쯤 다시 들어오나요?",
    secret: false,
    status: "answered",
    answer:
      "안녕하세요, 고객님. NULL-FORM COAT M 사이즈는 다음 주 중 재입고 예정입니다. 재입고 알림을 신청해 주시면 입고 즉시 안내드리겠습니다. 감사합니다.",
    createdAt: "2026-06-26T10:00:00.000Z",
  },
  {
    id: "q_seed_2",
    productId: "morph-liquidchrome-dress",
    author: "jiwon",
    title: "관리 방법이 궁금해요",
    body: "메탈릭 코팅 저지라고 하셨는데, 홈 세탁이 가능한가요?",
    secret: false,
    status: "pending",
    createdAt: "2026-06-29T08:30:00.000Z",
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
