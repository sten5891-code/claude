"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

// 다른 컴포넌트(스크롤 락, 앵커 이동 등)에서 Lenis 인스턴스에 접근할 때 사용
const LenisContext = createContext<Lenis | null>(null);
export const useLenis = () => useContext(LenisContext);

export function SmoothScroll({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    // 모션 최소화 선호 시: Lenis 스무딩을 끄고 네이티브 스크롤 사용
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const lenis = new Lenis({
      duration: 1.1,
      // 부드럽게 감속하는 지수형 이징
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: !reduce,
    });
    setLenis(lenis);

    // 1) Lenis 가 스크롤할 때마다 ScrollTrigger 를 갱신 → 스크롤 값 동기화
    lenis.on("scroll", ScrollTrigger.update);

    // 2) GSAP ticker 하나로 rAF 를 통합 (Lenis 자체 rAF 루프를 돌리지 않음)
    //    time(초) → Lenis 는 ms 단위 → *1000
    const update = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(update);
    // 3) 프레임 지연 보정(lag smoothing) 해제 → 스크롤과 트윈의 미세한 어긋남 방지
    gsap.ticker.lagSmoothing(0);

    // 페이지 내 앵커(#about 등) 클릭을 Lenis 로 부드럽게 처리
    const onAnchorClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement)?.closest?.('a[href^="#"]');
      if (!el) return;
      const href = el.getAttribute("href");
      if (!href || href.length < 2) return;
      e.preventDefault();
      lenis.scrollTo(href, { offset: -72 }); // 고정 헤더 높이만큼 보정
    };
    document.addEventListener("click", onAnchorClick);

    return () => {
      document.removeEventListener("click", onAnchorClick);
      gsap.ticker.remove(update);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
