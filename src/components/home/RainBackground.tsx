"use client";

import { useEffect, useRef } from "react";

/**
 * ┌─────────────────────────────────────────────────────────────┐
 * │  RAIN ANIMATION SLOT — 여기에 직접 만든 빗방울 애니메이션 코드를 │
 * │  붙여넣으세요.                                                  │
 * │                                                               │
 * │  통합 규칙:                                                     │
 * │   1. 이 컴포넌트는 Hero의 full-bleed 배경(absolute inset-0)으로  │
 * │      깔립니다. 텍스트/버튼은 위에 떠 있고 클릭 가능해야 하므로     │
 * │      이 캔버스에는 pointer-events:none 이 적용돼 있습니다.        │
 * │   2. 애니메이션은 useEffect 안에서 시작하고, 반환되는 cleanup     │
 * │      함수에서 반드시 정리(cancelAnimationFrame, removeEventListener│
 * │      등)하세요. 언마운트 시 메모리 누수를 막습니다.               │
 * │   3. "한 번 내리고 3~5초 쉬었다 다시 내리는" 리듬은 붙여넣을 코드에 │
 * │      이미 들어있으니 그대로 두세요 (여기서 건드리지 마세요).        │
 * │   4. prefers-reduced-motion 환경에서는 애니메이션을 멈춥니다.     │
 * │                                                               │
 * │  아래 placeholder 애니메이션은 실제 코드로 교체하기 전까지 화면이   │
 * │  비어보이지 않도록 넣어둔 임시 코드입니다.                         │
 * └─────────────────────────────────────────────────────────────┘
 */
export default function RainBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // 모션 최소화 환경에서는 정적 배경만 유지하고 애니메이션 생략
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduceMotion) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    // ── PLACEHOLDER 애니메이션 시작 ──────────────────────────────
    // (붙여넣을 실제 코드로 교체될 영역)
    type Drop = { x: number; y: number; len: number; speed: number };
    const COUNT = 90;
    let drops: Drop[] = [];
    const spawn = () =>
      Array.from({ length: COUNT }, () => ({
        x: Math.random() * width,
        y: Math.random() * -height,
        len: 10 + Math.random() * 18,
        speed: 4 + Math.random() * 6,
      }));
    drops = spawn();

    // "내리고 → 쉬고 → 다시 내리는" 리듬 (placeholder)
    let phase: "falling" | "resting" = "falling";
    let restUntil = 0;

    const tick = (t: number) => {
      ctx.clearRect(0, 0, width, height);

      if (phase === "resting") {
        if (t >= restUntil) {
          phase = "falling";
          drops = spawn();
        }
        raf = requestAnimationFrame(tick);
        return;
      }

      ctx.strokeStyle = "rgba(127, 211, 230, 0.35)";
      ctx.lineWidth = 1.2;
      let allGone = true;
      for (const d of drops) {
        ctx.beginPath();
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x, d.y + d.len);
        ctx.stroke();
        d.y += d.speed;
        if (d.y < height + d.len) allGone = false;
      }
      if (allGone) {
        phase = "resting";
        restUntil = t + 3000 + Math.random() * 2000; // 3~5초 휴식
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    // ── PLACEHOLDER 애니메이션 끝 ────────────────────────────────

    // cleanup: 언마운트 시 반드시 정리
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
