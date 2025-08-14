
# Coinone Mini (static + serverless)

- `/index.html` : 홈
- `/ui_apikey.html` : API 키를 브라우저에 저장하고, 헤더 전송 상태 확인
- `/ui_balance.html` : 잔고 조회 (private)
- `/ui_price.html` : 시세 조회 (public)
- `/api/balance.js` : Coinone 잔고 조회 프록시 (서버리스 함수)
- `/api/price.js` : 공용 시세 프록시
- `/api/debug.js` : 헤더 확인용

## 배포
GitHub에 그대로 올리고 Vercel에 연결하면 됩니다.
