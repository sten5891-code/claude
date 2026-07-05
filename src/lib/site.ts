// ────────────────────────────────────────────────────────────
// 사이트 전역 설정 — 이름/문구/링크는 여기서만 바꾸면 전체에 반영됩니다.
// (실제 값으로 교체하세요. 아래는 예시 placeholder 입니다.)
// ────────────────────────────────────────────────────────────

export const site = {
  name: "이름",                       // 예: "김하늘"
  role: "Frontend Developer",          // 직함/한 줄 역할
  tagline: "사용자 경험을 설계하는 개발자", // 히어로 밑 짧은 소개
  email: "you@example.com",
  location: "Seoul, KR",
  // SEO / 메타
  title: "이름 — Portfolio",
  description: "프론트엔드 개발자 포트폴리오. 프로젝트와 경력을 소개합니다.",
  url: "https://example.com",
  // Spline 3D 씬 URL — Spline 에디터의 Export > Public URL 값을 붙여넣으세요.
  // 비워두거나 placeholder(your-scene)면 자동으로 그라데이션 오브 폴백이 표시됩니다.
  splineScene: "https://prod.spline.design/your-scene/scene.splinecode",
} as const;

// 헤더/사이드 네비게이션 — 각 섹션 앵커
export const nav = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
] as const;

// 소셜 링크 (빈 문자열이면 헤더/푸터에서 자동으로 숨김)
export const socials = {
  github: "https://github.com/",
  linkedin: "",
  twitter: "",
} as const;
