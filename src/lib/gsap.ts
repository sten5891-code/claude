// ────────────────────────────────────────────────────────────
// GSAP 전역 설정 (single source of truth)
// 사이트 전체 모션의 이징/지속시간을 여기서만 정의 → 시각적 일관성 유지.
// 애니메이션을 만들 때는 반드시 EASE / DURATION 을 import 해서 사용하세요.
// ────────────────────────────────────────────────────────────
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// 플러그인 등록 (브라우저에서만)
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

// ── 전역 이징 커브 ──────────────────────────────────────────
// 사이트 전체가 공유하는 단일 이징. 여기만 바꾸면 모든 모션이 함께 바뀝니다.
export const EASE = "power3.inOut";

// ── 모션 지속시간(초) ───────────────────────────────────────
export const DURATION = {
  fast: 0.3, // 마이크로 인터랙션 (hover, 토글 등)
  base: 0.6, // 기본 등장/전환
  slow: 1.1, // 히어로·큰 리빌 등 존재감 있는 모션
} as const;

// ── GSAP 전역 기본값 ────────────────────────────────────────
// 개별 트윈에서 ease/duration 을 생략하면 아래 값이 적용됩니다.
gsap.defaults({
  ease: EASE,
  duration: DURATION.base,
});

export { gsap, ScrollTrigger, useGSAP };
