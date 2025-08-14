# Coinone Mini (zip 2025-08-14T11:46:51.875176Z)

- `/index.html` : 시작 페이지
- `/ui_apikey.html` : AK/SK 저장 및 테스트
- `/api/debug` : 헤더 부착 상태 확인
- `/api/balance` : 코인원 잔고 조회 프록시 (서버리스 함수, Node.js)

## 배포
1) 이 폴더 전체를 GitHub 리포지토리 루트에 업로드
2) Vercel에서 새 배포(또는 재배포)
3) `https://<도메인>/ui_apikey.html` 접속 → 키 저장 → **키 상태 확인(잔고 조회)** 클릭
