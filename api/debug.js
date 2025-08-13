
export default async function handler(req, res) {
  const xak = req.headers["x-ak"] ? "present" : "missing";
  const xsk = req.headers["x-sk"] ? "present" : "missing";
  res.setHeader("content-type","application/json; charset=utf-8");
  res.status(200).send(JSON.stringify({
    ok: true,
    seen_headers: { "x-ak": xak, "x-sk": xsk },
    method: req.method,
    body: req.body || null,
    hint: "브라우저에서 헤더 부착 상태만 확인하는 디버그 엔드포인트입니다."
  }));
}
