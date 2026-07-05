"use client";

import { Component, useRef, useState, type ReactNode } from "react";
import dynamic from "next/dynamic";
import { ArrowDown } from "lucide-react";
import { gsap, useGSAP, EASE, DURATION } from "@/lib/gsap";
import { site } from "@/lib/site";

// Spline 은 브라우저 전용(WebGL) → SSR 비활성화 + 클라이언트에서만 로드
const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
  loading: () => <CanvasSkeleton />,
});

// placeholder URL 이면 네트워크 요청 없이 바로 폴백 사용
const isPlaceholder = !site.splineScene || site.splineScene.includes("your-scene");

function CanvasSkeleton() {
  return (
    <div className="absolute inset-0 grid place-items-center">
      <div className="h-40 w-40 animate-pulse rounded-full bg-accent/10 blur-2xl" />
    </div>
  );
}

// Spline 을 못 불러올 때(placeholder/에러) 보여줄 고급스러운 그라데이션 오브
function FallbackOrb() {
  return (
    <div aria-hidden className="absolute inset-0 grid place-items-center overflow-hidden">
      <div className="relative h-[min(70vw,560px)] w-[min(70vw,560px)]">
        <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,hsl(var(--accent)/0.55),transparent_35%,hsl(var(--accent)/0.35),transparent_70%,hsl(var(--accent)/0.55))] blur-2xl animate-[spin_18s_linear_infinite]" />
        <div className="absolute inset-[12%] rounded-full bg-[radial-gradient(circle_at_35%_30%,hsl(var(--accent)/0.9),hsl(var(--accent)/0.15)_60%,transparent_75%)] blur-md" />
        <div className="absolute inset-[30%] rounded-full bg-bg/40 backdrop-blur-xl" />
      </div>
    </div>
  );
}

// Spline 로드 실패(잘못된 URL/네트워크) 시 폴백으로 대체하는 경계
class SplineBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? <FallbackOrb /> : this.props.children;
  }
}

export function HeroSpline() {
  const root = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(isPlaceholder);

  useGSAP(
    () => {
      const layer = root.current!.querySelector<HTMLElement>(".hero-3d");
      const copy = root.current!.querySelector<HTMLElement>(".hero-copy");
      if (!layer || !copy) return;

      // 등장 애니메이션
      gsap.from(".hero-copy > *", {
        opacity: 0,
        y: 24,
        duration: DURATION.slow,
        stagger: 0.08,
        ease: EASE,
      });

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return;

      // ── Hover: 마우스 위치에 따라 3D 레이어/타이포 시차 이동 (quickTo 로 부드럽게) ──
      const layerX = gsap.quickTo(layer, "x", { duration: DURATION.base, ease: EASE });
      const layerY = gsap.quickTo(layer, "y", { duration: DURATION.base, ease: EASE });
      const copyX = gsap.quickTo(copy, "x", { duration: DURATION.base, ease: EASE });
      const copyY = gsap.quickTo(copy, "y", { duration: DURATION.base, ease: EASE });

      const onMove = (e: MouseEvent) => {
        const nx = e.clientX / window.innerWidth - 0.5; // -0.5 ~ 0.5
        const ny = e.clientY / window.innerHeight - 0.5;
        layerX(nx * 40);
        layerY(ny * 40);
        copyX(nx * -16); // 반대 방향 → 깊이감
        copyY(ny * -16);
      };
      window.addEventListener("mousemove", onMove);

      // ── Scroll: 히어로를 지나갈 때 레이어/타이포 시차 + 페이드 (Lenis→ScrollTrigger scrub) ──
      gsap.to(layer, {
        yPercent: 12,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
      gsap.to(copy, {
        yPercent: -18,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      return () => window.removeEventListener("mousemove", onMove);
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      {/* 3D 캔버스 레이어 (절대배치, 클릭 통과) */}
      <div className="hero-3d pointer-events-none absolute inset-0 -z-10">
        {isPlaceholder ? (
          <FallbackOrb />
        ) : (
          <SplineBoundary>
            {!loaded && <CanvasSkeleton />}
            <Spline
              scene={site.splineScene}
              onLoad={() => setLoaded(true)}
              style={{ width: "100%", height: "100%" }}
            />
          </SplineBoundary>
        )}
        {/* 하단 그라데이션으로 타이포 가독성 확보 */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg via-bg/40 to-transparent" />
      </div>

      {/* 타이포그래피 오버레이 (절대배치 shell) */}
      <div className="hero-copy container-page relative">
        <span className="eyebrow">{site.role}</span>
        <h1 className="max-w-3xl font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-7xl">
          안녕하세요,
          <br />
          <span className="text-gradient">{site.name}</span>입니다.
        </h1>
        <p className="mt-6 max-w-xl text-lg text-muted">{site.tagline}</p>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <a
            href="#projects"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-fg transition-transform hover:-translate-y-0.5"
          >
            작업 보기
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium transition-colors hover:bg-surface"
          >
            연락하기
          </a>
        </div>
      </div>

      {/* 스크롤 유도 */}
      <div className="pointer-events-none absolute inset-x-0 bottom-8 flex justify-center text-muted">
        <ArrowDown className="h-5 w-5 animate-bounce" />
      </div>
    </section>
  );
}
