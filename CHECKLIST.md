# ✅ 직접 채워 넣어야 할 항목

사이트 골격과 모든 기능은 완성되어 동작합니다. 아래 항목만 실제 값으로
교체하면 그대로 오픈할 수 있습니다.

## 1. 상품 이미지 📷
- [ ] `public/images/product-1.svg` → 정면(대표) 사진
- [ ] `public/images/product-2.svg` → 후면 사진
- [ ] `public/images/product-3.svg` → 디테일 컷
- [ ] `public/images/product-4.svg` → 밑단 물방울 그라데이션 컷
- 모델 컷 없이 제품 사진만, 권장 비율 4:5 (예 800×1000)
- 확장자가 바뀌면(`.jpg`/`.png`) `src/lib/data/products.ts`의 `images` 경로도 수정
- 자세한 안내: `public/images/README.md`

## 2. 상품 정보 (`src/lib/data/products.ts`)
- [ ] `name` — 상품명 (현재 `RAINDROP TEE`)
- [ ] `brand` — 브랜드명 (현재 `AQUA LABEL`)
- [ ] `price` — 판매가 (현재 `39000`)
- [ ] `description` — 상세 설명 (현재 placeholder)
- [ ] `shortDescription` — 짧은 소개 문구

## 3. 사이즈 실측표 (`src/lib/data/products.ts` → `sizeChart`)
- [ ] M / L 의 가슴단면 · 총장 · 어깨너비 · 소매길이 (cm) 실제 값

## 4. TossPayments 키 (`.env.local`)
- [ ] `.env.example` 복사 → `.env.local` 생성
- [ ] `NEXT_PUBLIC_TOSS_CLIENT_KEY` (라이브 전환 시 라이브 클라이언트 키)
- [ ] `TOSS_SECRET_KEY` (라이브 전환 시 라이브 시크릿 키)
- [ ] `NEXT_PUBLIC_BASE_URL` (배포 도메인)
- 테스트 키는 기본 내장되어 있어 바로 결제 테스트 가능

## 5. 빗방울 애니메이션 🌧️
- [ ] `src/components/home/RainBackground.tsx`의 PLACEHOLDER 구간에
      직접 만든 애니메이션 코드 붙여넣기
- 슬롯이 z-index·pointer-events·cleanup·reduced-motion을 이미 처리함

## 6. 브랜드 / 회사 정보 (`src/components/layout/Footer.tsx`)
- [ ] 브랜드 소개 문구
- [ ] 고객센터 전화/운영시간/이메일
- [ ] 사업자 정보 (상호·대표·사업자등록번호)

## 7. (선택) 백엔드 연결
- [ ] 리뷰/Q&A를 실제 DB로 전환 — `src/lib/data/*` 함수 내부만 `fetch`로 교체
- [ ] 주문 정보 서버 저장 — 현재 결제 승인까지만 구현(`/api/confirm`)

---

### 참고: 기본 제공되어 바로 동작하는 것들
- 헤더(장바구니 실시간 배지) / 푸터 / 반응형
- 홈 Hero(애니메이션 슬롯) · 카탈로그(필터/정렬) · 상세(갤러리+zoom)
- 장바구니(복수 담기/수량/삭제/localStorage 영속)
- 리뷰(별점·사진첨부·정렬·평균) / Q&A(작성·답변상태·비밀글)
- TossPayments 테스트 결제 → 주문완료 페이지
