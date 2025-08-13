
export default async function handler(req, res) {
  // 단순한 모의 잔고 값을 반환 (실제 연동 전 UI 테스트용)
  res.status(200).json({
    ok: true,
    balance: 2500000,
    note: "모의 잔고입니다. 실거래 연동 전 UI 테스트용."
  });
}
