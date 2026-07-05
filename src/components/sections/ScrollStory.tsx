"use client";

import { useRef } from "react";
import {
  Sparkles,
  Zap,
  Layers,
  Compass,
  Gauge,
  Boxes,
} from "lucide-react";
import { gsap, ScrollTrigger, useGSAP, EASE } from "@/lib/gsap";

// 그리드에 뿌릴 카드 데이터 (실제 내용은 이후 단계/필요 시 교체)
const features = [
  { Icon: Sparkles, title: "디테일", desc: "픽셀 단위까지 다듬는 마감." },
  { Icon: Zap, title: "성능", desc: "빠르고 부드러운 사용자 경험." },
  { Icon: Layers, title: "구조", desc: "확장 가능한 컴포넌트 설계." },
  { Icon: Compass, title: "방향", desc: "목표에서 출발하는 UX." },
  { Icon: Gauge, title: "정밀함", desc: "일관된 모션 시스템." },
  { Icon: Boxes, title: "확장성", desc: "성장하는 제품을 위한 기반." },
];

export function ScrollStory() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // 핀 구간 동안 스크롤에 맞물려(scrub) 재생되는 스토리 타임라인
      const tl = gsap.timeline({
        defaults: { ease: EASE }, // 모든 트윈 power3.inOut 통일
        scrollTrigger: {
          trigger: ".pin-section",
          start: "top top",
          end: "+=2000", // 2000px 스크롤 거리 동안 핀
          pin: true,
          scrub: 1, // 스크롤에 부드럽게 물림
          anticipatePin: 1,
        },
      });

      // 1) 타이틀: 축소 + 위로 이동
      tl.to(".title", { scale: 0.6, y: -180 }, 0);

      // 2) 카드 그리드: 은은한 opacity + Y 이동으로 스태거 리빌 (0.15s)
      tl.from(
        ".feature-cards",
        {
          opacity: 0,
          y: 60,
          stagger: 0.15,
        },
        0.2,
      );

      // 핀/레이아웃이 폰트·이미지 로드 후 정확히 계산되도록 보정
      ScrollTrigger.refresh();
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative">
      <div className="pin-section relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
        {/* 배경 글로우 */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(50%_50%_at_50%_35%,hsl(var(--accent)/0.12),transparent_70%)]"
        />

        {/* 타이틀 */}
        <div className="title container-page text-center">
          <span className="eyebrow">Story</span>
          <h2 className="mx-auto max-w-3xl font-display text-4xl font-bold leading-tight tracking-tight sm:text-6xl">
            스크롤이 <span className="text-gradient">이야기</span>가 되는 순간
          </h2>
        </div>

        {/* 카드 그리드 */}
        <div className="container-page mt-16 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ Icon, title, desc }) => (
            <div
              key={title}
              className="feature-cards rounded-2xl border border-border bg-surface/60 p-6 backdrop-blur-sm"
            >
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent/12 text-accent">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="font-display text-lg font-semibold">{title}</h3>
              <p className="mt-1 text-sm text-muted">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
