# Portfolio — 개인 포트폴리오 사이트

Next.js 14 + TypeScript + Tailwind CSS 로 만드는 고품질 개인 포트폴리오.
단계별로 구축합니다.

## 기술 스택

- **Next.js 14 (App Router) + TypeScript**
- **Tailwind CSS** — CSS 변수 기반 디자인 토큰, 라이트/다크 자동 전환
- **next-themes** — 다크모드 토글(기본 다크)
- **framer-motion** — 스크롤/등장 애니메이션 (2단계~)
- **lucide-react** — 아이콘

## 구축 단계

- [x] **1단계 — 기반 구축**: 디자인 시스템, 다크모드, 레이아웃(Header/Footer), 네비게이션, 섹션 뼈대
- [ ] **2단계 — Hero**: 임팩트 첫 화면 + 모션
- [ ] **3단계 — About / Skills**: 소개, 기술 스택
- [ ] **4단계 — Projects**: 프로젝트 그리드/상세
- [ ] **5단계 — Experience / Contact**: 경력 타임라인, 연락처
- [ ] **6단계 — 폴리싱 & 배포**: 반응형/접근성/SEO/성능

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
