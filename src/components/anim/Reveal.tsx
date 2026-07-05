"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, DURATION } from "@/lib/gsap";

// 스크롤 진입 시 자연스럽게 등장. 전역 EASE/DURATION 을 그대로 사용해
// 사이트 전체 모션과 일관성을 유지합니다. (Lenis→ticker→ScrollTrigger 연결 검증용)
export function Reveal({
  children,
  y = 24,
  delay = 0,
}: {
  children: ReactNode;
  y?: number;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(ref.current, {
        opacity: 0,
        y,
        duration: DURATION.slow,
        delay,
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
        },
      });
    },
    { scope: ref },
  );

  return <div ref={ref}>{children}</div>;
}
