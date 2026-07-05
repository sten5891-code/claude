# Portfolio — 개인 포트폴리오 사이트

Next.js 14 + TypeScript + Tailwind CSS 로 만드는 고품질 개인 포트폴리오.
단계별로 구축합니다.

## 기술 스택

- **Next.js 14 (App Router) + TypeScript**
- **Tailwind CSS** — CSS 변수 기반 디자인 토큰, 라이트/다크 자동 전환
- **next-themes** — 다크모드 토글(기본 다크)
- **GSAP + ScrollTrigger** — 스크롤 스토리텔링(핀·스크럽·스태거), 전역 이징/지속시간
- **Lenis** — 부드러운 스크롤 → GSAP ticker 통합
- **react-three-fiber + drei (three.js)** — 히어로 3D 박스 그리드(마우스 반응)
- **next/og** — 소셜 공유 이미지 동적 생성
- **lucide-react** — 아이콘

## 구축 단계

- [x] **1단계 — 스택 셋업**: GSAP + ScrollTrigger + Lenis 연결, 전역 gsap-config
- [x] **2단계 — 스크롤 스토리텔링**: `.pin-section` 핀 + 스크럽 타임라인 + 스태거
- [x] **3단계 — 비주얼 히어로**: 3D 히어로(R3F 박스 그리드) + hover/scroll 반응
- [x] **4단계 — 시네마틱 인트로 로더**: 카운터 → 패널 와이프(power4.inOut)
- [ ] **5단계 — 모바일 최적화**
- 부가: favicon/OG 이미지, 세션 1회 인트로, Vercel 배포 설정

## 로컬 실행

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # 프로덕션 빌드
```

## 내 정보로 바꾸기

거의 모든 텍스트/링크는 **`src/lib/site.ts`** 한 곳에서 관리합니다.

- `site.name`, `site.role`, `site.tagline`, `site.email` — 이름/직함/소개/이메일
- `nav` — 네비게이션 항목
- `socials` — GitHub / LinkedIn / Twitter (빈 값이면 자동 숨김)

디자인 색상은 `src/app/globals.css` 의 `--accent` 등 CSS 변수에서 조정합니다.
