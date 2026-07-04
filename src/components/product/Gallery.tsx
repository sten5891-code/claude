"use client";

import { useRef, useState } from "react";
import ProductVisual from "./ProductVisual";

export default function Gallery({
  images,
  alt,
  hue = 258,
}: {
  images: string[];
  alt: string;
  /** 실제 사진이 없을 때 제네러티브 비주얼용 색상 */
  hue?: number;
}) {
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [origin, setOrigin] = useState({ x: 50, y: 50 });
  const frameRef = useRef<HTMLDivElement | null>(null);

  // 실제 사진이 없으면 제네러티브 비주얼 4컷을 생성
  const hasPhotos = images.length > 0;
  const cuts = hasPhotos ? images : [0, 1, 2, 3];

  const onMove = (e: React.MouseEvent) => {
    const el = frameRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setOrigin({ x, y });
  };

  return (
    <div>
      {/* 메인 — hover 시 확대 (사진일 때만) */}
      <div
        ref={frameRef}
        onMouseEnter={() => hasPhotos && setZoom(true)}
        onMouseLeave={() => setZoom(false)}
        onMouseMove={onMove}
        className={`glass-card holo-border relative aspect-[4/5] overflow-hidden ${
          hasPhotos ? "cursor-zoom-in" : ""
        }`}
      >
        {hasPhotos ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={images[active]}
              alt={alt}
              className="h-full w-full object-cover transition-transform duration-200"
              style={{
                transform: zoom ? "scale(1.9)" : "scale(1)",
                transformOrigin: `${origin.x}% ${origin.y}%`,
              }}
            />
            {!zoom && (
              <span className="pointer-events-none absolute bottom-3 right-3 rounded-full border border-line bg-void/60 px-3 py-1 text-[11px] text-text-muted backdrop-blur">
                마우스를 올려 확대
              </span>
            )}
          </>
        ) : (
          <ProductVisual
            hue={hue}
            seed={active}
            label={alt}
            className="h-full w-full"
          />
        )}
      </div>

      {/* 썸네일 */}
      <div className="mt-4 grid grid-cols-4 gap-3">
        {cuts.map((cut, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`relative aspect-square overflow-hidden rounded transition ${
              active === i
                ? "ring-2 ring-iris-violet/60"
                : "border border-line hover:border-white/30"
            }`}
          >
            {hasPhotos ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={cut as string}
                alt={`${alt} 썸네일 ${i + 1}`}
                className="h-full w-full object-cover"
              />
            ) : (
              <ProductVisual hue={hue} seed={i} className="h-full w-full" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
