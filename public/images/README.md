# 상품 이미지 안내

현재 상품 사진: **`product-1.png`** (1장)

## 사진을 바꾸거나 추가하려면

- **교체:** 같은 이름(`product-1.png`)으로 새 파일을 덮어쓰면 끝.
  - 확장자가 달라지면(예: `.jpg`) `src/lib/data/products.ts` 의 경로도 같이 바꿔주세요.
- **추가:** `public/images/` 에 파일을 올리고 `src/lib/data/products.ts` 의
  `images` 배열에 경로를 추가하면 썸네일이 자동으로 늘어납니다.
  ```ts
  images: [
    "/images/product-1.png",
    "/images/product-2.png", // ← 추가
  ],
  ```

> 권장 비율 1:1 또는 4:5 (예: 1000×1000 이상). 갤러리·썸네일·확대(zoom)에 모두 쓰입니다.
> 모델 컷 없이 제품 사진만 사용하세요.
