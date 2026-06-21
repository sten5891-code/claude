# RAINDROP TEE — Water Drop Tee 쇼핑몰

물방울 그라데이션 티셔츠를 판매하는 한국어 풀 e-커머스 사이트.
단일 메인 상품이지만 카탈로그 · 장바구니 · 리뷰 · Q&A · 결제(TossPayments) ·
주문완료까지 일반 쇼핑몰의 전체 흐름을 갖추고 있습니다.

## 기술 스택

- **Next.js 14 (App Router) + TypeScript**
- **Tailwind CSS** — 다크/물방울 무드, 반응형
- **Zustand + localStorage** — 장바구니 상태 영속화 (새로고침 유지)
- **TossPayments 결제위젯 SDK** — 테스트 모드 기본, `.env`만 바꾸면 라이브 전환
- **Mock 데이터 레이어** (`src/lib/data/*`) — 리뷰/Q&A/상품을 추상화 → 추후 실제 백엔드 연결 용이

## 폴더 구조

```
src/
├── app/
│   ├── layout.tsx              # 공통 레이아웃 (헤더/푸터)
│   ├── page.tsx                # 홈 (Hero + 피처드 + 컬렉션)
│   ├── products/
│   │   ├── page.tsx            # 카탈로그 (필터/정렬)
│   │   └── [slug]/page.tsx     # 상품 상세 (갤러리/구매/탭)
│   ├── cart/page.tsx           # 장바구니
│   ├── checkout/
│   │   ├── page.tsx            # 주문/결제 (TossPayments 위젯)
│   │   ├── success/page.tsx    # 주문완료 (결제 승인)
│   │   └── fail/page.tsx       # 결제 실패
│   └── api/confirm/route.ts    # 결제 승인 (서버, 시크릿 키)
├── components/
│   ├── layout/                 # Header(장바구니 배지) · Footer
│   ├── home/                   # Hero · RainBackground(애니메이션 슬롯)
│   ├── product/                # ProductCard · Gallery(zoom) · ProductPurchase · SizeTable · ProductTabs · CatalogView
│   ├── reviews/                # Reviews · StarRating
│   └── qna/                    # Qna
├── lib/
│   ├── data/                   # products · reviews · qna · storage (mock 레이어)
│   ├── store/cart.ts           # Zustand 장바구니 (persist)
│   └── format.ts               # 통화/날짜/배송비
└── types/index.ts              # 도메인 타입
public/images/                  # 교체용 placeholder 이미지
```

## 로컬 실행

```bash
# 1) 의존성 설치
npm install

# 2) 환경변수 파일 생성 후 키 입력
cp .env.example .env.local

# 3) 개발 서버
npm run dev          # http://localhost:3000

# 프로덕션 빌드/실행
npm run build && npm start
```

## TossPayments 키 설정 (중요)

키는 **`.env.local`** 파일에 넣습니다 (`.env.example`을 복사해서 생성).

| 변수 | 설명 | 노출 |
| --- | --- | --- |
| `NEXT_PUBLIC_TOSS_CLIENT_KEY` | 클라이언트(위젯) 키 | 브라우저 노출 (정상) |
| `TOSS_SECRET_KEY` | 시크릿 키 (결제 승인용) | **서버 전용, 노출 금지** |
| `NEXT_PUBLIC_BASE_URL` | 결제 후 돌아올 기본 URL | 예: `http://localhost:3000` |

- 기본값은 토스페이먼츠 **공개 테스트 키**라 바로 결제 흐름을 테스트할 수 있습니다
  (실제 청구 없음).
- **라이브(실결제) 전환**: [토스페이먼츠 개발자센터](https://developers.tosspayments.com)에서
  발급받은 **라이브 키**로 위 두 값을 교체하고, `NEXT_PUBLIC_BASE_URL`을 실제
  도메인으로 바꾸면 됩니다. 코드 수정 불필요.

### 결제 흐름

1. `/checkout` 에서 배송 정보 입력 → 결제위젯 렌더링
2. `결제하기` → 토스 결제창 → 성공 시 `/checkout/success` 로 리다이렉트
3. success 페이지가 `/api/confirm` (서버, 시크릿 키)으로 **결제 승인** 요청
4. 승인 성공 → 장바구니 비우고 주문 정보 표시

> 테스트 카드 등 자세한 테스트 방법: https://docs.tosspayments.com/guides/v2/payment-widget/integration

## 빗방울 애니메이션 연결

`src/components/home/RainBackground.tsx` 안의
`── PLACEHOLDER 애니메이션 시작/끝 ──` 주석 구간에 미리 만든 애니메이션 코드를
붙여넣으면 됩니다. 슬롯은 이미 아래를 처리해 둡니다.

- `"use client"` + `useEffect` 안에서 실행, 언마운트 시 cleanup
- 캔버스는 Hero 배경에 full-bleed(`absolute inset-0`) + `pointer-events:none`
  (위의 텍스트/버튼 클릭 보장)
- `prefers-reduced-motion` 존중
- "내리고 → 3~5초 휴식 → 다시" 리듬은 붙여넣을 코드의 것을 그대로 사용하세요.

## 데이터 레이어 (백엔드 연결 시)

리뷰/Q&A는 현재 `localStorage` 기반 mock 입니다.
`src/lib/data/reviews.ts`, `qna.ts`, `products.ts`의 함수 시그니처(`getReviews`,
`addReview`, `getQuestions`, `addQuestion`, `getProductBySlug` 등)를 유지한 채
내부 구현만 `fetch(...)`로 바꾸면 화면 코드는 그대로 동작합니다.

---

채워 넣어야 할 항목은 [CHECKLIST.md](./CHECKLIST.md)를 참고하세요.
