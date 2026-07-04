"use client";

import Link from "next/link";
import dynamic from "next/dynamic";

// WebGL 캔버스는 클라이언트에서만 (SSR 비활성화)
const ChromeScene = dynamic(() => import("./ChromeScene"), {
  ssr: false,
  loading: () => null,
});

export default function Hero() {
  return (
    <section className="relative isolate min-h-[92vh] overflow-hidden">
      {/* 3D 크롬 오브젝트 (배경) */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <ChromeScene />
        {/* 가독성 그라데이션 */}
        <div className="absolute inset-0 bg-gradient-to-b from-void/40 via-transparent to-void" />
      </div>

      {/* 전경 콘텐츠 */}
      <div className="container-page relative z-10 flex min-h-[92vh] flex-col justify-center py-28">
        <p className="eyebrow animate-floatUp" style={{ animationDelay: "0ms" }}>
          MŌRPH · Avant-Garde Label · SS26
        </p>

        <h1
          className="animate-floatUp mt-6 max-w-4xl text-display-lg font-extrabold"
          style={{ animationDelay: "80ms" }}
        >
          <span className="text-chrome">형태를</span>{" "}
          <span className="text-iris">다시</span>
          <br />
          <span className="text-chrome">입는다</span>
        </h1>

        <p
          className="animate-floatUp mt-8 max-w-xl text-base leading-relaxed text-text-muted"
          style={{ animationDelay: "160ms" }}
        >
          크롬처럼 흐르는 실루엣, 몸의 윤곽 대신 형태 그 자체를 입는 컬렉션.
          MŌRPH는 옷과 조각 사이의 경계를 다시 씁니다.
        </p>

        <div
          className="animate-floatUp mt-11 flex flex-wrap items-center gap-4"
          style={{ animationDelay: "240ms" }}
        >
          <Link href="/products" className="btn-primary">
            컬렉션 보기
          </Link>
          <Link href="/products/liquid-chrome-dress" className="btn-ghost">
            시그니처 피스
          </Link>
        </div>
      </div>

      {/* 하단 키네틱 마퀴 */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 border-t border-line bg-void/50 py-3 backdrop-blur-sm">
        <div className="flex w-max animate-marquee whitespace-nowrap">
          {Array.from({ length: 2 }).map((_, i) => (
            <span
              key={i}
              className="flex items-center gap-6 pr-6 text-sm font-medium uppercase tracking-[0.3em] text-text-faint"
              aria-hidden={i === 1}
            >
              {[
                "Chrome Silhouette",
                "Deconstructed Tailoring",
                "Liquid Metal",
                "Sculptural Knit",
                "Future Form",
                "Made in Seoul",
              ].map((t) => (
                <span key={t} className="flex items-center gap-6">
                  {t}
                  <span className="text-iris-cyan">◆</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
