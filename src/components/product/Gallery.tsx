"use client";

import { useRef, useState } from "react";

export default function Gallery({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [origin, setOrigin] = useState({ x: 50, y: 50 });
  const frameRef = useRef<HTMLDivElement | null>(null);

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
      {/* 메인 이미지 — hover/탭 시 확대(zoom) */}
      <div
        ref={frameRef}
        onMouseEnter={() => setZoom(true)}
        onMouseLeave={() => setZoom(false)}
        onMouseMove={onMove}
        className="glass-card relative aspect-[4/5] cursor-zoom-in overflow-hidden bg-ink-800"
      >
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
          <span className="pointer-events-none absolute bottom-3 right-3 rounded-full bg-ink-950/70 px-3 py-1 text-[11px] text-mist-300 backdrop-blur">
            마우스를 올려 확대
          </span>
        )}
      </div>

      {/* 썸네일 */}
      <div className="mt-4 grid grid-cols-4 gap-3">
        {images.map((src, i) => (
          <button
            key={src}
            onClick={() => setActive(i)}
            className={`relative aspect-square overflow-hidden rounded-xl border transition ${
              active === i
                ? "border-drop/60 ring-2 ring-drop/30"
                : "border-white/10 hover:border-drop/40"
            }`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={`${alt} 썸네일 ${i + 1}`}
              className="h-full w-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
