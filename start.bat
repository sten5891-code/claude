@echo off
chcp 65001 >nul
echo ============================================
echo   RAINDROP TEE - 개발 서버 시작
echo ============================================
echo.

REM .env.local 이 없으면 예시 파일에서 자동 생성
if not exist ".env.local" (
  echo [1/3] .env.local 생성 중...
  copy ".env.example" ".env.local" >nul
) else (
  echo [1/3] .env.local 이미 있음 - 건너뜀
)

echo [2/3] 패키지 설치 중... (처음 한 번만 오래 걸려요)
call npm install
if errorlevel 1 (
  echo.
  echo [오류] npm install 실패. Node.js가 설치돼 있는지 확인하세요.
  echo        https://nodejs.org 에서 LTS 버전 설치 후 다시 실행하세요.
  pause
  exit /b 1
)

echo [3/3] 개발 서버 시작!
echo.
echo  브라우저에서 http://localhost:3000 을 열어주세요.
echo  종료하려면 이 창에서 Ctrl + C 를 누르세요.
echo.
call npm run dev
pause
