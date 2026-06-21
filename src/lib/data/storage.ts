// ─────────────────────────────────────────────────────────────
//  브라우저 localStorage 기반의 아주 작은 영속 저장소.
//  리뷰/Q&A mock 데이터 레이어가 공통으로 사용합니다.
//  실제 백엔드 도입 시 이 파일을 fetch 호출로 바꾸면 됩니다.
// ─────────────────────────────────────────────────────────────

const isBrowser = typeof window !== "undefined";

export function readCollection<T>(key: string, seed: T[]): T[] {
  if (!isBrowser) return seed;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) {
      window.localStorage.setItem(key, JSON.stringify(seed));
      return seed;
    }
    return JSON.parse(raw) as T[];
  } catch {
    return seed;
  }
}

export function writeCollection<T>(key: string, items: T[]): void {
  if (!isBrowser) return;
  try {
    window.localStorage.setItem(key, JSON.stringify(items));
  } catch {
    /* quota 초과 등은 조용히 무시 */
  }
}

export function createId(prefix: string): string {
  return `${prefix}_${Date.now().toString(36)}_${Math.random()
    .toString(36)
    .slice(2, 7)}`;
}
