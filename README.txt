# Patch: coinone balance wiring

이 ZIP 안의 파일들을 **저장소 루트에 그대로 덮어쓰기** 하세요.

필수 구조(소문자 주의):
- /api/balance.js
- /assets/app.js
- /ui_apikey.html

그 다음 깃허브에 커밋 → Vercel 자동 배포 → 아이폰에서
https://<도메인>/ui_apikey.html?v=patch1 열고 '키 상태 확인(잔고 조회)' 버튼을 누르세요.
응답이 { ok:true, coinone:{...} } 로 나오면 성공입니다.
