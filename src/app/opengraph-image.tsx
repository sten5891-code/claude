import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = site.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// 소셜 공유 미리보기(1200×630) 를 사이트 설정에서 동적 생성
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "#0b0b10",
          backgroundImage:
            "radial-gradient(circle at 78% 12%, rgba(124,108,255,0.38), transparent 55%)",
          color: "#f2f2f5",
        }}
      >
        {/* 상단: 브랜드 마크 + 역할 */}
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              background: "linear-gradient(135deg,#8b6cff,#5b34e0)",
            }}
          />
          <div
            style={{
              fontSize: 26,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: "#a9a3ff",
            }}
          >
            {site.role}
          </div>
        </div>

        {/* 중앙: 이름 + 태그라인 */}
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 104, fontWeight: 700, lineHeight: 1.05 }}>
            {site.name}
          </div>
          <div style={{ fontSize: 36, color: "#b9b9c4" }}>{site.tagline}</div>
        </div>

        {/* 하단: 도메인 */}
        <div style={{ fontSize: 28, color: "#8b8b98" }}>
          {site.url.replace(/^https?:\/\//, "")}
        </div>
      </div>
    ),
    { ...size },
  );
}
