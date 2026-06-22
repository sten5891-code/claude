# 🌐 인터넷 주소 만들기 — Vercel 배포 (무료)

Next.js는 **Vercel**에 배포하면 가장 잘 맞습니다. 한 번만 연결해두면
이후 코드가 바뀔 때마다 **자동으로 사이트가 업데이트**됩니다.
(이 저장소는 추가 설정 없이 바로 배포되도록 준비돼 있습니다 — 테스트 결제까지 동작)

## 단계 (5분, 카드/결제 불필요)

1. **https://vercel.com** 접속 → **Sign Up** → **Continue with GitHub**
   (회원님 GitHub 계정 `sten5891-code` 로 로그인)

2. 로그인 후 **Add New… ▾ → Project** 클릭

3. **Import Git Repository** 목록에서 **`claude`** 저장소 옆 **Import** 클릭
   - 목록에 안 보이면 **"Adjust GitHub App Permissions"** → `claude` 저장소 접근 허용

4. **Configure Project** 화면:
   - **Framework Preset**: `Next.js` (자동 인식됨 — 그대로)
   - **Root Directory**: 그대로 (`./`)
   - **Environment Variables**: **지금은 아무것도 안 넣어도 됩니다** (테스트 결제 기본 동작)
   - 아래 **Deploy** 클릭

5. 1~2분 빌드 후 **🎉 축하 화면** → **Visit** 누르면 내 사이트 주소가 열립니다
   - 주소는 보통 `https://claude-xxxx.vercel.app` 형태
   - 이 주소를 저한테 알려주시면, 이후 함께 보면서 다듬을 수 있어요

## 이후 (제가 코드 고칠 때)
- 제가 수정 → 브랜치에 push → **Vercel이 자동 재배포** → 같은 주소에서 새로고침하면 반영
- 보통 1~2분이면 끝납니다

## 나중에 "진짜 결제"로 바꿀 때
실제 카드 결제를 받으려면 Vercel에서 **라이브 키**만 넣으면 됩니다:
1. Vercel 프로젝트 → **Settings → Environment Variables**
2. 아래 2개 추가 (값은 토스페이먼츠 개발자센터의 **라이브 키**)
   - `NEXT_PUBLIC_TOSS_CLIENT_KEY`
   - `TOSS_SECRET_KEY`
3. **Deployments → 최신 항목 → Redeploy**

> 그 전까지는 토스페이먼츠 **테스트 모드**로 동작합니다 (실제 청구 없음).
