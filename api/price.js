
// api/price.js — public ticker proxy
export default async function handler(req, res){
  try{
    const pair = (req.query.pair || "KRW-USDT").toString(); // e.g., KRW-BTC
    // Coinone public ticker (new): /public/v2/ticker_new/{PAIR}
    // Fallback to old endpoint if needed.
    const urlNew = `https://api.coinone.co.kr/public/v2/ticker_new/${encodeURIComponent(pair)}`;
    let r = await fetch(urlNew);
    if(!r.ok){
      // fallback
      const [cur, coin] = pair.split("-");
      const urlOld = `https://api.coinone.co.kr/ticker/?currency=${encodeURIComponent(cur.toLowerCase())}&target=${encodeURIComponent(coin.toLowerCase())}`;
      r = await fetch(urlOld);
    }
    const data = await r.json();
    res.status(200).json({ ok:true, pair, data });
  }catch(e){
    res.status(500).json({ ok:false, error:"server-error", message:String(e) });
  }
}
