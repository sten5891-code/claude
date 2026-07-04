import type { CSSProperties } from "react";

// ─────────────────────────────────────────────────────────────
//  제네러티브 크롬 비주얼
//  실제 상품 사진이 없을 때(images 비었을 때) 상품마다 결정적으로
//  생성되는 메탈릭 "드레이프" 포스터. hue 값으로 색이 갈립니다.
//  실제 촬영본이 생기면 <img>로 교체하면 됩니다.
// ─────────────────────────────────────────────────────────────

export default function ProductVisual({
  hue,
  label,
  seed = 0,
  className,
  style,
}: {
  hue: number;
  /** 좌하단에 얇게 새겨지는 카테고리/이름 */
  label?: string;
  /** 같은 상품의 갤러리 컷을 다르게 보이게 하는 변주값 */
  seed?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const id = `${Math.round(hue)}-${seed}`;
  const h2 = (hue + 40) % 360;
  const rot = 20 + ((seed * 47) % 60);
  const cx = 30 + ((seed * 23) % 40);
  const cy = 25 + ((seed * 31) % 40);

  return (
    <svg
      viewBox="0 0 400 500"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      style={style}
      role="img"
      aria-label={label ? `${label} 비주얼` : "상품 비주얼"}
    >
      <defs>
        {/* 크롬 베이스 그라데이션 */}
        <linearGradient id={`chrome-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#e9e9f0" />
          <stop offset="28%" stopColor={`hsl(${hue} 45% 62%)`} />
          <stop offset="50%" stopColor="#2b2b33" />
          <stop offset="72%" stopColor={`hsl(${h2} 55% 46%)`} />
          <stop offset="100%" stopColor="#0a0a0d" />
        </linearGradient>
        {/* 이리데센트 하이라이트 스윕 */}
        <linearGradient
          id={`sweep-${id}`}
          x1="0"
          y1="0"
          x2="1"
          y2="1"
          gradientTransform={`rotate(${rot} 0.5 0.5)`}
        >
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.0" />
          <stop offset="45%" stopColor="#ffffff" stopOpacity="0.55" />
          <stop offset="55%" stopColor="#ffffff" stopOpacity="0.0" />
        </linearGradient>
        <radialGradient id={`glow-${id}`} cx={`${cx}%`} cy={`${cy}%`} r="70%">
          <stop offset="0%" stopColor={`hsl(${hue} 90% 70%)`} stopOpacity="0.5" />
          <stop offset="100%" stopColor={`hsl(${hue} 90% 70%)`} stopOpacity="0" />
        </radialGradient>
        <filter id={`blur-${id}`}>
          <feGaussianBlur stdDeviation="18" />
        </filter>
      </defs>

      {/* 베이스 */}
      <rect width="400" height="500" fill={`url(#chrome-${id})`} />
      {/* 컬러 글로우 */}
      <rect width="400" height="500" fill={`url(#glow-${id})`} />

      {/* 흐르는 드레이프 곡선들 (fabric fold) */}
      <g opacity="0.5" filter={`url(#blur-${id})`}>
        <path
          d={`M-40 ${120 + (seed % 5) * 30} C 120 ${60 + seed * 10}, 280 ${
            220 - (seed % 4) * 20
          }, 460 ${140 + (seed % 3) * 30}`}
          stroke="#ffffff"
          strokeWidth="2"
          fill="none"
          opacity="0.35"
        />
        <path
          d={`M-40 ${300 + (seed % 4) * 25} C 140 ${240}, 260 ${360}, 460 ${
            300 - (seed % 5) * 20
          }`}
          stroke="#000000"
          strokeWidth="30"
          fill="none"
          opacity="0.3"
        />
      </g>

      {/* 하이라이트 스윕 */}
      <rect width="400" height="500" fill={`url(#sweep-${id})`} opacity="0.7" />

      {/* 상단 미세 하이라이트 라인 */}
      <rect width="400" height="500" fill="none" />

      {label && (
        <text
          x="24"
          y="472"
          fill="#ffffff"
          fillOpacity="0.85"
          fontFamily="var(--font-display), sans-serif"
          fontSize="15"
          letterSpacing="3"
          fontWeight="700"
        >
          {label}
        </text>
      )}
    </svg>
  );
}
