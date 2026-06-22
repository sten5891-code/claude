# 상품 이미지 교체 안내

현재 이 폴더에는 **placeholder(임시) 이미지 1장**(`product-1.svg`)만 있습니다.
업로드하신 실제 티셔츠 사진으로 교체하세요. (모델 컷 없이 제품 사진만)

## 실제 사진 넣는 법 (제일 쉬운 방법)

1. 이 `public/images/` 폴더에 사진을 **`product-1.jpg`** 라는 이름으로 추가
   (GitHub 웹에서 폴더 열고 *Add file → Upload files* 로 끌어다 놓으면 됩니다)
2. `src/lib/data/products.ts` 의 이미지 경로에서 `.svg` → `.jpg` 로 한 글자만 변경
   ```
   "/images/product-1.svg"  →  "/images/product-1.jpg"
   ```

> 권장 비율 1:1 또는 4:5 (예: 1000×1000). 갤러리/썸네일/확대(zoom)에 모두 사용됩니다.
> 사진을 더 추가하고 싶으면 `products.ts` 의 `images` 배열에 경로를 더 넣으면
> 썸네일이 자동으로 늘어납니다.
