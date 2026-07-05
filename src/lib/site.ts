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
  // Spline 3D 씬 URL — 두 가지 형식을 자동 인식합니다.
  //  1) 뷰어(embed) 링크: https://my.spline.design/xxxx/  → iframe 으로 임베드
  //  2) 코드 export 링크: https://prod.spline.design/xxxx/scene.splinecode → react-spline
  // 비워두거나 your-scene placeholder 면 그라데이션 오브 폴백이 표시됩니다.
  splineScene: "https://my.spline.design/boxeshover-kbqSGeAhbgk4y3m4Jq1R2wgN/",
} as const;

// ── Spline Code API 제어 설정 ──────────────────────────────
// .splinecode URL 을 쓸 때만 활성화됩니다(react-spline 경로).
// 씬을 로드하면 콘솔에 오브젝트/변수 이름이 찍히니, 그 값을 아래에 넣으세요.
// 빈 문자열이면 해당 제어는 자동으로 비활성화(no-op)됩니다.
export const splineControls = {
  // 스크롤 진행도(0~1)를 흘려보낼 Spline 변수 이름
  scrollVariable: "",
  // 마우스 위치로 회전시킬 오브젝트 이름
  rotateObject: "",
  // 마우스 진입/이탈 시 emit 할 이벤트 대상 오브젝트 이름 (mouseHover)
  hoverObject: "",
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
