
// api/debug.js
export const config = { runtime: 'nodejs18.x' };
export default async function handler(req, res){
  const ak = req.headers['x-ak'] ? 'present' : 'missing'
  const sk = req.headers['x-sk'] ? 'present' : 'missing'
  const body = req.method === 'POST' ? (req.body||null) : null
  res.status(200).json({ ok:true, seen_headers:{'x-ak':ak,'x-sk':sk}, method:req.method, body, hint:'브라우저에서 헤더 부착 상태만 확인하는 디버그 엔드포인트입니다.' })
}
