// /api/debug.js
module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-ak, x-sk');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const body = req.body || null;
  const h = req.headers || {};
  res.status(200).json({
    ok: true,
    seen_headers: { 'x-ak': h['x-ak'] ? 'present' : 'missing', 'x-sk': h['x-sk'] ? 'present' : 'missing' },
    method: req.method,
    body,
    hint: '브라우저에서 헤더 부착 상태만 확인하는 디버그 엔드포인트입니다.'
  });
};
