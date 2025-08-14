export const config = { runtime: "nodejs18.x"};
export default async function handler(req, res) {
  res.status(200).json({
    ok: true,
    simulated: true,
    received: req.body || {},
    note: "이 엔드포인트는 주문 요청을 에코합니다. 실제 거래 API 연결 전 테스트용입니다."
  });
}
