
// api/debug.js
export default async function handler(req, res){
  const ak = req.headers["x-ak"] ? "present" : "missing";
  const sk = req.headers["x-sk"] ? "present" : "missing";
  res.status(200).json({
    ok: true,
    seen_headers: { "x-ak": ak, "x-sk": sk },
    method: req.method,
    body: req.body || null,
    hint: "브라우저에서 헤더 부착 상태만 확인하는 디버그 엔드포인트입니다."
  });
}
