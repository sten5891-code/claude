"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { useLenis } from "@/components/providers/SmoothScroll";
import { site } from "@/lib/site";

const MIN_DURATION = 2500; // 최소 노출 시간(ms) — 인트로가 절대 성급해 보이지 않도록 강제
const SEEN_KEY = "intro-seen"; // 세션당 1회만 노출

export function CinematicLoader() {
  const [active, setActive] = useState(true);
  const [progress, setProgress] = useState(0);

  const panelRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const startRef = useRef<number>(0);
  const wipedRef = useRef(false);
  const skipRef = useRef(false);
  const lenis = useLenis();

  // 이번 세션에서 이미 봤으면 즉시 스킵 (SSR/hydration 일치 위해 마운트 후 판정)
  useEffect(() => {
    if (sessionStorage.getItem(SEEN_KEY)) {
      skipRef.current = true;
      setActive(false);
    }
  }, []);

  // 인트로 동안 스크롤 잠금 (Lenis + 문서 오버플로우)
  useEffect(() => {
    if (!active) return;
    startRef.current = performance.now();
    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = "hidden";
    return () => {
      html.style.overflow = prev;
    };
  }, [active]);

  useEffect(() => {
    if (active) lenis?.stop();
    else lenis?.start();
  }, [active, lenis]);

  // 0 → 100% 카운터 (랜덤 인터벌 + 랜덤 증가폭)
  useEffect(() => {
    if (skipRef.current) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setProgress(100);
      return;
    }
    let p = 0;
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      p = Math.min(100, p + Math.random() * 8 + 2); // +2 ~ +10
      setProgress(Math.round(p));
      if (p < 100) {
        timer = setTimeout(tick, Math.random() * 140 + 60); // 60 ~ 200ms 랜덤 간격
      }
    };
    timer = setTimeout(tick, 120);
    return () => clearTimeout(timer);
  }, []);

  // 100% 도달 → 최소 2.5초 보장 후 와이프 트랜지션
  useEffect(() => {
    if (skipRef.current || progress < 100 || wipedRef.current) return;
    const elapsed = performance.now() - startRef.current;
    const wait = Math.max(0, MIN_DURATION - elapsed);

    const t = setTimeout(() => {
      if (wipedRef.current) return;
      wipedRef.current = true;

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const tl = gsap.timeline({
        onComplete: () => {
          try {
            sessionStorage.setItem(SEEN_KEY, "1");
          } catch {
            /* noop */
          }
          setActive(false);
        },
      });
      // 카운터/카피 먼저 페이드아웃
      tl.to(copyRef.current, {
        opacity: 0,
        y: -12,
        duration: 0.4,
        ease: "power2.out",
      });
      // 솔리드 패널을 위로 걷어올려 본문 공개 (yPercent:-100, power4.inOut)
      tl.to(
        panelRef.current,
        {
          yPercent: -100,
          duration: reduce ? 0.4 : 1.1,
          ease: "power4.inOut",
        },
        "-=0.1",
      );
    }, wait);

    return () => clearTimeout(t);
  }, [progress]);

  if (!active) return null;

  return (
    <div
      ref={panelRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-bg"
      aria-hidden
    >
      <div ref={copyRef} className="flex flex-col items-center">
        {/* 브랜드 마크 */}
        <span className="mb-8 font-display text-lg font-bold tracking-tight text-muted">
          {site.name}
          <span className="text-accent">.</span>
        </span>

        {/* 대형 퍼센트 카운터 */}
        <div className="flex items-end gap-1 tabular-nums">
          <span className="font-display text-7xl font-bold leading-none tracking-tight sm:text-8xl">
            {progress}
          </span>
          <span className="mb-2 text-2xl font-medium text-muted">%</span>
        </div>

        {/* 진행 바 */}
        <div className="mt-8 h-px w-56 overflow-hidden bg-border sm:w-72">
          <div
            className="h-full bg-accent"
            style={{ width: `${progress}%`, transition: "width 120ms linear" }}
          />
        </div>

        <span className="mt-5 text-xs uppercase tracking-[0.3em] text-muted">
          Loading
        </span>
      </div>
    </div>
  );
}
