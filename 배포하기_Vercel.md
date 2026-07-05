# 배포하기 (Vercel)

이 프로젝트는 표준 Next.js 14 앱이라 **Vercel에 무설정으로 배포**됩니다.

## 1. 준비

- `src/lib/site.ts` 의 본인 정보(이름·역할·소셜·`url`)를 실제 값으로 교체
- 로컬 확인: `npm install && npm run build` 가 통과하는지

## 2. Vercel 배포

1. 코드를 GitHub 에 푸시 (이미 되어 있음)
2. [vercel.com](https://vercel.com) → **New Project** → 이 저장소 선택
3. Framework 는 자동으로 **Next.js** 감지 → 그대로 **Deploy**
4. 끝. 빌드/호스팅/HTTPS 자동

> CLI 로도 가능: `npm i -g vercel && vercel`

## 3. 도메인 & 공유 이미지(OG)

OG/트위터 미리보기 이미지는 **절대 URL** 이 필요합니다. 도메인을 다음 순서로 자동 판별합니다:

1. `NEXT_PUBLIC_SITE_URL` 환경변수 (커스텀 도메인 쓸 때 권장)
2. Vercel 배포 URL (`VERCEL_URL`, 자동)
3. `src/lib/site.ts` 의 `site.url` (기본값)

**커스텀 도메인 연결 시**: Vercel 프로젝트 → Settings → Environment Variables 에
`NEXT_PUBLIC_SITE_URL = https://내도메인.com` 추가 후 재배포.

## 4. 확인

- `/` — 인트로 로더 → 히어로(3D) → 스토리 스크롤
- `/opengraph-image` — 공유 미리보기 이미지(1200×630)
- 공유 미리보기 테스트: [opengraph.xyz](https://www.opengraph.xyz/) 에 배포 URL 입력

## 참고: Spline 3D

Spline 씬은 클라이언트에서 `spline.design` 으로부터 로드됩니다.
회사 방화벽/네트워크가 `*.spline.design` 을 막지 않는 환경이면 정상 렌더됩니다.
