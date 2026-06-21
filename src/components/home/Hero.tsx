import Link from "next/link";
import RainBackground from "./RainBackground";

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      {/* 빗방울 애니메이션 배경 (full-bleed, pointer-events:none) */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-ink-950 via-ink-900 to-ink-950">
        <RainBackground />
        {/* 위쪽 텍스트 가독성을 위한 그라데이션 오버레이 */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950 via-transparent to-ink-950/40" />
      </div>

      {/* 전경 콘텐츠 — 클릭 가능해야 하므로 z-10 + 자체 pointer-events */}
      <div className="container-page relative z-10 flex min-h-[78vh] flex-col items-center justify-center py-24 text-center">
        <p className="animate-floatUp text-sm tracking-[0.4em] text-drop-light">
          AQUA LABEL
        </p>
        <h1 className="animate-floatUp mt-6 text-4xl font-semibold leading-tight tracking-tight sm:text-6xl">
          비가 스며든 티셔츠,
          <br />
          <span className="bg-gradient-to-b from-mist-100 to-drop bg-clip-text text-transparent">
            RAINDROP TEE
          </span>
        </h1>
        <p className="animate-floatUp mt-6 max-w-xl text-base leading-relaxed text-mist-300">
          상단은 차분한 헤더 그레이, 밑단으로 갈수록 번지는 물방울 그라데이션.
          비 오는 날의 무드를 입어보세요.
        </p>
        <div className="animate-floatUp mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link href="/products/raindrop-tee" className="btn-primary">
            제품 보러가기
          </Link>
          <Link href="/products" className="btn-ghost">
            전체 컬렉션
          </Link>
        </div>
      </div>

      {/* 하단 페이드 → 다음 섹션과 자연스럽게 연결 */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-24 bg-gradient-to-t from-ink-950 to-transparent" />
    </section>
  );
}
